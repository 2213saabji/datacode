import useSWR from 'swr';
import { useMemo } from 'react';

import axios from 'src/utils/axios';
import { fetcher, endpoints } from 'src/utils/axios-tms';

import { ATTPL_TMS_HOST_API } from 'src/config-global';

// ----------------------------------------------------------------------
// variables for creating Driver

// ----------------------------------------------------------------------
// Fetch Api Calls For Driver
// ----------------------------------------------------------------------
const STORAGE_KEY = 'accessToken';

export function useGetDrivers() {
  const accessToken = localStorage.getItem(STORAGE_KEY);
  const URL = endpoints.driver.list;
  const { data, isLoading, error, isValidating } = useSWR(
    [URL, { headers: { Authorization: `Bearer ${accessToken}` } }],
    fetcher
  );
  console.log('data', data);
  const memoizedValue = useMemo(
    () => ({
      drivers: data || [],
      driversLoading: isLoading,
      driversError: error,
      driversValidating: isValidating,
      driversEmpty: !isLoading && !data?.length,
    }),
    [data, error, isLoading, isValidating]
  );
  return memoizedValue;
}

export function useGetDriver(driverId) {
  const accessToken = localStorage.getItem(STORAGE_KEY);
  const URL = driverId ? `${endpoints.driver.details}/${driverId}` : null;

  const { data, isLoading, error, isValidating } = useSWR(
    [URL, { headers: { Authorization: `Bearer ${accessToken}` } }],
    fetcher
  );

  const memoizedValue = useMemo(
    () => ({
      driver: data,
      driverLoading: isLoading,
      driverError: error,
      driverValidating: isValidating,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------
// Post Api Calls For Driver
// ----------------------------------------------------------------------
export async function createDriverProfile(formData) {
  const URL = ATTPL_TMS_HOST_API + endpoints.driver.create;
  console.log(`URL => http://localhost:8080${URL}`);

  try {
    const response = await axios.post(URL, formData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem(STORAGE_KEY)}`,
      },
    });

    if (response) {
      const DriverID = response.data.driverId;
      localStorage.setItem('driverIdFromCreateDriverProfile', DriverID);
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
  const URL = `${ATTPL_TMS_HOST_API + endpoints.driver.update}/${driverId}`;

  try {
    const response = await axios.put(URL, formData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem(STORAGE_KEY)}`,
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
