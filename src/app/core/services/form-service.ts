// form-service.ts
import { Injectable } from '@angular/core';
import { UntypedFormGroup, AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  /**
   * function to get the current value of form.
   * @param form - The form group
   * @returns current form value
   */
  getFormValue(form: UntypedFormGroup): any {
    return form.value;
  }

  /**
   * function to get current value of given form control
   * @param form - The form group
   * @param controlName - Name of the form control
   * @returns control value or null if control not found
   */
  getControlValue(form: UntypedFormGroup, controlName: string): any {
    const control = form.get(controlName);
    return control ? control.value : null;
  }

  /**
   * function to set the given value to control
   * @param form - The form group
   * @param controlName - Name of the form control
   * @param value - Value to set
   */
  setControlValue(form: UntypedFormGroup, controlName: string, value: any): void {
    const control = form.get(controlName);
    if (control) {
      control.setValue(value);
    }
  }

  /**
   * function to get form status
   * @param form - The form group
   * @returns form status
   */
  isFormValid(form: UntypedFormGroup): boolean {
    return form.valid;
  }

  /**
   * function to check if form control is valid
   * @param form - The form group
   * @param controlName - Name of the form control
   * @returns boolean indicating if control is valid
   */
  isControlValid(form: UntypedFormGroup, controlName: string): boolean {
    const control = form.get(controlName);
    return control ? control.valid : false;
  }

  /**
   * function to check if form control is touched
   * @param form - The form group
   * @param controlName - Name of the form control
   * @returns boolean indicating if control is touched
   */
  isControlTouched(form: UntypedFormGroup, controlName: string): boolean {
    const control = form.get(controlName);
    return control ? control.touched : false;
  }

  /**
   * function to check if form control is dirty
   * @param form - The form group
   * @param controlName - Name of the form control
   * @returns boolean indicating if control is dirty
   */
  isControlDirty(form: UntypedFormGroup, controlName: string): boolean {
    const control = form.get(controlName);
    return control ? control.dirty : false;
  }

  /**
   * function to get errors for a specific form control
   * @param form - The form group
   * @param controlName - Name of the form control
   * @returns errors object or null
   */
  getControlErrors(form: UntypedFormGroup, controlName: string): any | null {
    const control = form.get(controlName);
    return control ? control.errors : null;
  }

  /**
   * function to mark form control as touched
   * @param form - The form group
   * @param controlName - Name of the form control
   */
  markControlAsTouched(form: UntypedFormGroup, controlName: string): void {
    const control = form.get(controlName);
    if (control) {
      control.markAsTouched();
    }
  }

  /**
   * function to mark form control as untouched
   * @param form - The form group
   * @param controlName - Name of the form control
   */
  markControlAsUntouched(form: UntypedFormGroup, controlName: string): void {
    const control = form.get(controlName);
    if (control) {
      control.markAsUntouched();
    }
  }

  /**
   * function to disable form control
   * @param form - The form group
   * @param controlName - Name of the form control
   */
  disableControl(form: UntypedFormGroup, controlName: string): void {
    const control = form.get(controlName);
    if (control) {
      control.disable();
    }
  }

  /**
   * function to enable form control
   * @param form - The form group
   * @param controlName - Name of the form control
   */
  enableControl(form: UntypedFormGroup, controlName: string): void {
    const control = form.get(controlName);
    if (control) {
      control.enable();
    }
  }

  /**
   * function to reset form control
   * @param form - The form group
   * @param controlName - Name of the form control
   */
  resetControl(form: UntypedFormGroup, controlName: string): void {
    const control = form.get(controlName);
    if (control) {
      control.reset();
    }
  }

  /**
   * function to get all form values
   * @param form - The form group
   * @returns form values
   */
  getAllFormValues(form: UntypedFormGroup): any {
    return form.getRawValue();
  }

  /**
   * function to patch form values
   * @param form - The form group
   * @param values - Values to patch
   */
  patchFormValues(form: UntypedFormGroup, values: any): void {
    form.patchValue(values);
  }

  /**
   * function to reset form
   * @param form - The form group
   */
  resetForm(form: UntypedFormGroup): void {
    form.reset();
  }

  /**
   * function to check if form has errors
   * @param form - The form group
   * @returns boolean indicating if form has errors
   */
  hasFormErrors(form: UntypedFormGroup): boolean {
    return form.invalid;
  }
}
