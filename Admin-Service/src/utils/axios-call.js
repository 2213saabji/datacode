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
  const res = await axios.post(URL, data, { headers });
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
  candidate: {
    list: '/candidate/fetchAll',
    details: '/candidate/fetch',
    createprofile: '/candidate/create/candidate-profile-details',
    createidentity: '/candidate/create/candidate-identity-details',
    createsignature: '/candidate/create/candidate-sign-details',
    update: '/candidate/update/candidate-profile-details',
    candidateDetails: 'candidate/fetchByUserId',
  },
  ward: {
    list: '/ward/fetchAll',
    details: '/ward/fetch',
    create: '/ward/create',
    edit: '/ward/update',
  },
  election: {
    list: '/election/fetchAll',
    details: '/election/fetch',
    edit: '/election/update',
    create: '/election/create',
  },
  booth: {
    list: '/booth/fetchAll',
    details: '/booth/fetch',
    // edit: '/api/booth/update/:boothId',
    create: '/booth/create',
    // single: '/booth/fetch/:boothId',
    update: '/booth/update',
  },
  contact: {
    list: '/contact/fetchAll',
    details: '/contact/fetch',
  },
  user: {
    list: '/user/fetchAll',
    details: '/user/fetch',
  },
  // voter: {
  //   list: '/voter/fetchAll',
  //   details: '/voter/fetch',
  //   createprofile: '/voter/create/voter-profile-details',
  //   update: '/voter/update/voter-profile-details',
  //   createidentity: '/voter/create/voter-identity-details',
  //   createaddress: '/voter/create/voter-addressess',
  //   voterDetails: 'voter/fetchByUserId',
  //   newVoterDetails: 'newVoter/fetchByUserId',
  // },
  newVoter: {
    list: '/newVoter/fetchAll',
    details: '/newVoter/fetchByUserId',
    createprofile: '/newVoter/create/voter-profile-details',
    update: '/newVoter/update/voter-profile-details',
    createidentity: '/newVoter/create/voter-identity-details',
    createaddress: '/newVoter/create/voter-addressess',
    voterDetails: 'newVoter/fetchByUserId',
  },
  party: {
    list: '/party/fetchAll',
    details: '/party/fetch',
    create: '/party/create/party-details',
    update: '/party/update/party-details',
  },
  PartyAlliance: {
    list: '/party/party-alliance/fetchAll',
    details: '/party/party-alliance/fetch',
    create: '/party/party-alliance/create',
    update: '/party/party-alliance/update',
  },
  sms: {
    list: '/booth/fetchAll',
    details: '/booth/fetch',
    // edit: '/api/booth/update/:boothId',
    create: '/booth/create',
    // single: '/booth/fetch/:boothId',
    update: '/booth/update',
  },
  appointment: {
    create: '/appointment/create',
    list: 'appointment/fetchAll',
    details: '/appointment/fetch',
    update: '/appointment/update',
    delete: '/appointment/delete',
    filter: '/common-filter/vote-filter',
  },

  desire: {
    create: '/desireAppointment/create',
    list: 'desireAppointment/fetchAll',
    details: '/desireAppointment/fetch',
    update: '/desireAppointment/update',
    delete: '/desireAppointment/delete',
    filter: '/common-filter/vote-filter',
  },
  govtServiceRoadmap: {
    create: '/voter/voterComplian/create/voter-problem-details',
    list: '/voter/voterComplian/fetchAllVoterProblem',
    details: '/voter/voterComplian/fetchProblem',
  },
  gallery: {
    fetchall: '/gallery/fetchAll',
  },
};
