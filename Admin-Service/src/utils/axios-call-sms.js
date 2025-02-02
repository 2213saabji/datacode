import axios from 'axios';

import { ATTPL_SMS_HOST_API } from 'src/config-global';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({ baseURL: ATTPL_SMS_HOST_API });

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
  const URL = `${ATTPL_SMS_HOST_API}${url}`;
  const res = await axios.post(URL, data, { headers });
  return res.data;
};

export const puter = async (url, data, headers) => {
  const URL = `${ATTPL_SMS_HOST_API}${url}`;
  const res = await axios.put(URL, data, { headers });
  return res.data;
};

export const deleter = async (url, headers) => {
  const URL = `${ATTPL_SMS_HOST_API}${url}`;
  const res = await axios.delete(URL, { ...headers });
  return res.data;
};

const STORAGE_KEY = 'accessToken';
const accessToken = localStorage.getItem(STORAGE_KEY);

export const uploadsmsFileInAWSS3 = async (data) => {
  try {
    const response = await axios.post(`${ATTPL_SMS_HOST_API}/support/upload-image`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response;
  } catch (err) {
    return err;
  }
};
// ----------------------------------------------------------------------

export const endpoints = {
  sms: {
    list: '/support/fetchAll',
    details: '/support/fetch',
    create: '/support/create',
    update: '/support/update',
    delete: '/support/delete',
    count: 'support/records-count',
  },
  remark: {
    list: '/remark/fetchAll',
    details: '/remark/fetch',
    create: '/remark/create',
    update: '/remark/update',
    delete: '/remark/delete',
  },
};
