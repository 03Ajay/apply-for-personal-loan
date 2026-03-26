// config-resolve.service.ts
import {
  Injectable,
  Renderer2,
  RendererStyleFlags2,
  RendererFactory2,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
  NavigationEnd,
  Router,
  NavigationStart,
  ActivatedRoute,
} from '@angular/router';
import { ConfigService } from './config.service';
import { Observable, Subscription } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { CommonConstants } from '../utilities/common-constants';
import { EmitterService } from './emitter-service';
import { isPlatformBrowser } from '@angular/common';

interface RouteData {
  title?: string;
  [key: string]: any;
}

@Injectable({
  providedIn: 'root',
})
export class ConfigResolveService implements Resolve<ConfigService> {
  private renderer: Renderer2;
  private isBrowser: boolean;
  private routerSubscription: Subscription | null = null;

  constructor(
    private router: Router,
    private titleService: Title,
    private emitterService: EmitterService,
    rendererFactory: RendererFactory2,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  public resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<any> | Promise<any> | any {
    return this.setRouteTitle();
  }

  private setRouteTitle(): any {
    this.routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const urlsToSkip = ['/additionaldetailsloans'];
        if (!urlsToSkip.includes(event?.urlAfterRedirects || '')) {
          this.emitterService.Get(CommonConstants.EmitterEventTypes.LoadingEvent).emit(false);
        }
        this.seoContentVisibility();
      } else if (event instanceof NavigationStart) {
        this.emitterService.Get(CommonConstants.EmitterEventTypes.LoadingEvent).emit(true);
      }
    });
    return ConfigService.getInstance().getConfigData();
  }

  /**
   * Get title from route data recursively
   * @param state - Current router state
   * @param parent - Parent activated route
   * @returns Array of title strings
   */
  private getTitle(state: RouterStateSnapshot | null, parent: ActivatedRoute | null): string[] {
    const data: string[] = [];

    if (parent && parent.snapshot.data && parent.snapshot.data['title']) {
      data.push(parent.snapshot.data['title']);
    }

    if (state && parent) {
      const firstChild = this.getFirstChild(parent);
      if (firstChild) {
        data.push(...this.getTitle(state, firstChild));
      }
    }

    return data;
  }

  /**
   * Get first child of activated route
   * @param route - Activated route
   * @returns First child route or null
   */
  private getFirstChild(route: ActivatedRoute): ActivatedRoute | null {
    return route.firstChild || null;
  }

  /**
   * Set page title from route data
   * @param state - Router state
   * @param route - Activated route
   */
  private setPageTitle(state: RouterStateSnapshot, route: ActivatedRoute): void {
    const titles = this.getTitle(state, route);
    if (titles.length > 0) {
      const pageTitle = titles.reverse().join(' | ');
      this.titleService.setTitle(pageTitle);
    }
  }

  /**
   * Control visibility of SEO content based on URL
   */
  seoContentVisibility(): void {
    if (!this.isBrowser) return;

    const loader = document.getElementById('seo-content');
    if (!loader) return;

    const currentUrl = window.location.href;
    const urlSegments = currentUrl.split('/');
    const lastSegment = urlSegments[urlSegments.length - 1];

    if (lastSegment !== '' && !lastSegment.startsWith('?')) {
      // Hide SEO content when there's a path after the base URL
      this.renderer.setStyle(loader, 'display', 'none', RendererStyleFlags2.Important);
    } else {
      // Show SEO content on root path
      this.renderer.setStyle(loader, 'display', 'block', RendererStyleFlags2.Important);
    }
  }

  /**
   * Clean up subscriptions on destroy
   */
  ngOnDestroy(): void {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
      this.routerSubscription = null;
    }
  }
}
