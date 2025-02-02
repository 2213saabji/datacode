import useSWR from 'swr';
import { useMemo } from 'react';

import axios from 'src/utils/axios';
import { fetcher, endpoints } from 'src/utils/axios-work';

import { ATTPL_BMS_HOST_API } from 'src/config-global';

// ----------------------------------------------------------------------
// Get API Call For All Work
// ----------------------------------------------------------------------

export function useGetWork() {
  // const URL = endpoints.our_work.list;
  const URL = ATTPL_BMS_HOST_API + endpoints.our_work.list;
  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);
  console.log(data);

  const memoizedValue = useMemo(
    () => ({
      works: data || [],
      worksLoading: isLoading,
      worksError: error,
      worksValidating: isValidating,
      worksEmpty: !isLoading && !data?.length,
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

export function useGetWorkbyID(workId) {
  const URL = workId ? `${endpoints.our_work.details}/${workId}` : null;

  const { data, isLoading, error, isValidating } = useSWR(
    [URL, { headers: { Authorization: `Bearer ${accessToken}` } }],
    fetcher
  );
  const memoizedValue = useMemo(
    () => ({
      works: data,
      workLoading: isLoading,
      workError: error,
      workValidating: isValidating,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------
// Post API Call For Work
// ----------------------------------------------------------------------

export async function createWork(formData) {
  const URL = ATTPL_BMS_HOST_API + endpoints.our_work.create;

  formData.tag = 'mock';

  try {
    const response = await axios.post(URL, formData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating work:', error);
    throw error;
  }
}

// ----------------------------------------------------------------------
// Update API Call For Work
// ----------------------------------------------------------------------

export async function UpdateWork(workId, formData) {
  const URL = `${ATTPL_BMS_HOST_API + endpoints.our_work.update}/${workId}`;

  try {
    const response = await axios.put(URL, formData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error Updating Work:', error);
    throw error;
  }
}
