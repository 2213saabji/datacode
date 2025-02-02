import useSWR from 'swr';
import { useMemo } from 'react';

import axios from 'src/utils/axios';
import { fetcher, endpoints } from 'src/utils/axios-institution-agriculture';

import { ATTPL_CMS_HOST_API } from 'src/config-global';

const STORAGE_KEY = 'accessToken';
const accessToken = localStorage.getItem(STORAGE_KEY);

// ----------------------------------------------------------------------
// Get API Call For All Tractors
// ----------------------------------------------------------------------

export function useGetcoachings() {
  const URL = endpoints.coaching.list;
  const { data, isLoading, error, isValidating } = useSWR(
    [URL, { headers: { Authorization: `Bearer ${accessToken}` } }],
    fetcher
  );

  const memoizedValue = useMemo(
    () => ({
      coachings: data || [],
      coachingsLoading: isLoading,
      coachingsError: error,
      coachingsValidating: isValidating,
      coachingsEmpty: !isLoading && !data?.length,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------
// Get API Call For a Tractor
// ----------------------------------------------------------------------

export function useGetcoaching(coachingId) {
  const URL = coachingId ? `${endpoints.coaching.details}/${coachingId}` : null;

  const { data, isLoading, error, isValidating } = useSWR(
    [URL, { headers: { Authorization: `Bearer ${accessToken}` } }],
    fetcher
  );
  const memoizedValue = useMemo(
    () => ({
      coaching: data,
      coachingLoading: isLoading,
      coachingError: error,
      coachingValidating: isValidating,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------
// Post API to Create Tractor
// ----------------------------------------------------------------------

export async function createcoaching(formData) {
  const URL = ATTPL_CMS_HOST_API + endpoints.coaching.create;

  try {
    const response = await axios.post(URL, formData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating coaching System:', error);
    throw error;
  }
}

// ----------------------------------------------------------------------
// Update API Call For Tractor
// ----------------------------------------------------------------------

export async function Updatecoaching(coachingId, formData) {
  const URL = `${ATTPL_CMS_HOST_API + endpoints.coaching.update}/${coachingId}`;

  try {
    const response = await axios.put(URL, formData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error Updating coaching System:', error);
    throw error;
  }
}
