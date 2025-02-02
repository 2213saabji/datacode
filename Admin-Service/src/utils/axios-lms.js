import axios from 'axios';
 
import { ATTPL_LMS_HOST_API } from 'src/config-global';
 
// ----------------------------------------------------------------------
 
const axiosInstance = axios.create({ baseURL: ATTPL_LMS_HOST_API });
 
 
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
  const URL = `${ATTPL_LMS_HOST_API}${url}`
  // console.log(URL)
  const res = await axios.post(URL, data, { headers });
  return res.data;
}
 
export const deleter = async (url, headers) => {
  const URL = `${ATTPL_LMS_HOST_API}${url}`
  console.log(URL);
  const res = await axios.delete(URL, { ...headers });
  return res.data;
}
 
 
 
// ----------------------------------------------------------------------
 
export const endpoints = {
//   create end points here!
client: {
  list: '/clientCompanyDetails/fetchAll',
  details: '/clientCompanyDetails/fetch',
  create: '/clientCompanyDetails/create',
  update: '/clientCompanyDetails/update'
},
 
lawyer: {
  list: '/serviceProvider/fetchAll',
  details: '/serviceProvider/fetch',
  create: '/serviceProvider/create',
  update: '/serviceProvider/update'
},
vendor: {
  list: '/serviceProvider/fetchAll',
  details: '/serviceProvider/fetch',
  create: '/serviceProvider/create',
  update: '/serviceProvider/update'
},
charteredaccountant:{
  list: '/serviceProvider/fetchAll',
  details: '/serviceProvider/fetch',
  create: '/serviceProvider/create',
  update: '/serviceProvider/update'
},
serviceDetails:{
  list: '/serviceDetails/fetchAll',
  details: '/serviceDetails/fetch',
  create: '/serviceDetails/create',
  update: '/serviceDetails/update'
},
legalIssue:{
  list: '/legalIssue/fetchAll',
  details: '/legalIssue/fetch',
  create: '/legalIssue/create',
  update: '/legalIssue/update'
},
contractDetails:{
  list: '/contractDetails/fetchAll',
  details: '/contractDetails/fetch',
  create: '/contractDetails/create',
  update: '/contractDetails/update'
},
caseDetails:{
  list: '/caseDetails/fetchAll',
  details: '/caseDetails/fetch',
  create: '/caseDetails/create',
  update: '/caseDetails/update'
},
documents:{
  list: '/documents/fetchAll',
  details: '/documents/fetch',
  create: '/documents/create',
  update: '/documents/update'
},
clientDeatails:{
  list: '/clientDeatails/fetchAll',
  details: '/clientDeatails/fetch',
  create:'/clientDeatails/create',
  update:'/clientDeatails/update',
}
};
