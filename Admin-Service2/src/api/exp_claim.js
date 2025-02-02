import useSWR from 'swr';
import { useMemo } from 'react';

import axios from 'src/utils/axios';
import { fetcher, endpoints } from 'src/utils/axios-exp_ms';

import { ATTPL_EXPMS_HOST_API } from 'src/config-global';

// ----------------------------------------------------------------------
// Get API Call For All Claims made by current user
// ----------------------------------------------------------------------

export function useGetMyClaims() {
  const URL = endpoints.exp_claim.my_list;
  const { data, isLoading, error, isValidating } = useSWR(
    [URL, { headers: { Authorization: `Bearer ${accessToken}` } }],
    fetcher
  );

  const memoizedValue = useMemo(
    () => ({
      myclaims: data || [],
      myclaimsLoading: isLoading,
      myclaimsError: error,
      myclaimsValidating: isValidating,
      myclaimsEmpty: !isLoading && !data?.length,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------
// Get API Call For All Claims
// ----------------------------------------------------------------------

const STORAGE_KEY = 'accessToken';
const accessToken = localStorage.getItem(STORAGE_KEY);

export function useGetClaims() {
  const URL = endpoints.exp_claim.list;
  const { data, isLoading, error, isValidating } = useSWR(
    [URL, { headers: { Authorization: `Bearer ${accessToken}` } }],
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

// ----------------------------------------------------------------------
// Get API Call For a Claim
// ----------------------------------------------------------------------

export function useGetClaim(claimId) {
  const URL = claimId ? `${endpoints.exp_claim.details}/${claimId}` : null;

  const { data, isLoading, error, isValidating } = useSWR(
    [URL, { headers: { Authorization: `Bearer ${accessToken}` } }],
    fetcher
  );
  const memoizedValue = useMemo(
    () => ({
      claim: data,
      claimLoading: isLoading,
      claimError: error,
      claimValidating: isValidating,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------
// Post API Call For Claim
// ----------------------------------------------------------------------

export async function createClaim(formData) {
  const URL = ATTPL_EXPMS_HOST_API + endpoints.exp_claim.create;

  try {
    formData.user = localStorage.getItem('UserLoginId');
    const response = await axios.post(URL, formData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating claim:', error);
    throw error;
  }
}

export async function createImageClaim(formData) {
  const URL = ATTPL_EXPMS_HOST_API + endpoints.exp_claim.upload_img;

  try {
    const response = await axios.post(URL, formData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating claim image:', error);
    throw error;
  }
}

// ----------------------------------------------------------------------
// Update API Call For Claim
// ----------------------------------------------------------------------

export async function UpdateClaim(claimId, formData) {
  const URL = `${ATTPL_EXPMS_HOST_API + endpoints.exp_claim.update}/${claimId}`;

  try {
    const response = await axios.put(URL, formData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error Updating Claim:', error);
    throw error;
  }
}
