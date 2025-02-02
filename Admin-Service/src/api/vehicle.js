import useSWR from 'swr';
import { useMemo } from 'react';

import axios from 'src/utils/axios';
import { fetcher, endpoints } from 'src/utils/axios-tms';

import { ATTPL_TMS_HOST_API } from 'src/config-global';

// ----------------------------------------------------------------------
// variables for creating Vehicle

// const vehicleIdFromCreateVehicleProfile = parseInt(localStorage.getItem('vehicleIdFromCreateVehicleProfile'), 10);
// const vehicleIdFromCreateVehicleIdentity = parseInt(localStorage.getItem('vehicleIdFromCreateVehicleIdentity'), 10);

// ----------------------------------------------------------------------
// Fetch Api Calls For Vehicle
// ----------------------------------------------------------------------
const STORAGE_KEY = 'accessToken';
export function useGetVehicles() {
  const accessToken = localStorage.getItem(STORAGE_KEY);
  const URL = endpoints.vehicle.list;
  const { data, isLoading, error, isValidating, mutate } = useSWR(
    [URL, { headers: { Authorization: `Bearer ${accessToken}` } }],
    fetcher
  );

  const memoizedValue = useMemo(
    () => ({
      vehicles: data || [],
      vehiclesLoading: isLoading,
      vehiclesError: error,
      vehiclesValidating: isValidating,
      vehiclesEmpty: !isLoading && !data?.length,
      mutate
    }),
    [data, error, isLoading, isValidating, mutate]
  );
  return memoizedValue;
}

export function useGetVehicle(vehicleId) {
  const accessToken = localStorage.getItem(STORAGE_KEY);
  const URL = vehicleId ? `${endpoints.vehicle.details}/${vehicleId}` : null;

  const { data, isLoading, error, isValidating, mutate } = useSWR(
    [URL, { headers: { Authorization: `Bearer ${accessToken}` } }],
    fetcher
  );

  const memoizedValue = useMemo(
    () => ({
      vehicle: data,
      vehicleLoading: isLoading,
      vehicleError: error,
      vehicleValidating: isValidating,
      mutate
    }),
    [data, error, isLoading, isValidating, mutate]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------
// Post Api Calls For Vehicle
// ----------------------------------------------------------------------
export async function createVehicleProfile(formData) {
  const URL = ATTPL_TMS_HOST_API + endpoints.vehicle.create;
  console.log(`URL => ${URL}`);

  try {
    const response = await axios.post(URL, formData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem(STORAGE_KEY)}`,
      },
    });

    if (response) {
      const vehicleID = response.data.vehicleId;
      localStorage.setItem('vehicleIdFromCreateVehicleProfile', vehicleID);
    }

    return response;
  } catch (error) {
    console.error('Error creating vehicle profile:', error);
    throw error;
  }
}

// ----------------------------------------------------------------------
// Api call for Vehicle Update

export async function updateVehicleProfile(vehicleId, formData) {
  const URL = `${ATTPL_TMS_HOST_API + endpoints.vehicle.edit}/${vehicleId}`;

  try {
    const response = await axios.put(URL, formData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem(STORAGE_KEY)}`,
      },
    });

    if (response) {
      const updatedVehicleIdentityId = response.data.vehicleId;
      localStorage.setItem('UpdateVehicleIdentity', updatedVehicleIdentityId);
    }

    return response;
  } catch (error) {
    console.error('Error updating vehicle profile:', error);
    throw error;
  }
}
