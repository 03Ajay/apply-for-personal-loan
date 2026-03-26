// storage-handler.service.ts
import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageHandlerService {
  public static isBrowser: boolean = false;

  constructor(@Inject(PLATFORM_ID) private _platformId: Object) {
    StorageHandlerService.isBrowser = isPlatformBrowser(this._platformId);
  }

  public static get(name: string): string | null {
    if (!StorageHandlerService.isBrowser) return null;
    const value = sessionStorage.getItem(name);
    return value !== null ? value : '';
  }

  public static set(name: string, value: string): void {
    if (StorageHandlerService.isBrowser) {
      sessionStorage.setItem(name, value);
    }
  }

  public static setCookie(name: string, value: string, expire?: string, path?: string): void {
    if (!StorageHandlerService.isBrowser) return;

    const domain = window.location.hostname;
    const now = new Date();
    const minutes = 30;
    now.setTime(now.getTime() + minutes * 60 * 1000);

    const isLocalhost = domain === 'localhost';
    const cookieString = `${name}=${value}; expires=${now.toUTCString()}; path=/${!isLocalhost ? '; secure' : ''}`;
    document.cookie = cookieString;
  }

  public static getCookie(name: string): string {
    if (!StorageHandlerService.isBrowser) return '';
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? match[2] : '';
  }

  public static delete(key: string): void {
    if (StorageHandlerService.isBrowser) {
      sessionStorage.removeItem(key);
    }
  }

  public static deleteCookie(name: string): void {
    if (!StorageHandlerService.isBrowser) return;

    const domain = window.location.hostname;
    const isLocalhost = domain === 'localhost';
    const cookieString = `${name}=; path=/; max-age=0${!isLocalhost ? '; secure' : ''}`;
    document.cookie = cookieString;
  }

  public static deleteAllCookies(): void {
    if (!StorageHandlerService.isBrowser) return;

    document.cookie.split(';').forEach((cookie) => {
      const eqPos = cookie.indexOf('=');
      const name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;
      document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
    });
  }

  public static clear(): void {
    if (StorageHandlerService.isBrowser) {
      sessionStorage.clear();
    }
  }

  public set(name: string, value: string): void {
    StorageHandlerService.set(name, value);
  }
}
