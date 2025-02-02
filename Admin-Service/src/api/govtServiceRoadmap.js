import useSWR from 'swr';
import { useMemo } from 'react';

import axios from 'src/utils/axios';
import { fetcher, endpoints } from 'src/utils/axios-call';

import { ATTPL_EMS_HOST_API } from 'src/config-global';

// ----------------------------------------------------------------------
// Fetch Api Calls For CanDidate
// ----------------------------------------------------------------------
const STORAGE_KEY = 'accessToken';

export function useGetAllProblems() {
  const accessToken = localStorage.getItem(STORAGE_KEY);
  const URL = endpoints.govtServiceRoadmap.list;
  const { data, isLoading, error, isValidating } = useSWR(
    [URL, { headers: { Authorization: `Bearer ${accessToken}` } }],
    fetcher
  );
  const memoizedValue = useMemo(
    () => ({
      govtservices: data || [],
      govtservicesLoading: isLoading,
      govtservicesError: error,
      govtservicesValidating: isValidating,
      govtservicesEmpty: !isLoading && !data?.length,
    }),
    [data, error, isLoading, isValidating]
  );
  return memoizedValue;
}

export async function createComplaint(formData, accessToken) {
  const URL = ATTPL_EMS_HOST_API + endpoints.govtServiceRoadmap.create;
  try {
    const response = await axios.post(URL, formData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response;
  } catch (error) {
    console.error('Error creating complaint:', error);
    throw error;
  }
}

export function useGetComplaintByvoterProblemId(voterProblemId, accessToken) {
  const URL = voterProblemId ? `${endpoints.govtServiceRoadmap.details}/${voterProblemId}` : null;

  const { data, isLoading, error, isValidating } = useSWR(
    [URL, { headers: { Authorization: `Bearer ${accessToken}` } }],
    fetcher
  );
  const memoizedValue = useMemo(
    () => ({
      govtservice: data,
      govtserviceLoading: isLoading,
      govtserviceError: error,
      govtserviceValidating: isValidating,
    }),
    [data, error, isLoading, isValidating]
  );
  return memoizedValue;
}
