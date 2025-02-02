import { useMemo } from 'react';

import { paths } from 'src/routes/paths';

import { useTranslate } from 'src/locales';
import { useAuthContext } from 'src/auth/hooks';
import { useGetRolesList } from 'src/api/userRole';

import SvgColor from 'src/components/svg-color';

// BOOK----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const ICONS = {
  userRoleManagement: icon('ic_userRoleManagement'),
  pollingManagement: icon('ic_pollingManagement'),
  partyManagement: icon('ic_partyManagement'),
  partyAllianceManagement: icon('ic_partyAllianceManagement'),
  modalManagement: icon('ic_modalManagement'),
  featureManagement: icon('ic_featureManagement'),
  electionManagement: icon('ic_electionManagement'),
  candidate: icon('ic_candidate'),
  voter: icon('ic_voter'),
  expense: icon('ic_expense'),
  booth: icon('ic_booth'),
  ward: icon('ic_ward'),
  user: icon('ic_user'),
  election: icon('ic_election'),
  chat: icon('ic_chat'),
  admincontact: icon('ic_admincontact'),
  adminchat: icon('ic_adminchat'),
  driver: icon('ic_driver'),
  vehicle: icon('ic_vehicle'),
  trip: icon('ic_trip'),
  sms: icon('ic_sms'),
  bulk: icon('ic_bulk'),
  subscription: icon('ic_subscription'),
  services: icon('ic_services'),
  subservices: icon('ic_subservices'),
  kanban: icon('ic_kanban'),
  addNewUser: icon('ic_addnewuser'),
  farmer: icon('ic_farmer'),
  careers: icon('ic_careers'),
  complaintForm: icon('ic_complaintform'),
  TourAndTravels: icon('ic_Travel'),
  students: icon('ic_student'),
  voterSlip: icon('ic_voterslip'),
  electionDetails: icon('ic_electionDetails'),
  womanEmpowerment: icon('ic_WomanEmpowerment'),
  ambulance: icon('ic_ambulance'),
  labourJob: icon('ic_labourJob'),
  govtService: icon('ic_GovernmentServices'),
  taxi: icon('ic_taxi'),
  AcceptRejectCase: icon('ic_AcceptRejectCase'),
  AllBookedCases: icon('ic_AllBookedCasesList'),
  YourDetails: icon('ic_YourDetails'),
  SeeAllFeature: icon('ic_SeeAllFetures'),
  LegalDocumentAssistant: icon('ic_LegalDocumentAssistant'),
  LMSAllList: icon('ic_LMSAllList'),
  LMSCasesList: icon('ic_LMSCasesList'),
  LMSClientDetails: icon('ic_LMSClientDetails'),
  LMSContractsList: icon('ic_LMSContractsList'),
  LMsDocument: icon('ic_LMsDocument'),
  SeeAllFuture: icon('ic_SeeAllFuture'),
  SelectCA: icon('ic_SelectCA'),
  SelectLawyer: icon('ic_SelectLawyer'),
  CreateLMSClientCompany: icon('ic_CreateLMSClientCompany'),
  Institution: icon('ic_institution'),
  InstitutionList: icon('ic_institutionList'),
  SeeAllFeatures: icon('ic_seeAllFeatures'),
  HealthService: icon('ic_healthService'),
  EmergencyService: icon('ic_emergencyService'),
  ChatWithFriends: icon('ic_chatWithFriends'),
  AddNewUser: icon('ic_addNewUserr'),
  ApplyForIndustry: icon('ic_applyForIndustry'),
  ApplyForJob: icon('ic_applyForJob'),
  AddEquipment: icon('ic_addEquipment'),
  EquipmentList: icon('ic_equipmentList'),
  InterestedFarmertList: icon('ic_InterestedFarmers'),
  AppointmentList: icon('ic_appointmentList')
};

// ------------------------------------------------------------------

