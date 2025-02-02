import useSWR from 'swr';
import axios from 'axios';
import { useMemo } from 'react';

import { poster, fetcher, endpoints } from 'src/utils/axios-pool';

import { ATTPL_EMS_HOST_API } from 'src/config-global';

const STORAGE_KEY = 'accessToken';
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export function useGetPool(pooId) {
  const accessToken = localStorage.getItem(STORAGE_KEY);
  const URL = `${endpoints.pool.get}/${pooId}`;
  const { data, isLoading, error, isValidating } = useSWR(
    [URL, { headers: { Authorization: `Bearer ${accessToken}` } }],
    fetcher
  );

  const memoizedValue = useMemo(
    () => ({
      pool: data,
      poolLoading: isLoading,
      poolError: error,
      poolValidating: isValidating,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

export function useGetPools() {
  const accessToken = localStorage.getItem(STORAGE_KEY);
  const URL = endpoints.pool.getAll;
  const { data, isLoading, error, isValidating } = useSWR(
    [URL, { headers: { Authorization: `Bearer ${accessToken}` } }],
    fetcher
  );
  const memoizedValue = useMemo(() => {
    if (!data) {
      return {
        pools: [],
        poolsLoading: isLoading,
        poolsError: error,
        poolsValidating: isValidating,
        poolsEmpty: true,
      };
    }

    return {
      pools: data || [],
      poolsLoading: isLoading,
      poolsError: error,
      poolsValidating: isValidating,
      poolsEmpty: data.length === 0,
    };
  }, [data, error, isLoading, isValidating]);

  return memoizedValue;
}

// ----------------------------------------------------------------------
// Post Api Calls For User
// ----------------------------------------------------------------------

// Api Call For User Profile Creation
export async function createPool(formData, accessToken) {
  const URL = ATTPL_EMS_HOST_API + endpoints.pool.add;
  try {
    const response = await axios.post(URL, formData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response;
  } catch (error) {
    console.error('Error creating pool profile:', error);
    throw error;
  }
}

// Api Call For Create User Profile Creation

export async function createUserDetails(dataToCreate, authToken) {
  try {
    const URL = endpoints.pool.CreateUserPopup;
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`,
    };
    const response = await poster(URL, dataToCreate, headers);
    return response;
  } catch (error) {
    console.error('Error while creating User :', error);
    throw error;
  }
}

// ----------------------------------------------------------------------
// Api call for Profile Update

export async function UpdatePool(poolId, formData) {
  const URL = `${ATTPL_EMS_HOST_API + endpoints.pool.edit}/${poolId}`;

  try {
    const response = await axios.put(URL, formData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response;
  } catch (error) {
    console.error('Error updating pool profile:', error);
    throw error;
  }
}
