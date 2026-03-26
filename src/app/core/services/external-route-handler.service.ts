// external-route-handler.service.ts
import { ActivatedRoute, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { CommonConstants } from '../utilities/common-constants';

// Define types for journey names and types
export type JourneyName = 'CAICWA' | 'SALR' | 'SEMP' | 'DOC';
export type JourneyType = 'om' | 'fldg';

// Define the UrlPathStringPath structure
interface UrlPathStringPath {
  CAICWA: {
    om: string;
    fldg: string;
  };
  SALR: {
    om: string;
    fldg: string;
  };
  SEMP: {
    om: string;
    fldg: string;
  };
  DOC: {
    om: string;
    fldg: string;
  };
  [key: string]: any; // Index signature for dynamic access
}

@Injectable({
  providedIn: 'root',
})
export class ExternalRouteHandlerService {
  constructor(
    public router: Router,
    private location: Location,
  ) {}

  /**
   * Navigate function for external redirection
   * @param journeyName - Journey name (CAICWA|SALR|SEMP|DOC)
   * @param journeyType - Journey type (om|fldg)
   * @param nextTaskKey - Next task key (pathname from service)
   */
  public NavigateToExternalUrl(
    journeyName: JourneyName,
    journeyType: JourneyType,
    nextTaskKey: string,
  ): void {
    const urlPathString = CommonConstants.UrlPathStringPath as UrlPathStringPath;

    // Type-safe access with fallback
    const journeyPath = urlPathString[journeyName]?.[journeyType];

    if (journeyPath) {
      const pathnameString = journeyPath + nextTaskKey;
      window.location.pathname = pathnameString;
    } else {
      console.error(`Invalid journey configuration: ${journeyName}/${journeyType}`);
    }
  }

  /**
   * Navigate back in history
   */
  public GoBack(): void {
    this.location.back();
  }

  /**
   * Navigate function with query parameters for external redirection
   * @param journeyName - Journey name (CAICWA|SALR|SEMP|DOC)
   * @param journeyType - Journey type (om|fldg)
   * @param nextTaskKey - Next task key (pathname from service)
   * @param queryParamsList - List of & separated query params
   */
  public NavigateToExternalUrlWithQueryParams(
    journeyName: JourneyName,
    journeyType: JourneyType,
    nextTaskKey: string,
    queryParamsList: string,
  ): void {
    const urlPathString = CommonConstants.UrlPathStringPath as UrlPathStringPath;

    // Type-safe access with fallback
    const journeyPath = urlPathString[journeyName]?.[journeyType];

    if (journeyPath) {
      const pathnameString = journeyPath + nextTaskKey;
      const fullUrl = window.location.origin + '/' + pathnameString + (queryParamsList || '');
      window.open(fullUrl, '_self');
    } else {
      console.error(`Invalid journey configuration: ${journeyName}/${journeyType}`);
    }
  }

  /**
   * Navigate to external URL with query parameters object
   * @param journeyName - Journey name (CAICWA|SALR|SEMP|DOC)
   * @param journeyType - Journey type (om|fldg)
   * @param nextTaskKey - Next task key (pathname from service)
   * @param queryParams - Query parameters object
   */
  public NavigateToExternalUrlWithQueryParamsObj(
    journeyName: JourneyName,
    journeyType: JourneyType,
    nextTaskKey: string,
    queryParams: Record<string, string | number | boolean>,
  ): void {
    const urlPathString = CommonConstants.UrlPathStringPath as UrlPathStringPath;

    // Type-safe access with fallback
    const journeyPath = urlPathString[journeyName]?.[journeyType];

    if (journeyPath) {
      const pathnameString = journeyPath + nextTaskKey;
      const queryString = this.buildQueryString(queryParams);
      const fullUrl =
        window.location.origin + '/' + pathnameString + (queryString ? '?' + queryString : '');
      window.open(fullUrl, '_self');
    } else {
      console.error(`Invalid journey configuration: ${journeyName}/${journeyType}`);
    }
  }

  /**
   * Navigate to external URL with complete URL string
   * @param url - Complete URL string
   * @param target - Target window (_self, _blank, etc.)
   */
  public NavigateToUrl(url: string, target: string = '_self'): void {
    if (url) {
      window.open(url, target);
    } else {
      console.error('Invalid URL provided');
    }
  }

  /**
   * Build query string from object
   * @param params - Query parameters object
   * @returns Query string
   */
  private buildQueryString(params: Record<string, string | number | boolean>): string {
    const queryParts: string[] = [];

    for (const key in params) {
      if (params.hasOwnProperty(key) && params[key] !== null && params[key] !== undefined) {
        const value = encodeURIComponent(params[key].toString());
        queryParts.push(`${key}=${value}`);
      }
    }

    return queryParts.join('&');
  }
}
