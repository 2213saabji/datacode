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

export function useGetVendors() {
  const accessToken = localStorage.getItem(STORAGE_KEY);
  const URL = endpoints.vendor.list;
  console.log(URL);
  const { data, isLoading, error, isValidating } = useSWR([URL,{ headers: { Authorization: `Bearer ${accessToken}` }}], fetcher);
  console.log("data",data);
  const memoizedValue = useMemo(
    () => ({
      vendors: data || [],
      vendorsLoading: isLoading,
      vendorsError: error,
      vendorsValidating: isValidating,
      vendorsEmpty: !isLoading && !data?.length,
    }),
    [data, error, isLoading, isValidating]
  );
  return memoizedValue;
}

export function useGetVendor(vendorId) {
  const accessToken = localStorage.getItem(STORAGE_KEY);
  const URL = vendorId ? `${endpoints.vendor.details}/${vendorId}` : null;

  const { data, isLoading, error, isValidating } = useSWR([URL,{ headers: { Authorization: `Bearer ${accessToken}` }}], fetcher);
  
  const memoizedValue = useMemo(
    () => ({
      vendor: data,
      vendorLoading: isLoading,
      vendorError: error,
      vendorValidating: isValidating,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------
// Post Api Calls For Driver
// ----------------------------------------------------------------------
export async function createVendorProfile(formData) {
  const URL =  ATTPL_LMS_HOST_API+endpoints.vendor.create;
  console.log(URL);

  try {
    const response = await axios.post(URL, formData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem(STORAGE_KEY)}`
      },
    });

    if (response) {
      const VendorID = response.data.vendorId;
      localStorage.setItem('driverIdFromCreateDriverProfile', VendorID);
    }

    return response;
  } catch (error) {
    console.error('Error creating driver profile:', error);
    throw error;
  }
}





// ----------------------------------------------------------------------
// Api call for Driver Update

export async function updateVendorProfile(vendorId, formData) {
  const URL = `${ATTPL_LMS_HOST_API+endpoints.vendor.update}/${vendorId}`;

  try {
    const response = await axios.put(URL, formData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem(STORAGE_KEY)}`
      },
    });

    if (response) {
      const updatedDriverIdentityId = response.data.vendorId;
      localStorage.setItem('UpdateDriverIdentity', updatedDriverIdentityId);
    }

    return response;
  } catch (error) {
    console.error('Error updating driver profile:', error);
    throw error;
  }
}


