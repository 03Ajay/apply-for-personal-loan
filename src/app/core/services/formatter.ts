// formatter.ts - Fixed version with null safety
import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

interface KeyboardEventWithTarget extends KeyboardEvent {
  target: HTMLInputElement;
  keyCode: number;
  type: string;
  selectionEnd: number | null;
  selectionStart: number | null;
}

const CurrencyCoversionUnits = {
  Lacs: 100000,
  Crore: 10000000,
};

@Injectable({
  providedIn: 'root',
})
export class Formatter {
  public monthNames: string[] = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'June',
    'July',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  public day: string[] = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  /**
   * Convert string to currency format
   */
  public ToCurrency(value: string): string {
    if (!value) return '';
    return this.inrFormat(value.replace(/\,/g, ''));
  }

  /**
   * Format input value to currency on the fly
   */
  public FormatToCurrency($event: KeyboardEventWithTarget): KeyboardEventWithTarget {
    // Null-safe access with fallback values
    const keyPosition = $event.target.selectionEnd ?? 0;
    const value = $event.target.value ?? '';
    const cursorStart = $event.target.selectionStart ?? 0;

    const isValidKey =
      ($event.keyCode >= 48 && $event.keyCode <= 57) ||
      ($event.keyCode >= 96 && $event.keyCode <= 105) ||
      $event.keyCode === 8 ||
      $event.keyCode === 46 ||
      $event.type === 'blur';

    if (isValidKey) {
      const beforeLength = $event.target.value.length;
      $event.target.value = this.ToCurrency(value);
      const afterLength = $event.target.value.length;

      // Safe calculation with fallback
      const newPosition = keyPosition - (beforeLength - afterLength);
      $event.target.selectionEnd = Math.max(0, newPosition);
      $event.target.selectionStart = Math.max(0, newPosition);
    } else {
      $event.target.selectionEnd = keyPosition;
      $event.target.selectionStart = cursorStart;
    }
    return $event;
  }

  /**
   * Date Formatter input date in format mm-dd-yyyy
   * Output mmm-yy date format
   */
  public toUIDateFormat(value: string): string {
    if (!value) return '';
    const inputDate = new Date(value);
    if (isNaN(inputDate.getTime())) return '';

    const outputDate =
      this.monthNames[inputDate.getMonth()] + '-' + inputDate.getFullYear().toString().substr(2, 2);
    return outputDate;
  }

  /**
   * Date Formatter input date in format mm-dd-yyyy
   * Output dd-mmm date format
   */
  public toUIDateFormatWithDate(value: string): string {
    if (!value) return '';
    const inputDate = new Date(value);
    if (isNaN(inputDate.getTime())) return '';

    const outputDate = inputDate.getDate() + '-' + this.monthNames[inputDate.getMonth()];
    return outputDate;
  }

  /**
   * Date Formatter input date in format mm-dd-yyyy
   * Output dd-mmm yyyy date format
   */
  public toUIDateFormatWithYear(value: string): string {
    if (!value) return '';
    const inputDate = new Date(value);
    if (isNaN(inputDate.getTime())) return '';

    const outputDate =
      inputDate.getDate() +
      '-' +
      this.monthNames[inputDate.getMonth()] +
      ' ' +
      inputDate.getFullYear();
    return outputDate;
  }

  public toSmallCase(str: string): string {
    return str?.toLowerCase() || '';
  }

  public toUpperCase(str: string): string {
    return str?.toUpperCase() || '';
  }

  /**
   * Input: date
   * Output ordinal suffix (st, nd, rd, th)
   */
  public ordinal_suffix_of(i: number): string {
    const j = i % 10;
    const k = i % 100;
    if (j === 1 && k !== 11) {
      return 'st';
    }
    if (j === 2 && k !== 12) {
      return 'nd';
    }
    if (j === 3 && k !== 13) {
      return 'rd';
    }
    return 'th';
  }

  /**
   * Returns day name from date
   */
  public toUIgetDay(val: string): string {
    if (!val) return '';
    const inputDate = new Date(val);
    if (isNaN(inputDate.getTime())) return '';

    const outputDate = inputDate.getDay();
    return this.day[outputDate] || '';
  }

  public CapitalizeText(inputText: string): string {
    if (!inputText) return '';
    inputText = inputText.toLowerCase();
    return inputText[0].toUpperCase().concat(inputText.substr(1));
  }

  public ConvertCurrenyToUnit(value: string | number, conversionUnit: number): number {
    if (!value) return 0;
    const amount = parseInt(value.toString().replace(/,/g, ''), 10);
    return amount > 0 ? amount / conversionUnit : 0;
  }

  public ConvertNumberToAmount(value: number): string {
    if (!value || value <= 0) return '';

    let amount: string = '';
    if (value < 9999999) {
      amount = this.ConvertCurrenyToUnit(value, CurrencyCoversionUnits.Lacs).toString();
      amount =
        (amount.indexOf('.') > -1 ? amount.slice(0, amount.indexOf('.') + 3) : amount) + ' Lakhs';
    } else if (value > 9999999) {
      amount = this.ConvertCurrenyToUnit(value, CurrencyCoversionUnits.Crore).toString();
      amount =
        (amount.indexOf('.') > -1 ? amount.slice(0, amount.indexOf('.') + 3) : amount) + ' Crore';
    }
    return amount;
  }

  public ConvertGuradKeyToGuardToken(guardKey: string): string {
    const salt = 'B!&1j';
    const timeStamp = new Date().getTime();
    const token = salt.concat('|', timeStamp.toString(), '|', guardKey);
    return btoa(token);
  }

