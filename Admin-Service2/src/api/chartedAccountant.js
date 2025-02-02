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

export function useGetCharteredaccountants() {
  const accessToken = localStorage.getItem(STORAGE_KEY);
  const URL = endpoints.charteredaccountant.list;
  const { data, isLoading, error, isValidating } = useSWR([URL,{ headers: { Authorization: `Bearer ${accessToken}` }}], fetcher);
  console.log("data",data);
  const memoizedValue = useMemo(
    () => ({
      charteredaccountants: data || [],
      charteredaccountantsLoading: isLoading,
      charteredaccountantsError: error,
      charteredaccountantsValidating: isValidating,
      charteredaccountantsEmpty: !isLoading && !data?.length,
    }),
    [data, error, isLoading, isValidating]
  );
  return memoizedValue;
}

export function useGetCharteredAccountant(providerId) {
  const accessToken = localStorage.getItem(STORAGE_KEY);
  const URL = providerId ? `${endpoints.charteredaccountant.details}/${providerId}` : null;

  const { data, isLoading, error, isValidating } = useSWR([URL,{ headers: { Authorization: `Bearer ${accessToken}` }}], fetcher);
  console.log(data);
  
  const memoizedValue = useMemo(
    () => ({
      chartedaccpunt: data,
      chartedaccpuntIdLoading: isLoading,
      chartedaccpuntIdError: error,
      chartedaccpuntIdValidating: isValidating,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------
// Post Api Calls For Driver
// ----------------------------------------------------------------------
export async function createDriverProfile(formData) {
  const URL =  ATTPL_LMS_HOST_API+endpoints.charteredaccountant.create;
  console.log(`URL => http://localhost:8080${URL}`);

  try {
    const response = await axios.post(URL, formData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem(STORAGE_KEY)}`
      },
    });

    if (response) {
      const CharteredaccountantID = response.data.charteredaccountantId;
      localStorage.setItem('driverIdFromCreatechartered_accountantProfile', CharteredaccountantID);
    }

    return response;
  } catch (error) {
    console.error('Error creating driver profile:', error);
    throw error;
  }
}





// ----------------------------------------------------------------------
// Api call for Driver Update

export async function updateDriverProfile(driverId, formData) {
  const URL = `${ATTPL_LMS_HOST_API+endpoints.driver.update}/${driverId}`;

  try {
    const response = await axios.put(URL, formData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem(STORAGE_KEY)}`
      },
    });

    if (response) {
      const updatedDriverIdentityId = response.data.driverId;
      localStorage.setItem('UpdateDriverIdentity', updatedDriverIdentityId);
    }

    return response;
  } catch (error) {
    console.error('Error updating driver profile:', error);
    throw error;
  }
}


