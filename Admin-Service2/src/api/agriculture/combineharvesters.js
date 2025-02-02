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

export function useGetCombineHarvesters() {
  const URL = endpoints.combineharvesters.list;
  const { data, isLoading, error, isValidating } = useSWR(
    [URL, { headers: { Authorization: `Bearer ${accessToken}` } }],
    fetcher
  );

  const memoizedValue = useMemo(
    () => ({
      combineHarvesters: data || [],
      combineHarvestersLoading: isLoading,
      combineHarvestersError: error,
      combineHarvestersValidating: isValidating,
      combineHarvestersEmpty: !isLoading && !data?.length,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------
// Get API Call For a Tractor
// ----------------------------------------------------------------------

export function useGetCombineHarvester(combineHarvesterId) {
  const URL = combineHarvesterId
    ? `${endpoints.combineharvesters.details}/${combineHarvesterId}`
    : null;

  const { data, isLoading, error, isValidating } = useSWR(
    [URL, { headers: { Authorization: `Bearer ${accessToken}` } }],
    fetcher
  );
  const memoizedValue = useMemo(
    () => ({
      combineHarvester: data,
      combineHarvesterLoading: isLoading,
      combineHarvesterError: error,
      combineHarvesterValidating: isValidating,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------
// Post API to Create Tractor
// ----------------------------------------------------------------------

export async function createCombineHarvester(formData) {
  const URL = ATTPL_CMS_HOST_API + endpoints.combineharvesters.create;

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

export async function UpdateCombineHarvester(combineHarvesterId, formData) {
  const URL = `${ATTPL_CMS_HOST_API + endpoints.combineharvesters.update}/${combineHarvesterId}`;

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
