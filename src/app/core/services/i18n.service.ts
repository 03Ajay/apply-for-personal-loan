// i18n.service.ts
import { EmitterService } from './emitter-service';
import { EventEmitter, Inject, Injectable, PLATFORM_ID } from '@angular/core';
// @ts-ignore - Temporarily ignore if module is not installed
import { TranslateService } from '@ngx-translate/core';
import { Observable, Subscription } from 'rxjs';
import { CommonConstants } from '../utilities/common-constants';
import { StorageHandlerService } from './storage-handler.service';
import { callStatellite, digitalData } from './adobe-service';
import { ConfigService } from './config.service';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';

export interface LanguageChangeEvent {
  lang: string;
  translations?: any;
}

@Injectable({
  providedIn: 'root',
})
export class I18nService {
  public displayLanguages: Array<{ name: string; value: string }> = [
    { name: 'English', value: 'en' },
    { name: 'हिन्दी', value: 'hn_IN' },
    { name: 'বাংলা', value: 'bn_IN' },
    { name: 'தமிழ்', value: 'tm_IN' },
    { name: 'ગુજરાતી', value: 'gj_IN' },
    { name: 'తెలుగు', value: 'te_IN' },
    { name: 'ಕನ್ನಡ', value: 'kn_IN' },
    { name: 'मराठी', value: 'mr_IN' },
    { name: 'English+Hindi', value: 'en+hn_IN' },
  ];

  public static savedLanguages: Map<string, string> = new Map([
    ['en', 'English'],
    ['hn_IN', 'Hindi'],
    ['bn_IN', 'Bangla'],
    ['tm_IN', 'Tamil'],
    ['gj_IN', 'Gujrati'],
    ['te_IN', 'Telugu'],
    ['kn_IN', 'Kannada'],
    ['mr_IN', 'Marathi'],
    ['en+hn_IN', 'English+Hindi'],
  ]);

  public languages: string[] = [
    'en',
    'hn_IN',
    'bn_IN',
    'tm_IN',
    'gj_IN',
    'te_IN',
    'kn_IN',
    'mr_IN',
    'en+hn_IN',
  ];

  public langChangeEvent: EventEmitter<LanguageChangeEvent | string> = new EventEmitter<
    LanguageChangeEvent | string
  >();
  private translatedObj: any;
  private isBrowser: boolean;
  private langChangeSubscription: Subscription | null = null; // Initialize with null

  constructor(
    @Inject(TranslateService) public translate: TranslateService,
    private http: HttpClient,
    private emitterService: EmitterService,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.initializeTranslation();
  }

  private initializeTranslation(): void {
    if (!this.isBrowser) return;

    // Check if translate service is available
    if (!this.translate) {
      console.warn('TranslateService not available');
      return;
    }

    try {
      this.translate.addLangs(this.languages);
      this.translate.setDefaultLang('en');

      const defaultLang = StorageHandlerService.getCookie(CommonConstants.StorageKeys.language);
      if (defaultLang && defaultLang !== 'undefined' && defaultLang !== '') {
        this.translate.use(defaultLang);
      } else {
        this.translate.use('en');
        StorageHandlerService.setCookie(CommonConstants.StorageKeys.language, 'en');
      }

      this.langChangeSubscription = this.translate.onLangChange.subscribe((res: any) => {
        this.onLangChange(res);
        const productId = StorageHandlerService.get('productid');
        if (this.isBrowser && productId) {
          this.selectLanguage(res.lang, productId);
        }
      });
    } catch (error) {
      console.error('Error initializing translation:', error);
    }
  }

  // when user selects the language
  selectLanguage(selectedLanguage: string, productId: string): void {
    try {
      if (digitalData?.event) {
        digitalData.event.eventContext = digitalData.event.eventContext || {};
        digitalData.product.productId = productId || '';
        digitalData.event.eventContext.selectedLanguage = selectedLanguage || '';
        digitalData.event.eventName = 'select language';
        callStatellite('select-language');
      }
    } catch (err) {
      console.warn('Error in selectLanguage:', err);
    }
  }

