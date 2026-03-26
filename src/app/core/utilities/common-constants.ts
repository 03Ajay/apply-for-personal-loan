export class CommonConstants {
  public static DateRange = {
    MinAge: 18,
    MaxAge: 80,
  };

  public static StorageValues = {
    OMPL_VKYC: 'OMPL_VKYC',
    OMPL_EKYC: 'OMPL_EKYC',
  };

  public static EventNames = {
    thank_you_page_call_now: 'CREDIT-APPLICATION-USER-INTERACTION',
  };

  // Set query paramers keys
  public static QueryParamsKeys = {
    appUtmRefCode: 'utm_refcode',
    appUtmSource: 'utm_source',
    appUtmMedium: 'utm_medium',
    appUtmCampaign: 'utm_campaign',
    appUtmTerm: 'utm_term',
    appUtmContent: 'utm_content',
    appUtmPriority1: 'utm_priority1',
    appUtmPriority2: 'utm_priority2',
    BFLBranch: 'BFLBranch',
    GCLID: 'gclid',
    IsMobile: 'isMobile',
    pid: 'pid',
    applicationId: 'applicationid',
    journeySource: 'source',
    offferId: 'offerId',
    sessionId: 'session',
    emailToken: 'emailToken',
    mobileAppToken: 'mobileAppToken',
    // for kyc module redirection
    kycKey: 'KycKey',
    source: 'source',
    processId: 'processId',
    redirectionUrlForSOLJourney: 'redirectionUrlForSOLJourney',
    mobileNumber: 'mob',
    dateOfBirth: 'dob',
    language: 'lang',
    applicationKey: 'applicationKey',
    digioKycDone: 'digioKycDone',
    consentRequestCode: 'consentRequestCode',
    partnerRedirection: 'partnerRedirection',
    serviceCode: 'serviceCode',
    journeyType: 'journeyType',
  };

  // Set routes
  public static Routes = {
    Home: 'home',
    Login: '',
    ConnectionError: 'connectionerror',
    ProfDetails: 'profileDetails',
    OTPScreen: 'otpscreen',
    Listing: 'loansdetails',
    Loanlist: 'loanlisting',
    SummaryDetails: 'loanproductsummary',
    FppDetails: 'fppbundleselection',
    FppRejection: 'fpprejection',
    BankDetails: 'bankdetails',
    AdditionalDetails: 'additionaldetailsloans',
    SduiAdditionalDetails: 'sduiadditionaldetailsloans',
    RejectionScreen: 'loanrejection',
    RejectionOnHold: 'rejectiononhold',
    ThankYouScreen: 'esignthankyou',
    EmailVerification: 'emailverification',
    Esign: 'esign',
    IncomeVerification: 'incomeverification',
    OkycVerification: 'okycverification',
    SalaryVerification: 'salaryidentification',
    Emandate: 'emandate',
    Kyc: 'digiokycpage',
    LoanInProgress: 'loaninprogress',
    LoanDemogConsentOtp: 'loandemogconsentotp',
    KycInprogress: 'kycinprogress',
    loansimulator: 'LoanSimulatorUI',
    EmandateOption: 'emandateoption',
    KycDetails: 'kycaddresspage',
    postKycInprogress: 'postkycinprogress',
    PostEmandateInprogress: 'postemandateinprogress',
    PreVkycInprogress: 'prevkycinprogress',
    pennyDropInprogress: 'pennydropinprogress',
    PreThankYouInprogress: 'prethankyouinprogress',
    vKycThankYouScreen: 'vkycThankyou',
    preEsignInprogress: 'preesigninprogress',
    postEsignInprogress: 'postesigninprogress',
    vkycInprogress: 'vkycInprogress',
    postvkycinprogress: 'postvkycinprogress',
    rekycinprogress: 'rekycinprogress',
    postRekycinprogress: 'postRekycinprogress',
    unauthenticateUser: 'unauthenticateUser',
    EmailVerified: 'emailverified',
    CustomerConsent: 'customer-consent',
    ThankYou: 'thankyou',
    vkycRejectionPreview: 'kycRemarkTask',
    uploadDocument: 'panselfieinprogress',
    LoanApproval: 'loanapproval',
    offerDetails: 'offerdetails',
    // accountAgragator: 'account-agregator',
    PostInprogressADP: 'postinprogressadp',
    PreOfferScreen: 'preOfferScreen',
    DisbursementApprovalConsent: 'disbursementapprovalconsent',
    BflLoanDetails: 'bflthankyou',
    PreAASetuInprogress: 'preaasetuinprogress',
    PostAASetuInprogress: 'postaasetuinprogress',
    loanoffering: 'loanoffering',
    otpconsent: 'otpconsent',
    KbEteLoanSummary: 'kbeteloansummary',
    kbEteInprogress: 'kbeteinprogress',
    InProgress: 'bflinprogress',
    loader: 'loader',
    Geolocation: 'geolocation',
    reviewAddress: 'reviewaddress',
    locationPostInprogress: 'locationPostInprogress',
    kisshtInitiateKYC: 'initiateKYC',
    kycinprogresskissht: 'kycinprogresskissht',
    loanPlan: 'loanplan',
    payUConsent: 'checkconsent',
    payUKycDetails: 'selfieupload',
    preloanverification: 'preloanverification',
    postloanverification: 'postloanverification',
    BankDetailsKissht: 'bankdetailsKissht',
    initiateNACHKISSHT: 'initiateNACH',
    nachComplete: 'bankConfirmation',
    payULoanSimulator: 'loansimulator',
    kbpostemandate: 'kbpostemandate',
    Bankdetailskreditbee: 'bankdetailskreditbee',
    kbpreemandate: 'kbpreemandate',
    panVerification: 'panverification',
    preesign: 'preesign',
    inProgressLoader: 'selfieinprogress',
    digilocker: 'digilocker',
    digilockerinprogress: 'digilockerinprogress',
    payureviewDetails: 'payureviewdetails',
    payUBankDetails: 'payubankdetails',
    payUInprogress: 'payuinprogress',
    payulocationaccess: 'payulocationaccess',
    payUVKyc: 'payuvkyc',
    payUVKycInprogress: 'payuvkycinprogress',
    payUESign: 'payufetchdocument',
    payUNach: 'payunach',
    payUNachInprogress: 'payunachinprogress',
    payUPostInprogress: 'payupostinprogress',
    payUThankYou: 'payuthankyou',
    payURejection: 'payurejection',
    payUVkycPostInProgress: 'payuvkycpostinprogress',
    payUAAIncomeVerification: 'payuaaincomeverification',
    payUAAIncomeVerificationInprogress: 'payuaaincomeverificationinprogress',
    payUAAPostInprogress: 'payuaapostinprogress',
    kbKFSEsign: 'kbKFSEsign',
  };
  public static APIURL = {
    getRequiredDocumentData: '{DOMAIN01}/v1/referencedata/principals/{principalkey}/documents',
    getSecretKey: '{DOMAIN01}/v1/logins/ui/keys/{0}',
    getTokenForUser: '{DOMAIN01}/v1/logins/ui',
    domainUrl: '{DOMAIN01}',
    getWhatsAppConsent: '{DOMAIN01}/v1/whatsapp/getconsent',
    addWhatsAppConsent: '{DOMAIN01}/v1/whatsapp/addconsent',
    getOfferAmount: `{DOMAIN01}/v1/credit/applications/{applicationid}/offer?productCode={prodCode}`,
    generateOTP: `{DOMAIN01}/v1/logins/forms/mobile/otp`,
    verifyOTP: '{DOMAIN01}/v2/login/forms/mobile',
    checkEmailDomain: '{DOMAIN01}/v1/referencedata/checkdomain?email={0}',
    createApplication: '{DOMAIN01}/v2/credit/applications',
    verifyPanDetails: '{DOMAIN01}/v2/credit/applications/{applicationid}/pan-verification',
    getPostPersonalDetails: '{DOMAIN01}/v2/credit/applications/{applicationid}/profile',
    updatePersonalDetails: '{DOMAIN01}/v1/creditapplication/applications/{applicationid}/profiles',
    postProductDetails: '{DOMAIN01}/v2/credit/applications/{applicationid}/product',
    getLoginDetails: '{DOMAIN01}/v1/credit/applications/{applicationid}',
    getProtectionPlanInfo: '{DOMAIN01}/v1/credit/applications/{applicationid}/bundle/fpp',
    getLoanList:
      '{DOMAIN01}/v1/credit/applications/{applicationid}/product?amount={0}&tenure={1}&isSmallTicket={0}',
    getloanListingDetails: '{DOMAIN01}/v1/credit/applications/ompl/{applicationid}/product',
    modelBLeadPush: `{DOMAIN01}/v1/credit/applications/{applicationid}/parameters?l3ProductCode={l3Code}`,
    loanSelctionPost: '{DOMAIN01}/v1/credit/applications/{applicationid}/product',
    downloadSchedule: '{DOMAIN01}/v1/credit/applications/{applicationid}/loanRepaymentSchedule',
    pdfViewSchedule:
      '{DOMAIN01}/v1/creditesign/applications/{applicationid}/key-factsheet-document',
    postsummarydeatils: '{DOMAIN01}/v1/credit/applications/{applicationid}/summary',
    getPostSummaryDetails: '{DOMAIN01}/v1/credit/applications/{applicationid}/summary',
    rejectionPost: '{DOMAIN01}/v1/creditapplications/{applicationid}/bundle/reject',
    getBranchByIfsc: '{DOMAIN01}/v2/referencedata/banks?ifscCode={0}',
    getPostBankDetails: '{DOMAIN01}/v1/credit/applications/{applicationid}/bankdetails',
    postLoanAdditionalDetails:
      '{DOMAIN01}/v1/credit/applications/loans/{applicationid}/additionaldetail',
    getLoanAdditionalDetails:
      '{DOMAIN01}/v1/credit/applications/loans/{applicationid}/additionaldetail',
    getKycAddressDetails:
      '{DOMAIN01}/v1/credit/applications/loans/{applicationid}/additionaldetail',
    postKycAddressDetails:
      '{DOMAIN01}/v1/credit/applications/{applicationid}/primary-borrower-kycdetails',
    postAxisOtpLoans: '{DOMAIN01}/v1/credit/applications/{applicationid}/loan/process',
    getLocationDetails: '{DOMAIN01}/v2/referencedata/pincode/{pincodeKey}',
    getSelectedLoanDetails: '{DOMAIN01}/v1/credit/loans/{applicationid}/summary',
    getLoanPurpose: '{DOMAIN01}/v1/applications/loanpurpose',
    designationSearch: `/v1/omsmartsearch/designation?designationDesc=`,
    getChannelData: '{DOMAIN01}/v1/verification/income/estimation?applicationKey={0}',
    getDataForStartTransaction:
      '{DOMAIN01}/v1/verification/income/estimation/{estimatedincomeRef}/perfios-request',
    checkIncomeVerification: '{DOMAIN01}/v1/credit/application/{applicationid}/verification/income',
    updatePerfiosStatus: '{DOMAIN01}/v1/verification/income/estimation/{estimatedincomeRef}',
    getPostEmailDetails: '{DOMAIN01}/v1/credit/applications/{applicationid}/emailverification',
    getBankDetails: '{DOMAIN01}/v2/referencedata/banks?bankName=',
    getPostOkycDetails: '{DOMAIN01}/v1/credit/applications/{applicationid}/kyc',
    eSignUrl: '{DOMAIN01}/v1/creditbusiness/{applicationid}/esign',
    sessionBasedToken: `{DOMAIN01}/v1/login/sessions/{session-id}/tokens`,
    getCustDetails: '{DOMAIN01}/v1/credit/applicationsinfo/{applicationid}',
    getEsignOtp: '{DOMAIN01}/v1/creditbusiness/{applicationid}/esign/consent',
    markEsignComplete: '{DOMAIN01}/v1/credit/applications/{applicationid}/esign',
    getIfscByCityBranch:
      '{DOMAIN01}/v2/referencedata/banks?bankMasterKey={0}&stateKey={1}&cityKey={2}&branchName=',
    getStateDetails: '{DOMAIN01}/v2/referencedata/states',
    getCityDetails: '{DOMAIN01}/v2/referencedata/cities?stateKey={0}',
    getTransactions:
      '{DOMAIN01}/v1/verification/income/estimation/{estimatedincomeRef}/statement/transactions',
    salaryTransactionSelection:
      '{DOMAIN01}/v1/verification/income/estimation/{estimatedincomeref}/statement/transactions',
    getEmandateDetails: '{DOMAIN01}/v1/credit/applications/{applicationid}/emandate',
    submitEmandateDeatials: '{DOMAIN01}/v1/credit/applications/{applicationid}/emandate',
    getKycDetails: '{DOMAIN01}/v1/credit/applications/{applicationid}/primary-borrower-kycdetails',
    autoSaveProfileDetails: '{DOMAIN01}/v2/credit/applications/{applicationid}/profile',
    sendEventStatus: '{DOMAIN01}/v1/credit/applications/{applicationid}/status',
    getStatusEvent:
      '{DOMAIN01}/v1/creditapplication/applications/{applicationKey}/card/status?l3ProdCode={l3ProdCode}&authtoken={authtoken}',
    getDisbursementDetails:
      '{DOMAIN01}/v1/credit/applications/{applicationid}/parameters?l3ProductCode={l3Code}',
    getAssistanceDetails:
      '{DOMAIN01}/v1/credit/applications/{applicationId}/assistance-nudge?isBFLShowing={isBFLShowing}',
    crossProductOffers: '{DOMAIN01}/v1/credit/cross-product-offers',
    updateFinvuStatus:
      '{DOMAIN01}/v1/verification/income/estimation/{estimatedIncomeRef}/aa-processor-request',
    getLoanDisbursementDetails:
      '{DOMAIN01}/v1/credit/applications/{applicationid}/parameters?l3ProductCode={l3Code}&generateAutoLoginUrl={generateAutoLoginUrl}',
    fetchFinvuStatus:
      '{DOMAIN01}/v1/verification/income/estimation/{estimatedIncomeRef}/aa-processor-status',
    securedCookie: '{DOMAIN01}/v3/logins/ui',
    authenticateUser: '{DOMAIN01}/v3/customers/login',
    addcustomer: '{DOMAIN01}/v2/customers',
    validateOtp: '{DOMAIN01}/v1/customers/login/session/{id}',
    authenticateValidUser: '{DOMAIN01}/v1/logins',
    getCommonApis:
      '{DOMAIN01}/v1/credit/principals/{principalKey}/reference-attributes/{referenceAttributeCode}/serviceable-codes?status={status}&serviceableValue={serviceableValue}',
    // saveMobDob: '{DOMAIN01}/v1/leadManagement/short-leads',
    saveLangauge: '{DOMAIN01}/v1/credit/applications/{applicationId}/preferences',
    partnerLeadInfo:
      '{DOMAIN01}/v1/credit/applications/partner-lead-info?forceLead=true&applicationId={applicationId}',
    getusertask: '{DOMAIN01}/v1/usertask/{usertask}?preview={preview}',
    KycProcessorRequest: '{DOMAIN01}/v2/kyc/{kycKey}/processor-request',
    getLoanSimulatorDetails: `/v2/credit/ompl/applications/{applicationid}/usertasks/loan-simulator`,
    postLoanSimulator: `/v2/credit/ompl/applications/{applicationid}/usertasks/loan-simulator`,
    getBorrowerKycdetails:
      '{DOMAIN01}/v1/credit/applications/{applicationid}/primary-borrower-kycdetails?kycMode=EKYC',
    processorStatus: '{DOMAIN01}/v2/kyc/{kycKey}/processor-status',
    getPreVkycInprogress: '{DOMAIN01}/v2/credit/ompl/applications/{applicationid}/usertasks/vkyc',
    postPreVkycInprogress: '{DOMAIN01}/v2/credit/ompl/applications/{applicationid}/usertasks/vkyc',
    pennyDropDetails:
      '{DOMAIN01}/v2/credit/ompl/applications/{applicationid}/usertasks/penny-drop-status',
    submitPennyDropEmandate:
      '{DOMAIN01}/v2/credit/ompl/applications/{applicationid}/usertasks/emandate',
    esignDocumentRequest:
      '{DOMAIN01}/v1/creditesign/applications/{applicationid}/document-esign-requests',
    getBorrowerVKycdetails:
      '{DOMAIN01}/v1/credit/applications/{applicationid}/primary-borrower-kycdetails?kycMode=VKYC',
    getKycProcessorRequest: '{DOMAIN01}/v2/processor-request',
    postEmandateOption: '{DOMAIN01}/v1/credit/applications/{applicationid}/emandate',
    getAllEmandateReference: '{DOMAIN01}/v1/payment/mandates?applicationKey={childapplicationid}',
    getLeegalityDetails:
      '{DOMAIN01}/v2/credit/ompl/applications/{applicationid}/usertasks/leegality',
    getBankList: '{DOMAIN01}/v2/smartsearch/banks',
    getBankChannelOptions:
      '{DOMAIN01}/v1/credit/applications/{applicationId}/bank-list-mode?bankCodes={bankCodes}',
    getBflOcrStatus: '{DOMAIN01}/v2/verification/income/{applicationId}/applications',
    initiateBflOcrProcess: '{DOMAIN01}/v2/verification/income',
    aaFipPerformance:
      '{DOMAIN01}/v1/accountaggregator/fip-performance-metrics?applicationkey={applicationId}',
    emailVerification: `{DOMAIN01}/v1/credit/applications/{applicationid}/emailverification`,
    consentAccount: '{DOMAIN01}/v1/webBFF/consent-account',
    initiateAA: '{DOMAIN01}/v1/webBFF/initiateAA',
    consentApplicationInfo:
      '{DOMAIN01}/v1/credit/applicationsinfo/{applicationid}?consentRequestCode={consentRequestCode}',
    getLoanSummaryDetails: '{DOMAIN01}/v1/credit/applications/{applicationid}/summary',
    designationSmartSearh:
      '/v1/credit/principals/{principalKey}/reference-attributes/designation/serviceable-codes?status=all&serviceableValue=',
    postDocument: '{DOMAIN01}/v2/creditesign/ompl/applications/{applicationKey}/key-document',
    getMeStatus:
      '{DOMAIN01}/v2/credit/ompl/applications/{applicationid}/usertasks/{usertasks}/status',
    postAASetu: '{DOMAIN01}/v2/credit/ompl/applications/{applicationid}/usertasks/aa-setu',
    postNextTask: '{DOMAIN01}/v2/credit/ompl/applications/{applicationid}/usertasks/next-task',
    getStatusInprogress:
      '{DOMAIN01}/v2/credit/ompl/applications/{applicationid}/usertasks/{usertasks}/status',
    loanSummary: '{DOMAIN01}/v1/credit/ompl/applications/{applicationid}/usertasks/loan-summary',
    getThankYouPageDetails: '{DOMAIN01}/v1/credit/applications/{applicationid}/thankyou',
    callNowEventTrigger: '{DOMAIN01}/v1/credit/application/{applicationid}/user-interactions',
    otpVerification: '{DOMAIN01}/v1/credit/applications/{applicationid}/loan/process',
    pwaDetails: '{DOMAIN01}/v1/credit/application/{applicationid}/sso',
    homeLoanCrossSellOffer:
      '{DOMAIN01}/v1/credit/offers/cross-sell?mobileNumber={mobileNumber}&productCode={productCode}',
    getSummaryStatus:
      '{DOMAIN01}/v2/credit/ompl/applications/{applicationid}/usertasks/get-products/status',
    getLocation: '{DOMAIN01}/v2/credit/ompl/applications/{applicationid}/usertasks/geo-location',
    postAdpStatus:
      '{DOMAIN01}/v2/credit/ompl/applications/{applicationid}/usertasks/post-adp-status/status',
    getAddressDetails:
      '{DOMAIN01}/v2/credit/cc/applications/{applicationid}/usertasks/address-details?l3ProductCode={l3ProductCode}',
    postAddressDetails:
      '{DOMAIN01}/v2/credit/ompl/applications/{applicationid}/usertasks/vkycaddresschange',
    getCsatDetails:
      '{DOMAIN01}/v1/creditapplication/users/feedback/{applicationid}?mobileNumber={mobileNumber}',
    postCsatDetails: '{DOMAIN01}/v1/creditapplication/users/feedback/{applicationid}',
    getCallbackofferApiStatus:
      '{DOMAIN01}/v1/credit/ompl/applications/{applicationid}/callback-offerapi-status',
    getKisshtEligibleOfferDetails: `/v2/credit/ompl/applications/{applicationid}/usertasks/eligible-offer/status`,
    initiateKisshtAAFlow: `/v2/credit/ompl/applications/{applicationid}/redirect-task/kissht-aa-redirection`,
    submitLoanOffer: `/v2/credit/ompl/applications/{applicationid}/usertasks/next-task`,
    initiateKisshtEkyc:
      '{DOMAIN01}/v2/credit/ompl/applications/{applicationid}/redirect-task/{userTask}',
    postOffer: '{DOMAIN01}/v2/credit/ompl/applications/{applicationid}/usertasks/offer',
    getPRVData: '{DOMAIN01}/v2/credit/ompl/applications/{applicationid}/usertasks/prv-data',
    fetchExistingBankAC:
      '{DOMAIN01}/v2/credit/ompl/applications/{applicationid}/usertasks/fetch-bankaccountlist/status',
    kisstSubmitBankDetails:
      '{DOMAIN01}/v2/credit/ompl/applications/{applicationid}/usertasks/bank-details?action={userAction}',
    statusNACH: '{DOMAIN01}/v2/credit/ompl/applications/{applicationid}/usertasks/status/status',
    getDocument: '{DOMAIN01}/v2/creditesign/ompl/applications/{applicationid}/key-document',
    getPreFinalOfferData:
      '{DOMAIN01}/v2/credit/ompl/applications/{applicationid}/usertasks/final-offer/status',
    getKisshtThankYouPageData:
      '{DOMAIN01}/v2/credit/ompl/applications/{applicationid}/usertasks/disbursement-status/status',
    getbankref:
      '{DOMAIN01}/v2/credit/ompl/applications/{applicationid}/principal/570/usertasks/save-bank-ref-id',
    postUserConsent:
      '{DOMAIN01}/v2/credit/ompl/applications/{applicationid}/usertasks/user-consent',
    initiateesign:
      '{DOMAIN01}/v2/credit/ompl/applications/{applicationid}/principal/570/usertasks/initiate-esign',
    getPartnerLoan:
      '{DOMAIN01}/v2/credit/ompl/applications/{applicationid}/principal/570/usertasks/get-partner-loan', //This is for l3ProductCode === 'KBE2ESOL'
    getPostPayULoanSimulator:
      '{DOMAIN01}/v2/credit/ompl/applications/{applicationid}/usertasks/loansimulator',
    inprogressLoader:
      '{DOMAIN01}/v2/credit/ompl/applications/{applicationid}/principal/{principalkey}/usertasks/{currentpage}',
    uploadSelfie: '{DOMAIN01}/v2/credit/ompl/applications/{applicationid}/usertasks/uploadselfie',
    digilockerRedirection:
      '{DOMAIN01}/v2/credit/ompl/applications/{applicationid}/usertasks/digilocker',
    getSalutionCheck:
      '{DOMAIN01}/v2/referencedata/exclude-name-tokens?nameGroup={nameGroup}&principalKey={principalKey}&nameToken={userValue}',
    verifyNameDetails: '{DOMAIN01}/v2/credit/applications/{applicationid}/pan-name-verification',
    reviewDetails:
      '{DOMAIN01}/v2/credit/ompl/applications/{applicationid}/usertasks/review-details',
    getPayUInprogress:
      '{DOMAIN01}/v2/credit/ompl/applications/{applicationid}/redirect-task/{usertasks}',
    payULocationAccess:
      '{DOMAIN01}/v2/credit/ompl/applications/{applicationid}/usertasks/location-access',
    postDisbursementStatus:
      '{DOMAIN01}/v2/credit/ompl/applications/{applicationid}/principal/583/usertasks/disbursement',
    postAcceptOffer:
      '{DOMAIN01}/v2/credit/ompl/applications/{applicationid}/principal/583/usertasks/accept-offer',
    postPayUBankDetails:
      '{DOMAIN01}/v2/credit/ompl/applications/{applicationid}/usertasks/bank-account',
    payUVKyc: '{DOMAIN01}/v2/credit/ompl/applications/{applicationid}/usertasks/enhancedkyc',
    getSubOccupationTypes:
      '{DOMAIN01}/v1/credit/principals/{principalKey}/reference-attributes/{referenceAttributeCode}/serviceable-codes?status={status}&serviceableValue={serviceableValue}',
    nachTask: '{DOMAIN01}/v2/credit/ompl/applications/{applicationid}/usertasks/nach',
    saveADPDetails:
      '{DOMAIN01}/v2/credit/ompl/applications/{applicationid}/principal/295/usertasks/federal-post-adp',
    payUESignDocuments:
      '{DOMAIN01}/v2/credit/ompl/applications/{applicationid}/usertasks/document-fetch',
    payUTriggerOtp: ' {DOMAIN01}/v2/credit/ompl/applications/{applicationid}/usertasks/triggerotp',
    payUESign: '{DOMAIN01}/v2/credit/ompl/applications/{applicationid}/usertasks/document-sign',
    payUDisbursementStatus:
      '{DOMAIN01}/v2/credit/ompl/applications/{applicationid}/usertasks/disbursement-status',
    getADPNewFieldsData:
      '{DOMAIN01}/v2/credit/ompl/applications/{applicationid}/usertasks/federal-get-adp/status',
    getpanverification:
      '{DOMAIN01}/v2/credit/ompl/applications/{applicationid}/usertasks/pan-verification',
    postpanverification:
      '{DOMAIN01}/v2/credit/ompl/applications/{applicationid}/usertasks/pan-verification',
    bankNameSmartSearch:
      '{DOMAIN01}/v2/credit/ompl/applications/{applicationid}/usertasks/bankdetails-emandateoptions?bankName=',
    payUIncomeVerification:
      '{DOMAIN01}/v2/credit/ompl/applications/{applicationid}/usertasks/accountaggregator',
    payUAARedirection:
      '{DOMAIN01}/v2/credit/ompl/applications/{applicationid}/usertasks/incomeverification',
    resendSmsLink: '{DOMAIN01}/v1/credit/resend-sms-link',
    postBackToListing: '{DOMAIN01}/v1/credit/applications/{applicationid}/return-to-listing',
    kbEsignDocuments:
      '{DOMAIN01}/v2/credit/ompl/applications/{applicationid}/usertasks/get-kb-kfs-document/status',
  };
  // Set cookie keys
  public static StorageKeys = {
    authtoken: 'authtoken',
    JWToken: 'Credit_SS_1',
    GuardToken: 'Credit_SS_2',
    GuardKey: 'Credit_SS_4',
    ClientId: 'Credit_SC_ID',
    SecretKey: 'Credit_SS_ID',
    DeviceDetails: 'DeviceDetails',
    applicationId: 'applicationid',
    ProcessId: 'processID',
    NextTaskKey: 'nextTaskKey',
    RequestedPayload: 'requestedPayload',
    Employer: 'employer',
    ProductCode: 'prodCode',
    ProductKey: 'prodKey',
    MobileNumber: 'mob',
    DateOfbirth: 'dob',
    CardProdCode: 'cardProdCode',
    L4ProductCode: 'l4ProductCode',
    CppFlag: 'cppFlag',
    CardLimit: 'cardLimit',
    CardName: 'custName',
    childApplicationId: 'childapplicationid',
    EstimatedIncomeRef: 'estimatedIncomeRef',
    LoanBannersData: 'loansBannersData',
    Requirement: 'requirement',
    LoanType: 'loanType',
    SecuredRepaymentFlag: 'repaymentFlag',
    sessionId: 'X-Session-Token',
    loginSessionId: 'Login-Session-Token',
    Age: 'age',
    ProfessionType: 'professionType',
    fingerPrint: 'fingerPrint',
    perpetualToken: 'perpetualToken',
    language: 'language',
    ProductId: 'productid',
    assistance: 'assistance',
    userMob: 'userMob',
    userDob: 'userDob',
    paramLang: 'paramLang',
    UserOccupationType: 'userOccupationType',
    UserPin: 'userPin',
    UserName: 'userName',
    source: 'source',
    oldLauguage: 'oldLauguage',
    requiredLoanAmount: 'requiredLoanAmount',
    RejectionApplied: 'rejectionApplied',
    customerUserId: 'customerUserId',
    visitorId: 'visitorId',
    isCustomerConsent: 'isCustomerConsent',
    userType: 'userType',
    applicantId: 'applicantId',
    mobOnlyLoginEnable: 'mobOnlyLoginEnable',
    sourceChannel: 'sourceChannel',
    partnerType: 'partnertype',
    selectedKycType: 'selectedKycType',
  };
  // AA partners
  public static AAPartners = {
    finvu: 'finvu',
    pirimid: 'pirimid',
  };
  // For product Info
  public static ProductInfo = {
    UnsecuredLoan: {
      productKey: 10002,
      productCode: 'OMPL',
    },
  };
  // Set emitter event type
  public static EmitterEventTypes = {
    LoadingEvent: 'LoadingEvent',
    ProgressStateEvent: 'ProgressStateEvent',
    MobileAppCheck: 'MobileAppCheck',
    PageTitle: 'PageTitle',
    ProductCode: 'ProductCode',
    LoanType: 'LoanType',
    SessionExpired: 'SessionExpired',
    ShowHeaderContent: 'showHeaderContent',
    ShowLoginContent: 'showLoginContent',
    ErrorCode: 'errorCode',
  };
  // Residence type
  public static residenceTypes = [
    { key: 1, code: 'OWN', value: 'Self-owned House' },
    { key: 2, code: 'RENTAL', value: 'Rented(Self)' },
    { key: 6, code: 'RENTALFAMILY', value: 'Rented(With Family)' },
    { key: 8, code: 'OTHERS', value: 'Others' },
  ];

  // Business type
  public static businessTypes = [
    { key: 1, code: 'SPP', value: 'Sole Proprietorship' },
    { key: 3, code: 'PVT', value: 'Private Limited/LPP' },
    { key: 2, code: 'PRT', value: 'Partnership' },
  ];

  // Nature of business
  public static natureOfBussiness = [
    { key: 1, code: 'B', value: 'Manufacturer' },
    { key: 2, code: 'B', value: 'Trader' },
    { key: 3, code: 'B', value: 'Service' },
    { key: 4, code: 'B', value: 'Retailer' },
  ];

  // Shop Status
  public static shopStatus = [
    { key: 1, code: 'OWNSHOP', value: 'Owned Shop' },
    { key: 2, code: 'RENTEDSHOP', value: 'Rented Shop' },
    { key: 3, code: 'NOSHOP', value: 'No Shop/Only Online' },
  ];

  // Corporate Linkage Type
  public static corporateLinkageTypes = [
    { key: 1, code: 'GOVTTIEUP', value: 'Govt. Tie-ups' },
    { key: 2, code: 'CORPORATELLP', value: 'Corporate/ LLP tie-up' },
    { key: 3, code: 'INSTITUTE', value: 'Trust/Institute/Co-op Society/Hospital/School' },
    { key: 4, code: 'NOTIEUP', value: 'No Tie-ups' },
  ];

  // Business experience
  public static businessExperience = [
    // { key: 14668, code: '0', value: 'Less than a year' },
    { key: 14669, code: '1', value: '0 to 2 years' },
    // { key: 14670, code: '10', value: '10+ years' },
    { key: 14671, code: '3', value: '3 to 4 years' },
    { key: 14672, code: '5', value: '5 and Above' },
  ];
  // Education type
  /* public static educationTypes = [
        { key: 1, code: 'PG', value: 'Post Graduate' },
        { key: 2, code: 'UG', value: 'Under Graduate' },
        { key: 3, code: 'HSC', value: 'Higher Secondary' },
        { key: 4, code: 'SSC', value: 'Senior Secondary' }
    ]; */
  public static educationTypes = [
    { key: 2, code: 'UG', value: 'Graduate' },
    { key: 3, code: 'HSC', value: 'Higher Secondary' },
  ];

  // Relationships for HDFC
  public static referenceRelationships = [
    { key: 12, code: 'FATHER', value: 'FATHER' },
    { key: 13, code: 'MOTHER', value: 'MOTHER' },
    { key: 3, code: 'SPOUSE', value: 'SPOUSE' },
  ];

  // Salutations for HDFC
  public static salutations = [
    { key: 23, code: 'MR', value: 'Mister' },
    { key: 24, code: 'MRS', value: 'Misses' },
    { key: 25, code: 'MS', value: 'Miss' },
  ];

  // Education type
  public static educationTypesSOL = [
    { key: 1, code: 'PG', value: 'Post Graduate' },
    { key: 2, code: 'UG', value: 'Under Graduate' },
    { key: 3, code: 'HSC', value: 'Higher Secondary' },
    { key: 4, code: 'SSC', value: 'Senior Secondary' },
    { key: 5, code: 'OTHER', value: 'Other' },
  ];

  // Mock realtionship data
  public static realtionship = [
    { key: 1, code: '1', value: 'Spouse' },
    { key: 2, code: '2', value: 'Father' },
    { key: 3, code: '3', value: 'Mother' },
    { key: 4, code: '4', value: 'Daughter' },
    { key: 5, code: '5', value: 'Son' },
    { key: 6, code: '6', value: 'Brother' },
    { key: 7, code: '7', value: 'Sister' },
  ];

  // Mock employer type data
  public static employerTypes = [
    { key: 1, code: '1', value: 'Public/Private/Govt' },
    { key: 2, code: '2', value: 'School/College' },
    { key: 3, code: '3', value: 'Partnership Firm' },
    { key: 4, code: '4', value: 'Proprietorship Firm' },
  ];

  // Mock sub employer type data
  public static subEmployerTypes = [
    { key: 5, code: 'PUBLIC', value: 'Public Ltd' },
    { key: 10, code: 'PVT', value: 'Private Ltd' },
    { key: 6, code: 'GOVT', value: 'Government' },
  ];

  // Mock office type data
  public static officeType = [
    { key: 1, code: 'OWN', value: 'Own' },
    { key: 2, code: 'RENTED', value: 'Rented' },
  ];
  public static genderType = [
    { key: 22, code: 'M', value: 'Male' },
    { key: 21, code: 'F', value: 'Female' },
    { key: 28, code: 'TG', value: 'Third Gender' },
  ];

  public static CurrencyCoversionUnits = {
    Lacs: 100000,
    Crore: 10000000,
  };
  /*** Testing purpose */
  public static aemCardcontent = {
    elements: {
      CCABNeon_Benefits: {
        value: '2 EDGE Reward points on every 200 spent',
      },
      CCABNeon_Features: {
        value:
          'Get amazon gift voucher worth Rs 250 on 1st spend with your axis bank neo credit card within 30 days of card issuance -Welcome gift voucher worth Rs 300 from BookMyShow -Axis bank dining delights offering a minimum of 15% off at our partnered restaurants in india -Redeem a Myntra gift voucher of upto 500/- -- Apply the coupon code-AXNIOMYNT during checkout -Power of 10’—10% off on Akbar travels, 10% off on Myntra with minimum transaction of Rs 500, 10% off on every movie ticket purchase on BookmyShow with maximum monthly benefits of 50/-, 10% off on mobile recharge through the FreeCharge app with monthly benefits of 30/- -Zero lost card liability -Convert transactions over Rs 2500 into EMIs',
      },
      CCABNeon_Fees: { value: 'Annual Fee or Rs. 250' },
      CCABMyZOne_Benefits: {
        value:
          '"4 EDGE Reward points on every 200 spent Reward: 1000 bonus EDGE reward points for a minimum spend of 30000/- per calendar quarter"',
      },
      CCABMyZOne_Features: {
        value:
          '25% cashback on movie tickets at Paytm all week. The amount of cashback in a calendar month is limited to 100/- -Upto 1000/- off on myntra as welcome delights—Use code MYZONE1000 and pay using axis bank my zone credit card to avail the offer. It’s applicable on minimum spends of 3499/- -1% fuel surcharge waiver at all fuel transactions -Feature: Convert transactions over Rs 2500 into EMIs -Feature: Axis bank dining delights offering upto 20% discount at partner restaurants in india. -Upto 25% off on myntra— Use coupon code MYZONE25 and pay using my Zone credit card. -1 complimentary access to select airport lounges within india per calendar quarter',
      },
      CCABMyZOne_Fees: { value: 'Annual Fee or Rs. 500' },
      CCRBLPLTCHOICE_Benefits: {
        value:
          '5,000 reward points on spends of Rs.7,5000 in a year 1 Reward Point/Rs. 100 Spend (Offline) and 2 Reward Points/Rs. 100 Spend (Online)',
      },
      CCRBLPLTCHOICE_Features: {
        value:
          '5% cashback on down-payment for any product on Bajaj Finserv EMI Network -Interest free cash withdrawal up to 50 Days on cash limit -Interest free loan up to 90 Days once a year on cash limit -Rs.100/month waiver on fuel surcharge -Convert spends above Rs.3,000 to Easy EMIs (with interest)',
      },
      CCRBLPLTCHOICE_Fees: { value: 'Annual Fee or Rs. 999' },
    },
  };

  public static AEMURLs = {
    LoanListAem: '{AEMURL}/api/assets/bajajfinserv/creditcardcontentfragments/omll.model.json',
    NudgeTextAem:
      '{AEMURL}/api/assets/bajajfinserv/creditcardcontentfragments/yourdetails_nudgetext.json',
    LandingPageImageUrl:
      'https://www.bajajfinservmarkets.in/content/dam/bajajfinserv/openarchitecture-loans/LandingPageBanner.png',
    LoanRejectionAem:
      '{AEMURL}/api/assets/bajajfinserv/creditcardcontentfragments/unsec_rejectionpage.json',
    CompanyLogoImageUrl:
      '{AEMURL}/content/dam/bajajfinserv/spa-banners/journey-peronal-loan/journey/BMarketsLogo.png',
    OfferCarousalBanners:
      '{AEMURL}/api/assets/bajajfinserv/creditcardcontentfragments/pl_crossellbanner-1.model.json',
    AABannerVisibilityUrl: '{AEMURL}/content/dam/bajajfinserv/aabanner/AEM_Banner_Visibility.json',
  };

  public static UrlPathStringPath = {
    CAICWA: {
      om: 'apply-for-ca-loan/',
      fldg: 'apply-for-ca-loan-finservmarkets/',
    },
    SALR: {
      om: 'apply-for-personal-loan/',
      fldg: 'apply-for-personal-loan-finservmarkets/',
    },
    SEMP: {
      om: 'apply-for-business-loan/',
      fldg: 'apply-for-business-loan-finservmarkets/',
    },
    DOC: {
      om: 'apply-for-doctor-loan/',
      fldg: 'apply-for-doctor-loan-finservmarkets/',
    },
  };

  public static GoldLoanAppUrl = {
    URL: 'apply-for-gold-loan',
  };

  public static OccupationCodeConstants = {
    salaried: 'SALR',
    businessOwner: 'SEMP',
    ca: 'CAICWA',
    doctor: 'DOC',
  };
  public static occupationTypes = [
    { key: 1, code: 'SALR', value: 'Salaried' },
    { key: 2, code: 'SEMP', value: 'Self Employed' },
    { key: 6, code: 'DOC', value: 'Doctor' },
    { key: 7, code: 'CAICWA', value: 'CA/CS/CWA' },
  ];
  public static journeyType = {
    OM: 'om',
    FLDG: 'fldg',
  };
  public static OMJourneyrouteMapper = [
    'profileDetails',
    'connectionerror',
    'otpscreen',
    'loansdetails',
    'loanlisting',
    'fppbundleselection',
    'loanproductsummary',
    'fpprejection',
    'bankdetails',
    'rejection',
    'additionaldetailsloans',
    'esignthankyou',
    'thankyou',
    'thankyou',
    'incomeverification',
    'loanrejection',
    'rejectiononhold',
    'esignthankyou',
    'emailverification',
    'esign',
    'salaryidentification',
    'emandate',
    'digiokycpage',
    'loaninprogress',
    'loandemogconsentotp',
    'LoanSimulatorUI',
    'kycinprogress',
    'kycaddresspage',
    'postkycinprogress',
    'postemandateinprogress',
    'pennydropinprogress',
    'prevkycinprogress',
    'prethankyouinprogress',
    'vkycThankyou',
    'preesigninprogress',
    'postesigninprogress',
    'vkycInprogress',
    'postvkycinprogress',
    'rekycinprogress',
    'postRekycinprogress',
    'emandateoption',
    'unauthenticateUser',
    'emailverified',
    'kycRemarkTask',
    'uploadDocument',
    'postinprogressadp',
    'preOfferScreen',
    'loanapproval',
    'bflthankyou',
    'preaasetuinprogress',
    'postaasetuinprogress',
    'panselfieinprogress',
    'kbeteloansummary',
    'loanoffering',
    'otpconsent',
    'kbeteinprogress',
    'loader',
    'reviewaddress',
    'geolocation',
    'locationPostInprogress',
    'offerdetails',
    'loanplan',
    'kycinprogresskissht',
    'initiateKYC',
    'preloanverification',
    'postloanverification',
    'bankdetailsKissht',
    'kbpostemandate',
    'initiateNACH',
    'bankConfirmation',
    'bankdetailskreditbee',
    'kbpreemandate',
    'checkconsent',
    'panverification',
    'loansimulator',
    'preesign',
    'selfieupload',
    'selfieinprogress',
    'digilocker',
    'digilockerinprogress',
    'payubankdetails',
    'payureviewdetails',
    'payuinprogress',
    'payulocationaccess',
    'payuvkyc',
    'nachinprogress',
    'payufetchdocument',
    'payunach',
    'payunachinprogress',
    'payupostinprogress',
    'payuthankyou',
    'payurejection',
    'payuvkycpostinprogress',
    'payuaaincomeverification',
    'payuaaincomeverificationinprogress',
    'kbKFSEsign',
  ];
  // Any constant can be declared here.
  public static SharedServiceConstants = {
    ApiConnectionFailureError: 'ApiConnectionFailureError',
    DefaultConnectionFailureError: '"Connection Error screen shown without http error object"',
    response: 'response',
  };
  // Connection error reasons as per code.
  public static ConnectionErrorReasonCode = {
    JoinedConnectionErrorMsg: 'From {componentName} component in {methodName} method of {apiName}',
    Default_PD_Error: 'Default error from prof details without API Call',
    CEPDGet_1: 'Profile Details get call is breaking',
    CEPDBtnPost_1: 'Next taskkey is not coming from service post call',
    CEPDBtnPost_2: 'Error object found in the response when proceed button click',
    CEPDBtnPost_3: 'Error object found in the error block when proceed button click',
    CEPDGetProfessionFunc: 'Profession type field value is not found or set',
    CEBDGet_1: 'Basic Details get call is breaking',
    CEBDBtnPost_1: 'Next taskkey is not coming from service post call',
    CEBDBtnPost_2: 'Error object found in the response when proceed button is clicked',
    CEBDBtnPost_3: 'Error object found in the error block when click on proceed button ',
    CEBDCibilPost_1: 'Cibil reference id is not coming from service',
    CEBDCibilPost_2: 'Cibil post call is breaking with error',
    CEBDOTPPost_1: 'Verify cibil otp next task key is not coming from service call',
    CEBDOTPPost_2: 'Verify cibil otp call is breaking with error',
    CEBDProfFunc: 'Profession type field value is not found or set',
    CEBDBackBtn_1: 'Next taskkey is not coming from service post call',
    CELoginBtn: 'Error code other than 401, 403 and 404',
    CEADBackBtn_1: 'Error object found while clicking back button',
    CEADBackBtn_2: 'Error code found on back button click in the error block',
    CEADGet_1: 'Error code found in the get call on page load',
    CEADGet_2: 'Error code found in the error block of get call on page load',
    CEADPost_1: 'Next task key is not coming in the post call on proceed button',
    CEADPost_2: 'Error code found in the response of proceed button click',
    CEADPost_3: 'Error code found in the error block of post call on proceed button',
    CEADPost_4: 'Error code found in the error block of post call on back button',
    CEADOtp_1: 'Next task key is not found after verifying Otp',
    CEADOtp_2: 'Error code found in the response of verifying otp call',
    CEADOtp_3: 'Error code found in the error bock of post call on verify Otp',
    CEADOtpBack_1: 'Error code found in the response when click on back button from otp drawer',
    CEADOtpBack_2:
      'Error code found in the error block when click on the back button from otp drawer',
    CEBankDGet_1: 'Error code found in the error block of get call',
    CEEVPost_1: 'Error code found in the error block of post call',
    CEEVPost_2: 'Error code found in the error block of post call on back button',
    CEEsignPut_1: 'Error code found in the error block of put call',
    CELoanApprovalPost_1: 'Cross Cell offer details call is breaking',
    CELoanApprovalPost_2: 'Error code found in the error block of post call submit OTP button',
    CELogin: 'Error code found in handling response',
    CEDocUploadGet_1: 'Error code found in the error block of get call',
    CEDocUploadGet_2: 'Error code found in the response of get call',
    CEDUPost_1: 'Next task key is not coming in the post call on proceed button',
    CEDUPost_2: 'Error code found in the response of proceed button click',
    CEDUPost_3: 'Error code found in the error block of post call on proceed button',
    SFDCPost_1:
      'Error code found in the error block of post call on thank you page while PWA Integration for Redirection for SFDC',
    SFDCGet_1:
      'Error code found in the error block of get call on thank you page while PWA Integration for Redirection for SFDC',
    CEIP_1: 'Error code found in the response of get callback api polling',
    CEIP_2: 'Error code found in the error bock of get call on callback api polling',
  };

  /** Error codes sent by service API. Use these values for comparing in if else conditions */
  public static ApiErrorCodes = {
    RedirectToV1: 'OMCB-REDIRECT-V1',
  };

  /** KYC modejs */
  public static KycModes = {
    dkyc: 'DKYC',
  };

  // offers banner curosal
  public static OffersBannerDetails = [
    {
      imageUrl: './assets/images/png/axis-card-offer.png',
      redirectionUrl: 'https://www.bajajfinservmarkets.in/apply-for-credit-card/',
    },
    {
      imageUrl: './assets/images/png/e-store-offer.png',
      redirectionUrl: 'https://www.bajajfinservmarkets.in/emi-store',
    },
    {
      imageUrl: '/assets/images/svg/offer-emicard.svg',
      redirectionUrl:
        'https://www.bajajfinserv.in/insta-emi-network-card-apply-online?utm_source=BFDL_EMIStore&utm_medium=unsecured_loans&utm_campaign=loans_traffic',
    },
    {
      imageUrl: '/assets/images/svg/offer-pocket-insurance.svg',
      redirectionUrl:
        'https://www.bajajfinservmarkets.in/pocket-insurance.html?utm_source=Journey_loans&utm_medium=unsecured_loans&utm_campaign=loans_traffic',
    },
  ];

  // third party partners url config
  public static PartnerUrls = {
    perfios: 'https://daa2.perfios.com/KuberaVault/insights/start',
    partnerPerfios: 'https://daa2.perfios.com/KuberaVault/insights/start',
  };

  public static IncredSolDockerDelayTime = {
    inCredSolDelay: 3000,
  };
  public static CurouselConstants = {
    PROPERTY_NAMES: {
      IMAGE_URL: 'imageurl',
      REDIRECTION_URL: 'redirectionlink',
    },
  };
  public static CREDIT = 'CREDIT';

  public static ParnetLeadReferenceProduct = {
    OMPL: 'Personal loan lead',
  };
  public static JourneyName = {
    OMPL: 'Personal Loan',
  };
  public static PartnerLead = {
    LOANAMOUNT: 100000,
  };
  public static ThemeConfig = {
    theme: 'THEME',
    dark: 'DARK',
    light: 'LIGHT',
    themeDark: 'darkTheme',
    themeLight: 'whiteTheme',
  };
  public static ICON_STYLE = {
    loanCard: { height: '13px', width: '13px', cursor: 'pointer', transform: 'rotate(180deg)' },
    loandForm: {
      zIndex: '10',
      height: '15.5px',
      width: '15.5px',
      cursor: 'pointer',
      transform: 'rotate(180deg)',
      position: 'absolute',
      top: '48%',
      right: '1%',
    },
    incomeverification: {
      zIndex: '10',
      height: '15.5px',
      width: '15.5px',
      cursor: 'pointer',
      transform: 'rotate(180deg)',
      top: '80%',
      marginLeft: '3px',
    },
    summaryDetails: { float: 'right', width: '23.312', height: '25.312' },
    rejectionOnHold: { marginBottom: '4px', width: '18.962', height: '18.965' },
    rejectionPage: { marginBottom: '4px', width: '18.962', height: '18.965' },
    esignTick: { marginTop: '-3px', width: '14px', height: '14px' },
    esignEye: {
      marginTop: '-9px',
      width: '16px',
      height: '16px',
      position: 'absolute',
      right: '0',
      cursor: 'pointer',
    },
    esignStar: { width: '8.863', height: '8.863' },
    bankDetails: {
      width: '24',
      height: '24',
      float: 'right',
      marginTop: '-36px',
      marginRight: '-27px',
    },
    perfiosNetBanking: { width: '36', height: '36', float: 'right' },
    perfiosUpload: { width: '36', height: '36', float: 'right' },
    perfiosAA: { width: '36', height: '36', float: 'right' },
    perfiosAApopup: { width: '36', height: '36', float: 'right' },
    downarr: { width: '30', height: '30' },
    newrejectionPage: { marginBottom: '4px', width: '122', height: '121' },
    kycdetails: { height: '15px', width: '15px', cursor: 'pointer', transform: 'rotate(180deg)' },
    emandateoption: {
      height: '13px',
      width: '13px',
      cursor: 'pointer',
      transform: 'rotate(180deg)',
      marginBottom: '3px',
    },
    uploadDocument: {
      height: '13px',
      width: '13px',
      cursor: 'pointer',
      transform: 'rotate(180deg)',
      marginBottom: '3px',
    },
  };

  public static sessionErrors = {
    409: {
      OMCB_201: 'Dear Customer, Application is currently resumed by your different session.',
      OMCB_202: 'Dear Customer, Application is currently resumed by another user.',
      OMCB_301: 'Dear Employee, Application is currently resumed by your different session.',
      OMCB_302: 'Dear Employee, Application is currently resumed by another user.',
    },
    417: {
      OMCB_303: 'Customer session is in progress. Do you still want to continue?',
    },
  };
  public static PartnerRejectionUTM = {
    UTM_Source: 'RejectionPage',
    UTM_Medium: 'PLRejection',
    UTM_Campaign: 'CrossSale',
  };

  public static employesSmartSearchFlag = true;

  public static feature = {
    v2: '/v2/smartsearch/employers/',
    v3: '/v3/smartsearch/employers?employerName=',
  };

  public static quetionCodes = {
    Loan_Shield_Plus: [
      { key: 54, code: 'QA54' },
      { key: 28, code: 'QA28' },
      { key: 30, code: 'QA30' },
    ],
    Loan_Shield: [
      { key: 1, code: 'QA1' },
      { key: 26, code: 'QA26' },
      { key: 4, code: 'QA4' },
    ],
  };

  public static bannerText = {
    heading: 'Personal Finance Manager',
    subHeading: 'Manage your loan money with',
    infoText: 'Keep tracking your expenses with smart money manager and get personalised offers',
    btnText: 'manage my money',
  };

  public static setAaStorageKey = {
    redirectionUrl: 'redirectionUrl',
    consentHandleId: 'finvuconsentid',
    customerId: 'finvucustomerid',
    mobileNumber: 'mob',
    occupationIdentifier: 'occupationIdentifier',
  };

  public static partnerBaseUrl = {
    commonBankselectionPage: '/omcommonweb/standalonebankselection/',
  };

  public static finvuStoragekeys = {
    fipDetails: 'fipDetails',
    consentApproved: 'ConsentApproved',
  };
  public static aastatus = {
    inProcess: 'IN-PROCESS',
  };
  public static primidStatus = {
    inProcess: 'PROCESSING',
  };
  public static bannerVisibilityStatus = {
    LoansRejection: 'LoansRejection',
    FederalThankYou: 'FederalThankYou',
    OAListing: 'OAListing',
  };
  public static crossSellLoanBannerVisible = ['MPOKKETSOL'];

  public static homeLoanJourneyUrl =
    '/apply-for-home-loan-balance-transfer/?utm_source=Unsec_rejection&utm_medium=Mpokket&utm_campaign=Banner&utm_content={personal_loan_application_id}';

  public static partnerBasedRoi = {
    FEDERALSOL: '12.75% Onwards',
    LTSOL: '11.75% Onwards',
    FINNABLESOL: '11.75% Onwards',
  };

  public static partnerBasedFees = {
    FEDERALSOL: '2% Onwards',
  };

  public static countObj = {
    1: {
      heading: 'One',
      collapse: 'One',
      expand: false,
      alwaysOpen: true,
      accordianText: 'Matched Lenders - Pre-approved',
    },
    2: {
      heading: 'Two',
      collapse: 'Two',
      expand: false,
      alwaysOpen: true,
      accordianText: 'Matched Lenders',
    },
    3: {
      heading: 'Three',
      collapse: 'Three',
      expand: false,
      alwaysOpen: false,
      accordianText: 'Unmatched & Rejected Lenders',
    },
    4: { heading: 'Four', collapse: 'Four', expand: false, alwaysOpen: false, accordianText: '' },
    5: { heading: 'Five', collapse: 'Five', expand: false, alwaysOpen: false, accordianText: '' },
    6: { heading: 'Six', collapse: 'Six', expand: false, alwaysOpen: false, accordianText: '' },
    7: {
      heading: 'Seven',
      collapse: 'Seven',
      expand: false,
      alwaysOpen: false,
      accordianText: 'Y',
    },
  };
  public static EmployerTypeKey = {
    NPQ: '2370274',
    NPU: '1439694',
    PROD: '1996431',
  };

  public static toolTipText = {
    partnerType: `<p>
  The BFL Flexi Hybrid Term Loan begins with EMIs that cover only the interest, then transitions to EMIs that include both principal and interest, providing flexible and manageable repayment options.
  </p>`,
    approval: `<label>Approval Chances:</label>
  <p>
  Calculated basis actual applications submitted against applications approved by the Lender
  </p>`,
    rateOfInterest: `<p>
  The annual rate of interest (%) charged by the lender on the loan amount, which determines the interest payable on the borrowed sum
  </p>`,
    Apr: `
  <p>
  Annual Percentage Rate (APR)
  The total yearly cost of your loan, including interest and fees, shown as a percentage. This helps you compare loan offers.
  </p>`,
    penalCharges: `
  <p>
  Penal charge is the fee a Lenders imposes on a borrower for defaults or delays in repaying a loan, with the amount depending on the Lenders policy.
  </p>`,
    processingTime: `<p>Calculated basis actual processing time taken from submission of application to the Lender till disbursement</p>`,
  };
  public static viewPartnerInfo = ['Hybrid Flexi'];
  public static aemDetailsList = [
    'logo',
    'cardColour',
    'knowmoredetails',
    'apr',
    'approvalchances',
    'approvalchancescolor',
    'foreclosurecharges',
    'partpaymentfixed',
    'partpaymentfloating',
    'penalcharges',
    'processingfees',
    'processingtime',
    'principleName',
    'loanName',
  ];
}
