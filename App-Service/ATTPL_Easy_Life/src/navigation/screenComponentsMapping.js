import {lazy} from 'react';
const AmbulanceServiceNavigator = lazy(() => import('./Ambulance-Service'));

// Auth stack
const WelcomeScreen = lazy(() => import('../screens/auth/Welcome'));
const PasswordScreen = lazy(() => import('../screens/auth/Password'));
const OTPVerificationScreen = lazy(
  () => import('../screens/auth/VerificationScreen'),
);
const RegisterDetailsScreen = lazy(
  () => import('../screens/auth/RegisterDetails'),
);
const RegisterPasswordScreen = lazy(
  () => import('../screens/auth/RegisterPassword'),
);
const ForgotPassword = lazy(() => import('../screens/auth/ForgotPassword'));

// Drawer stack
const HomeScreen = lazy(() => import('../screens/home/homeScreen'));
const GovernmentSchemeStack = lazy(
  () => import('./GovtInHand/GovernmentSchemeStack'),
);
const GovernmentScheme = lazy(
  () => import('../screens/GovernmentScheme/GovernmentScheme'),
);
const GovernmentSchemeInnerComponent = lazy(
  () => import('../screens/GovernmentScheme/GovernmentSchemeInnerComponent'),
);
const ComplaintSectionStack = lazy(
  () => import('./GovtInHand/ComplaintSectionStack'),
);
const ComplaintSectionView = lazy(
  () => import('../screens/ComplaintSection/ComplaintSection'),
);
const ComplaintSectionInnerComponent = lazy(
  () => import('../screens/ComplaintSection/ComplaintSectionInnerComponent'),
);
const DeliveryRenderDetailsFormScreen = lazy(
  () => import('../screens/Delivery/DeliveryRenderDetailsFormScreen'),
);
const MailFormView = lazy(() => import('../screens/MailForm/mail_form_create'));
const StudentCareerNavigator = lazy(() => import('./StudentCareerNavigator'));
const FarmerCarrerNavigator = lazy(() => import('./FarmerCarrerNavigator'));
const FarmerCardInnerComponent = lazy(
  () => import('../screens/FarmersCareerRoadMap/FarmerCardInnerComponent'),
);
const LabourJobNavigator = lazy(() => import('./LabourJobNavigator'));
const BusinessCareerRoadmap = lazy(
  () => import('../screens/BusinessCareerRoadmap/BusinessCareerRoadmap'),
);
const WomenEmpowerment = lazy(
  () => import('../screens/WomenEmpowerment/WomenEmpowerment'),
);
const JobApplicationForm = lazy(
  () => import('../screens/zohoScreens/JobApplicationForm'),
);
const RequestConsultancy = lazy(
  () => import('../screens/zohoScreens/RequestConsultancy'),
);
const ConsultancyWebView = lazy(() =>
  import('../screens/ATTPLSERVICES/ATTPL-webview_services').then(module => ({
    default: module.ConsultancyWebView,
  })),
);

const ITWebView = lazy(() =>
  import('../screens/ATTPLSERVICES/ATTPL-webview_services').then(module => ({
    default: module.ITWebView,
  })),
);

const FinanceWebView = lazy(() =>
  import('../screens/ATTPLSERVICES/ATTPL-webview_services').then(module => ({
    default: module.FinanceWebView,
  })),
);

const SolarWebView = lazy(() =>
  import('../screens/ATTPLSERVICES/ATTPL-webview_services').then(module => ({
    default: module.SolarWebView,
  })),
);

const InfraWebView = lazy(() =>
  import('../screens/ATTPLSERVICES/ATTPL-webview_services').then(module => ({
    default: module.InfraWebView,
  })),
);

