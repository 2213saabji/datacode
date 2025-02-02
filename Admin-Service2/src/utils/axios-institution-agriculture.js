import axios from 'axios';

import { ATTPL_CMS_HOST_API } from 'src/config-global';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({ baseURL: ATTPL_CMS_HOST_API });

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
  const URL = `${ATTPL_CMS_HOST_API}${url}`;
  const res = await axios.post(URL, data, { headers });
  return res.data;
};

export const puter = async (url, data, headers) => {
  // const apiHost = import.meta.env.VITE_TEST_ATTPL_EMS_HOST_API;
  const URL = `${ATTPL_CMS_HOST_API}${url}`;
  // const URL = `${apiHost}${url}`;
  const res = await axios.put(URL, data, { headers });
  return res.data;
};

export const deleter = async (url, headers) => {
  const URL = `${ATTPL_CMS_HOST_API}${url}`;
  const res = await axios.delete(URL, { ...headers });
  return res.data;
};

// ----------------------------------------------------------------------

export const endpoints = {
  appoinmnetforagri: {
    list: '/agricultureAppointment/fetchAll',
    fetchByFarmer: '/agricultureAppointment/fetchByFarmer',
    fetchBySeller: '/agricultureAppointment/fetchBySeller',
    details: '/agricultureAppointment/fetch',
    update: '/agricultureAppointment/update',
    create: '/agricultureAppointment/create',
  },
  tractor: {
    list: '/tractorDetails/fetchAll',
    details: '/tractorDetails/fetch',
    update: '/tractorDetails/update',
    create: '/tractorDetails/create',
  },
  combineharvesters: {
    list: '/combineHarvester/fetchAll',
    details: '/combineHarvester/fetch',
    update: '/combineHarvester/update',
    create: '/combineHarvester/create',
  },
  irrigation: {
    list: '/irrigationSystemDetails/fetchAll',
    details: '/irrigationSystemDetails/fetch',
    update: '/irrigationSystemDetails/update',
    create: '/irrigationSystemDetails/create',
  },
  schoolDetails: {
    list: '/schoolDetails/fetchAll',
    edit: '/schoolDetails/update',
    details: '/schoolDetails/fetch',
    update: '/schoolDetails/update',
    create: '/schoolDetails/create',
  },
  institutionOwner: {
    list: '/instituionOwnerDetails/fetchList',
    edit: '/instituionOwnerDetails/update',
    details: '/instituionOwnerDetails/fetch',
    update: '/instituionOwnerDetails/update',
    create: '/instituionOwnerDetails/create',
  },
  college: {
    list: '/collegeDetails/fetchAll',
    edit: '/collegeDetails/update',
    details: '/collegeDetails/fetch',
    update: '/collegeDetails/update',
    create: '/collegeDetails/create',
  },
  coaching: {
    list: '/coachingCenterDetails/fetchAll',
    edit: '/coachingCenterDetails/update',
    details: '/coachingCenterDetails/fetch',
    update: '/coachingCenterDetails/update',
    create: '/coachingCenterDetails/create',
  },
  cultivation: {
    list: '/cultivationEquipment/fetchAll',
    details: '/cultivationEquipment/fetch',
    update: '/cultivationEquipment/update',
    create: '/cultivationEquipment/create',
  },
  modernAgri: {
    list: '/modernAgriTools/fetchAll',
    details: '/modernAgriTools/fetch',
    update: '/modernAgriTools/update',
    create: '/modernAgriTools/create',
  },
  sellerDetails: {
    list: '/sellerDetails/fetchAll',
    details: '/sellerDetails/fetch',
    update: '/sellerDetails/update',
    create: '/sellerDetails/create',
  },
  // institutionDetails: {
  //   list: '/instituionDetails/fetchAll',
  //   edit: '/instituionDetails/update',
  //   details: '/instituionDetails/fetch',
  //   update: '/instituionDetails/update',
  //   create: '/instituionDetails/create',
  // },
  appointment: {
    list: '/instituteAppointmentBooking/fetchAll',
    studentList: '/instituteAppointmentBooking/fetchByStudent',
    instituteAppointmentList: '/instituteAppointmentBooking/fetchByInstitution',
    edit: '/instituteAppointmentBooking/update',
    details: '/instituteAppointmentBooking/fetch',
    update: '/instituteAppointmentBooking/update',
    create: '/instituteAppointmentBooking/create',
  },

  cattle: {
    list: '/cattleTypeDetails/fetchAll',
    details: '/cattleTypeDetails/fetch',
    update: '/cattleTypeDetails/update',
    create: '/cattleTypeDetails/create',
  },
  cattleDetails: {
    list: '/cattleDetails/fetchAll',
    details: '/cattleDetails/fetch',
    update: '/cattleDetails/update',
    create: '/cattleDetails/create',
  },
  equipment: {
    list: '/equipmentType/fetchAll',
    details: '/equipmentType/fetch',
    update: '/equipmentType/update',
    create: '/equipmentType/create',
  },
  equipmentDetails: {
    list: '/equipmentDetails/fetchAll',
    details: '/equipmentDetails/fetch',
    update: '/equipmentDetails/update',
    create: '/equipmentDetails/create',
  }
};
