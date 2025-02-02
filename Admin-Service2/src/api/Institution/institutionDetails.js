// import useSWR from 'swr';
// import { useMemo } from 'react';

// import axios from 'src/utils/axios';
// import { fetcher, endpoints } from 'src/utils/axios-institution-agriculture';

// import { ATTPL_INSTITUTE_AGRI_API } from 'src/config-global';

// const STORAGE_KEY = 'accessToken';
// const accessToken = localStorage.getItem(STORAGE_KEY);

// // ----------------------------------------------------------------------
// // Get API Call For All Tractors
// // ----------------------------------------------------------------------

// export function useGetInstitutions() {
//   const URL = endpoints.institutionDetails.list;
//   const { data, isLoading, error, isValidating } = useSWR(
//     [URL, { headers: { Authorization: `Bearer ${accessToken}` } }],
//     fetcher
//   );

//   const memoizedValue = useMemo(
//     () => ({
//       institutions: data || [],
//       institutionsLoading: isLoading,
//       institutionsError: error,
//       institutionsValidating: isValidating,
//       institutionsEmpty: !isLoading && !data?.length,
//     }),
//     [data, error, isLoading, isValidating]
//   );

//   return memoizedValue;
// }

// // ----------------------------------------------------------------------
// // Get API Call For a Tractor
// // ----------------------------------------------------------------------

// export function useGetInstitution(instituionId) {
//   const URL = instituionId ? `${endpoints.institutionDetails.details}/${instituionId}` : null;

//   const { data, isLoading, error, isValidating } = useSWR(
//     [URL, { headers: { Authorization: `Bearer ${accessToken}` } }],
//     fetcher
//   );
//   const memoizedValue = useMemo(
//     () => ({
//       institution: data,
//       institutionLoading: isLoading,
//       institutionError: error,
//       institutionValidating: isValidating,
//     }),
//     [data, error, isLoading, isValidating]
//   );

//   return memoizedValue;
// }

// // ----------------------------------------------------------------------
// // Post API to Create Tractor
// // ----------------------------------------------------------------------

// export async function createInstitution(formData) {
//   const URL = ATTPL_INSTITUTE_AGRI_API + endpoints.institutionDetails.create;

//   try {
//     const response = await axios.post(URL, formData, {
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${accessToken}`,
//       },
//     });
//     return response.data;
//   } catch (error) {
//     console.error('Error creating institution System:', error);
//     throw error;
//   }
// }

// // ----------------------------------------------------------------------
// // Update API Call For Tractor
// // ----------------------------------------------------------------------

// export async function UpdateInstitution(collegeId, formData) {
//   const URL = `${ATTPL_INSTITUTE_AGRI_API + endpoints.institutionDetails.update}/${collegeId}`;

//   try {
//     const response = await axios.put(URL, formData, {
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${accessToken}`,
//       },
//     });
//     return response.data;
//   } catch (error) {
//     console.error('Error Updating institution System:', error);
//     throw error;
//   }
// }
