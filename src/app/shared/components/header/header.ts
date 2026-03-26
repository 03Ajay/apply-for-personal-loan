import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
  PLATFORM_ID,
  AfterViewInit,
  OnDestroy,
  ChangeDetectorRef,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { I18nService } from '../../../core/services/i18n.service';
import { RouteHandlerService } from '../../../core/services/route-handler.service';
import { StorageHandlerService } from '../../../core/services/storage-handler.service';
import { CommonConstants } from './../../../core/utilities/common-constants';
import { environment } from '../../../../environments/environment.npqmum';

@Component({
  selector: 'app-header',
  imports: [CommonModule, FormsModule],
  templateUrl: './header.html',
  styleUrls: ['./header.scss'],
})
export class Header implements OnInit, AfterViewInit, OnDestroy {
  @Input() headerText: string = '';
  @Input() isBackButtonVisible = false;
  @Input() isLanguageOptionVisible = true;
  @Input() isCompanyLogoVisible = false;
  @Input() isInfoIconVisible = false;

  @Output() BackArrowClick = new EventEmitter<void>();
  @Output() PageInfoClick = new EventEmitter<void>();

  currentLang = 'en';
  currentLangQueryParam = '';
  private currentRoute = '';
  private resizeListener: (() => void) | null = null;

  langFlag = true;
  isMobile = false;
  isBrowser = false;

  // Fixed image URL
  imageUrl = `${environment.serviceBaseUrls.RedirectDomain}${environment.cdnPath}bajajmarketslogoreverse.svg`;

  constructor(
    public i18nService: I18nService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private routeHandlerService: RouteHandlerService,
    private cdr: ChangeDetectorRef,
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    if (!this.isBrowser) return;

    this.initializeLanguage();
    this.initializeRouteAndFlags();
    this.addLogoPreloadImg();
    this.setupResizeListener();
  }

  ngAfterViewInit(): void {
    if (this.isBrowser) {
      this.updateMobileView();
    }
  }

  ngOnDestroy(): void {
    if (this.resizeListener && typeof window !== 'undefined') {
      window.removeEventListener('resize', this.resizeListener);
    }
  }

  private initializeLanguage(): void {
    try {
      this.currentLangQueryParam =
        this.routeHandlerService.getSharedQueryParam(CommonConstants.QueryParamsKeys.language) ||
        '';

      StorageHandlerService.set(CommonConstants.StorageKeys.paramLang, this.currentLangQueryParam);

      if (
        this.currentLangQueryParam &&
        this.i18nService.languages.includes(this.currentLangQueryParam)
      ) {
        this.currentLang = this.currentLangQueryParam;
      } else {
        this.currentLang = this.i18nService.translate.currentLang;
      }
    } catch (error) {
      console.error('Error initializing language:', error);
      this.currentLang = 'en';
    }
  }

  private initializeRouteAndFlags(): void {
    try {
      this.currentRoute = window.location.pathname;
      if (this.currentRoute.includes(CommonConstants.Routes.CustomerConsent)) {
        this.langFlag = false;
      }
    } catch (error) {
      console.error('Error initializing route:', error);
    }
  }

  private setupResizeListener(): void {
    if (typeof window === 'undefined') return;

    this.resizeListener = () => {
      this.updateMobileView();
    };
    window.addEventListener('resize', this.resizeListener);
  }

  private updateMobileView(): void {
    if (this.isBrowser && typeof window !== 'undefined') {
      const newMobileState = window.innerWidth < 640;
      if (this.isMobile !== newMobileState) {
        this.isMobile = newMobileState;
        this.cdr.detectChanges();
      }
    }
  }

  private addLogoPreloadImg(): void {
    if (!this.isBrowser) return;

    try {
      const link = document.createElement('link');
      link.rel = 'preconnect';
      link.href = this.imageUrl;
      link.setAttribute('as', 'image');
      link.setAttribute('crossorigin', '');
      document.head.appendChild(link);
    } catch (error) {
      console.warn('Failed to add preload link:', error);
    }
  }

  onBackArrowClickFn(): void {
    this.BackArrowClick.emit();
  }

  onPageInfoClickFn(): void {
    this.PageInfoClick.emit();
  }

  onLanguageChange(lang: string): void {
    try {
      if (lang && this.i18nService.languages.includes(lang)) {
        this.currentLang = lang;
        this.i18nService.translate.use(lang);
        this.cdr.detectChanges();
      }
    } catch (error) {
      console.error('Error changing language:', error);
    }
  }
}
