import useSWR from 'swr';
import { useMemo } from 'react';

import axios from 'src/utils/axios';
import { fetcher, endpoints } from 'src/utils/axios-call';

import { ATTPL_EMS_HOST_API } from 'src/config-global';

// ----------------------------------------------------------------------
// Fetch Api Calls For CanDidate
// ----------------------------------------------------------------------
const STORAGE_KEY = 'accessToken';

export function useGetCandidates(accessToken) {
  // const accessToken = localStorage.getItem(STORAGE_KEY);
  const URL = endpoints.candidate.list;
  const { data, isLoading, error, isValidating } = useSWR(
    [URL, { headers: { Authorization: `Bearer ${accessToken}` } }],
    fetcher
  );
  const memoizedValue = useMemo(
    () => ({
      candidates: data || [],
      candidatesLoading: isLoading,
      candidatesError: error,
      candidatesValidating: isValidating,
      candidatesEmpty: !isLoading && !data?.length,
    }),
    [data, error, isLoading, isValidating]
  );
  return memoizedValue;
}

export function useGetCandidateDetails() {
  const accessToken = localStorage.getItem(STORAGE_KEY);

  const URL = endpoints.candidate.candidateDetails;
  const { data, isLoading, error, isValidating } = useSWR(
    [URL, { headers: { Authorization: `Bearer ${accessToken}` } }],
    fetcher
  );
  const memoizedValue = useMemo(
    () => ({
      candidates: data || [],
      candidatesLoading: isLoading,
      candidatesError: error,
      candidatesValidating: isValidating,
      candidatesEmpty: !isLoading && !data?.length,
    }),
    [data, error, isLoading, isValidating]
  );
  return memoizedValue;
}

// ----------------------------------------------------------------------

export function useGetCandidate(candidateId) {
  const accessToken = localStorage.getItem(STORAGE_KEY);
  const URL = candidateId ? `${endpoints.candidate.details}/${candidateId}` : null;

  const { data, isLoading, error, isValidating } = useSWR(
    [URL, { headers: { Authorization: `Bearer ${accessToken}` } }],
    fetcher
  );
  const memoizedValue = useMemo(
    () => ({
      candidate: data,
      candidateLoading: isLoading,
      candidateError: error,
      candidateValidating: isValidating,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------
// Post Api Calls For Candidate
// ----------------------------------------------------------------------
// ----------------------------------------------------------------------
// Api Call For Profile Creation

export async function createCandidateProfile(formData) {
  const URL = ATTPL_EMS_HOST_API + endpoints.candidate.createprofile;

  try {
    const response = await axios.post(URL, formData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response;
  } catch (error) {
    console.error('Error creating candidate profile:', error);
    throw error;
  }
}

// ----------------------------------------------------------------------
// Api call for Profile Update

export const UpdateCandidateProfile = async (candidateId, formData) => {
  const URL = `${ATTPL_EMS_HOST_API + endpoints.candidate.update}/${candidateId}`;
  const accessToken = localStorage.getItem(STORAGE_KEY);
  try {
    const response = await axios.put(URL, formData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response;
  } catch (error) {
    console.error('Error creating candidate profile:', error);
    throw error;
  }
};
