// form-validator.service.ts
import { UntypedFormGroup, AbstractControl } from '@angular/forms';
import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpContext, HttpContextToken } from '@angular/common/http';
import { ConfigService } from './config.service';
import { StorageHandlerService } from './storage-handler.service';
import { AnalyticsService } from './device.analytics.service';
import { CommonConstants } from './../utilities/common-constants';

// Define the HttpContextToken properly
export const IS_LOADER = new HttpContextToken<boolean>(() => false);

// Define interfaces for better type safety
interface DateOfBirthParts {
  Day: string;
  Month: string;
  Year: string;
}

interface EmailDomainResponse {
  errorBean?: any;
  payload?: {
    statusFlag: boolean;
  };
}

interface ValidationErrors {
  emailDomain?: boolean;
  invalidDomain?: boolean;
  checkValidYear?: boolean;
  checkValidMonth?: boolean;
  checkFieldZero?: boolean;
  isPanTenDigit?: boolean;
  [key: string]: any;
}

const AgeValidationMessages = {
  MinAgeError: 'Age must be above {0} years.',
  MaxAgeError: 'Age must be below {0} years',
  multilangMinError: 'personalDetailsPage.FormFields.Dob.minAgeError',
  multilangMaxError: 'personalDetailsPage.FormFields.Dob.maxAgeError',
  Invalid: 'personalDetailsPage.FormFields.Dob.errorMsg1',
};

const AllowedFileTypesForUpload: string[] = ['image/jpeg', 'application/pdf', 'image/png'];

@Injectable({
  providedIn: 'root',
})
export class FormValidatorService {
  private analyticsService: AnalyticsService;
  private OsType: string;

  constructor(
    @Inject(AnalyticsService) analyticsService: AnalyticsService,
    private http: HttpClient,
  ) {
    this.analyticsService = analyticsService;
    this.OsType = this.analyticsService.GetDeviceDetails().os;
  }

  public HasError(
    formGroup: UntypedFormGroup,
    field: string,
    errorProperty: string,
    isTouchedRequired: boolean = true,
  ): boolean {
    return (
      formGroup &&
      formGroup.controls &&
      formGroup.controls[field] &&
      (isTouchedRequired ? formGroup.controls[field].touched : true) &&
      formGroup.controls[field].errors &&
      formGroup.controls[field].errors[errorProperty]
    );
  }

  public FieldHasErrors(
    formGroup: UntypedFormGroup,
    field: string,
    isTouchedRequired: boolean = true,
  ): boolean {
    return (
      formGroup &&
      formGroup.controls &&
      formGroup.controls[field] &&
      (isTouchedRequired ? formGroup.controls[field].touched : true) &&
      formGroup.controls[field].errors != null
    );
  }

  // Auto tab date of birth
  public onInputEntry($event: KeyboardEvent, nextInput: HTMLInputElement): void {
    const input = $event.target as HTMLInputElement;
    const length = input.value.length;
    const maxLength = input.attributes.getNamedItem('maxlength')?.value;
    if (maxLength && length >= parseInt(maxLength, 10)) {
      nextInput.focus();
    }
  }

  public FieldHasSpecificError(
    formGroup: UntypedFormGroup,
    formControl: string,
    errorType: string,
  ): boolean {
    return (
      formGroup &&
      formGroup.controls &&
      formGroup.controls[formControl] &&
      formGroup.controls[formControl].hasError &&
      formGroup.controls[formControl].hasError(errorType)
    );
  }

  public IsDateOfBirthValidforLeap(updatedValue: DateOfBirthParts): string | null {
    let errorMessage: string | null = null;

    const month = updatedValue.Month ? parseInt(updatedValue.Month, 10) : '';
    const dateOfBirth = month.toString().concat('/', updatedValue.Day, '/', updatedValue.Year);

    if (this.IsLeapYear(dateOfBirth)) {
      errorMessage = null;
    } else {
      errorMessage = AgeValidationMessages.Invalid;
    }
    return errorMessage;
  }