const StoneWebView = lazy(() =>
  import('../screens/ATTPLSERVICES/ATTPL-webview_services').then(module => ({
    default: module.StoneWebView,
  })),
);
const PropertyEnquiryForm = lazy(
  () => import('../screens/zohoScreens/PropertyEnquiryForm'),
);
const CabServiceNavigator = lazy(() => import('./Cab-Vehical'));
const ToursAndTravelsScreen = lazy(
  () => import('../screens/ToursandTravels/Toursandtravels'),
);
const AvailableSurvey = lazy(
  () => import('../screens/SurveyForm/AvailableSurvey'),
);
const ShareYourSuggestion = lazy(
  () => import('../screens/SuggestionBox/SuggestionBox'),
);
const DoctorAppointmentNavigator = lazy(() => import('./Appointment'));
const HealthTips = lazy(() => import('../screens/HealthTips/healthTips'));
const DoctorServices = lazy(
  () => import('../screens/DoctorServices/doctorServices'),
);
const EmergencyAmbulance = lazy(
  () => import('../screens/EmergencyAmbulance/emergencyAmbulance'),
);
const ChatStackNavigator = lazy(() => import('./ChatStackNavigator'));

// Chat stack
const ChatListScreen = lazy(
  () => import('../screens/ChatWithFriends/ChatWithFriends'),
);
const ContactsScreen = lazy(
  () => import('../screens/ChatWithFriends/ContactsScreen'),
);
const ChatRoomScreen = lazy(
  () => import('../screens/ChatWithFriends/ChatRoomScreen'),
);
const JobDetailsView = lazy(
  () => import('../screens/LabourJobView/JobDetailsView'),
);
const AddContactScreen = lazy(
  () => import('../screens/ChatWithFriends/AddContactScreen'),
);
const SurveyResponseScreen = lazy(
  () => import('../screens/SurveyForm/SurveyResponseScreen'),
);

// Job stack
const LabourJobList = lazy(
  () => import('../screens/LabourJobList/labourjoblist'),
);
const JobCreateView = lazy(
  () => import('../screens/LabourJobCreate/LabourJobCreate'),
);
const JobUpdateView = lazy(
  () => import('../screens/LabourJobUpdate/LabourJobUpdate'),
);

// Farmer career stack
const FarmerMyAppointmentList = lazy(
  () =>
    import(
      '../components/FarmersCareerRoadMap/AppointmentBooking/farmer-myAppointment'
    ),
);
const FarmersCareerRoadMap = lazy(
  () => import('../screens/FarmersCareerRoadMap/FarmersCareerRoadMap'),
);
const ModernAgriToolList = lazy(
  () =>
    import(
      '../components/FarmersCareerRoadMap/ModernAgriTool/modernAgri_tool_list'
    ),
);
const CultivationToolList = lazy(
  () =>
    import(
      '../components/FarmersCareerRoadMap/CultivationTool/cultivation_tool_list'
    ),
);
const IrrigationToolList = lazy(
  () =>
    import(
      '../components/FarmersCareerRoadMap/IrrigationSystem/irrigation_tool_list'
    ),
);
const CombineHarvesterList = lazy(
  () =>
    import(
      '../components/FarmersCareerRoadMap/CombineHarvester/combine_harvester_list'
    ),
);
const TractorList = lazy(
  () => import('../components/FarmersCareerRoadMap/Tractor/tractor_list'),
);
const ModernToolForm = lazy(
  () => import('../screens/FarmersCareerRoadMap/ModernToolCreate'),
);
const ModernToolDetailsView = lazy(
  () => import('../screens/FarmersCareerRoadMap/ModernToolDetailsView'),
);
const CultivationToolForm = lazy(
  () => import('../screens/FarmersCareerRoadMap/CultivationToolCreate'),
);
const CultivationToolDetailsView = lazy(
  () => import('../screens/FarmersCareerRoadMap/CultivationToolDetailsView'),
);
const IrrigationToolForm = lazy(
  () => import('../screens/FarmersCareerRoadMap/IrrigationToolCreate'),
);
const IrrigationToolDetailsView = lazy(
  () => import('../screens/FarmersCareerRoadMap/IrrigationToolDetailsView'),
);
const CombineHarvesterToolForm = lazy(
  () => import('../screens/FarmersCareerRoadMap/CombineHarvesterToolCreate'),
);
const CombineHarvesterToolDetailsView = lazy(
  () =>
    import('../screens/FarmersCareerRoadMap/CombineHarvesterToolDetailsView'),
);
const TractorToolForm = lazy(
  () => import('../screens/FarmersCareerRoadMap/TractorToolCreate'),
);
const TractorToolDetailsView = lazy(
  () => import('../screens/FarmersCareerRoadMap/TractorToolDetailsView'),
);
const FarmerAppointmentForm = lazy(
  () =>
    import(
      '../screens/FarmersCareerRoadMap/Appointment/FarmerAppointmentCreate'
    ),
);
const FarmerAppointmentListView = lazy(
  () =>
    import(
      '../screens/FarmersCareerRoadMap/Appointment/FarmerAppointmentListView'
    ),
);
const FarmerAppointmentDetailsView = lazy(
  () =>
    import(
      '../screens/FarmersCareerRoadMap/Appointment/FarmerAppointmentDetail'
    ),
);
const CattleDetailsView = lazy(
  () => import('../screens/FarmersCareerRoadMap/CattleDetailsView'),
);
const FarmerGuideView = lazy(
  () => import('../screens/FarmersCareerRoadMap/FarmerGuideView'),
);
const AttplBuySellCrops = lazy(
  () => import('../screens/FarmersCareerRoadMap/FarmerATTPL_Buy_Sell_Crops'),
);

