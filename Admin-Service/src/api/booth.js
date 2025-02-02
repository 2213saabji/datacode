import useSWR from 'swr';
import axios from 'axios';
import { useMemo } from 'react';

import { fetcher, endpoints } from 'src/utils/axios-call';

import { ATTPL_EMS_HOST_API } from 'src/config-global';

const STORAGE_KEY = 'accessToken';
// ----------------------------------------------------------------------

export function useGetBooths() {
  const accessToken = localStorage.getItem(STORAGE_KEY);
  const URL = endpoints.booth.list;
  const { data, isLoading, error, isValidating } = useSWR(
    [URL, { headers: { Authorization: `Bearer ${accessToken}` } }],
    fetcher
  );
  console.log(data);

  const memoizedValue = useMemo(() => {
    if (!data) {
      return {
        booths: [],
        boothsLoading: isLoading,
        boothsError: error,
        boothsValidating: isValidating,
        boothsEmpty: true,
      };
    }

    return {
      booths: data || [],
      boothsLoading: isLoading,
      boothsError: error,
      boothsValidating: isValidating,
      boothsEmpty: data.length === 0,
    };
  }, [data, error, isLoading, isValidating]);

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function useGetBooth(boothId) {
  const accessToken = localStorage.getItem(STORAGE_KEY);
  const URL = boothId ? `${endpoints.booth.details}/${boothId}` : null;

  const { data, isLoading, error, isValidating } = useSWR(
    [URL, { headers: { Authorization: `Bearer ${accessToken}` } }],
    fetcher
  );
  const memoizedValue = useMemo(
    () => ({
      booth: data,
      boothLoading: isLoading,
      boothError: error,
      boothValidating: isValidating,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

// Api Call For Profile Creation
export async function createBooth(formData, accessToken) {
  const URL = ATTPL_EMS_HOST_API + endpoints.booth.create;

  try {
    const response = await axios.post(URL, formData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response) {
      const BoothID = response.data.boothId;
      localStorage.setItem('boothIdFromCreateBoothProfile', BoothID);
    }

    return response;
  } catch (error) {
    console.error('Error creating booth:', error);
    throw error;
  }
}

export async function UpdateBooth(boothId, formData) {
  const URL = `${ATTPL_EMS_HOST_API + endpoints.booth.update}/${boothId}`;

  try {
    const response = await axios.put(URL, formData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response) {
      const UpdateBoothId = response.data.boothId;
      localStorage.setItem('UpdateBoothId', UpdateBoothId);
    }

    return response;
  } catch (error) {
    console.error('Error creating booth:', error);
    throw error;
  }
}
