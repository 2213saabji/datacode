import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { AuthGuard } from 'src/auth/guard';
import DashboardLayout from 'src/layouts/dashboard';
import PaymentGuard from 'src/auth/guard/payment-guard';

import { LoadingScreen } from 'src/components/loading-screen';
import { element } from 'prop-types';

// ----------------------------------------------------------------------

// OVERVIEW
const IndexPage = lazy(() => import('src/pages/dashboard/app'));
const OverviewEcommercePage = lazy(() => import('src/pages/dashboard/ecommerce'));
const OverviewAnalyticsPage = lazy(() => import('src/pages/dashboard/analytics'));
const OverviewBankingPage = lazy(() => import('src/pages/dashboard/banking'));
const OverviewBookingPage = lazy(() => import('src/pages/dashboard/booking'));
const OverviewFilePage = lazy(() => import('src/pages/dashboard/file'));

//  VOTER VIEW
const VoterViewPage = lazy(() => import('src/pages/dashboard/voter_user'));
const VoterUserInfo = lazy(() => import('src/pages/dashboard/voter_info'));

// USER
const UserProfilePage = lazy(() => import('src/pages/dashboard/user/profile'));
const UserCardsPage = lazy(() => import('src/pages/dashboard/user/cards'));
const UserListPage = lazy(() => import('src/pages/dashboard/user/list'));
const UserAccountPage = lazy(() => import('src/pages/dashboard/user/account'));
const UserCreatePage = lazy(() => import('src/pages/dashboard/user/new'));
const UserEditPage = lazy(() => import('src/pages/dashboard/user/edit'));
const EditSocialLink = lazy(() => import('src/pages/dashboard/user/socialEdit'));

// APP
const ChatPage = lazy(() => import('src/pages/dashboard/chat'));

// ADMIN CONTACT
const ContactCreatePage = lazy(
  () => import('src/pages/dashboard/election-managment-services/adminContact/new'))
const ContactListPage = lazy(
  () => import('src/pages/dashboard/election-managment-services/adminContact/list')
);
const ContactDetailsPage = lazy(
  () => import('src/pages/dashboard/election-managment-services/adminContact/details')
);
const ContactEditPage = lazy(
  () => import('src/pages/dashboard/election-managment-services/adminContact/edit')
);

// VOTER
const Addvoter = lazy(
  () => import('src/pages/dashboard/election-managment-services/VoterManagment/AddVoter')
);
const ShowvoterList = lazy(
  () => import('src/pages/dashboard/election-managment-services/VoterManagment/ShowVoterList')
);
const ShowVoterDetail = lazy(
  () => import('src/pages/dashboard/election-managment-services/VoterManagment/VoterDetail')
);
const VoterEditDetail = lazy(
  () => import('src/pages/dashboard/election-managment-services/VoterManagment/EditVoter')
);
const CreateYourPost = lazy(
  () => import('src/pages/dashboard/election-managment-services/VoterManagment/CreateYourPost')
);
const AddFakeVote = lazy(
  () => import('src/pages/dashboard/election-managment-services/VoterManagment/AddFakeVoting')
);

// VOTE_PREDICTION
const VotePredictionListPage = lazy(
  () => import('src/pages/dashboard/election-managment-services/Voter_predictionManagement/ShowVoterList')
);
const VotePredictionDetailPage = lazy(
  () => import('src/pages/dashboard/election-managment-services/Voter_predictionManagement/VoterDetail')
);
const VotePredictionEditPage = lazy(
  () => import('src/pages/dashboard/election-managment-services/Voter_predictionManagement/EditVoter')
);


// EXPENSES MANAGEMENT

// CLAIM MANAGEMENT
const ClaimListPage = lazy(() => import('src/pages/dashboard/expenses-management-services/claim-management/list'));

const ClaimDetailsPage = lazy(() => import('src/pages/dashboard/expenses-management-services/claim-management/details'));

const ClaimEditPage = lazy(() => import('src/pages/dashboard/expenses-management-services/claim-management/edit'));

const ClaimCreatePage = lazy(() => import('src/pages/dashboard/expenses-management-services/claim-management/new'));

// CATEGORY MANAGEMENT
const CategoryListPage = lazy(() => import('src/pages/dashboard/expenses-management-services/category-management/list'));

const CategoryDetailsPage = lazy(() => import('src/pages/dashboard/expenses-management-services/category-management/details'));

const CategoryEditPage = lazy(() => import('src/pages/dashboard/expenses-management-services/category-management/edit'));

const CategoryCreatePage = lazy(() => import('src/pages/dashboard/expenses-management-services/category-management/new'));

// INVOICE MANAGEMENT

const ExpensesListPage = lazy(() => import('src/pages/dashboard/expenses-management-services/invoice-management/list'));

const ExpensesDetailsPage = lazy(() => import('src/pages/dashboard/expenses-management-services/invoice-management/details'));

const ExpensesEditPage = lazy(() => import('src/pages/dashboard/expenses-management-services/invoice-management/edit'));

const ExpensesCreatePage = lazy(() => import('src/pages/dashboard/expenses-management-services/invoice-management/new'));



// CANDIDATE BY DEEPAK

const CandidateListPage = lazy(
  () => import('src/pages/dashboard/election-managment-services/candidate/list')
);
const CandidateCreatePage = lazy(
  () => import('src/pages/dashboard/election-managment-services/candidate/new')
);
const CandidateDetailsPage = lazy(
  () => import('src/pages/dashboard/election-managment-services/candidate/details')
);
const CandidateEditPage = lazy(
  () => import('src/pages/dashboard/election-managment-services/candidate/edit')
);

// BOOTH BY AVNISH
const BoothListPage = lazy(
  () => import('src/pages/dashboard/election-managment-services/boothmanagement/list')
);
const BoothDetailsPage = lazy(
  () => import('src/pages/dashboard/election-managment-services/boothmanagement/details')
);
const BoothEditPage = lazy(
  () => import('src/pages/dashboard/election-managment-services/boothmanagement/edit')
);
const BoothCreatePage = lazy(
  () => import('src/pages/dashboard/election-managment-services/boothmanagement/new')
);

// Ward By Shubranshu

const WardListPage = lazy(
  () => import('src/pages/dashboard/election-managment-services/wardmanagement/list')
);
const WardCreatePage = lazy(
  () => import('src/pages/dashboard/election-managment-services/wardmanagement/new')
);
const WardDetailsPage = lazy(
  () => import('src/pages/dashboard/election-managment-services/wardmanagement/details')
);
const WardEditPage = lazy(
  () => import('src/pages/dashboard/election-managment-services/wardmanagement/edit')
);


// Service version by Ayaz

const ServiceVersionListPage = lazy(
  () => import('src/pages/dashboard/election-managment-services/serviceversion/list')
);
const ServiceVersionCreatePage = lazy(
  () => import('src/pages/dashboard/election-managment-services/serviceversion/new')
);
const ServiceVersionDetailsPage = lazy(
  () => import('src/pages/dashboard/election-managment-services/serviceversion/details')
);
const ServiceVersionEditPage = lazy(
  () => import('src/pages/dashboard/election-managment-services/serviceversion/edit')
);

// User Profile Management By Thomas Talukdar

const UserProfileList = lazy(
  () => import('src/pages/dashboard/user-profile-management/list')
);
const UserProfileCreatePage = lazy(
  () => import('src/pages/dashboard/user-profile-management/new')
);
const UserProfileDetailsPage = lazy(
  () => import('src/pages/dashboard/user-profile-management/details')
);
const UserProfileEditPage = lazy(
  () => import('src/pages/dashboard/user-profile-management/edit')
);
const UserProfileRoleEditPage = lazy(
  () => import('src/pages/dashboard/user-profile-management/profileEdit')
);

const UserProfileOwnerEditPage = lazy(
  () => import('src/pages/dashboard/user-profile-management/ownerEdit')
);

// User Role Management By Thomas Talukdar

const UserRoleListPage = lazy(
  () => import('src/pages/dashboard/user-role-management/list')
);
const UserRoleCreatePage = lazy(
  () => import('src/pages/dashboard/user-role-management/new')
);
const UserRoleDetailsPage = lazy(
  () => import('src/pages/dashboard/user-role-management/details')
);
const UserRoleEditPage = lazy(
  () => import('src/pages/dashboard/user-role-management/edit')
);

// Election By Saurab

const ElectionListPage = lazy(
  () => import('src/pages/dashboard/election-managment-services/electionmanagement/list')
);
const ElectionCreatePage = lazy(
  () => import('src/pages/dashboard/election-managment-services/electionmanagement/new')
);
const ElectionDetailsPage = lazy(
  () => import('src/pages/dashboard/election-managment-services/electionmanagement/details')
);
const ElectionEditPage = lazy(
  () => import('src/pages/dashboard/election-managment-services/electionmanagement/edit')
);

// Transport Management (Driver)By Ankit

const DriverListPage = lazy(
  () => import('src/pages/dashboard/transport-management-services/driver/list')
);
const DriverCreatePage = lazy(
  () => import('src/pages/dashboard/transport-management-services/driver/new')
);
const DriverDetailsPage = lazy(
  () => import('src/pages/dashboard/transport-management-services/driver/details')
);
const DriverEditPage = lazy(
  () => import('src/pages/dashboard/transport-management-services/driver/edit')
);



// Transport Managment (Vehicle) By Ankit
const VehicleListPage = lazy(
  () => import('src/pages/dashboard/transport-management-services/vehicle/list')
);
const VehicleCreatePage = lazy(
  () => import('src/pages/dashboard/transport-management-services/vehicle/new')
);
const VehicleDetailsPage = lazy(
  () => import('src/pages/dashboard/transport-management-services/vehicle/details')
);
const VehicleEditPage = lazy(
  () => import('src/pages/dashboard/transport-management-services/vehicle/edit')
);

// Transport Management (Vehicle Booking option) by Vinay
const VehicleOptionListPage = lazy(() => import('src/pages/dashboard/transport-management-services/vehicle-booking-option/list'))

const VehicleOptionCreatePage = lazy(() => import('src/pages/dashboard/transport-management-services/vehicle-booking-option/new'))

const VehicleOptionEditPage = lazy(() => import('src/pages/dashboard/transport-management-services/vehicle-booking-option/edit'))

