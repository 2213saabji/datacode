import useSWR from 'swr';
import { useMemo } from 'react';
 
import { puter, poster, fetcher, endpoints } from 'src/utils/axios-ums';

export function useGetUserBySeller(authToken) {
  const URL = `${endpoints.interestedConsumer.fetchBySeller}`;

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${authToken}`,
  };
 
  const config = {
    headers,
  };

  const { data, isLoading, error, isValidating, mutate } = useSWR([URL, config], fetcher);

  const memoizedValue = useMemo(
    () => ({
      usersBySeller: data || [],
      usersBySellerLoading: isLoading,
      usersBySellerError: error,
      usersBySellerValidating: isValidating,
      mutate
    }),
    [data, error, isLoading, isValidating, mutate]
  );
 
  return memoizedValue;
}
export async function createConsumerRequest(dataToCreate, authToken) {
  try {
    const URL = endpoints.interestedConsumer.create;
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`,
    };
    const response = await poster(URL, dataToCreate, headers);
    return response;
  } catch (error) {
    console.error('Error while creating User Role Type:', error);
    throw error;
  }
}