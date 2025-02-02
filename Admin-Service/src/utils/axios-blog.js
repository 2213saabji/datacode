import axios from 'axios';

import { ATTPL_BMS_HOST_API } from 'src/config-global';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({ baseURL: ATTPL_BMS_HOST_API });

axiosInstance.interceptors.response.use(
  (res) => res,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export default axiosInstance;

// ----------------------------------------------------------------------

export const fetcher = async (args) => {
  const [url, config] = Array.isArray(args) ? args : [args];
  console.log(url);
  const res = await axiosInstance.get(url, { ...config });
  return res.data;
};

export const poster = async (url, data, headers) => {
  const URL = `${ATTPL_BMS_HOST_API}${url}`;
  const res = await axios.post(URL, data, { headers });
  return res.data;
};

export const puter = async (url, data, headers) => {
  const URL = `${ATTPL_BMS_HOST_API}${url}`;
  const res = await axios.put(URL, data, { headers });
  return res.data;
};

export const deleter = async (url, headers) => {
  const URL = `${ATTPL_BMS_HOST_API}${url}`;
  const res = await axios.delete(URL, { ...headers });
  return res.data;
};
// ----------------------------------------------------------------------

export const endpoints = {
  blog: {
    create: '/blog/create',
    list: '/blog/fetchAll',
    details: '/blog/fetch',
    edit: '/blog/update',
    delete: '/blog/delete',
  },
  student: {
    getjobs: '/jobs/fetch/job',
    getAllJobTypes: '/jobs/jobtype/fetchAll',
    getAllJobDesiredData: '/jobs/job-details',
    getCollegesByState: '/jobs/fetch',
  },
  farmer: {
    getSoilType: '/farmer/fetch/soil-types',
    getSeasonType: '/farmer/fetch/season-types',
    getCropType: '/farmer/fetch/croptypesbysoilseason',
    fetchfarmerConditions: '/farmer/fetchfarmerConditions',
  },

  card: {
    create: '/routes/create',
    fetchAll: '/routes/fetch',
  },
  complaints: {
    fetchAll: '/complaints/complaintSectionRoutes/fetchAll',
  },
  complaintsAll: {
    fetchRoute: '/complaints/complainsection',
  },
};
