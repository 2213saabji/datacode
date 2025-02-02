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
  labour_job: {
    list: '/jobPost/fetchAll',
    details: '/jobPost/fetch',
    create: '/jobPost/create',
    update: '/jobPost/update',
    jobType_list: '/jobTypes/fetchAll',
    jobType_category: '/jobCategory/fetch',
  },
};