const VehicleOptionDetailsPage = lazy(() => import('src/pages/dashboard/transport-management-services/vehicle-booking-option/details'))

// Transport Managment (Trip) By Ankit Sharma 
const TripListPage = lazy(
  () => import('src/pages/dashboard/transport-management-services/trip/list')
);
const TripCreatePage = lazy(
  () => import('src/pages/dashboard/transport-management-services/trip/new')
);
const TripDetailsPage = lazy(
  () => import('src/pages/dashboard/transport-management-services/trip/details')
);
const TripEditPage = lazy(
  () => import('src/pages/dashboard/transport-management-services/trip/edit')
);
const TripManagedListPage = lazy(
  () => import('src/pages/dashboard/transport-management-services/trip/managedlist')
);
const TripManagedDetailsView = lazy(
  () => import('src/pages/dashboard/transport-management-services/trip/manageddetailsview')
);
// Transport Management (Ambulance) By Ankit Sharma 
const AmbulanceListPage = lazy(
  () => import('src/pages/dashboard/transport-management-services/ambulance/list')
);
const AmbulanceCreatePage = lazy(
  () => import('src/pages/dashboard/transport-management-services/ambulance/new')
);
const AmbulanceDetailsPage = lazy(
  () => import('src/pages/dashboard/transport-management-services/ambulance/details')
);
const AmbulanceEditPage = lazy(
  () => import('src/pages/dashboard/transport-management-services/ambulance/edit')
);
const AmbulanceManagedListPage = lazy(
  () => import('src/pages/dashboard/transport-management-services/ambulance/managedlist')
);
const AmbulanceManagedDetailsView = lazy(
  () => import('src/pages/dashboard/transport-management-services/ambulance/manageddetailsview')
);
// OurWork Management By saurabh
const WorkListPage = lazy(
  () => import('src/pages/dashboard/our-work/list')
);
const WorkCreatePage = lazy(
  () => import('src/pages/dashboard/our-work/new')
);
const WorkDetailsPage = lazy(
  () => import('src/pages/dashboard/our-work/details')
);
const WorkEditPage = lazy(
  () => import('src/pages/dashboard/our-work/edit')
);

// work Management By avanish

const ModelListPage = lazy(
  () => import('src/pages/dashboard/model_pop/list')
);
const ModelCreatePage = lazy(
  () => import('src/pages/dashboard/model_pop/new')
);
const ModelDetailsPage = lazy(
  () => import('src/pages/dashboard/model_pop/details')
);
const ModelEditPage = lazy(
  () => import('src/pages/dashboard/model_pop/edit')
);


// Pooling Management By Thomas
const PoolListPage = lazy(
  () => import('src/pages/dashboard/pooling-Management/list')
);
const PoolCreatePage = lazy(
  () => import('src/pages/dashboard/pooling-Management/new')
);
const PoolDetailsPage = lazy(
  () => import('src/pages/dashboard/pooling-Management/details')
);
const PoolEditPage = lazy(
  () => import('src/pages/dashboard/pooling-Management/edit')
);

const TripDriverListPage = lazy(
  () => import('src/pages/dashboard/transport-management-services/trip_driver/list')
);
const TripDriverCreatePage = lazy(
  () => import('src/pages/dashboard/transport-management-services/trip_driver/new')
);
const TripDriverEditPage = lazy(
  () => import('src/pages/dashboard/transport-management-services/trip_driver/edit')
);
const TripRouteMapView = lazy(
  () => import('src/pages/dashboard/transport-management-services/trip_driver/map')
);
// TMS User interface WardVol By Ankit
const WardvolListPage = lazy(
  () => import('src/pages/dashboard/transport-management-services/wardvol/list')
);
const WardvolCreatePage = lazy(
  () => import('src/pages/dashboard/transport-management-services/wardvol/new')
);
const WardvolDetailsPage = lazy(
  () => import('src/pages/dashboard/transport-management-services/wardvol/details')
);
// const WardvolEditPage = lazy(
//   () => import('src/pages/dashboard/transport-management-services/wardvol/edit')
// );

// TMS Ambulance Booking By Ankit Sharma
const AmbulanceTripListPage = lazy(
  () => import('src/pages/dashboard/transport-management-services/ambulance-trip/list')
);
const AmbulanceTripCreatePage = lazy(
  () => import('src/pages/dashboard/transport-management-services/ambulance-trip/new')
);
const AmbulanceTripDetailsPage = lazy(
  () => import('src/pages/dashboard/transport-management-services/ambulance-trip/details')
);
const AmbulanceTripEditPage = lazy(
  () => import('src/pages/dashboard/transport-management-services/ambulance-trip/edit')
);
const AmbulanceCardsList = lazy(
  () => import('src/pages/dashboard/emergancy-ambulance-cards/list')
);
const DocterCardListView = lazy(
  () => import('src/pages/dashboard/emergancy-ambulance-cards/docter_cards')
);

// cards added by Pankaj
const CardCreateView = lazy(
  () => import('src/pages/dashboard/add_card/create')
);


// TMS User interface WardLeader By Ankit
const WardLeaderListPage = lazy(
  () => import('src/pages/dashboard/transport-management-services/wardleader/list')
);
const WardLeaderCreatePage = lazy(
  () => import('src/pages/dashboard/transport-management-services/wardleader/new')
);
const WardLeaderDetailsPage = lazy(
  () => import('src/pages/dashboard/transport-management-services/wardleader/details')
);
const WardLeaderEditPage = lazy(
  () => import('src/pages/dashboard/transport-management-services/wardleader/edit')
);

// SMS MANAGEMENT BY Saurabh

const SmsListPage = lazy(() => import('src/pages/dashboard/support-managment-services/list'));

const SmsDetailsPage = lazy(() => import('src/pages/dashboard/support-managment-services/details'));

const SmsEditPage = lazy(() => import('src/pages/dashboard/support-managment-services/edit'));

const SmsCreatePage = lazy(() => import('src/pages/dashboard/support-managment-services/new'));



// PARTY MANAGEMENT

const PartyListPage = lazy(() => import('src/pages/dashboard/election-managment-services/party_management/list'));

const PartyDetailsPage = lazy(() => import('src/pages/dashboard/election-managment-services/party_management/details'));

const PartyEditPage = lazy(() => import('src/pages/dashboard/election-managment-services/party_management/edit'));

const PartyCreatePage = lazy(() => import('src/pages/dashboard/election-managment-services/party_management/new'));



// Desire MANAGEMENT by Saurabh 

const DesireListPage = lazy(() => import('src/pages/dashboard/desire_managment/list'));

const DesireCardPage = lazy(() => import('src/pages/dashboard/desire_managment/card'));

const DesireDetailsPage = lazy(() => import('src/pages/dashboard/desire_managment/details'));

const DesireEditPage = lazy(() => import('src/pages/dashboard/desire_managment/edit'));

const DesireCreatePage = lazy(() => import('src/pages/dashboard/desire_managment/new'));

// const AppointmentvoterTrackListPage=lazy(() => import('src/pages/dashboard/appointment_managment/usertrack'));

// APPOINTMENT MANAGEMENT by Abhishek, Saurabh , Avanish 

const AppointmentListPage = lazy(() => import('src/pages/dashboard/appointment_managment/list'));

const AppointmentCardPage = lazy(() => import('src/pages/dashboard/appointment_managment/card'));

const AppointmentDetailsPage = lazy(() => import('src/pages/dashboard/appointment_managment/details'));

const AppointmentEditPage = lazy(() => import('src/pages/dashboard/appointment_managment/edit'));

const AppointmentCreatePage = lazy(() => import('src/pages/dashboard/appointment_managment/new'));

const AppointmentvoterTrackListPage = lazy(() => import('src/pages/dashboard/appointment_managment/usertrack'));

const GetHealthTips = lazy(() => import('src/pages/dashboard/appointment_managment/healthTips'));



const AppointmentforDoctorCardPage = lazy(() => import('src/pages/dashboard/appointment_managment_for_doctor/card'));
const AppointmentforDoctorListPage = lazy(() => import('src/pages/dashboard/appointment_managment_for_doctor/list'));
const AppointmentforDoctorDetailsPage = lazy(() => import('src/pages/dashboard/appointment_managment_for_doctor/details'));

const AppointmentforDoctorEditPage = lazy(() => import('src/pages/dashboard/appointment_managment_for_doctor/edit'));

const AppointmentforDoctorDCreatePage = lazy(() => import('src/pages/dashboard/appointment_managment_for_doctor/new'));

const AppointmentforDoctorDvoterTrackListPage = lazy(() => import('src/pages/dashboard/appointment_managment_for_doctor/usertrack'));
// PARTY ALLIANCE MANAGEMENT

const PartyAllianceListPage = lazy(() => import('src/pages/dashboard/election-managment-services/party_alliance_management/list'));

const PartyAllianceDetailsPage = lazy(() => import('src/pages/dashboard/election-managment-services/party_alliance_management/details'));

const PartyAllianceEditPage = lazy(() => import('src/pages/dashboard/election-managment-services/party_alliance_management/edit'));

const PartyAllianceCreatePage = lazy(() => import('src/pages/dashboard/election-managment-services/party_alliance_management/new'));

const KanbanPage = lazy(() => import('src/pages/dashboard/kanban'));

const KanbanProjectPage = lazy(() => import('src/pages/dashboard/kanban-project-list'));

// Kanban MANAGEMENT DEEPAK

const UserKanbanPage = lazy(() => import('src/pages/dashboard/user-kanban'));

const UserKanbanProjectPage = lazy(() => import('src/pages/dashboard/user-kanban-project-list'));

// Property BUY/SELL by Ayaz

const PropertyBuySell = lazy(() => import('src/pages/dashboard/property-buy-sell/create'));

// Blog MANAGEMENT by Deepak

const PostCreatePage = lazy(() => import('src/pages/dashboard/post/new'));
const PostListPage = lazy(() => import('src/pages/dashboard/post/list'));
const PostDetailsPage = lazy(() => import('src/pages/dashboard/post/details'));
const PostEditPage = lazy(() => import('src/pages/dashboard/post/edit'));

// Survey MANAGEMENT DEEPAK