  public IsDateOfBirthValid(
    updatedValue: DateOfBirthParts,
    minAge: number,
    maxAge: number,
    isMultilingual?: boolean,
  ): string | null {
    let errorMessage: string | null = null;

    const month = updatedValue.Month ? parseInt(updatedValue.Month, 10) : '';
    const dateOfBirth = month.toString().concat('/', updatedValue.Day, '/', updatedValue.Year);
    let ageTillDateInYears = 0;
    let ageTillDateInMonths = 0;
    let ageTillDateInDays = 0;

    if (this.IsLeapYear(dateOfBirth)) {
      const birthDay = new Date(dateOfBirth);
      const calculatedAgeDifference: number[] = this.calc_age(birthDay);

      ageTillDateInYears = calculatedAgeDifference[0];
      ageTillDateInMonths = calculatedAgeDifference[1];
      ageTillDateInDays = calculatedAgeDifference[2];

      StorageHandlerService.set(
        CommonConstants.StorageKeys.Age,
        ageTillDateInYears.toString() + '-' + ageTillDateInMonths.toString(),
      );

      if (ageTillDateInYears > minAge && ageTillDateInYears < maxAge) {
        errorMessage = null;
      } else if (ageTillDateInYears === minAge) {
        if (ageTillDateInMonths > 0) {
          errorMessage = null;
        } else if (ageTillDateInDays <= 0) {
          errorMessage = isMultilingual
            ? AgeValidationMessages.multilangMinError
            : AgeValidationMessages.MinAgeError.replace('{0}', minAge.toString());
        }
      } else {
        errorMessage =
          ageTillDateInYears < minAge
            ? isMultilingual
              ? AgeValidationMessages.multilangMinError
              : AgeValidationMessages.MinAgeError.replace('{0}', minAge.toString())
            : ageTillDateInYears > maxAge - 1
              ? isMultilingual
                ? AgeValidationMessages.multilangMaxError
                : AgeValidationMessages.MaxAgeError.replace('{0}', (maxAge + 1).toString())
              : null;
      }
    } else {
      errorMessage = AgeValidationMessages.Invalid;
    }
    return errorMessage;
  }

  public IsLeapYear(input: string): boolean {
    const date = new Date(input);
    const parts = input.split('/');
    return (
      date.getMonth() + 1 === +parts[0] &&
      date.getDate() === +parts[1] &&
      date.getFullYear() === +parts[2]
    );
  }

