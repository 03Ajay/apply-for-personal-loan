// import { HttpErrorResponse, HttpEvent, HttpResponse } from '@angular/common/http';
// import { EmitterService } from '../services/emitter-service';
// import { StorageHandlerService } from '../services/storage-handler.service';
// import { CommonConstants } from './common-constants';

// export const CommonFunction = {
//   /** Validate if application ID is valid (not null, 'null', or empty) */
//   isApplicationId: (appId: any): any => (appId && appId !== 'null' ? appId : false),

//   /** Disable console methods to prevent logging in production environments */
//   disableConsole: (): void => {
//     const noop = () => {};
//     const methods = [
//       'assert',
//       'clear',
//       'count',
//       'debug',
//       'dir',
//       'dirxml',
//       'exception',
//       'group',
//       'groupCollapsed',
//       'groupEnd',
//       'info',
//       'log',
//       'markTimeline',
//       'profile',
//       'profileEnd',
//       'table',
//       'time',
//       'timeEnd',
//       'timeStamp',
//       'trace',
//       'warn',
//     ];
//     const con = (window.console || {}) as any;
//     methods.forEach((method) => con[method] && (con[method] = noop));
//   },

//   /** Get EventSource for server-sent events with auth token replacement */
//   getEventSource: (url: string): EventSource => {
//     const authtoken = StorageHandlerService.getCookie(CommonConstants.StorageKeys.authtoken);
//     return new EventSource(url.replace('{authtoken}', authtoken ?? ''));
//   },

//   /** Emit events using EmitterService with standardized event types */
//   handleEmitter: (emit: EmitterService, event: string, isLoad: boolean): void => {
//     emit.Get(CommonConstants.EmitterEventTypes[event])?.emit(isLoad);
//   },

//   /** Modify response body to a consistent structure */
//   handleModRequest: (event: HttpResponse<any>): HttpResponse<any> => {
//     const { body, headers, status } = event;
//     return event.clone({
//       body: {
//         payload: body?.payload ?? body,
//         headers,
//         nextTask: body?.nextTask,
//         status,
//       },
//     });
//   },

//   /** Extract auth token from response headers */
//   getAuthToken: (res: HttpResponse<any>): string | null => {
//     return res?.headers?.get('authtoken') || null;
//   },

//   /** Store auth token if present */
//   storeAuthToken: (token: string | null): void => {
//     token && StorageHandlerService.setCookie(CommonConstants.StorageKeys.authtoken, token);
//   },

//   /** Toggle loader visibility */
//   toggleLoader: (emit: EmitterService, isLoading: boolean): void => {
//     CommonFunction.handleEmitter(emit, 'LoadingEvent', isLoading);
//   },

//   /** Check if URL is static/location data */
//   isStaticData: (url: string): boolean =>
//     url.includes('.json') || url.includes('referencedata/locations'),

//   /** Check if error has AUTH-802 code */
//   isAuthError802: (err: any): boolean => err?.error?.errorBean?.[0]?.errorCode === 'AUTH-802',

//   /** Check if error has AUTH_630 code */
//   isAuthError630: (err: any): boolean => err?.error?.errorCode === 'AUTH_630',
//   /** Check if error is 401/403 (excluding AUTH_630) */
//   isAuthorizationError: (err: HttpErrorResponse): boolean =>
//     (err.status === 401 || err.status === 403) && !CommonFunction.isAuthError802(err),

//   /** Check if session expired */
//   isSessionExpired: (err: any): boolean =>
//     (err.status === 401 || err.status === 403 || err?.status === 440) &&
//     CommonFunction.isAuthError630(err),

//   /** Determine error type for switch statement */
//   getErrorType: (err: HttpErrorResponse): string => {
//     if (CommonFunction.isSessionExpired(err)) return 'SESSION_EXPIRED';
//     if (CommonFunction.isAuthorizationError(err)) return 'UNAUTHORIZED';
//     return CommonFunction.isAuthError802(err) ? 'AUTH_802' : 'OTHER';
//   },

//   /** Stop loader (hide loading indicator) */
//   stopLoader: (emit: EmitterService): void => CommonFunction.toggleLoader(emit, false),

//   /** Emit session expired event */
//   emitSessionExpired: (emit: EmitterService): void => {
//     CommonFunction.handleEmitter(emit, 'SessionExpired', true);
//   },
// };
