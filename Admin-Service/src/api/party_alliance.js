import useSWR from 'swr';
import axios from 'axios';
import { useMemo } from 'react';

import { fetcher, endpoints } from 'src/utils/axios-call';

import { ATTPL_EMS_HOST_API } from '../config-global';

const STORAGE_KEY = 'accessToken';
const accessToken = localStorage.getItem(STORAGE_KEY);
// ----------------------------------------------------------------------
// Fetch API Call For PartyAlliance
// ----------------------------------------------------------------------

export function useGetPartyAlliances() {
  const URL = endpoints.PartyAlliance.list;
  const { data, isLoading, error, isValidating } = useSWR(
    [URL, { headers: { Authorization: `Bearer ${accessToken}` } }],
    fetcher
  );
  // console.log(data);

  const memoizedValue = useMemo(() => {
    if (!data) {
      return {
        PartyAlliances: [],
        PartyAlliancesLoading: isLoading,
        PartyAlliancesError: error,
        PartyAlliancesValidating: isValidating,
        PartyAlliancesEmpty: true,
      };
    }

    return {
      PartyAlliances: data || [],
      PartyAlliancesLoading: isLoading,
      PartyAlliancesError: error,
      PartyAlliancesValidating: isValidating,
      PartyAlliancesEmpty: data.length === 0,
    };
  }, [data, error, isLoading, isValidating]);

  return memoizedValue;
}

export function useGetPartyAlliance(PartyAllianceId) {
  const URL = PartyAllianceId ? `${endpoints.PartyAlliance.details}/${PartyAllianceId}` : null;

  const { data, isLoading, error, isValidating } = useSWR(
    [URL, { headers: { Authorization: `Bearer ${accessToken}` } }],
    fetcher
  );
  const memoizedValue = useMemo(
    () => ({
      PartyAlliance: data,
      PartyAllianceLoading: isLoading,
      PartyAllianceError: error,
      PartyAllianceValidating: isValidating,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------
// Post API Call For PartyAlliance
// ----------------------------------------------------------------------

export async function createPartyAllianceProfile(formData) {
  const URL = ATTPL_EMS_HOST_API + endpoints.PartyAlliance.create;

  try {
    const response = await axios.post(URL, formData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating PartyAlliance profile:', error);
    throw error;
  }
}

export async function UpdatePartyAllianceProfile(PartyAllianceId, formData) {
  const URL = `${ATTPL_EMS_HOST_API + endpoints.PartyAlliance.update}/${PartyAllianceId}`;

  try {
    const response = await axios.put(URL, formData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error Updating PartyAllianceId profile:', error);
    throw error;
  }
}
