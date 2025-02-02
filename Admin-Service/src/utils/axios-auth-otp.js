import axios from 'axios';

import { ATTPL_OTP_HOST_API } from 'src/config-global';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({ baseURL: ATTPL_OTP_HOST_API });

axiosInstance.interceptors.response.use(
  (res) => res,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export default axiosInstance;

// ----------------------------------------------------------------------

export const fetcher = async (args) => {
  const [url, config] = Array.isArray(args) ? args : [args];
  // console.log(url);

  const res = await axiosInstance.get(url, { ...config });

  return res.data;
};

// Api Call For contact
export const poster = async (URL, data, header) => {
  const res = await axios.post(URL, data, header);
  return res.data;
};

export const puter = async (url, data, headers) => {
  const URL = `${ATTPL_OTP_HOST_API}${url}`;
  const res = await axios.put(URL, data, { headers });
  return res.data;
};

export const deleter = async (url, headers) => {
  const URL = `${ATTPL_OTP_HOST_API}${url}`;
  const res = await axios.delete(URL, { ...headers });
  return res.data;
};

// ----------------------------------------------------------------------

export const endpoints = {
  otp: {
    sent: '/otp/generate',
    verify: '/otp/verify',
  },
  email: {
    sent: '/email/otp/generate',
    verify: '/email/otp/verify',
  },
};
