import {configureStore} from '@reduxjs/toolkit';
import themeReducer from './slices/themeSlice';
import appBarReducer from './slices/appBarSlice';
import authReducer from './slices/UMS/authSlice';
import govermentSchemaReducer from './slices/UMS/govermentSchemaslice';
import jobReducer from './slices/CRM/LabourJobPortalSlice';
import mobileOtpReducer from './slices/OMS/MobileSlice';
import emailOtpReducer from './slices/OMS/EmailSlice';
import chatReducer from './slices/CMS/ChatSlice';
// import deliveryReducer from './slices/tms/deliveryDetailsSlice'
const store = configureStore({
  reducer: {
    theme: themeReducer,
    appBar: appBarReducer,
    auth: authReducer,
    jobs: jobReducer,
    mobileOtp: mobileOtpReducer,
    emailOtp: emailOtpReducer,
    govermentSchema: govermentSchemaReducer,
    chat: chatReducer,
    // delivery:deliveryReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
