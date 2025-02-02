// Define environments
const environments = {
  PROD: {
    HOST_API: 'https://api-dev-minimal-v510.vercel.app',
    ATTPL_EMS_HOST_API: 'https://api.attplems.com/ems/api/v1',
    ATTPL_CMS_HOST_API: 'https://api.attplems.com/cms/api/v1',
    ATTPL_UMS_HOST_API: 'https://api.attplems.com/ums/api/v1',
    ATTPL_BMS_HOST_API: 'https://api.attplems.com/bms/api/v1',
    ATTPL_OTP_HOST_API: 'https://api.attplems.com/ums/api/v1',
    ATTPL_EXPMS_HOST_API: 'https://api.attplems.com/expms/api/v1',
    // ATTPL_TMS_HOST_API: 'https://api.attplems.com/tms/api/v1',
    ATTPL_TMS_HOST_API: 'http://localhost:9080/api/v1',
    ATTPL_AMS_HOST_API: 'https://api.attplems.com/ams/api/v1',
    ATTPL_CHAT_HOST_API: 'https://api.attplems.com/cs/api/v1',
    ATTPL_CS_HOST_API: 'https://api.attplems.com/cs/api/v1',
  },
  DEV: {
    HOST_API: 'https://api-dev-minimal-v510.vercel.app',
    ATTPL_EMS_HOST_API: 'https://emsdevapi.attplems.com/api/v1',
    ATTPL_CMS_HOST_API: 'https://cmsdevapi.attplems.com/api/v1',
    ATTPL_UMS_HOST_API: 'https://umsdevapi.attplems.com/api/v1',
    ATTPL_BMS_HOST_API: 'https://bmsdevapi.attplems.com/api/v1',
    ATTPL_OTP_HOST_API: 'https://omsdevapi.attplems.com/api/v1',
    ATTPL_EXPMS_HOST_API: 'https://expmsdevapi.attplems.com/api/v1',
    ATTPL_TMS_HOST_API: 'https://tmsdevapi.attplems.com/api/v1',
    ASSETS_API: 'https://api-dev-minimal-v510.vercel.app',
    ATTPL_AMS_HOST_API: 'https://localhost:8090/api/v1',
    ATTPL_CHAT_HOST_API: 'https://csdevapi.attplems.com/api/v1',
    ATTPL_CHAT_SOCKET_HOST_API: 'https://csdevapi.attplems.com',
    //  ATTPL_TMS_SOCKET_HOST_API: 'https://tmsdevapi.attplems.com',
    ATTPL_TMS_SOCKET_HOST_API: 'http://localhost:8086',
    ATTPL_VMS_HOST_API: 'http://localhost:8088/api/v1',
    ATTPL_CS_HOST_API: 'https://csdev.attplems.com/api/v1',
  },
  TEST: {
    HOST_API: 'https://api-dev-minimal-v510.vercel.app',
    ATTPL_EMS_HOST_API: 'http://localhost:8080/api/v1',
    ATTPL_CMS_HOST_API: 'http://localhost:8082/api/v1',
    ATTPL_UMS_HOST_API: 'http://localhost:8083/api/v1',
    ATTPL_OTP_HOST_API: 'http://localhost:8085/api/v1',
    ATTPL_EXPMS_HOST_API: 'http://localhost:8081/api/v1',
    ATTPL_TMS_HOST_API: 'http://localhost:8080/api/v1',
    ASSETS_API: 'https://api-dev-minimal-v510.vercel.app',
    ATTPL_AMS_HOST_API: 'http://localhost:8090/api/v1',
    ATTPL_CS_HOST_API: 'http://localhost:8084/api/v1',
  },
  LOCAL: {
    ATTPL_EMS_HOST_API: 'http://localhost:9080/api/v1',
    ATTPL_CMS_HOST_API: 'http://localhost:9082/api/v1',
    ATTPL_UMS_HOST_API: 'http://localhost:9083/api/v1',
    ATTPL_OTP_HOST_API: 'http://localhost:9085/api/v1',
    ATTPL_EXPMS_HOST_API: 'http://localhost:9081/api/v1',
    ATTPL_TMS_HOST_API: 'http://localhost:9080/api/v1',
    ATTPL_AMS_HOST_API: 'http://localhost:9091/api/v1',
    ATTPL_CS_HOST_API: 'http://localhost:9084/api/v1',
  },
};

// Determine the environment
const NODE_ENV = 'DEV';
console.log(`ATTPL EMS Running of ${NODE_ENV}`);

// Extract environment variables based on the current environment
const env = environments[NODE_ENV];

// AWS configuration
const aws = {
  ATTPL_AWS_ACCESS_KEY_ID:
    process.env.REACT_NATIVE_ACCESS_KEY_ID || 'AKIAYS2NR63RKGO4GMP7',
  ATTPL_AWS_SECRET_ACCESS_KEY:
    process.env.REACT_NATIVE_SECRET_ACCESS_KEY ||
    '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',
  ATTPL_AWS_REGION: process.env.REACT_NATIVE_REGION || 'ap-south-1',
  ATTPL_AWS_BUCKET: process.env.REACT_NATIVE_BUCKET || 'attplgrouppublic',
};

// Chat configuration
const chat = {
  ATTPL_CHAT_LICENCE_KEY_ID:
    process.env.REACT_NATIVE_LICENCE_KEY_ID || 'lIf7rxkhCSLBWXXxC0FjkgAbfEDUmf',
  ATTPL_MIRROR_FLY_API_BASE_URL:
    process.env.REACT_NATIVE_MIRROR_FLY_API_BASE_URL ||
    'https://ashokatodaytech-api.mirrorfly.com/api/v1',
};

// Firebase configuration
const trip_firebase = {
  ATTPL_TMS_FIREBASE_API_KEY:
    process.env.REACT_NATIVE_FIREBASE_API_KEY ||
    'AIzaSyBBL_paaXbFiF0_A9sq8ll1IvYCb5If35c',
  ATTPL_TMS_FIREBASE_AUTH_DOMAIN:
    process.env.REACT_NATIVE_FIREBASE_AUTH_DOMAIN ||
    'attpl-tms.firebaseapp.com',
  ATTPL_TMS_FIREBASE_DATABASE_URL:
    process.env.REACT_NATIVE_FIREBASE_DATABASE_URL ||
    'https://attpl-tms-default-rtdb.firebaseio.com',
  ATTPL_TMS_FIREBASE_PROJECT_ID:
    process.env.REACT_NATIVE_FIREBASE_PROJECT_ID || 'attpl-tms',
  ATTPL_TMS_FIREBASE_STORAGE_BUCKET:
    process.env.REACT_NATIVE_FIREBASE_STORAGE_BUCKET || 'attpl-tms.appspot.com',
  ATTPL_TMS_FIREBASE_MESSAGING_SENDER_ID:
    process.env.REACT_NATIVE_FIREBASE_MESSAGING_SENDER_ID || '8729571111',
  ATTPL_TMS_FIREBASE_APP_ID:
    process.env.REACT_NATIVE_FIREBASE_APP_ID ||
    '1:8729571111:web:f3c40bf528573eb5a24302',
  ATTPL_TMS_FIREBASE_MEASUREMENT_ID:
    process.env.REACT_NATIVE_FIREBASE_MESUREMENT_ID || 'G-TXZGYXW6NL',
};

module.exports = {
  ...env,
  ...aws,
  ...chat,
  ...trip_firebase,
};
