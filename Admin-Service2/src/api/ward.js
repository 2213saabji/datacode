import useSWR from 'swr';
import axios from 'axios';
import { useMemo } from 'react';

import { fetcher, endpoints } from 'src/utils/axios-call';

import { ATTPL_EMS_HOST_API } from '../config-global';

const STORAGE_KEY = 'accessToken';
const accessToken = localStorage.getItem(STORAGE_KEY);
// ----------------------------------------------------------------------
// Fetch API Call For Ward
// ----------------------------------------------------------------------

export function useGetWards() {
  const URL = endpoints.ward.list;
  const { data, isLoading, error, isValidating } = useSWR(
    [URL, { headers: { Authorization: `Bearer ${accessToken}` } }],
    fetcher
  );
  console.log(data);

  const memoizedValue = useMemo(() => {
    if (!data) {
      return {
        wards: [],
        wardsLoading: isLoading,
        wardsError: error,
        wardsValidating: isValidating,
        wardsEmpty: true,
      };
    }

    return {
      wards: data || [],
      wardsLoading: isLoading,
      wardsError: error,
      wardsValidating: isValidating,
      wardsEmpty: data.length === 0,
    };
  }, [data, error, isLoading, isValidating]);

  return memoizedValue;
}

export function useGetWard(wardId) {
  const URL = wardId ? `${endpoints.ward.details}/${wardId}` : null;

  const { data, isLoading, error, isValidating } = useSWR(
    [URL, { headers: { Authorization: `Bearer ${accessToken}` } }],
    fetcher
  );
  const memoizedValue = useMemo(
    () => ({
      ward: data,
      wardLoading: isLoading,
      wardError: error,
      wardValidating: isValidating,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------
// Post API Call For Ward
// ----------------------------------------------------------------------

export async function createWardProfile(formData) {
  const URL = ATTPL_EMS_HOST_API + endpoints.ward.create;

  try {
    const response = await axios.post(URL, formData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating Ward profile:', error);
    throw error;
  }
}

export async function UpdateWardProfile(wardId, formData) {
  const URL = `${ATTPL_EMS_HOST_API + endpoints.ward.edit}/${wardId}`;

  try {
    const response = await axios.put(URL, formData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error Updating Ward profile:', error);
    throw error;
  }
}