export function useNavData() {
  const { user } = useAuthContext();
  const { t } = useTranslate();

  const { users: roleList } = useGetRolesList(user?.accessToken);

  const roleListArr = roleList?.data || [];

  const getUserRole = (id) => {
    const roleId = roleListArr?.find((item) => item.userRoleId === id);
    return roleId ? roleId?.userRoleType : 'Role not found';
  };

  const userRoleType = getUserRole(user?.userRoleId);

  const data = useMemo(() => {
    const sections = [];
    switch (userRoleType) {
      case 'Admin':
        sections.push(
          {
            subheader: t('ELECTION MANAGEMENT'),
            items: [
              {
                title: t('PARTY ALLIANCE MANAGEMENT'),
                icon: ICONS.partyAllianceManagement,
                path: paths.dashboard.party_alliance.root,
              },
              {
                title: t('PARTY MANAGEMENT'),
                icon: ICONS.partyManagement,
                path: paths.dashboard.party.root,
              },
              {
                title: t('ELECTION MANAGEMENT'),
                path: paths.dashboard.electionmanagement.root,
                icon: ICONS.electionManagement,
                children: [
                  {
                    title: t('ELECTION LIST DETAILS'),
                    path: paths.dashboard.electionmanagement.root,
                  },
                  { title: t('WARD LIST DETAILS'), path: paths.dashboard.wardmanagement.root },
                  { title: t('CANDIDATE LIST DETAILS'), path: paths.dashboard.candidate.list },
                  { title: t('BOOTH LIST DETAILS'), path: paths.dashboard.boothmanagement.list },
                  { title: t('POLLING LIST DETAILS'), path: paths.dashboard.poolmanagement.list },
                  { title: t('VOTERS LIST DETAILS'), path: paths.dashboard.voter.list },
                  {
                    title: t('VOTER PREDICTION DETAILS'),
                    path: paths.dashboard.vote_prediction.list,
                  },

                  {
                    title: t('SURVEY MANAGEMENT '),
                    path: paths.dashboard.fill_survey.root,
                    // icon: ICONS.userRoleManagement,
                    children: [
                      // { title: t('Available Survey'), path: paths.dashboard.fill_survey.new },
                      // { title: t('Submitted Survey'), path: paths.dashboard.fill_survey.root },
                      { title: t('SURVEY LIST DETAILS'), path: paths.dashboard.survey.root },
                      {
                        title: t('SURVEY RESPONSE LIST DETAILS'),
                        path: paths.dashboard.survey.responseList,
                      },
                    ],
                  },
                ],
              },

              {
                title: t('SOCIAL MEDIA MANAGEMENT'),
                path: paths.dashboard.templateManagement.root,
                icon: ICONS.electionManagement,
                children: [
                  {
                    title: t('TEMPLATE LIST DETAILS'),
                    path: paths.dashboard.templateManagement.new,
                  },
                ],
              },
              // {
              //   title: t('Election Management'),
              //   path: paths.dashboard.electionmanagement.root,
              //   icon: ICONS.electionManagement,
              //   children: [
              //     { title: t('Add Election'), path: paths.dashboard.electionmanagement.new },
              //     { title: t('Election List'), path: paths.dashboard.electionmanagement.root },
              //   ],
              // },
              // {
              //   title: t('Party Alliance Management'),
              //   path: paths.dashboard.party_alliance.root,
              //   icon: ICONS.partyAllianceManagement,
              //   children: [
              //     { title: t('Add Party Alliance'), path: paths.dashboard.party_alliance.new },
              //     { title: t('Party Alliance List'), path: paths.dashboard.party_alliance.root },
              //   ],
              // },
              // {
              //   title: t('Party Management'),
              //   path: paths.dashboard.party.root,
              //   icon: ICONS.partyManagement,
              //   children: [
              //     { title: t('Add Party'), path: paths.dashboard.party.new },
              //     { title: t('Party List'), path: paths.dashboard.party.root },
              //   ],
              // },

              // {
              //   title: t('Ward Management'),
              //   path: paths.dashboard.wardmanagement.root,
              //   icon: ICONS.ward,
              //   children: [
              //     { title: t('Add Ward'), path: paths.dashboard.wardmanagement.new },
              //     { title: t('Ward List'), path: paths.dashboard.wardmanagement.root },
              //   ],
              // },
              // {
              //   title: t('Candidate Management'),
              //   path: paths.dashboard.candidate.root,
              //   icon: ICONS.candidate,
              //   children: [
              //     { title: t('Add Candidate'), path: paths.dashboard.candidate.new },
              //     { title: t('Candidate List'), path: paths.dashboard.candidate.root },
              //     // { title: t('Candidate Details'), path: paths.dashboard.candidate.demo.details },
              //   ],
              // },
              // {
              //   title: t('Booth Management'),
              //   path: paths.dashboard.boothmanagement.root,
              //   icon: ICONS.booth,
              //   children: [
              //     { title: t('Add Booth'), path: paths.dashboard.boothmanagement.new },
              //     { title: t('Booth List'), path: paths.dashboard.boothmanagement.root },
              //   ],
              // },
              // {
              //   title: t('Polling Management'),
              //   path: paths.dashboard.poolmanagement.root,
              //   icon: ICONS.pollingManagement,
              //   children: [
              //     { title: t('Add Poll'), path: paths.dashboard.poolmanagement.new },
              //     {
              //       title: t('Poll List'),
              //       path: paths.dashboard.poolmanagement.list,
              //     },
              //   ],
              // },
              // {
              //   title: t('Voter Management'),
              //   path: paths.dashboard.voter.root,
              //   icon: ICONS.user,
              //   children: [
              //     { title: t('Add Voter'), path: paths.dashboard.voter.new },
              //     {
              //       title: t('Voters List'),
              //       path: paths.dashboard.voter.list,
              //     },
              //   ],
              // },

              // {
              //   title: t('Vote Prediction Management'),
              //   path: paths.dashboard.vote_prediction.list,
              //   icon: ICONS.voter,
              //   // children: [
              //   //   {
              //   //     title: t('Voter List'),
              //   //     path: paths.dashboard.vote_prediction.list,
              //   //   },
              //   // ],
              // },
            ],
          },
          {
            subheader: t('TRANSPORT MANAGEMENT'),
            items: [
              // {
              //   title: t('Transport Management'),
              //   path: paths.dashboard.driver.root,
              //   icon: ICONS.driver,
              //   children: [
              //     { title: t('Add Driver'), path: paths.dashboard.driver.new },
              //     { title: t('Driver List'), path: paths.dashboard.driver.root },
              //   ],
              // },
              // {
              //   title: t('Vehicle Management'),
              //   path: paths.dashboard.vehicle.root,
              //   icon: ICONS.vehicle,
              //   children: [
              //     { title: t('Add Vehicle'), path: paths.dashboard.vehicle.new },
              //     { title: t('Vehicle List'), path: paths.dashboard.vehicle.root },
              //   ],
              // },
              // {
              //   title: t('Trip Management'),
              //   path: paths.dashboard.trip.root,
              //   icon: ICONS.trip,
              //   children: [
              //     // { title: t('Add Trip'), path: paths.dashboard.trip.new },
              //     { title: t('Requested Trip List'), path: paths.dashboard.trip.requestedList },
              //     { title: t('Managed Trip List'), path: paths.dashboard.trip.managedList },
              //     // { title: t('Ambulance Trip List'), path: paths.dashboard.trip.ambulanceList },
              //   ],
              // },
              // {
              //   title: t('Ambulance Management'),
              //   path: paths.dashboard.callAmbulance.root,
              //   icon: ICONS.ambulance,
              //   children: [
              //     // { title: t('Add Trip'), path: paths.dashboard.trip.new },
              //     {
              //       title: t('Requested Trip List'),
              //       path: paths.dashboard.callAmbulance.requestedList,
              //     },
              //     {
              //       title: t('Managed Trip List'),
              //       path: paths.dashboard.callAmbulance.managedList,
              //     },
              //     // { title: t('Ambulance Trip List'), path: paths.dashboard.trip.ambulanceList },
              //   ],
              // },
              {
                title: t('TRANSPORT MANAGEMENT'),
                path: paths.dashboard.callAmbulance.root,
                icon: ICONS.ambulance,
                children: [
                  { title: t('BOOK AMBULANCE'), path: paths.dashboard.ambulancetrip.new },
                  { title: t('DRIVER LIST DETAILS'), path: paths.dashboard.driver.root },
                  { title: t('VEHICLE BOOKING OPTIONS'), path: paths.dashboard.vehicleOption.root },
                  { title: t('VEHICLE LIST DETAILS'), path: paths.dashboard.vehicle.root },
                  {
                    title: t('TRIP MANAGEMENT'),
                    path: paths.dashboard.trip.root,
                    // icon: ICONS.trip,
                    children: [
                      // { title: t('Add Trip'), path: paths.dashboard.trip.new },
                      {
                        title: t('REQUESTED TRIP LIST DETAILS'),
                        path: paths.dashboard.trip.requestedList,
                      },
                      {
                        title: t('MANAGED TRIP LIST DETAILS'),
                        path: paths.dashboard.trip.managedList,
                      },
                      // { title: t('Ambulance Trip List'), path: paths.dashboard.trip.ambulanceList },
                    ],
                  },
                  {
                    title: t('AMBULANCE MANAGEMENT'),
                    path: paths.dashboard.callAmbulance.root,
                    // icon: ICONS.ambulance,
                    children: [
                      {
                        title: t('REQUESTED TRIP LIST DETAILS'),
                        path: paths.dashboard.ambulancetrip.requestedList,
                      },
                      {
                        title: t('MANAGED TRIP LIST DETAILS'),
                        path: paths.dashboard.callAmbulance.managedList,
                      },
                    ],
                  },
                  // {
                  //   title: t('Driver Management'),
                  //   path: paths.dashboard.driver.root,
                  //   icon: ICONS.driver,
                  //   children: [
                  //     { title: t('Add Driver'), path: paths.dashboard.driver.new },
                  //     { title: t('Driver List'), path: paths.dashboard.driver.root },
                  //   ],
                  // },
                  // {
                  //   title: t('Vehicle Management'),
                  //   path: paths.dashboard.vehicle.root,
                  //   icon: ICONS.vehicle,
                  //   children: [
                  //     { title: t('Add Vehicle'), path: paths.dashboard.vehicle.new },
                  //     { title: t('Vehicle List'), path: paths.dashboard.vehicle.root },
                  //   ],
                  // },
                  // {
                  //   title: t('Trip Management'),
                  //   path: paths.dashboard.trip.root,
                  //   icon: ICONS.trip,
                  //   children: [
                  //     // { title: t('Add Trip'), path: paths.dashboard.trip.new },
                  //     { title: t('Requested Trip List'), path: paths.dashboard.trip.requestedList },
                  //     { title: t('Managed Trip List'), path: paths.dashboard.trip.managedList },
                  //     // { title: t('Ambulance Trip List'), path: paths.dashboard.trip.ambulanceList },
                  //   ],
                  // },
                  // {
                  //   title: t('Ambulance Management'),
                  //   path: paths.dashboard.callAmbulance.root,
                  //   icon: ICONS.ambulance,
                  //   children: [
                  //     // { title: t('Add Trip'), path: paths.dashboard.trip.new },
                  //     {
                  //       title: t('Requested Trip List'),
                  //       path: paths.dashboard.callAmbulance.requestedList,
                  //     },
                  //     {
                  //       title: t('Managed Trip List'),
                  //       path: paths.dashboard.callAmbulance.managedList,
                  //     },
                  //     // { title: t('Ambulance Trip List'), path: paths.dashboard.trip.ambulanceList },
                ],
              },

              // Tansport Managment wardleader By Ankit
              // {
              //   title: t('Ward Volunteer'),
              //   path: paths.dashboard.wardvol.root,
              //   icon: ICONS.voter,
              //   children: [
              //     { title: t('Add Trip '), path: paths.dashboard.wardvol.new },
              //     // { title: t('Ward Volunteer List'), path: paths.dashboard.wardvol.list },
              //   ],
              // },
              // // Tansport Managment wardleader By Ankit
              // {
              //   title: t('Ward Leader'),
              //   path: paths.dashboard.wardleader.root,
              //   icon: ICONS.voter,
              //   children: [
              //     { title: t('Assign Trip'), path: paths.dashboard.wardleader.new },
              //     { title: t('Assigned Trip List'), path: paths.dashboard.wardleader.list },
              //   ],
              // },

              // // Tansport Managment tripdriver By Ankit
              // {
              //   title: t('Driver Trips'),
              //   path: paths.dashboard.tripdriver.root,
              //   icon: ICONS.trip,
              //   children: [
              //     { title: t('Add Driver Trip'), path: paths.dashboard.tripdriver.new },
              //     { title: t('Trips List'), path: paths.dashboard.tripdriver.list },
              //   ],
              // },
            ],
          },


          {
            subheader: t('LEGAL MANAGEMENT SYSTEM'),
            items: [
              {
                title: t('LEGAL MANAGEMENT SYSTEM'),
                path: paths.dashboard.callAmbulance.root,
                icon: ICONS.CreateLMSClientCompany,
                children: [

                  {
                    title: t('CREATE LMS CLIENT COMPANY'),
                    path: paths.dashboard.Lms_client.create,
                    icon: ICONS.LMSClientDetails,
                  },
                  {
                    title: t('LMS CASES LIST'),
                    path: paths.dashboard.LMS_case.list,
                    icon: ICONS.LMSCasesList,
                  },
                  // {
                  //   title: t('LMS CLIENT DETAILS'),
                  //   path: paths.dashboard.LMS_caseDetails.list,
                  //   icon: ICONS.complaintForm,
                  // },
                  {
                    title: t('LMS CONTRACTS LIST'),
                    path: paths.dashboard.LMS_contract.list,
                    icon: ICONS.LMSContractsList,
                  },
                  // {
                  //   title: t('SELECT LAWYER'),
                  //   path: paths.dashboard.lawyer.browse,
                  //   icon: ICONS.complaintForm,
                  // },
                  // {
                  //   title: t('SELECT CA'),
                  //   path: paths.dashboard.chartered_accountant.browse,
                  //   icon: ICONS.complaintForm,
                  // },
                  // {
                  //   title: t('LEGAL DOCUMENT ASSISTANT'),
                  //   path: paths.dashboard.lms_vendor.browse,
                  //   icon: ICONS.complaintForm,
                  // },
                  {
                    title: t('LMS ALL LIST'),
                    path: paths.dashboard.driver.root,
                    icon: ICONS.LMSAllList,
                    children: [
                      {
                        title: t('LAWYERS LIST'),
                        path: paths.dashboard.lawyer.list,
                        // icon: ICONS.featureManagement,
                      },
                      {
                        title: t('CA LIST'),
                        path: paths.dashboard.chartered_accountant.list,
                        // icon: ICONS.featureManagement,
                      },
                      {
                        title: t('VENDORS LIST'),
                        path: paths.dashboard.lms_vendor.list,
                        // icon: ICONS.featureManagement,
                      },

                      {
                        title: t('LMS SERVICE LIST'),
                        path: paths.dashboard.LMS_service.list,
                        // icon: ICONS.featureManagement,
                      },
                      {
                        title: t('LMS SUB SERVICE LIST'),
                        path: paths.dashboard.LMS_sub_service.list,
                        // icon: ICONS.featureManagement,
                      },
                      {
                        title: t('CLIENT COMPANY LIST'),
                        path: paths.dashboard.Lms_client.root,
                        // icon: ICONS.complaintForm,
                      },
                    ],
                  },

                  {
                    title: t('LMS DOCUMENTS'),
                    path: paths.dashboard.LMS_document.root,
                    icon: ICONS.LMsDocument,
                    children: [
                      // {
                      //   title: t('UPLOAD DOCUMENT'),
                      //   path: paths.dashboard.LMS_document.create,
                      //   // icon: ICONS.featureManagement,
                      // },
                      {
                        title: t('UPLOADED DOCUMENT'),
                        path: paths.dashboard.LMS_document.list,
                        // icon: ICONS.featureManagement,
                      },
                    ],
                  },
                  // {
                  //   title: t('Driver Management'),
                  //   path: paths.dashboard.driver.root,
                  //   icon: ICONS.driver,
                  //   children: [
                  //     { title: t('Add Driver'), path: paths.dashboard.driver.new },
                  //     { title: t('Driver List'), path: paths.dashboard.driver.root },
                  //   ],
                  // },
                  // {
                  //   title: t('Vehicle Management'),
                  //   path: paths.dashboard.vehicle.root,
                  //   icon: ICONS.vehicle,
                  //   children: [
                  //     { title: t('Add Vehicle'), path: paths.dashboard.vehicle.new },
                  //     { title: t('Vehicle List'), path: paths.dashboard.vehicle.root },
                  //   ],
                  // },
                  // {
                  //   title: t('Trip Management'),
                  //   path: paths.dashboard.trip.root,
                  //   icon: ICONS.trip,
                  //   children: [
                  //     // { title: t('Add Trip'), path: paths.dashboard.trip.new },
                  //     { title: t('Requested Trip List'), path: paths.dashboard.trip.requestedList },
                  //     { title: t('Managed Trip List'), path: paths.dashboard.trip.managedList },
                  //     // { title: t('Ambulance Trip List'), path: paths.dashboard.trip.ambulanceList },
                  //   ],
                  // },
                  // {
                  //   title: t('Ambulance Management'),
                  //   path: paths.dashboard.callAmbulance.root,
                  //   icon: ICONS.ambulance,
                  //   children: [
                  //     // { title: t('Add Trip'), path: paths.dashboard.trip.new },
                  //     {
                  //       title: t('Requested Trip List'),
                  //       path: paths.dashboard.callAmbulance.requestedList,
                  //     },
                  //     {
                  //       title: t('Managed Trip List'),
                  //       path: paths.dashboard.callAmbulance.managedList,
                  //     },
                  //     // { title: t('Ambulance Trip List'), path: paths.dashboard.trip.ambulanceList },
                ],
              },

              // Tansport Managment wardleader By Ankit
              // {
              //   title: t('Ward Volunteer'),
              //   path: paths.dashboard.wardvol.root,
              //   icon: ICONS.voter,
              //   children: [
              //     { title: t('Add Trip '), path: paths.dashboard.wardvol.new },
              //     // { title: t('Ward Volunteer List'), path: paths.dashboard.wardvol.list },
              //   ],
              // },
              // // Tansport Managment wardleader By Ankit
              // {
              //   title: t('Ward Leader'),
              //   path: paths.dashboard.wardleader.root,
              //   icon: ICONS.voter,
              //   children: [
              //     { title: t('Assign Trip'), path: paths.dashboard.wardleader.new },
              //     { title: t('Assigned Trip List'), path: paths.dashboard.wardleader.list },
              //   ],
              // },

              // // Tansport Managment tripdriver By Ankit
              // {
              //   title: t('Driver Trips'),
              //   path: paths.dashboard.tripdriver.root,
              //   icon: ICONS.trip,
              //   children: [
              //     { title: t('Add Driver Trip'), path: paths.dashboard.tripdriver.new },
              //     { title: t('Trips List'), path: paths.dashboard.tripdriver.list },
              //   ],
              // },
            ],
          },

          {
            subheader: t('EXPENSES MANAGEMENT'),
            items: [
              {
                title: t('EXPENSE MANAGEMENT'),
                path: paths.dashboard.category.root,
                icon: ICONS.expense,
                children: [
                  { title: t('CATEGORY LIST DETAILS'), path: paths.dashboard.category.root },
                  { title: t('CLAIM LIST DETAILS'), path: paths.dashboard.claim.root },
                  // { title: t('INVOICE LIST DETAILS'), path: paths.dashboard.invoice.root },
                ],
              },
              // {
              //   title: t('Category Management'),
              //   path: paths.dashboard.category.root,
              //   icon: ICONS.expense,
              //   children: [
              //     { title: t('Add Category'), path: paths.dashboard.category.new },
              //     { title: t('Category List'), path: paths.dashboard.category.root },
              //   ],
              // },
              // {
              //   title: t('Claim Management'),
              //   path: paths.dashboard.claim.root,
              //   icon: ICONS.candidate,
              //   children: [
              //     { title: t('Add Claim'), path: paths.dashboard.claim.new },
              //     { title: t('Claim List'), path: paths.dashboard.claim.root },
              //   ],
              // },
              // {
              //   title: t('Invoice Management'),
              //   path: paths.dashboard.invoice.root,
              //   icon: ICONS.expense,
              //   children: [
              //     { title: t('Add Invoice'), path: paths.dashboard.invoice.new },
              //     { title: t('Invoice List'), path: paths.dashboard.invoice.root },
              //   ],
              // },
            ],
          },
          {
            subheader: t('USER MANAGEMENT'),
            items: [
              {
                title: t('USER MANAGEMENT'),
                path: paths.dashboard.userRoleManagement.root,
                icon: ICONS.userRoleManagement,
                children: [
                  {
                    title: t('USER ROLE LIST DETAILS'),
                    path: paths.dashboard.userRoleManagement.list,
                  },
                  {
                    title: t('USER LIST DETAILS'),
                    path: paths.dashboard.userProfileManagement.list,
                  },
                ],
              },
              // {
              //   title: t('User Role Management'),
              //   path: paths.dashboard.userRoleManagement.root,
              //   icon: ICONS.userRoleManagement,
              //   children: [
              //     { title: t('Add User Role'), path: paths.dashboard.userRoleManagement.new },
              //     { title: t('User Role List'), path: paths.dashboard.userRoleManagement.list },
              //   ],
              // },
              // {
              //   title: t('User Management'),
              //   path: paths.dashboard.userProfileManagement.root,
              //   icon: ICONS.user,
              //   children: [
              //     { title: t('Add User'), path: paths.dashboard.userProfileManagement.new },
              //     {
              //       title: t('User List'),
              //       path: paths.dashboard.userProfileManagement.list,
              //     },
              //   ],
              // },
              {
                title: t('SUPPORT TICKET LIST DETAILS'),
                path: paths.dashboard.sms.root,
                icon: ICONS.sms,
                // children: [
                //   { title: t('Add User Role'), path: paths.dashboard.userRoleManagement.new },
                //   { title: t('User Role List'), path: paths.dashboard.userRoleManagement.list },
                // ],
              },
            ],
          },

          {
            subheader: t('BLOG MANAGEMENT'),
            items: [
              {
                title: t('BLOG LIST DETAILS'),
                path: paths.dashboard.blog.root,
                icon: ICONS.election,
              },
              // {
              //   title: t('Blog Management'),
              //   path: paths.dashboard.blog.root,
              //   icon: ICONS.election,
              //   children: [
              //     { title: t('Add Blog'), path: paths.dashboard.blog.new },
              //     { title: t('Blog List'), path: paths.dashboard.blog.root },
              //   ],
              // },
              {
                title: t('PRODUCT MANAGEMENT'),
                path: paths.dashboard.product.root,
                icon: ICONS.election,
                children: [
                  {
                    title: t('PRODUCT LIST DETAILS'),
                    path: paths.dashboard.productManagement.list,
                  },
                  {
                    title: t('PRODUCT ROLE MAPPING LIST DETAILS'),
                    path: paths.dashboard.productRoleMapping.list,
                  },
                  { title: t('PRODUCT MODAL LIST DETAILS'), path: paths.dashboard.model.root },
                  { title: t('PRODUCT FEATURE LIST DETAILS'), path: paths.dashboard.work.root },
                  // { title: t('Product Service Version List Details'), path: paths.dashboard.serviceversion.list },
                  {
                    title: t('PRODUCT SUGGESTION BOX LIST DETAILS'),
                    path: paths.dashboard.FeedbackPage.list,
                  },
                  {
                    title: t('CONTACT DETAILS LIST'),
                    path: paths.dashboard.contact.root,
                    //  icon: ICONS.adminchat
                  },
                ],
              },

              {
                title: t(' EMERGENCY SERVICES'),
                path: paths.dashboard.emergencyServices.root,
                icon: ICONS.ambulance,
                children: [
                  {
                    title: t('EMERGENCY HELPLINE NUMBER'),
                    path: paths.dashboard.emergencyServices.root,
                    icon: ICONS.ambulance,
                  },

                  {
                    title: t('BOOK AMBULANCE '),
                    path: paths.dashboard.ambulancetrip.new,
                    icon: ICONS.ambulance,
                  },
                  {
                    title: t('AMBULANCE LIST'),
                    path: paths.dashboard.ambulancetrip.requestedList,
                    icon: ICONS.trip,
                  },
                  // {
                  //   title: t('EMERGENCY AMBULANCE SERVICES'),
                  //   path: paths.dashboard.ambulancetrip.cards,
                  //   icon: ICONS.ambulance,
                  // },
                ],
              },
              // {
              //   title: t('SERVICE VERSION LIST DETAILS'),
              //   path: paths.dashboard.candidate.root,
              //   icon: ICONS.adminchat,
              // },
              // {
              //   title: t('Product Management'),
              //   path: paths.dashboard.product.root,
              //   icon: ICONS.election,
              //   children: [
              //     { title: t('Product List'), path: paths.dashboard.product.new },
              //     { title: t('Product Role Mapping List'), path: paths.dashboard.product.root },
              //   ],
              // },
              // {
              //   title: t('Modal Management'),
              //   path: paths.dashboard.model.root,
              //   icon: ICONS.modalManagement,
              //   children: [
              //     { title: t('Add Modal'), path: paths.dashboard.model.new },
              //     { title: t('Modal List'), path: paths.dashboard.model.root },
              //   ],
              // },
              // {
              //   title: t('Feature Management'),
              //   path: paths.dashboard.work.root,
              //   icon: ICONS.featureManagement,
              //   children: [
              //     { title: t('Add Feature'), path: paths.dashboard.work.new },
              //     { title: t('Feature List'), path: paths.dashboard.work.root },
              //   ],
              // },
              // {
              //   title: t('Service Version Management'),
              //   path: paths.dashboard.serviceversion.root,
              //   icon: ICONS.subservices,
              //   children: [
              //     { title: t('Add Service Version'), path: paths.dashboard.serviceversion.new },
              //     {
              //       title: t('Service Version List'),
              //       path: paths.dashboard.serviceversion.list,
              //     },
              //   ],
              // },

              // {
              //   title: t('Suggestion Box'),
              //   path: paths.dashboard.FeedbackPage.root,
              //   icon: ICONS.complaintForm,
              //   children: [
              //     // {
              //     //   title: t('Add Suggestion List'),
              //     //   path: paths.dashboard.FeedbackPage.new,
              //     //   icon: ICONS.complaintForm,
              //     // },
              //     {
              //       title: t('Suggestion List'),
              //       path: paths.dashboard.FeedbackPage.list,
              //       icon: ICONS.complaintForm,
              //     },
              //   ],
              // },
            ],
          },
          // {
          //   subheader: t('Service Version Managment'),
          //   path: paths.dashboard.chat,
          //   icon: ICONS.adminchat,
          //   items: [
          //     // {
          //     //   title: t('Add Service Version'),
          //     //   path: paths.dashboard.candidate.new,
          //     //   icon: ICONS.adminchat,
          //     // },
          //     {
          //       title: t('Service Version List'),
          //       path: paths.dashboard.candidate.root,
          //       icon: ICONS.adminchat,
          //     },
          //   ],
          // },
          // {
          //   // Contact Details Managment By Saurabh
          //   subheader: t('Contact Details Managment'),
          //   path: paths.dashboard.contact,
          //   icon: ICONS.adminchat,
          //   items: [
          //     {
          //       title: t('Contact Details List'),
          //       path: paths.dashboard.contact.root,
          //       icon: ICONS.adminchat,
          //     },
          //   ],
          // },
          {
            subheader: t('LABOUR JOB PORTAL'),
            path: paths.dashboard.labour_job_portal.root,
            icon: ICONS.labourJob,
            items: [
              {
                title: t('LABOUR JOB PORTAL'),
                path: paths.dashboard.labour_job_portal.list,
                icon: ICONS.labourJob,
              },
            ],
          },
          // {
          //   subheader: t('ADD NEW CARD'),
          //   path: paths.dashboard.card.create,
          //   icon: ICONS.labourJob,
          //   items: [
          //     {
          //       title: t('ADD NEW CARD'),
          //       path:  paths.dashboard.card.create,
          //       icon: ICONS.labourJob,
          //     },
          //   ],
          // },
          {
            // Project Management
            subheader: t('PROJECT MANAGEMENT'),
            path: paths.dashboard.project.list,
            icon: ICONS.kanban,
            items: [
              {
                title: t('PROJECT MANAGEMENT'),
                path: paths.dashboard.project.list,
                icon: ICONS.kanban,
              },
            ],
          },
          {
            subheader: t('REQUEST LICENSE ACCEPTANCE'),
            path: paths.dashboard.request_license_acceptence.root,
            icon: ICONS.adminchat,
            items: [
              {
                title: t('REQUEST LICENSE ACCEPTANCE'),
                path: paths.dashboard.request_license_acceptence.root,
                icon: ICONS.adminchat,
              },
            ],
          },

          {
            subheader: t("CHAT WITH FRIEND"),
            path: paths.dashboard.chat,
            icon: ICONS.adminchat,
            items: [
              { title: t("CHAT WITH FRIEND"), path: paths.dashboard.chat, icon: ICONS.adminchat },
            ],
          }
          // {
          //   // Project Management Deepak
          //   subheader: t('Project Progress'),
          //   path: paths.dashboard.user_project.list,
          //   icon: ICONS.kanban,
          //   items: [
          //     {
          //       title: t('Project Progress'),
          //       path: paths.dashboard.user_project.list,
          //       icon: ICONS.kanban,
          //     },
          //   ],
          // },

          // {
          //   subheader: t('Survey Form  '),
          //   items: [
          //     {
          //       title: t('Survey Form '),
          //       path: paths.dashboard.fill_survey.root,
          //       icon: ICONS.userRoleManagement,
          //       children: [
          //         { title: t('Available Survey'), path: paths.dashboard.fill_survey.new },
          //         // { title: t('Submitted Survey'), path: paths.dashboard.fill_survey.root },
          //       ],
          //     },
          //   ],
          // }

          // blog management ends
        );
        break;
      case 'Candidate':
        sections.push({
          subheader: t('ELECTION MANAGEMENT'),
          items: [
            // {
            //   title: t('BOOK AMBULANCE '),
            //   path: paths.dashboard.ambulancetrip.root,
            //   icon: ICONS.ambulance,
            //   children: [{ title: t('ADD TRIP '), path: paths.dashboard.ambulancetrip.new }],
            // },
            {
              title: t('ELECTION MANAGEMENT'),
              path: paths.dashboard.electionmanagement.root,
              icon: ICONS.election,
              children: [
                {
                  title: t('WARD MANAGEMENT'),
                  path: paths.dashboard.wardmanagement.root,
                  icon: ICONS.ward,
                  // children: [
                  //   { title: t('Add Ward'), path: paths.dashboard.wardmanagement.new },
                  //   { title: t('Ward List'), path: paths.dashboard.wardmanagement.root },
                  // ],
                },

                {
                  title: t('BOOTH MANAGEMENT'),
                  path: paths.dashboard.boothmanagement.root,
                  icon: ICONS.booth,
                  // children: [
                  //   { title: t('Add Booth'), path: paths.dashboard.boothmanagement.new },
                  //   { title: t('Booth List'), path: paths.dashboard.boothmanagement.root },
                  // ],
                },

                {
                  title: t('POLLING MANAGEMENT'),
                  path: paths.dashboard.poolmanagement.list,
                  icon: ICONS.user,
                  // children: [
                  //   { title: t('Add Poll'), path: paths.dashboard.poolmanagement.new },
                  //   {
                  //     title: t('Poll List'),
                  //     path: paths.dashboard.poolmanagement.list,
                  //   },
                  // ],
                },

                {
                  title: t('VOTER MIGRATION'),
                  path: paths.dashboard.voter.list,
                  icon: ICONS.voter,

                  children: [
                    //   { title: t('Add Voter'), path: paths.dashboard.voter.new },
                    //   {
                    //     title: t('Vote Prediction'),
                    //     path: paths.dashboard.vote_prediction.list,
                    //   },
                    {
                      title: t('VOTER LIST'),
                      path: paths.dashboard.voter.list,
                      icon: ICONS.voter,
                      // children: [{ title: t('ALL TEMPLATES'), path: paths.dashboard.templateLibrary.root }],
                    },
                    {
                      title: t('TEMPLATE LIBRARY'),
                      path: paths.dashboard.templateLibrary.root,
                      icon: ICONS.electionManagement,
                      children: [
                        { title: t('ALL TEMPLATES'), path: paths.dashboard.templateLibrary.root },
                      ],
                    },
                    {
                      title: t('CREATE YOUR POST'),
                      path: paths.dashboard.voter.createYourPost,
                      icon: ICONS.electionManagement,
                    },
                  ],
                },
                {
                  title: t('STOP FAKE VOTING'),
                  path: paths.dashboard.voter.addFakeVote,
                  icon: ICONS.user,
                  // children: [
                  //   { title: t('Add Poll'), path: paths.dashboard.poolmanagement.new },
                  //   {
                  //     title: t('Poll List'),
                  //     path: paths.dashboard.poolmanagement.list,
                  //   },
                  // ],
                },
                {
                  title: t('EMERGENCY CONTACT LIST'),
                  path: paths.dashboard.emergencyContactNumber.new,
                  icon: ICONS.user,
                },
                {
                  title: t('SOCIAL MEDIA'),
                  path: paths.dashboard.socialMedia.root,
                  icon: ICONS.user,
                },
              ],
            },
            {
              // Project Management

              title: t('APPOINTMENT LIST DETAILS'),
              path: paths.dashboard.Appointment.root,
              icon: ICONS.partyManagement,
            },

            {
              // Project Management

              title: t('DESIRE LIST '),
              path: paths.dashboard.Desire.root,
              icon: ICONS.partyManagement,
            },
            {
              title: t('GOVT EMPLOYMENT DESIRE'),
              path: paths.dashboard.GovtService.list,
              icon: ICONS.govtService,
            },

            {
              title: t('SURVEY MANAGEMENT'),
              path: paths.dashboard.survey.root,
              icon: ICONS.election,
              children: [
                { title: t('ADD SURVEY'), path: paths.dashboard.survey.new },
                { title: t('SURVEY LIST'), path: paths.dashboard.survey.root },
                { title: t('SURVEY RESPONSE LIST'), path: paths.dashboard.survey.responseList },
              ],
            },
            {
              title: t('EXPENSE MANAGEMENT'),
              path: paths.dashboard.category.root,
              icon: ICONS.expense,
              children: [
                {
                  title: t('CATEGORY MANAGEMENT'),
                  path: paths.dashboard.category.root,
                  children: [
                    { title: t('ADD CATEGORY'), path: paths.dashboard.category.new },
                    { title: t('CATEGORY LIST'), path: paths.dashboard.category.root },
                  ],
                },
                {
                  title: t('CLAIM MANAGEMENT'),
                  path: paths.dashboard.claim.root,
                  children: [
                    { title: t('ADD CLAIM'), path: paths.dashboard.claim.new },
                    { title: t('CLAIM LIST'), path: paths.dashboard.claim.root },
                  ],
                },
                // {
                //   title: t('INVOICE MANAGEMENT'),
                //   path: paths.dashboard.invoice.root,
                //   children: [
                //     { title: t('ADD INVOICE'), path: paths.dashboard.invoice.new },
                //     { title: t('INVOICE LIST'), path: paths.dashboard.invoice.root },
                //   ],
                // },
              ],
            },
            {
              // Project Management
              title: t('PROJECT MANAGEMENT'),
              path: paths.dashboard.project.list,
              icon: ICONS.kanban,
              // items: [
              //   {
              //     title: t('Project Managment'),
              //     path: paths.dashboard.project.list,
              //     icon: ICONS.kanban,
              //   },
              // ],
            },
            {
              title: t('GALLERY'),
              path: paths.dashboard.OverviewGalleryView.root,
              icon: ICONS.electionManagement,
              // children: [{ title: t('All Templates'), path: paths.dashboard.templateLibrary.root }],
            },
            {
              title: t('SUGGESTION BOX'),
              path: paths.dashboard.FeedbackPage.new,
              icon: ICONS.complaintForm,
              // items: [
              //   {
              //     title: t('Suggestion Box'),
              //     path: paths.dashboard.FeedbackPage.new,
              //     icon: ICONS.complaintForm,
              //   },
              // ],
            },

            {
              title: t('TRANSPORT MANAGEMENT'),
              path: paths.dashboard.vehicle.root,
              icon: ICONS.vehicle,
              children: [
                {
                  title: t('DRIVER MANAGEMENT'),
                  path: paths.dashboard.driver.root,
                  icon: ICONS.driver,
                  children: [
                    { title: t('ADD DRIVER'), path: paths.dashboard.driver.new },
                    { title: t('DRIVER LIST'), path: paths.dashboard.driver.root },
                  ],
                },

                {
                  title: t('VEHICLE MANAGEMENT'),
                  path: paths.dashboard.vehicle.root,
                  icon: ICONS.vehicle,
                  children: [
                    { title: t('ADD VEHICLE'), path: paths.dashboard.vehicle.new },
                    { title: t('VEHICLE LIST'), path: paths.dashboard.vehicle.root },
                  ],
                },

                {
                  title: t('CREATE TRIP'),
                  path: paths.dashboard.createtrip.root,
                  icon: ICONS.trip,
                  children: [{ title: t('ADD TRIP '), path: paths.dashboard.createtrip.new }],
                },
                {
                  title: t('TRIP MANAGEMENT'),
                  path: paths.dashboard.trip.root,
                  icon: ICONS.services,
                  children: [
                    // { title: t('Add Trip'), path: paths.dashboard.trip.new },
                    { title: t('REQUESTED TRIP LIST'), path: paths.dashboard.trip.requestedList },
                    { title: t('MANAGED TRIP LIST'), path: paths.dashboard.trip.managedList },
                  ],
                },
              ],
            },

            // {
            //   title: t('TEMPLATE LIBRARY'),
            //   path: paths.dashboard.templateLibrary.root,
            //   icon: ICONS.electionManagement,
            //   children: [{ title: t('ALL TEMPLATES'), path: paths.dashboard.templateLibrary.root }],
            // },

            // {
            //   title: t('LABOUR JOB PORTAL'),
            //   path: paths.dashboard.labour_job_portal.root,
            //   icon: ICONS.labourJob,
            //   // children: [
            //   //   { title: t('Labour Job Portal'), path: paths.dashboard.labour_job_portal.list },
            //   // ],
            // },

            //  Appointment
            // {
            //   subheader: t('Appointment Management'),
            //   items: [
            // {
            //   title: t('Appointment Management'),
            //   path: paths.dashboard.Appointment.root,
            //   icon: ICONS.partyManagement,
            //   children: [
            //     { title: t('Add Appointment '), path: paths.dashboard.Appointment.new },
            //     { title: t('Appointment  List'), path: paths.dashboard.Appointment.root },
            //   ],
            // },
            //   ],
            // },

            // {
            //   // Project Management

            //   title: t('Project Managment'),
            //   path: paths.dashboard.kanban,
            //   icon: ICONS.kanban,
            // },

            // Appointment

            // {
            //   title: t('Appointment Management'),
            //   path: paths.dashboard.Appointment,
            //   icon: ICONS.complaintForm,
            //   children: [
            //     // { title: t('Appointment '), path: paths.dashboard.Appointment.new },
            //     { title: t('Appointment List'), path: paths.dashboard.Appointment.root },
            //   ],
            // },

            // {
            //   title: t('EMERGENCY SERVICES'),
            //   path: paths.dashboard.emergencyServices.root,
            //   icon: ICONS.ambulance,
            // },

            // {
            //   // Project Management Deepak
            //   title: t('PROJECT PROGRESS'),
            //   path: paths.dashboard.user_project.list,
            //   icon: ICONS.kanban,
            // },

            {
              title: t(' EMERGENCY SERVICES'),
              path: paths.dashboard.emergencyServices.root,
              icon: ICONS.ambulance,
              children: [
                {
                  title: t('EMERGENCY HELPLINE NUMBER'),
                  path: paths.dashboard.emergencyServices.root,
                  icon: ICONS.ambulance,
                },

                // {
                //   title: t('AMBULANCE LIST'),
                //   path: paths.dashboard.ambulancetrip.requestedList,
                //   icon: ICONS.trip,
                // },
                {
                  title: t('AMBULANCE MANAGEMENT'),
                  path: paths.dashboard.callAmbulance.root,
                  icon: ICONS.ambulance,
                  children: [
                    {
                      title: t('BOOK AMBULANCE '),
                      path: paths.dashboard.ambulancetrip.new,
                    },
                    {
                      title: t('REQUESTED LIST'),
                      path: paths.dashboard.callAmbulance.requestedList,
                    },
                  ],
                },
                // {
                //   title: t('EMERGENCY AMBULANCE SERVICES'),
                //   path: paths.dashboard.ambulancetrip.cards,
                //   icon: ICONS.ambulance,
                // },
              ],
            },
          ],
        });
        break;
      case 'Candidate Manager':
        sections.push({
          subheader: t('ELECTION MANAGEMENT'),
          items: [
            {
              title: t('BOOK AMBULANCE '),
              path: paths.dashboard.ambulancetrip.root,
              icon: ICONS.ambulance,
              children: [{ title: t('ADD TRIP '), path: paths.dashboard.ambulancetrip.new }],
            },
            {
              title: t('AMBULANCE  MANAGEMENT'),
              path: paths.dashboard.callAmbulance.root,
              icon: ICONS.ambulance,
              children: [
                { title: t('ADD USER'), path: paths.dashboard.userProfileManagement.new },
                {
                  title: t('USER LIST'),
                  path: paths.dashboard.userProfileManagement.list,
                },
                {
                  title: t('REQUESTED TRIP LIST'),
                  path: paths.dashboard.ambulancetrip.requestedList,
                },
              ],
            },
            {
              title: t('CATEGORY MANAGEMENT'),
              path: paths.dashboard.category.root,
              icon: ICONS.expense,
              children: [
                { title: t('ADD CATEGORY'), path: paths.dashboard.category.new },
                { title: t('CATEGORY LIST'), path: paths.dashboard.category.root },
              ],
            },
            {
              title: t('CLAIM MANAGEMENT'),
              path: paths.dashboard.claim.root,
              icon: ICONS.candidate,
              children: [
                { title: t('ADD CLAIM'), path: paths.dashboard.claim.new },
                { title: t('CLAIM LIST'), path: paths.dashboard.claim.root },
              ],
            },
            // {
            //   title: t('INVOICE MANAGEMENT'),
            //   path: paths.dashboard.invoice.root,
            //   icon: ICONS.expense,
            //   children: [
            //     { title: t('ADD INVOICE'), path: paths.dashboard.invoice.new },
            //     { title: t('INVOICE LIST'), path: paths.dashboard.invoice.root },
            //   ],
            // },
            {
              title: t('DRIVER MANAGEMENT'),
              path: paths.dashboard.driver.root,
              icon: ICONS.driver,
              children: [
                { title: t('ADD DRIVER'), path: paths.dashboard.driver.new },
                { title: t('DRIVER LIST'), path: paths.dashboard.driver.root },
              ],
            },
            // {
            //   title: t('INVOICE MANAGEMENT'),
            //   path: paths.dashboard.invoice.root,
            //   icon: ICONS.expense,
            //   children: [
            //     { title: t('ADD INVOICE'), path: paths.dashboard.invoice.new },
            //     { title: t('INVOICE LIST'), path: paths.dashboard.invoice.root },
            //   ],
            // },
            {
              title: t('LABOUR JOB PORTAL'),
              path: paths.dashboard.labour_job_portal.root,
              icon: ICONS.labourJob,
            },
            {
              title: t('SUGGESTION BOX'),
              path: paths.dashboard.FeedbackPage.root,
              icon: ICONS.complaintForm,
              items: [
                {
                  title: t('SUGGESTION BOX'),
                  path: paths.dashboard.FeedbackPage.new,
                  icon: ICONS.complaintForm,
                },
              ],
            },
            {
              title: t('TRANSPORT MANAGEMENT'),
              path: paths.dashboard.vehicle.root,
              icon: ICONS.vehicle,
              children: [
                {
                  title: t('BOOK AMBULANCE '),
                  path: paths.dashboard.ambulancetrip.root,
                  icon: ICONS.ambulance,
                  children: [{ title: t('ADD TRIP '), path: paths.dashboard.ambulancetrip.new }],
                },
                {
                  title: t('AMBULANCE  MANAGEMENT'),
                  path: paths.dashboard.callAmbulance.root,
                  icon: ICONS.ambulance,
                  children: [
                    // { title: t('Add Trip'), path: paths.dashboard.trip.new },
                    {
                      title: t('REQUESTED TRIP LIST'),
                      path: paths.dashboard.ambulancetrip.requestedList,
                    },
                    {
                      title: t('MANAGED TRIP LIST'),
                      path: paths.dashboard.callAmbulance.managedList,
                    },
                    // { title: t('Ambulance Trip List'), path: paths.dashboard.trip.ambulanceList },
                  ],
                },
                {
                  title: t('SUGGESTION BOX'),
                  path: paths.dashboard.FeedbackPage.root,
                  icon: ICONS.complaintForm,
                  items: [
                    {
                      title: t('SUGGESTION BOX'),
                      path: paths.dashboard.FeedbackPage.new,
                      icon: ICONS.complaintForm,
                    },
                  ],
                },
              ],
            },
          ],
        });
        break;
      case 'Ward Leader':
        sections.push(
          {
            subheader: t('TRANSPORT MANAGEMENT'),
            items: [
              {
                title: t('DRIVER MANAGEMENT'),
                path: paths.dashboard.driver.root,
                icon: ICONS.driver,
                children: [
                  { title: t('ADD DRIVER'), path: paths.dashboard.driver.new },
                  { title: t('DRIVER LIST'), path: paths.dashboard.driver.root },
                ],
              },
              {
                title: t('VEHICLE MANAGEMENT'),
                path: paths.dashboard.vehicle.root,
                icon: ICONS.vehicle,
                children: [
                  { title: t('ADD VEHICLE'), path: paths.dashboard.vehicle.new },
                  { title: t('VEHICLE LIST'), path: paths.dashboard.vehicle.root },
                ],
              },
              {
                title: t('TRIP CREATE'),
                path: paths.dashboard.trip.root,
                icon: ICONS.trip,
                children: [
                  { title: t('ADD TRIP'), path: paths.dashboard.trip.new },
                  // { title: t('TRIP LIST'), path: paths.dashboard.wardleader.root },
                ],
              },
              {
                title: t('TRIP MANAGEMENT'),
                path: paths.dashboard.trip.root,
                icon: ICONS.trip,
                children: [
                  // { title: t('Add Trip'), path: paths.dashboard.trip.new },
                  { title: t('REQUESTED TRIP LIST'), path: paths.dashboard.trip.requestedList },
                  { title: t('MANAGED TRIP LIST'), path: paths.dashboard.trip.root },
                ],
              },
              {
                title: t('BOOK AMBULANCE '),
                path: paths.dashboard.ambulancetrip.root,
                icon: ICONS.ambulance,
                children: [
                  { title: t('ADD TRIP '), path: paths.dashboard.ambulancetrip.new },
                  {
                    title: t('REQUESTED TRIP LIST'),
                    path: paths.dashboard.ambulancetrip.requestedList,
                  },
                ],
              },
            ],
          },
          {
            subheader: t('EXPENSES MANAGEMENT'),
            items: [
              {
                title: t('CATEGORY MANAGEMENT'),
                path: paths.dashboard.category.root,
                icon: ICONS.expense,
                children: [
                  { title: t('ADD CATEGORY'), path: paths.dashboard.category.new },
                  { title: t('CATEGORY LIST'), path: paths.dashboard.category.root },
                ],
              },
              {
                title: t('CLAIM MANAGEMENT'),
                path: paths.dashboard.claim.root,
                icon: ICONS.candidate,
                children: [
                  { title: t('ADD CLAIM'), path: paths.dashboard.claim.new },
                  { title: t('CLAIM LIST'), path: paths.dashboard.claim.root },
                ],
              },
              // {
              //   title: t('INVOICE MANAGEMENT'),
              //   path: paths.dashboard.invoice.root,
              //   icon: ICONS.expense,
              //   children: [
              //     { title: t('ADD INVOICE'), path: paths.dashboard.invoice.new },
              //     { title: t('INVOICE LIST'), path: paths.dashboard.invoice.root },
              //     // {
              //     //   title: t('details'),
              //     //   path: paths.dashboard.expenses.demo.details,
              //     // },
              //     // { title: t('edit'), path: paths.dashboard.expenses.demo.edit },
              //   ],
              // },
            ],
          },
          {
            items: [
              {
                title: t('USER MANAGEMENT'),
                path: paths.dashboard.userProfileManagement.root,
                icon: ICONS.user,
                children: [
                  { title: t('ADD USER'), path: paths.dashboard.userProfileManagement.new },
                  {
                    title: t('USER LIST'),
                    path: paths.dashboard.userProfileManagement.list,
                  },
                ],
              },
            ],
          },
          {
            subheader: t('ELECTION'),
            path: paths.dashboard.electionmanagement,
            icon: ICONS.adminchat,
            items: [
              {
                title: t('DETAILS'),
                path: paths.dashboard.electionmanagement.mockdetails,
                icon: ICONS.adminchat,
              },
            ],
          },
          {
            subheader: t('WARD'),
            path: paths.dashboard.wardmanagement,
            icon: ICONS.adminchat,
            items: [
              {
                title: t('DETAILS'),
                path: paths.dashboard.wardmanagement.mockdetails,
                icon: ICONS.adminchat,
              },
            ],
          },
          {
            subheader: t('CANDIDATE'),
            path: paths.dashboard.candidate,
            icon: ICONS.adminchat,
            items: [
              { title: t('LIST'), path: paths.dashboard.candidate.list, icon: ICONS.adminchat },
            ],
          },
          {
            subheader: t('LABOUR JOB PORTAL'),
            path: paths.dashboard.labour_job_portal.root,
            icon: ICONS.labourJob,
            items: [
              {
                title: t('LABOUR JOB PORTAL'),
                path: paths.dashboard.labour_job_portal.list,
                icon: ICONS.labourJob,
              },
            ],
          },
          {
            subheader: t('BOOTH'),
            path: paths.dashboard.boothmanagement,
            icon: ICONS.adminchat,
            items: [
              {
                title: t('LIST'),
                path: paths.dashboard.boothmanagement.list,
                icon: ICONS.adminchat,
              },
            ],
          },
          {
            subheader: t('TRIP'),
            items: [
              {
                title: t('TRIP LIST'),
                path: paths.dashboard.tripdriver.root,
                icon: ICONS.trip,
              },
            ],
          },
          {
            subheader: t('ADD'),
            path: paths.voter,
            icon: ICONS.adminchat,
            items: [{ title: t('VOTER'), path: paths.dashboard.voter.new, icon: ICONS.adminchat }],
          },

          {
            subheader: t('SUGGESTION BOX'),
            path: paths.dashboard.FeedbackPage.root,
            icon: ICONS.complaintForm,
            items: [
              {
                title: t('SUGGESTION BOX'),
                path: paths.dashboard.FeedbackPage.new,
                icon: ICONS.complaintForm,
              },
            ],
          }
        );
        break;
      case 'Booth Leader':
        sections.push(
          {
            subheader: t('ELECTION'),
            path: paths.dashboard.electionManagment,
            icon: ICONS.adminchat,
            items: [
              {
                title: t('DETAILS'),
                path: paths.dashboard.electionmanagement.mockdetails,
                icon: ICONS.election,
              },
            ],
          },
          {
            subheader: t('WARD'),
            path: paths.dashboard.wardmanagement,
            icon: ICONS.adminchat,
            items: [
              {
                title: t('DETAILS'),
                path: paths.dashboard.wardmanagement.mockdetails,
                icon: ICONS.ward,
              },
            ],
          },
          {
            subheader: t('CANDIDATE'),
            path: paths.dashboard.candidate,
            icon: ICONS.adminchat,
            items: [
              { title: t('LIST'), path: paths.dashboard.candidate.root, icon: ICONS.candidate },
            ],
          },
          {
            subheader: t('TRIP REQUEST'),
            path: paths.dashboard.wardvol,
            icon: ICONS.trip,
            items: [{ title: t('TRIP'), path: paths.dashboard.wardvol.new, icon: ICONS.trip }],
          },
          {
            subheader: t('WARD VOLUNTEER'),
            path: paths.dashboard.voter,
            icon: ICONS.adminchat,
            items: [
              {
                title: t('ADD WARD VOLUNTEER'),
                path: paths.dashboard.voter.new,
                icon: ICONS.voter,
              },
            ],
          },
          {
            subheader: t('Trip Management'),
            path: paths.dashboard.trip.root,
            icon: ICONS.ambulance,
            items: [
              {
                title: t('Trip Management'),
                path: paths.dashboard.trip.root,
                icon: ICONS.ambulance,
                children: [
                  { title: t('Requested Trip List '), path: paths.dashboard.trip.requestedList },
                  {
                    title: t('Managed Trip List'),
                    path: paths.dashboard.trip.root,
                  },
                ],
              },
            ],
          },
          {
            subheader: t('AMBULANCE'),
            path: paths.dashboard.ambulancetrip.root,
            icon: ICONS.ambulance,
            items: [
              {
                title: t('BOOK AMBULANCE '),
                path: paths.dashboard.ambulancetrip.root,
                icon: ICONS.ambulance,
                children: [
                  { title: t('ADD TRIP '), path: paths.dashboard.ambulancetrip.new },
                  {
                    title: t('REQUESTED TRIP LIST'),
                    path: paths.dashboard.ambulancetrip.requestedList,
                  },
                ],
              },
            ],
          },
          {
            subheader: t('LABOUR JOB PORTAL'),
            path: paths.dashboard.labour_job_portal.root,
            icon: ICONS.labourJob,
            items: [
              {
                title: t('LABOUR JOB PORTAL'),
                path: paths.dashboard.labour_job_portal.list,
                icon: ICONS.labourJob,
              },
            ],
          },
          {
            subheader: t('SUGGESTION BOX'),
            path: paths.dashboard.FeedbackPage.root,
            icon: ICONS.complaintForm,
            items: [
              {
                title: t('SUGGESTION BOX'),
                path: paths.dashboard.FeedbackPage.new,
                icon: ICONS.complaintForm,
              },
            ],
          }
        );
        break;
      case 'Polling Station Leader':
        sections.push(
          {
            title: t('USER MANAGEMENT'),
            path: paths.dashboard.userProfileManagement.root,
            icon: ICONS.user,
            items: [
              { title: t('ADD USER'), path: paths.dashboard.userProfileManagement.new },
              {
                title: t('USER LIST'),
                path: paths.dashboard.userProfileManagement.list,
              },
            ],
          },
          {
            title: t('POLLING MANAGEMENT'),
            path: paths.dashboard.poolmanagement.root,
            icon: ICONS.user,
            items: [
              { title: t('ADD POLL'), path: paths.dashboard.poolmanagement.new },
              {
                title: t('POLL LIST'),
                path: paths.dashboard.poolmanagement.list,
              },
            ],
          },
          {
            title: t('CATEGORY MANAGEMENT'),
            path: paths.dashboard.category.root,
            icon: ICONS.expense,
            items: [
              { title: t('ADD CATEGORY'), path: paths.dashboard.category.new },
              { title: t('CATEGORY LIST'), path: paths.dashboard.category.root },
            ],
          },
          {
            title: t('VOTER MANAGEMENT'),
            path: paths.dashboard.voter.root,
            icon: ICONS.voter,
            items: [
              { title: t('ADD VOTER'), path: paths.dashboard.voter.new },
              {
                title: t('VOTERS LIST'),
                path: paths.dashboard.voter.list,
              },
            ],
          },
          {
            title: t('TRANSPORT MANAGEMENT'),
            path: paths.dashboard.vehicle.root,
            icon: ICONS.vehicle,
            items: [
              {
                title: t('DRIVER MANAGEMENT'),
                path: paths.dashboard.driver.root,
                icon: ICONS.driver,
                children: [
                  { title: t('ADD DRIVER'), path: paths.dashboard.driver.new },
                  { title: t('DRIVER LIST'), path: paths.dashboard.driver.root },
                ],
              },
              {
                title: t('VEHICLE MANAGEMENT'),
                path: paths.dashboard.vehicle.root,
                icon: ICONS.vehicle,
                children: [
                  { title: t('ADD VEHICLE'), path: paths.dashboard.vehicle.new },
                  { title: t('VEHICLE LIST'), path: paths.dashboard.vehicle.root },
                ],
              },
              // {
              //   title: t('Trip Driver'),
              //   path: paths.dashboard.tripdriver.root,
              //   children: [
              //     { title: t('Add Trip Driver'), path: paths.dashboard.tripdriver.new },
              //     { title: t('Trip Driver List'), path: paths.dashboard.tripdriver.list },
              //   ],
              // },
              {
                title: t('CREATE TRIP'),
                path: paths.dashboard.createtrip.root,
                icon: ICONS.trip,
                children: [{ title: t('ADD TRIP '), path: paths.dashboard.createtrip.new }],
              },
              {
                title: t('TRIP MANAGEMENT'),
                path: paths.dashboard.trip.root,
                icon: ICONS.services,
                children: [
                  // { title: t('Add Trip'), path: paths.dashboard.trip.new },
                  { title: t('REQUESTED TRIP LIST'), path: paths.dashboard.trip.requestedList },
                  { title: t('MANAGED TRIP LIST'), path: paths.dashboard.trip.managedList },
                ],
              },
              {
                title: t('BOOK AMBULANCE '),
                path: paths.dashboard.ambulancetrip.root,
                icon: ICONS.ambulance,
                children: [
                  { title: t('ADD TRIP '), path: paths.dashboard.ambulancetrip.new },
                  {
                    title: t('REQUESTED TRIP LIST'),
                    path: paths.dashboard.ambulancetrip.requestedList,
                  },
                ],
              },
              {
                title: t('LABOUR JOB PORTAL'),
                path: paths.dashboard.labour_job_portal.list,
                icon: ICONS.labourJob,
                // children: [
                //   {
                //     title: t('Labour Job Portal'),
                //     path: paths.dashboard.labour_job_portal.list,
                //     icon: ICONS.ambulance,
                //   }
                // ],
              },
              {
                title: t('Suggestion Box'),
                path: paths.dashboard.FeedbackPage.root,
                icon: ICONS.complaintForm,
                items: [
                  {
                    title: t('SUGGESTION BOX'),
                    path: paths.dashboard.FeedbackPage.new,
                    icon: ICONS.complaintForm,
                  },
                ],
              },
            ],
          }
        );
        break;
      case 'Polling Station Volunteer':
        sections.push(
          {
            subheader: t('ELECTION'),
            path: paths.dashboard.voterview,
            icon: ICONS.adminchat,
            items: [
              {
                title: t('MY DETAILS'),
                path: paths.dashboard.voterview.details,
                icon: ICONS.adminchat,
              },
            ],
          },
          {
            subheader: t('VOTE PREDICTION MANAGEMENT'),
            path: paths.dashboard.vote_prediction,
            items: [
              {
                title: t('VOTE PREDICTION MANAGEMENT'),
                path: paths.dashboard.vote_prediction.list,
                icon: ICONS.voter,
              },
            ],
          },
          {
            subheader: t('LABOUR JOB PORTAL'),
            path: paths.dashboard.labour_job_portal.root,
            icon: ICONS.labourJob,
            items: [
              {
                title: t('LABOUR JOB PORTAL'),
                path: paths.dashboard.labour_job_portal.list,
                icon: ICONS.labourJob,
              },
            ],
          },
          // {
          //   subheader: t('Create Trip'),
          //   items: [
          //     {
          //       title: t('Create Trip'),
          //       path: paths.dashboard.createtrip.root,
          //       icon: ICONS.trip,
          //       children: [
          //         {
          //           title: t('Add Trip'),
          //           path: paths.dashboard.createtrip.new,
          //         },
          //       ],
          //     },
          //   ],
          // },
          {
            title: t('TRANSPORT MANAGEMENT'),
            path: paths.dashboard.vehicle.root,
            icon: ICONS.vehicle,
            items: [
              {
                title: t('DRIVER MANAGEMENT'),
                path: paths.dashboard.driver.root,
                icon: ICONS.driver,
                children: [
                  { title: t('ADD DRIVER'), path: paths.dashboard.driver.new },
                  { title: t('DRIVER LIST'), path: paths.dashboard.driver.root },
                ],
              },
              {
                title: t('VEHICLE MANAGEMENT'),
                path: paths.dashboard.vehicle.root,
                icon: ICONS.vehicle,
                children: [
                  { title: t('ADD VEHICLE'), path: paths.dashboard.vehicle.new },
                  { title: t('VEHICLE LIST'), path: paths.dashboard.vehicle.root },
                ],
              },
              // {
              //   title: t('Trip Driver'),
              //   path: paths.dashboard.tripdriver.root,
              //   children: [
              //     { title: t('Add Trip Driver'), path: paths.dashboard.tripdriver.new },
              //     { title: t('Trip Driver List'), path: paths.dashboard.tripdriver.list },
              //   ],
              // },
              {
                title: t('CREATE TRIP'),
                path: paths.dashboard.createtrip.root,
                icon: ICONS.trip,
                children: [{ title: t('ADD TRIP '), path: paths.dashboard.createtrip.new }],
              },
              {
                title: t('TRIP MANAGEMENT'),
                path: paths.dashboard.trip.root,
                icon: ICONS.services,
                children: [
                  // { title: t('Add Trip'), path: paths.dashboard.trip.new },
                  { title: t('REQUESTED TRIP LIST'), path: paths.dashboard.trip.requestedList },
                  { title: t('MANAGED TRIP LIST'), path: paths.dashboard.trip.managedList },
                ],
              },
              {
                title: t('BOOK AMBULANCE '),
                path: paths.dashboard.ambulancetrip.root,
                icon: ICONS.ambulance,
                children: [
                  { title: t('ADD TRIP '), path: paths.dashboard.ambulancetrip.new },
                  {
                    title: t('REQUESTED TRIP LIST'),
                    path: paths.dashboard.ambulancetrip.requestedList,
                  },
                ],
              },

              {
                title: t('SUGGESTION BOX'),
                path: paths.dashboard.FeedbackPage.root,
                icon: ICONS.complaintForm,
                items: [
                  {
                    title: t('SUGGESTION BOX'),
                    path: paths.dashboard.FeedbackPage.new,
                    icon: ICONS.complaintForm,
                  },
                ],
              },
            ],
          }
        );
        break;
      case 'Driver':
        sections.push(
          {
            subheader: t('MY TRIP'),
            items: [
              {
                title: t('TRIP LIST'),
                path: paths.dashboard.tripdriver.root,
                icon: ICONS.trip,
              },
            ],
          },

          {
            subheader: t('BOOK AMBULANCE '),
            path: paths.dashboard.ambulancetrip.requestedList,
            icon: ICONS.ambulance,
            items: [
              {
                title: t('AMBULANCE REQUESTED TRIP LIST'),
                path: paths.dashboard.ambulancetrip.requestedList,
                icon: ICONS.ambulance,
              },
            ],
          },
          {
            subheader: t('DELIVERY REQUEST '),
            path: paths.dashboard.ambulancetrip.requestedList,
            icon: ICONS.ambulance,
            items: [
              {
                title: t('DELIVERY REQUEST TRIP LIST'),
                path: paths.dashboard.deliveryService.list,
                icon: ICONS.ambulance,
              },
            ],
          },
          {
            subheader: t('CAB REQUEST '),
            path: paths.dashboard.cabService.list,
            icon: ICONS.ambulance,
            items: [
              {
                title: t('VEHICLE REQUEST TRIP LIST'),
                path: paths.dashboard.cabService.list,
                icon: ICONS.ambulance,
              },
            ],
          },

          {
            subheader: t('SEE ALL FEATURE'),
            path: paths.dashboard.GovtScheme,
            icon: ICONS.govtService,
            items: [
              {
                title: t('SEE ALL FEATURE'),
                path: paths.dashboard.GovtScheme.new,
                icon: ICONS.govtService,
                children: [
                  // govt in your hand
                  {
                    title: t('GOVT IN YOUR HAND'),
                    path: paths.dashboard.GovtScheme.new,
                    icon: ICONS.govtService,
                    children: [
                      {
                        title: t('GOVERNMENT BENIFITS'),
                        path: paths.dashboard.GovtScheme.new,
                        icon: ICONS.adminchat,
                      },
                      {
                        title: t('COMPLAINT SECTION'),
                        path: paths.dashboard.ComplaintForm.new,
                        icon: ICONS.complaintForm,
                      },
                    ],
                  },
                  // career route map
                  {
                    title: t(' CAREER ROADMAP'),
                    path: paths.dashboard.Appointment.card,
                    icon: ICONS.partyManagement,
                    children: [
                      {
                        title: t('STUDENT CAREER ROADMAP'),
                        path: paths.dashboard.StudentCareer.new,
                        icon: ICONS.students,
                      },

                      {
                        title: t('FARMER CAREER ROADMAP'),
                        path: paths.dashboard.FarmerService.new,
                        icon: ICONS.farmer,
                      },

                      {
                        title: t('GET LABOUR JOB'),
                        path: paths.dashboard.labour_job_portal.list,
                        icon: ICONS.labourJob,
                      },

                      {
                        title: t('BUSINESS CAREER ROADMAP'),
                        path: paths.dashboard.BussinessRoadmap.new,
                        icon: ICONS.careers,
                      },

                      {
                        title: t('WOMEN EMPOWERMENT'),
                        path: paths.dashboard.WomanEmpourment.new,
                        icon: ICONS.womanEmpowerment,
                      },
                      {
                        title: t('GOVT EMPLOYMENT DESIRE'),
                        path: paths.dashboard.GovtService.list,
                        icon: ICONS.govtService,
                      },
                    ],
                  },

                  // apply for job
                  {
                    title: t('APPLY FOR JOB'),
                    path: paths.dashboard.applyForJob.new,
                    icon: ICONS.trip,
                  },

                  // apply for industry
                  {
                    title: t('APPLY FOR INDUSTRIES'),
                    path: paths.dashboard.applyForIndustries.new,
                    icon: ICONS.trip,
                  },

                  // property route
                  {
                    title: t('PROPERTY BUY OR SELL'),
                    path: paths.dashboard.propertBuySell.new,
                    icon: ICONS.pollingManagement,
                  },

                  // attpl service
                  {
                    title: t(' ATTPL SERVICES'),
                    path: paths.dashboard.GovtScheme.new,
                    icon: ICONS.trip,
                    children: [
                      {
                        title: t('ATTPL COUNSULTANCY'),
                        path: paths.dashboard.attpl.consultancy,
                        icon: ICONS.pollingManagement,
                      },
                      {
                        title: t('ATTPL IT'),
                        path: paths.dashboard.attpl.it,
                        icon: ICONS.bulk,
                      },
                      {
                        title: t('ATTPL FINANCE'),
                        path: paths.dashboard.attpl.finance,
                        icon: ICONS.partyAllianceManagement,
                      },
                      {
                        title: t('ATTPL SOLAR'),
                        path: paths.dashboard.attpl.solar,
                        icon: ICONS.trip,
                      },
                      {
                        title: t('ATTPL INFRASTRUCUTE'),
                        path: paths.dashboard.attpl.infra,
                        icon: ICONS.kanban,
                      },
                      {
                        title: t('ATTPL STONE & MINERIALS'),
                        path: paths.dashboard.attpl.stone,
                        icon: ICONS.modalManagement,
                      },
                    ],
                  },

                  // natinal project
                  {
                    title: t('NATIONAL PROJECTS'),
                    path: paths.dashboard.user_project.list,
                    icon: ICONS.kanban,
                  },

                  // tour and travels
                  {
                    title: t('TOUR & TRAVELS'),
                    path: paths.dashboard.TourAndTravels.new,
                    icon: ICONS.TourAndTravels,
                  },

                  // survey form
                  {
                    title: t('SURVEY FORM'),
                    path: paths.dashboard.fill_survey.new,
                    icon: ICONS.userRoleManagement,
                  },

                  // suggestion box
                  {
                    title: t('SUGGESTION BOX'),
                    path: paths.dashboard.FeedbackPage.new,
                    icon: ICONS.complaintForm,
                  },

                  // galary
                  {
                    title: t('GALLERY'),
                    path: paths.dashboard.OverviewGalleryView.root,
                    icon: ICONS.electionManagement,
                  },

                  // health service
                  {
                    title: t(' HEALTH SERVICES'),
                    path: paths.dashboard.emergencyServices.root,
                    icon: ICONS.ambulance,
                    children: [
                      {
                        title: t('BOOK DOCTOR APPOINTMENT'),
                        path: paths.dashboard.Appointmenttodoctor.card,
                        icon: ICONS.bulk,
                      },
                      {
                        title: t('BOOK AMBULANCE '),
                        path: paths.dashboard.ambulancetrip.new,
                        icon: ICONS.ambulance,
                      },
                      {
                        title: t('AMBULANCE LIST'),
                        path: paths.dashboard.ambulancetrip.requestedList,
                        icon: ICONS.trip,
                      },
                      {
                        title: t('HEALTH TIPS'),
                        path: paths.dashboard.ambulancetrip.healthTips,
                        icon: ICONS.trip,
                      },
                      {
                        title: t('DOCTER SERVICES'),
                        path: paths.dashboard.ambulancetrip.docterCards,
                        icon: ICONS.bulk,
                      },
                    ],
                  },

                  // emergancy service
                  {
                    title: t(' EMERGENCY SERVICES'),
                    path: paths.dashboard.emergencyServices.root,
                    icon: ICONS.ambulance,
                    children: [
                      {
                        title: t('EMERGENCY HELPLINE NUMBER'),
                        path: paths.dashboard.emergencyServices.root,
                        icon: ICONS.ambulance,
                      },

                      {
                        title: t('BOOK AMBULANCE '),
                        path: paths.dashboard.ambulancetrip.new,
                        icon: ICONS.ambulance,
                      },
                      {
                        title: t('AMBULANCE LIST'),
                        path: paths.dashboard.ambulancetrip.requestedList,
                        icon: ICONS.trip,
                      },
                      {
                        title: t('EMERGENCY AMBULANCE SERVICES'),
                        path: paths.dashboard.ambulancetrip.cards,
                        icon: ICONS.ambulance,
                      },
                    ],
                  },

                  // support ticket
                  {
                    title: t('SUPPORT TICKET LIST DETAILS'),
                    icon: ICONS.sms,
                    path: paths.dashboard.sms.root,
                  },

                  // chat with friends
                  {
                    title: t("CHAT WITH FRIEND"),
                    path: paths.dashboard.chat,
                    icon: ICONS.election,
                  },

                  // add new user
                  {
                    title: t('ADD NEW USER'),
                    path: paths.dashboard.voter.new,
                    icon: ICONS.voter,
                  },
                ],
              },
            ],
          }
        );
        break;
      case 'Voter':
        sections.push(
          {
            subheader: t('GOVT IN YOUR HAND'),
            path: paths.dashboard.GovtScheme,
            icon: ICONS.govtService,
            items: [
              {
                title: t('GOVT IN YOUR HAND'),
                path: paths.dashboard.GovtScheme.new,
                icon: ICONS.govtService,
                children: [
                  {
                    title: t('GOVERNMENT BENIFITS'),
                    path: paths.dashboard.GovtScheme.new,
                    icon: ICONS.adminchat,
                  },
                  {
                    title: t('COMPLAINT SECTION'),
                    path: paths.dashboard.ComplaintForm.new,
                    icon: ICONS.complaintForm,
                  },
                ],
              },
            ],
          },

          {
            subheader: t('CAREER ROADMAP'),
            path: paths.dashboard.root,
            icon: ICONS.ambulance,
            items: [
              {
                title: t(' CAREER ROADMAP'),
                path: paths.dashboard.StudentCareer.root,
                icon: ICONS.partyManagement,
                children: [
                  {
                    title: t('STUDENT CAREER ROADMAP'),
                    path: paths.dashboard.StudentCareer.new,
                    icon: ICONS.students,
                  },

                  {
                    title: t('FARMER CAREER ROADMAP'),
                    path: paths.dashboard.FarmerService.new,
                    icon: ICONS.farmer,
                  },

                  {
                    title: t('GET LABOUR JOB'),
                    path: paths.dashboard.labour_job_portal.list,
                    icon: ICONS.labourJob,
                  },

                  {
                    title: t('APPLY FOR JOB'),
                    path: paths.dashboard.applyForJob.new,
                    icon: ICONS.trip,
                  },

                  {
                    title: t('BUSINESS CAREER ROADMAP'),
                    path: paths.dashboard.BussinessRoadmap.new,
                    icon: ICONS.careers,
                  },

                  {
                    title: t('WOMEN EMPOWERMENT'),
                    path: paths.dashboard.WomanEmpourment.new,
                    icon: ICONS.womanEmpowerment,
                  },
                  {
                    title: t('GOVT EMPLOYMENT DESIRE'),
                    path: paths.dashboard.GovtService.list,
                    icon: ICONS.govtService,
                  },
                ],
              },
            ],
          },

          {
            subheader: t('ATTPL BUSINESS'),
            path: paths.dashboard.GovtScheme,
            icon: ICONS.careers,
            items: [
              {
                title: t(' ATTPL BUSINESS'),
                path: paths.dashboard.applyForIndustries.root,
                icon: ICONS.trip,
                children: [
                  {
                    title: t('ATTPL COUNSULTANCY'),
                    path: paths.dashboard.attpl.consultancy,
                    icon: ICONS.pollingManagement,
                  },
                  {
                    title: t('ATTPL IT'),
                    path: paths.dashboard.attpl.it,
                    icon: ICONS.bulk,
                  },
                  {
                    title: t('ATTPL FINANCE'),
                    path: paths.dashboard.attpl.finance,
                    icon: ICONS.partyAllianceManagement,
                  },
                  {
                    title: t('ATTPL SOLAR'),
                    path: paths.dashboard.attpl.solar,
                    icon: ICONS.trip,
                  },
                  {
                    title: t('ATTPL INFRASTRUCUTE'),
                    path: paths.dashboard.attpl.infra,
                    icon: ICONS.kanban,
                  },
                  {
                    title: t('ATTPL STONE & MINERIALS'),
                    path: paths.dashboard.attpl.stone,
                    icon: ICONS.modalManagement,
                  },
                  {
                    title: t('APPLY FOR INDUSTRIES'),
                    path: paths.dashboard.applyForIndustries.new,
                    icon: ICONS.trip,
                  },
                  {
                    title: t('PROPERTY BUY OR SELL'),
                    path: paths.dashboard.propertBuySell.new,
                    icon: ICONS.pollingManagement,
                  },
                  {
                    title: t('NATIONAL PROJECTS'),
                    path: paths.dashboard.user_project.list,
                    icon: ICONS.kanban,
                  },
                ],
              },
            ],
          },

          {
            subheader: t('Political Information'),
            path: paths.dashboard.ambulancetrip.root,
            icon: ICONS.voterSlip,
            items: [
              {
                title: t('POLITICAL INFORMATION'),
                path: paths.dashboard.voterview.root,
                icon: ICONS.partyManagement,
                children: [
                  {
                    title: t('CANDIDATE PROFILE LIBRARY'),
                    path: paths.dashboard.candidateLibrary.list,
                  },
                  {
                    title: t('MY ELECTION DETAILS'),
                    path: paths.dashboard.voterview.details,
                    // icon: ICONS.election,
                  },
                  {
                    title: t('VOTING SLIP'),
                    path: paths.dashboard.votingSlip.new,
                    // icon: ICONS.voterSlip,
                  },
                  {
                    title: t(' LEADER WORK FOR YOU'),
                    path: paths.dashboard.Appointment.card,
                    // icon: ICONS.partyManagement,
                    children: [
                      { title: t('BOOK APPOINTMENT '), path: paths.dashboard.Appointment.card },
                      {
                        title: t('DESIRE PROGRESS'),
                        path: paths.dashboard.Desire.card,
                        // icon: ICONS.voterSlip,
                      },
                    ],
                  },
                ],
              },
            ],
          },

          {
            subheader: t('TMS'),
            // path: paths.dashboard.GovtScheme,
            icon: ICONS.careers,
            items: [
              {
                title: t('BOOK YOUR CAB'),
                path: paths.dashboard.cabService.root,
                icon: ICONS.taxi,
                children: [
                  {
                    title: t('CAB BOOK'),
                    path: paths.dashboard.cabService.new,
                    icon: ICONS.taxi,
                  },
                  {
                    title: t('CAB BOOKING LIST'),
                    path: paths.dashboard.cabService.list,
                    icon: ICONS.taxi,
                  },
                ],
              },
            ],
          },
          {
            subheader: t('LEGAL SOLUTIONS'),
            path: paths.dashboard.lawyer,
            icon: ICONS.careers,
            items: [
              {
                title: t('LEGAL SOLUTIONS'),
                path: paths.dashboard.lawyer.root,
                icon: ICONS.LMSAllList,
                children: [
                  {
                    title: t('SELECT LAWYERS'),
                    path: paths.dashboard.lawyer.browse,
                    icon: ICONS.SelectLawyer,
                  },
                  {
                    title: t('SELECT CA'),
                    path: paths.dashboard.chartered_accountant.browse,
                    icon: ICONS.SelectCA,
                  },
                  {
                    title: t('LEGAL DOCUMENT ASSISTANT'),
                    path: paths.dashboard.lms_vendor.browse,
                    icon: ICONS.LegalDocumentAssistant,
                  },
                  {
                    title: t('MY CASE DETAILS'),
                    // path: paths.dashboard.TourAndTravels.new,
                    // icon: ICONS.TourAndTravels,
                    path: paths.dashboard.LMS_demo.new,
                    icon: ICONS.LMSClientDetails,
                  },
                  {
                    title: t('SERVICE COURT'),
                    path: paths.dashboard.LMS_court.new,
                    icon: ICONS.SeeAllFeature,
                  },
                  {
                    title: t('LEGAL HELP'),
                    path: paths.dashboard.LMS_cards.new,
                    icon: ICONS.YourDetails,
                  },
                ],
              },
            ],
          },

          {
            subheader: t('SEE ALL FETAURES'),
            path: paths.dashboard.TourAndTravels.root,
            icon: ICONS.careers,
            items: [
              {
                title: t('SEE ALL FEATURES'),
                path: paths.dashboard.TourAndTravels.root,
                icon: ICONS.bulk,
                children: [

                  {
                    title: t('TOUR & TRAVELS'),
                    path: paths.dashboard.TourAndTravels.new,
                    icon: ICONS.TourAndTravels,
                  },
                  {
                    title: t('SURVEY FORM'),
                    path: paths.dashboard.fill_survey.new,
                    icon: ICONS.userRoleManagement,
                  },
                  {
                    title: t('SUGGESTION BOX'),
                    path: paths.dashboard.FeedbackPage.new,
                    icon: ICONS.complaintForm,
                  },
                  {
                    title: t('GALLERY'),
                    path: paths.dashboard.OverviewGalleryView.root,
                    icon: ICONS.electionManagement,
                  },
                  {
                    title: t(' HEALTH SERVICES'),
                    path: paths.dashboard.emergencyServices.root,
                    icon: ICONS.ambulance,
                    children: [
                      {
                        title: t('BOOK DOCTOR APPOINTMENT'),
                        path: paths.dashboard.Appointmenttodoctor.card,
                        icon: ICONS.bulk,
                      },
                      {
                        title: t('BOOK AMBULANCE '),
                        path: paths.dashboard.ambulancetrip.new,
                        icon: ICONS.ambulance,
                      },
                      {
                        title: t('AMBULANCE LIST'),
                        path: paths.dashboard.ambulancetrip.requestedList,
                        icon: ICONS.trip,
                      },
                      {
                        title: t('HEALTH TIPS'),
                        path: paths.dashboard.ambulancetrip.healthTips,
                        icon: ICONS.trip,
                      },
                      {
                        title: t('DOCTER SERVICES'),
                        path: paths.dashboard.ambulancetrip.docterCards,
                        icon: ICONS.bulk,
                      },
                    ],
                  },
                  {
                    title: t(' EMERGENCY SERVICES'),
                    path: paths.dashboard.emergencyServices.root,
                    icon: ICONS.ambulance,
                    children: [
                      {
                        title: t('EMERGENCY HELPLINE NUMBER'),
                        path: paths.dashboard.emergencyServices.root,
                        icon: ICONS.ambulance,
                      },

                      {
                        title: t('BOOK AMBULANCE '),
                        path: paths.dashboard.ambulancetrip.new,
                        icon: ICONS.ambulance,
                      },
                      {
                        title: t('AMBULANCE LIST'),
                        path: paths.dashboard.ambulancetrip.requestedList,
                        icon: ICONS.trip,
                      },
                      {
                        title: t('EMERGENCY AMBULANCE SERVICES'),
                        path: paths.dashboard.ambulancetrip.cards,
                        icon: ICONS.ambulance,
                      },
                    ],
                  },
                  {
                    title: t('SUPPORT TICKET LIST DETAILS'),
                    icon: ICONS.sms,
                    path: paths.dashboard.sms.root,
                  },
                  {
                    title: t("CHAT WITH FRIEND"),
                    path: paths.dashboard.chat,
                    icon: ICONS.election,
                  },
                  { title: t('ADD NEW USER'), path: paths.dashboard.voter.new, icon: ICONS.voter },
                ],
              },
            ],
          },
        );
        break;
      case 'Businessman':
        sections.push(
          {
            subheader: t("CHAT WITH FRIEND"),
            path: paths.dashboard.chat,
            icon: ICONS.election,
            items: [
              {
                title: t("CHAT WITH FRIEND"),
                path: paths.dashboard.chat,
                icon: ICONS.election,
              },
            ],
          },

          {
            subheader: t('VOTER'),
            path: paths.dashboard.voter,
            icon: ICONS.voter,
            items: [
              { title: t('ADD NEW USER'), path: paths.dashboard.voter.new, icon: ICONS.voter },
            ],
          },

          // {
          //   subheader: t('CANDIDATE LIBRARY'),
          //   path: paths.dashboard.candidateLibrary,
          //   icon: ICONS.adminchat,
          //   items: [
          //     {
          //       title: t('CANDIDATE PROFILE LIBRARY'),
          //       path: paths.dashboard.candidateLibrary.list,
          //       icon: ICONS.adminchat,
          //     },
          //   ],
          // },
          // {
          //   subheader: t('COMPLAINT SECTION'),
          //   path: paths.dashboard.ComplaintForm,
          //   icon: ICONS.complaintForm,
          //   items: [
          //     {
          //       title: t('COMPLAINT SECTION'),
          //       path: paths.dashboard.ComplaintForm.new,
          //       icon: ICONS.complaintForm,
          //     },
          //   ],
          // },
          // {
          //   subheader: t('ELECTION'),
          //   path: paths.dashboard.voterview,
          //   icon: ICONS.election,
          //   items: [
          //     {
          //       title: t('MY ELECTION DETAILS'),
          //       path: paths.dashboard.voterview.details,
          //       icon: ICONS.election,
          //     },
          //   ],
          // },

          // {
          //   subheader: t('VOTING SLIP'),
          //   path: paths.dashboard.votingSlip,
          //   icon: ICONS.votingSlip,
          //   items: [
          //     {
          //       title: t('VOTING SLIP'),
          //       path: paths.dashboard.votingSlip.new,
          //       icon: ICONS.voterSlip,
          //     },
          //   ],
          // },

          {
            subheader: t('ATTPL EMS FEATURES'),
            path: paths.dashboard.ambulancetrip.root,
            icon: ICONS.voterSlip,
            items: [
              {
                title: t('ATTPL EMS FEATURES'),
                path: paths.dashboard.Appointment.new,
                icon: ICONS.partyManagement,
                children: [
                  {
                    title: t('CANDIDATE PROFILE LIBRARY'),
                    path: paths.dashboard.candidateLibrary.list,
                  },
                  {
                    title: t('COMPLAINT SECTION'),
                    path: paths.dashboard.ComplaintForm.new,
                    // icon: ICONS.complaintForm,
                  },
                  {
                    title: t('MY ELECTION DETAILS'),
                    path: paths.dashboard.voterview.details,
                    // icon: ICONS.election,
                  },
                  {
                    title: t('VOTING SLIP'),
                    path: paths.dashboard.votingSlip.new,
                    // icon: ICONS.voterSlip,
                  },
                  // {
                  //   subheader: t('YOUR LEADER WORK FOR YOU'),
                  //   path: paths.dashboard.ambulancetrip.root,
                  //   icon: ICONS.ambulance,
                  //   items: [
                  {
                    title: t(' LEADER WORK FOR YOU'),
                    path: paths.dashboard.Appointment.card,
                    // icon: ICONS.partyManagement,
                    children: [
                      { title: t('BOOK APPOINTMENT '), path: paths.dashboard.Appointment.card },
                      // {
                      //   title: t('CREATE YOUR DESIRE'),
                      //   path: paths.dashboard.Appointment.new,
                      //   icon: ICONS.voterSlip,
                      // },
                      {
                        title: t('DESIRE PROGRESS'),
                        path: paths.dashboard.Desire.card,
                        // icon: ICONS.voterSlip,
                      },

                      //   ],
                      // },
                    ],
                  },
                ],
              },
            ],
          },
          {
            subheader: t('DELIVERY MANAGEMENT SERVICE'),
            path: paths.dashboard.deliveryService.root,
            icon: ICONS.voterSlip,
            items: [
              {
                title: t('DELIVERY MANAGEMENT SERVICE'),
                path: paths.dashboard.deliveryService.new,
                icon: ICONS.partyManagement,
                children: [
                  {
                    title: t('NEW BOOK'),
                    path: paths.dashboard.deliveryService.new,
                  },
                  {
                    title: t('LIST ALL BOOKING'),
                    path: paths.dashboard.deliveryService.list,
                    // icon: ICONS.complaintForm,
                  },
                  // {
                  //   subheader: t('YOUR LEADER WORK FOR YOU'),
                  //   path: paths.dashboard.ambulancetrip.root,
                  //   icon: ICONS.ambulance,
                  //   items: [
                ],
              },
            ],
          },

          {
            subheader: t('CAREER ROADMAP'),
            path: paths.dashboard,
            icon: ICONS.ambulance,
            items: [
              {
                title: t(' CAREER ROADMAP'),
                path: paths.dashboard.Appointment.card,
                icon: ICONS.partyManagement,
                children: [
                  {
                    title: t('STUDENT CAREER ROADMAP'),
                    path: paths.dashboard.StudentCareer.new,
                    // icon: ICONS.students,
                  },

                  {
                    title: t('FARMER CAREER ROADMAP'),
                    path: paths.dashboard.FarmerService.new,
                    // icon: ICONS.farmer,
                  },

                  {
                    title: t('GET LABOUR JOB'),
                    path: paths.dashboard.labour_job_portal.list,
                    // icon: ICONS.labourJob,
                  },

                  {
                    title: t('BUSINESS CAREER ROADMAP'),
                    path: paths.dashboard.BussinessRoadmap.new,
                    // icon: ICONS.careers,
                  },

                  // {
                  //   subheader: t('WOMEN EMPOWERMENT'),
                  //   path: paths.dashboard.WomanEmpourment.new,
                  //   icon: ICONS.womanEmpowerment,
                  //   items: [
                  {
                    title: t('WOMEN EMPOWERMENT'),
                    path: paths.dashboard.WomanEmpourment.new,
                    // icon: ICONS.womanEmpowerment,
                  },
                  //   ],
                  // },
                  // {
                  //   subheader: t('GOVT EMPLOYMENT DESIRE'),
                  //   path: paths.dashboard.GovtService.list,
                  //   icon: ICONS.govtService,
                  //   items: [
                  {
                    title: t('GOVT EMPLOYMENT DESIRE'),
                    path: paths.dashboard.GovtService.list,
                    // icon: ICONS.govtService,
                  },
                  //   ],
                  // },
                ],
              },
            ],
          },

          // {

          //   subheader: t('STUDENT CAREER'),
          //   path: paths.dashboard.StudentCareer,
          //   icon: ICONS.students,
          //   items: [
          //     {
          //       title: t('STUDENT CAREER ROADMAP'),
          //       path: paths.dashboard.StudentCareer.new,
          //       icon: ICONS.students,
          //     },
          //   ],
          // },
          // {
          //   subheader: t('FARMER SERVICE'),
          //   path: paths.dashboard.FarmerService,
          //   icon: ICONS.farmer,
          //   items: [
          //     {
          //       title: t('FARMER CAREER ROADMAP'),
          //       path: paths.dashboard.FarmerService.new,
          //       icon: ICONS.farmer,
          //     },
          //   ],
          // },
          // {
          //   subheader: t('LABOUR JOB PORTAL'),
          //   path: paths.dashboard.labour_job_portal.root,
          //   icon: ICONS.labourJob,
          //   items: [
          //     {
          //       title: t('LABOUR JOB PORTAL'),
          //       path: paths.dashboard.labour_job_portal.list,
          //       icon: ICONS.labourJob,
          //     },
          //   ],
          // },
          // {
          //   subheader: t('APPLY FOR JOB'),
          //   // path: 'https://forms.zohopublic.in/ashokatodaytechnologyprivate/form/JobApplicationForm/formperma/-opI4SCwg70V7eDGMl7i2Dw9urIeB1aLhll0ctGOKdI',
          //   path: '/apply-for-job',
          //   icon: ICONS.trip,
          //   items: [
          //     {
          //       title: t('APPLY FOR JOB'),
          //       // path: 'https://forms.zohopublic.in/ashokatodaytechnologyprivate/form/JobApplicationForm/formperma/-opI4SCwg70V7eDGMl7i2Dw9urIeB1aLhll0ctGOKdI',
          //      path: '/apply-for-job',
          //       icon: ICONS.trip,
          //     },
          //   ],
          // },
          {
            subheader: t('APPLY FOR JOB'),
            path: paths.dashboard.applyForJob,
            icon: ICONS.trip,
            items: [
              {
                title: t('APPLY FOR JOB'),
                path: paths.dashboard.applyForJob.new,
                icon: ICONS.trip,
              },
            ],
          },

          // {
          //   subheader: t('WOMEN EMPOWERMENT'),
          //   path: paths.dashboard.WomanEmpourment.new,
          //   icon: ICONS.womanEmpowerment,
          //   items: [
          //     {
          //       title: t('WOMEN EMPOWERMENT'),
          //       path: paths.dashboard.WomanEmpourment.new,
          //       icon: ICONS.womanEmpowerment,
          //     },
          //   ],
          // },
          // {
          //   subheader: t('GOVT EMPLOYMENT DESIRE'),
          //   path: paths.dashboard.GovtService.list,
          //   icon: ICONS.govtService,
          //   items: [
          //     {
          //       title: t('GOVT EMPLOYMENT DESIRE'),
          //       path: paths.dashboard.GovtService.list,
          //       icon: ICONS.govtService,
          //     },
          //   ],
          // },

          // {
          //   subheader: t('BUSINESS CAREER ROADMAP'),
          //   path: paths.dashboard.BussinessRoadmap,
          //   icon: ICONS.careers,
          //   items: [
          //     {
          //       title: t('BUSINESS CAREER ROADMAP'),
          //       path: paths.dashboard.BussinessRoadmap.new,
          //       icon: ICONS.careers,
          //     },
          //   ],
          // },

          // {
          //   title: t('GOVERNMENT SCHEME'),
          //   path: paths.dashboard.GovtScheme,
          //   icon: ICONS.careers,

          //   children: [
          //     {
          //       title: t('GOVERNMENT BENIFITS'),
          //       path: paths.dashboard.GovtScheme.new,
          //       icon: ICONS.adminchat,
          //     },
          //     {
          //       title: t('NATIONAL PROJECTS'),
          //       path: paths.dashboard.user_project.list,
          //       icon: ICONS.kanban,
          //     },

          //     {
          //       title: t('TOUR & TRAVELS'),
          //       path: paths.dashboard.TourAndTravels.new,
          //       icon: ICONS.TourAndTravels,
          //     },
          //   ],
          // },

          {
            subheader: t('GOVERNMENT SCHEME'),
            path: paths.dashboard.GovtScheme,
            icon: ICONS.careers,
            items: [
              {
                title: t(' GOVERNMENT SCHEME'),
                path: paths.dashboard.GovtScheme.new,
                icon: ICONS.adminchat,
                children: [
                  // {
                  //   subheader: t('NATIONAL PROJECTS'),
                  //   path: paths.dashboard.user_project.list,
                  //   icon: ICONS.kanban,
                  //   items: [
                  {
                    title: t('GOVERNMENT BENIFITS'),
                    path: paths.dashboard.GovtScheme.new,
                    // icon: ICONS.adminchat,
                  },
                  {
                    title: t('NATIONAL PROJECTS'),
                    path: paths.dashboard.user_project.list,
                    // icon: ICONS.kanban,
                  },
                  //   ],
                  // }
                  // {
                  //   subheader: t('TOUR AND TRAVELS'),
                  //   path: paths.dashboard.TourAndTravels,
                  //   icon: ICONS.TourAndTravels,
                  //   items: [
                  {
                    title: t('TOUR & TRAVELS'),
                    path: paths.dashboard.TourAndTravels.new,
                    // icon: ICONS.TourAndTravels,
                  },
                ],
              },
              //   ],
              // },
            ],
          },

          // {
          //   subheader: t('GOVERNMENT BENIFITS'),
          //   path: paths.dashboard.GovtScheme,
          //   icon: ICONS.careers,
          //   items: [
          //     {
          //       title: t('GOVERNMENT BENIFITS'),
          //       path: paths.dashboard.GovtScheme.new,
          //       icon: ICONS.adminchat,
          //     },
          //   ],
          // },

          // {
          //   subheader: t('TOUR AND TRAVELS'),
          //   path: paths.dashboard.TourAndTravels,
          //   icon: ICONS.TourAndTravels,
          //   items: [
          //     {
          //       title: t('TOUR & TRAVELS'),
          //       path: paths.dashboard.TourAndTravels.new,
          //       icon: ICONS.TourAndTravels,
          //     },
          //   ],
          // },
          // {
          //   subheader: t('BOOK DOCTOR  APPOINTMENT '),
          //   path: paths.dashboard.Appointmenttodoctor.card,
          //   icon: ICONS.partyManagement,
          //   items: [
          //     {
          //       title: t('BOOK DOCTOR APPOINTMENT'),
          //       path: paths.dashboard.Appointmenttodoctor.card,
          //       icon: ICONS.bulk,
          //     },],
          // },
          // {
          //   subheader: t('BOOK AMBULANCE '),
          //   path: paths.dashboard.ambulancetrip.new,
          //   icon: ICONS.ambulance,
          //   items: [
          //     {
          //       title: t('BOOK AMBULANCE '),
          //       path: paths.dashboard.ambulancetrip.new,
          //       icon: ICONS.ambulance,
          //     },
          //   ],
          // },

          // {
          //   subheader: t('AMBULANCE LIST'),
          //   path: paths.dashboard.ambulancetrip.requestedList,
          //   icon: ICONS.ambulance,
          //   items: [
          //     {
          //       title: t('AMBULANCE LIST'),
          //       path: paths.dashboard.ambulancetrip.requestedList,
          //       icon: ICONS.trip,
          //     },
          //   ],
          // },
          // {
          //   subheader: t('BOOK AMBULANCE'),
          //   path: paths.dashboard.callAmbulance.new,
          //   icon: ICONS.ambulance,
          //   items: [
          //     {
          //       title: t('BOOK AMBULANCE'),
          //       path: paths.dashboard.callAmbulance.new,
          //       icon: ICONS.ambulance,
          //     },
          //   ],
          // },
          {
            subheader: t('ATTPL'),
            // path: paths.dashboard.GovtScheme,
            icon: ICONS.careers,
            items: [
              {
                title: t(' ATTPL'),
                path: paths.dashboard.GovtScheme.new,
                icon: ICONS.trip,
                children: [
                  {
                    title: t('ATTPL COUNSULTANCY'),
                    path: paths.dashboard.attpl.consultancy,
                    // icon: ICONS.pollingManagement,
                  },
                  {
                    title: t('ATTPL SOLAR'),
                    path: paths.dashboard.attpl.solar,
                    // icon: ICONS.trip,
                  },
                  {
                    title: t('ATTPL FINANCE'),
                    path: paths.dashboard.attpl.finance,
                    // icon: ICONS.partyAllianceManagement,
                  },
                  {
                    title: t('ATTPL IT'),
                    path: paths.dashboard.attpl.it,
                    // icon: ICONS.bulk,
                  },
                  {
                    title: t('ATTPL INFRASTRUCUTE'),
                    path: paths.dashboard.attpl.infra,
                    // icon: ICONS.kanban,
                  },
                  {
                    title: t('ATTPL STONE & MINERIALS'),
                    path: paths.dashboard.attpl.stone,
                    // icon: ICONS.modalManagement,
                  },
                ],
              },
              //   ],
              // },
            ],
          },

          // {
          //   subheader: t('ATTPL COUNSULTANCY'),
          //   path: 'https://attplconsultancy.com/',
          //   icon: ICONS.pollingManagement,
          //   items: [
          //     {
          //       title: t('ATTPL COUNSULTANCY'),
          //       path: paths.dashboard.attpl.consultancy,
          //       icon: ICONS.pollingManagement,
          //     },
          //   ],
          // },

          // {
          //   subheader: t('ATTPL SOLAR'),
          //   path: paths.dashboard.attpl.consultancy,
          //   icon: ICONS.trip,
          //   items: [
          //     {
          //       title: t('ATTPL SOLAR'),
          //       path: paths.dashboard.attpl.solar,
          //       icon: ICONS.trip,
          //     },
          //   ],
          // },
          // {
          //   subheader: t('ATTPL FINANCE'),
          //   path: paths.dashboard.attpl.consultancy,
          //   icon: ICONS.partyAllianceManagement,
          //   items: [
          //     {
          //       title: t('ATTPL FINANCE'),
          //       path: paths.dashboard.attpl.finance,
          //       icon: ICONS.partyAllianceManagement,
          //     },
          //   ],
          // },
          // {
          //   subheader: t('ATTPL IT'),
          //   path: 'https://attplit.com/',
          //   icon: ICONS.bulk,
          //   items: [
          //     {
          //       title: t('ATTPL IT'),
          //       path: paths.dashboard.attpl.it,
          //       icon: ICONS.bulk,
          //     },
          //   ],
          // },
          // {
          //   subheader: t('ATTPL INFRASTRUCUTE'),
          //   path: 'https://attplinfra.com/',
          //   icon: ICONS.kanban,
          //   items: [
          //     {
          //       title: t('ATTPL INFRASTRUCUTE'),
          //       path: paths.dashboard.attpl.infra,
          //       icon: ICONS.kanban,
          //     },
          //   ],
          // },
          // {
          //   subheader: t('ATTPL STONE & MINERIALS'),
          //   path: 'https://attplstone.com/',
          //   icon: ICONS.modalManagement,
          //   items: [
          //     {
          //       title: t('ATTPL STONE & MINERIALS'),
          //       path: paths.dashboard.attpl.stone,
          //       icon: ICONS.modalManagement,
          //     },
          //   ],
          // },
          // {
          //   subheader: t('ATTPL TRANSPORT'),
          //   path: 'https://attpltransport.com/',
          //   icon: ICONS.vehicle,
          //   items: [
          //     {
          //       title: t('ATTPL TRANSPORT'),
          //       path: 'https://attpltransport.com/',
          //       icon: ICONS.vehicle,
          //     },
          //   ],
          // },
          // {
          //   subheader: t('AMBULANCE LIST'),
          //   path: paths.dashboard.callAmbulance.requestedList,
          //   icon: ICONS.ambulance,
          //   items: [
          //     {
          //       title: t('AMBULANCE LIST'),
          //       path: paths.dashboard.callAmbulance.requestedList,
          //       icon: ICONS.trip,
          //     },
          //   ],
          // },

          {
            subheader: t('SURVEY FORM'),
            path: paths.dashboard.fill_survey.root,
            icon: ICONS.userRoleManagement,
            items: [
              {
                title: t('SURVEY FORM'),
                path: paths.dashboard.fill_survey.new,
                icon: ICONS.userRoleManagement,
              },
            ],
          },
          {
            subheader: t('SUGGESTION BOX'),
            path: paths.dashboard.FeedbackPage.new,
            icon: ICONS.complaintForm,

            items: [
              {
                title: t('SUGGESTION BOX'),
                path: paths.dashboard.FeedbackPage.new,
                icon: ICONS.complaintForm,
              },
            ],
          },

          {
            subheader: t('GALLERY'),
            path: paths.dashboard.OverviewGalleryView.root,
            icon: ICONS.electionManagement,
            items: [
              {
                title: t('GALLERY'),
                path: paths.dashboard.OverviewGalleryView.root,
                icon: ICONS.electionManagement,
              },
            ],
          },

          // HEALTH SERVICE CREATED BY AYAZ
          {
            subheader: t('HEALTH SERVICES'),
            // path: paths.dashboard.GovtScheme,
            icon: ICONS.careers,
            items: [
              {
                title: t(' HEALTH SERVICES'),
                path: paths.dashboard.emergencyServices.root,
                icon: ICONS.ambulance,
                children: [
                  {
                    title: t('BOOK DOCTOR APPOINTMENT'),
                    path: paths.dashboard.Appointmenttodoctor.card,
                    // icon: ICONS.bulk,
                  },
                  {
                    title: t('BOOK AMBULANCE '),
                    path: paths.dashboard.ambulancetrip.new,
                    // icon: ICONS.ambulance,
                  },
                  {
                    title: t('AMBULANCE LIST'),
                    path: paths.dashboard.ambulancetrip.requestedList,
                    // icon: ICONS.trip,
                  },
                  {
                    title: t('HEALTH TIPS'),
                    path: paths.dashboard.ambulancetrip.requestedList,
                    // icon: ICONS.trip,
                  },
                ],
              },
            ],
          },

          {
            subheader: t('EMERGENCY SERVICES'),
            path: paths.dashboard.GovtScheme,
            icon: ICONS.careers,
            items: [
              {
                title: t(' EMERGENCY SERVICES'),
                path: paths.dashboard.emergencyServices.root,
                icon: ICONS.ambulance,
                children: [
                  {
                    title: t('EMERGENCY HELPLINE NUMBER'),
                    path: paths.dashboard.emergencyServices.root,
                    // icon: ICONS.ambulance,
                  },

                  {
                    title: t('BOOK AMBULANCE '),
                    path: paths.dashboard.ambulancetrip.new,
                    // icon: ICONS.ambulance,
                  },
                  {
                    title: t('AMBULANCE LIST'),
                    path: paths.dashboard.ambulancetrip.requestedList,
                    // icon: ICONS.trip,
                  },
                  // {
                  //   title: t('EMERGENCY AMBULANCE SERVICES'),
                  //   path: paths.dashboard.ambulancetrip.cards,
                  //   icon: ICONS.ambulance,
                  // },
                ],
              },
            ],
          }

          // {
          //   subheader: t('EMERGENCY SERVICES'),
          //   path: paths.dashboard.emergencyServices.root,
          //   icon: ICONS.ambulance,
          //   items: [
          //     {
          //       title: t('EMERGENCY SERVICES'),
          //       path: paths.dashboard.emergencyServices.root,
          //       icon: ICONS.ambulance,
          //     },
          //   ],
          // },
          // {
          //   title: t('SUGGESTION BOX'),
          //   path: paths.dashboard.FeedbackPage.new,
          //   icon: ICONS.complaintForm,
          //   // items: [
          //   //   {
          //   //     title: t('Suggestion Box'),
          //   //     path: paths.dashboard.FeedbackPage.new,
          //   //     icon: ICONS.complaintForm,
          //   //   },
          //   // ],
          // },
          // {
          //   title: t('GALLERY'),
          //   path: paths.dashboard.OverviewGalleryView.root,
          //   icon: ICONS.electionManagement,
          //   // children: [{ title: t('All Templates'), path: paths.dashboard.templateLibrary.root }],
          // },
          // {
          //   title: t('EMERGENCY SERVICES'),
          //   path: paths.dashboard.emergencyServices.root,
          //   icon: ICONS.ambulance,
          // },

          // {
          //   subheader: t('GOVERNMENT SERVICE'),
          //   path: paths.dashboard.GovtService,
          //   icon: ICONS.farmer,
          //   items: [
          //     {
          //       title: t('GOVERNMENT SERVICES ROADMAP'),
          //       path: paths.dashboard.GovtService.new,
          //       icon: ICONS.farmer,
          //     },
          //   ],
          // },

          // {
          //   subheader: t('NATIONAL PROJECTS'),
          //   path: paths.dashboard.user_project.list,
          //   icon: ICONS.kanban,
          //   items: [
          //     {
          //       title: t('NATIONAL PROJECTS'),
          //       path: paths.dashboard.user_project.list,
          //       icon: ICONS.kanban,
          //     },
          //   ],
          // }
          // {
          //   subheader: t('FEEDBACK FORM'),
          //   path: paths.dashboard.FeedbackPage.root,
          //   icon: ICONS.complaintForm,
          //   items: [
          //     {
          //       title: t('FEEDBACK FORM'),
          //       path: paths.dashboard.FeedbackPage.new,
          //       icon: ICONS.complaintForm,
          //     },
          //   ],
          // },
        );
        break;
      case 'Institution Owner':
        sections.push(
          {
            subheader: t('ADD INSTITUTION '),
            path: paths.dashboard.StudentCareer.instituteNew,
            icon: ICONS.Institution,
            items: [
              {
                title: t('ADD INSTITUTION'),
                path: paths.dashboard.StudentCareer.instituteNew,
                icon: ICONS.Institution,
              },
            ],
          },

          {
            subheader: t('MY INSTITUTION'),
            items: [
              {
                title: t('INSTITUTION LIST'),
                path: paths.dashboard.StudentCareer.instituteList,
                icon: ICONS.InstitutionList,
              },
            ],
          },

          {
            subheader: t('MY INSTITUTION'),
            items: [
              {
                title: t('INTERESTED STUDENTS'),
                path: paths.dashboard.StudentCareer.interestedStudentList,
                icon: ICONS.InstitutionList,
              },
            ],
          },

          {
            subheader: t('SEE ALL FEATURE'),
            path: paths.dashboard.GovtScheme,
            icon: ICONS.SeeAllFeatures,
            items: [
              {
                title: t('SEE ALL FEATURE'),
                path: paths.dashboard.GovtScheme.new,
                icon: ICONS.SeeAllFeatures,
                children: [
                  // govt in your hand
                  {
                    title: t('GOVT IN YOUR HAND'),
                    path: paths.dashboard.GovtScheme.new,
                    icon: ICONS.govtService,
                    children: [
                      {
                        title: t('GOVERNMENT BENIFITS'),
                        path: paths.dashboard.GovtScheme.new,
                        icon: ICONS.adminchat,
                      },
                      {
                        title: t('COMPLAINT SECTION'),
                        path: paths.dashboard.ComplaintForm.new,
                        icon: ICONS.complaintForm,
                      },
                    ],
                  },
                  // career route map
                  {
                    title: t(' CAREER ROADMAP'),
                    path: paths.dashboard.Appointment.card,
                    icon: ICONS.partyManagement,
                    children: [
                      {
                        title: t('STUDENT CAREER ROADMAP'),
                        path: paths.dashboard.StudentCareer.new,
                        icon: ICONS.students,
                      },

                      {
                        title: t('FARMER CAREER ROADMAP'),
                        path: paths.dashboard.FarmerService.new,
                        icon: ICONS.farmer,
                      },

                      {
                        title: t('GET LABOUR JOB'),
                        path: paths.dashboard.labour_job_portal.list,
                        icon: ICONS.labourJob,
                      },

                      {
                        title: t('BUSINESS CAREER ROADMAP'),
                        path: paths.dashboard.BussinessRoadmap.new,
                        icon: ICONS.careers,
                      },

                      {
                        title: t('WOMEN EMPOWERMENT'),
                        path: paths.dashboard.WomanEmpourment.new,
                        icon: ICONS.womanEmpowerment,
                      },
                      {
                        title: t('GOVT EMPLOYMENT DESIRE'),
                        path: paths.dashboard.GovtService.list,
                        icon: ICONS.govtService,
                      },
                    ],
                  },

                  // apply for job
                  {
                    title: t('APPLY FOR JOB'),
                    path: paths.dashboard.applyForJob.new,
                    icon: ICONS.ApplyForJob,
                  },

                  // apply for industry
                  {
                    title: t('APPLY FOR INDUSTRIES'),
                    path: paths.dashboard.applyForIndustries.new,
                    icon: ICONS.ApplyForIndustry,
                  },

                  // property route
                  {
                    title: t('PROPERTY BUY OR SELL'),
                    path: paths.dashboard.propertBuySell.new,
                    icon: ICONS.pollingManagement,
                  },

                  // attpl service
                  {
                    title: t(' ATTPL SERVICES'),
                    path: paths.dashboard.GovtScheme.new,
                    icon: ICONS.trip,
                    children: [
                      {
                        title: t('ATTPL COUNSULTANCY'),
                        path: paths.dashboard.attpl.consultancy,
                        icon: ICONS.pollingManagement,
                      },
                      {
                        title: t('ATTPL IT'),
                        path: paths.dashboard.attpl.it,
                        icon: ICONS.bulk,
                      },
                      {
                        title: t('ATTPL FINANCE'),
                        path: paths.dashboard.attpl.finance,
                        icon: ICONS.partyAllianceManagement,
                      },
                      {
                        title: t('ATTPL SOLAR'),
                        path: paths.dashboard.attpl.solar,
                        icon: ICONS.trip,
                      },
                      {
                        title: t('ATTPL INFRASTRUCUTE'),
                        path: paths.dashboard.attpl.infra,
                        icon: ICONS.kanban,
                      },
                      {
                        title: t('ATTPL STONE & MINERIALS'),
                        path: paths.dashboard.attpl.stone,
                        icon: ICONS.modalManagement,
                      },
                    ],
                  },

                  // natinal project
                  {
                    title: t('NATIONAL PROJECTS'),
                    path: paths.dashboard.user_project.list,
                    icon: ICONS.kanban,
                  },

                  // tour and travels
                  {
                    title: t('TOUR & TRAVELS'),
                    path: paths.dashboard.TourAndTravels.new,
                    icon: ICONS.TourAndTravels,
                  },

                  // survey form
                  {
                    title: t('SURVEY FORM'),
                    path: paths.dashboard.fill_survey.new,
                    icon: ICONS.userRoleManagement,
                  },

                  // suggestion box
                  {
                    title: t('SUGGESTION BOX'),
                    path: paths.dashboard.FeedbackPage.new,
                    icon: ICONS.complaintForm,
                  },

                  // galary
                  {
                    title: t('GALLERY'),
                    path: paths.dashboard.OverviewGalleryView.root,
                    icon: ICONS.electionManagement,
                  },

                  // health service
                  {
                    title: t(' HEALTH SERVICES'),
                    path: paths.dashboard.emergencyServices.root,
                    icon: ICONS.HealthService,
                    children: [
                      {
                        title: t('BOOK DOCTOR APPOINTMENT'),
                        path: paths.dashboard.Appointmenttodoctor.card,
                        icon: ICONS.bulk,
                      },
                      {
                        title: t('BOOK AMBULANCE '),
                        path: paths.dashboard.ambulancetrip.new,
                        icon: ICONS.ambulance,
                      },
                      {
                        title: t('AMBULANCE LIST'),
                        path: paths.dashboard.ambulancetrip.requestedList,
                        icon: ICONS.trip,
                      },
                      {
                        title: t('HEALTH TIPS'),
                        path: paths.dashboard.ambulancetrip.healthTips,
                        icon: ICONS.trip,
                      },
                      {
                        title: t('DOCTER SERVICES'),
                        path: paths.dashboard.ambulancetrip.docterCards,
                        icon: ICONS.bulk,
                      },
                    ],
                  },

                  // emergancy service
                  {
                    title: t(' EMERGENCY SERVICES'),
                    path: paths.dashboard.emergencyServices.root,
                    icon: ICONS.EmergencyService,
                    children: [
                      {
                        title: t('EMERGENCY HELPLINE NUMBER'),
                        path: paths.dashboard.emergencyServices.root,
                        icon: ICONS.ambulance,
                      },

                      {
                        title: t('BOOK AMBULANCE '),
                        path: paths.dashboard.ambulancetrip.new,
                        icon: ICONS.ambulance,
                      },
                      {
                        title: t('AMBULANCE LIST'),
                        path: paths.dashboard.ambulancetrip.requestedList,
                        icon: ICONS.trip,
                      },
                      {
                        title: t('EMERGENCY AMBULANCE SERVICES'),
                        path: paths.dashboard.ambulancetrip.cards,
                        icon: ICONS.ambulance,
                      },
                    ],
                  },

                  // support ticket
                  {
                    title: t('SUPPORT TICKET LIST DETAILS'),
                    icon: ICONS.sms,
                    path: paths.dashboard.sms.root,
                  },

                  // chat with friends
                  {
                    title: t("CHAT WITH FRIEND"),
                    path: paths.dashboard.chat,
                    icon: ICONS.ChatWithFriends,
                  },

                  // add new user
                  {
                    title: t('ADD NEW USER'),
                    path: paths.dashboard.voter.new,
                    icon: ICONS.AddNewUser,
                  },
                ],
              },
            ],
          }
        );
        break;
      case 'Doctor':
        sections.push(
          {
            subheader: t('BOOK DOCTOR APPOINTMENT'),
            items: [
              {
                title: t('BOOK DOCTOR APPOINTMENT'),
                path: paths.dashboard.Appointmenttodoctor.card,
                icon: ICONS.bulk,
              },
              {
                title: t('BOOK AMBULANCE '),
                path: paths.dashboard.ambulancetrip.new,
                icon: ICONS.ambulance,
              },
              {
                title: t('AMBULANCE LIST'),
                path: paths.dashboard.ambulancetrip.requestedList,
                icon: ICONS.trip,
              },
              {
                title: t('HEALTH TIPS'),
                path: paths.dashboard.ambulancetrip.healthTips,
                icon: ICONS.trip,
              },
              {
                title: t('DOCTER SERVICES'),
                path: paths.dashboard.ambulancetrip.docterCards,
                icon: ICONS.bulk,
              },
            ],
          },
          {
            subheader: t('SEE ALL FEATURE'),
            path: paths.dashboard.GovtScheme,
            icon: ICONS.govtService,
            items: [
              {
                title: t('SEE ALL FEATURE'),
                path: paths.dashboard.GovtScheme.new,
                icon: ICONS.govtService,
                children: [
                  // govt in your hand
                  {
                    title: t('GOVT IN YOUR HAND'),
                    path: paths.dashboard.GovtScheme.new,
                    icon: ICONS.govtService,
                    children: [
                      {
                        title: t('GOVERNMENT BENIFITS'),
                        path: paths.dashboard.GovtScheme.new,
                        icon: ICONS.adminchat,
                      },
                      {
                        title: t('COMPLAINT SECTION'),
                        path: paths.dashboard.ComplaintForm.new,
                        icon: ICONS.complaintForm,
                      },
                    ],
                  },
                  // career route map
                  {
                    title: t(' CAREER ROADMAP'),
                    path: paths.dashboard.Appointment.card,
                    icon: ICONS.partyManagement,
                    children: [
                      {
                        title: t('STUDENT CAREER ROADMAP'),
                        path: paths.dashboard.StudentCareer.new,
                        icon: ICONS.students,
                      },

                      {
                        title: t('FARMER CAREER ROADMAP'),
                        path: paths.dashboard.FarmerService.new,
                        icon: ICONS.farmer,
                      },

                      {
                        title: t('GET LABOUR JOB'),
                        path: paths.dashboard.labour_job_portal.list,
                        icon: ICONS.labourJob,
                      },

                      {
                        title: t('BUSINESS CAREER ROADMAP'),
                        path: paths.dashboard.BussinessRoadmap.new,
                        icon: ICONS.careers,
                      },

                      {
                        title: t('WOMEN EMPOWERMENT'),
                        path: paths.dashboard.WomanEmpourment.new,
                        icon: ICONS.womanEmpowerment,
                      },
                      {
                        title: t('GOVT EMPLOYMENT DESIRE'),
                        path: paths.dashboard.GovtService.list,
                        icon: ICONS.govtService,
                      },
                    ],
                  },

                  // apply for job
                  {
                    title: t('APPLY FOR JOB'),
                    path: paths.dashboard.applyForJob.new,
                    icon: ICONS.trip,
                  },

                  // apply for industry
                  {
                    title: t('APPLY FOR INDUSTRIES'),
                    path: paths.dashboard.applyForIndustries.new,
                    icon: ICONS.trip,
                  },

                  // property route
                  {
                    title: t('PROPERTY BUY OR SELL'),
                    path: paths.dashboard.propertBuySell.new,
                    icon: ICONS.pollingManagement,
                  },

                  // attpl service
                  {
                    title: t(' ATTPL SERVICES'),
                    path: paths.dashboard.GovtScheme.new,
                    icon: ICONS.trip,
                    children: [
                      {
                        title: t('ATTPL COUNSULTANCY'),
                        path: paths.dashboard.attpl.consultancy,
                        icon: ICONS.pollingManagement,
                      },
                      {
                        title: t('ATTPL IT'),
                        path: paths.dashboard.attpl.it,
                        icon: ICONS.bulk,
                      },
                      {
                        title: t('ATTPL FINANCE'),
                        path: paths.dashboard.attpl.finance,
                        icon: ICONS.partyAllianceManagement,
                      },
                      {
                        title: t('ATTPL SOLAR'),
                        path: paths.dashboard.attpl.solar,
                        icon: ICONS.trip,
                      },
                      {
                        title: t('ATTPL INFRASTRUCUTE'),
                        path: paths.dashboard.attpl.infra,
                        icon: ICONS.kanban,
                      },
                      {
                        title: t('ATTPL STONE & MINERIALS'),
                        path: paths.dashboard.attpl.stone,
                        icon: ICONS.modalManagement,
                      },
                    ],
                  },

                  // natinal project
                  {
                    title: t('NATIONAL PROJECTS'),
                    path: paths.dashboard.user_project.list,
                    icon: ICONS.kanban,
                  },

                  // tour and travels
                  {
                    title: t('TOUR & TRAVELS'),
                    path: paths.dashboard.TourAndTravels.new,
                    icon: ICONS.TourAndTravels,
                  },

                  // survey form
                  {
                    title: t('SURVEY FORM'),
                    path: paths.dashboard.fill_survey.new,
                    icon: ICONS.userRoleManagement,
                  },

                  // suggestion box
                  {
                    title: t('SUGGESTION BOX'),
                    path: paths.dashboard.FeedbackPage.new,
                    icon: ICONS.complaintForm,
                  },

                  // galary
                  {
                    title: t('GALLERY'),
                    path: paths.dashboard.OverviewGalleryView.root,
                    icon: ICONS.electionManagement,
                  },

                  // Health Service
                  // {
                  //   title: t(' HEALTH SERVICES'),
                  //   path: paths.dashboard.emergencyServices.root,
                  //   icon: ICONS.ambulance,
                  //   children: [
                  //     {
                  //       title: t('BOOK DOCTOR APPOINTMENT'),
                  //       path: paths.dashboard.Appointmenttodoctor.card,
                  //       icon: ICONS.bulk,
                  //     },
                  //     {
                  //       title: t('BOOK AMBULANCE '),
                  //       path: paths.dashboard.ambulancetrip.new,
                  //       icon: ICONS.ambulance,
                  //     },
                  //     {
                  //       title: t('AMBULANCE LIST'),
                  //       path: paths.dashboard.ambulancetrip.requestedList,
                  //       icon: ICONS.trip,
                  //     },
                  //     {
                  //       title: t('HEALTH TIPS'),
                  //       path: paths.dashboard.ambulancetrip.healthTips,
                  //       icon: ICONS.trip,
                  //     },
                  //     {
                  //       title: t('DOCTER SERVICES'),
                  //       path: paths.dashboard.ambulancetrip.docterCards,
                  //       icon: ICONS.bulk,
                  //     },
                  //   ],
                  // },

                  // emergancy service
                  {
                    title: t(' EMERGENCY SERVICES'),
                    path: paths.dashboard.emergencyServices.root,
                    icon: ICONS.ambulance,
                    children: [
                      {
                        title: t('EMERGENCY HELPLINE NUMBER'),
                        path: paths.dashboard.emergencyServices.root,
                        icon: ICONS.ambulance,
                      },

                      {
                        title: t('BOOK AMBULANCE '),
                        path: paths.dashboard.ambulancetrip.new,
                        icon: ICONS.ambulance,
                      },
                      {
                        title: t('AMBULANCE LIST'),
                        path: paths.dashboard.ambulancetrip.requestedList,
                        icon: ICONS.trip,
                      },
                      {
                        title: t('EMERGENCY AMBULANCE SERVICES'),
                        path: paths.dashboard.ambulancetrip.cards,
                        icon: ICONS.ambulance,
                      },
                    ],
                  },

                  // support ticket
                  {
                    title: t('SUPPORT TICKET LIST DETAILS'),
                    icon: ICONS.sms,
                    path: paths.dashboard.sms.root,
                  },

                  // chat with friends
                  {
                    title: t("CHAT WITH FRIEND"),
                    path: paths.dashboard.chat,
                    icon: ICONS.election,
                  },

                  // add new user
                  {
                    title: t('ADD NEW USER'),
                    path: paths.dashboard.voter.new,
                    icon: ICONS.voter,
                  },
                ],
              },
            ],
          }
        );
        break;
      case 'Employee':
        sections.push(
          {
            subheader: t('BOOK AMBULANCE '),
            path: paths.dashboard.ambulancetrip.new,
            icon: ICONS.ambulance,
            items: [
              {
                title: t('BOOK AMBULANCE '),
                path: paths.dashboard.ambulancetrip.new,
                icon: ICONS.ambulance,
              },
            ],
          },
          {
            subheader: t('AMBULANCE LIST'),
            path: paths.dashboard.ambulancetrip.requestedList,
            icon: ICONS.ambulance,
            items: [
              {
                title: t('AMBULANCE LIST'),
                path: paths.dashboard.ambulancetrip.requestedList,
                icon: ICONS.trip,
              },
            ],
          },
          {
            subheader: t('APPOINTMENT BOOKING'),
            path: paths.dashboard.Appointment.root,
            icon: ICONS.partyManagement,
            items: [
              {
                title: t('APPOINTMENT BOOKING'),
                path: paths.dashboard.Appointment.new,
                icon: ICONS.partyManagement,
              },
            ],
          },
          {
            subheader: t('BUSINESS CAREER ROADMAP'),
            path: paths.dashboard.BussinessRoadmap,
            icon: ICONS.careers,
            items: [
              {
                title: t('BUSINESS CAREER ROADMAP'),
                path: paths.dashboard.BussinessRoadmap.new,
                icon: ICONS.careers,
              },
            ],
          },
          {
            subheader: t('CANDIDATE LIBRARY'),
            path: paths.dashboard.candidateLibrary,
            icon: ICONS.adminchat,
            items: [
              {
                title: t('CANDIDATE PROFILE LIBRARY'),
                path: paths.dashboard.candidateLibrary.list,
                icon: ICONS.adminchat,
              },
            ],
          },
          {
            subheader: t('COMPLAINT SECTION'),
            path: paths.dashboard.ComplaintForm,
            icon: ICONS.complaintForm,
            items: [
              {
                title: t('COMPLAINT SECTION'),
                path: paths.dashboard.ComplaintForm.new,
                icon: ICONS.complaintForm,
              },
            ],
          },
          {
            subheader: t('ELECTION'),
            path: paths.dashboard.voterview,
            icon: ICONS.election,
            items: [
              {
                title: t('MY ELECTION DETAILS'),
                path: paths.dashboard.voterview.details,
                icon: ICONS.election,
              },
            ],
          },
          {
            subheader: t('FARMER SERVICE'),
            path: paths.dashboard.FarmerService,
            icon: ICONS.farmer,
            items: [
              {
                title: t('FARMER CAREER ROADMAP'),
                path: paths.dashboard.FarmerService.new,
                icon: ICONS.farmer,
              },
            ],
          },
          {
            subheader: t('FEEDBACK FORM'),
            path: paths.dashboard.FeedbackPage.root,
            icon: ICONS.complaintForm,
            items: [
              {
                title: t('FEEDBACK FORM'),
                path: paths.dashboard.FeedbackPage.new,
                icon: ICONS.complaintForm,
              },
            ],
          },
          {
            subheader: t('GOVERNMENT SCHEME'),
            path: paths.dashboard.GovtScheme,
            icon: ICONS.careers,
            items: [
              {
                title: t('GOVERNMENT SCHEME'),
                path: paths.dashboard.GovtScheme.new,
                icon: ICONS.adminchat,
              },
            ],
          },
          {
            subheader: t('GOVERNMENT SERVICE'),
            path: paths.dashboard.GovtService,
            icon: ICONS.farmer,
            items: [
              {
                title: t('GOVERNMENT SERVICES ROADMAP'),
                path: paths.dashboard.GovtService.new,
                icon: ICONS.farmer,
              },
            ],
          },
          {
            subheader: t('LABOUR JOB PORTAL'),
            path: paths.dashboard.labour_job_portal.root,
            icon: ICONS.labourJob,
            items: [
              {
                title: t('LABOUR JOB PORTAL'),
                path: paths.dashboard.labour_job_portal.list,
                icon: ICONS.labourJob,
              },
            ],
          },
          {
            subheader: t('NATIONAL PROJECTS'),
            path: paths.dashboard.user_project.list,
            icon: ICONS.kanban,
            items: [
              {
                title: t('NATIONAL PROJECTS'),
                path: paths.dashboard.user_project.list,
                icon: ICONS.kanban,
              },
            ],
          },
          {
            subheader: t('STUDENT CAREER'),
            path: paths.dashboard.StudentCareer,
            icon: ICONS.students,
            items: [
              {
                title: t('STUDENT CAREER ROADMAP'),
                path: paths.dashboard.StudentCareer.new,
                icon: ICONS.students,
              },
            ],
          },
          {
            subheader: t('SURVEY FORM'),
            path: paths.dashboard.fill_survey.root,
            icon: ICONS.userRoleManagement,
            items: [
              {
                title: t('SURVEY FORM'),
                path: paths.dashboard.fill_survey.new,
                icon: ICONS.userRoleManagement,
              },
            ],
          },
          {
            subheader: t('TOUR AND TRAVELS'),
            path: paths.dashboard.TourAndTravels,
            icon: ICONS.TourAndTravels,
            items: [
              {
                title: t('TOUR & TRAVELS'),
                path: paths.dashboard.TourAndTravels.new,
                icon: ICONS.TourAndTravels,
              },
            ],
          },
          {
            subheader: t('VOTER'),
            path: paths.dashboard.voter,
            icon: ICONS.voter,
            items: [
              { title: t('ADD NEW VOTER'), path: paths.dashboard.voter.new, icon: ICONS.voter },
            ],
          },
          {
            subheader: t('VOTING SLIP'),
            path: paths.dashboard.votingSlip,
            icon: ICONS.votingSlip,
            items: [
              {
                title: t('VOTING SLIP'),
                path: paths.dashboard.votingSlip.new,
                icon: ICONS.voterSlip,
              },
            ],
          },
          {
            subheader: t('WOMEN EMPOWERMENT'),
            path: paths.dashboard.WomanEmpourment.new,
            icon: ICONS.womanEmpowerment,
            items: [
              {
                title: t('WOMEN EMPOWERMENT'),
                path: paths.dashboard.WomanEmpourment.new,
                icon: ICONS.womanEmpowerment,
              },
            ],
          }
        );
        break;
      case 'Lawyer':
        sections.push(
          {
            subheader: t('complaintSection'),
            path: paths.dashboard.lawyer,
            icon: ICONS.complaintForm,
            items: [
              {
                title: t('All BOOKED CASES LIST'),
                path: paths.dashboard.LMS_case.list,
                icon: ICONS.AllBookedCases,
              },
              // {
              //   title: t('All CONTRACTS LIST'),
              //   path: paths.dashboard.LMS_contract.list,
              //   icon: ICONS.complaintForm,
              // },
              {
                title: t('ACCEPT/REJECT CASE'),
                path: paths.dashboard.LMS_case.lawyer_list,
                icon: ICONS.AcceptRejectCase,
              },
              {
                title: t('LEGAL HELP'),
                path: paths.dashboard.LMS_cards.new,
                icon: ICONS.complaintForm,
              },
              {
                title: t('YOUR DETAILS'),
                path: paths.dashboard.lawyer.my_details,
                icon: ICONS.YourDetails,
              },
            ],
          },
          // {
          //   title: t('LMS ALL LIST'),
          //   path: paths.dashboard.driver.root,
          //   icon: ICONS.complaintForm,
          //   items: [
          //     {
          //       title: t('LMS SERVICE LIST'),
          //       path: paths.dashboard.LMS_service.list,
          //       // icon: ICONS.featureManagement,
          //     },
          //     {
          //       title: t('LMS SUB SERVICE LIST'),
          //       path: paths.dashboard.LMS_sub_service.list,
          //       // icon: ICONS.featureManagement,
          //     },
          //   ],
          // },
          {
            subheader: t('SEE ALL FEATURE'),
            path: paths.dashboard.GovtScheme,
            icon: ICONS.SeeAllFeature,
            items: [
              {
                title: t('SEE ALL FEATURE'),
                path: paths.dashboard.GovtScheme.new,
                icon: ICONS.SeeAllFeature,
                children: [
                  // govt in your hand
                  {
                    title: t('GOVT IN YOUR HAND'),
                    path: paths.dashboard.GovtScheme.new,
                    icon: ICONS.govtService,
                    children: [
                      {
                        title: t('GOVERNMENT BENIFITS'),
                        path: paths.dashboard.GovtScheme.new,
                        icon: ICONS.adminchat,
                      },
                      {
                        title: t('COMPLAINT SECTION'),
                        path: paths.dashboard.ComplaintForm.new,
                        icon: ICONS.complaintForm,
                      },
                    ],
                  },
                  // career route map
                  {
                    title: t(' CAREER ROADMAP'),
                    path: paths.dashboard.Appointment.card,
                    icon: ICONS.partyManagement,
                    children: [
                      {
                        title: t('STUDENT CAREER ROADMAP'),
                        path: paths.dashboard.StudentCareer.new,
                        icon: ICONS.students,
                      },

                      {
                        title: t('FARMER CAREER ROADMAP'),
                        path: paths.dashboard.FarmerService.new,
                        icon: ICONS.farmer,
                      },

                      {
                        title: t('GET LABOUR JOB'),
                        path: paths.dashboard.labour_job_portal.list,
                        icon: ICONS.labourJob,
                      },

                      {
                        title: t('BUSINESS CAREER ROADMAP'),
                        path: paths.dashboard.BussinessRoadmap.new,
                        icon: ICONS.careers,
                      },

                      {
                        title: t('WOMEN EMPOWERMENT'),
                        path: paths.dashboard.WomanEmpourment.new,
                        icon: ICONS.womanEmpowerment,
                      },
                      {
                        title: t('GOVT EMPLOYMENT DESIRE'),
                        path: paths.dashboard.GovtService.list,
                        icon: ICONS.govtService,
                      },
                    ],
                  },

                  // apply for job
                  {
                    title: t('APPLY FOR JOB'),
                    path: paths.dashboard.applyForJob.new,
                    icon: ICONS.trip,
                  },

                  // apply for industry
                  {
                    title: t('APPLY FOR INDUSTRIES'),
                    path: paths.dashboard.applyForIndustries.new,
                    icon: ICONS.trip,
                  },

                  // property route
                  {
                    title: t('PROPERTY BUY OR SELL'),
                    path: paths.dashboard.propertBuySell.new,
                    icon: ICONS.pollingManagement,
                  },

                  // attpl service
                  {
                    title: t(' ATTPL SERVICES'),
                    path: paths.dashboard.GovtScheme.new,
                    icon: ICONS.trip,
                    children: [
                      {
                        title: t('ATTPL COUNSULTANCY'),
                        path: paths.dashboard.attpl.consultancy,
                        icon: ICONS.pollingManagement,
                      },
                      {
                        title: t('ATTPL IT'),
                        path: paths.dashboard.attpl.it,
                        icon: ICONS.bulk,
                      },
                      {
                        title: t('ATTPL FINANCE'),
                        path: paths.dashboard.attpl.finance,
                        icon: ICONS.partyAllianceManagement,
                      },
                      {
                        title: t('ATTPL SOLAR'),
                        path: paths.dashboard.attpl.solar,
                        icon: ICONS.trip,
                      },
                      {
                        title: t('ATTPL INFRASTRUCUTE'),
                        path: paths.dashboard.attpl.infra,
                        icon: ICONS.kanban,
                      },
                      {
                        title: t('ATTPL STONE & MINERIALS'),
                        path: paths.dashboard.attpl.stone,
                        icon: ICONS.modalManagement,
                      },
                    ],
                  },

                  // natinal project
                  {
                    title: t('NATIONAL PROJECTS'),
                    path: paths.dashboard.user_project.list,
                    icon: ICONS.kanban,
                  },

                  // tour and travels
                  {
                    title: t('TOUR & TRAVELS'),
                    path: paths.dashboard.TourAndTravels.new,
                    icon: ICONS.TourAndTravels,
                  },

                  // survey form
                  {
                    title: t('SURVEY FORM'),
                    path: paths.dashboard.fill_survey.new,
                    icon: ICONS.userRoleManagement,
                  },

                  // suggestion box
                  {
                    title: t('SUGGESTION BOX'),
                    path: paths.dashboard.FeedbackPage.new,
                    icon: ICONS.complaintForm,
                  },

                  // galary
                  {
                    title: t('GALLERY'),
                    path: paths.dashboard.OverviewGalleryView.root,
                    icon: ICONS.electionManagement,
                  },

                  // health service
                  {
                    title: t(' HEALTH SERVICES'),
                    path: paths.dashboard.emergencyServices.root,
                    icon: ICONS.ambulance,
                    children: [
                      {
                        title: t('BOOK DOCTOR APPOINTMENT'),
                        path: paths.dashboard.Appointmenttodoctor.card,
                        icon: ICONS.bulk,
                      },
                      {
                        title: t('BOOK AMBULANCE '),
                        path: paths.dashboard.ambulancetrip.new,
                        icon: ICONS.ambulance,
                      },
                      {
                        title: t('AMBULANCE LIST'),
                        path: paths.dashboard.ambulancetrip.requestedList,
                        icon: ICONS.trip,
                      },
                      {
                        title: t('HEALTH TIPS'),
                        path: paths.dashboard.ambulancetrip.healthTips,
                        icon: ICONS.trip,
                      },
                      {
                        title: t('DOCTER SERVICES'),
                        path: paths.dashboard.ambulancetrip.docterCards,
                        icon: ICONS.bulk,
                      },
                    ],
                  },

                  // emergancy service
                  {
                    title: t(' EMERGENCY SERVICES'),
                    path: paths.dashboard.emergencyServices.root,
                    icon: ICONS.ambulance,
                    children: [
                      {
                        title: t('EMERGENCY HELPLINE NUMBER'),
                        path: paths.dashboard.emergencyServices.root,
                        icon: ICONS.ambulance,
                      },

                      {
                        title: t('BOOK AMBULANCE '),
                        path: paths.dashboard.ambulancetrip.new,
                        icon: ICONS.ambulance,
                      },
                      {
                        title: t('AMBULANCE LIST'),
                        path: paths.dashboard.ambulancetrip.requestedList,
                        icon: ICONS.trip,
                      },
                      {
                        title: t('EMERGENCY AMBULANCE SERVICES'),
                        path: paths.dashboard.ambulancetrip.cards,
                        icon: ICONS.ambulance,
                      },
                    ],
                  },

                  // support ticket
                  {
                    title: t('SUPPORT TICKET LIST DETAILS'),
                    icon: ICONS.sms,
                    path: paths.dashboard.sms.root,
                  },

                  // chat with friends
                  {
                    title: t("CHAT WITH FRIEND"),
                    path: paths.dashboard.chat,
                    icon: ICONS.election,
                  },

                  // add new user
                  {
                    title: t('ADD NEW USER'),
                    path: paths.dashboard.voter.new,
                    icon: ICONS.voter,
                  },
                ],
              },
            ],
          }
        );
        break;
      case 'Chartered Accountant':
        sections.push(
          {
            subheader: t('complaintSection'),
            path: paths.dashboard.chartered_accountant,
            icon: ICONS.complaintForm,
            items: [
              {
                title: t('All BOOKED LIST'),
                path: paths.dashboard.LMS_case.list,
                icon: ICONS.AllBookedCases,
              },
              // {
              //   title: t('All CONTRACTS LIST'),
              //   path: paths.dashboard.LMS_contract.list,
              //   icon: ICONS.complaintForm,
              // },
              {
                title: t('ACCEPT/REJECT CASE'),
                path: paths.dashboard.LMS_case.lawyer_list,
                icon: ICONS.AcceptRejectCase,
              },
              {
                title: t('LEGAL HELP'),
                path: paths.dashboard.LMS_cards.new,
                icon: ICONS.complaintForm,
              },
              {
                title: t('YOUR DETAILS'),
                path: paths.dashboard.chartered_accountant.my_details,
                icon: ICONS.YourDetails,
              },
            ],
          },
          // {
          //   subheader: t('LMS ALL LIST'),
          //   path: paths.dashboard.driver.root,
          //   icon: ICONS.complaintForm,
          //   items: [
          //     {
          //       title: t('LMS SERVICE LIST'),
          //       path: paths.dashboard.LMS_service.list,
          //       icon: ICONS.featureManagement,
          //     },
          //     {
          //       title: t('LMS SUB SERVICE LIST'),
          //       path: paths.dashboard.LMS_sub_service.list,
          //       icon: ICONS.featureManagement,
          //     },
          //   ],
          // },
          {
            subheader: t('SEE ALL FEATURE'),
            path: paths.dashboard.GovtScheme,
            icon: ICONS.SeeAllFeature,
            items: [
              {
                title: t('SEE ALL FEATURE'),
                path: paths.dashboard.GovtScheme.new,
                icon: ICONS.SeeAllFeature,
                children: [
                  // govt in your hand
                  {
                    title: t('GOVT IN YOUR HAND'),
                    path: paths.dashboard.GovtScheme.new,
                    icon: ICONS.govtService,
                    children: [
                      {
                        title: t('GOVERNMENT BENIFITS'),
                        path: paths.dashboard.GovtScheme.new,
                        icon: ICONS.adminchat,
                      },
                      {
                        title: t('COMPLAINT SECTION'),
                        path: paths.dashboard.ComplaintForm.new,
                        icon: ICONS.complaintForm,
                      },
                    ],
                  },
                  // career route map
                  {
                    title: t(' CAREER ROADMAP'),
                    path: paths.dashboard.Appointment.card,
                    icon: ICONS.partyManagement,
                    children: [
                      {
                        title: t('STUDENT CAREER ROADMAP'),
                        path: paths.dashboard.StudentCareer.new,
                        icon: ICONS.students,
                      },

                      {
                        title: t('FARMER CAREER ROADMAP'),
                        path: paths.dashboard.FarmerService.new,
                        icon: ICONS.farmer,
                      },

                      {
                        title: t('GET LABOUR JOB'),
                        path: paths.dashboard.labour_job_portal.list,
                        icon: ICONS.labourJob,
                      },

                      {
                        title: t('BUSINESS CAREER ROADMAP'),
                        path: paths.dashboard.BussinessRoadmap.new,
                        icon: ICONS.careers,
                      },

                      {
                        title: t('WOMEN EMPOWERMENT'),
                        path: paths.dashboard.WomanEmpourment.new,
                        icon: ICONS.womanEmpowerment,
                      },
                      {
                        title: t('GOVT EMPLOYMENT DESIRE'),
                        path: paths.dashboard.GovtService.list,
                        icon: ICONS.govtService,
                      },
                    ],
                  },

                  // apply for job
                  {
                    title: t('APPLY FOR JOB'),
                    path: paths.dashboard.applyForJob.new,
                    icon: ICONS.trip,
                  },

                  // apply for industry
                  {
                    title: t('APPLY FOR INDUSTRIES'),
                    path: paths.dashboard.applyForIndustries.new,
                    icon: ICONS.trip,
                  },

                  // property route
                  {
                    title: t('PROPERTY BUY OR SELL'),
                    path: paths.dashboard.propertBuySell.new,
                    icon: ICONS.pollingManagement,
                  },

                  // attpl service
                  {
                    title: t(' ATTPL SERVICES'),
                    path: paths.dashboard.GovtScheme.new,
                    icon: ICONS.trip,
                    children: [
                      {
                        title: t('ATTPL COUNSULTANCY'),
                        path: paths.dashboard.attpl.consultancy,
                        icon: ICONS.pollingManagement,
                      },
                      {
                        title: t('ATTPL IT'),
                        path: paths.dashboard.attpl.it,
                        icon: ICONS.bulk,
                      },
                      {
                        title: t('ATTPL FINANCE'),
                        path: paths.dashboard.attpl.finance,
                        icon: ICONS.partyAllianceManagement,
                      },
                      {
                        title: t('ATTPL SOLAR'),
                        path: paths.dashboard.attpl.solar,
                        icon: ICONS.trip,
                      },
                      {
                        title: t('ATTPL INFRASTRUCUTE'),
                        path: paths.dashboard.attpl.infra,
                        icon: ICONS.kanban,
                      },
                      {
                        title: t('ATTPL STONE & MINERIALS'),
                        path: paths.dashboard.attpl.stone,
                        icon: ICONS.modalManagement,
                      },
                    ],
                  },

                  // natinal project
                  {
                    title: t('NATIONAL PROJECTS'),
                    path: paths.dashboard.user_project.list,
                    icon: ICONS.kanban,
                  },

                  // tour and travels
                  {
                    title: t('TOUR & TRAVELS'),
                    path: paths.dashboard.TourAndTravels.new,
                    icon: ICONS.TourAndTravels,
                  },

                  // survey form
                  {
                    title: t('SURVEY FORM'),
                    path: paths.dashboard.fill_survey.new,
                    icon: ICONS.userRoleManagement,
                  },

                  // suggestion box
                  {
                    title: t('SUGGESTION BOX'),
                    path: paths.dashboard.FeedbackPage.new,
                    icon: ICONS.complaintForm,
                  },

                  // galary
                  {
                    title: t('GALLERY'),
                    path: paths.dashboard.OverviewGalleryView.root,
                    icon: ICONS.electionManagement,
                  },

                  // health service
                  {
                    title: t(' HEALTH SERVICES'),
                    path: paths.dashboard.emergencyServices.root,
                    icon: ICONS.ambulance,
                    children: [
                      {
                        title: t('BOOK DOCTOR APPOINTMENT'),
                        path: paths.dashboard.Appointmenttodoctor.card,
                        icon: ICONS.bulk,
                      },
                      {
                        title: t('BOOK AMBULANCE '),
                        path: paths.dashboard.ambulancetrip.new,
                        icon: ICONS.ambulance,
                      },
                      {
                        title: t('AMBULANCE LIST'),
                        path: paths.dashboard.ambulancetrip.requestedList,
                        icon: ICONS.trip,
                      },
                      {
                        title: t('HEALTH TIPS'),
                        path: paths.dashboard.ambulancetrip.healthTips,
                        icon: ICONS.trip,
                      },
                      {
                        title: t('DOCTER SERVICES'),
                        path: paths.dashboard.ambulancetrip.docterCards,
                        icon: ICONS.bulk,
                      },
                    ],
                  },

                  // emergancy service
                  {
                    title: t(' EMERGENCY SERVICES'),
                    path: paths.dashboard.emergencyServices.root,
                    icon: ICONS.ambulance,
                    children: [
                      {
                        title: t('EMERGENCY HELPLINE NUMBER'),
                        path: paths.dashboard.emergencyServices.root,
                        icon: ICONS.ambulance,
                      },

                      {
                        title: t('BOOK AMBULANCE '),
                        path: paths.dashboard.ambulancetrip.new,
                        icon: ICONS.ambulance,
                      },
                      {
                        title: t('AMBULANCE LIST'),
                        path: paths.dashboard.ambulancetrip.requestedList,
                        icon: ICONS.trip,
                      },
                      {
                        title: t('EMERGENCY AMBULANCE SERVICES'),
                        path: paths.dashboard.ambulancetrip.cards,
                        icon: ICONS.ambulance,
                      },
                    ],
                  },

                  // support ticket
                  {
                    title: t('SUPPORT TICKET LIST DETAILS'),
                    icon: ICONS.sms,
                    path: paths.dashboard.sms.root,
                  },

                  // chat with friends
                  {
                    title: t("CHAT WITH FRIEND"),
                    path: paths.dashboard.chat,
                    icon: ICONS.election,
                  },

                  // add new user
                  {
                    title: t('ADD NEW USER'),
                    path: paths.dashboard.voter.new,
                    icon: ICONS.voter,
                  },
                ],
              },
            ],
          }
        );
        break;
      case 'LMS Vendor':
        sections.push(
          {
            subheader: t('complaintSection'),
            path: paths.dashboard.lawyer,
            icon: ICONS.complaintForm,
            items: [
              {
                title: t('All BOOKED CASES LIST'),
                path: paths.dashboard.LMS_case.list,
                icon: ICONS.AllBookedCases,
              },
              // {
              //   title: t('All CONTRACTS LIST'),
              //   path: paths.dashboard.LMS_contract.list,
              //   icon: ICONS.complaintForm,
              // },
              {
                title: t('ACCEPT/REJECT CASE'),
                path: paths.dashboard.LMS_case.lawyer_list,
                icon: ICONS.AcceptRejectCase,
              },
              {
                title: t('LEGAL HELP'),
                path: paths.dashboard.LMS_cards.new,
                icon: ICONS.complaintForm,
              },
              {
                title: t('YOUR DETAILS'),
                path: paths.dashboard.lms_vendor.my_details,
                icon: ICONS.YourDetails,
              },
            ],
          },
          // {
          //   title: t('LMS ALL LIST'),
          //   path: paths.dashboard.driver.root,
          //   icon: ICONS.complaintForm,
          //   items: [
          //     {
          //       title: t('LMS SERVICE LIST'),
          //       path: paths.dashboard.LMS_service.list,
          //       icon: ICONS.featureManagement,
          //     },
          //     {
          //       title: t('LMS SUB SERVICE LIST'),
          //       path: paths.dashboard.LMS_sub_service.list,
          //       icon: ICONS.featureManagement,
          //     },
          //   ],
          // },
          {
            subheader: t('SEE ALL FEATURE'),
            path: paths.dashboard.GovtScheme,
            icon: ICONS.SeeAllFeature,
            items: [
              {
                title: t('SEE ALL FEATURE'),
                path: paths.dashboard.GovtScheme.new,
                icon: ICONS.SeeAllFeature,
                children: [
                  // govt in your hand
                  {
                    title: t('GOVT IN YOUR HAND'),
                    path: paths.dashboard.GovtScheme.new,
                    icon: ICONS.govtService,
                    children: [
                      {
                        title: t('GOVERNMENT BENIFITS'),
                        path: paths.dashboard.GovtScheme.new,
                        icon: ICONS.adminchat,
                      },
                      {
                        title: t('COMPLAINT SECTION'),
                        path: paths.dashboard.ComplaintForm.new,
                        icon: ICONS.complaintForm,
                      },
                    ],
                  },
                  // career route map
                  {
                    title: t(' CAREER ROADMAP'),
                    path: paths.dashboard.Appointment.card,
                    icon: ICONS.partyManagement,
                    children: [
                      {
                        title: t('STUDENT CAREER ROADMAP'),
                        path: paths.dashboard.StudentCareer.new,
                        icon: ICONS.students,
                      },

                      {
                        title: t('FARMER CAREER ROADMAP'),
                        path: paths.dashboard.FarmerService.new,
                        icon: ICONS.farmer,
                      },

                      {
                        title: t('GET LABOUR JOB'),
                        path: paths.dashboard.labour_job_portal.list,
                        icon: ICONS.labourJob,
                      },

                      {
                        title: t('BUSINESS CAREER ROADMAP'),
                        path: paths.dashboard.BussinessRoadmap.new,
                        icon: ICONS.careers,
                      },

                      {
                        title: t('WOMEN EMPOWERMENT'),
                        path: paths.dashboard.WomanEmpourment.new,
                        icon: ICONS.womanEmpowerment,
                      },
                      {
                        title: t('GOVT EMPLOYMENT DESIRE'),
                        path: paths.dashboard.GovtService.list,
                        icon: ICONS.govtService,
                      },
                    ],
                  },

                  // apply for job
                  {
                    title: t('APPLY FOR JOB'),
                    path: paths.dashboard.applyForJob.new,
                    icon: ICONS.trip,
                  },

                  // apply for industry
                  {
                    title: t('APPLY FOR INDUSTRIES'),
                    path: paths.dashboard.applyForIndustries.new,
                    icon: ICONS.trip,
                  },

                  // property route
                  {
                    title: t('PROPERTY BUY OR SELL'),
                    path: paths.dashboard.propertBuySell.new,
                    icon: ICONS.pollingManagement,
                  },

                  // attpl service
                  {
                    title: t(' ATTPL SERVICES'),
                    path: paths.dashboard.GovtScheme.new,
                    icon: ICONS.trip,
                    children: [
                      {
                        title: t('ATTPL COUNSULTANCY'),
                        path: paths.dashboard.attpl.consultancy,
                        icon: ICONS.pollingManagement,
                      },
                      {
                        title: t('ATTPL IT'),
                        path: paths.dashboard.attpl.it,
                        icon: ICONS.bulk,
                      },
                      {
                        title: t('ATTPL FINANCE'),
                        path: paths.dashboard.attpl.finance,
                        icon: ICONS.partyAllianceManagement,
                      },
                      {
                        title: t('ATTPL SOLAR'),
                        path: paths.dashboard.attpl.solar,
                        icon: ICONS.trip,
                      },
                      {
                        title: t('ATTPL INFRASTRUCUTE'),
                        path: paths.dashboard.attpl.infra,
                        icon: ICONS.kanban,
                      },
                      {
                        title: t('ATTPL STONE & MINERIALS'),
                        path: paths.dashboard.attpl.stone,
                        icon: ICONS.modalManagement,
                      },
                    ],
                  },

                  // natinal project
                  {
                    title: t('NATIONAL PROJECTS'),
                    path: paths.dashboard.user_project.list,
                    icon: ICONS.kanban,
                  },

                  // tour and travels
                  {
                    title: t('TOUR & TRAVELS'),
                    path: paths.dashboard.TourAndTravels.new,
                    icon: ICONS.TourAndTravels,
                  },

                  // survey form
                  {
                    title: t('SURVEY FORM'),
                    path: paths.dashboard.fill_survey.new,
                    icon: ICONS.userRoleManagement,
                  },

                  // suggestion box
                  {
                    title: t('SUGGESTION BOX'),
                    path: paths.dashboard.FeedbackPage.new,
                    icon: ICONS.complaintForm,
                  },

                  // galary
                  {
                    title: t('GALLERY'),
                    path: paths.dashboard.OverviewGalleryView.root,
                    icon: ICONS.electionManagement,
                  },

                  // health service
                  {
                    title: t(' HEALTH SERVICES'),
                    path: paths.dashboard.emergencyServices.root,
                    icon: ICONS.ambulance,
                    children: [
                      {
                        title: t('BOOK DOCTOR APPOINTMENT'),
                        path: paths.dashboard.Appointmenttodoctor.card,
                        icon: ICONS.bulk,
                      },
                      {
                        title: t('BOOK AMBULANCE '),
                        path: paths.dashboard.ambulancetrip.new,
                        icon: ICONS.ambulance,
                      },
                      {
                        title: t('AMBULANCE LIST'),
                        path: paths.dashboard.ambulancetrip.requestedList,
                        icon: ICONS.trip,
                      },
                      {
                        title: t('HEALTH TIPS'),
                        path: paths.dashboard.ambulancetrip.healthTips,
                        icon: ICONS.trip,
                      },
                      {
                        title: t('DOCTER SERVICES'),
                        path: paths.dashboard.ambulancetrip.docterCards,
                        icon: ICONS.bulk,
                      },
                    ],
                  },

                  // emergancy service
                  {
                    title: t(' EMERGENCY SERVICES'),
                    path: paths.dashboard.emergencyServices.root,
                    icon: ICONS.ambulance,
                    children: [
                      {
                        title: t('EMERGENCY HELPLINE NUMBER'),
                        path: paths.dashboard.emergencyServices.root,
                        icon: ICONS.ambulance,
                      },

                      {
                        title: t('BOOK AMBULANCE '),
                        path: paths.dashboard.ambulancetrip.new,
                        icon: ICONS.ambulance,
                      },
                      {
                        title: t('AMBULANCE LIST'),
                        path: paths.dashboard.ambulancetrip.requestedList,
                        icon: ICONS.trip,
                      },
                      {
                        title: t('EMERGENCY AMBULANCE SERVICES'),
                        path: paths.dashboard.ambulancetrip.cards,
                        icon: ICONS.ambulance,
                      },
                    ],
                  },

                  // support ticket
                  {
                    title: t('SUPPORT TICKET LIST DETAILS'),
                    icon: ICONS.sms,
                    path: paths.dashboard.sms.root,
                  },

                  // chat with friends
                  {
                    title: t("CHAT WITH FRIEND"),
                    path: paths.dashboard.chat,
                    icon: ICONS.election,
                  },

                  // add new user
                  {
                    title: t('ADD NEW USER'),
                    path: paths.dashboard.voter.new,
                    icon: ICONS.voter,
                  },
                ],
              },
            ],
          }
        );
        break;
      case 'LMS Client':
        sections.push(
          {
            subheader: t('LEGEL MANAGEMENT'),
            items: [
              {
                title: t('CREATE LMS CLIENT COMPANY'),
                path: paths.dashboard.Lms_client.create,
                icon: ICONS.CreateLMSClientCompany,
              },

              // {
              //   title: t('CREATE LMS USER'),
              //   path: paths.dashboard.LMSUserProfile.new,
              //   icon: ICONS.complaintForm,
              // },
              {
                title: t('LMS CASES LIST'),
                path: paths.dashboard.LMS_case.list,
                icon: ICONS.LMSCasesList,
              },
              {
                title: t('LMS CLIENT DETAILS'),
                path: paths.dashboard.LMS_caseDetails.list,
                icon: ICONS.LMSClientDetails,
              },
              {
                title: t('LMS CONTRACTS LIST'),
                path: paths.dashboard.LMS_contract.list,
                icon: ICONS.LMSContractsList,
              },
              {
                title: t('SELECT LAWYER'),
                path: paths.dashboard.lawyer.browse,
                icon: ICONS.SelectLawyer,
              },
              {
                title: t('SELECT CA'),
                path: paths.dashboard.chartered_accountant.browse,
                icon: ICONS.SelectCA,
              },
              {
                title: t('LEGEL DOCUMENT ASSISTANT'),
                path: paths.dashboard.lms_vendor.browse,
                icon: ICONS.LegalDocumentAssistant,
              },
              {
                title: t('LEGAL HELP'),
                path: paths.dashboard.LMS_cards.new,
                icon: ICONS.complaintForm,
              },
              // {
              //   title: t('ACCEPT/REJECT CASE'),
              //   path: paths.dashboard.LMS_case.lawyer_list,
              //   icon: ICONS.complaintForm,
              // },
              {
                title: t('LMS ALL LIST'),
                path: paths.dashboard.driver.root,
                icon: ICONS.LMSAllList,
                children: [
                  {
                    title: t('LAWYERS LIST'),
                    path: paths.dashboard.lawyer.list,
                    // icon: ICONS.featureManagement,
                  },
                  {
                    title: t('CA LIST'),
                    path: paths.dashboard.chartered_accountant.list,
                    // icon: ICONS.featureManagement,
                  },
                  {
                    title: t('VENDORS LIST'),
                    path: paths.dashboard.lms_vendor.list,
                    // icon: ICONS.featureManagement,
                  },

                  {
                    title: t('LMS SERVICE LIST'),
                    path: paths.dashboard.LMS_service.list,
                    // icon: ICONS.featureManagement,
                  },
                  {
                    title: t('LMS SUB SERVICE LIST'),
                    path: paths.dashboard.LMS_sub_service.list,
                    // icon: ICONS.featureManagement,
                  },
                  {
                    title: t('CLIENT COMPANY LIST'),
                    path: paths.dashboard.Lms_client.root,
                    // icon: ICONS.complaintForm,
                  },
                ],
              },
              // {
              //   title: t('LMS SERVICES LIST'),
              //   path: paths.dashboard.driver.root,
              //   icon: ICONS.complaintForm,
              //   children: [
              //     {
              //       title: t('LMS SERVICE LIST'),
              //       path: paths.dashboard.LMS_service.list,
              //       // icon: ICONS.featureManagement,
              //     },
              //     {
              //       title: t('LMS SUB SERVICE LIST'),
              //       path: paths.dashboard.LMS_sub_service.list,
              //       // icon: ICONS.featureManagement,
              //     },
              //   ],
              // },
              // {
              //   title: t('CREATE LMS SERVICES'),
              //   path: paths.dashboard.driver.root,
              //   icon: ICONS.complaintForm,
              //   children: [
              //     {
              //       title: t('CREATE NEW SERVICE'),
              //       path: paths.dashboard.LMS_service.create,
              //       // icon: ICONS.featureManagement,
              //     },
              //     {
              //       title: t('CREATE NEW SUB SERVICE'),
              //       path: paths.dashboard.LMS_sub_service.create,
              //       // icon: ICONS.featureManagement,
              //     },
              //   ],
              // },
              {
                title: t('LMS DOCUMENT'),
                path: paths.dashboard.LMS_document.root,
                icon: ICONS.LMsDocument,
                children: [
                  {
                    title: t('UPLOAD DOCUMENT'),
                    path: paths.dashboard.LMS_document.create,
                    // icon: ICONS.featureManagement,
                  },
                  {
                    title: t('UPLOADED DOCUMENT'),
                    path: paths.dashboard.LMS_document.list,
                    // icon: ICONS.featureManagement,
                  },
                ],
              },

              // {
              //   title: t('LMS CASE/CONTRACT List'),
              //   path: paths.dashboard.driver.root,
              //   icon: ICONS.complaintForm,
              //   children: [
              //     {

              //       title: t('CASE LIST'),
              //       path: paths.dashboard.LMS_case.list,
              //       // icon: ICONS.featureManagement,
              //     },
              //     {

              //       title: t('CONTRACT LIST'),
              //       path: paths.dashboard.LMS_contract.list,
              //       // icon: ICONS.featureManagement,
              //     },
              //     ]
              // },
              // {
              //   title: t('SELECT SERVICES'),
              //   path: paths.dashboard.electionmanagement.root,
              //   icon: ICONS.electionManagement,
              //   children: [
              //     {
              //       title: t('Civil cases'),
              //       path: paths.dashboard.driver.new,
              //       // icon: ICONS.featureManagement,

              //       children: [
              //         {
              //           title: t('Property Disputes'),
              //           path: paths.dashboard.lms_property_dispute.list,
              //         },
              //         {
              //           title: t('Contract Disputes'),
              //           path: paths.dashboard.lms_property_dispute.list,
              //         },
              //         {
              //           title: t('Tort Claims'),
              //           path: paths.dashboard.lms_property_dispute.list,
              //         },
              //         {
              //           title: t('Family Law Issues'),
              //           path: paths.dashboard.lms_property_dispute.list,
              //         },
              //         {
              //           title: t('Civil Rights Violations'),
              //           path: paths.dashboard.lms_property_dispute.list,
              //         },
              //       ],
              //     },
              //     {
              //       title: t('Criminal Cases'),
              //       path: paths.dashboard.driver.root,
              //       // icon: ICONS.featureManagement,
              //       children: [
              //         { title: t('Felony Charges'), path: paths.dashboard.survey.root },
              //         {
              //           title: t('Misdemeanor Charges'),
              //           path: paths.dashboard.survey.responseList,
              //         },
              //         {
              //           title: t('Juvenile Delinquency'),
              //           path: paths.dashboard.survey.responseList,
              //         },
              //         {
              //           title: t('White Collar Crimes'),
              //           path: paths.dashboard.survey.responseList,
              //         },
              //         {
              //           title: t('Cyber Crimess'),
              //           path: paths.dashboard.survey.responseList,
              //         },
              //       ],
              //     },
              //     {
              //       title: t('PIL (Public Interest Litigation)'),
              //       path: paths.dashboard.driver.new,
              //       children: [
              //         { title: t('Environmental Issues'), path: paths.dashboard.survey.root },
              //         {
              //           title: t('Human Rights Violations'),
              //           path: paths.dashboard.survey.responseList,
              //         },
              //         { title: t('Consumer Protection'), path: paths.dashboard.survey.root },
              //         {
              //           title: t('Public Health and Safety'),
              //           path: paths.dashboard.survey.responseList,
              //         },
              //       ],
              //     },
              //     {
              //       title: t('Family Court Cases'),
              //       path: paths.dashboard.driver.root,
              //       children: [
              //         { title: t('Divorce and Separation'), path: paths.dashboard.survey.root },
              //         {
              //           title: t('Child Custody'),
              //           path: paths.dashboard.survey.responseList,
              //         },
              //         { title: t('Alimony'), path: paths.dashboard.survey.root },
              //         {
              //           title: t('Adoption'),
              //           path: paths.dashboard.survey.responseList,
              //         },
              //         {
              //           title: t('Domestic Violence'),
              //           path: paths.dashboard.survey.responseList,
              //         },
              //       ],
              //     },
              //     {
              //       title: t('ITR Filling'),
              //       path: paths.dashboard.driver.new,
              //       children: [
              //         {
              //           title: t('Income Tax Return for Individuals '),
              //           path: paths.dashboard.survey.root,
              //         },
              //         {
              //           title: t('Income Tax Return for Corporates'),
              //           path: paths.dashboard.survey.responseList,
              //         },
              //         {
              //           title: t('Income Tax Return for Firms'),
              //           path: paths.dashboard.survey.responseList,
              //         },
              //         {
              //           title: t('Income Tax Return for Trusts'),
              //           path: paths.dashboard.survey.responseList,
              //         },
              //         {
              //           title: t('Income Tax Return for NGOs'),
              //           path: paths.dashboard.survey.responseList,
              //         },
              //       ],
              //     },
              //     {
              //       title: t('Business Registration'),
              //       path: paths.dashboard.driver.root,
              //       children: [
              //         {
              //           title: t('Sole Proprietorship Registration'),
              //           path: paths.dashboard.survey.root,
              //         },
              //         {
              //           title: t('Partnership Firm Registration'),
              //           path: paths.dashboard.survey.responseList,
              //         },
              //         {
              //           title: t('Private Limited Company Registration '),
              //           path: paths.dashboard.survey.responseList,
              //         },
              //         {
              //           title: t('Public Limited Company Registration'),
              //           path: paths.dashboard.survey.responseList,
              //         },
              //         {
              //           title: t('LLP Registration'),
              //           path: paths.dashboard.survey.responseList,
              //         },
              //         {
              //           title: t('NGO Registration'),
              //           path: paths.dashboard.survey.responseList,
              //         },
              //       ],
              //     },
              //     {
              //       title: t('GST Return Filling'),
              //       path: paths.dashboard.driver.new,
              //       children: [
              //         { title: t('GSTR-1'), path: paths.dashboard.survey.root },
              //         {
              //           title: t('GSTR-3B'),
              //           path: paths.dashboard.survey.responseList,
              //         },
              //         {
              //           title: t('GSTR-9'),
              //           path: paths.dashboard.survey.responseList,
              //         },
              //         {
              //           title: t('GST Annual Return'),
              //           path: paths.dashboard.survey.responseList,
              //         },
              //       ],
              //     },
              //     {
              //       title: t('Accounting'),
              //       path: paths.dashboard.driver.root,
              //       children: [
              //         { title: t('Bookkeeping'), path: paths.dashboard.survey.root },
              //         {
              //           title: t('Financial Statement Preparation'),
              //           path: paths.dashboard.survey.responseList,
              //         },
              //         {
              //           title: t('Audits'),
              //           path: paths.dashboard.survey.responseList,
              //         },
              //         {
              //           title: t('Tax Planning and Advisory'),
              //           path: paths.dashboard.survey.responseList,
              //         },
              //       ],
              //     },
              //     {
              //       title: t('Trade marke'),
              //       path: paths.dashboard.driver.new,
              //       children: [
              //         { title: t('Trademark Registration'), path: paths.dashboard.survey.root },
              //         {
              //           title: t('Trademark Renewal'),
              //           path: paths.dashboard.survey.responseList,
              //         },
              //         {
              //           title: t('Trademark Opposition'),
              //           path: paths.dashboard.survey.responseList,
              //         },
              //         {
              //           title: t('Trademark Assignment'),
              //           path: paths.dashboard.survey.responseList,
              //         },
              //       ],
              //     },
              //     {
              //       title: t('Patent'),
              //       path: paths.dashboard.driver.root,
              //       children: [
              //         { title: t('Patent Filing'), path: paths.dashboard.survey.root },
              //         {
              //           title: t('Patent Renewal'),
              //           path: paths.dashboard.survey.responseList,
              //         },
              //         {
              //           title: t('Patent Search'),
              //           path: paths.dashboard.survey.responseList,
              //         },
              //         {
              //           title: t('Patent Litigation'),
              //           path: paths.dashboard.survey.responseList,
              //         },
              //       ],
              //     },
              //     {
              //       title: t('Copy Right'),
              //       path: paths.dashboard.driver.new,
              //       children: [
              //         { title: t('Copyright Registration'), path: paths.dashboard.survey.root },
              //         {
              //           title: t('Copyright Infringement'),
              //           path: paths.dashboard.survey.responseList,
              //         },
              //         {
              //           title: t('Copyright Assignment'),
              //           path: paths.dashboard.survey.responseList,
              //         },
              //       ],
              //     },
              //     {
              //       title: t('Stamp'),
              //       path: paths.dashboard.driver.root,
              //       children: [
              //         { title: t('Sale deeds'), path: paths.dashboard.survey.root },
              //         {
              //           title: t('Affidavits'),
              //           path: paths.dashboard.survey.responseList,
              //         },
              //         {
              //           title: t('Power of attorney'),
              //           path: paths.dashboard.survey.responseList,
              //         },
              //         {
              //           title: t('Lease agreements'),
              //           path: paths.dashboard.survey.responseList,
              //         },
              //       ],
              //     },
              //     {
              //       title: t('Notarization'),
              //       path: paths.dashboard.driver.new,
              //       children: [
              //         { title: t('Verification of documents'), path: paths.dashboard.survey.root },
              //         {
              //           title: t('Attestation of affidavits'),
              //           path: paths.dashboard.survey.responseList,
              //         },
              //         {
              //           title: t('Notarizing legal instruments'),
              //           path: paths.dashboard.survey.responseList,
              //         },
              //         {
              //           title: t('Certifying copies of documents'),
              //           path: paths.dashboard.survey.responseList,
              //         },
              //       ],
              //     },
              //     {
              //       title: t('Affidavits'),
              //       path: paths.dashboard.driver.root,
              //       children: [
              //         { title: t('Birth affidavits'), path: paths.dashboard.survey.root },
              //         {
              //           title: t('Name change affidavits'),
              //           path: paths.dashboard.survey.responseList,
              //         },
              //         {
              //           title: t('Address proof affidavits'),
              //           path: paths.dashboard.survey.responseList,
              //         },
              //         {
              //           title: t('Income affidavits'),
              //           path: paths.dashboard.survey.responseList,
              //         },
              //       ],
              //     },
              //     {
              //       title: t('Agreements'),
              //       path: paths.dashboard.fill_survey.root,
              //       // icon: ICONS.userRoleManagement,
              //       children: [
              //         { title: t('Rental agreements'), path: paths.dashboard.survey.root },
              //         {
              //           title: t('Employment contracts'),
              //           path: paths.dashboard.survey.responseList,
              //         },
              //         {
              //           title: t('Business agreements'),
              //           path: paths.dashboard.survey.responseList,
              //         },
              //         {
              //           title: t('Service contracts'),
              //           path: paths.dashboard.survey.responseList,
              //         },
              //       ],
              //     },
              //   ],
              // },
            ],
          },
          {
            subheader: t('SEE ALL FEATURE'),
            path: paths.dashboard.GovtScheme,
            icon: ICONS.SeeAllFuture,
            items: [
              {
                title: t('SEE ALL FEATURE'),
                path: paths.dashboard.GovtScheme.new,
                icon: ICONS.SeeAllFuture,
                children: [
                  // govt in your hand
                  {
                    title: t('GOVT IN YOUR HAND'),
                    path: paths.dashboard.GovtScheme.new,
                    icon: ICONS.govtService,
                    children: [
                      {
                        title: t('GOVERNMENT BENIFITS'),
                        path: paths.dashboard.GovtScheme.new,
                        icon: ICONS.adminchat,
                      },
                      {
                        title: t('COMPLAINT SECTION'),
                        path: paths.dashboard.ComplaintForm.new,
                        icon: ICONS.complaintForm,
                      },
                    ],
                  },
                  // career route map
                  {
                    title: t(' CAREER ROADMAP'),
                    path: paths.dashboard.Appointment.card,
                    icon: ICONS.partyManagement,
                    children: [
                      {
                        title: t('STUDENT CAREER ROADMAP'),
                        path: paths.dashboard.StudentCareer.new,
                        icon: ICONS.students,
                      },

                      {
                        title: t('FARMER CAREER ROADMAP'),
                        path: paths.dashboard.FarmerService.new,
                        icon: ICONS.farmer,
                      },

                      {
                        title: t('GET LABOUR JOB'),
                        path: paths.dashboard.labour_job_portal.list,
                        icon: ICONS.labourJob,
                      },

                      {
                        title: t('BUSINESS CAREER ROADMAP'),
                        path: paths.dashboard.BussinessRoadmap.new,
                        icon: ICONS.careers,
                      },

                      {
                        title: t('WOMEN EMPOWERMENT'),
                        path: paths.dashboard.WomanEmpourment.new,
                        icon: ICONS.womanEmpowerment,
                      },
                      {
                        title: t('GOVT EMPLOYMENT DESIRE'),
                        path: paths.dashboard.GovtService.list,
                        icon: ICONS.govtService,
                      },
                    ],
                  },

                  // apply for job
                  {
                    title: t('APPLY FOR JOB'),
                    path: paths.dashboard.applyForJob.new,
                    icon: ICONS.trip,
                  },

                  // apply for industry
                  {
                    title: t('APPLY FOR INDUSTRIES'),
                    path: paths.dashboard.applyForIndustries.new,
                    icon: ICONS.trip,
                  },

                  // property route
                  {
                    title: t('PROPERTY BUY OR SELL'),
                    path: paths.dashboard.propertBuySell.new,
                    icon: ICONS.pollingManagement,
                  },

                  // attpl service
                  {
                    title: t(' ATTPL SERVICES'),
                    path: paths.dashboard.GovtScheme.new,
                    icon: ICONS.trip,
                    children: [
                      {
                        title: t('ATTPL COUNSULTANCY'),
                        path: paths.dashboard.attpl.consultancy,
                        icon: ICONS.pollingManagement,
                      },
                      {
                        title: t('ATTPL IT'),
                        path: paths.dashboard.attpl.it,
                        icon: ICONS.bulk,
                      },
                      {
                        title: t('ATTPL FINANCE'),
                        path: paths.dashboard.attpl.finance,
                        icon: ICONS.partyAllianceManagement,
                      },
                      {
                        title: t('ATTPL SOLAR'),
                        path: paths.dashboard.attpl.solar,
                        icon: ICONS.trip,
                      },
                      {
                        title: t('ATTPL INFRASTRUCUTE'),
                        path: paths.dashboard.attpl.infra,
                        icon: ICONS.kanban,
                      },
                      {
                        title: t('ATTPL STONE & MINERIALS'),
                        path: paths.dashboard.attpl.stone,
                        icon: ICONS.modalManagement,
                      },
                    ],
                  },

                  // natinal project
                  {
                    title: t('NATIONAL PROJECTS'),
                    path: paths.dashboard.user_project.list,
                    icon: ICONS.kanban,
                  },

                  // tour and travels
                  {
                    title: t('TOUR & TRAVELS'),
                    path: paths.dashboard.TourAndTravels.new,
                    icon: ICONS.TourAndTravels,
                  },

                  // survey form
                  {
                    title: t('SURVEY FORM'),
                    path: paths.dashboard.fill_survey.new,
                    icon: ICONS.userRoleManagement,
                  },

                  // suggestion box
                  {
                    title: t('SUGGESTION BOX'),
                    path: paths.dashboard.FeedbackPage.new,
                    icon: ICONS.complaintForm,
                  },

                  // galary
                  {
                    title: t('GALLERY'),
                    path: paths.dashboard.OverviewGalleryView.root,
                    icon: ICONS.electionManagement,
                  },

                  // health service
                  {
                    title: t(' HEALTH SERVICES'),
                    path: paths.dashboard.emergencyServices.root,
                    icon: ICONS.ambulance,
                    children: [
                      {
                        title: t('BOOK DOCTOR APPOINTMENT'),
                        path: paths.dashboard.Appointmenttodoctor.card,
                        icon: ICONS.bulk,
                      },
                      {
                        title: t('BOOK AMBULANCE '),
                        path: paths.dashboard.ambulancetrip.new,
                        icon: ICONS.ambulance,
                      },
                      {
                        title: t('AMBULANCE LIST'),
                        path: paths.dashboard.ambulancetrip.requestedList,
                        icon: ICONS.trip,
                      },
                      {
                        title: t('HEALTH TIPS'),
                        path: paths.dashboard.ambulancetrip.healthTips,
                        icon: ICONS.trip,
                      },
                      {
                        title: t('DOCTER SERVICES'),
                        path: paths.dashboard.ambulancetrip.docterCards,
                        icon: ICONS.bulk,
                      },
                    ],
                  },

                  // emergancy service
                  {
                    title: t(' EMERGENCY SERVICES'),
                    path: paths.dashboard.emergencyServices.root,
                    icon: ICONS.ambulance,
                    children: [
                      {
                        title: t('EMERGENCY HELPLINE NUMBER'),
                        path: paths.dashboard.emergencyServices.root,
                        icon: ICONS.ambulance,
                      },

                      {
                        title: t('BOOK AMBULANCE '),
                        path: paths.dashboard.ambulancetrip.new,
                        icon: ICONS.ambulance,
                      },
                      {
                        title: t('AMBULANCE LIST'),
                        path: paths.dashboard.ambulancetrip.requestedList,
                        icon: ICONS.trip,
                      },
                      {
                        title: t('EMERGENCY AMBULANCE SERVICES'),
                        path: paths.dashboard.ambulancetrip.cards,
                        icon: ICONS.ambulance,
                      },
                    ],
                  },

                  // support ticket
                  {
                    title: t('SUPPORT TICKET LIST DETAILS'),
                    icon: ICONS.sms,
                    path: paths.dashboard.sms.root,
                  },

                  // chat with friends
                  {
                    title: t("CHAT WITH FRIEND"),
                    path: paths.dashboard.chat,
                    icon: ICONS.election,
                  },

                  // add new user
                  {
                    title: t('ADD NEW USER'),
                    path: paths.dashboard.voter.new,
                    icon: ICONS.voter,
                  },
                ],
              },
            ],
          }
        );
        break;
      case 'Employer':
        // sections.push(
        //   {
        //     subheader: t('BOOK AMBULANCE '),
        //     path: paths.dashboard.ambulancetrip.new,
        //     icon: ICONS.ambulance,
        //     items: [
        //       {
        //         title: t('BOOK AMBULANCE '),
        //         path: paths.dashboard.ambulancetrip.new,
        //         icon: ICONS.ambulance,
        //       },
        //     ],
        //   },
        //   {
        //     subheader: t('AMBULANCE LIST'),
        //     path: paths.dashboard.ambulancetrip.requestedList,
        //     icon: ICONS.ambulance,
        //     items: [
        //       {
        //         title: t('AMBULANCE LIST'),
        //         path: paths.dashboard.ambulancetrip.requestedList,
        //         icon: ICONS.trip,
        //       },
        //     ],
        //   },
        //   {
        //     subheader: t('APPOINTMENT BOOKING'),
        //     path: paths.dashboard.Appointment.root,
        //     icon: ICONS.partyManagement,
        //     items: [
        //       {
        //         title: t('APPOINTMENT BOOKING'),
        //         path: paths.dashboard.Appointment.new,
        //         icon: ICONS.partyManagement,
        //       },
        //     ],
        //   },
        //   {
        //     subheader: t('BUSINESS CAREER ROADMAP'),
        //     path: paths.dashboard.BussinessRoadmap,
        //     icon: ICONS.careers,
        //     items: [
        //       {
        //         title: t('BUSINESS CAREER ROADMAP'),
        //         path: paths.dashboard.BussinessRoadmap.new,
        //         icon: ICONS.careers,
        //       },
        //     ],
        //   },
        //   {
        //     subheader: t('CANDIDATE LIBRARY'),
        //     path: paths.dashboard.candidateLibrary,
        //     icon: ICONS.adminchat,
        //     items: [
        //       {
        //         title: t('CANDIDATE PROFILE LIBRARY'),
        //         path: paths.dashboard.candidateLibrary.list,
        //         icon: ICONS.adminchat,
        //       },
        //     ],
        //   },
        //   {
        //     subheader: t('COMPLAINT SECTION'),
        //     path: paths.dashboard.ComplaintForm,
        //     icon: ICONS.complaintForm,
        //     items: [
        //       {
        //         title: t('COMPLAINT SECTION'),
        //         path: paths.dashboard.ComplaintForm.new,
        //         icon: ICONS.complaintForm,
        //       },
        //     ],
        //   },
        //   {
        //     subheader: t('ELECTION'),
        //     path: paths.dashboard.voterview,
        //     icon: ICONS.election,
        //     items: [
        //       {
        //         title: t('MY ELECTION DETAILS'),
        //         path: paths.dashboard.voterview.details,
        //         icon: ICONS.election,
        //       },
        //     ],
        //   },
        //   {
        //     subheader: t('FARMER SERVICE'),
        //     path: paths.dashboard.FarmerService,
        //     icon: ICONS.farmer,
        //     items: [
        //       {
        //         title: t('FARMER CAREER ROADMAP'),
        //         path: paths.dashboard.FarmerService.new,
        //         icon: ICONS.farmer,
        //       },
        //     ],
        //   },
        //   {
        //     subheader: t('FEEDBACK FORM'),
        //     path: paths.dashboard.FeedbackPage.root,
        //     icon: ICONS.complaintForm,
        //     items: [
        //       {
        //         title: t('FEEDBACK FORM'),
        //         path: paths.dashboard.FeedbackPage.new,
        //         icon: ICONS.complaintForm,
        //       },
        //     ],
        //   },
        //   {
        //     subheader: t('GOVERNMENT SCHEME'),
        //     path: paths.dashboard.GovtScheme,
        //     icon: ICONS.careers,
        //     items: [
        //       {
        //         title: t('GOVERNMENT SCHEME'),
        //         path: paths.dashboard.GovtScheme.new,
        //         icon: ICONS.adminchat,
        //       },
        //     ],
        //   },
        //   {
        //     subheader: t('GOVERNMENT SERVICE'),
        //     path: paths.dashboard.GovtService,
        //     icon: ICONS.farmer,
        //     items: [
        //       {
        //         title: t('GOVERNMENT SERVICES ROADMAP'),
        //         path: paths.dashboard.GovtService.new,
        //         icon: ICONS.farmer,
        //       },
        //     ],
        //   },
        //   {
        //     subheader: t('LABOUR JOB PORTAL'),
        //     path: paths.dashboard.labour_job_portal.root,
        //     icon: ICONS.labourJob,
        //     items: [
        //       {
        //         title: t('LABOUR JOB PORTAL'),
        //         path: paths.dashboard.labour_job_portal.list,
        //         icon: ICONS.labourJob,
        //       },
        //     ],
        //   },
        //   {
        //     subheader: t('NATIONAL PROJECTS'),
        //     path: paths.dashboard.user_project.list,
        //     icon: ICONS.kanban,
        //     items: [
        //       {
        //         title: t('NATIONAL PROJECTS'),
        //         path: paths.dashboard.user_project.list,
        //         icon: ICONS.kanban,
        //       },
        //     ],
        //   },
        //   {
        //     subheader: t('STUDENT CAREER'),
        //     path: paths.dashboard.StudentCareer,
        //     icon: ICONS.students,
        //     items: [
        //       {
        //         title: t('STUDENT CAREER ROADMAP'),
        //         path: paths.dashboard.StudentCareer.new,
        //         icon: ICONS.students,
        //       },
        //     ],
        //   },
        //   {
        //     subheader: t('SURVEY FORM'),
        //     path: paths.dashboard.fill_survey.root,
        //     icon: ICONS.userRoleManagement,
        //     items: [
        //       {
        //         title: t('SURVEY FORM'),
        //         path: paths.dashboard.fill_survey.new,
        //         icon: ICONS.userRoleManagement,
        //       },
        //     ],
        //   },
        //   {
        //     subheader: t('TOUR AND TRAVELS'),
        //     path: paths.dashboard.TourAndTravels,
        //     icon: ICONS.TourAndTravels,
        //     items: [
        //       {
        //         title: t('TOUR & TRAVELS'),
        //         path: paths.dashboard.TourAndTravels.new,
        //         icon: ICONS.TourAndTravels,
        //       },
        //     ],
        //   },
        //   {
        //     subheader: t('VOTER'),
        //     path: paths.dashboard.voter,
        //     icon: ICONS.voter,
        //     items: [
        //       { title: t('ADD NEW VOTER'), path: paths.dashboard.voter.new, icon: ICONS.voter },
        //     ],
        //   },
        //   {
        //     subheader: t('VOTING SLIP'),
        //     path: paths.dashboard.votingSlip,
        //     icon: ICONS.votingSlip,
        //     items: [
        //       {
        //         title: t('VOTING SLIP'),
        //         path: paths.dashboard.votingSlip.new,
        //         icon: ICONS.voterSlip,
        //       },
        //     ],
        //   },
        //   {
        //     subheader: t('WOMEN EMPOWERMENT'),
        //     path: paths.dashboard.WomanEmpourment.new,
        //     icon: ICONS.womanEmpowerment,
        //     items: [
        //       {
        //         title: t('WOMEN EMPOWERMENT'),
        //         path: paths.dashboard.WomanEmpourment.new,
        //         icon: ICONS.womanEmpowerment,
        //       },
        //     ],
        //   }
        // );
        sections.push(
          {
            subheader: t('ADD JOB POST'),
            items: [
              {
                title: t('ADD JOB POST'),
                path: paths.dashboard.labour_job_portal.new,
                icon: ICONS.labourJob,
              },
              {
                title: t('JOB POST LIST'),
                path: paths.dashboard.labour_job_portal.list,
                icon: ICONS.labourJob,
              },
              {
                title: t('EMPLOYEMENT LIST'),
                path: paths.dashboard.labour_job_portal.employementList,
                icon: ICONS.labourJob,
              },
            ],
          },
          {
            subheader: t('SEE ALL FEATURE'),
            path: paths.dashboard.GovtScheme,
            icon: ICONS.govtService,
            items: [
              {
                title: t('SEE ALL FEATURE'),
                path: paths.dashboard.GovtScheme.new,
                icon: ICONS.bulk,
                children: [
                  // govt in your hand
                  {
                    title: t('GOVT IN YOUR HAND'),
                    path: paths.dashboard.GovtScheme.new,
                    icon: ICONS.govtService,
                    children: [
                      {
                        title: t('GOVERNMENT BENIFITS'),
                        path: paths.dashboard.GovtScheme.new,
                        icon: ICONS.adminchat,
                      },
                      {
                        title: t('COMPLAINT SECTION'),
                        path: paths.dashboard.ComplaintForm.new,
                        icon: ICONS.complaintForm,
                      },
                    ],
                  },
                  // career route map
                  {
                    title: t(' CAREER ROADMAP'),
                    path: paths.dashboard.Appointment.card,
                    icon: ICONS.partyManagement,
                    children: [
                      {
                        title: t('STUDENT CAREER ROADMAP'),
                        path: paths.dashboard.StudentCareer.new,
                        icon: ICONS.students,
                      },

                      {
                        title: t('FARMER CAREER ROADMAP'),
                        path: paths.dashboard.FarmerService.new,
                        icon: ICONS.farmer,
                      },

                      {
                        title: t('GET LABOUR JOB'),
                        path: paths.dashboard.labour_job_portal.list,
                        icon: ICONS.labourJob,
                      },

                      {
                        title: t('BUSINESS CAREER ROADMAP'),
                        path: paths.dashboard.BussinessRoadmap.new,
                        icon: ICONS.careers,
                      },

                      {
                        title: t('WOMEN EMPOWERMENT'),
                        path: paths.dashboard.WomanEmpourment.new,
                        icon: ICONS.womanEmpowerment,
                      },
                      {
                        title: t('GOVT EMPLOYMENT DESIRE'),
                        path: paths.dashboard.GovtService.list,
                        icon: ICONS.govtService,
                      },
                    ],
                  },

                  // apply for job
                  {
                    title: t('APPLY FOR JOB'),
                    path: paths.dashboard.applyForJob.new,
                    icon: ICONS.trip,
                  },

                  // apply for industry
                  {
                    title: t('APPLY FOR INDUSTRIES'),
                    path: paths.dashboard.applyForIndustries.new,
                    icon: ICONS.trip,
                  },

                  // property route
                  {
                    title: t('PROPERTY BUY OR SELL'),
                    path: paths.dashboard.propertBuySell.new,
                    icon: ICONS.pollingManagement,
                  },

                  // attpl service
                  {
                    title: t(' ATTPL SERVICES'),
                    path: paths.dashboard.GovtScheme.new,
                    icon: ICONS.trip,
                    children: [
                      {
                        title: t('ATTPL COUNSULTANCY'),
                        path: paths.dashboard.attpl.consultancy,
                        icon: ICONS.pollingManagement,
                      },
                      {
                        title: t('ATTPL IT'),
                        path: paths.dashboard.attpl.it,
                        icon: ICONS.bulk,
                      },
                      {
                        title: t('ATTPL FINANCE'),
                        path: paths.dashboard.attpl.finance,
                        icon: ICONS.partyAllianceManagement,
                      },
                      {
                        title: t('ATTPL SOLAR'),
                        path: paths.dashboard.attpl.solar,
                        icon: ICONS.trip,
                      },
                      {
                        title: t('ATTPL INFRASTRUCUTE'),
                        path: paths.dashboard.attpl.infra,
                        icon: ICONS.kanban,
                      },
                      {
                        title: t('ATTPL STONE & MINERIALS'),
                        path: paths.dashboard.attpl.stone,
                        icon: ICONS.modalManagement,
                      },
                    ],
                  },

                  // natinal project
                  {
                    title: t('NATIONAL PROJECTS'),
                    path: paths.dashboard.user_project.list,
                    icon: ICONS.kanban,
                  },

                  // tour and travels
                  {
                    title: t('TOUR & TRAVELS'),
                    path: paths.dashboard.TourAndTravels.new,
                    icon: ICONS.TourAndTravels,
                  },

                  // survey form
                  {
                    title: t('SURVEY FORM'),
                    path: paths.dashboard.fill_survey.new,
                    icon: ICONS.userRoleManagement,
                  },

                  // suggestion box
                  {
                    title: t('SUGGESTION BOX'),
                    path: paths.dashboard.FeedbackPage.new,
                    icon: ICONS.complaintForm,
                  },

                  // galary
                  {
                    title: t('GALLERY'),
                    path: paths.dashboard.OverviewGalleryView.root,
                    icon: ICONS.electionManagement,
                  },

                  {
                    title: t(' HEALTH SERVICES'),
                    path: paths.dashboard.emergencyServices.root,
                    icon: ICONS.ambulance,
                    children: [
                      {
                        title: t('BOOK DOCTOR APPOINTMENT'),
                        path: paths.dashboard.Appointmenttodoctor.card,
                        icon: ICONS.bulk,
                      },
                      {
                        title: t('BOOK AMBULANCE '),
                        path: paths.dashboard.ambulancetrip.new,
                        icon: ICONS.ambulance,
                      },
                      {
                        title: t('AMBULANCE LIST'),
                        path: paths.dashboard.ambulancetrip.requestedList,
                        icon: ICONS.trip,
                      },
                      {
                        title: t('HEALTH TIPS'),
                        path: paths.dashboard.ambulancetrip.healthTips,
                        icon: ICONS.trip,
                      },
                      {
                        title: t('DOCTER SERVICES'),
                        path: paths.dashboard.ambulancetrip.docterCards,
                        icon: ICONS.bulk,
                      },
                    ],
                  },

                  // emergancy service
                  {
                    title: t(' EMERGENCY SERVICES'),
                    path: paths.dashboard.emergencyServices.root,
                    icon: ICONS.ambulance,
                    children: [
                      {
                        title: t('EMERGENCY HELPLINE NUMBER'),
                        path: paths.dashboard.emergencyServices.root,
                        icon: ICONS.ambulance,
                      },

                      {
                        title: t('BOOK AMBULANCE '),
                        path: paths.dashboard.ambulancetrip.new,
                        icon: ICONS.ambulance,
                      },
                      {
                        title: t('AMBULANCE LIST'),
                        path: paths.dashboard.ambulancetrip.requestedList,
                        icon: ICONS.trip,
                      },
                      {
                        title: t('EMERGENCY AMBULANCE SERVICES'),
                        path: paths.dashboard.ambulancetrip.cards,
                        icon: ICONS.ambulance,
                      },
                    ],
                  },

                  // support ticket
                  {
                    title: t('SUPPORT TICKET LIST DETAILS'),
                    icon: ICONS.sms,
                    path: paths.dashboard.sms.root,
                  },

                  // chat with friends
                  {
                    title: t("CHAT WITH FRIEND"),
                    path: paths.dashboard.chat,
                    icon: ICONS.election,
                  },

                  // add new user
                  {
                    title: t('ADD NEW USER'),
                    path: paths.dashboard.voter.new,
                    icon: ICONS.voter,
                  },
                ],
              },
            ],
          }
        );
        break;
      case 'Agriculture Equipment Seller':
        sections.push(
          {
            subheader: t('ADD EQUIPMENTS '),
            path: paths.dashboard.FarmerCompanyRegister.new,
            icon: ICONS.AddEquipment,
            items: [
              {
                title: t('ADD EQUIPMENTS'),
                path: paths.dashboard.FarmerCompanyRegister.new,
                icon: ICONS.AddEquipment,
              },
            ],
          },

          {
            subheader: t('MY EQUIPMENTS'),
            items: [
              {
                title: t('EQUIPMENTS LIST'),
                path: paths.dashboard.FarmerCompanyRegister.list,
                icon: ICONS.EquipmentList,
              },
            ],
          },

          {
            subheader: t('MY EQUIPMENTS'),
            items: [
              {
                title: t('INTERESTED FARMERS'),
                path: paths.dashboard.FarmerCompanyRegister.interestedFarmerslist,
                icon: ICONS.EquipmentList,
              },
            ],
          },

          {
            subheader: t('MY APPOINTMENTS'),
            items: [
              {
                title: t('APPOINTMENTS LIST'),
                path: paths.dashboard.FarmerCompanyRegister.appointmentList,
                icon: ICONS.AppointmentList,
              },
            ],
          },

          {
            subheader: t('SEE ALL FEATURE'),
            path: paths.dashboard.GovtScheme,
            icon: ICONS.govtService,
            items: [
              {
                title: t('SEE ALL FEATURE'),
                path: paths.dashboard.GovtScheme.new,
                icon: ICONS.govtService,
                children: [
                  // govt in your hand
                  {
                    title: t('GOVT IN YOUR HAND'),
                    path: paths.dashboard.GovtScheme.new,
                    icon: ICONS.govtService,
                    children: [
                      {
                        title: t('GOVERNMENT BENIFITS'),
                        path: paths.dashboard.GovtScheme.new,
                        icon: ICONS.adminchat,
                      },
                      {
                        title: t('COMPLAINT SECTION'),
                        path: paths.dashboard.ComplaintForm.new,
                        icon: ICONS.complaintForm,
                      },
                    ],
                  },
                  // career route map
                  {
                    title: t(' CAREER ROADMAP'),
                    path: paths.dashboard.Appointment.card,
                    icon: ICONS.partyManagement,
                    children: [
                      {
                        title: t('STUDENT CAREER ROADMAP'),
                        path: paths.dashboard.StudentCareer.new,
                        icon: ICONS.students,
                      },

                      {
                        title: t('FARMER CAREER ROADMAP'),
                        path: paths.dashboard.FarmerService.new,
                        icon: ICONS.farmer,
                      },

                      {
                        title: t('GET LABOUR JOB'),
                        path: paths.dashboard.labour_job_portal.list,
                        icon: ICONS.labourJob,
                      },

                      {
                        title: t('BUSINESS CAREER ROADMAP'),
                        path: paths.dashboard.BussinessRoadmap.new,
                        icon: ICONS.careers,
                      },

                      {
                        title: t('WOMEN EMPOWERMENT'),
                        path: paths.dashboard.WomanEmpourment.new,
                        icon: ICONS.womanEmpowerment,
                      },
                      {
                        title: t('GOVT EMPLOYMENT DESIRE'),
                        path: paths.dashboard.GovtService.list,
                        icon: ICONS.govtService,
                      },
                    ],
                  },

                  // apply for job
                  {
                    title: t('APPLY FOR JOB'),
                    path: paths.dashboard.applyForJob.new,
                    icon: ICONS.trip,
                  },

                  // apply for industry
                  {
                    title: t('APPLY FOR INDUSTRIES'),
                    path: paths.dashboard.applyForIndustries.new,
                    icon: ICONS.trip,
                  },

                  // property route
                  {
                    title: t('PROPERTY BUY OR SELL'),
                    path: paths.dashboard.propertBuySell.new,
                    icon: ICONS.pollingManagement,
                  },

                  // attpl service
                  {
                    title: t(' ATTPL SERVICES'),
                    path: paths.dashboard.GovtScheme.new,
                    icon: ICONS.trip,
                    children: [
                      {
                        title: t('ATTPL COUNSULTANCY'),
                        path: paths.dashboard.attpl.consultancy,
                        icon: ICONS.pollingManagement,
                      },
                      {
                        title: t('ATTPL IT'),
                        path: paths.dashboard.attpl.it,
                        icon: ICONS.bulk,
                      },
                      {
                        title: t('ATTPL FINANCE'),
                        path: paths.dashboard.attpl.finance,
                        icon: ICONS.partyAllianceManagement,
                      },
                      {
                        title: t('ATTPL SOLAR'),
                        path: paths.dashboard.attpl.solar,
                        icon: ICONS.trip,
                      },
                      {
                        title: t('ATTPL INFRASTRUCUTE'),
                        path: paths.dashboard.attpl.infra,
                        icon: ICONS.kanban,
                      },
                      {
                        title: t('ATTPL STONE & MINERIALS'),
                        path: paths.dashboard.attpl.stone,
                        icon: ICONS.modalManagement,
                      },
                    ],
                  },

                  // natinal project
                  {
                    title: t('NATIONAL PROJECTS'),
                    path: paths.dashboard.user_project.list,
                    icon: ICONS.kanban,
                  },

                  // tour and travels
                  {
                    title: t('TOUR & TRAVELS'),
                    path: paths.dashboard.TourAndTravels.new,
                    icon: ICONS.TourAndTravels,
                  },

                  // survey form
                  {
                    title: t('SURVEY FORM'),
                    path: paths.dashboard.fill_survey.new,
                    icon: ICONS.userRoleManagement,
                  },

                  // suggestion box
                  {
                    title: t('SUGGESTION BOX'),
                    path: paths.dashboard.FeedbackPage.new,
                    icon: ICONS.complaintForm,
                  },

                  // galary
                  {
                    title: t('GALLERY'),
                    path: paths.dashboard.OverviewGalleryView.root,
                    icon: ICONS.electionManagement,
                  },

                  // health service
                  {
                    title: t(' HEALTH SERVICES'),
                    path: paths.dashboard.emergencyServices.root,
                    icon: ICONS.ambulance,
                    children: [
                      {
                        title: t('BOOK DOCTOR APPOINTMENT'),
                        path: paths.dashboard.Appointmenttodoctor.card,
                        icon: ICONS.bulk,
                      },
                      {
                        title: t('BOOK AMBULANCE '),
                        path: paths.dashboard.ambulancetrip.new,
                        icon: ICONS.ambulance,
                      },
                      {
                        title: t('AMBULANCE LIST'),
                        path: paths.dashboard.ambulancetrip.requestedList,
                        icon: ICONS.trip,
                      },
                      {
                        title: t('HEALTH TIPS'),
                        path: paths.dashboard.ambulancetrip.healthTips,
                        icon: ICONS.trip,
                      },
                      {
                        title: t('DOCTER SERVICES'),
                        path: paths.dashboard.ambulancetrip.docterCards,
                        icon: ICONS.bulk,
                      },
                    ],
                  },

                  // emergancy service
                  {
                    title: t(' EMERGENCY SERVICES'),
                    path: paths.dashboard.emergencyServices.root,
                    icon: ICONS.ambulance,
                    children: [
                      {
                        title: t('EMERGENCY HELPLINE NUMBER'),
                        path: paths.dashboard.emergencyServices.root,
                        icon: ICONS.ambulance,
                      },

                      {
                        title: t('BOOK AMBULANCE '),
                        path: paths.dashboard.ambulancetrip.new,
                        icon: ICONS.ambulance,
                      },
                      {
                        title: t('AMBULANCE LIST'),
                        path: paths.dashboard.ambulancetrip.requestedList,
                        icon: ICONS.trip,
                      },
                      {
                        title: t('EMERGENCY AMBULANCE SERVICES'),
                        path: paths.dashboard.ambulancetrip.cards,
                        icon: ICONS.ambulance,
                      },
                    ],
                  },

                  // support ticket
                  {
                    title: t('SUPPORT TICKET LIST DETAILS'),
                    icon: ICONS.sms,
                    path: paths.dashboard.sms.root,
                  },

                  // chat with friends
                  {
                    title: t("CHAT WITH FRIEND"),
                    path: paths.dashboard.chat,
                    icon: ICONS.election,
                  },

                  // add new user
                  {
                    title: t('ADD NEW USER'),
                    path: paths.dashboard.voter.new,
                    icon: ICONS.voter,
                  },
                ],
              },
            ],
          }
        );
        break;
      default:
        sections.push();
        break;
    }
    return sections;
  }, [t, userRoleType]);

  return data;
}
// User Role Managment By Thomas

