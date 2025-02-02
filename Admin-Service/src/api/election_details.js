import useSWR from 'swr';
import axios from 'axios';
import { useMemo } from 'react';

import { fetcher, endpoints } from 'src/utils/axios-details';

import { ATTPL_EMS_HOST_API } from 'src/config-global';
// ----------------------------------------------------------------------

// Admin

const STORAGE_KEY = 'accessToken';
const accessToken = localStorage.getItem(STORAGE_KEY);

export function useGetVoterView(token) {
  const URL = endpoints.voter_details.list;
  const { data, isLoading, error, isValidating } = useSWR(
    [URL, { headers: { Authorization: `Bearer ${token}` } }],
    fetcher
  );

  const memoizedValue = useMemo(
    () => ({
      claims: data || [],
      claimsLoading: isLoading,
      claimsError: error,
      claimsValidating: isValidating,
      claimsEmpty: !isLoading && !data?.length,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// for getting all the voters for vote prediction

export function useGetVotePredictions(electionId, wardId, boothId, pollinStationId) {
  const wardId1 = wardId || 0;
  const boothId1 = boothId || 0;
  const pollinStationId1 = pollinStationId || 0;
  const URL = `${endpoints.vote_prediction.list}/${electionId}/${wardId1}/${boothId1}/${pollinStationId1}`;
  const { data, isLoading, error, isValidating } = useSWR(
    [URL, { headers: { Authorization: `Bearer ${accessToken}` } }],
    fetcher
  );
  const memoizedValue = useMemo(
    () => ({
      votepredictions: data || [],
      votepredictionsLoading: isLoading,
      votepredictionsError: error,
      votepredictionsValidating: isValidating,
      votepredictionsEmpty: !isLoading && !data?.length,
    }),
    [data, error, isLoading, isValidating]
  );
  return memoizedValue;
}

export async function getVotePredictions2(electionId, wardId, boothId, pollinStationId) {
  try {
    const wardId1 = wardId || 0;
    const boothId1 = boothId || 0;
    const pollinStationId1 = pollinStationId || 0;
    const res = await axios.get(
      `${ATTPL_EMS_HOST_API}${endpoints.vote_prediction.list}/${electionId}/${wardId1}/${boothId1}/${pollinStationId1}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}


// Get CM's and Opposition's

export function useGetAllList(token) {
  const URL = endpoints.cm_opposition.list;
  const { data, isLoading, error, isValidating } = useSWR(
    [URL, { headers: { Authorization: `Bearer ${token}` } }],
    fetcher
  );

  const memoizedValue = useMemo(
    () => ({
      CM_Oppositions: data || [],
      CM_OppositionsLoading: isLoading,
      CM_OppositionsError: error,
      CM_OppositionsValidating: isValidating,
      CM_OppositionsEmpty: !isLoading && !data?.length,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

export function useGetList(Id, token) {
  const URL = Id ? `${endpoints.cm_opposition.detail}/${Id}` : null;

  const { data, isLoading, error, isValidating } = useSWR(
    [URL, { headers: { Authorization: `Bearer ${token}` } }],
    fetcher
  );
  const memoizedValue = useMemo(
    () => ({
      CM_Opposition: data,
      CM_OppositionLoading: isLoading,
      CM_OppositionError: error,
      CM_OppositionValidating: isValidating,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}