// Student career stack
const StudentCareerRoadMap = lazy(
  () => import('../screens/StudentCareerRoadMap/StudentCareerRoadMap'),
);
const SchoolList = lazy(
  () => import('../components/StudentCareerRoadMap/school/school_list'),
);
const SchoolDetailsView = lazy(
  () => import('../screens/StudentCareerRoadMap/SchoolDetailsView'),
);
const CollegeList = lazy(
  () => import('../components/StudentCareerRoadMap/college/college_list'),
);
const CollegeDetailsView = lazy(
  () => import('../screens/StudentCareerRoadMap/CollegeDetailsView'),
);
const CoachingList = lazy(
  () => import('../components/StudentCareerRoadMap/coaching/coaching_list'),
);
const CoachingDetailsView = lazy(
  () => import('../screens/StudentCareerRoadMap/CoachingDetailsView'),
);
const InstitutionAppointmentListView = lazy(
  () =>
    import(
      '../screens/StudentCareerRoadMap/Appointment/InstitutionAppointmentListView'
    ),
);
const StudentAppointmentForm = lazy(
  () =>
    import(
      '../screens/StudentCareerRoadMap/Appointment/StudentAppointmentCreate'
    ),
);
const InstitutionAppointmentDetailsView = lazy(
  () =>
    import(
      '../screens/StudentCareerRoadMap/Appointment/InstitutionAppointmentDetail'
    ),
);
const StudentGuideView = lazy(
  () => import('../screens/StudentCareerRoadMap/StudentGuide'),
);

// Doctor appointment stack
const DoctorBookAppointment = lazy(
  () => import('../screens/DoctorBookAppointment/DoctorBookAppointment'),
);
const DoctorAppointmentList = lazy(
  () => import('../screens/DoctorBookAppointment/DoctorBookedAppointmentList'),
);
const DoctorAppointmentDetailsView = lazy(
  () => import('../screens/DoctorBookAppointment/DoctorAppointmentDetails'),
);
const AppointmentForm = lazy(
  () => import('../screens/DoctorBookAppointment/DoctorAppBooking'),
);
const AppointmentEdit = lazy(
  () => import('../screens/AppointmentBooking/AppointmentEdit'),
);

// Cab service stack
const Cablist = lazy(
  () => import('../screens/Vehicale-Booking/cab-booking/cab-list'),
);
const CabDetails = lazy(
  () => import('../screens/Vehicale-Booking/cab-booking/cab-details'),
);
const Cabbooking = lazy(
  () => import('../screens/Vehicale-Booking/cab-booking/cab-booking'),
);
const Cabedit = lazy(
  () => import('../screens/Vehicale-Booking/cab-booking/cab-edit'),
);

