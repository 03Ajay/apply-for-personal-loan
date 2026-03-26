// route-handler.service.ts
import { ActivatedRoute, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Formatter } from './formatter';
import { SharedService } from './shared.service';
import { EmitterService } from './emitter-service';
import { CommonConstants } from '../utilities/common-constants';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RouteHandlerService {
  public Route: string | null = null;
  public NextTaskKey: string | null = null;
  public ExceptionKeyArr: any[] = [];
  private queryParamsSubscription: Subscription | null = null;

  constructor(
    public router: Router,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private sharedService: SharedService,
    private formatter: Formatter,
    private emitterService: EmitterService,
  ) {}

  public setQueryParams(): void {
    this.queryParamsSubscription = this.activatedRoute.queryParams.subscribe((param: any) => {
      if (param && Object.keys(param).length > 0) {
        this.setParamValue(param, CommonConstants.QueryParamsKeys.appUtmRefCode);
        this.setParamValue(param, CommonConstants.QueryParamsKeys.appUtmSource, 'Organic_markets');
        this.setParamValue(param, CommonConstants.QueryParamsKeys.appUtmMedium);
        this.setParamValue(param, CommonConstants.QueryParamsKeys.appUtmCampaign);
        this.setParamValue(param, CommonConstants.QueryParamsKeys.appUtmContent);
        this.setParamValue(param, CommonConstants.QueryParamsKeys.appUtmTerm);
        this.setParamValue(param, CommonConstants.QueryParamsKeys.pid);
        this.setParamValue(param, CommonConstants.QueryParamsKeys.BFLBranch);
        this.setParamValue(param, CommonConstants.QueryParamsKeys.GCLID);
        this.setParamValue(param, CommonConstants.QueryParamsKeys.IsMobile);
        this.setParamValue(param, CommonConstants.QueryParamsKeys.offferId);
        this.setParamValue(param, CommonConstants.QueryParamsKeys.journeySource);
        this.setParamValue(param, CommonConstants.QueryParamsKeys.applicationId);
        this.setParamValue(param, CommonConstants.QueryParamsKeys.mobileAppToken);
        this.setParamValue(param, CommonConstants.QueryParamsKeys.sessionId);
        this.setParamValue(param, CommonConstants.QueryParamsKeys.emailToken);
        this.setParamValue(param, CommonConstants.QueryParamsKeys.language);
        this.setParamValue(param, CommonConstants.QueryParamsKeys.appUtmPriority1);
        this.setParamValue(param, CommonConstants.QueryParamsKeys.appUtmPriority2);
      }
      this.utmSourceStamping();
    });
  }

  private setParamValue(param: any, key: string, defaultValue?: string): void {
    const value = param[key] || defaultValue || null;
    this.sharedService.setData(key, value);
  }

  private utmSourceStamping(): void {
    const utmSource = this.sharedService.getData(CommonConstants.QueryParamsKeys.appUtmSource);
    const utmMedium = this.sharedService.getData(CommonConstants.QueryParamsKeys.appUtmMedium);
    const campaign = this.sharedService.getData(CommonConstants.QueryParamsKeys.appUtmCampaign);
    const content = this.sharedService.getData(CommonConstants.QueryParamsKeys.appUtmContent);
    const term = this.sharedService.getData(CommonConstants.QueryParamsKeys.appUtmTerm);
    const priority1 = this.sharedService.getData(CommonConstants.QueryParamsKeys.appUtmPriority1);
    const priority2 = this.sharedService.getData(CommonConstants.QueryParamsKeys.appUtmPriority2);
    const pid = this.sharedService.getData(CommonConstants.QueryParamsKeys.pid);
    const utmType = pid ? 'pid' : 'utm';

    let utm = '';
    if (
      (utmSource || utmMedium || campaign || content || term || priority1 || priority2) &&
      utmType === 'utm'
    ) {
      utm = ['', utmSource, utmMedium, campaign, content, term, priority1, priority2].join(':');
    }

    this.sharedService.setData('UTM', pid || utm);
    const UTM = this.sharedService.getData('UTM');

    if (UTM && UTM !== '' && UTM !== undefined) {
      const UTMSplitValue = UTM.split(':');
      if (UTMSplitValue.length >= 6) {
        this.sharedService.setData(CommonConstants.QueryParamsKeys.appUtmSource, UTMSplitValue[1]);
        this.sharedService.setData(CommonConstants.QueryParamsKeys.appUtmMedium, UTMSplitValue[2]);
        this.sharedService.setData(
          CommonConstants.QueryParamsKeys.appUtmCampaign,
          UTMSplitValue[3],
        );
        this.sharedService.setData(CommonConstants.QueryParamsKeys.appUtmContent, UTMSplitValue[4]);
        this.sharedService.setData(CommonConstants.QueryParamsKeys.appUtmTerm, UTMSplitValue[5]);
        this.sharedService.setData(
          CommonConstants.QueryParamsKeys.appUtmPriority1,
          UTMSplitValue[6],
        );
        this.sharedService.setData(
          CommonConstants.QueryParamsKeys.appUtmPriority2,
          UTMSplitValue[7],
        );
      }
    }
  }

  public RouteToNextTask(
    nextTaskKey: string,
    exceptionKeysArr?: any[],
    callback?: (route: string) => void,
  ): void {
    this.NextTaskKey = this.formatter.toSmallCase(nextTaskKey) || '';

    if (exceptionKeysArr && exceptionKeysArr.length > 0 && callback) {
      this.checkExceptionKeys(exceptionKeysArr, callback);
    } else if (callback) {
      callback(this.NextTaskKey);
    } else if (this.NextTaskKey) {
      this.NavigateToView([this.NextTaskKey]);
    } else {
      console.error('ERROR:: Route not available.');
    }
  }

  private checkExceptionKeys(exceptionKeysArr: any[], callback: (route: string) => void): void {
    let toRoute = false;
    this.ExceptionKeyArr = exceptionKeysArr;

    for (let key of this.ExceptionKeyArr) {
      key = this.formatter.toSmallCase(key);
      if (this.NextTaskKey === key) {
        toRoute = false;
        callback(this.Route || '');
        break;
      } else {
        toRoute = true;
      }
    }

    if (toRoute && this.Route) {
      this.NavigateToView([this.Route]);
    }
  }

  public NavigateToView(viewKey: any[], target?: string): void {
    if (target) {
      window.open(viewKey.join('/'), target);
    } else {
      this.router.navigate(viewKey);
    }
  }

  public GoBack(): void {
    this.location.back();
  }

  public getSharedQueryParam(paramName: string): string {
    return this.sharedService.getData(paramName) || '';
  }

  public NavigateToViewWithQueryParams(viewKey: any[], params: any): void {
    this.router.navigate(viewKey, { queryParams: params });
  }

  public NavigateByUrl(path: any[], skipLocationChange: boolean = true): void {
    this.router
      .navigateByUrl(CommonConstants.Routes.loader, { skipLocationChange })
      .then(() => this.router.navigate(path))
      .catch((err) => console.error('Navigation error:', err));
  }

  ngOnDestroy(): void {
    this.queryParamsSubscription?.unsubscribe();
  }
}
