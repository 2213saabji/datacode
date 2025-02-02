const appScreens = [
  {
    name: 'Notifications',
    icon: 'notifications',
    path: '/notifications',
    stack: 'AppScreens',
  },
  {
    name: 'Profile',
    icon: 'person',
    path: '/profile',
    stack: 'AppScreens',
  },
  {
    name: 'Language',
    icon: 'language',
    path: '/language',
    stack: 'AppScreens',
  },
  {
    name: 'About',
    icon: 'information',
    path: '/about',
    stack: 'AppScreens',
  },

  {
    name: 'Settings',
    icon: 'settings',
    path: '/settings',
    stack: 'AppScreens',
  },
  {
    name: 'AppSetting',
    icon: 'settings',
    path: '/app-setting',
    stack: 'AppScreens',
  },
  {
    name: 'Privacy',
    icon: 'lock-closed',
    path: '/privacy',
    stack: 'AppScreens',
  },
  {
    name: 'ChangePassword',
    icon: 'key',
    path: '/change-password',
    stack: 'AppScreens',
  },
  {
    name: 'PrivacyPolicy',
    icon: 'document-text',
    path: '/privacy-policy',
    stack: 'AppScreens',
  },
  {
    name: 'ProfileInformation',
    icon: 'information-circle',
    path: '/profile-information',
    stack: 'AppScreens',
  },
  {
    name: 'EditProfile',
    icon: 'create',
    path: '/edit-profile',
    stack: 'AppScreens',
  },
  {
    name: 'UpgradeAccount',
    icon: 'create',
    path: '/edit-profile',
    stack: 'AppScreens',
  },
  {
    name: 'DoctorUpgradeAccountForm',
    icon: 'create',
    path: '/edit-profile',
    stack: 'AppScreens',
  },
  {
    name: 'EmployerUpgradeAccountForm',
    icon: 'create',
    path: '/edit-profile',
    stack: 'AppScreens',
  },
  {
    name: 'InstitutionOwnerUpgradeAccountForm',
    icon: 'create',
    path: '/edit-profile',
    stack: 'AppScreens',
  },
  {
    name: 'AgricultureEquipmentSellerUpgradeAccountForm',
    icon: 'create',
    path: '/edit-profile',
    stack: 'AppScreens',
  },
  {
    name: 'BusinessmanUpgradeAccountForm',
    icon: 'create',
    path: '/edit-profile',
    stack: 'AppScreens',
  },
  {
    name: 'DriverUpgradeAccountForm',
    icon: 'create',
    path: '/edit-profile',
    stack: 'AppScreens',
  },
  {
    name: 'ServiceProviderUpgradeAccountForm',
    icon: 'create',
    path: '/edit-profile',
    stack: 'AppScreens',
  },
  {
    name: 'ManageMyAccount',
    icon: 'person',
    path: '/manage-my-account',
    stack: 'AppScreens',
  },

  {
    name: 'SendFeedback',
    icon: 'chatbox',
    path: '/send-feedback',
    stack: 'AppScreens',
  },
  {
    name: 'RateApp',
    icon: 'star',
    path: '/rate-app',
    stack: 'AppScreens',
  },
  {
    name: 'Updates',
    icon: 'refresh',
    path: '/updates',
    stack: 'AppScreens',
  },
  {
    name: 'Book-DoctorAppointment',
    icon: 'medkit',
    path: '/doctor-book-appointment/create',
    stack: 'Main',
    // category: 'HEALTH SERVICES',
  },
  {
    name: 'DoctorAppointmentList',
    icon: 'medkit',
    path: '/doctor-book-appointment/list',
    stack: 'Main',
    // category: 'HEALTH SERVICES',
  },
  {
    name: 'Book-CandidateAppointment',
    icon: 'medkit',
    path: '/candidate-book-appointment/create',
    stack: 'Main',
    // category: 'HEALTH SERVICES',
  },
  {
    name: 'CandidateAppointmentList',
    icon: 'medkit',
    path: '/candidate-book-appointment/list',
    stack: 'Main',
    // category: 'HEALTH SERVICES',
  },
  {
    name: 'Support',
    icon: 'help-circle',
    path: '/support',
    stack: 'AppScreens',
  },
  {
    name: 'Help',
    icon: 'help',
    path: '/help',
    stack: 'AppScreens',
  },
  {
    name: 'FAQ',
    icon: 'information-circle',
    path: '/faq',
    stack: 'AppScreens',
  },

  {
    name: 'InviteFriend',
    icon: 'person-add',
    path: '/invite-friend',
    stack: 'AppScreens',
  },
];

export default appScreens;

export const USER_GENDER_OPTIONS = [
  {label: 'MALE', value: 'Male'},
  {label: 'FEMALE', value: 'Female'},
  {label: 'OTHERS', value: 'Others'},
];

export const JOB_TITLES = [
  // Professional & Technical
  {value: 'Farmer', label: 'Farmer'},
  {value: 'Labour', label: 'Labour'},
  {value: 'Student', label: 'Student'},
  {value: 'Self Employed', label: 'Self Employed'},
  {value: 'Government Employee', label: 'Government Employee'},
  {value: 'Private Employee', label: 'Private Employee'},
  {value: 'Others', label: 'Others'},
];

export const USER_HIGHEST_QUALIFICATION_OPTIONS = [
  {value: 'High School Diploma', label: 'High School Diploma'},
  {value: 'Associate Degree', label: 'Associate Degree'},
  {value: "Bachelor's Degree", label: "Bachelor's Degree"},
  {value: "Master's Degree", label: "Master's Degree"},
  {value: 'Doctorate (Ph.D.)', label: 'Doctorate (Ph.D.)'},
  {value: 'Professional Degree', label: 'Professional Degree'},
  {
    value: 'Vocational Degree/Certificate',
    label: 'Vocational Degree/Certificate',
  },
  {value: 'Diploma', label: 'Diploma'},
  {value: 'Postdoctoral Degree', label: 'Postdoctoral Degree'},
  {value: 'Honorary Degree', label: 'Honorary Degree'},
  {value: 'No Education', label: 'No Education'},
];

export const religionsInIndia = [
  {label: 'HINDU', value: 'Hindu'},
  {label: 'ISLAM', value: 'Islam'},
  {label: 'CHRISTIAN', value: 'Christian'},
  {label: 'SIKH', value: 'Sikh'},
  {label: 'BUDDH', value: 'Buddh'},
  {label: 'JAIN', value: 'Jain'},
  {label: 'ZOROASTRIAN (PARSIS)', value: 'Zoroastrian (Parsis)'},
  {label: 'JUDA', value: 'Juda'},
  {label: "BAHÁ'Í FAITH", value: "Bahá'í Faith"},
  {
    label: 'TRIBAL AND INDIGENOUS BELIEFS',
    value: 'Tribal and Indigenous Beliefs',
  },
  {label: 'ANIM', value: 'Anim'},
  {label: 'SPIRIT WORSHIP', value: 'Spirit Worship'},
  {label: 'RAVIDAS', value: 'Ravidas'},
  {label: 'SANAMAH', value: 'Sanamah'},
  {label: 'SARNA', value: 'Sarna'},
  {label: 'AYYAVAZHI', value: 'Ayyavazhi'},
  {label: 'KIRAT MUNDHUM', value: 'Kirat Mundhum'},
  {label: 'LUKUMI', value: 'Lukumi'},
  {label: 'SHAMAN', value: 'Shaman'},
  {label: 'NAGA RELIGION', value: 'Naga Religion'},
  {label: 'SANATAN', value: 'Sanatan'},
];