// Candidate stack
const AppointmentListViews = lazy(
  () => import('../screens/AppointmentBooking/AppointmentListViews'),
);
const AppointmentDetailsViews = lazy(
  () => import('../screens/AppointmentBooking/AppointmentDetailsViews'),
);
const AppointmentCreateViews = lazy(
  () => import('../screens/AppointmentBooking/AppointmentCreateViews'),
);

// App Stack screens
const NotificationsScreen = lazy(
  () => import('../screens/Notification/Notification'),
);
const ProfileScreen = lazy(() => import('../screens/Profile/Profile'));
const LanguageScreen = lazy(
  () => import('../screens/LanguageScreen/LanguageScreen'),
);
const AboutScreen = lazy(() => import('../screens/AboutScreen/AboutScreen'));
const SettingsScreen = lazy(() => import('../screens/Settings/Settings'));
const AppSettingScreen = lazy(
  () => import('../screens/AppSettingScreen/AppSettingScreen'),
);
const PrivacyScreen = lazy(
  () => import('../screens/PrivacyScreen/PrivacyScreen'),
);
const ChangePasswordScreen = lazy(
  () => import('../screens/ChangePasswordScreen/ChangePasswordScreen'),
);
const PrivacyPolicyScreen = lazy(
  () => import('../screens/PrivacyPolicyScreen/PrivacyPolicyScreen'),
);
const ProfileInformationScreen = lazy(
  () => import('../screens/ProfileInformationScreen/ProfileInformationScreen'),
);
const EditProfileScreen = lazy(
  () => import('../screens/EditProfile/EditProfile'),
);
const UpgradeAccountScreen = lazy(
  () => import('../screens/UpgradeAccountScreen/UpgradeAccountScreen'),
);
const DoctorUpgradeAccountFormScreen = lazy(
  () => import('../screens/UpgradeAccountScreen/DoctorUpgradeFormScreen'),
);
const EmployerUpgradeAccountFormScreen = lazy(
  () => import('../screens/UpgradeAccountScreen/EmployerUpgradeFormScreen'),
);
const InstitutionOwnerUpgradeAccountFormScreen = lazy(
  () =>
    import('../screens/UpgradeAccountScreen/InstitutionOwnerUpgradeFormScreen'),
);
const AgricultureEquipmentSellerUpgradeAccountFormScreen = lazy(
  () =>
    import(
      '../screens/UpgradeAccountScreen/AgricultureEquipmentSellerUpgradeFormScreen'
    ),
);
const BusinessmanUpgradeAccountFormScreen = lazy(
  () => import('../screens/UpgradeAccountScreen/BusinessmanUpgradeFormScreen'),
);
const DriverUpgradeAccountFormScreen = lazy(
  () => import('../screens/UpgradeAccountScreen/DriverUpgradeFormScreen'),
);
const ServiceProviderUpgradeAccountFormScreen = lazy(
  () =>
    import('../screens/UpgradeAccountScreen/ServiceProviderUpgradeFormScreen'),
);
const ManageMyAccountScreen = lazy(
  () => import('../screens/ManageAccountScreen/ManageAccountScreen'),
);
const SendFeedbackScreen = lazy(
  () => import('../screens/SendFeedbackScreen/SendFeedbackScreen'),
);
const RateAppScreen = lazy(() => import('../screens/RateApp/RateApp'));
const UpdatesScreen = lazy(
  () => import('../screens/UpdatesScreen/UpdatesScreen'),
);
const SupportScreen = lazy(
  () => import('../screens/SupportScreen/SupportScreen'),
);
const HelpScreen = lazy(() => import('../screens/HelpScreen/HelpScreen'));
const FAQScreen = lazy(() => import('../screens/FAQScreen/FAQScreen'));
const InviteFriendScreen = lazy(
  () => import('../screens/InviteFriendScreen/InviteFriendScreen'),
);
const DeliveryRequestFormScreen = lazy(
  () => import('../screens/Delivery/DeliveryRequestFormScreen'),
);
const DeliveryListRenderFormScreen = lazy(
  () => import('../screens/Delivery/DeliveryListRenderFormScreen'),
);
const DeliveryStackNavigator = lazy(() => import('./DeliveryStack'));