// User Profile Management By Thomas
// {
//   icon: ICONS.user,
//   children: [
//     { title: t('Add User'), path: paths.dashboard.userProfileManagement.new },
//     {
//       title: t('User List'),
//       path: paths.dashboard.userProfileManagement.list,
//     },
//   ],
// },

// {
//   subheader: t('OTP Managment'),
//   items: [
//     // Mobile OTP Managment By Shubhranshu
//     {
//       title: t('Mobile OTP Managment'),
//       path: paths.dashboard.candidate.root,
//       icon: ICONS.candidate,
//       children: [{ title: t('Mobile OTP Report'), path: paths.dashboard.candidate.root }],
//     },

//     // Email OTP Managment By Shubhranshu
//     {
//       title: t('Email OTP Managment'),
//       path: paths.dashboard.voter.root,
//       icon: ICONS.voter,
//       children: [{ title: t('Email OTP Report'), path: paths.dashboard.candidate.root }],
//     },
//   ],
// },
// {
//   subheader: t('SMS Managment'),
//   items: [
//     // SMS Managment By Saurabh
//     {
//       title: t('SMS Managment'),
//       path: paths.dashboard.candidate.root,
//       icon: ICONS.sms,
//       children: [
//         { title: t('Send SMS'), path: paths.dashboard.candidate.new },
//         { title: t('SMS Report'), path: paths.dashboard.candidate.root },
//       ],
//     },
//     // Bulk SMS Managment By Saurabh
//     {
//       title: t('Bulk SMS Managment'),
//       path: paths.dashboard.voter.root,
//       icon: ICONS.bulk,
//       children: [
//         { title: t('Send Bulk SMS'), path: paths.dashboard.candidate.new },
//         { title: t('Bulk SMS Report'), path: paths.dashboard.candidate.root },
//       ],
//     },
//   ],
// },
// {
//   subheader: t('Subscription Managment'),
//   items: [
//     // Subscription Management By Yuraj
//     {
//       title: t('Subscription Management'),
//       path: paths.dashboard.candidate.root,
//       icon: ICONS.subscription,
//       children: [
//         { title: t('Add Subscription'), path: paths.dashboard.candidate.new },
//         { title: t('Subscription List'), path: paths.dashboard.candidate.root },
//       ],
//     },

