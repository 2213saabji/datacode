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

// Api Call For contact
export const poster = async (URL, data, header) => {
  const res = await axios.post(URL, data, header);
  return res.data;
};

// ----------------------------------------------------------------------

export const endpoints = {
  contact: {
    create: '/contact/create',
  },
  otp: {
    sent: '/otp/generate',
    verify: '/otp/verify',
  },
  email: {
    sent: '/email/otp/generate',
    verify: '/email/otp/verify',
  },
  work: {
    list: 'mock-data/our-work/fetchAll',
  },
};
