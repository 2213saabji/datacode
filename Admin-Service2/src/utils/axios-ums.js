import axios from 'axios';

import { ATTPL_UMS_HOST_API } from 'src/config-global';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({ baseURL: ATTPL_UMS_HOST_API });

axiosInstance.interceptors.response.use(
  (res) => res,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export default axiosInstance;

// ----------------------------------------------------------------------

export const fetcher = async (args) => {
  const [url, config] = Array.isArray(args) ? args : [args];

  const res = await axiosInstance.get(url, { ...config });

  return res.data;
};

export const poster = async (url, data, headers) => {
  const URL = `${ATTPL_UMS_HOST_API}${url}`;
  const res = await axios.post(URL, data, { headers });
  return res.data;
};

export const puter = async (url, data, headers) => {
  const URL = `${ATTPL_UMS_HOST_API}${url}`;
  const res = await axios.put(URL, data, { headers });
  return res.data;
};

export const deleter = async (url, headers) => {
  const URL = `${ATTPL_UMS_HOST_API}${url}`;
  const res = await axios.delete(URL, { ...headers });

  return res.data;
};

export const getter = async (url, headers) => {
  const URL = `${ATTPL_UMS_HOST_API}${url}`;
  const res = await axios.get(URL, { ...headers });

  return res;
};

// ----------------------------------------------------------------------

export const endpoints = {
  user: {
    get: '/user/profile/fetch',
    getUserIdByNo: '/user/fetch/userId/userProfileId',
    list: '/user/fetchAll',
    searchList: '/user/search?',
    details: '/user/profile/fetch',
    create: '/user/create/user-profile-details',
    createIdentity: '/user/create/user-identity-details',
    createAddress: '/user/create/user-addresses',
    updateScriptData: '/user/over-ride/user-details',
    update: '/user/update/user-profile-details',
    updateIdentity: '/user/update/user-identity-details',
    updateAddress: '/user/update/user-addresses',
    updateUserDetails: '/user/update',
    updateUserPopup: '/user/pop-up/form',
    voterReferral: '/user/voter-referral',
    UpdatepopUpForm: '/user/update/pop-up',
    uploadProfileImage: '/user/create/user-profile-image',
    updateProfileImage: '/user/update/user-profile-image',
    updateTooglePayment: '/user/toggle/payment-page',
    updateTooglePaymentStatus: '/user/fetch/payment-page/status',
    uploadDoctorForm: '/user/create/doctor-details',
    uploadEmployerForm: '/user/employer/create',
    uploadBusinessmanForm: '/user/businessman/create',
    uploadInstituteOwnerForm: '/institutionOwner/create',
    uploadSellerOwnerForm: '/sellerOwner/create',
    uploadDriverForm: '/driverUMS/createWithVehicle',
    uploadProviderForm: '/provider/create',
    uploadCaForm: '/law/CA/create',
    uploadLawyerRegForm: '/law/lawyer/create',
    uploadVendorRegForm: '/law/vendor/create',
    createSocialLink: '/user/socialLinks/create',
    socialLinkList: '/user/socialLinks/fetch',
    socialLinkUpdate: '/user/socialLinks/update',
    getSocialLink: '/user/socialLinks/fetch',
    getSocialLinkDetails: '/user/socialLinks/fetch',
  },
  userRoles: {
    list: '/user/user-role/fetchAll',
    details: '/user/user-role/fetch',
    create: '/user/create/user-role',
    update: '/user/update/user-role',
    updateUserProfile: '/user/profile/fetch',
    getUserRoles: '/user/user-role/fetchAll/product-based',
  },
  productRoles: {
    create: '/user/create/product-detail',
    list: '/user/product-details/fetchAll',
    update: '/user/update/product-detail',
    details: '/user/fetch/product-detail',
  },
  productMappingroles: {
    update: '/user/mapping/update/product-role',
    list: '/user/product-role/fetchAll',
  },
  requestLicenseAcceptance: {
    UpdateAccountAccept: '/user/verify/profession-details',
    SendVerification: '/user/send-mail/profession-details',
    Doctorlist: '/user/fetch-All/doctor-details',
    Doctordetails: '/user/fetch/doctor-details',
    DoctorRowDelete: '/user/delete/doctor-details',
    DoctorRejectRequest: '/user/update/doctor-details',
    Employerlist: '/user/employer/fetch-All',
    Employerdetails: '/user/employer/fetch',
    EmployerRowDelete: '/user/employer/delete',
    EmployerRejectRequest: '/user/employer/update',
    Businessmanlist: '/user/businessman/fetch-All',
    Businessmandetails: '/user/businessman/fetch',
    BusinessmanRowDelete: '/user/businessman/delete',
    BusinessmanRejectRequest: '/user/businessman/update',
    InstituteOwnerlist: '/institutionOwner/fetchAll',
    InstituteOwnerdetails: '/institutionOwner/fetch',
    InstituteOwnerRejectRequest: '/institutionOwner/update',
    SellerOwnerlist: '/sellerOwner/fetchList',
    SellerOwnerdetails: '/sellerOwner/fetch',
    SellerOwnerRejectRequest: '/sellerOwner/update',
    ServiceHistorylist: '/user/fetch/services-history',
    Driverlist: '/driverUMS/fetchAll',
    DriverRejectRequest: '/driverUMS/update',
    Driverdetails: '/driverUMS/fetch',
    Laywerlist: '/law/fetchAllLawyer',
    LawyerRejectRequest: '/law/lawyer/update',
    LawyerDetails: '/law/lawyer/fetch',
    Vendorlist: '/law/fetchAllvendor',
    VendorRejectRequest: '/law/vendor/update',
    VendorDetails: '/law/vendor/fetch',

  },
  interestedConsumer: {
    create: '/interestedConsumer/create',
    list: '/interestedConsumer/fetchAll',
    update: '/interestedConsumer/update',
    details: '/interestedConsumer/fetch',
    fetchBySeller: '/interestedConsumer/fetchBySeller',
    fetchByConsumerId: '/interestedConsumer/fetchByConsumer',
  }
};
