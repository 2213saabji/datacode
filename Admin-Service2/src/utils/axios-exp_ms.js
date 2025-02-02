import axios from 'axios';

import { ATTPL_EXPMS_HOST_API } from 'src/config-global';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({ baseURL: ATTPL_EXPMS_HOST_API });

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
  const URL = `${ATTPL_EXPMS_HOST_API}${url}`;
  const res = await axios.post(URL, data, { headers });
  return res.data;
};

export const puter = async (url, data, headers) => {
  const URL = `${ATTPL_EXPMS_HOST_API}${url}`;
  const res = await axios.put(URL, data, { headers });
  return res.data;
};

export const deleter = async (url, headers) => {
  const URL = `${ATTPL_EXPMS_HOST_API}${url}`;
  const res = await axios.delete(URL, { ...headers });
  return res.data;
};

// ----------------------------------------------------------------------

export const endpoints = {
  exp_category: {
    list: '/expense/category/fetchAll',
    details: '/expense/category/fetch',
    update: '/expense/category/update',
    create: '/expense/category/create',
  },
  exp_claim: {
    list: '/expense/claims/approver/fetchAll',
    my_list: '/expense/claims/user/fetchAll',
    details: '/expense/claims/fetch',
    update: '/expense/claims/update',
    create: '/expense/claims/create',
    upload_img: '/expense/claims/create/claim-images',
  },
  exp_invoice: {
    list: '/invoice/fetchAll',
    details: '/invoice/fetch',
    update: '/invoice/update',
    create: '/invoice/create',
  },
  exp_order: {
    update: '/order/update',
    create: '/order/create',
    check: '/order/findByPhone',
  },
};
