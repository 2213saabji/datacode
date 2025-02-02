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

// export const uploaddrappoinmentFilesInAWSS3 = async (data) => {
//   try {
//       const response = await axios.post(`${ATTPL_CMS_HOST_API}/expense/claims/upload-images`, data, {
//           headers: {
//               'Content-Type': 'multipart/form-data',
//               Authorization: `Bearer ${accessToken}`,
//           }
//       });
//       return response;
//   } catch (err) {
//       return err;
//   }

// }
export const poster = async (url, data, headers) => {
  const URL = `${ATTPL_CMS_HOST_API}${url}`;
  const res = await axios.post(URL, data, { headers });
  return res.data;
};

export const puter = async (url, data, headers) => {
  const URL = `${ATTPL_CMS_HOST_API}${url}`;
  const res = await axios.put(URL, data, { headers });
  return res.data;
};

export const deleter = async (url, headers) => {
  const URL = `${ATTPL_CMS_HOST_API}${url}`;
  const res = await axios.delete(URL, { ...headers });
  return res.data;
};
// ----------------------------------------------------------------------

export const endpoints = {
  contact: {
    create: '/contact/create',
    list: '/contact/fetchAll',
    details: '/contact/fetch',
    edit: '/contact/update',
    delete: '/contact/delete',
  },
  suggestion: {
    create: '/feedback/create',
    list: '/feedback/fetchAll',
    details: '/feedback/fetch',
    delete: '/feedback/delete',
    status: '/feedback/status',
    statusTwo: '/feedback/status/update',
  },
  docterappoinment: {
    create: '/doctor/createAppointment',
    list: '/doctor/fetchAppointments',
    details: '/doctor/fetchAppointment',
    delete: '/doctor/deleteAppointment',
    update: '/doctor/updateAppointment',
    fetchalldoctor: '/doctor/fetchAllFromUMS',
    fetchalldoctordetails: 'doctor/fetchAll',
  },
  jobApplication: {
    create: '/jobApplication/create',
    update: '/jobApplication/update',
  },
  notification: {
    create: '/notification/create',
    details: '/notification/fetch',
    update: '/notification/update',
    delete: '/notification/delete',
    archive: 'notification/archive',
  },
};