  /**
   * Translate string with parameters.
   * property String to be searched
   * translate.get('property').subscribe((res: string) => {
   *  console.log(res);
   * });
   */
  public getValue(property: string): Observable<string | any> {
    if (!this.translate) {
      return new Observable((subscriber) => subscriber.next(property));
    }
    return this.translate.get(property);
  }

  /**
   * Translate string with parameters.
   * property String to be searched
   * @param params Object with name value pair
   * e.g.
   * mystring:"this is {{1}} and {{2}}"
   * params obj would be {1:'txt1',2:txt2} <br/>
   * translate.get('mystring', {1:'txt1',2:txt2}).subscribe((res: string) => {
   *      console.log(res);    //=> 'hello world'
   *  });
   */
  public getValueWithParams(
    property: string,
    params: Record<string, any>,
  ): Observable<string | any> {
    if (!this.translate) {
      return new Observable((subscriber) => subscriber.next(property));
    }
    return this.translate.get(property, params);
  }

  private onLangChange(lang: { lang: string; translations: any }): void {
    const sessionValue = StorageHandlerService.get(CommonConstants.StorageKeys.paramLang);

    if (
      sessionValue &&
      sessionValue !== 'undefined' &&
      sessionValue !== '' &&
      this.languages.includes(sessionValue)
    ) {
      StorageHandlerService.setCookie(CommonConstants.StorageKeys.language, sessionValue);
      this.langChangeEvent.emit(sessionValue);
      this.translate.use(sessionValue);
      StorageHandlerService.delete(CommonConstants.StorageKeys.paramLang);
    } else {
      const oldValue = StorageHandlerService.getCookie(CommonConstants.StorageKeys.language);
      StorageHandlerService.setCookie(CommonConstants.StorageKeys.oldLauguage, oldValue);
      StorageHandlerService.setCookie(CommonConstants.StorageKeys.language, lang.lang);
      this.translate.use(!this.languages.includes(lang.lang) ? 'en' : lang.lang);
      this.langChangeEvent.emit(lang);

      const applicationId = StorageHandlerService.get(CommonConstants.StorageKeys.applicationId);
      const newLanguage = StorageHandlerService.getCookie(CommonConstants.StorageKeys.language);
      const oldLanguage = StorageHandlerService.getCookie(CommonConstants.StorageKeys.oldLauguage);

      if (applicationId && newLanguage !== oldLanguage) {
        this.saveLangChange(applicationId).subscribe({
          next: (res1) => {
            console.log('Language save response:', res1);
            const source = StorageHandlerService.getCookie(CommonConstants.StorageKeys.source);
            if (source === 'en' && oldValue === lang.lang) {
              this.emitterService.Get(CommonConstants.EmitterEventTypes.LoadingEvent).emit(true);
            }
          },
          error: (err) => console.error('Error saving language change:', err),
        });
      }
    }
  }

  public saveLangChange(applicationId: string): Observable<any> {
    const newLangCode = StorageHandlerService.getCookie(CommonConstants.StorageKeys.language);
    const oldLangCode = StorageHandlerService.getCookie(CommonConstants.StorageKeys.oldLauguage);

    const newLang =
      I18nService.savedLanguages.get(newLangCode) || I18nService.savedLanguages.get('en');
    const oldLang = I18nService.savedLanguages.get(oldLangCode);

    const reqData = {
      fieldCode: 1,
      fieldName: 'UI Language',
      newFieldValue: newLang || I18nService.savedLanguages.get('en'),
      oldFieldValue: newLang?.toLowerCase() === oldLang?.toLowerCase() ? '' : oldLang,
    };

    const config = ConfigService.getInstance()?.getConfigObject();
    const url = config?.APIURL?.saveLangauge?.replace('{applicationId}', applicationId);

    if (!url) {
      console.error('API URL for saveLangauge not found');
      return new Observable((subscriber) => subscriber.error('URL not found'));
    }

    return this.http.post(url, reqData);
  }

  ngOnDestroy(): void {
    if (this.langChangeSubscription) {
      this.langChangeSubscription.unsubscribe();
      this.langChangeSubscription = null;
    }
  }
}
