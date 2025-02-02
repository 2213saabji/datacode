import useSWR from 'swr';
import { useMemo } from 'react';

import { fetcher, endpoints } from 'src/utils/axios-blog';

// ----------------------------------------------------------------------

export function useGetSoilType() {
  const URL = endpoints.farmer.getSoilType;
  console.log(URL);
  const accessToken = localStorage.getItem('accessToken');
  // console.log(accessToken)

  const { data, isLoading, error, isValidating, mutate } = useSWR(
    [URL, { headers: { Authorization: `Bearer ${accessToken}` } }],
    fetcher
  );
  const memoizedValue = useMemo(
    () => ({
      posts: data?.data || [],
      postsLoading: isLoading,
      postsError: error,
      postsValidating: isValidating,
      postsEmpty: !isLoading && !data?.length,
      mutate,
    }),
    [data?.data, data?.length, error, isLoading, isValidating, mutate]
  );
  return memoizedValue;
}
export function useGetCropType(soilType, seasonType) {
  const URL = `${endpoints.farmer.getCropType}/${soilType}/${seasonType}`;

  const accessToken = localStorage.getItem('accessToken');

  const { data, isLoading, error, isValidating, mutate } = useSWR(
    [URL, { headers: { Authorization: `Bearer ${accessToken}` } }],
    fetcher
  );
  const memoizedValue = useMemo(
    () => ({
      posts: data?.data || [],
      postsLoading: isLoading,
      postsError: error,
      postsValidating: isValidating,
      postsEmpty: !isLoading && !data?.length,
      mutate,
    }),
    [data?.data, data?.length, error, isLoading, isValidating, mutate]
  );
  return memoizedValue;
}
export function useGetSeasonType() {
  const URL = endpoints.farmer.getSeasonType;
  console.log(URL);
  const accessToken = localStorage.getItem('accessToken');
  // console.log(accessToken)

  const { data, isLoading, error, isValidating, mutate } = useSWR(
    [URL, { headers: { Authorization: `Bearer ${accessToken}` } }],
    fetcher
  );
  const memoizedValue = useMemo(
    () => ({
      posts: data?.data || [],
      postsLoading: isLoading,
      postsError: error,
      postsValidating: isValidating,
      postsEmpty: !isLoading && !data?.length,
      mutate,
    }),
    [data?.data, data?.length, error, isLoading, isValidating, mutate]
  );
  return memoizedValue;
}

// ----------------------------------------------------------------------
export function useGetFarmers(selectedCrop, selectedSeason, selectedSoil) {
  const URL = `${endpoints.farmer.fetchfarmerConditions}/${selectedCrop}/${selectedSeason}/${selectedSoil}`;
  // const URL = driverId ? `${endpoints.driver.details}/${driverId}` : null;
  console.log(URL);
  const accessToken = localStorage.getItem('accessToken');
  // console.log(accessToken)

  const { data, isLoading, error, isValidating, mutate } = useSWR(
    [URL, { headers: { Authorization: `Bearer ${accessToken}` } }],
    fetcher
  );
  const memoizedValue = useMemo(
    () => ({
      posts: data?.data || [],
      postsLoading: isLoading,
      postsError: error,
      postsValidating: isValidating,
      postsEmpty: !isLoading && !data?.length,
      mutate,
    }),
    [data?.data, data?.length, error, isLoading, isValidating, mutate]
  );
  return memoizedValue;
}
