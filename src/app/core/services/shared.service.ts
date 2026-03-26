// shared.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

// Define an interface for the sharing data structure
interface SharingData {
  [key: string]: any;
}

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private sharingData: SharingData = {};
  public themeChange: Subject<string> = new Subject<string>();
  public theme: string = ''; // Initialize with empty string
  public getItNowSubscription: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isZeroTenureLoanAmount: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  /**
   * Sets the item in the object
   * @param prop - Key of the object
   * @param value - Value to be stored in the object
   */
  public setData(prop: string, value: any): void {
    if (!prop) {
      console.warn('SharedService: Attempted to set data with empty property name');
      return;
    }
    // internally mutate our state
    this.sharingData[prop] = value;
  }

  /**
   * Gets the item from the object
   * @param prop - Key of the object to fetch value
   * @returns The stored value or empty string if not found
   */
  public getData(prop?: string): any {
    // If no prop provided, return the entire data object
    if (!prop) {
      return { ...this.sharingData }; // Return a shallow copy to prevent direct mutation
    }

    // Use optional chaining and nullish coalescing
    return this.sharingData.hasOwnProperty(prop) ? this.sharingData[prop] : '';
  }

  /**
   * Get all data as a read-only object
   */
  public getAllData(): Readonly<SharingData> {
    return { ...this.sharingData };
  }

  /**
   * Check if a property exists
   * @param prop - Key to check
   */
  public hasData(prop: string): boolean {
    return this.sharingData.hasOwnProperty(prop);
  }

  /**
   * Remove a property from the shared data
   * @param prop - Key to remove
   */
  public removeData(prop: string): void {
    if (this.sharingData.hasOwnProperty(prop)) {
      delete this.sharingData[prop];
    }
  }

  /**
   * Clear all shared data
   */
  public clearAllData(): void {
    this.sharingData = {};
  }

  /**
   * Update theme and emit change
   * @param newTheme - The new theme value
   */
  public updateTheme(newTheme: string): void {
    this.theme = newTheme;
    this.themeChange.next(newTheme);
  }

  /**
   * Get current theme value
   */
  public getTheme(): string {
    return this.theme;
  }

  /**
   * Set get it now subscription status
   * @param status - The subscription status
   */
  public setGetItNowSubscription(status: boolean): void {
    this.getItNowSubscription.next(status);
  }

  /**
   * Set zero tenure loan amount status
   * @param status - The zero tenure loan amount status
   */
  public setZeroTenureLoanAmount(status: boolean): void {
    this.isZeroTenureLoanAmount.next(status);
  }
}
