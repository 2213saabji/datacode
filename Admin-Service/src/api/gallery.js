import useSWR from 'swr';
import { useMemo } from 'react';

import { fetcher, endpoints } from 'src/utils/axios-call';

export function useGetAllGallery(accessToken) {
  const URL = endpoints.gallery.fetchall;
  // const accessToken = sessionStorage.getItem("accessToken");

  const { data, isLoading, error, isValidating, mutate } = useSWR(
    [URL, { headers: { Authorization: `Bearer ${accessToken}` } }],
    fetcher
  );

  const memoizedValue = useMemo(
    () => ({
      galleryData: data || [],
      galleryLoading: isLoading,
      galleryLoadingError: error,
      galleryLoadingValidating: isValidating,
      galleryLoadingEmpty: !isLoading && !data?.length,
      refetch: mutate,
    }),
    [data, error, isLoading, isValidating, mutate]
  );

  return memoizedValue;
}