//     // Service Management By Yuraj
//     {
//       title: t('Service Management'),
//       path: paths.dashboard.voter.root,
//       icon: ICONS.services,
//       children: [
//         { title: t('Add Service'), path: paths.dashboard.voter.new },
//         {
//           title: t('Service List'),
//           path: paths.dashboard.voter.list,
//         },
//       ],
//     },

//     // Sub-Service Management By Yuraj
//     {
//       title: t('Sub-Service Management'),
//       path: paths.dashboard.voter.root,
//       icon: ICONS.subservices,
//       children: [
//         { title: t('Add Sub-Service'), path: paths.dashboard.voter.new },
//         {
//           title: t('Sub-Service List'),
//           path: paths.dashboard.voter.list,
//         },
//       ],
//     },
//   ],
// },
// {
//   subheader: t('Service Version Managment'),
//   path: paths.dashboard.chat,
//   icon: ICONS.adminchat,
//   items: [
//     {
//       title: t('Add Service Version'),
//       path: paths.dashboard.candidate.new,
//       icon: ICONS.adminchat,
//     },
//     {
//       title: t('Service Version List'),
//       path: paths.dashboard.candidate.root,
//       icon: ICONS.adminchat,
//     },
//   ],
// },
// {
//   // Contact Details Managment By Saurabh
//   subheader: t('Contact Details Managment'),
//   path: paths.dashboard.contact,
//   icon: ICONS.adminchat,
//   items: [
//     {
//       title: t('Contact Details List'),
//       path: paths.dashboard.contact.root,
//       icon: ICONS.adminchat,
//     },
//   ],
// }
