import useSWR from 'swr';
import { useMemo } from 'react';

// import { setLocalStorage, isValidToken } from 'src/hooks/utils';

import axios from 'src/utils/axios';
import { fetcher, endpoints } from 'src/utils/axios-tms';

import { ATTPL_TMS_HOST_API } from 'src/config-global';

// ----------------------------------------------------------------------
// Fetch Api Calls For Trip
// ----------------------------------------------------------------------
const STORAGE_KEY = 'accessToken';

export function useGetTrips() {
  const accessToken = localStorage.getItem(STORAGE_KEY);
  const URL = endpoints.trip.requestedList;
  const { data, isLoading, error, isValidating } = useSWR(
    [URL, { headers: { Authorization: `Bearer ${accessToken}` } }],
    fetcher
  );

  const memoizedValue = useMemo(
    () => ({
      trips: data || [],
      tripsLoading: isLoading,
      tripsError: error,
      tripsValidating: isValidating,
      tripsEmpty: !isLoading && !data?.length,
    }),
    [data, error, isLoading, isValidating]
  );
  return memoizedValue;
}

export function useGetTripsManaged(authToken) {
  const URL = endpoints.trip.managedList;
  const { data, isLoading, error, isValidating } = useSWR(
    [URL, { headers: { Authorization: `Bearer ${authToken}` } }],
    fetcher
  );

  const memoizedValue = useMemo(
    () => ({
      trips: data || [],
      tripsLoading: isLoading,
      tripsError: error,
      tripsValidating: isValidating,
      tripsEmpty: !isLoading && !data?.length,
    }),
    [data, error, isLoading, isValidating]
  );
  return memoizedValue;
}

export function useGetTripManaged(id, authToken) {
  const URL = `${endpoints.trip.managedListdetails}/${id}`;
  const { data, isLoading, error, isValidating } = useSWR(
    [URL, { headers: { Authorization: `Bearer ${authToken}` } }],
    fetcher
  );

  const memoizedValue = useMemo(
    () => ({
      trip: data || [],
      tripsLoading: isLoading,
      tripsError: error,
      tripsValidating: isValidating,
      tripsEmpty: !isLoading && !data?.length,
    }),
    [data, error, isLoading, isValidating]
  );
  return memoizedValue;
}

export function useGetTrip(tripId) {
  const accessToken = localStorage.getItem(STORAGE_KEY);
  const URL = tripId ? `${endpoints.trip.details}/${tripId}` : null;

  const { data, isLoading, error, isValidating } = useSWR(
    [URL, { headers: { Authorization: `Bearer ${accessToken}` } }],
    fetcher
  );
  console.log('use get Trip', data);
  const memoizedValue = useMemo(
    () => ({
      trip: data,
      tripLoading: isLoading,
      tripError: error,
      tripValidating: isValidating,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------
// Post Api Calls For Trip
// ----------------------------------------------------------------------
export async function createTripProfile(formData) {
  const URL = ATTPL_TMS_HOST_API + endpoints.trip.create;
  console.log(`URL => ${URL}`);

  try {
    formData.lastUpdatedBy = parseInt(localStorage.getItem('UserLoginId'), 10);
    formData.tripRequestBy = parseInt(localStorage.getItem('UserLoginId'), 10);
    formData.tripStatus = 'Assigned';
    const response = await axios.post(URL, formData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem(STORAGE_KEY)}`,
      },
    });

    if (response) {
      const tripID = response.data.tripId;
      localStorage.setItem('tripIdFromCreateTripProfile', tripID);
    }

    return response;
  } catch (error) {
    console.error('Error creating trip profile:', error);
    throw error;
  }
}

// ----------------------------------------------------------------------
// Api call for Trip Update

export async function updateTripProfile(tripId, formData) {
  const URL = `${ATTPL_TMS_HOST_API + endpoints.trip.edit}/${tripId}`;

  try {
    formData.tripStatus = 'Assigned';
    formData.lastUpdatedBy = parseInt(localStorage.getItem('UserLoginId'), 10);
    const response = await axios.put(URL, formData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem(STORAGE_KEY)}`,
      },
    });

    if (response) {
      const updatedTripIdentityId = response.data.tripId;
      localStorage.setItem('UpdateTripIdentity', updatedTripIdentityId);
    }

    return response;
  } catch (error) {
    console.error('Error updating trip profile:', error);
    throw error;
  }
}
// -------------------------
export function useGetVoterTrips(formData) {
  const accessToken = localStorage.getItem(STORAGE_KEY);
  const URL = endpoints.voterTrip.travellerList;
  const { data, isLoading, error, isValidating } = useSWR(
    [URL, { headers: { Authorization: `Bearer ${accessToken}` } }],
    fetcher
  );

  const memoizedValue = useMemo(
    () => ({
      trips: data || [],
      tripsLoading: isLoading,
      tripsError: error,
      tripsValidating: isValidating,
      tripsEmpty: !isLoading && !data?.length,
    }),
    [data, error, isLoading, isValidating]
  );
  return memoizedValue;
}
