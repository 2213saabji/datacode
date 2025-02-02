import useSWR from 'swr';
import axios from 'axios';
import { useMemo } from 'react';

import { fetcher, endpoints } from 'src/utils/axios-call';

import { ATTPL_EMS_HOST_API } from 'src/config-global';

const STORAGE_KEY = 'accessToken';
// ----------------------------------------------------------------------

export function useGetDesires() {
  const accessToken = localStorage.getItem(STORAGE_KEY);
  const URL = endpoints.desire.list;
  const { data, isLoading, error, isValidating } = useSWR(
    [URL, { headers: { Authorization: `Bearer ${accessToken}` } }],
    fetcher
  );
  console.log(data);

  const memoizedValue = useMemo(() => {
    if (!data) {
      return {
        Desires: [],
        DesiresLoading: isLoading,
        DesiresError: error,
        DesiresValidating: isValidating,
        DesiresEmpty: true,
      };
    }

    return {
      Desires: data || [],
      DesiresLoading: isLoading,
      DesiresError: error,
      DesiresValidating: isValidating,
      DesiresEmpty: data?.length === 0,
    };
  }, [data, error, isLoading, isValidating]);

  return memoizedValue;
}

export function useGetDesire(appointmentsID) {
  const accessToken = localStorage.getItem(STORAGE_KEY);
  const URL = appointmentsID ? `${endpoints.desire.details}/${appointmentsID}` : null;

  const { data, isLoading, error, isValidating } = useSWR(
    [URL, { headers: { Authorization: `Bearer ${accessToken}` } }],
    fetcher
  );
  const memoizedValue = useMemo(
    () => ({
      Desires: data,
      DesiresLoading: isLoading,
      DesiresError: error,
      DesiresValidating: isValidating,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

// Api Call For Profile Creation
export async function createDesire(formData) {
  const URL = ATTPL_EMS_HOST_API + endpoints.desire.create;

  try {
    const response = await axios.post(URL, formData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response;
  } catch (error) {
    console.error('Error creating booth:', error);
    throw error;
  }
}

export async function updateDesire(id, formData) {
  const URL = `${ATTPL_EMS_HOST_API}${endpoints.desire.update}/${id}`;

  try {
    const response = await axios.put(URL, formData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });
    return response;
  } catch (error) {
    console.error('Error creating booth:', error);
    throw error;
  }
}
