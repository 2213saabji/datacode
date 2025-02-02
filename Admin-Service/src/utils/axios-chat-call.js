import axios from 'axios';

import { ATTPL_CHAT_HOST_API } from 'src/config-global';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({ baseURL: ATTPL_CHAT_HOST_API });

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

// export const poster = async (url, data, headers) => {
//   const URL = `${ATTPL_EMS_HOST_API}${url}`
//   const res = await axios.post(URL, data, { headers });
//   return res.data;
// }

// export const puter = async (url, data, headers) => {
//   const URL = `${ATTPL_EMS_HOST_API}${url}`
//   const res = await axios.put(URL, data, { headers });
//   return res.data;
// }

// export const deleter = async (url, headers) => {
//   const URL = `${ATTPL_EMS_HOST_API}${url}`
//   const res = await axios.delete(URL, { ...headers });
//   return res.data;
// }

// ----------------------------------------------------------------------

export const endpoints = {
  conversation: {
    details: 'conversations/fetch',
    participants: 'conversations/details/fetch',
    create: '/conversations/create',
    get_member: 'conversations/getGroupMembers',
    user_list: '/conversations/recent/users',
  },
  group: {
    creat: 'group/create',
    list: 'group/fetchAll',
    edit: 'group/update',
    details: 'group/fetch',
    delete: 'group/delete',
  },
  recent: {
    list: 'conversations/recent/fetch',
  },
  massage: {
    creat: '/conversations/message/send',
    delete: '/conversations/message/delete',
  },
  // group:{
  //   creat:'group/create',
  //   list:'group/fetchAll',
  //   edit:'group/update',
  //   details:'group/fetch',
  //   delete:'group/delete'
  // },
};
