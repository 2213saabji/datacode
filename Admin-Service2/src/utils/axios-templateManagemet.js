import axios from 'axios';

import { ATTPL_EMS_HOST_API } from 'src/config-global';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({ baseURL: ATTPL_EMS_HOST_API });

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
  const URL = `${ATTPL_EMS_HOST_API}${url}`;
  const res = await axios.post(URL, data, { ...headers });
  return res.data;
};

export const puter = async (url, data, headers) => {
  const URL = `${ATTPL_EMS_HOST_API}${url}`;
  const res = await axios.put(URL, data, { headers });
  return res.data;
};

export const deleter = async (url, headers) => {
  const URL = `${ATTPL_EMS_HOST_API}${url}`;
  const res = await axios.delete(URL, { ...headers });
  return res.data;
};
// ----------------------------------------------------------------------

export const endpoints = {
  templateManagement: {
    upload: '/template/create',
    fetchall: '/template/fetchAll',
    put: '/template/update/',
    download: '/template/download/',
    share: '/template/share/',
  },
  templateLibrary: {
    fetchAll: '/template/fetchAll',
  },
};
