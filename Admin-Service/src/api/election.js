import useSWR from 'swr';
import { useMemo } from 'react';

import axios from 'src/utils/axios';
import { fetcher, endpoints } from 'src/utils/axios-call';

import { ATTPL_EMS_HOST_API } from 'src/config-global';

const STORAGE_KEY = 'accessToken';
const accessToken = localStorage.getItem(STORAGE_KEY);
// ----------------------------------------------------------------------

export function useGetElections() {
  const URL = endpoints.election.list;
  const { data, isLoading, error, isValidating } = useSWR(
    [URL, { headers: { Authorization: `Bearer ${accessToken}` } }],
    fetcher
  );
  const memoizedValue = useMemo(
    () => ({
      elections: data || [],
      electionsLoading: isLoading,
      electionsError: error,
      electionsValidating: isValidating,
      electionsEmpty: !isLoading && !data?.length,
    }),
    [data, error, isLoading, isValidating]
  );
  return memoizedValue;
}

// ----------------------------------------------------------------------

export function useGetElection(electionId) {
  const URL = electionId ? `${endpoints.election.details}/${electionId}` : null;

  const { data, isLoading, error, isValidating } = useSWR(
    [URL, { headers: { Authorization: `Bearer ${accessToken}` } }],
    fetcher
  );
  const memoizedValue = useMemo(
    () => ({
      election: data,
      electionLoading: isLoading,
      electionError: error,
      electionValidating: isValidating,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export async function createElection(formData) {
  const URL = ATTPL_EMS_HOST_API + endpoints.election.create;

  try {
    const response = await axios.post(URL, formData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error creating election profile:', error);
    throw error;
  }
}

export async function UpdateElection(electionId, formData) {
  const URL = `${ATTPL_EMS_HOST_API + endpoints.election.edit}/${electionId}`;

  try {
    const response = await axios.put(URL, formData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating Election:', error);
    throw error;
  }
}