const screenComponents = {
  // Auth stack
  WelCome: WelcomeScreen,
  Password: PasswordScreen,
  OTPVerification: OTPVerificationScreen,
  RegisterDetails: RegisterDetailsScreen,
  RegisterPassword: RegisterPasswordScreen,
  ForgotPassword: ForgotPassword,
  // Drawer stack
  Home: HomeScreen,
  'GOVERNMENT BENIFITS': GovernmentSchemeStack,
  GovernmentScheme: GovernmentScheme,
  GovernmentSchemeInner: GovernmentSchemeInnerComponent,
  'COMPLAINT SECTION': ComplaintSectionStack,
  ComplaintSection: ComplaintSectionView,
  ComplaintSectionInner: ComplaintSectionInnerComponent,
  mailForm: MailFormView,
  'STUDENT CAREER ROADMAP': StudentCareerNavigator,
  'DELIVERY REQUESTS': DeliveryRequestFormScreen,
  'DELIVERY LIST': DeliveryListRenderFormScreen,
  studentGuideScreen: StudentGuideView,
  'FARMER CAREER ROADMAP': FarmerCarrerNavigator,
  FarmerCardInnerScreen: FarmerCardInnerComponent,
  FarmerGuideViewScreen: FarmerGuideView,
  FarmerBuySellCropsScreen: AttplBuySellCrops,
  'GET LABOUR JOB': LabourJobNavigator,
  'BUSINESS CAREER ROADMAP': BusinessCareerRoadmap,
  'WOMEN EMPOWERMENT': WomenEmpowerment,
  'APPLY FOR JOB': JobApplicationForm,
  'REQUEST CONSULTANCY': RequestConsultancy,
  ATTPLConsultancy: ConsultancyWebView,
  ATTPLIT: ITWebView,
  'ATTPL FINANCE': FinanceWebView,
  'ATTPL SOLAR': SolarWebView,
  'ATTPL INFRASTRUCTURE': InfraWebView,
  'ATTPL STONEMINERALS': StoneWebView,
  'PROPERTY BUY OR SELL': PropertyEnquiryForm,
  'BOOK CAB': CabServiceNavigator,
  'CAB LIST': CabServiceNavigator,
  'TOURS AND TRAVELS': ToursAndTravelsScreen,
  'SURVEY FORM': AvailableSurvey,
  'SUGGESTION BOX': ShareYourSuggestion,
  'DOCTOR BOOK APPOINTMENT': DoctorAppointmentNavigator,
  BookAmbulance: AmbulanceServiceNavigator,
  'HEALTH TIPS': HealthTips,
  'DOCTOR SERVICES': DoctorServices,
  'EMERGENCY AMBULANCE': EmergencyAmbulance,
  'CHAT WITH FRIENDS': ChatStackNavigator,

  // Chat stack
  ChatList: ChatListScreen,
  Contacts: ContactsScreen,
  ChatRoom: ChatRoomScreen,
  JobDetails: JobDetailsView,
  AddContact: AddContactScreen,
  SurveyResponse: SurveyResponseScreen,

  // Job stack
  LabourJobList: LabourJobList,
  JobCreate: JobCreateView,
  JobUpdate: JobUpdateView,

  // Farmer career stack
  FarmerCarrerList: FarmerMyAppointmentList,
  FarmersCareerRoadMap: FarmersCareerRoadMap,
  ModernTool: ModernAgriToolList,
  CultivationTool: CultivationToolList,
  IrrigationTool: IrrigationToolList,
  HarvesterTool: CombineHarvesterList,
  TractorTool: TractorList,
  ModernToolCreate: ModernToolForm,
  ModernToolDetail: ModernToolDetailsView,
  CultivationToolCreate: CultivationToolForm,
  CultivationToolDetail: CultivationToolDetailsView,
  IrrigationToolCreate: IrrigationToolForm,
  IrrigationToolDetail: IrrigationToolDetailsView,
  CombineHarvesterToolCreate: CombineHarvesterToolForm,
  CombineHarvesterToolDetail: CombineHarvesterToolDetailsView,
  TractorToolCreate: TractorToolForm,
  TractorToolDetail: TractorToolDetailsView,
  FarmerAppointmentCreate: FarmerAppointmentForm,
  FarmerAppointmentList: FarmerAppointmentListView,
  FarmerAppointmentDetail: FarmerAppointmentDetailsView,
  CattleDetail: CattleDetailsView,

  // Student career stack
  StudentCareerList: StudentCareerRoadMap,
  SchoolList: SchoolList,
  SchoolDetail: SchoolDetailsView,
  CollegeList: CollegeList,
  CollegeDetail: CollegeDetailsView,
  CoachingList: CoachingList,
  CoachingDetail: CoachingDetailsView,
  InstitutionAppointmentList: InstitutionAppointmentListView,
  StudentAppointmentCreate: StudentAppointmentForm,
  InstitutionAppointmentDetail: InstitutionAppointmentDetailsView,

  // Doctor appointment stack
  DoctorBookAppointment: DoctorBookAppointment,
  AppointmentList: DoctorAppointmentList,
  AppointmentDetails: DoctorAppointmentDetailsView,
  AppointmentForm: AppointmentForm,
  AppointmentFormEdit: AppointmentEdit,

  // Cab service stack
  CabList: Cablist,
  CabDetails: CabDetails,
  CabForm: Cabbooking,
  CabFormEdit: Cabedit,

  DeliveryRequestForm: DeliveryRequestFormScreen,
  DeliveryListRenderForm: DeliveryListRenderFormScreen,
  DeliveryRenderDetailsForm: DeliveryRenderDetailsFormScreen,

  CandidateAppointmentList: AppointmentListViews,
  CandidateAppointmentDetails: AppointmentDetailsViews,
  CandidateAppointmentForm: AppointmentCreateViews,
  CandidateAppointmentFormEdit: AppointmentEdit,

  // App Stack screens
  Notifications: NotificationsScreen,
  Profile: ProfileScreen,
  Language: LanguageScreen,
  About: AboutScreen,
  Settings: SettingsScreen,
  AppSetting: AppSettingScreen,
  Privacy: PrivacyScreen,
  ChangePassword: ChangePasswordScreen,
  PrivacyPolicy: PrivacyPolicyScreen,
  ProfileInformation: ProfileInformationScreen,
  EditProfile: EditProfileScreen,
  UpgradeAccount: UpgradeAccountScreen,
  DoctorUpgradeAccountForm: DoctorUpgradeAccountFormScreen,
  EmployerUpgradeAccountForm: EmployerUpgradeAccountFormScreen,
  InstitutionOwnerUpgradeAccountForm: InstitutionOwnerUpgradeAccountFormScreen,
  AgricultureEquipmentSellerUpgradeAccountForm:
    AgricultureEquipmentSellerUpgradeAccountFormScreen,
  BusinessmanUpgradeAccountForm: BusinessmanUpgradeAccountFormScreen,
  DriverUpgradeAccountForm: DriverUpgradeAccountFormScreen,
  ServiceProviderUpgradeAccountForm: ServiceProviderUpgradeAccountFormScreen,
  ManageMyAccount: ManageMyAccountScreen,
  SendFeedback: SendFeedbackScreen,
  RateApp: RateAppScreen,
  Updates: UpdatesScreen,
  BookDoctorAppointment: AppointmentForm,
  DoctorAppointmentList: DoctorAppointmentList,
  BookCandidateAppointment: AppointmentCreateViews,
  Support: SupportScreen,
  Help: HelpScreen,
  FAQ: FAQScreen,
  InviteFriend: InviteFriendScreen,
};

export default screenComponents;
