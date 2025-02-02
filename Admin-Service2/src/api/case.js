import useSWR from 'swr';
import { useMemo } from 'react';

import axios from 'src/utils/axios';
import { fetcher, endpoints } from 'src/utils/axios-lms';

import { ATTPL_LMS_HOST_API } from 'src/config-global';

// ----------------------------------------------------------------------
// variables for creating Driver

// ----------------------------------------------------------------------
// Fetch Api Calls For Driver
// ----------------------------------------------------------------------
const STORAGE_KEY = 'accessToken';



console.log();
export function useGetServices() {
  const accessToken = localStorage.getItem(STORAGE_KEY);
  const URL = endpoints.caseDetails.list;
  const { data, isLoading, error, isValidating } = useSWR([URL,{ headers: { Authorization: `Bearer ${accessToken}` }}], fetcher);
  console.log("data",data);
  const memoizedValue = useMemo(
    () => ({
        services: data || [],
        servicesLoading: isLoading,
        servicesError: error,
      servicesValidating: isValidating,
      servicesEmpty: !isLoading && !data?.length,
    }),
    [data, error, isLoading, isValidating]
  );
  return memoizedValue;
}

export function useGetService(caseId) {
  const accessToken = localStorage.getItem(STORAGE_KEY);
  const URL = caseId ? `${endpoints.caseDetails.details}/${caseId}` : null;
  const { data, isLoading, error, isValidating } = useSWR([URL,{ headers: { Authorization: `Bearer ${accessToken}` }}], fetcher);
  console.log(data);
  
  const memoizedValue = useMemo(
    () => ({
      document: data,
      documentLoading: isLoading,
      documentError: error,
      documentValidating: isValidating,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------
// Post Api Calls For Driver
// ----------------------------------------------------------------------
export async function createCaseDetails(formData) {
  const URL =  ATTPL_LMS_HOST_API+endpoints.caseDetails.create;
  const accessToken = localStorage.getItem(STORAGE_KEY);
  console.log(URL,">>>>>>>>>>>>>");
 console.log(accessToken);
  try {
    const response = await axios.post(URL, formData, {
      
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      },
    });
    console.log(response)
    if (response) {
      const LawyerID = response.data.lawyerId;
      localStorage.setItem('lawyerIdFromCreateLawyerProfile', LawyerID);
    }

    return response;
  } catch (error) {
    console.error('Error creating Lawyer profile:', error);
    throw error;
  }
}





// ----------------------------------------------------------------------
// Api call for Driver Update

export async function updateCaseDetails(serviceDetailsId, formData) {
  const URL = `${ATTPL_LMS_HOST_API+endpoints.caseDetails.update}/${serviceDetailsId}`;

  try {
    const response = await axios.put(URL, formData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem(STORAGE_KEY)}`
      },
    });

    if (response) {
      const updatedServiceDetailsIdentityId = response.data.serviceDetailsId;
      localStorage.setItem('UpdateLawyerIdentity', updatedServiceDetailsIdentityId);
    }

    return response;
  } catch (error) {
    console.error('Error updating Service profile:', error);
    throw error;
  }
}


