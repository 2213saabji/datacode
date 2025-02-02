import axios from 'axios';

import { ATTPL_AMS_HOST_API } from 'src/config-global';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({ baseURL: ATTPL_AMS_HOST_API });

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
  const URL = `${ATTPL_AMS_HOST_API}${url}`;
  const res = await axios.post(URL, data, { headers });
  return res.data;
};

export const puter = async (url, data, headers) => {
  const URL = `${ATTPL_AMS_HOST_API}${url}`;
  const res = await axios.put(URL, data, { headers });
  return res.data;
};

export const deleter = async (url, headers) => {
  const URL = `${ATTPL_AMS_HOST_API}${url}`;
  const res = await axios.delete(URL, { ...headers });
  return res.data;
};

// ----------------------------------------------------------------------

export const endpoints = {
  booth: {
    all: '/booth/count/all',
  },
  candidate: {
    all: '/candidate/count/all',
    // gender : '/candidate/count/',
    // state : '/candidate/count/',
    // case : '/candidate/count/',
    // education : '/candidate/count/',
    filter: '/candidate/count/',
  },
  claim: {
    all: '/claim/count/all',
    status: '/claim/count/',
  },
  driver: {
    all: '/driver/count/all',
  },
  election: {
    all: '/election/count/all',
  },
  emailOtp: {
    all: '/email/count/all',
    status: '/email/count/',
  },
  otp: {
    all: '/otp/count/all',
    status: '/otp/count/',
  },
  pollingStation: {
    all: '/pollingStation/count/all',
  },
  trip: {
    all: '/trip/count/all',
    status: '/trip/count/',
  },
  user: {
    all: '/user/count/all',
    role: '/user/count/',
  },
  vehicle: {
    all: '/vehicle/count/all',
  },
  voter: {
    all: '/voter/count/all',
    male: '/voter/analytics/men',
    female: '/voter/analytics/women',
    youth: '/voter/analytics/youth',
    elder: '/voter/analytics/elderly',
  },
  ward: {
    all: '/ward/count/all',
  },
  contact: {
    all: '/contact/count/all',
    status: '/contact/count/',
  },
  survey: {
    active: '/surveys/completed/count',
    closed: '/surveys/pending/count',
  },
  project: {
    counts: '/project/count/all',
  },
  complaint: {
    all: '/complaint/count/all',
    progres: '/complaint/count/in-progres',
    active: '/complaint/count/open',
    closed: '/complaint/count/closed',
  },
  youth: {
    male: '/user/youth/count/male',
    female: '/user/youth/count/female',
  },
  religion: {
    sikh: '/user/religion/count/sikh',
    hindu: '/user/religion/count/hinduism',
    muslim: '/user/religion/count/muslim',
    christian: '/user/religion/count/cristian',
  },
  job: {
    businessman: '/user/profile/count/businessman',
    labour: '/user/profile/count/labour',
    farmer: '/user/profile/count/farmer',
    government: '/user/profile/count/government',
  },
};
