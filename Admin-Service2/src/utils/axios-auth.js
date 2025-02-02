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
  const res = await axios.post(URL, data, { ...headers });
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
  auth: {
    me: '/user/profile/fetch',
    login: '/user/login',
    register: '/user/signup',
    registerInsideLogin: '/user/add-voter/form',
    forgotpassword: '/user/password/new',
    verify: '/user/update',
    delete: '/user/delete',
    refferal: '/user/voter-referral',
    newPassword: '/user/password/updatePassword',
  },
};
