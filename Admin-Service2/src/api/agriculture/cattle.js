import useSWR from 'swr';
import { useMemo } from 'react';

import axios from 'src/utils/axios';
import { fetcher, endpoints } from 'src/utils/axios-institution-agriculture';

import { ATTPL_CMS_HOST_API } from 'src/config-global';

const STORAGE_KEY = 'accessToken';
const accessToken = localStorage.getItem(STORAGE_KEY);

// ----------------------------------------------------------------------
// Get API Call For All CattleType and CattleDetail
// ----------------------------------------------------------------------

export function useGetCattles() {
  const URL = endpoints.cattle.list;
  const { data, isLoading, error, isValidating, mutate } = useSWR(
    [URL, { headers: { Authorization: `Bearer ${accessToken}` } }],
    fetcher
  );

  const memoizedValue = useMemo(
    () => ({
      cattles: data || [],
      cattlesLoading: isLoading,
      cattlesError: error,
      cattlesValidating: isValidating,
      cattlesEmpty: !isLoading && !data?.length,
      mutate,
    }),
    [data, error, isLoading, isValidating, mutate]
  );

  return memoizedValue;
}

export function useGetCattleDetails() {
  const URL = endpoints.cattleDetails.list;
  const { data, isLoading, error, isValidating, mutate } = useSWR(
    [URL, { headers: { Authorization: `Bearer ${accessToken}` } }],
    fetcher
  );

  const memoizedValue = useMemo(
    () => ({
      cattlesDetails: data || [],
      cattlesDetailsLoading: isLoading,
      cattlesDetailsError: error,
      cattlesDetailsValidating: isValidating,
      cattlesDetailsEmpty: !isLoading && !data?.length,
      mutate,
    }),
    [data, error, isLoading, isValidating, mutate]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------
// Get API Call For a CattleType and CattleDetail
// ----------------------------------------------------------------------

export function useGetCattle(cattleId) {
  const URL = cattleId ? `${endpoints.cattle.details}/${cattleId}` : null;

  const { data, isLoading, error, isValidating } = useSWR(
    [URL, { headers: { Authorization: `Bearer ${accessToken}` } }],
    fetcher
  );
  const memoizedValue = useMemo(
    () => ({
      cattle: data,
      cattleLoading: isLoading,
      cattleError: error,
      cattleValidating: isValidating,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

export function useGetCattleDetailsData(cattleId) {
  const URL = cattleId ? `${endpoints.cattleDetails.details}/${cattleId}` : null;

  const { data, isLoading, error, isValidating } = useSWR(
    [URL, { headers: { Authorization: `Bearer ${accessToken}` } }],
    fetcher
  );
  const memoizedValue = useMemo(
    () => ({
      cattleDetail: data,
      cattleDetailLoading: isLoading,
      cattleDetailError: error,
      cattleDetailValidating: isValidating,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------
// Post API to Create CattleType and CattleDetail
// ----------------------------------------------------------------------

export async function createCattle(formData) {
  const URL = ATTPL_CMS_HOST_API + endpoints.cattle.create;

  try {
    const response = await axios.post(URL, formData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating tractor:', error);
    throw error;
  }
}

export async function createCattleDetail(formData) {
  const URL = ATTPL_CMS_HOST_API + endpoints.cattleDetails.create;

  try {
    const response = await axios.post(URL, formData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating tractor:', error);
    throw error;
  }
}

// ----------------------------------------------------------------------
// Update API Call For Tractor
// ----------------------------------------------------------------------

export async function UpdateCattle(cattleId, formData) {
  const URL = `${ATTPL_CMS_HOST_API + endpoints.cattle.update}/${cattleId}`;

  try {
    const response = await axios.put(URL, formData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error Updating Tractor:', error);
    throw error;
  }
}

export async function UpdateCattleDetails(cattleId, formData) {
  const URL = `${ATTPL_CMS_HOST_API + endpoints.cattleDetails.update}/${cattleId}`;

  try {
    const response = await axios.put(URL, formData, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error Updating Tractor:', error);
    throw error;
  }
}
