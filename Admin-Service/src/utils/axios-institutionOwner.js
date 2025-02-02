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

// ----------------------------------------------------------------------

export const endpoints = {
  institutionOwner: {
    list: '/institutionOwner/fetchList',
    edit: '/institutionOwner/update',
    details: '/institutionOwner/fetch',
    update: '/institutionOwner/update',
    create: '/institutionOwner/create',
  },
  institution: {
    list: '/institution/fetchAll',
    edit: '/institution/update',
    details: '/institution/fetch',
    update: '/institution/update',
    create: '/institution/create',
  },
  appointment: {
    list: '/instituteAppointmentBooking/fetchAll',
    edit: '/instituteAppointmentBooking/update',
    details: '/instituteAppointmentBooking/fetch',
    update: '/instituteAppointmentBooking/update',
    create: '/instituteAppointmentBooking/create',
  },
};
