import useSWR from 'swr';
import { useMemo } from 'react';

import axios from 'src/utils/axios';
import { fetcher, endpoints } from 'src/utils/axios-model';

import { ATTPL_BMS_HOST_API } from 'src/config-global';

// ----------------------------------------------------------------------
// Get API Call For All Work
// ----------------------------------------------------------------------

export function useGetModel() {
  // const URL = endpoints.our_work.list;
  const URL = ATTPL_BMS_HOST_API + endpoints.our_work.listModal;
  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);
  console.log(data);

  const memoizedValue = useMemo(
    () => ({
      models: data || [],
      modelsLoading: isLoading,
      modelsError: error,
      modelsValidating: isValidating,
      modelsEmpty: !isLoading && !data?.length,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------
// Get API Call For a Work
// ----------------------------------------------------------------------
const STORAGE_KEY = 'accessToken';
const accessToken = localStorage.getItem(STORAGE_KEY);

export function useGetModelbyID(workId) {
  const URL = workId ? `${endpoints.our_work.details}/${workId}` : null;

  const { data, isLoading, error, isValidating } = useSWR(
    [URL, { headers: { Authorization: `Bearer ${accessToken}` } }],
    fetcher
  );
  const memoizedValue = useMemo(
    () => ({
      models: data,
      modelLoading: isLoading,
      modelError: error,
      modelValidating: isValidating,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------
// Post API Call For Work
// ----------------------------------------------------------------------

export async function createModel(formData) {
  const URL = ATTPL_BMS_HOST_API + endpoints.our_work.create;

  try {
    const response = await axios.post(URL, formData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating model:', error);
    throw error;
  }
}

// ----------------------------------------------------------------------
// Update API Call For Work
// ----------------------------------------------------------------------

export async function UpdateModel(workId, formData) {
  const URL = `${ATTPL_BMS_HOST_API + endpoints.our_work.update}/${workId}`;

  try {
    const response = await axios.put(URL, formData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error Updating Model:', error);
    throw error;
  }
}

// Status API Call For Work
// ----------------------------------------------------------------------

export async function createactivate(formData) {
  const URL = ATTPL_BMS_HOST_API + endpoints.our_work.status;

  try {
    const response = await axios.put(URL, formData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });

    console.log(response);
    return response;
  } catch (error) {
    console.error('Error creating booth:', error);
    throw error;
  }
}