const SurveyCreatePage = lazy(() => import('src/pages/dashboard/survey/new'));
const SurveyListPage = lazy(() => import('src/pages/dashboard/survey/list'));
const SurveyDetailsPage = lazy(() => import('src/pages/dashboard/survey/details'));
const SurveyEditPage = lazy(() => import('src/pages/dashboard/survey/edit'));
const SurveyVoterResposeList = lazy(() => import('src/pages/dashboard/survey/voterResponseList'))

// FILL SURVEY FORM MANAGEMENT DEEPAK

const FillSurveyCreatePage = lazy(() => import('src/pages/dashboard/fill_survey/new'));
const FillSurveyListPage = lazy(() => import('src/pages/dashboard/fill_survey/list'));
const FillSurveyDetailsPage = lazy(() => import('src/pages/dashboard/fill_survey/details'));
const FillSurveyEditPage = lazy(() => import('src/pages/dashboard/fill_survey/edit'));


// Voter Referal by Ankit Kumar

const VoterCreatePage = lazy(() => import('src/pages/dashboard/Voter-Referal/create'))
const VoterReferalPage = lazy(() => import('src/pages/dashboard/Voter-Referal/view'))
const VoterEditPage = lazy(() => import('src/pages/dashboard/Voter-Referal/new'))

// CreateCompaint by Gurpreet

const CreateComplaint = lazy(() => import('src/pages/dashboard/complaint-form/create'))
const CreateCourt = lazy(() => import('src/pages/dashboard/serviceCourt/new'))
const CreateDemo = lazy(() => import('src/pages/dashboard/demoService/new'))
// CreateTourAndTravels by Avanish

const CreateTourAndTravels = lazy(() => import('src/pages/dashboard/tour-and-travels/create'))

// CreateTourAndTravels by Avanish

const CreateApplyForJob = lazy(() => import('src/pages/dashboard/apply-for-job/create'))
const CreateApplyForIndustries = lazy(() => import('src/pages/dashboard/apply-for-industries/create'))
const EmergencyContactList = lazy(() => import('src/pages/dashboard/emergency-contact-list/create'))
const SocialMediaa = lazy(() => import('src/pages/dashboard/social-media/create'))

// VotingSlip by Gurpreet

const VotingSlip = lazy(() => import('src/pages/dashboard/voting-slip/create'))



const AssignedVehicle = lazy(() => import('src/pages/dashboard/assignedVehicle/create'))

// EMS Launch Announcement
const LaunchEvent = lazy(() => import('src/pages/dashboard/Announcement/announcement'))




// studentcareer by Avinash

const StudentCareer = lazy(() => import('src/pages/dashboard/studentCareer/create'))
const InstituteCreateView = lazy(() => import('src/pages/dashboard/studentCareer/Institute_create'))
const InstituteBookingCreateView = lazy(() => import('src/pages/dashboard/studentCareer/institutionAppointment/Institute_appointment_create'))
const InstituteBookingEditView = lazy(() => import('src/pages/dashboard/studentCareer/institutionAppointment/Institute_appointment_edit'))
const InstituteAppointmentDetails = lazy(() => import('src/pages/dashboard/studentCareer/institutionAppointment/Institute_appointment_details'))
const InstituteEditView = lazy(() => import('src/pages/dashboard/studentCareer/institutionDetails/Institute_details_edit'))
const InstituteListView = lazy(() => import('src/pages/dashboard/studentCareer/Institute_list'))
const InterestedStudentListView = lazy(() => import('src/pages/dashboard/studentCareer/InterestedStudents_list'))
const InstituteDetailsView = lazy(() => import('src/pages/dashboard/studentCareer/Institute_details'))
const CollegeDetailsView = lazy(() => import('src/pages/dashboard/studentCareer/college_details'))
const CoachingCenterDetailsView = lazy(() => import('src/pages/dashboard/studentCareer/CoachingCenter_details'))
const AppointmentDetailsView = lazy(() => import('src/pages/dashboard/studentCareer/Appointment_details'))
const InstitutionDetailsCreateView = lazy(() => import('src/pages/dashboard/studentCareer/institutionDetails/Institute_details_create'))


// farmerservices by Avinash

const FarmerService = lazy(() => import('src/pages/dashboard/farmerService/create'))
const SellOrBuyProducts = lazy(() => import('src/pages/dashboard/farmerService/sellOrBuy'))
const FarmerRegCreatePage = lazy(() => import('src/pages/dashboard/farmerService/register/new'));
const FarmerTractorDetailsPage = lazy(() => import('src/pages/dashboard/farmerService/register/tractorDetails'));
// const FarmerHarvesterDetailsPage = lazy(() => import('src/pages/dashboard/farmerService/register/combineHarvesterDetails'));
const FarmerCombineDetailsPage = lazy(() => import('src/pages/dashboard/farmerService/register/combineHarvesterDetails'));
const FarmerCultivationDetailsPage = lazy(() => import('src/pages/dashboard/farmerService/register/cultivationDetails'));
const FarmerIrrigationDetailsPage = lazy(() => import('src/pages/dashboard/farmerService/register/irrigationDetails'));
const FarmerModernAgriDetailsPage = lazy(() => import('src/pages/dashboard/farmerService/register/modernAgriDetails'));
const FarmerAppointmentDetailsPage = lazy(() => import('src/pages/dashboard/farmerService/register/appointmentDetails'));
const FarmerRegListPage = lazy(() => import('src/pages/dashboard/farmerService/register/list'));
const FarmerRegEditPage = lazy(() => import('src/pages/dashboard/farmerService/register/edit'));
const FarmerAppointmentCreatePage = lazy(() => import('src/pages/dashboard/farmerService/register/create-Appointment'));
const FarmerAppointmentEditePage = lazy(() => import('src/pages/dashboard/farmerService/register/edit-Appointment'));
const FarmerAppointmentListPage = lazy(() => import('src/pages/dashboard/farmerService/register/list-appointment'));
const InterestedFarmerRegListPage = lazy(() => import('src/pages/dashboard/farmerService/register/interestedFarmersList'));

// Cattle Buy or Sell by Ayaz

const CattleCreatePage = lazy(() => import('src/pages/dashboard/farmerService/cattle/new'));
const CattleEditPage = lazy(() => import('src/pages/dashboard/farmerService/cattle/edit'));
const CattleDetailsPage = lazy(() => import('src/pages/dashboard/farmerService/cattle/details'));
const CattleListPage = lazy(() => import('src/pages/dashboard/farmerService/cattle/list'));

// Farmer Details by Vinay

const FarmerDetailsCreatePage = lazy(() => import('src/pages/dashboard/farmerService/equipment/new'));
const FarmerDetailsEditPage = lazy(() => import('src/pages/dashboard/farmerService/equipment/edit'))
const FarmerDetailsPage = lazy(() => import('src/pages/dashboard/farmerService/equipment/details'));
const FarmerDetailsListPage = lazy(() => import('src/pages/dashboard/farmerService/equipment/list'))

// labourservices by Avinash

const LabourService = lazy(() => import('src/pages/dashboard/LabourService/create'))

// Government Scheme by Ankit Kumar

const GovtScheme = lazy(() => import('src/pages/dashboard/govtScheme/create'))
const StartupIndia = lazy(() => import('src/pages/dashboard/govtScheme/startupIndia'))

// Government Scheme by Pankaj

const WomanEmpourment = lazy(() => import('src/pages/dashboard/womanEmpourment/details'))
// ----------------------------------------------------------------------


// Bussiness roadmap Scheme 

const BussinessRoadmap = lazy(() => import('src/pages/dashboard/bussinessRoadmap/create'))
const ConsultantNewForm = lazy(() => import('src/pages/dashboard/bussinessRoadmap/ConsultantNewForm'))
// ----------------------------------------------------------------------

// Govt Services Scheme By Ankit  Sharma
const GovtService = lazy(() => import('src/pages/dashboard/govtService/create'))
const GovtServiceListPage = lazy(() => import('src/pages/dashboard/govtService/list'))
const GovtServiceDetailsPage = lazy(() => import('src/pages/dashboard/govtService/details'))


// Suggestion Box by Ankit kumar

const FeedbackPage = lazy(() => import('src/pages/dashboard/feedback/create'))
const FeedbackListPage = lazy(() => import('src/pages/dashboard/feedback/list'))
const FeedbackDetailsPage = lazy(() => import('src/pages/dashboard/feedback/details'))

// added by Pankaj
const ElectionTemplateCreate = lazy(() => import('src/pages/dashboard/electionTemplateManagement/create'))
const ElectionTemplateList = lazy(() => import('src/pages/dashboard/electionTemplateManagement/list'))

// added by Pankaj
const TemplateLibraryList = lazy(() => import('src/pages/dashboard/electionTemplateLibrary/list'))
const TemplateLibraryProject = lazy(() => import('src/pages/dashboard/electionTemplateLibrary/project'))

const ProductManagementList = lazy(() => import('src/pages/dashboard/product-management/list'))
const ProductManagementNew = lazy(() => import('src/pages/dashboard/product-management/new'))
const ProductManagementEdit = lazy(() => import('src/pages/dashboard/product-management/edit'))

const ProductManagementMappingList = lazy(() => import('src/pages/dashboard/product_role_mapping_management/list'))
const ProductManagementMappingNew = lazy(() => import('src/pages/dashboard/product_role_mapping_management/new'));

const ServiceProviderLicenseDetails = lazy(() => import('src/pages/dashboard/request_license/service_provider_details'));
const DriverLicenseDetails = lazy(() => import('src/pages/dashboard/request_license/driver_details'));
const SellerOwnerLicenseDetails = lazy(() => import('src/pages/dashboard/request_license/seller_owner_details'));
const InstituteOwnerLicenseDetails = lazy(() => import('src/pages/dashboard/request_license/institute_owner_details'));
const BusinessmanLicenseDetails = lazy(() => import('src/pages/dashboard/request_license/businessman_details'));
const EmployerLicenseDetails = lazy(() => import('src/pages/dashboard/request_license/employer_details'));
const RequestLicenseDetails = lazy(() => import('src/pages/dashboard/request_license/doctor_details'));
const RequestLicenseList = lazy(() => import('src/pages/dashboard/request_license/request_license_list'));

