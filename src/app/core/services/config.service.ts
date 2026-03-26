// config.service.ts
import { Injectable } from '@angular/core';
import { CommonConstants } from './../utilities/common-constants';

// Define proper interfaces for type safety - FIXED duplicate index signature
export interface ServiceBaseUrls {
  DOMAIN01?: string;
  DOMAIN02?: string;
  AEMURL?: string;
  RedirectDomain?: string;
  [key: string]: string | undefined; // Single index signature
}

export interface ApiUrls {
  getRequiredDocumentData: string;
  getSecretKey: string;
  getTokenForUser: string;
  domainUrl: string;
  getWhatsAppConsent: string;
  addWhatsAppConsent: string;
  getOfferAmount: string;
  generateOTP: string;
  verifyOTP: string;
  checkEmailDomain: string;
  createApplication: string;
  verifyPanDetails: string;
  getPostPersonalDetails: string;
  updatePersonalDetails: string;
  postProductDetails: string;
  getLoginDetails: string;
  getProtectionPlanInfo: string;
  getLoanList: string;
  getloanListingDetails: string;
  modelBLeadPush: string;
  loanSelctionPost: string;
  downloadSchedule: string;
  pdfViewSchedule: string;
  postsummarydeatils: string;
  getPostSummaryDetails: string;
  rejectionPost: string;
  getBranchByIfsc: string;
  getPostBankDetails: string;
  postLoanAdditionalDetails: string;
  getLoanAdditionalDetails: string;
  getKycAddressDetails: string;
  postKycAddressDetails: string;
  postAxisOtpLoans: string;
  getLocationDetails: string;
  getSelectedLoanDetails: string;
  getLoanPurpose: string;
  designationSearch: string;
  getChannelData: string;
  getDataForStartTransaction: string;
  checkIncomeVerification: string;
  updatePerfiosStatus: string;
  getPostEmailDetails: string;
  getBankDetails: string;
  getPostOkycDetails: string;
  eSignUrl: string;
  sessionBasedToken: string;
  getCustDetails: string;
  getEsignOtp: string;
  markEsignComplete: string;
  getIfscByCityBranch: string;
  getStateDetails: string;
  getCityDetails: string;
  getTransactions: string;
  salaryTransactionSelection: string;
  getEmandateDetails: string;
  submitEmandateDeatials: string;
  getKycDetails: string;
  autoSaveProfileDetails: string;
  sendEventStatus: string;
  getStatusEvent: string;
  getDisbursementDetails: string;
  getAssistanceDetails: string;
  crossProductOffers: string;
  updateFinvuStatus: string;
  getLoanDisbursementDetails: string;
  fetchFinvuStatus: string;
  securedCookie: string;
  authenticateUser: string;
  addcustomer: string;
  validateOtp: string;
  authenticateValidUser: string;
  getCommonApis: string;
  saveLangauge: string;
  partnerLeadInfo: string;
  getusertask: string;
  KycProcessorRequest: string;
  getLoanSimulatorDetails: string;
  postLoanSimulator: string;
  getBorrowerKycdetails: string;
  processorStatus: string;
  getPreVkycInprogress: string;
  postPreVkycInprogress: string;
  pennyDropDetails: string;
  submitPennyDropEmandate: string;
  esignDocumentRequest: string;
  getBorrowerVKycdetails: string;
  getKycProcessorRequest: string;
  postEmandateOption: string;
  getAllEmandateReference: string;
  getLeegalityDetails: string;
  getBankList: string;
  getBankChannelOptions: string;
  getBflOcrStatus: string;
  initiateBflOcrProcess: string;
  aaFipPerformance: string;
  emailVerification: string;
  consentAccount: string;
  initiateAA: string;
  consentApplicationInfo: string;
  getLoanSummaryDetails: string;
  designationSmartSearh: string;
  postDocument: string;
  getMeStatus: string;
  postAASetu: string;
  postNextTask: string;
  getStatusInprogress: string;
  loanSummary: string;
  getThankYouPageDetails: string;
  callNowEventTrigger: string;
  otpVerification: string;
  pwaDetails: string;
  homeLoanCrossSellOffer: string;
  getSummaryStatus: string;
  getLocation: string;
  postAdpStatus: string;
  getAddressDetails: string;
  postAddressDetails: string;
  getCsatDetails: string;
  postCsatDetails: string;
  getCallbackofferApiStatus: string;
  getKisshtEligibleOfferDetails: string;
  initiateKisshtAAFlow: string;
  submitLoanOffer: string;
  initiateKisshtEkyc: string;
  postOffer: string;
  getPRVData: string;
  fetchExistingBankAC: string;
  kisstSubmitBankDetails: string;
  statusNACH: string;
  getDocument: string;
  getPreFinalOfferData: string;
  getKisshtThankYouPageData: string;
  getbankref: string;
  postUserConsent: string;
  initiateesign: string;
  getPartnerLoan: string;
  getPostPayULoanSimulator: string;
  inprogressLoader: string;
  uploadSelfie: string;
  digilockerRedirection: string;
  getSalutionCheck: string;
  verifyNameDetails: string;
  reviewDetails: string;
  getPayUInprogress: string;
  payULocationAccess: string;
  postDisbursementStatus: string;
  postAcceptOffer: string;
  postPayUBankDetails: string;
  payUVKyc: string;
  getSubOccupationTypes: string;
  nachTask: string;
  saveADPDetails: string;
  payUESignDocuments: string;
  payUTriggerOtp: string;
  payUESign: string;
  payUDisbursementStatus: string;
  getADPNewFieldsData: string;
  getpanverification: string;
  postpanverification: string;
  bankNameSmartSearch: string;
  payUIncomeVerification: string;
  payUAARedirection: string;
  resendSmsLink: string;
  postBackToListing: string;
  kbEsignDocuments: string;
  [key: string]: string; // Add index signature for dynamic access
}

