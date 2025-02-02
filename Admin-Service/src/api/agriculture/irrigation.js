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

export function useGetIrrigations() {
  const URL = endpoints.irrigation.list;
  const { data, isLoading, error, isValidating } = useSWR(
    [URL, { headers: { Authorization: `Bearer ${accessToken}` } }],
    fetcher
  );

  const memoizedValue = useMemo(
    () => ({
      irrigations: data || [],
      irrigationsLoading: isLoading,
      irrigationsError: error,
      irrigationsValidating: isValidating,
      irrigationsEmpty: !isLoading && !data?.length,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------
// Get API Call For a Tractor
// ----------------------------------------------------------------------

export function useGetIrrigation(irrigationId) {
  const URL = irrigationId ? `${endpoints.irrigation.details}/${irrigationId}` : null;

  const { data, isLoading, error, isValidating } = useSWR(
    [URL, { headers: { Authorization: `Bearer ${accessToken}` } }],
    fetcher
  );
  const memoizedValue = useMemo(
    () => ({
      irrigation: data,
      irrigationLoading: isLoading,
      irrigationError: error,
      irrigationValidating: isValidating,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------
// Post API to Create Tractor
// ----------------------------------------------------------------------

export async function createIrrigation(formData) {
  const URL = ATTPL_CMS_HOST_API + endpoints.irrigation.create;

  try {
    const response = await axios.post(URL, formData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating Irrigation System:', error);
    throw error;
  }
}

// ----------------------------------------------------------------------
// Update API Call For Tractor
// ----------------------------------------------------------------------

export async function UpdateIrrigation(irrigationId, formData) {
  const URL = `${ATTPL_CMS_HOST_API + endpoints.irrigation.update}/${irrigationId}`;

  try {
    const response = await axios.put(URL, formData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error Updating Irrigation System:', error);
    throw error;
  }
}