// Ambulance Form BY Ankit Sharma
// const AmbulanceCreatePage = lazy(
//   () => import('src/pages/dashboard/transport-management-services/ambulance/new')
// );
const AmbulanceTrack = lazy(() => import('src/pages/dashboard/transport-management-services/ambulance/details'))

const EmergencyListPage = lazy(() => import('src/pages/dashboard/Emergency-service/list'))
const EmergencyCreatePage = lazy(() => import('src/pages/dashboard/Emergency-service/new'))
const EmergencyEditPage = lazy(() => import('src/pages/dashboard/Emergency-service/edit'))
const EmergencyDetailsPage = lazy(() => import('src/pages/dashboard/Emergency-service/details'))

const OverviewGalleryView = lazy(() => import('src/pages/dashboard/gallery/list'))

// const AmbulanceListPage = lazy(
//   () => import('src/pages/dashboard/transport-management-services/ambulance/ambulancelist')
// );

// Labour job portal added by Pankaj Saini TMS Desire

const LabourJobList = lazy(
  () => import('src/pages/dashboard/labourJob/list')
);
const LabourJobTopList = lazy(
  () => import('src/pages/dashboard/labourJob/subList')
);
const LabourJobNew = lazy(
  () => import('src/pages/dashboard/labourJob/create')
);
const LabourJobDetail = lazy(
  () => import('src/pages/dashboard/labourJob/details')
);
const LabourJobEdit = lazy(
  () => import('src/pages/dashboard/labourJob/edit')
);
const EmployementList = lazy(
  () => import('src/pages/dashboard/employement_list/list')
)

// added by Deepak
const AnalysisList = lazy(() => import('src/pages/dashboard/analysisSeg'))

// mail channel
const ViaMail = lazy(() => import('src/pages/dashboard/mailForm'));

// delivery service route added by Pankaj
const DeliveryCreateView = lazy(() => import('src/pages/dashboard/transport-management-services/delivery-service/new'));
const DeliverylistView = lazy(() => import('src/pages/dashboard/transport-management-services/delivery-service/list'));
const DeliveryTripDetailsPage = lazy(() => import('src/pages/dashboard/transport-management-services/delivery-service/details'));

// delivery service route added by Pankaj
const CabTripCreateView = lazy(() => import('src/pages/dashboard/transport-management-services/cab-service/new'));
const CabTriplistView = lazy(() => import('src/pages/dashboard/transport-management-services/cab-service/list'));
const CabTripTripDetailsView = lazy(() => import('src/pages/dashboard/transport-management-services/cab-service/details'));



// // Lawyer portal added by Deepak
// const LawyerCreatePage = lazy(() => import('src/pages/dashboard/Lawyer/create'));
// const LawyerListPage = lazy(() => import('src/pages/dashboard/Lawyer/list'));
// const LawyerDetailsPage = lazy(() => import('src/pages/dashboard/Lawyer/details'));
// const LawyerEditPage = lazy(() => import('src/pages/dashboard/Lawyer/edit'));

// // LMS VENDOR portal added by Deepak
// const LMSvendorCreatePage = lazy(() => import('src/pages/dashboard/LMSVendor/create'));
// const LMSvendorListPage = lazy(() => import('src/pages/dashboard/LMSVendor/list'));
// const LMSvendorDetailsPage = lazy(() => import('src/pages/dashboard/LMSVendor/details'));
// const LMSvendorEditPage = lazy(() => import('src/pages/dashboard/LMSVendor/edit'));

// // LMS CLIENT portal added by Thomas
// const LMSClientCreatePage = lazy(() => import('src/pages/dashboard/LMSClient/create'));
// const LMSClientListPage = lazy(() => import('src/pages/dashboard/LMSClient/list'));
// const LMSClientDetailsPage = lazy(() => import('src/pages/dashboard/LMSClient/details'));
// const LMSClientEditPage = lazy(() => import('src/pages/dashboard/LMSClient/edit'));

// // LMS charterd Acountant portal added by Thomas
// const CharteredAccountantCreatePage = lazy(() => import('src/pages/dashboard/CharteredAccountant/create'));
// const CharteredAccountantListPage = lazy(() => import('src/pages/dashboard/CharteredAccountant/list'));
// const CharteredAccountantDetailsPage = lazy(() => import('src/pages/dashboard/CharteredAccountant/details'));
// const CharteredAccountantEditPage = lazy(() => import('src/pages/dashboard/CharteredAccountant/edit'));
const LMScards = lazy(() => import('src/pages/dashboard/lms_cards/browse'));
// Lawyer portal added by Deepak
const LawyerCreatePage = lazy(() => import('src/pages/dashboard/Lawyer/create'));
const LawyerBrowsePage = lazy(() => import('src/pages/dashboard/Lawyer/browse'));
const LawyerListPage = lazy(() => import('src/pages/dashboard/Lawyer/list'));
const LawyerFilterListPage = lazy(() => import('src/pages/dashboard/Lawyer/filter'));
const LawyerDetailsPage = lazy(() => import('src/pages/dashboard/Lawyer/details'));
const LawyerEditPage = lazy(() => import('src/pages/dashboard/Lawyer/edit'));
const LawyerDetailsByIdPage = lazy(() => import('src/pages/dashboard/Lawyer/my_details'));

// LMS VENDOR portal added by Deepak
const LMSvendorCreatePage = lazy(() => import('src/pages/dashboard/LMSVendor/create'));
const VendorBrowsePage = lazy(() => import('src/pages/dashboard/LMSVendor/browse'));
const LMSvendorListPage = lazy(() => import('src/pages/dashboard/LMSVendor/list'));
const LMSvendorFilterListPage = lazy(() => import('src/pages/dashboard/LMSVendor/filter'));
const LMSvendorDetailsPage = lazy(() => import('src/pages/dashboard/LMSVendor/details'));
const LMSvendorEditPage = lazy(() => import('src/pages/dashboard/LMSVendor/edit'));
const VendorDetailsByIdPage = lazy(() => import('src/pages/dashboard/LMSVendor/my_details'));

// LMS CLIENT portal added by Ankit
const LMSClientCreatePage = lazy(() => import('src/pages/dashboard/LMSClient/create'));
const LMSClientListPage = lazy(() => import('src/pages/dashboard/LMSClient/list'));
const LMSClientDetailsPage = lazy(() => import('src/pages/dashboard/LMSClient/details'));
const LMSClientEditPage = lazy(() => import('src/pages/dashboard/LMSClient/edit'));
//  LMS Document portal Added By Ankit
const LMSDocumentCreateOage = lazy(() => import('src/pages/dashboard/document/create'))
const LMSDocumentListPage = lazy(() => import('src/pages/dashboard/document/list'))
const LMSDocumentDetailsPage = lazy(() => import('src/pages/dashboard/document/details'))
const LMSDocumentEditPage = lazy(() => import('src/pages/dashboard/document/edit'))
// LMS charterd Acountant portal added by Ankit
const CharteredAccountantCreatePage = lazy(
  () => import('src/pages/dashboard/CharteredAccountant/create')
);
const CharteredAccountantListPage = lazy(
  () => import('src/pages/dashboard/CharteredAccountant/list')
);
const CharteredAccountantDetailsPage = lazy(
  () => import('src/pages/dashboard/CharteredAccountant/details')
);
const CharteredAccountantEditPage = lazy(
  () => import('src/pages/dashboard/CharteredAccountant/edit')
);
const CharteredAccountantDetailsByIdPage = lazy(() => import('src/pages/dashboard/CharteredAccountant/my_details'));
const CharteredAccountantBrowsePage = lazy(() => import('src/pages/dashboard/CharteredAccountant/browse'));
const CharteredAccountantFilterListPage = lazy(() => import('src/pages/dashboard/CharteredAccountant/filter'));

const ContractCreatePage = lazy(() => import('src/pages/dashboard/LMS-contract/create'));
const ContractListPage = lazy(() => import('src/pages/dashboard/LMS-contract/list'));
const ContractDetailsPage = lazy(() => import('src/pages/dashboard/LMS-contract/details'));
const ContractEditPage = lazy(() => import('src/pages/dashboard/LMS-contract/edit'));
// const ContractDetailsByIdPage = lazy(() => import('src/pages/dashboard/LMS-contract/my_details'));


const CaseCreatePage = lazy(() => import('src/pages/dashboard/LMS-case/create'));
const CaseListPage = lazy(() => import('src/pages/dashboard/LMS-case/list'));
const CaseLawyerListPage = lazy(() => import('src/pages/dashboard/LMS-case/list-for-lawyer'));
const CaseDetailsPage = lazy(() => import('src/pages/dashboard/LMS-case/details'));
const CaseEditPage = lazy(() => import('src/pages/dashboard/LMS-case/edit'));
// const CaseDetailsByIdPage = lazy(() => import('src/pages/dashboard/LMS-case/my_details'));

const CaseDetailsCreatePage = lazy(() => import('src/pages/dashboard/LMS-ClientDetails/create'));
const CaseDetailsListPage = lazy(() => import('src/pages/dashboard/LMS-ClientDetails/list'));
const CaseDetailsDetailsPage = lazy(() => import('src/pages/dashboard/LMS-ClientDetails/details'));
const CaseDetailsEditPage = lazy(() => import('src/pages/dashboard/LMS-ClientDetails/edit'));

const ServiceCreatePage = lazy(() => import('src/pages/dashboard/LMS-services/create'));
const ServiceListPage = lazy(() => import('src/pages/dashboard/LMS-services/list'));
const ServiceDetailsPage = lazy(() => import('src/pages/dashboard/LMS-services/details'));
const ServiceEditPage = lazy(() => import('src/pages/dashboard/LMS-services/edit'));
// const CaseDetailsByIdPage = lazy(() => import('src/pages/dashboard/LMS-case/my_details'));


const SubServiceCreatePage = lazy(() => import('src/pages/dashboard/LMS-sub-service/create'));
const SubServiceListPage = lazy(() => import('src/pages/dashboard/LMS-sub-service/list'));
const SubServiceDetailsPage = lazy(() => import('src/pages/dashboard/LMS-sub-service/details'));
const SubServiceEditPage = lazy(() => import('src/pages/dashboard/LMS-sub-service/edit'));
// const CaseDetailsByIdPage = lazy(() => import('src/pages/dashboard/LMS-case/my_details'));

