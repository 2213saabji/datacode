import { paramCase } from 'src/utils/change-case';

import { _id, _postTitles } from 'src/_mock/assets';

// ----------------------------------------------------------------------

const MOCK_ID = _id[1];

const MOCK_TITLE = _postTitles[2];

const ROOTS = {
  AUTH: '/auth',
  AUTH_DEMO: '/auth-demo',
  DASHBOARD: '/dashboard',
};

// ----------------------------------------------------------------------
// this using for main deashboard for all navigate options
export const paths = {
  comingSoon: '/coming-soon',
  maintenance: '/maintenance',
  pricing: '/pricing',
  payment: '/payment',
  about: '/about-us',
  contact: '/contact-us',
  faqs: '/faqs',
  page403: '/403',
  page404: '/404',
  page500: '/500',
  components: '/components',
  docs: 'https://docs.minimals.cc',
  changelog: 'https://docs.minimals.cc/changelog',
  zoneUI: 'https://mui.com/store/items/zone-landing-page/',
  minimalUI: 'https://mui.com/store/items/minimal-dashboard/',
  freeUI: 'https://mui.com/store/items/minimal-dashboard-free/',
  figma:
    'https://www.figma.com/file/hjxMnGUJCjY7pX8lQbS7kn/%5BPreview%5D-Minimal-Web.v5.4.0?type=design&node-id=0-1&mode=design&t=2fxnS70DuiTLGzND-0',
  product: {
    root: `/product`,
    checkout: `/product/checkout`,
    details: (id) => `/product/${id}`,
    demo: {
      details: `/product/${MOCK_ID}`,
    },
  },
  post: {
    root: `/post`,
    details: (title) => `/post/${paramCase(title)}`,
    demo: {
      details: `/post/${paramCase(MOCK_TITLE)}`,
    },
  },
  // AUTH
  auth: {
    jwt: {
      login: `${ROOTS.AUTH}/jwt/login`,
      register: `${ROOTS.AUTH}/jwt/register`,
      forgotpassword: `${ROOTS.AUTH}/jwt/forgotpassword`,
    },
  },
  // DASHBOARD
  dashboard: {

    root: ROOTS.DASHBOARD,
    chat: `${ROOTS.DASHBOARD}/chat`,
    // kanban: `${ROOTS.DASHBOARD}/kanban`,
    // kanban_project: `${ROOTS.DASHBOARD}/kanban-project`,
    // user_kanban: `${ROOTS.DASHBOARD}/user-kanban`,
    general: {
      // Overview sidebar Nevigate
      app: `${ROOTS.DASHBOARD}/app`,
    },

    project: {
      details: (id) => `${ROOTS.DASHBOARD}/project/${id}`,
      list: `${ROOTS.DASHBOARD}/project`,
    },

    user_project: {
      details: (id) => `${ROOTS.DASHBOARD}/user-project/${id}`,
      list: `${ROOTS.DASHBOARD}/user-project`,
    },

    voterview: {
      root: `${ROOTS.DASHBOARD}/voterview`,
      details: `${ROOTS.DASHBOARD}/voterview/details`,
      info: (item) => `${ROOTS.DASHBOARD}/voterview/details/info/${item}`,
    },

    user: {
      // Managment Sidebar Nevigate
      root: `${ROOTS.DASHBOARD}/user`,
      new: `${ROOTS.DASHBOARD}/user/new`,
      list: `${ROOTS.DASHBOARD}/user/list`,
      cards: `${ROOTS.DASHBOARD}/user/cards`,
      profile: `${ROOTS.DASHBOARD}/user/profile`,
      account: `${ROOTS.DASHBOARD}/user/account`,
      editSocialProfile: (id) => `${ROOTS.DASHBOARD}/user/${id}/editSocialProfile`,

      edit: (id) => `${ROOTS.DASHBOARD}/user/${id}/edit`,
      demo: {
        edit: `${ROOTS.DASHBOARD}/user/${MOCK_ID}/edit`,
      },
    },
    // Admin Contact
    contact: {
      root: `${ROOTS.DASHBOARD}/contact`,
      new: `${ROOTS.DASHBOARD}/contact/new`,
      details: (id) => `${ROOTS.DASHBOARD}/contact/${id}`,
      edit: (id) => `${ROOTS.DASHBOARD}/contact/${id}/edit`,
    },

    electionManagment: {
      // Election Managment Sidebar Nevigate
      root: `${ROOTS.DASHBOARD}/candidate-management`,
      new: `${ROOTS.DASHBOARD}/candidate-management/add-candidate`,
      list: `${ROOTS.DASHBOARD}/user/list`,
      cards: `${ROOTS.DASHBOARD}/user/cards`,
      profile: `${ROOTS.DASHBOARD}/user/profile`,
      account: `${ROOTS.DASHBOARD}/user/account`,
      edit: (id) => `${ROOTS.DASHBOARD}/user/${id}/edit`,
      demo: {
        edit: `${ROOTS.DASHBOARD}/user/${MOCK_ID}/edit`,
      },
    },
    // Voter Path by Thomas
    voter: {
      root: `${ROOTS.DASHBOARD}/voter`,
      new: `${ROOTS.DASHBOARD}/voter/new`,
      list: `${ROOTS.DASHBOARD}/voter/list`,
      createYourPost: `${ROOTS.DASHBOARD}/voter/createYourPost`,
      addFakeVote: `${ROOTS.DASHBOARD}/voter/addFakeVote`,
      details: (id) => `${ROOTS.DASHBOARD}/voter/${id}`,
      edit: (id) => `${ROOTS.DASHBOARD}/voter/${id}/edit`,
      demo: {
        details: `${ROOTS.DASHBOARD}/voter/${MOCK_ID}`,
        edit: `${ROOTS.DASHBOARD}/voter/${MOCK_ID}/edit`,
      },
    },

    vote_prediction: {
      root: `${ROOTS.DASHBOARD}/vote_prediction`,
      list: `${ROOTS.DASHBOARD}/vote_prediction/list`,
      details: (id) => `${ROOTS.DASHBOARD}/vote_prediction/${id}`,
      edit: (id) => `${ROOTS.DASHBOARD}/vote_prediction/${id}/edit`,
    },

    // expenses Path by Abhiskek
    expenses: {
      root: `${ROOTS.DASHBOARD}/expenses`,
      new: `${ROOTS.DASHBOARD}/expenses/new`,
      details: (id) => `${ROOTS.DASHBOARD}/expenses/${id}`,
      edit: (id) => `${ROOTS.DASHBOARD}/expenses/${id}/edit`,
      demo: {
        details: `${ROOTS.DASHBOARD}/expenses/${MOCK_ID}`,
        edit: `${ROOTS.DASHBOARD}/expenses/${MOCK_ID}/edit`,
      },
    },

    // party Path by Ankit kumar, ayaz, shubhranshu( 9 april )

    party: {
      root: `${ROOTS.DASHBOARD}/party`,
      new: `${ROOTS.DASHBOARD}/party/new`,
      details: (id) => `${ROOTS.DASHBOARD}/party/${id}`,
      edit: (id) => `${ROOTS.DASHBOARD}/party/${id}/edit`,
      demo: {
        details: `${ROOTS.DASHBOARD}/party/${MOCK_ID}`,
        edit: `${ROOTS.DASHBOARD}/party/${MOCK_ID}/edit`,
      },
    },

    // Appointment Path by Abhishek , Saurabh, Avanish( 9 april )

    Appointment: {
      root: `${ROOTS.DASHBOARD}/Appointment`,
      new: `${ROOTS.DASHBOARD}/Appointment/new`,
      card: `${ROOTS.DASHBOARD}/Appointment/card`,
      details: (id) => `${ROOTS.DASHBOARD}/Appointment/${id}`,
      list: (id) => `${ROOTS.DASHBOARD}/Appointment/list/${id}`,
      edit: (id) => `${ROOTS.DASHBOARD}/Appointment/${id}/edit`,
      demo: {
        details: `${ROOTS.DASHBOARD}/Appointment/${MOCK_ID}`,
        edit: `${ROOTS.DASHBOARD}/Appointment/${MOCK_ID}/edit`,
      },
    },
    Appointmenttodoctor: {
      root: `${ROOTS.DASHBOARD}/Appointmenttodoctor`,
      new: `${ROOTS.DASHBOARD}/Appointmenttodoctor/new`,
      card: `${ROOTS.DASHBOARD}/Appointmenttodoctor/card`,
      details: (id) => `${ROOTS.DASHBOARD}/Appointmenttodoctor/${id}`,
      list: (id) => `${ROOTS.DASHBOARD}/Appointmenttodoctor/list/${id}`,
      edit: (id) => `${ROOTS.DASHBOARD}/Appointmenttodoctor/${id}/edit`,
      demo: {
        details: `${ROOTS.DASHBOARD}/Appointmenttodoctor/${MOCK_ID}`,
        edit: `${ROOTS.DASHBOARD}/Appointmenttodoctor/${MOCK_ID}/edit`,
      },
    },

    Desire: {
      root: `${ROOTS.DASHBOARD}/Desire`,
      new: `${ROOTS.DASHBOARD}/Desire/new`,
      card: `${ROOTS.DASHBOARD}/Desire/card`,
      details: (id) => `${ROOTS.DASHBOARD}/Desire/${id}`,
      list: (id) => `${ROOTS.DASHBOARD}/Desire/list/${id}`,
      edit: (id) => `${ROOTS.DASHBOARD}/Desire/${id}/edit`,
      demo: {
        details: `${ROOTS.DASHBOARD}/Desire/${MOCK_ID}`,
        edit: `${ROOTS.DASHBOARD}/Desire/${MOCK_ID}/edit`,
      },
    },
    // party Path by Ankit kumar, ayaz, shubhranshu( 10 april )

    party_alliance: {
      root: `${ROOTS.DASHBOARD}/party_alliance`,
      new: `${ROOTS.DASHBOARD}/party_alliance/new`,
      details: (id) => `${ROOTS.DASHBOARD}/party_alliance/${id}`,
      edit: (id) => `${ROOTS.DASHBOARD}/party_alliance/${id}/edit`,
      demo: {
        details: `${ROOTS.DASHBOARD}/party_alliance/${MOCK_ID}`,
        edit: `${ROOTS.DASHBOARD}/party_alliance/${MOCK_ID}/edit`,
      },
    },

    // Category Path (28 march Shubhranshu)
    category: {
      root: `${ROOTS.DASHBOARD}/category`,
      new: `${ROOTS.DASHBOARD}/category/new`,
      details: (id) => `${ROOTS.DASHBOARD}/category/${id}`,
      edit: (id) => `${ROOTS.DASHBOARD}/category/${id}/edit`,
      demo: {
        details: `${ROOTS.DASHBOARD}/category/${MOCK_ID}`,
        edit: `${ROOTS.DASHBOARD}/category/${MOCK_ID}/edit`,
      },
    },

    // Claim Path (29 march Shubhranshu)
    claim: {
      root: `${ROOTS.DASHBOARD}/claim`,
      new: `${ROOTS.DASHBOARD}/claim/new`,
      details: (id) => `${ROOTS.DASHBOARD}/claim/${id}`,
      edit: (id) => `${ROOTS.DASHBOARD}/claim/${id}/edit`,
      demo: {
        details: `${ROOTS.DASHBOARD}/claim/${MOCK_ID}`,
        edit: `${ROOTS.DASHBOARD}/claim/${MOCK_ID}/edit`,
      },
    },

    // Invoice Path by Abhiskek
    invoice: {
      root: `${ROOTS.DASHBOARD}/invoice`,
      new: `${ROOTS.DASHBOARD}/invoice/new`,
      details: (id) => `${ROOTS.DASHBOARD}/invoice/${id}`,
      edit: (id) => `${ROOTS.DASHBOARD}/invoice/${id}/edit`,
      demo: {
        details: `${ROOTS.DASHBOARD}/invoice/${MOCK_ID}`,
        edit: `${ROOTS.DASHBOARD}/invoice/${MOCK_ID}/edit`,
      },
    },

    // Candidate Path By Deepak
    candidate: {
      root: `${ROOTS.DASHBOARD}/candidate`,
      new: `${ROOTS.DASHBOARD}/candidate/new`,
      list: `${ROOTS.DASHBOARD}/candidate/list`,
      details: (id) => `${ROOTS.DASHBOARD}/candidate/${id}`,
      edit: (id) => `${ROOTS.DASHBOARD}/candidate/${id}/edit`,
      demo: {
        details: `${ROOTS.DASHBOARD}/candidate/${MOCK_ID}`,
        edit: `${ROOTS.DASHBOARD}/candidate/${MOCK_ID}/edit`,
      },
    },

    // Delivery Service Path By Pankaj
    deliveryService: {
      root: `${ROOTS.DASHBOARD}/deliveryService`,
      new: `${ROOTS.DASHBOARD}/deliveryService/new`,
      list: `${ROOTS.DASHBOARD}/deliveryService/list`,
      details: (id) => `${ROOTS.DASHBOARD}/deliveryService/details/${id}`,
      // edit: (id) => `${ROOTS.DASHBOARD}/candidate/${id}/edit`,
      // demo: {
      //   details: `${ROOTS.DASHBOARD}/candidate/${MOCK_ID}`,
      //   edit: `${ROOTS.DASHBOARD}/candidate/${MOCK_ID}/edit`,
      // },
    },

    // Cab Service Path By Pankaj
    cabService: {
      root: `${ROOTS.DASHBOARD}/cabService`,
      new: `${ROOTS.DASHBOARD}/cabService/new`,
      list: `${ROOTS.DASHBOARD}/cabService/list`,
      details: (id) => `${ROOTS.DASHBOARD}/cabService/details/${id}`
    },

    // Booth Path by Avanish
    boothmanagement: {
      root: `${ROOTS.DASHBOARD}/boothmanagement`,
      new: `${ROOTS.DASHBOARD}/boothmanagement/new`,
      list: `${ROOTS.DASHBOARD}/boothmanagement/list`,
      details: (id) => `${ROOTS.DASHBOARD}/boothmanagement/${id}`,
      mockdetails: `${ROOTS.DASHBOARD}/boothmanagement/2`,
      edit: (id) => `${ROOTS.DASHBOARD}/boothmanagement/${id}/edit`,
      demo: {
        details: `${ROOTS.DASHBOARD}/boothmanagement/${MOCK_ID}`,
        edit: `${ROOTS.DASHBOARD}/boothmanagement/${MOCK_ID}/edit`,
      },
    },
    // sms managment by Saurabh (12 april saurabh)
    sms: {
      root: `${ROOTS.DASHBOARD}/sms`,
      new: `${ROOTS.DASHBOARD}/sms/new`,
      list: `${ROOTS.DASHBOARD}/sms/list`,
      details: (id) => `${ROOTS.DASHBOARD}/sms/${id}`,
      edit: (id) => `${ROOTS.DASHBOARD}/sms/${id}/edit`,
      demo: {
        details: `${ROOTS.DASHBOARD}/sms/${MOCK_ID}`,
        edit: `${ROOTS.DASHBOARD}/sms/${MOCK_ID}/edit`,
      },
    },

    // Booth Path By Subranshu
    wardmanagement: {
      root: `${ROOTS.DASHBOARD}/wardmanagement`,
      new: `${ROOTS.DASHBOARD}/wardmanagement/new`,
      details: (id) => `${ROOTS.DASHBOARD}/wardmanagement/${id}`,
      mockdetails: `${ROOTS.DASHBOARD}/wardmanagement/1`,
      edit: (id) => `${ROOTS.DASHBOARD}/wardmanagement/${id}/edit`,
      demo: {
        details: `${ROOTS.DASHBOARD}/wardmanagement/${MOCK_ID}`,
        edit: `${ROOTS.DASHBOARD}/wardmanagement/${MOCK_ID}/edit`,
      },
    },

    // Service version Path By Ayaz
    serviceversion: {
      root: `${ROOTS.DASHBOARD}/serviceversion`,
      new: `${ROOTS.DASHBOARD}/serviceversion/new`,
      list: `${ROOTS.DASHBOARD}/serviceversion/list`,
      details: (id) => `${ROOTS.DASHBOARD}/serviceversion/${id}`,
      // mockdetails:`${ROOTS.DASHBOARD}/serviceversion/1`,
      edit: (id) => `${ROOTS.DASHBOARD}/serviceversion/${id}/edit`,
      demo: {
        details: `${ROOTS.DASHBOARD}/serviceversion/${MOCK_ID}`,
        edit: `${ROOTS.DASHBOARD}/serviceversion/${MOCK_ID}/edit`,
      },
    },

    // Role Path By Thomas
    userRoleManagement: {
      root: `${ROOTS.DASHBOARD}/userRoleManagement`,
      new: `${ROOTS.DASHBOARD}/userRoleManagement/new`,
      list: `${ROOTS.DASHBOARD}/userRoleManagement/list`,
      details: (id) => `${ROOTS.DASHBOARD}/userRoleManagement/${id}`,
      edit: (id) => `${ROOTS.DASHBOARD}/userRoleManagement/${id}/edit`,
    },

    userProfileManagement: {
      root: `${ROOTS.DASHBOARD}/userProfileManagement`,
      new: `${ROOTS.DASHBOARD}/userProfileManagement/new`,
      list: `${ROOTS.DASHBOARD}/userProfileManagement/list`,
      details: (id) => `${ROOTS.DASHBOARD}/userProfileManagement/${id}`,
      edit: (id) => `${ROOTS.DASHBOARD}/userProfileManagement/${id}/edit`,
      userEdit: (id) => `${ROOTS.DASHBOARD}/userProfileManagement/${id}/userEdit`,
      userOwnerEdit: (id) => `${ROOTS.DASHBOARD}/userProfileManagement/${id}/userOwnerEdit`,
    },

    // Election Path By Saurab
    electionmanagement: {
      root: `${ROOTS.DASHBOARD}/electionmanagement`,
      new: `${ROOTS.DASHBOARD}/electionmanagement/new`,
      details: (id) => `${ROOTS.DASHBOARD}/electionmanagement/${id}`,
      mockdetails: `${ROOTS.DASHBOARD}/electionmanagement/1`,
      edit: (id) => `${ROOTS.DASHBOARD}/electionmanagement/${id}/edit`,
      demo: {
        details: `${ROOTS.DASHBOARD}/electionmanagement/${MOCK_ID}`,
        edit: `${ROOTS.DASHBOARD}/electionmanagement/${MOCK_ID}/edit`,
      },
    },

    poolmanagement: {
      root: `${ROOTS.DASHBOARD}/poolmanagement`,
      new: `${ROOTS.DASHBOARD}/poolmanagement/new`,
      list: `${ROOTS.DASHBOARD}/poolmanagement/list`,
      details: (id) => `${ROOTS.DASHBOARD}/poolmanagement/${id}`,
      edit: (id) => `${ROOTS.DASHBOARD}/poolmanagement/${id}/edit`,
      demo: {
        details: `${ROOTS.DASHBOARD}/poolmanagement/${MOCK_ID}`,
        edit: `${ROOTS.DASHBOARD}/poolmanagement/${MOCK_ID}/edit`,
      },
    },
    // our-work  By saurabh
    work: {
      root: `${ROOTS.DASHBOARD}/work`,
      new: `${ROOTS.DASHBOARD}/work/new`,
      list: `${ROOTS.DASHBOARD}/work/list`,
      details: (id) => `${ROOTS.DASHBOARD}/work/${id}`,
      edit: (id) => `${ROOTS.DASHBOARD}/work/${id}/edit`,
      demo: {
        details: `${ROOTS.DASHBOARD}/work/${MOCK_ID}`,
        edit: `${ROOTS.DASHBOARD}/work/${MOCK_ID}/edit`,
      },
    },

    model: {
      root: `${ROOTS.DASHBOARD}/model`,
      new: `${ROOTS.DASHBOARD}/model/new`,
      list: `${ROOTS.DASHBOARD}/model/list`,
      details: (id) => `${ROOTS.DASHBOARD}/model/${id}`,
      edit: (id) => `${ROOTS.DASHBOARD}/model/${id}/edit`,
      demo: {
        details: `${ROOTS.DASHBOARD}/model/${MOCK_ID}`,
        edit: `${ROOTS.DASHBOARD}/model/${MOCK_ID}/edit`,
      },
    },

    // Transport Management By Ankit
    driver: {
      root: `${ROOTS.DASHBOARD}/driver`,
      new: `${ROOTS.DASHBOARD}/driver/new`,
      details: (id) => `${ROOTS.DASHBOARD}/driver/${id}`,
      edit: (id) => `${ROOTS.DASHBOARD}/driver/${id}/edit`,
      demo: {
        details: `${ROOTS.DASHBOARD}/driver/${MOCK_ID}`,
        edit: `${ROOTS.DASHBOARD}/driver/${MOCK_ID}/edit`,
      },
    },

    wardleader: {
      root: `${ROOTS.DASHBOARD}/wardleader`,
      list: `${ROOTS.DASHBOARD}/wardleader/list`,
      new: `${ROOTS.DASHBOARD}/wardleader/new`,
      details: (id) => `${ROOTS.DASHBOARD}/wardleader/${id}`,
      edit: (id) => `${ROOTS.DASHBOARD}/wardleader/${id}/edit`,
    },
    wardvol: {
      root: `${ROOTS.DASHBOARD}/wardvol`,
      list: `${ROOTS.DASHBOARD}/wardvol/list`,
      new: `${ROOTS.DASHBOARD}/wardvol/new`,
      details: (id) => `${ROOTS.DASHBOARD}/wardvol/${id}`,
      edit: (id) => `${ROOTS.DASHBOARD}/wardvol/${id}/edit`,
    },
    ambulancetrip: {
      root: `${ROOTS.DASHBOARD}/ambulancetrip`,
      list: `${ROOTS.DASHBOARD}/ambulancetrip/list`,
      new: `${ROOTS.DASHBOARD}/ambulancetrip/new`,
      healthTips: `${ROOTS.DASHBOARD}/ambulancetrip/healthTips`,
      details: (id) => `${ROOTS.DASHBOARD}/ambulancetrip/${id}`,
      edit: (id) => `${ROOTS.DASHBOARD}/ambulancetrip/${id}/edit`,
      requestedList: `${ROOTS.DASHBOARD}/ambulancetrip/requestedtrip`,
      cards: `${ROOTS.DASHBOARD}/ambulancetrip/cards`,
      docterCards: `${ROOTS.DASHBOARD}/ambulancetrip/docter/cards`,
    },
    card: {
      create: `${ROOTS.DASHBOARD}/card/create`,
    },
    createtrip: {
      root: `${ROOTS.DASHBOARD}/createtrip`,
      list: `${ROOTS.DASHBOARD}/createtrip/list`,
      new: `${ROOTS.DASHBOARD}/createtrip/new`,
      details: (id) => `${ROOTS.DASHBOARD}/createtrip/${id}`,
      edit: (id) => `${ROOTS.DASHBOARD}/createtrip/${id}/edit`,
    },
    assigndriver: {
      root: `${ROOTS.DASHBOARD}/assigndriver`,
      list: `${ROOTS.DASHBOARD}/assigndriver/list`,
      new: `${ROOTS.DASHBOARD}/assigndriver/new`,
      details: (id) => `${ROOTS.DASHBOARD}/assigndriver/${id}`,
      edit: (id) => `${ROOTS.DASHBOARD}/assigndriver/${id}/edit`,
    },
    tripdriver: {
      root: `${ROOTS.DASHBOARD}/tripdriver`,
      list: `${ROOTS.DASHBOARD}/tripdriver/list`,
      new: `${ROOTS.DASHBOARD}/tripdriver/new`,
      edit: (id) => `${ROOTS.DASHBOARD}/tripdriver/${id}/edit`,
    },

    vehicle: {
      root: `${ROOTS.DASHBOARD}/vehicle`,
      new: `${ROOTS.DASHBOARD}/vehicle/new`,
      details: (id) => `${ROOTS.DASHBOARD}/vehicle/${id}`,
      edit: (id) => `${ROOTS.DASHBOARD}/vehicle/${id}/edit`,
      demo: {
        details: `${ROOTS.DASHBOARD}/vehicle/${MOCK_ID}`,
        edit: `${ROOTS.DASHBOARD}/vehicle/${MOCK_ID}/edit`,
      },
    },

    // vehicle option by vinay
    vehicleOption: {
      root: `${ROOTS.DASHBOARD}/vehicle-booking-option`,
      list: `${ROOTS.DASHBOARD}/vehicle-booking-option/list`,
      new: `${ROOTS.DASHBOARD}/vehicle-booking-option/new`,
      details: (id) => `${ROOTS.DASHBOARD}/vehicle-booking-option/${id}/detail`,
      edit: (id) => `${ROOTS.DASHBOARD}/vehicle-booking-option/${id}/edit`,
    },


    trip: {
      root: `${ROOTS.DASHBOARD}/trip`,
      requestedList: `${ROOTS.DASHBOARD}/trip/requestedtrip`,
      managedList: `${ROOTS.DASHBOARD}/trip/managedtrip/list`,
      new: `${ROOTS.DASHBOARD}/trip/new`,
      details: (id) => `${ROOTS.DASHBOARD}/trip/${id}`,
      tripManagement: (id) => `${ROOTS.DASHBOARD}/trip/${id}/details`,
      edit: (id) => `${ROOTS.DASHBOARD}/trip/${id}/edit`,
    },
    callAmbulance: {
      root: `${ROOTS.DASHBOARD}/callAmbulance`,
      requestedList: `${ROOTS.DASHBOARD}/callAmbulance/requestedtrip`,
      managedList: `${ROOTS.DASHBOARD}/callAmbulance/managedtrip/list`,
      new: `${ROOTS.DASHBOARD}/callAmbulance/new`,
      details: (id) => `${ROOTS.DASHBOARD}/callAmbulance/${id}`,
      tripManagement: (id) => `${ROOTS.DASHBOARD}/callAmbulance/${id}/details`,
      edit: (id) => `${ROOTS.DASHBOARD}/callAmbulance/${id}/edit`,
    },
    blog: {
      root: `${ROOTS.DASHBOARD}/blog`,
      list: `${ROOTS.DASHBOARD}/blog/list`,
      new: `${ROOTS.DASHBOARD}/blog/new`,
      edit: (id) => `${ROOTS.DASHBOARD}/blog/${id}/edit`,
      details: (id) => `${ROOTS.DASHBOARD}/blog/${id}`,
    },
    product: {
      root: `${ROOTS.DASHBOARD}/product`,
      list: `${ROOTS.DASHBOARD}/product/list`,
      new: `${ROOTS.DASHBOARD}/product/new`,
    },
    productManagement: {
      root: `${ROOTS.DASHBOARD}/productManagement`,
      list: `${ROOTS.DASHBOARD}/productManagement/list`,
      new: `${ROOTS.DASHBOARD}/productManagement/new`,
      edit: (id) => `${ROOTS.DASHBOARD}/productManagement/${id}/edit`,
    },
    productRoleMapping: {
      root: `${ROOTS.DASHBOARD}/productRoleMapping`,
      list: `${ROOTS.DASHBOARD}/productRoleMapping/list`,
      new: `${ROOTS.DASHBOARD}/productRoleMapping/new`,
    },
    voterReferal: {
      root: `${ROOTS.DASHBOARD}`,
      // list: `${ROOTS.DASHBOARD}/voterReferal/list`,
      new: `${ROOTS.DASHBOARD}/voterReferal/new`,
      // edit: (id) => `${ROOTS.DASHBOARD}/blog/${id}/edit`,
      // details: (id) => `${ROOTS.DASHBOARD}/blog/${id}`,
    },

    votingSlip: {
      root: `${ROOTS.DASHBOARD}/votingSlip`,
      // list: `${ROOTS.DASHBOARD}/voterReferal/list`,
      new: `${ROOTS.DASHBOARD}/votingSlip/new`,
      // edit: (id) => `${ROOTS.DASHBOARD}/blog/${id}/edit`,
      // details: (id) => `${ROOTS.DASHBOARD}/blog/${id}`,
    },

    ComplaintForm: {
      root: `${ROOTS.DASHBOARD}/complaintForm`,
      new: `${ROOTS.DASHBOARD}/complaintForm/new`,
    },

    TourAndTravels: {
      root: `${ROOTS.DASHBOARD}/tourAndTravels`,
      // list: `${ROOTS.DASHBOARD}/voterReferal/list`,
      new: `${ROOTS.DASHBOARD}/tourAndTravels/new`,
      // edit: (id) => `${ROOTS.DASHBOARD}/blog/${id}/edit`,
      // details: (id) => `${ROOTS.DASHBOARD}/blog/${id}`,
    },

    applyForJob: {
      root: `${ROOTS.DASHBOARD}/applyForJob`,
      new: `${ROOTS.DASHBOARD}/applyForJob/new`,
    },
    applyForIndustries: {
      root: `${ROOTS.DASHBOARD}/applyForIndustries`,
      new: `${ROOTS.DASHBOARD}/applyForIndustries/new`,
    },

    emergencyContactNumber: {
      root: `${ROOTS.DASHBOARD}/emergencyContactNumber`,
      new: `${ROOTS.DASHBOARD}/emergencyContactNumber/new`,
    },
    socialMedia: {
      root: `${ROOTS.DASHBOARD}/socialMedia`,
      new: `${ROOTS.DASHBOARD}/socialMedia/new`,
    },

    propertBuySell: {
      root: `${ROOTS.DASHBOARD}/property`,
      new: `${ROOTS.DASHBOARD}/property/new`,
    },

    candidateLibrary: {
      root: `${ROOTS.DASHBOARD}/candidateLibrary`,
      list: `https://affidavit.eci.gov.in/`,
    },
    attpl: {
      root: `${ROOTS.DASHBOARD}/candidateLibrary`,
      consultancy: `https://attplconsultancy.com/`,
      infra: `https://attplconsultancy.com/`,
      solar: `https://attplsolar.com/`,
      finance: `https://attplfinance.com/`,
      it: `https://attplit.com/`,
      stone: `https://attplstone.com/`,
    },
    AssignedVehicle: {
      root: `${ROOTS.DASHBOARD}/AssignedVehicle`,
      // list: `${ROOTS.DASHBOARD}/voterReferal/list`,
      new: `${ROOTS.DASHBOARD}/AssignedVehicle/new`,
      // edit: (id) => `${ROOTS.DASHBOARD}/blog/${id}/edit`,
      // details: (id) => `${ROOTS.DASHBOARD}/blog/${id}`,
    },

    LaunchEvent: {
      root: `${ROOTS.DASHBOARD}/LaunchEvent`,
      Announcement: `${ROOTS.DASHBOARD}/LaunchEvent/Announcement`,
    },

    StudentCareer: {
      root: `${ROOTS.DASHBOARD}/StudentCareer`,
      new: `${ROOTS.DASHBOARD}/StudentCareer/new`,
      InstituteAppointment: `${ROOTS.DASHBOARD}/StudentCareer/InstituteAppointment`,
      editAppointment: (id) => `${ROOTS.DASHBOARD}/StudentCareer/${id}/edit`,
      viewAppointment: (id) => `${ROOTS.DASHBOARD}/StudentCareer/${id}/appointdetails`,
      instituteNew: `${ROOTS.DASHBOARD}/StudentCareer/InstituteNew`,
      instituteList: `${ROOTS.DASHBOARD}/StudentCareer/InstituteList`,
      interestedStudentList: `${ROOTS.DASHBOARD}/StudentCareer/InterestedStudentList`,
      edit: (id, studentCareerOption) =>
        `${ROOTS.DASHBOARD}/StudentCareer/${id}/edit/${studentCareerOption}`,
      instituteDetails: (id) => `${ROOTS.DASHBOARD}/StudentCareer/${id}/schoolDetails`,
      collegeDetails: (id) => `${ROOTS.DASHBOARD}/StudentCareer/${id}/collegeDetails`,
      coachingCenterDetails: (id) => `${ROOTS.DASHBOARD}/StudentCareer/${id}/cochingCenterDetails`,
      appointmnetDetails: (id) => `${ROOTS.DASHBOARD}/StudentCareer/${id}/appointmentDetails`,

      InstituteDetailsNew: `${ROOTS.DASHBOARD}/StudentCareer/InstituteDetailsNew`,
    },

    FarmerService: {
      root: `${ROOTS.DASHBOARD}/FarmerService`,
      new: `${ROOTS.DASHBOARD}/FarmerService/new`,
      detail: `${ROOTS.DASHBOARD}/FarmerService/detail`,
    },


    FarmerCompanyRegister: {
      root: `${ROOTS.DASHBOARD}/FarmerService/Registration`,
      new: `${ROOTS.DASHBOARD}/FarmerService/Registration/new`,
      list: `${ROOTS.DASHBOARD}/FarmerService/Registration/list`,
      interestedFarmerslist: `${ROOTS.DASHBOARD}/FarmerService/Registration/interestedFarmerslist`,
      appointmentList: `${ROOTS.DASHBOARD}/FarmerService/Registration/appointmentList`,
      tractor_details: (id) => `${ROOTS.DASHBOARD}/FarmerService/Registration/${id}/tractor`,
      cultivation_tool_details: (id) =>
        `${ROOTS.DASHBOARD}/FarmerService/Registration/${id}/cultivation_tool`,
      combine_harvester_details: (id) =>
        `${ROOTS.DASHBOARD}/FarmerService/Registration/${id}/combine_harvester`,
      irrigation_tool_details: (id) =>
        `${ROOTS.DASHBOARD}/FarmerService/Registration/${id}/irrigation_tool`,
      modern_agriculture_tool_details: (id) =>
        `${ROOTS.DASHBOARD}/FarmerService/Registration/${id}/modern_agriculture_tool`,
      edit: (id) => `${ROOTS.DASHBOARD}/FarmerService/Registration/${id}/edit`,
      appointment: `${ROOTS.DASHBOARD}/FarmerService/Registration/appointment`,
      appointmentedit: (id) =>
        `${ROOTS.DASHBOARD}/FarmerService/Registration/${id}/appointmentedit`,
      appointment_Details: (id) =>
        `${ROOTS.DASHBOARD}/FarmerService/Registration/${id}/appointment_Details`,
    },

    Cattle: {
      root: `${ROOTS.DASHBOARD}/FarmerService/Cattle`,
      new: `${ROOTS.DASHBOARD}/FarmerService/Cattle/new`,
      list: `${ROOTS.DASHBOARD}/FarmerService/Cattle/list`,
      details: (id, cattleId) => `${ROOTS.DASHBOARD}/FarmerService/Cattle/${id}/${cattleId}/detail`,
      edit: (id, cattleId) => `${ROOTS.DASHBOARD}/FarmerService/Cattle/${id}/${cattleId}/edit`,
    },

    Equipment: {
      root: `${ROOTS.DASHBOARD}/FarmerService/Equipment`,
      new: `${ROOTS.DASHBOARD}/FarmerService/Equipment/new`,
      list: `${ROOTS.DASHBOARD}/FarmerService/Equipment/list`,
      details: (id, equipmentId) => `${ROOTS.DASHBOARD}/FarmerService/Equipment/${id}/detail`,
      edit: (id, equipmentId) => `${ROOTS.DASHBOARD}/FarmerService/Equipment/${id}/${equipmentId}/edit`,
    },

    GovtService: {
      root: `${ROOTS.DASHBOARD}/GovtService`,
      new: `${ROOTS.DASHBOARD}/GovtService/new`,
      list: `${ROOTS.DASHBOARD}/GovtService/list`,
      details: (id) => `${ROOTS.DASHBOARD}/GovtService/${id}`,
    },
    LabourService: {
      root: `${ROOTS.DASHBOARD}/LabourService`,
      new: `${ROOTS.DASHBOARD}/LabourService/new`,
      details: (id) => `${ROOTS.DASHBOARD}/LabourJobDetail/${id}`,
    },

    WomanEmpourment: {
      root: `${ROOTS.DASHBOARD}/WomanEmpourment`,
      new: `${ROOTS.DASHBOARD}/WomanEmpourment/new`,
    },

    GovtScheme: {
      root: `${ROOTS.DASHBOARD}/GovtScheme`,
      new: `${ROOTS.DASHBOARD}/GovtScheme/new`,
      company: (name) => `${ROOTS.DASHBOARD}/GovtScheme/company/${name}`,
    },

    BussinessRoadmap: {
      root: `${ROOTS.DASHBOARD}/BussinessRoadmap`,
      new: `${ROOTS.DASHBOARD}/BussinessRoadmap/new`,
      ConsultantNewForm: `${ROOTS.DASHBOARD}/BussinessRoadmap/ConsultantNewForm`,
    },

    FeedbackPage: {
      root: `${ROOTS.DASHBOARD}/FeedbackPage`,
      new: `${ROOTS.DASHBOARD}/FeedbackPage/new`,
      list: `${ROOTS.DASHBOARD}/FeedbackPage/list`,
      details: (id) => `${ROOTS.DASHBOARD}/FeedbackPage/${id}`,
    },

    // added by Pankaj 09 May
    templateManagement: {
      root: `${ROOTS.DASHBOARD}/template`,
      new: `${ROOTS.DASHBOARD}/template/new`,
      list: `${ROOTS.DASHBOARD}/template/list`,
    },

    // added by Pankaj 00 May
    templateLibrary: {
      root: `${ROOTS.DASHBOARD}/template-library`,
      project: `${ROOTS.DASHBOARD}/template-library/project`,
      list: `${ROOTS.DASHBOARD}/template-library/list`,
    },
    // edited by vinay
    emergencyServices: {
      root: `${ROOTS.DASHBOARD}/emergencyServices/list`,
      list: `${ROOTS.DASHBOARD}/emergencyServices/list`,
      new: `${ROOTS.DASHBOARD}/emergencyServices/new`,
      details: (emergencyServiceId) => `${ROOTS.DASHBOARD}/emergencyServices/${emergencyServiceId}/detail`,
      edit: (emergencyServiceId) => `${ROOTS.DASHBOARD}/emergencyServices/${emergencyServiceId}/edit`,
    },
    OverviewGalleryView: {
      root: `${ROOTS.DASHBOARD}/OverviewGalleryView/list`,
      list: `${ROOTS.DASHBOARD}/OverviewGalleryView/list`,
    },
    survey: {
      root: `${ROOTS.DASHBOARD}/survey`,
      list: `${ROOTS.DASHBOARD}/survey/list`,
      responseList: `${ROOTS.DASHBOARD}/survey/responseList`,
      new: `${ROOTS.DASHBOARD}/survey/new`,
      edit: (id) => `${ROOTS.DASHBOARD}/survey/${id}/edit`,
      details: (id) => `${ROOTS.DASHBOARD}/survey/${id}`,
    },
    fill_survey: {
      root: `${ROOTS.DASHBOARD}/fill_survey`,
      list: `${ROOTS.DASHBOARD}/fill_survey/list`,
      new: `${ROOTS.DASHBOARD}/fill_survey/new`,
      edit: (id) => `${ROOTS.DASHBOARD}/fill_survey/${id}/edit`,
      details: (id) => `${ROOTS.DASHBOARD}/fill_survey/${id}`,
    },
    analysis: {
      list: `${ROOTS.DASHBOARD}/analysis`,
    },
    mail_form: {
      new: `${ROOTS.DASHBOARD}/mail_form`,
    },
    // Labour Job Portal
    labour_job_portal: {
      root: `${ROOTS.DASHBOARD}/labour-job/list`,
      list: `${ROOTS.DASHBOARD}/labour-job/list`,
      new: `${ROOTS.DASHBOARD}/labour-job/new`,
      edit: (id) => `${ROOTS.DASHBOARD}/labour-job/${id}/edit`,
      details: (id) => `${ROOTS.DASHBOARD}/labour-job/${id}`,
      subList: (jobType) => `${ROOTS.DASHBOARD}/labour-job/${jobType}/list`,
      employementList: `${ROOTS.DASHBOARD}/labour-job/employement-list`,
    },
    request_license_acceptence: {
      root: `${ROOTS.DASHBOARD}/requestLicense`,
      edit: (id) => `${ROOTS.DASHBOARD}/requestLicense/${id}/edit`,
      doctor_details: (id) => `${ROOTS.DASHBOARD}/requestLicense/doctor/${id}`,
      employer_details: (id) => `${ROOTS.DASHBOARD}/requestLicense/employer/${id}`,
      businessman_details: (id) => `${ROOTS.DASHBOARD}/requestLicense/businessman/${id}`,
      InstituteOwner_details: (id) => `${ROOTS.DASHBOARD}/requestLicense/InstituteOwner/${id}`,
      SellerOwner_details: (id) => `${ROOTS.DASHBOARD}/requestLicense/SellerOwner/${id}`,
      driver_details: (id) => `${ROOTS.DASHBOARD}/requestLicense/Driver/${id}`,
      lawyer_details: (id) => `${ROOTS.DASHBOARD}/requestLicense/Lawyer/${id}`,

    },
    lawyer: {
      root: `${ROOTS.DASHBOARD}/lawyer`,
      list: `${ROOTS.DASHBOARD}/lawyer/list`,
      filter: `${ROOTS.DASHBOARD}/lawyer/filter`,
      browse: `${ROOTS.DASHBOARD}/lawyer/browse`,
      document: `${ROOTS.DASHBOARD}/lawyer/document`,
      create: `${ROOTS.DASHBOARD}/lawyer/create`,
      edit: (id) => `${ROOTS.DASHBOARD}/lawyer/${id}/edit`,
      details: (id) => `${ROOTS.DASHBOARD}/lawyer/${id}`,
      my_details: `${ROOTS.DASHBOARD}/lawyer/my_details`,
    },
    lms_vendor: {
      root: `${ROOTS.DASHBOARD}/lms_vendor`,
      list: `${ROOTS.DASHBOARD}/lms_vendor/list`,
      filter: `${ROOTS.DASHBOARD}/lms_vendor/filter`,
      browse: `${ROOTS.DASHBOARD}/lms_vendor/browse`,
      document: `${ROOTS.DASHBOARD}/lms_vendor/document`,
      create: `${ROOTS.DASHBOARD}/lms_vendor/create`,
      edit: (id) => `${ROOTS.DASHBOARD}/lms_vendor/${id}/edit`,
      details: (id) => `${ROOTS.DASHBOARD}/lms_vendor/${id}`,
      my_details: `${ROOTS.DASHBOARD}/lms_vendor/my_details`,
    },
    Lms_client: {
      root: `${ROOTS.DASHBOARD}/Lms_client`,
      list: `${ROOTS.DASHBOARD}/Lms_client/list`,
      create: `${ROOTS.DASHBOARD}/Lms_client/create`,
      edit: (id) => `${ROOTS.DASHBOARD}/Lms_client/${id}/edit`,
      details: (id) => `${ROOTS.DASHBOARD}/Lms_client/${id}`,
    },
    chartered_accountant: {
      root: `${ROOTS.DASHBOARD}/chartered_accountant`,
      browse: `${ROOTS.DASHBOARD}/chartered_accountant/browse`,
      list: `${ROOTS.DASHBOARD}/chartered_accountant/list`,
      create: `${ROOTS.DASHBOARD}/chartered_accountant/create`,
      edit: (id) => `${ROOTS.DASHBOARD}/chartered_accountant/${id}/edit`,
      details: (id) => `${ROOTS.DASHBOARD}/chartered_accountant/${id}`,
      my_details: `${ROOTS.DASHBOARD}/chartered_accountant/my_details`,
      filter: `${ROOTS.DASHBOARD}/chartered_accountant/filter`,
    },
    LMS_contract: {
      root: `${ROOTS.DASHBOARD}/LMS_contract`,
      list: `${ROOTS.DASHBOARD}/LMS_contract/list`,
      create: `${ROOTS.DASHBOARD}/LMS_contract/create`,
      edit: (id) => `${ROOTS.DASHBOARD}/LMS_contract/${id}/edit`,
      details: (id) => `${ROOTS.DASHBOARD}/LMS_contract/${id}`,
    },
    LMS_court: {
      new: `${ROOTS.DASHBOARD}/LMS_court/new`,
    },
    LMS_cards: {
      new: `${ROOTS.DASHBOARD}/LMS_cards/new`,
    },
    LMS_demo: {
      new: `${ROOTS.DASHBOARD}/LMS_demo/new`,
    },
    LMS_case: {
      root: `${ROOTS.DASHBOARD}/LMS_case`,
      list: `${ROOTS.DASHBOARD}/LMS_case/list`,
      lawyer_list: `${ROOTS.DASHBOARD}/LMS_case/lawyer_list`,
      create: `${ROOTS.DASHBOARD}/LMS_case/create`,
      edit: (id) => `${ROOTS.DASHBOARD}/LMS_case/${id}/edit`,
      details: (id) => `${ROOTS.DASHBOARD}/LMS_case/${id}`,
    },
    LMS_caseDetails: {
      root: `${ROOTS.DASHBOARD}/LMS_caseDetails`,
      list: `${ROOTS.DASHBOARD}/LMS_caseDetails/list`,
      create: `${ROOTS.DASHBOARD}/LMS_caseDetails/create`,
      edit: (id) => `${ROOTS.DASHBOARD}/LMS_caseDetails/${id}/edit`,
      details: (id) => `${ROOTS.DASHBOARD}/LMS_caseDetails/${id}`,
    },
    LMS_service: {
      root: `${ROOTS.DASHBOARD}/LMS_service`,
      list: `${ROOTS.DASHBOARD}/LMS_service/list`,
      create: `${ROOTS.DASHBOARD}/LMS_service/create`,
      edit: (id) => `${ROOTS.DASHBOARD}/LMS_service/${id}/edit`,
      details: (id) => `${ROOTS.DASHBOARD}/LMS_service/${id}`,
    },
    LMS_document: {
      root: `${ROOTS.DASHBOARD}/LMS_document`,
      list: `${ROOTS.DASHBOARD}/LMS_document/list`,
      create: `${ROOTS.DASHBOARD}/LMS_document/create`,
      edit: (id) => `${ROOTS.DASHBOARD}/LMS_document/${id}/edit`,
      details: (id) => `${ROOTS.DASHBOARD}/LMS_document/${id}`,
    },
    LMS_sub_service: {
      root: `${ROOTS.DASHBOARD}/LMS_sub_service`,
      list: `${ROOTS.DASHBOARD}/LMS_sub_service/list`,
      create: `${ROOTS.DASHBOARD}/LMS_sub_service/create`,
      edit: (id) => `${ROOTS.DASHBOARD}/LMS_sub_service/${id}/edit`,
      details: (id) => `${ROOTS.DASHBOARD}/LMS_sub_service/${id}`,
    },
    lms_property_dispute: {
      root: `${ROOTS.DASHBOARD}/lms_property_dispute`,
      list: `${ROOTS.DASHBOARD}/lms_property_dispute/list`,
      details: (id) => `${ROOTS.DASHBOARD}/lms_property_dispute/${id}`,
    },
    LMSUserProfile: {
      root: `${ROOTS.DASHBOARD}/LMSUserProfile`,
      LMSUserProfile: {
        root: `${ROOTS.DASHBOARD}/LMSUserProfile`,
        new: `${ROOTS.DASHBOARD}/LMSUserProfile/new`,
      },
      STDUserProfile: {
        STDUserProfile: {
          root: `${ROOTS.DASHBOARD}/STDUserProfile`,
          new: `${ROOTS.DASHBOARD}/STDUserProfile/new`,
        },
        FarmerProfile: {
          root: `${ROOTS.DASHBOARD}/FarmerProfile`,
          new: `${ROOTS.DASHBOARD}/FarmerProfile/new`,
        },
      },
    },
  }
};

