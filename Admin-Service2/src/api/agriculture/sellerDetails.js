import useSWR from 'swr';
import { useMemo } from 'react';

import axios from 'src/utils/axios';
import { fetcher, endpoints } from 'src/utils/axios-agri-seller';

import { ATTPL_UMS_HOST_API } from 'src/config-global';

const STORAGE_KEY = 'accessToken';
const accessToken = localStorage.getItem(STORAGE_KEY);

// ----------------------------------------------------------------------
// Get API Call For All Sellers
// ----------------------------------------------------------------------

export function useGetSellers() {
  const URL = endpoints.sellerDetails.list;
  const { data, isLoading, error, isValidating } = useSWR(
    [URL, { headers: { Authorization: `Bearer ${accessToken}` } }],
    fetcher
  );

  const memoizedValue = useMemo(
    () => ({
      sellers: data || [],
      sellersLoading: isLoading,
      sellersError: error,
      sellersValidating: isValidating,
      sellersEmpty: !isLoading && !data?.length,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------
// Get API Call For a Seller
// ----------------------------------------------------------------------

export function useGetSeller(sellerOwnerId) {
  const URL = sellerOwnerId ? `${endpoints.sellerDetails.details}/${sellerOwnerId}` : null;

  const { data, isLoading, error, isValidating } = useSWR(
    [URL, { headers: { Authorization: `Bearer ${accessToken}` } }],
    fetcher
  );
  const memoizedValue = useMemo(
    () => ({
      seller: data,
      sellerLoading: isLoading,
      sellerError: error,
      sellerValidating: isValidating,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------
// Post API to Create Seller
// ----------------------------------------------------------------------

export async function createSellerDetails(formData) {
  const URL = ATTPL_UMS_HOST_API + endpoints.sellerDetails.create;

  try {
    const response = await axios.post(URL, formData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating seller:', error);
    throw error;
  }
}

// ----------------------------------------------------------------------
// Update API Call For Tractor
// ----------------------------------------------------------------------

export async function UpdateTractor(tractorId, formData) {
  const URL = `${ATTPL_UMS_HOST_API + endpoints.tractor.update}/${tractorId}`;

  try {
    const response = await axios.put(URL, formData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error Updating Tractor:', error);
    throw error;
  }
}