// LMS service MANAGEMENT DEEPAK

// const SurveyCreatePage = lazy(() => import('src/pages/dashboard/survey/new'));
const ListPage = lazy(() => import('src/pages/dashboard/LMS-service/civil-cases/property-dispute'));
const DetailsPage = lazy(() => import('src/pages/dashboard/LMS-service/civil-cases/details'));

const LMSUserProfile = lazy(() => import('src/pages/dashboard/lms-userrole'));
const STDUserProfile = lazy(() => import('src/pages/dashboard/std-role'));
const STD10th = lazy(() => import('src/pages/dashboard/student/10th/studentGuide'));
const STD12th = lazy(() => import('src/pages/dashboard/student/12th/studentGuide'));
const STDCollege = lazy(() => import('src/pages/dashboard/student/college/studentGuide'));


// const farmerProfile = lazy(() => import('src/pages/dashboard/farmer-roadmap'));
const FarmerSeason = lazy(() => import('src/pages/dashboard/Farmer/Season/create'));
const FarmerSoil = lazy(() => import('src/pages/dashboard/Farmer/Soil/create'));
const FarmerProfile = lazy(() => import('src/pages/dashboard/farmer-roadmap'))
const FarmerCrop = lazy(() => import('src/pages/dashboard/Farmer/Crop/create'));