  public nameValidate($event: KeyboardEvent): boolean {
    if (this.OsType.toLowerCase() !== 'android') {
      const charCode = ($event as any).which ? ($event as any).which : $event.keyCode;
      const val =
        charCode === 32 ||
        !(charCode > 31 && (charCode < 65 || charCode > 90) && (charCode < 97 || charCode > 122));
      return val;
    } else {
      let charStatus;
      charStatus = ($event.key || '')
        .toString()
        .match(/[0-9~`!@#$%\^&*+=\-\[\]\\';.,/()_{}|\\":<>\?]/g);
      if (charStatus) {
        return false;
      } else {
        return true;
      }
    }
  }

  public nameValidateFederal($event: KeyboardEvent): boolean {
    if (this.OsType.toLowerCase() !== 'android') {
      const charCode = ($event as any).which ? ($event as any).which : $event.keyCode;
      const val =
        charCode === 46 ||
        charCode === 32 ||
        !(charCode > 31 && (charCode < 65 || charCode > 90) && (charCode < 97 || charCode > 122));
      return val;
    } else {
      let charStatus;
      charStatus = ($event.key || '')
        .toString()
        .match(/[0-9~`!@#$%\^&*+=\-\[\]\\';.,/()_{}|\\":<>\?]/g);
      if (charStatus) {
        return false;
      } else {
        return true;
      }
    }
  }

  public panTypeValidate(
    $event: KeyboardEvent,
    formGroup: UntypedFormGroup,
    field: string,
  ): void | boolean {
    if (
      this.OsType.toLowerCase() === 'android' ||
      this.OsType.toLowerCase() === 'iOS' ||
      this.OsType.toLowerCase() === 'Mac OS X'
    ) {
      const target = $event.target as HTMLInputElement;
      target.value = target.value.toString().replace(/[^A-Za-z\s\d]/g, '');

      const value = formGroup.controls[field].value;
      if (value !== null && value !== '') {
        formGroup.controls[field].setValue(value.toString().replace(/[^A-Za-z\s\d]/g, ''));
      }
      return false;
    }
    return;
  }

  public IsSpace($event: KeyboardEvent): boolean {
    if (
      this.OsType.toLowerCase() === 'android' ||
      this.OsType.toLowerCase() === 'iOS' ||
      this.OsType.toLowerCase() === 'Mac OS X'
    ) {
      const charCode = ($event as any).which ? ($event as any).which : $event.keyCode;
      let charStatus;
      charStatus = ($event.key || '').toString().match(/[\s]/g);
      if (charStatus || charCode === 32) {
        const target = $event.target as HTMLInputElement;
        target.value = target.value.toString().replace(/[\s]/g, '');
        return false;
      } else {
        return true;
      }
    } else {
      const charCode = ($event as any).which ? ($event as any).which : $event.keyCode;
      return charCode !== 32;
    }
  }

  public IsMobileSpace(
    $event: KeyboardEvent,
    formGroup: UntypedFormGroup,
    field: string,
  ): void | boolean {
    if (
      this.OsType.toLowerCase() === 'android' ||
      this.OsType.toLowerCase() === 'iOS' ||
      this.OsType.toLowerCase() === 'Mac OS X'
    ) {
      const target = $event.target as HTMLInputElement;
      target.value = target.value
        .toString()
        .replace(/[^[a-zA-Z0-9.!#$%&_+-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*\s]/g, '');

      const value = formGroup.controls[field].value;
      if (value) {
        formGroup.controls[field].setValue(
          value
            .toString()
            .replace(/[^[a-zA-Z0-9.!#$%&_+-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*\s]/g, ''),
        );
      }
      return false;
    }
    return;
  }

  public IsNumeric(
    $event: KeyboardEvent,
    rejectStartingWithZero?: boolean,
    rejectStartWithOne?: boolean,
  ): boolean {
    if (this.OsType.toLowerCase() !== 'android') {
      const charCode = ($event as any).which ? ($event as any).which : $event.keyCode;
      const target = $event.target as HTMLInputElement;
      const objValue = target.value ? target.value : '';
      if (rejectStartingWithZero && charCode === 48 && objValue.length < 1) {
        return false;
      } else if (rejectStartWithOne && charCode === 49 && objValue.length < 1) {
        return false;
      } else if (
        target.selectionEnd &&
        target.selectionEnd - (target.selectionStart || 0) > 0 &&
        charCode === 48
      ) {
        return !(rejectStartingWithZero && charCode === 48);
      } else {
        return !(charCode > 31 && (charCode < 48 || charCode > 57));
      }
    } else {
      let charStatus;
      charStatus = ($event.key || '')
        .toString()
        .match(/[A-Za-z~`!@#$%\^&*+=\-\[\]\\';,./()_{}|\\":<>\?\s]/g);
      if (charStatus) {
        return false;
      } else {
        return true;
      }
    }
  }

  public IsWholeNumber($event: KeyboardEvent): boolean {
    const charCode = ($event as any).which ? ($event as any).which : $event.keyCode;
    return !(charCode < 48 || charCode > 57);
  }

  public IsCharacterWithInMaxLength(value: string, maxLength: number): boolean {
    value = value ? value.trim() : '';
    return value.length <= maxLength - 1;
  }

  public addingZero($event: KeyboardEvent): void {
    const target = $event.target as HTMLInputElement;
    const DD = target.value;
    if (DD && DD.length === 1 && parseInt(DD, 10) >= 1 && parseInt(DD, 10) < 10) {
      target.value = '0' + DD;
    }
  }

  public addingZeroDob(childFormGroup: UntypedFormGroup, field: string): void {
    const DD = childFormGroup.controls[field].value;
    if (DD >= 1 && DD < 10 && DD.length < 2) {
      childFormGroup.controls[field].setValue('0' + DD);
    }
  }

  public IsFileTypeSupported(fileType: string): boolean {
    return AllowedFileTypesForUpload.indexOf(fileType) !== -1;
  }

  public IsFileSizeValid(size: number, maxSizeInMBs: number): boolean {
    return size <= maxSizeInMBs * 1048576;
  }

  public IsFutureDate(dateString: string): string | null {
    let isFutureDateMsg: string | null = null;
    const currentDate = new Date();
    const dateSplit = dateString.toString().split('/');
    const len = dateSplit.length;
    const year = parseInt(dateSplit[len - 1], 10);
    const month = parseInt(dateSplit[0], 10);
    if (dateString) {
      if (year && currentDate.getFullYear() > year) {
        isFutureDateMsg = null;
      } else if (
        year &&
        currentDate.getFullYear() === year &&
        month &&
        currentDate.getMonth() + 1 >= month
      ) {
        isFutureDateMsg = null;
      } else {
        isFutureDateMsg = 'Future date is not a valid date';
      }
    }
    return isFutureDateMsg;
  }

  public IsValidDate(dateString: string): boolean {
    let isValidDate = false;
    const dateSplit = dateString.split('/');
    const createdDate = dateSplit[1] + '/' + dateSplit[0] + '/' + dateSplit[2];
    const selectedDate = new Date(createdDate);
    if (
      selectedDate &&
      selectedDate.getTime() &&
      parseInt(dateSplit[1], 10) === selectedDate.getMonth() + 1
    ) {
      isValidDate = true;
    }
    return isValidDate;
  }

  public IsSpaceInput(formGroup: UntypedFormGroup, field: string): void {
    const value = formGroup.controls[field].value;
    if (!value || value.trim() === '') {
      formGroup.controls[field].setValue('');
    }
  }

  public CheckAmountAvailibility(
    event: KeyboardEvent,
    formGroup: UntypedFormGroup,
    controlName: string,
  ): void {
    const target = event.target as HTMLInputElement;
    const value: number = parseInt(target.value.replace(/\,/g, ''), 10);
    if (!value || value <= 0) {
      formGroup.controls[controlName].setValue('');
    }
  }

  private calc_age(startDate: Date): number[] {
    const today = new Date();
    const sDate = startDate;
    const eDate = today;
    const mdy = this.getTimeBetween(sDate, eDate);
    return mdy;
  }

  private getTimeBetween(from: Date, until: Date): number[] {
    const past = from;
    const future = until;

    const between = [
      future.getFullYear() - past.getFullYear(),
      future.getMonth() - past.getMonth(),
      future.getDate() - past.getDate(),
    ];

    if (between[2] < 0) {
      between[1]--;
      const ynum = future.getFullYear();
      const mlengths = [
        31,
        (ynum % 4 === 0 && ynum % 100 !== 0) || ynum % 400 === 0 ? 29 : 28,
        31,
        30,
        31,
        30,
        31,
        31,
        30,
        31,
        30,
        31,
      ];

      let mnum = future.getMonth() - 1;
      if (mnum < 0) {
        mnum += 12;
      }

      between[2] += mlengths[mnum];
    }

    if (between[1] < 0) {
      between[0]--;
      between[1] += 12;
    }
    return between;
  }

  public IsNumberMobile(
    $event: KeyboardEvent,
    formGroup: UntypedFormGroup,
    field: string,
  ): void | boolean {
    if (
      this.OsType.toLowerCase() === 'android' ||
      this.OsType.toLowerCase() === 'iOS' ||
      this.OsType.toLowerCase() === 'Mac OS X'
    ) {
      const target = $event.target as HTMLInputElement;
      target.value = target.value.toString().replace(/[^\d]/g, '');

      const value = formGroup.controls[field].value;
      if (value !== null && value !== '') {
        formGroup.controls[field].setValue(value.toString().replace(/[^\d]/g, ''));
      }
      return false;
    }
    return;
  }

  public IsAlphaMobile(
    $event: KeyboardEvent,
    formGroup: UntypedFormGroup,
    field: string,
  ): void | boolean {
    if (
      this.OsType.toLowerCase() === 'android' ||
      this.OsType.toLowerCase() === 'iOS' ||
      this.OsType.toLowerCase() === 'Mac OS X'
    ) {
      const target = $event.target as HTMLInputElement;
      target.value = target.value.toString().replace(/[^A-Za-z\s]/g, '');

      const value = formGroup.controls[field].value;
      if (value) {
        formGroup.controls[field].setValue(value.toString().replace(/[^A-Za-z\s]/g, ''));
      }
      return false;
    }
    return;
  }

  public IsOnlyAlphabet($event: KeyboardEvent, formGroup: UntypedFormGroup, field: string): void {
    const target = $event.target as HTMLInputElement;
    target.value = target.value.toString().replace(/[^A-Za-z\s]/g, '');
    const value = formGroup.controls[field].value;
    if (value) {
      formGroup.controls[field].setValue(value.toString().replace(/[^A-Za-z\s]/g, ''));
    }
  }

  public IsAlphaNumaric(event: KeyboardEvent): boolean {
    if (this.OsType.toLowerCase() !== 'android') {
      const charCode = (event as any).which ? (event as any).which : event.keyCode;
      const val =
        charCode === 32 ||
        !(
          charCode > 31 &&
          (charCode < 65 || charCode > 90) &&
          (charCode < 97 || charCode > 122) &&
          (charCode < 48 || charCode > 57)
        );
      return val;
    } else {
      let charStatus;
      charStatus = (event.key || '')
        .toString()
        .match(/[ ~`!@#$%\^&*+=\-\[\]\\';.,/()_{}|\\":<>\?]/g);
      if (charStatus) {
        return false;
      } else {
        return true;
      }
    }
  }

  public validateMobNumber(control: AbstractControl): { [key: string]: boolean } | null {
    let isInvalid = null;
    const fieldValue = control.value;
    if (control && fieldValue) {
      if (
        fieldValue[0] === '6' ||
        fieldValue[0] === '7' ||
        fieldValue[0] === '8' ||
        fieldValue[0] === '9'
      ) {
        isInvalid = null;
      } else {
        isInvalid = true;
      }
    } else {
      isInvalid = null;
    }
    return isInvalid
      ? {
          invalidNumber: isInvalid,
        }
      : null;
  }

  public cannotContainSpace(control: AbstractControl): { [key: string]: boolean } | null {
    if ((control.value as string).indexOf(' ') !== -1) {
      return { cannotContainSpace: true };
    }
    return null;
  }

  public emailDomainValidator(formGroup: UntypedFormGroup, fieldName: string): void {
    const email = formGroup.controls[fieldName].value;
    const errors = formGroup.controls[fieldName].errors;
    const config = ConfigService.getInstance().getConfigObject();
    if (errors == null && email && email.indexOf('@') !== -1 && config) {
      let finalUrl = config.APIURL.checkEmailDomain;
      finalUrl = finalUrl.replace('{0}', email);
      this.http
        .get<EmailDomainResponse>(finalUrl, { context: new HttpContext().set(IS_LOADER, false) })
        .subscribe((res) => {
          if (!res.errorBean && res.payload) {
            if (!res.payload.statusFlag) {
              formGroup.controls[fieldName].setErrors({ emailDomain: !res.payload.statusFlag });
              formGroup.controls[fieldName].markAsTouched();
            } else {
              formGroup.controls[fieldName].setErrors(null);
            }
          }
        });
    }
  }

  public checkOfficeDomain(
    formGroup: UntypedFormGroup,
    fieldName: string,
    event: any,
    isGenericRequired: boolean = false,
  ): void {
    let inValidDomain = false;
    const config = ConfigService.getInstance().getConfigObject();
    const currentErrors = formGroup.controls[fieldName].errors as ValidationErrors | null;
    const email = formGroup.controls[fieldName].value;

    if (config) {
      let finalUrl = config.APIURL.checkEmailDomain;
      finalUrl = finalUrl.replace('{0}', email);
      if (currentErrors == null && email && email.indexOf('@') !== -1) {
        this.http
          .get<EmailDomainResponse>(finalUrl, { context: new HttpContext().set(IS_LOADER, false) })
          .subscribe((res) => {
            if (!res.errorBean && res.payload) {
              if (res.payload.statusFlag && !isGenericRequired) {
                inValidDomain = true;
              } else {
                inValidDomain = false;
              }
            } else {
              inValidDomain = true;
            }
            if (inValidDomain) {
              if (currentErrors === null) {
                formGroup.controls[fieldName].setErrors({ invalidDomain: true });
              }
            } else {
              if (currentErrors && currentErrors['invalidDomain'] !== undefined) {
                // Create a new object without the invalidDomain property
                const newErrors: ValidationErrors = {};

                // Copy all properties except invalidDomain
                Object.keys(currentErrors).forEach((key) => {
                  if (key !== 'invalidDomain') {
                    newErrors[key] = currentErrors[key];
                  }
                });

                if (Object.keys(newErrors).length === 0) {
                  formGroup.controls[fieldName].setErrors(null);
                } else {
                  formGroup.controls[fieldName].setErrors(newErrors);
                }
              }
            }
          });
      }
    }
  }

  public compareZeroFields(
    formGroup: UntypedFormGroup,
    fieldName1: string,
    fieldName2: string,
  ): void {
    const errors1 = formGroup.controls[fieldName1].errors as ValidationErrors | null;
    const errors2 = formGroup.controls[fieldName2].errors as ValidationErrors | null;
    const value1: number = parseInt(formGroup.controls[fieldName1].value, 10);
    const value2: number = parseInt(formGroup.controls[fieldName2].value, 10);

    if (value1 > 60 || value2 > 11 || (value1 === 60 && value2 > 0)) {
      if (value1 > 60) {
        formGroup.controls[fieldName1].setErrors({ checkValidYear: true });
      }
      if (value2 > 11) {
        formGroup.controls[fieldName2].setErrors({ checkValidMonth: true });
      }
      if (value1 === 60 && value2 > 0) {
        formGroup.controls[fieldName2].setErrors({ checkValidMonth: true });
      }
    } else {
      if (errors1 === null && errors2 === null && value1 <= 0 && value2 <= 0) {
        formGroup.controls[fieldName1].setErrors({ checkFieldZero: true });
        formGroup.controls[fieldName2].setErrors({ checkFieldZero: true });
      }
      if (errors1 !== null && errors2 === null && value1 <= 0 && value2 > 0) {
        formGroup.controls[fieldName1].setErrors(null);
        formGroup.controls[fieldName2].setErrors(null);
      }
      if (errors1 === null && errors2 !== null && value1 > 0 && value2 <= 0) {
        formGroup.controls[fieldName1].setErrors(null);
        formGroup.controls[fieldName2].setErrors(null);
      }
      if (
        errors1 !== null &&
        errors2 !== null &&
        errors1['checkFieldZero'] !== undefined &&
        errors2['checkFieldZero'] !== undefined
      ) {
        formGroup.controls[fieldName1].setErrors(null);
        formGroup.controls[fieldName2].setErrors(null);
      }
    }
  }

  public allowOnlyspecificCharacters(
    event: KeyboardEvent,
    formGroup: UntypedFormGroup,
    field: string,
  ): boolean {
    const target = event.target as HTMLInputElement;
    const fieldValue = target.value;
    if (fieldValue) {
      formGroup.controls[field].setValue(
        fieldValue.toString().replace(/[^ A-Za-z0-9 &-.]|[&'(*+,)]/g, ''),
      );
    }
    return false;
  }

  public addCommaToText(formGroup: UntypedFormGroup, fieldName: string): void {
    const fieldValue = formGroup.controls[fieldName];
    let inputValue = fieldValue.value
      .replace(/[^\d\.]/g, '')
      .replace(/^\.*/, '')
      .replace(/\./, 'x')
      .replace(/\./g, '')
      .replace(/x/, '.');

    const x = inputValue.indexOf('.');

    if (x !== -1 && inputValue.length - 1 - x > 2) {
      inputValue = inputValue.substring(0, x + 3);
    }

    if (inputValue.charAt(0) === '0') {
      if (inputValue.charAt(1) === '0') {
        inputValue = inputValue.substring(0, 1);
      } else if (inputValue.charAt(1) !== '' && inputValue.charAt(1) !== '.') {
        inputValue = inputValue.substring(1);
      }
    }

    const formattedValue = inputValue.replace(/(\d+?)(?=(\d\d)+(\d)(?!\d))/g, '$&,');
    fieldValue.setValue(formattedValue);
  }

  public omitSpecialCharacters(e: KeyboardEvent): boolean {
    let k;
    k = e.keyCode ? e.keyCode : (e as any).which;
    return (k > 64 && k < 91) || (k > 96 && k < 123) || k === 8 || k === 32 || (k >= 48 && k <= 57);
  }

  public panKeypadChange(...arg: any[]): void {
    const targetElem = arg[0].target as HTMLInputElement;
    const getElem = arg[0].target.getAttribute('formControlName');
    const valLength = arg[0].target.selectionStart;
    const type = arg[0].target.getAttribute('type');

    if (getElem === 'businessPan') {
      if (valLength >= 5 && valLength <= 8) {
        if (type !== 'tel') {
          targetElem.setAttribute('type', 'tel');
          targetElem.blur();
          targetElem.focus();
        }
      } else {
        if (type !== 'text') {
          targetElem.setAttribute('type', 'text');
          targetElem.blur();
          targetElem.focus();
        }
      }
    }
    if (getElem === 'panNumber') {
      if (valLength >= 5 && valLength <= 8) {
        if (type !== 'tel') {
          targetElem.setAttribute('type', 'tel');
          targetElem.blur();
          targetElem.focus();
        }
      } else {
        if (type !== 'text') {
          targetElem.setAttribute('type', 'text');
          targetElem.blur();
          targetElem.focus();
        }
      }
    }
  }

  public isPanTenDigit(formGroup: UntypedFormGroup, fieldName: string): void {
    const formControlName = formGroup.controls[fieldName];
    const errors = formGroup.controls[fieldName].errors;
    const panNo = formControlName.value;
    if (errors == null && panNo) {
      if (panNo.length > 0 && panNo.length < 10) {
        formGroup.controls[fieldName].setErrors({ isPanTenDigit: true });
      } else {
        formGroup.controls[fieldName].setErrors(null);
      }
    }
  }

  public autoFormatDOB($event: KeyboardEvent): KeyboardEvent {
    const key: number = $event.keyCode;
    const target = $event.target as HTMLInputElement;
    const value: string = target.value;
    if ((value.length === 2 || value.length === 5) && key !== 8 && key !== 191) {
      target.value = value + '/';
      return $event;
    } else if (value.length === 2 && key !== 8 && key !== 191) {
      target.value = value + '/';
      return $event;
    } else if ((value.length === 2 || value.length === 5) && key !== 8 && key === 191) {
      const t = target.value.split('');
      t.splice(t.length - 2, 0, '0');
      target.value = t.join('');
      return $event;
    } else if (key !== 8 && key !== 191) {
      this.addZerotoDOB($event, key);
    }
    return $event;
  }

  public addZerotoDOB($event: KeyboardEvent, key: number): KeyboardEvent {
    const target = $event.target as HTMLInputElement;
    const value: string = target.value;
    const t = value.split('/');
    if (t[0] || (t[1] && key !== 8 && key !== 191)) {
      if (t[0].length < 2 && t[0] && Number(t[0]) >= 4 && Number(t[0]) <= 9) {
        t[0] = '0' + t[0];
        target.value = t.join('/');
        if (t.length < 2) {
          target.value = target.value + '/';
        }
      } else if (t[1] && t[1].length < 2 && t[1] && Number(t[1]) >= 2 && Number(t[1]) <= 9) {
        t[1] = '0' + t[1];
        target.value = t.join('/');
        if (t.length <= 2) {
          target.value = target.value + '/';
        }
      }
    }
    return $event;
  }

  public formatDOBOnBlur($event: FocusEvent): FocusEvent {
    const target = $event.target as HTMLInputElement;
    const value: string = target.value || '';
    if (!value) {
      return $event;
    }
    const parts = value.split('/');
    if (parts.length === 3) {
      let [day, month, year] = parts;
      if (day && day.length === 1) {
        day = '0' + day;
      }
      if (month && month.length === 1) {
        month = '0' + month;
      }
      target.value = day + '/' + month + '/' + year;
    }
    return $event;
  }

  public autoFormatNumericDOB($event: KeyboardEvent): KeyboardEvent {
    const target = $event.target as HTMLInputElement;
    const value: string = target.value;
    target.value = value
      .replace(/^(\d\d)(\d)$/g, '$1/$2')
      .replace(/^(\d\d\/\d\d)(\d+)$/g, '$1/$2')
      .replace(/[^\d\/]/g, '');
    return $event;
  }

  public convertToDDMMYYYY(dateStr: string): string {
    const [year, month, day] = dateStr.split('/');
    return `${day}/${month}/${year}`;
  }

  public IsSingleSpace(
    event: KeyboardEvent,
    formGroup?: UntypedFormGroup,
    fieldName?: string,
  ): void {
    const target = event.target as HTMLInputElement;
    let input = target.value;

    input = input.replace(/^\s+/, '');
    input = input.replace(/\s{2,}/g, ' ');

    target.value = input;

    if (formGroup && fieldName) {
      formGroup.controls[fieldName].setValue(input, { emitEvent: false });
    }
  }

  public allowOnlyAlphabetsAndSpaces(
    event: ClipboardEvent | KeyboardEvent,
    formGroup: UntypedFormGroup,
    field: string,
  ): void {
    const inputElement = event.target as HTMLInputElement;

    if (event.type === 'paste') {
      const clipboardData =
        (event as ClipboardEvent).clipboardData || (window as any).clipboardData;
      let pastedData = clipboardData.getData('text');

      pastedData = pastedData.replace(/[^A-Za-z ]+/g, '');
      pastedData = pastedData.replace(/\s{2,}/g, ' ');

      inputElement.value = pastedData;
      formGroup.controls[field].setValue(pastedData, { emitEvent: false });

      event.preventDefault();
    } else {
      setTimeout(() => {
        let fieldValue = inputElement.value;
        fieldValue = fieldValue.replace(/[^A-Za-z ]+/g, '');
        fieldValue = fieldValue.replace(/\s{2,}/g, ' ');
        formGroup.controls[field].setValue(fieldValue);
      }, 0);
    }
  }

  public allowOnlyNumbers(event: Event): void {
    const inputElement = event.target as HTMLInputElement;

    if (event.type === 'keypress') {
      const keyEvent = event as KeyboardEvent;
      const charCode = keyEvent.charCode || keyEvent.keyCode || (keyEvent as any).which;
      const char = String.fromCharCode(charCode);

      if (!/^\d$/.test(char) && !keyEvent.metaKey && !keyEvent.ctrlKey && charCode !== 8) {
        event.preventDefault();
      }
    } else if (event.type === 'paste') {
      const clipboardData =
        (event as ClipboardEvent).clipboardData || (window as any).clipboardData;
      const pastedData = clipboardData.getData('text');

      if (!/^\d+$/.test(pastedData)) {
        event.preventDefault();
      } else {
        setTimeout(() => {
          inputElement.value = inputElement.value.replace(/[^0-9]/g, '');
        }, 0);
      }
    } else if (event.type === 'input') {
      const sanitizedValue = inputElement.value.replace(/[^0-9]/g, '');
      if (inputElement.value !== sanitizedValue) {
        inputElement.value = sanitizedValue;
      }
    }
  }
}
