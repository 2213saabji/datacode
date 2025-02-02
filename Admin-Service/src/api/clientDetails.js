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




export function useGetClientDetails() {
  const accessToken = localStorage.getItem(STORAGE_KEY);
  const URL = endpoints.clientDeatails.list;
  const { data, isLoading, error, isValidating } = useSWR([URL,{ headers: { Authorization: `Bearer ${accessToken}` }}], fetcher);
  console.log("data",data);
  const memoizedValue = useMemo(
    () => ({
      clients: data || [],
      clientsLoading: isLoading,
      clientsError: error,
      clientsValidating: isValidating,
      clientsEmpty: !isLoading && !data?.length,
    }),
    [data, error, isLoading, isValidating]
  );
  return memoizedValue;
}

export function useGetClientDetail(caseId) {
  const accessToken = localStorage.getItem(STORAGE_KEY);
  const URL = caseId ? `${endpoints.clientDeatails.details}/${caseId}` : null;

  const { data, isLoading, error, isValidating } = useSWR([URL,{ headers: { Authorization: `Bearer ${accessToken}` }}], fetcher);
  
  const memoizedValue = useMemo(
    () => ({
      client: data,
      clientLoading: isLoading,
      clientError: error,
      clientValidating: isValidating,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------
// Post Api Calls For Driver
// ----------------------------------------------------------------------
export async function createClientDetails(formData) {
  const URL =  ATTPL_LMS_HOST_API+endpoints.clientDeatails.create;
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
      const ClientID = response.data.clientId;
      localStorage.setItem('clientIdFromCreateClientProfile', ClientID);
    }

    return response;
  } catch (error) {
    console.error('Error creating Client profile:', error);
    throw error;
  }
}





// ----------------------------------------------------------------------
// Api call for Driver Update

export async function updateClientDetails(clientCompanyId, formData) {
  const URL = `${ATTPL_LMS_HOST_API+endpoints.clientDeatails.update}/${clientCompanyId}`;

  try {
    const response = await axios.put(URL, formData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem(STORAGE_KEY)}`
      },
    });

    if (response) {
      const updatedDriverIdentityId = response.data.clientCompanyId;
      localStorage.setItem('UpdateClientIdentity', updatedDriverIdentityId);
    }

    return response;
  } catch (error) {
    console.error('Error updating Client profile:', error);
    throw error;
  }
}