export interface AemUrls {
  LoanListAem: string;
  NudgeTextAem: string;
  LandingPageImageUrl: string;
  LoanRejectionAem: string;
  CompanyLogoImageUrl: string;
  OfferCarousalBanners: string;
  AABannerVisibilityUrl: string;
  [key: string]: string; // Add index signature for dynamic access
}

export interface ConfigObject {
  APIURL: ApiUrls;
  AEMURL: AemUrls;
  [key: string]: any;
}

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  private static instance: ConfigService | null = null;
  private static isCreating = false;
  private config: ConfigObject | null = null;

  // Static method to get instance.
  public static getInstance(): ConfigService {
    if (ConfigService.instance === null) {
      ConfigService.isCreating = true;
      ConfigService.instance = new ConfigService();
      ConfigService.isCreating = false;
    }
    return ConfigService.instance;
  }

  constructor() {
    if (!ConfigService.isCreating) {
      throw new Error(
        "You can't call new in Singleton instances! " + 'Call ConfigService.getInstance() instead.',
      );
    }
    // Initialize configuration
    this.initializeConfig();
  }

  /* config service to get the initial data - Service API Path, date object,
    default imagepath etc. */
  public getConfigData(): void {
    try {
      // Get base URLs from environment
      const baseUrlList: ServiceBaseUrls = {
        DOMAIN01: (window as any).__env?.DOMAIN01 || 'https://api.bajajfinserv.in',
        DOMAIN02: (window as any).__env?.DOMAIN02 || 'https://api2.bajajfinserv.in',
        AEMURL: (window as any).__env?.AEMURL || 'https://aem.bajajfinserv.in',
        RedirectDomain:
          (window as any).__env?.RedirectDomain || 'https://www.bajajfinservmarkets.in',
      };

      // Create deep copies to avoid mutating original constants
      const allApiUrl: ApiUrls = { ...CommonConstants.APIURL } as ApiUrls;
      const allAemUrl: AemUrls = { ...CommonConstants.AEMURLs } as AemUrls;

      // Replace placeholders in API URLs
      Object.keys(baseUrlList).forEach((urlKey) => {
        const replacementValue = baseUrlList[urlKey];
        if (replacementValue) {
          // Replace in API URLs
          Object.keys(allApiUrl).forEach((key) => {
            if (allApiUrl[key]) {
              allApiUrl[key] = allApiUrl[key].replace(`{${urlKey}}`, replacementValue);
            }
          });

          // Replace in AEM URLs
          Object.keys(allAemUrl).forEach((aemKey) => {
            if (allAemUrl[aemKey]) {
              allAemUrl[aemKey] = allAemUrl[aemKey].replace(`{${urlKey}}`, replacementValue);
            }
          });
        }
      });

      const config: ConfigObject = {
        APIURL: allApiUrl,
        AEMURL: allAemUrl,
      };

      this.setConfigObject(config);
    } catch (error) {
      console.error('Error initializing config:', error);
      // Provide fallback configuration
      this.setConfigObject({
        APIURL: CommonConstants.APIURL as ApiUrls,
        AEMURL: CommonConstants.AEMURLs as AemUrls,
      });
    }
  }

  // Set config object.
  public setConfigObject(cfg: ConfigObject): void {
    this.config = cfg;
  }

  // Get config object.
  public getConfigObject(): ConfigObject | null {
    return this.config;
  }

  // Initialize configuration
  private initializeConfig(): void {
    this.getConfigData();
  }

  // Helper method to get a specific API URL
  public getApiUrl(key: keyof ApiUrls): string {
    return this.config?.APIURL?.[key] || '';
  }

  // Helper method to get a specific AEM URL
  public getAemUrl(key: keyof AemUrls): string {
    return this.config?.AEMURL?.[key] || '';
  }
}
