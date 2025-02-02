import axios from 'axios';

import { ATTPL_TMS_HOST_API } from 'src/config-global';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({ baseURL: ATTPL_TMS_HOST_API });

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

export const fetcher2 = async (args) => {
  const [url, config] = Array.isArray(args) ? args : [args];

  const res = await axiosInstance.post(url, { ...config });

  return res.data;
};

export const poster = async (url, data, headers) => {
  const URL = `${ATTPL_TMS_HOST_API}${url}`;
  const res = await axios.post(URL, data, { headers });
  return res.data;
};

//  generate mobile otp
export const otpPoster = async (URL, data, header) => {
  const res = await axios.post(URL, data, header);
  return res.data;
};

// verify mobile otp
export const otpVerify = async (URL, data, header) => {
  const res = await axios.post(URL, data, header);
  return res.data;
};

export const puter = async (url, data, headers) => {
  const URL = `${ATTPL_TMS_HOST_API}${url}`;
  const res = await axios.put(URL, data, { headers });
  return res.data;
};

export const deleter = async (url, headers) => {
  const URL = `${ATTPL_TMS_HOST_API}${url}`;
  const res = await axios.delete(URL, { ...headers });
  return res.data;
};
// ----------------------------------------------------------------------

export const endpoints = {
  driver: {
    list: '/driver/fetchAll',
    details: '/driver/fetch',
    create: '/driver/create',
    update: '/driver/update',
  },
  vehicle: {
    list: '/vehicle/fetchAll',
    details: '/vehicle/fetch',
    create: '/vehicle/create',
    edit: '/vehicle/update',
  },
  trip: {
    requestedList: '/trip/fetchAll/1',
    managedList: '/trip/fetchAll/0',
    details: '/trip/fetch',
    create: '/trip/create',
    edit: '/trip/update',
    managedListdetails: '/trip/fetch',
    list: '/trip/fetchAll',
  },
  ambulance: {
    list: '/trip/fetchAll/ambulance',
    details: '/trip/ambulance/fetch',
    create: '/trip/ambulance/create',
    edit: '/trip/update/ambulance',
  },
  emergencyService: {
    list: '/emergancy-helpline/fetchAll',
    details: '/emergancy-helpline/fetch',
    create: '/emergancy-helpline/create',
    edit: '/emergancy-helpline/update'
  },
  vehicleBookingOption: {
    list: '/vehicle-option/fetchAll',
    details: '/vehicle-option/fetchSingle',
    create: '/vehicle-option/create',
    edit: '/vehicle-option/updateVehicleOption'
  },
  wardvol: {
    list: '/trip/fetchAll',
    details: '/trip/fetch',
    create: '/trip/create',
    edit: '/trip/update',
  },
  wardleader: {
    list: '/trip/fetchAll',
    details: '/trip/fetch',
    create: '/trip/create',
    edit: '/trip/update',
    driverList: '/driver/fetchAll',
  },
  user: {
    searchList: '/user/search?',
  },
  voterTrip: {
    travellerList: '/trip/traveller/fetchAll',
  },
  otp: {
    generate: '/otp/generateTMS',
    verify: '/otp/verify',
  },
};
