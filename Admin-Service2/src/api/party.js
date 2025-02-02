import useSWR from 'swr';
import axios from 'axios';
import { useMemo } from 'react';

import { fetcher, endpoints } from 'src/utils/axios-call';

import { ATTPL_EMS_HOST_API } from '../config-global';

const STORAGE_KEY = 'accessToken';
const accessToken = localStorage.getItem(STORAGE_KEY);
// ----------------------------------------------------------------------
// Fetch API Call For party
// ----------------------------------------------------------------------

export function useGetParties() {
  const URL = endpoints.party.list;
  const { data, isLoading, error, isValidating } = useSWR(
    [URL, { headers: { Authorization: `Bearer ${accessToken}` } }],
    fetcher
  );

  const memoizedValue = useMemo(() => {
    if (!data) {
      return {
        parties: [],
        partiesLoading: isLoading,
        partiesError: error,
        partiesValidating: isValidating,
        partiesEmpty: true,
      };
    }

    return {
      parties: data || [],
      partiesLoading: isLoading,
      partiesError: error,
      partiesValidating: isValidating,
      partiesEmpty: data.length === 0,
    };
  }, [data, error, isLoading, isValidating]);
  console.log('listdata', memoizedValue);
  return memoizedValue;
}

export function useGetParty(partyId) {
  const URL = partyId ? `${endpoints.party.details}/${partyId}` : null;

  const { data, isLoading, error, isValidating } = useSWR(
    [URL, { headers: { Authorization: `Bearer ${accessToken}` } }],
    fetcher
  );
  const memoizedValue = useMemo(
    () => ({
      party: data,
      partyLoading: isLoading,
      partyError: error,
      partyValidating: isValidating,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------
// Post API Call For party
// ----------------------------------------------------------------------

export async function createPartyProfile(formData) {
  const URL = ATTPL_EMS_HOST_API + endpoints.party.create;

  try {
    const response = await axios.post(URL, formData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating party profile:', error);
    throw error;
  }
}

export async function UpdatePartyProfile(partyId, formData) {
  const URL = `${ATTPL_EMS_HOST_API + endpoints.party.update}/${partyId}`;

  try {
    const response = await axios.put(URL, formData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error Updating party profile:', error);
    throw error;
  }
}