  public autoDateformat(
    $event: KeyboardEventWithTarget,
    fullDateFormat: boolean,
  ): KeyboardEventWithTarget {
    const key: number = $event.keyCode;
    const value: string = $event.target.value;

    // Prevent alphabetic characters
    if (
      (65 <= key && key <= 90) ||
      (key > 185 && key <= 192) ||
      (key > 218 && key < 223 && $event.shiftKey === true)
    ) {
      $event.target.value = value.substr(0, value.length - 1);
      return $event;
    }

    // Add slashes for date format
    if (fullDateFormat === true && (value.length === 2 || value.length === 5) && key !== 8) {
      $event.target.value = value + '/';
      return $event;
    } else if (value.length === 2 && key !== 8) {
      $event.target.value = value + '/';
      return $event;
    }
    return $event;
  }

  public AddRemoveHyphen(value: string, addRemoveState: boolean): string {
    if (!value) {
      return '';
    }
    if (addRemoveState) {
      const matchResult = value.match(new RegExp('.{1,4}', 'g'));
      return matchResult ? matchResult.join('-') : value;
    } else {
      return value.split('-').join('');
    }
  }

  private inrFormat(nStr: string): string {
    if (!nStr) return '';

    nStr += '';
    const x = nStr.split('.');
    let x1 = x[0];
    const x2 = x.length > 1 ? '.' + x[1] : '';
    let rgx = /(\d+)(\d{3})/;
    let z = 0;
    const len = String(x1).length;
    let num = parseInt((len / 2 - 1).toString(), 10);

    while (rgx.test(x1)) {
      if (z > 0) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
      } else {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
        rgx = /(\d+)(\d{2})/;
      }
      z++;
      num--;
      if (num === 0) {
        break;
      }
    }
    return x1 + x2;
  }

  public formatName(control: AbstractControl | any): void {
    if (!control || !control.value) return;

    const tempName = (control.value ?? '')
      .replace(/\s\s+/g, ' ')
      .replace(/^\s\s*/, '')
      .replace(/\s\s*$/, '');
    control.setValue(tempName);
  }

  /**
   * Adding comma in amount format
   */
  public numberFormat(value: string | number): string {
    if (!value && value !== 0) return '';

    let num = ('' + value).replace(/,/g, '.');
    let n1: string;
    let n2: string | null;
    num = num + '' || '';

    // works for integer and floating as well
    const splitNum = num.split('.');
    n1 = splitNum[0];
    n2 = splitNum[1] || null;
    n1 = n1.replace(/(\d)(?=(\d\d)+\d$)/g, '$1,');
    num = n2 ? n1 + '.' + n2 : n1;
    return num;
  }

  /**
   * Remove single space
   */
  public removeSpaces = (control: AbstractControl): null => {
    if (control && control.value && !control.value.replace(/\s/g, '').length) {
      control.setValue('');
    }
    return null;
  };

  // Convert Number To Words Starts Here
  public convertNumberToWords(val: string): string | null {
    if (!val) return null;

    const amount = val;
    const temp = amount.split('.');
    const value = temp[0].split(',').join('');
    const fraction = Math.round(this.frac(parseFloat(value)) * 100);
    let fText = '';

    if (fraction > 0) {
      fText = 'And ' + this.convert_number(fraction) + ' Paise';
    }

    const res = this.convert_number(parseInt(value, 10));
    if (res !== '') {
      return res + ' Rupee ' + fText + ' Only';
    } else {
      return null;
    }
  }

  public frac(f: number): number {
    return f % 1;
  }

  public convert_number(num: number): string {
    if (num < 0 || num > 999999999) {
      return 'NUMBER OUT OF RANGE!';
    }

    const Gn = Math.floor(num / 10000000); // Crore
    num -= Gn * 10000000;
    const kn = Math.floor(num / 100000); // lakhs
    num -= kn * 100000;
    const Hn = Math.floor(num / 1000); // thousand
    num -= Hn * 1000;
    const Dn = Math.floor(num / 100); // Tens (deca)
    num = num % 100; // Ones
    const tn = Math.floor(num / 10);
    const one = Math.floor(num % 10);
    let res = '';

    if (Gn > 0) {
      res += this.convert_number(Gn) + ' Crore';
    }
    if (kn > 0) {
      res += (res === '' ? '' : ' ') + this.convert_number(kn) + ' Lakh';
    }
    if (Hn > 0) {
      res += (res === '' ? '' : ' ') + this.convert_number(Hn) + ' Thousand';
    }
    if (Dn) {
      res += (res === '' ? '' : ' ') + this.convert_number(Dn) + ' Hundred';
    }

    const ones: string[] = [
      '',
      'One',
      'Two',
      'Three',
      'Four',
      'Five',
      'Six',
      'Seven',
      'Eight',
      'Nine',
      'Ten',
      'Eleven',
      'Twelve',
      'Thirteen',
      'Fourteen',
      'Fifteen',
      'Sixteen',
      'Seventeen',
      'Eighteen',
      'Nineteen',
    ];

    const tens: string[] = [
      '',
      '',
      'Twenty',
      'Thirty',
      'Forty',
      'Fifty',
      'Sixty',
      'Seventy',
      'Eighty',
      'Ninety',
    ];

    if (tn > 0 || one > 0) {
      if (!(res === '')) {
        res += ' And ';
      }
      if (tn < 2) {
        res += ones[tn * 10 + one];
      } else {
        res += tens[tn];
        if (one > 0) {
          res += '-' + ones[one];
        }
      }
    }

    return res;
  }
  // Convert Number To Words Ends Here
}