// -------------------------------------------------------
export const dashboardRoutes = [
  {
    path: 'dashboard',
    element: (
      <AuthGuard>
        <PaymentGuard>
          <DashboardLayout>
            <Suspense fallback={<LoadingScreen />}>
              <Outlet />
            </Suspense>
          </DashboardLayout>
        </PaymentGuard>
      </AuthGuard>
    ),
    children: [
      { element: <IndexPage />, index: true },
      { path: 'ecommerce', element: <OverviewEcommercePage /> },
      { path: 'analytics', element: <OverviewAnalyticsPage /> },
      { path: 'banking', element: <OverviewBankingPage /> },
      { path: 'booking', element: <OverviewBookingPage /> },
      { path: 'file', element: <OverviewFilePage /> },
      {
        path: 'user',
        children: [
          { element: <UserProfilePage />, index: true },
          { path: 'profile', element: <UserProfilePage /> },
          { path: 'cards', element: <UserCardsPage /> },
          { path: 'list', element: <UserListPage /> },
          { path: 'new', element: <UserCreatePage /> },
          { path: ':id/edit', element: <UserEditPage /> },
          { path: 'account', element: <UserAccountPage /> },
          { path: ':id/editSocialProfile', element: <EditSocialLink /> },

        ],
      },
      // Voter View
      {
        path: 'voterview',
        children: [
          { element: <VoterViewPage />, index: true },
          { path: 'details', element: <VoterViewPage /> },
          { path: 'details/info/:item', element: <VoterUserInfo /> },
        ]
      },

      // Admin Contact
      {
        path: 'contact',
        children: [
          { element: <ContactListPage />, index: true },
          { path: 'list', element: <ContactListPage /> },
          { path: ':id', element: <ContactDetailsPage /> },
          { path: 'new', element: <ContactCreatePage /> },
          { path: ':id/edit', element: <ContactEditPage /> },
        ],
      },

      // party Route by Ankit kumar, ayaz , shubhranshu ( 9 april )
      {
        path: 'party',
        children: [
          { element: <PartyListPage />, index: true },
          { path: 'list', element: <PartyListPage /> },
          { path: ':id', element: <PartyDetailsPage /> },
          { path: ':id/edit', element: <PartyEditPage /> },
          { path: 'new', element: <PartyCreatePage /> },
        ],
      },

      // party Route by Ankit kumar, ayaz , shubhranshu ( 10 april )
      {
        path: 'party_alliance',
        children: [
          { element: <PartyAllianceListPage />, index: true },
          { path: 'list', element: <PartyAllianceListPage /> },
          { path: ':id', element: <PartyAllianceDetailsPage /> },
          { path: ':id/edit', element: <PartyAllianceEditPage /> },
          { path: 'new', element: <PartyAllianceCreatePage /> },
        ],
      },


      // Appointment Route by Abhishek, saurabh , avanish ( 9 may )
      {
        path: 'Appointment',
        children: [
          { element: <AppointmentListPage />, index: true },
          { path: 'card', element: <AppointmentCardPage /> },
          { path: 'list', element: <AppointmentListPage /> },
          { path: ':id', element: <AppointmentDetailsPage /> },
          { path: 'list:id', element: <AppointmentvoterTrackListPage /> },
          { path: ':id/edit', element: <AppointmentEditPage /> },
          { path: 'new', element: <AppointmentCreatePage /> },
          // { path: 'healthTips', element: <GetHealthTips /> },
        ],
      },
      //       const DesireListPage = lazy(() => import('src/pages/dashboard/desire_managment/list'));

      // const DesireCardPage = lazy(() => import('src/pages/dashboard/desire_managment/card'));

      // const DesireDetailsPage = lazy(() => import('src/pages/dashboard/desire_managment/details'));

      // const DesireEditPage = lazy(() => import('src/pages/dashboard/desire_managment/edit'));

      // const DesireCreatePage = lazy(() => import('src/pages/dashboard/desire_managment/new'));






      // Desire Route by , saurabh  ( 27 may )
      {
        path: 'Desire',
        children: [
          { element: <DesireListPage />, index: true },
          { path: 'card', element: <DesireCardPage /> },
          { path: 'list', element: <DesireListPage /> },
          { path: ':id', element: <DesireDetailsPage /> },
          // { path: 'list:id', element: <AppointmentvoterTrackListPage /> },
          { path: ':id/edit', element: <DesireEditPage /> },
          { path: 'new', element: <DesireCreatePage /> },
        ],
      },
      {
        path: 'Appointmenttodoctor',
        children: [
          { element: <AppointmentforDoctorListPage />, index: true },
          { path: 'card', element: <AppointmentforDoctorCardPage /> },
          { path: 'list', element: <AppointmentforDoctorListPage /> },
          { path: ':id', element: <AppointmentforDoctorDetailsPage /> },
          { path: 'list:id', element: <AppointmentforDoctorDvoterTrackListPage /> },
          { path: ':id/edit', element: <AppointmentforDoctorEditPage /> },
          { path: 'new', element: <AppointmentforDoctorDCreatePage /> },
        ],
      },

      // delivery service route added by Pankaj Saini
      {
        path: 'deliveryService',
        children: [
          { element: <DeliveryCreateView />, index: true },
          { path: 'new', element: <DeliveryCreateView /> },
          { path: 'list', element: <DeliverylistView /> },
          // { path: ':id', element: <AppointmentforDoctorDetailsPage  /> },
          { path: 'details/:id', element: <DeliveryTripDetailsPage /> },
          // { path: ':id/edit', element: <AppointmentforDoctorEditPage /> },
          // { path: 'new', element: <AppointmentforDoctorDCreatePage /> },
        ],
      },

      // cab service route added by Pankaj Saini
      {
        path: 'cabService',
        children: [
          { element: <CabTripCreateView />, index: true },
          { path: 'new', element: <CabTripCreateView /> },
          { path: 'list', element: <CabTriplistView /> },
          { path: 'details/:id', element: <CabTripTripDetailsView /> },
        ],
      },





      // voter Route
      {
        path: 'voter',
        children: [
          { element: <ShowvoterList />, index: true },
          { path: 'list', element: <ShowvoterList /> },
          { path: 'new', element: <Addvoter /> },
          { path: 'CreateYourPost', element: <CreateYourPost /> },
          { path: 'AddFakeVote', element: <AddFakeVote /> },
          { path: ':id', element: <ShowVoterDetail /> },
          { path: ':id/edit', element: <VoterEditDetail /> },
        ],
      },

      {
        path: 'vote_prediction',
        children: [
          { element: <VotePredictionListPage />, index: true },
          { path: 'list', element: <VotePredictionListPage /> },
          { path: ':id', element: <VotePredictionDetailPage /> },
          { path: ':id/edit', element: <VotePredictionEditPage /> },
        ],
      },

      // invoice Route By Abhishek
      {
        path: 'expenses',
        children: [
          { element: <ExpensesListPage />, index: true },
          { path: 'list', element: <ExpensesListPage /> },
          { path: ':id', element: <ExpensesDetailsPage /> },
          { path: ':id/edit', element: <ExpensesEditPage /> },
          { path: 'new', element: <ExpensesCreatePage /> },
        ],
      },

      // Invoice Route (29 march Shubhranshu)
      {
        path: 'invoice',
        children: [
          { element: <ExpensesListPage />, index: true },
          { path: 'list', element: <ExpensesListPage /> },
          { path: ':id', element: <ExpensesDetailsPage /> },
          { path: ':id/edit', element: <ExpensesEditPage /> },
          { path: 'new', element: <ExpensesCreatePage /> },
        ],
      },

      // Category Route (28 march Shubhranshu)

      {
        path: 'category',
        children: [
          { element: <CategoryListPage />, index: true },
          { path: 'list', element: <CategoryListPage /> },
          { path: ':id', element: <CategoryDetailsPage /> },
          { path: ':id/edit', element: <CategoryEditPage /> },
          { path: 'new', element: <CategoryCreatePage /> },
        ],
      },

      //  Claim Route (29 march Shubhranshu)
      {
        path: 'claim',
        children: [
          { element: <ClaimListPage />, index: true },
          { path: 'list', element: <ClaimListPage /> },
          { path: ':id', element: <ClaimDetailsPage /> },
          { path: ':id/edit', element: <ClaimEditPage /> },
          { path: 'new', element: <ClaimCreatePage /> },
        ],
      },

      // Candidate Route By Deepak
      {
        path: 'candidate',
        children: [
          { element: <CandidateListPage />, index: true },
          { path: 'list', element: <CandidateListPage /> },
          { path: 'new', element: <CandidateCreatePage /> },
          { path: ':id', element: <CandidateDetailsPage /> },
          { path: ':id/edit', element: <CandidateEditPage /> },
        ],
      },

      // Service version Route By Ayaz
      {
        path: 'serviceversion',
        children: [
          { element: <ServiceVersionListPage />, index: true },
          { path: 'list', element: <ServiceVersionListPage /> },
          { path: 'new', element: <ServiceVersionCreatePage /> },
          { path: ':id', element: <ServiceVersionDetailsPage /> },
          { path: ':id/edit', element: <ServiceVersionEditPage /> },
        ],
      },

      // Booth Route By Avnish
      {
        path: 'boothmanagement',
        children: [
          { element: <BoothListPage />, index: true },
          { path: 'list', element: <BoothListPage /> },
          { path: 'new', element: <BoothCreatePage /> },
          { path: ':id', element: <BoothDetailsPage /> },
          { path: ':id/edit', element: <BoothEditPage /> },
        ],
      },

      // WardManagement Route By Subranshu
      {
        path: 'wardmanagement',
        children: [
          { element: <WardListPage />, index: true },
          { path: 'list', element: <WardListPage /> },
          { path: 'new', element: <WardCreatePage /> },
          { path: ':id', element: <WardDetailsPage /> },
          { path: ':id/edit', element: <WardEditPage /> },
        ],
      },

      // RoleManagement Route By Ankit

      {
        path: 'userRoleManagement',
        children: [
          { element: <UserRoleListPage />, index: true },
          { path: 'list', element: <UserRoleListPage /> },
          { path: 'new', element: <UserRoleCreatePage /> },
          { path: ':id', element: <UserRoleDetailsPage /> },
          { path: ':id/edit', element: <UserRoleEditPage /> },
        ],
      },

      {
        path: 'userProfileManagement',
        children: [
          { element: <UserProfileList />, index: true },
          { path: 'list', element: <UserProfileList /> },
          { path: 'new', element: <UserProfileCreatePage /> },
          { path: ':id', element: <UserProfileDetailsPage /> },
          { path: ':id/edit', element: <UserProfileEditPage /> },
          { path: ':id/userEdit', element: <UserProfileRoleEditPage /> },
          { path: ':id/userOwnerEdit', element: <UserProfileOwnerEditPage /> },
        ],
      },

      //  Election Route By Saurab

      {
        path: 'electionmanagement',
        children: [
          { element: <ElectionListPage />, index: true },
          { path: 'list', element: <ElectionListPage /> },
          { path: 'new', element: <ElectionCreatePage /> },
          { path: ':id', element: <ElectionDetailsPage /> },
          { path: ':id/edit', element: <ElectionEditPage /> },

        ],
      },

      {
        path: 'poolmanagement',
        children: [
          { element: <PoolListPage />, index: true },
          { path: 'list', element: <PoolListPage /> },
          { path: 'new', element: <PoolCreatePage /> },
          { path: ':id', element: <PoolDetailsPage /> },
          { path: ':id/edit', element: <PoolEditPage /> },
        ],
      },
      // ourwork Management By Saurabh
      {
        path: 'work',
        children: [
          { element: <WorkListPage />, index: true },
          { path: 'list', element: <WorkListPage /> },
          { path: 'new', element: <WorkCreatePage /> },
          { path: ':id', element: <WorkDetailsPage /> },
          { path: ':id/edit', element: <WorkEditPage /> },
        ],
      },
      // {
      //   path: 'chat',
      //   children: [
      //     { element: <ChatPage />, index: true },
      //     { path: ':id', element: <ChatPage /> },
      //   ],
      // },
      { path: 'chat', element: <ChatPage /> },

      // { path: 'chat', element: <ChatPage />},
      // { path: 'chat/:id/p', element: <WorkListPage /> },
      //   { path: 'chat', element: <ChatPage />},
      //  { path:'chatt/:id', element: <ChatPage />},

      // {
      //   path: 'chat',
      //   children: [
      //     { element: <ChatPage />, index: true },
      //     { path: ':id', element: <ChatPage /> },

      //   ],
      // },


      // ourwork Management By Avanish
      {
        path: 'model',
        children: [
          { element: <ModelListPage />, index: true },
          { path: 'list', element: <ModelListPage /> },
          { path: 'new', element: <ModelCreatePage /> },
          { path: ':id', element: <ModelDetailsPage /> },
          { path: ':id/edit', element: <ModelEditPage /> },
        ],
      },

      // Transport Management By Ankit

      {
        path: 'driver',
        children: [
          { element: <DriverListPage />, index: true },
          { path: 'list', element: <DriverListPage /> },
          { path: 'new', element: <DriverCreatePage /> },
          { path: ':id', element: <DriverDetailsPage /> },
          { path: ':id/edit', element: <DriverEditPage /> },
        ],
      },
      // Tranport Managment By Ankit
      {
        path: 'vehicle',
        children: [
          { element: <VehicleListPage />, index: true },
          { path: 'list', element: <VehicleListPage /> },
          { path: 'new', element: <VehicleCreatePage /> },
          { path: ':id', element: <VehicleDetailsPage /> },
          { path: ':id/edit', element: <VehicleEditPage /> },
        ],
      },

      // transport management (vehicle booking option) by Vinay
      {
        path: 'vehicle-booking-option',
        children: [
          { element: <VehicleOptionListPage />, index: true },
          { path: 'list', element: <VehicleOptionListPage /> },
          { path: 'new', element: <VehicleOptionCreatePage /> },
          { path: ':id/detail', element: <VehicleOptionDetailsPage /> },
          { path: ':id/edit', element: <VehicleOptionEditPage /> },
        ],
      },

      // Support Managment By Saurabh
      {
        path: 'sms',
        children: [
          { element: <SmsListPage />, index: true },
          { path: 'list', element: <SmsListPage /> },
          { path: 'new', element: <SmsCreatePage /> },
          { path: ':id', element: <SmsDetailsPage /> },
          { path: ':id/edit', element: <SmsEditPage /> },
        ],
      },

      // Transport Managment By Ankit
      {
        path: 'trip',
        children: [
          { element: <TripListPage />, index: true },
          // { path: 'list', element: <TripListPage /> },
          { path: 'new', element: <TripCreatePage /> },
          { path: ':id', element: <TripDetailsPage /> },
          { path: ':id/edit', element: <TripEditPage /> },
          { path: 'requestedtrip', element: <TripListPage /> },
          { path: 'managedtrip/list', element: <TripManagedListPage /> },
          { path: ':id/details', element: <TripManagedDetailsView /> }
        ],
      },
      {
        path: 'callAmbulance',
        children: [
          { element: <AmbulanceListPage />, index: true },
          { path: 'list', element: < AmbulanceTrack /> },
          { path: 'new', element: <AmbulanceCreatePage /> },
          { path: ':id', element: <AmbulanceDetailsPage /> },
          { path: ':id/edit', element: <AmbulanceEditPage /> },
          { path: 'requestedtrip', element: <AmbulanceListPage /> },
          { path: 'managedtrip/list', element: <AmbulanceManagedListPage /> },
          { path: ':id/details', element: <AmbulanceManagedDetailsView /> }
        ],
      },

      // Transport Managment TripDriver By Ankit
      {
        path: 'tripdriver',
        children: [
          { element: <TripDriverListPage />, index: true },
          { path: 'list', element: <TripDriverListPage /> },
          { path: 'new', element: <TripDriverCreatePage /> },
          { path: ':id/edit', element: <TripDriverEditPage /> },
          { path: 'route/:lat/:lng/:dlat/:dlng', element: <TripRouteMapView /> },
        ],
      },


      // Transport Managment WardVol By Ankit
      {
        path: 'wardvol',
        children: [
          { element: <WardvolListPage />, index: true },
          { path: 'list', element: <WardvolListPage /> },
          { path: 'new', element: <WardvolCreatePage /> },
          { path: ':id', element: <WardvolDetailsPage /> },
          { path: ':id/edit', element: <WardEditPage /> },
        ],
      },
      {
        path: 'ambulancetrip',
        children: [
          { element: <AmbulanceTripListPage />, index: true },
          { path: 'list', element: <AmbulanceTripListPage /> },
          { path: 'new', element: <AmbulanceTripCreatePage /> },
          { path: ':id', element: <AmbulanceTripDetailsPage /> },
          { path: ':id/edit', element: <AmbulanceTripEditPage /> },
          { path: 'requestedtrip', element: <AmbulanceTripListPage /> },
          { path: 'healthTips', element: <GetHealthTips /> },
          { path: 'cards', element: <AmbulanceCardsList /> },
          { path: 'docter/cards', element: <DocterCardListView /> },
        ],
      },
      {
        path: 'card',
        children: [
          { element: <CardCreateView />, index: true },
          { path: 'create', element: <CardCreateView /> },
        ],
      },
      // Transport Managment WardlEader By Ankit
      {
        path: 'wardleader',
        children: [
          { element: <WardLeaderListPage />, index: true },
          { path: 'list', element: <WardLeaderListPage /> },
          { path: 'new', element: <WardLeaderCreatePage /> },
          { path: ':id', element: <WardLeaderDetailsPage /> },
          { path: ':id/edit', element: <WardLeaderEditPage /> },
        ],
      },

      {
        path: 'project',
        children: [
          { element: < KanbanProjectPage />, index: true },
          { path: ':id', element: <KanbanPage /> },
          { path: 'list', element: < KanbanProjectPage /> },
          // { path: 'user-kanban', element: <UserKanbanPage /> },
        ],
      },

      {
        path: 'property',
        children: [
          { element: < PropertyBuySell />, index: true },
          { path: 'new', element: <PropertyBuySell /> },
        ],
      },
      {
        path: 'user-project',
        children: [
          { element: < UserKanbanProjectPage />, index: true },
          { path: ':id', element: <UserKanbanPage /> },
          { path: 'list', element: < UserKanbanProjectPage /> },
          // { path: 'user-kanban', element: <UserKanbanPage /> },
        ],
      },

      // TMS User Assigned driver
      {
        path: 'assigndriver',
        children: [
          { element: <WardLeaderListPage />, index: true },
          { path: 'list', element: <WardLeaderListPage /> },
          { path: 'new', element: <WardLeaderCreatePage /> },
          { path: ':id', element: <WardLeaderDetailsPage /> },
          { path: ':id/edit', element: <WardLeaderEditPage /> },
        ],
      },
      // TMS Create Trip In User 
      {
        path: 'createtrip',
        children: [
          { element: <WardvolListPage />, index: true },
          { path: 'list', element: <WardvolListPage /> },
          { path: 'new', element: <WardvolCreatePage /> },
          { path: ':id', element: <WardvolDetailsPage /> },
          { path: ':id/edit', element: <WardEditPage /> },
        ],
      },
      // BLOG  Management Deepak
      {
        path: 'blog',
        children: [
          { element: <PostListPage />, index: true },
          { path: 'list', element: <PostListPage /> },
          { path: 'new', element: <PostCreatePage /> },
          { path: ':id', element: <PostDetailsPage /> },
          { path: ':id/edit', element: <PostEditPage /> },
        ],
      },

      // Survey Management Deepak
      {
        path: 'survey',
        children: [
          { element: <SurveyListPage />, index: true },
          { path: 'list', element: <SurveyListPage /> },
          { path: 'responseList', element: <SurveyVoterResposeList /> },
          { path: 'new', element: <SurveyCreatePage /> },
          { path: ':id', element: <SurveyDetailsPage /> },
          { path: ':id/edit', element: <SurveyEditPage /> },
          SurveyVoterResposeList
        ],
      },

      // labour job portal Pankaj TMS
      {
        path: 'labour-job',
        children: [
          { element: <LabourJobList />, index: true },
          { path: 'list', element: <LabourJobList /> },
          { path: 'new', element: <LabourJobNew /> },
          { path: ':id', element: <LabourJobDetail /> },
          { path: ':jobType/list', element: <LabourJobTopList /> },
          { path: ':id/edit', element: <LabourJobEdit /> },
          { path: 'employement-list', element: <EmployementList /> },
        ],
      },

      // fill_Survey Management Deepak
      {
        path: 'fill_survey',
        children: [
          { element: <FillSurveyListPage />, index: true },
          { path: 'list', element: <FillSurveyListPage /> },
          { path: 'new', element: <FillSurveyCreatePage /> },
          { path: ':id', element: <FillSurveyDetailsPage /> },
          { path: ':id/edit', element: <FillSurveyEditPage /> },
        ],
      },

      // Voter Referal by ankit kumar
      {
        path: 'voterReferal',
        children: [
          { element: <VoterReferalPage />, index: true },
          { path: 'list', element: <VoterCreatePage /> },
          { path: 'new', element: < VoterEditPage /> },
          // { path: ':id', element: <PostDetailsPage /> },
          // { path: ':id/edit', element: <PostEditPage /> },
        ],
      },
      // compaintForm by Gurpreet
      {
        path: 'votingSlip',
        children: [
          { element: <VotingSlip />, index: true },
          // { path: 'list', element: <VoterCreatePage /> },
          { path: 'new', element: < VotingSlip /> },
          // { path: ':id', element: <PostDetailsPage /> },
          // { path: ':id/edit', element: <PostEditPage /> },
        ],
      },
      // compaintForm by Gurpreet
      {
        path: 'complaintForm',
        children: [
          { element: <CreateComplaint />, index: true },
          // { path: 'list', element: <VoterCreatePage /> },
          { path: 'new', element: < CreateComplaint /> },
          // { path: ':id', element: <PostDetailsPage /> },
          // { path: ':id/edit', element: <PostEditPage /> },
        ],
      },

      // tourAndTravels by Avanish
      {
        path: 'tourAndTravels',
        children: [
          { element: <CreateTourAndTravels />, index: true },
          // { path: 'list', element: <VoterCreatePage /> },
          { path: 'new', element: < CreateTourAndTravels /> },
          // { path: ':id', element: <PostDetailsPage /> },
          // { path: ':id/edit', element: <PostEditPage /> },
        ],
      },

      // CreateApplyForJob

      {
        path: 'applyForJob',
        children: [
          { element: <CreateApplyForJob />, index: true },
          // { path: 'list', element: <VoterCreatePage /> },
          { path: 'new', element: < CreateApplyForJob /> },
          // { path: ':id', element: <PostDetailsPage /> },
          // { path: ':id/edit', element: <PostEditPage /> },
        ],
      },
      {
        path: 'applyForIndustries',
        children: [
          { element: <CreateApplyForIndustries />, index: true },
          { path: 'new', element: < CreateApplyForIndustries /> },
        ],
      },
      {
        path: 'emergencyContactNumber',
        children: [
          { element: <EmergencyContactList />, index: true },
          { path: 'new', element: < EmergencyContactList /> },
        ],
      },
      {
        path: 'socialMedia',
        children: [
          { element: <SocialMediaa />, index: true },
          { path: 'new', element: <SocialMediaa /> },
        ],
      },

      // candidate Library
      {
        path: 'candidateLibrary',
        children: [
          // { element: <CreateComplaint />, index: true },
          // { path: 'list', element: <VoterCreatePage /> },
          // { path: 'new', element: < CreateComplaint/> },
          // { path: ':id', element: <PostDetailsPage /> },
          // { path: ':id/edit', element: <PostEditPage /> },
        ],
      },
      // compaintForm by Gurpreet
      {
        path: 'AssignedVehicle',
        children: [
          { element: <AssignedVehicle />, index: true },
          // { path: 'list', element: <VoterCreatePage /> },
          { path: 'new', element: < AssignedVehicle /> },
          // { path: ':id', element: <PostDetailsPage /> },
          // { path: ':id/edit', element: <PostEditPage /> },
        ],
      },
      // Launch by Ayaz
      {
        path: 'LaunchEvent',
        children: [
          { element: <LaunchEvent />, index: true },
          { path: 'Announcement', element: < LaunchEvent /> },
        ],
      },

      // compaintForm by Avanish


      {
        path: 'StudentCareer',
        children: [
          { element: <StudentCareer />, index: true },
          { path: 'new', element: < StudentCareer /> },
          { path: 'InstituteNew', element: < InstituteCreateView /> },
          { path: ':id/edit/:studentCareerOption', element: < InstituteEditView /> },
          { path: 'InstituteList', element: < InstituteListView /> },
          { path: 'interestedStudentList', element: < InterestedStudentListView /> },
          { path: ':id/schoolDetails', element: < InstituteDetailsView /> },
          { path: ':id/collegeDetails', element: < CollegeDetailsView /> },
          { path: ':id/cochingCenterDetails', element: < CoachingCenterDetailsView /> },
          { path: ':id/appointmentDetails', element: < AppointmentDetailsView /> },
          { path: ':instituteId/InstituteAppointment', element: < InstituteBookingCreateView /> },
          { path: ':id/edit', element: < InstituteBookingEditView /> },
          { path: ':id/appointdetails', element: < InstituteAppointmentDetails /> },
          { path: 'InstituteDetailsNew', element: < InstitutionDetailsCreateView /> },


        ]
      },

      {
        path: 'FarmerService',
        children: [
          { element: <FarmerService />, index: true },
          { path: 'new', element: < FarmerService /> },
          { path: 'detail', element: < SellOrBuyProducts /> },
          {
            path: 'Registration',
            children: [
              { element: <FarmerRegListPage />, index: true },
              { path: 'list', element: <FarmerRegListPage /> },
              { path: 'interestedFarmerslist', element: <InterestedFarmerRegListPage /> },
              { path: 'appointmentList', element: <FarmerAppointmentListPage /> },
              { path: 'new', element: <FarmerRegCreatePage /> },
              { path: ':id/tractor', element: <FarmerTractorDetailsPage /> },
              { path: ':id/combine_harvester', element: <FarmerCombineDetailsPage /> },
              { path: ':id/cultivation_tool', element: <FarmerCultivationDetailsPage /> },
              { path: ':id/irrigation_tool', element: <FarmerIrrigationDetailsPage /> },
              { path: ':id/modern_agriculture_tool', element: <FarmerModernAgriDetailsPage /> },
              { path: ':id/edit', element: <FarmerRegEditPage /> },
              { path: ':sellerId/appointment', element: <FarmerAppointmentCreatePage /> },
              { path: ':id/appointmentedit', element: <FarmerAppointmentEditePage /> },
              { path: ':id/combine_harvester', element: <FarmerCombineDetailsPage /> },
              { path: ':id/appointment_Details', element: <FarmerAppointmentDetailsPage /> },

            ]
          },

          {
            path: 'Cattle',
            children: [
              { element: <CattleListPage />, index: true },
              { path: 'list', element: <CattleListPage /> },
              { path: 'new', element: <CattleCreatePage /> },
              { path: ':id/:cattleId/edit', element: <CattleEditPage /> },
              { path: ':id/:cattleTypeId/detail', element: <CattleDetailsPage /> },

            ]
          },

          {
            path: 'Equipment',
            children: [
              { element: <FarmerDetailsListPage />, index: true },
              { path: 'list', element: <FarmerDetailsListPage /> },
              { path: 'new', element: <FarmerDetailsCreatePage /> },
              { path: ':id/:equipmentDetailsId/edit', element: <FarmerDetailsEditPage /> },
              { path: ':id/detail', element: <FarmerDetailsPage /> },

            ]
          }
        ]
      },



      {
        path: 'GovtService',
        children: [
          { element: <GovtService />, index: true },
          { path: 'new', element: < GovtService /> },
          { path: 'list', element: <GovtServiceListPage /> },
          { path: ':id', element: <GovtServiceDetailsPage /> },


        ]
      },
      {
        path: 'LabourService',
        children: [
          { element: <LabourService />, index: true },
          { path: 'new', element: < LabourService /> },
        ]
      },

      {
        path: 'GovtScheme',
        children: [
          { element: <GovtScheme />, index: true },
          { path: 'new', element: < GovtScheme /> },
          { path: ':name', element: < StartupIndia /> },
        ]
      },
      {
        path: 'WomanEmpourment',
        children: [
          { element: <WomanEmpourment />, index: true },
          { path: 'new', element: < WomanEmpourment /> },
        ]
      },
      // {
      //   path: 'BuisnessRodmapCareer',
      //   children: [
      //     { element: <WomanEmpourment/>, index: true },
      //     { path: 'new', element: < WomanEmpourment/> },
      //   ]
      // },


      {
        path: 'BussinessRoadmap',
        children: [
          { element: <BussinessRoadmap />, index: true },
          { path: 'new', element: < BussinessRoadmap /> },
          { path: 'ConsultantNewForm', element: < ConsultantNewForm /> },
        ]
      },

      {
        path: 'FeedbackPage',
        children: [
          { element: <FeedbackPage />, index: true },
          { path: 'new', element: < FeedbackPage /> },
          { path: 'list', element: <FeedbackListPage /> },
          { path: ':id', element: <FeedbackDetailsPage /> },

        ]
      },

      // added by Pankaj Election emplate Library
      {
        path: 'template',
        children: [
          { element: <ElectionTemplateList />, index: true },
          { path: 'new', element: < ElectionTemplateCreate /> },
          { path: 'list', element: <ElectionTemplateList /> },

        ]
      },

      // added by Pankaj  Template Library
      {
        path: 'template-library',
        children: [
          { element: <TemplateLibraryList />, index: true },
          { path: 'project', element: < TemplateLibraryProject /> },
          { path: 'list', element: <TemplateLibraryList /> },

        ]
      },
      {
        path: 'analysis',
        children: [
          { element: <AnalysisList />, index: true },
          // { path: 'list', element: <AnalysisList /> },
          { path: ':id', element: <AnalysisList /> },

        ]
      },
      {
        path: 'productManagement',
        children: [
          { element: <ProductManagementList />, index: true },
          { path: 'new', element: <ProductManagementNew /> },
          { path: 'list', element: <ProductManagementList /> },
          { path: ':id/edit', element: <ProductManagementEdit /> },

        ]
      },
      {
        path: 'productRoleMapping',
        children: [
          { element: <ProductManagementMappingList />, index: true },
          { path: 'new', element: <ProductManagementMappingNew /> },
          { path: 'list', element: <ProductManagementMappingList /> },
        ]
      },
      {
        path: 'emergencyServices',
        children: [
          { element: <EmergencyListPage />, index: true },
          { path: 'list', element: <EmergencyListPage /> },
          { path: 'new', element: <EmergencyCreatePage /> },
          { path: ':id/edit', element: <EmergencyEditPage /> },
          { path: ':id/detail', element: <EmergencyDetailsPage /> }
        ]
      },
      {
        path: 'OverviewGalleryView',
        children: [
          { element: <OverviewGalleryView />, index: true },
          { path: 'list', element: <OverviewGalleryView /> },
        ]
      },
      {
        path: 'requestLicense',
        children: [
          { element: <RequestLicenseList />, index: true },
          {
            path: "doctor",
            children: [
              { element: <RequestLicenseList /> },
              { path: ':id', element: <RequestLicenseDetails /> },
            ]
          },
          {
            path: "employer",
            children: [
              { element: <RequestLicenseList /> },
              { path: ':id', element: <EmployerLicenseDetails /> },
            ]
          },
          {
            path: "businessman",
            children: [
              { element: <RequestLicenseList /> },
              { path: ':id', element: <BusinessmanLicenseDetails /> },
            ]
          },
          {
            path: "InstituteOwner",
            children: [
              { element: <RequestLicenseList /> },
              { path: ':id', element: <InstituteOwnerLicenseDetails /> },
            ]
          },
          {
            path: "SellerOwner",
            children: [
              { element: <RequestLicenseList /> },
              { path: ':id', element: <SellerOwnerLicenseDetails /> },
            ]
          },
          {
            path: "Driver",
            children: [
              { element: <RequestLicenseList /> },
              { path: ':id', element: <DriverLicenseDetails /> },
            ]
          },
          {
            path: "ServiceProvider",
            children: [
              { element: <RequestLicenseList /> },
              { path: ':id', element: <ServiceProviderLicenseDetails /> },
            ]
          },
        ]
      },
      {
        path: 'productRoleMapping',
        children: [
          { element: <ProductManagementMappingList />, index: true },
          { path: 'new', element: <ProductManagementMappingNew /> },
          { path: 'list', element: <ProductManagementMappingList /> },
        ]
      },
      {
        path: 'OverviewGalleryView',
        children: [
          { element: <OverviewGalleryView />, index: true },
          { path: 'list', element: <OverviewGalleryView /> },
        ]
      },

      {
        path: 'mail_form',
        children: [
          { element: <ViaMail />, index: true },
          { path: 'new', element: <ViaMail /> },
        ]
      },
      {
        path: 'STDUserProfile',
        children: [
          { element: <STDUserProfile />, index: true },
          { path: 'new', element: <STDUserProfile /> },
          { path: '10th', element: <STD10th /> },
          { path: '12th', element: <STD12th /> },
          { path: 'college', element: <STDCollege /> },
        ],
      },
      {
        path: 'FarmerProfile',
        children: [
          { element: <FarmerProfile />, index: true },
          { path: 'new', element: <FarmerProfile /> },
          { path: 'farmerSeason', element: <FarmerSeason /> },
          { path: 'farmerSoil', element: <FarmerSoil /> },
          { path: 'crop', element: <FarmerCrop /> },
        ],
      },
      {
        path: 'LMSUserProfile',
        children: [
          { element: <LMSUserProfile />, index: true },
          { path: 'new', element: <LMSUserProfile /> },
        ],
      },
      // Lawyer  Management Deepak
      {
        path: 'lawyer',
        children: [
          { element: <LawyerListPage />, index: true },
          { path: 'list', element: <LawyerListPage /> },
          { path: 'browse', element: <LawyerBrowsePage /> },
          { path: 'filter', element: <LawyerFilterListPage /> },
          { path: 'create', element: <LawyerCreatePage /> },
          { path: ':id', element: <LawyerDetailsPage /> },
          { path: ':id/edit', element: <LawyerEditPage /> },
          { path: 'my_details', element: <LawyerDetailsByIdPage /> },
        ],
      },
      // LMSvendor by Deepak
      {
        path: 'lms_vendor',
        children: [
          { element: <LMSvendorListPage />, index: true },
          { path: 'list', element: <LMSvendorListPage /> },
          { path: 'browse', element: <VendorBrowsePage /> },
          { path: 'create', element: <LMSvendorCreatePage /> },
          { path: ':id', element: <LMSvendorDetailsPage /> },
          { path: ':id/edit', element: <LMSvendorEditPage /> },
          { path: 'my_details', element: <VendorDetailsByIdPage /> },
          { path: 'filter', element: <LMSvendorFilterListPage /> }
        ],
      },
      {
        path: 'Lms_client',
        children: [
          { element: <LMSClientListPage />, index: true },
          { path: 'list', element: <LMSClientListPage /> },
          { path: 'create', element: <LMSClientCreatePage /> },
          { path: ':id', element: <LMSClientDetailsPage /> },
          { path: ':id/edit', element: <LMSClientEditPage /> },
        ],
      },
      {
        path: 'chartered_accountant',
        children: [
          { element: <CharteredAccountantListPage />, index: true },
          { path: 'list', element: <CharteredAccountantListPage /> },
          { path: 'browse', element: <CharteredAccountantBrowsePage /> },
          { path: 'create', element: <CharteredAccountantCreatePage /> },
          { path: ':id', element: <CharteredAccountantDetailsPage /> },
          { path: ':id/edit', element: <CharteredAccountantEditPage /> },
          { path: 'my_details', element: <CharteredAccountantDetailsByIdPage /> },
          { path: 'filter', element: <CharteredAccountantFilterListPage /> },
        ],
      },
      {
        path: 'LMS_contract',
        children: [
          { element: <ContractListPage />, index: true },
          { path: 'list', element: <ContractListPage /> },
          { path: 'create', element: <ContractCreatePage /> },
          { path: ':id', element: <ContractDetailsPage /> },
          { path: ':id/edit', element: <ContractEditPage /> },
        ],
      },
      {
        path: 'LMS_case',
        children: [
          { element: <CaseListPage />, index: true },
          { path: 'list', element: <CaseListPage /> },
          { path: 'lawyer_list', element: <CaseLawyerListPage /> },
          { path: 'create', element: <CaseCreatePage /> },
          { path: ':id', element: <CaseDetailsPage /> },
          { path: ':id/edit', element: <CaseEditPage /> },
        ],
      },
      {
        path: 'LMS_caseDetails',
        children: [
          { element: <CaseDetailsListPage />, index: true },
          { path: 'list', element: <CaseDetailsListPage /> },
          { path: 'create', element: <CaseDetailsCreatePage /> },
          { path: ':id', element: <CaseDetailsDetailsPage /> },
          { path: ':id/edit', element: <CaseDetailsEditPage /> },
        ],
      },
      {
        path: 'LMS_service',
        children: [
          { element: <ServiceListPage />, index: true },
          { path: 'list', element: <ServiceListPage /> },
          { path: 'create', element: <ServiceCreatePage /> },
          { path: ':id', element: <ServiceDetailsPage /> },
          { path: ':id/edit', element: <ServiceEditPage /> },
        ],
      },
      {
        path: 'LMS_sub_service',
        children: [
          { element: <SubServiceListPage />, index: true },
          { path: 'list', element: <SubServiceListPage /> },
          { path: 'create', element: <SubServiceCreatePage /> },
          { path: ':id', element: <SubServiceDetailsPage /> },
          { path: ':id/edit', element: <SubServiceEditPage /> },
        ],
      },
      {
        path: 'LMS_document',
        children: [
          { element: <LMSDocumentListPage />, index: true },
          { path: 'list', element: <LMSDocumentListPage /> },
          { path: 'create', element: <LMSDocumentCreateOage /> },
          { path: ':id', element: <LMSDocumentDetailsPage /> },
          { path: ':id/edit', element: <LMSDocumentEditPage /> }
        ]
      },
      {
        path: 'LMS_cards',
        children: [
          { element: <LMScards />, index: true },
          { path: 'new', element: <LMScards /> }
        ]
      },
      {
        path: 'LMS_court',
        children: [
          { element: <LMSDocumentListPage />, index: true },
          { path: 'new', element: <CreateCourt /> }
        ]
      },
      {
        path: 'LMS_demo',
        children: [
          { element: <LMSDocumentListPage />, index: true },
          { path: 'new', element: <CreateDemo /> }
        ]
      }
    ],
  },
];
