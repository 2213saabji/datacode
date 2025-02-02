import useSWR from 'swr';
import { useMemo } from 'react';

import { fetcher, endpoints } from 'src/utils/axios-blog';

// ----------------------------------------------------------------------

export function useGetJobs(jobTypeName) {
  const URL = `${endpoints.student.getjobs}/${jobTypeName}`;
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
export function useGetAllJobDesiredData(jobName) {
  console.log({ jobName });
  const URL = `${endpoints.student.getAllJobDesiredData}/${jobName}`;
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

export function useGetAllJobTypes() {
  const URL = endpoints.student.getAllJobTypes;

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
// export function useGetCollegesByState(state,courseId) {
//   const URL =`${endpoints.student.getCollegesByState}/${state}/course/${courseId}`;
//   console.log(URL)
//   const accessToken = localStorage.getItem("accessToken");
//   console.log(accessToken)

//   const { data, isLoading, error, isValidating,mutate } = useSWR([URL,{ headers: { Authorization: `Bearer ${accessToken}` }}], fetcher);
//   const memoizedValue = useMemo(
//     () => ({
//       posts: data?.data || [],
//       postsLoading: isLoading,
//       postsError: error,
//       postsValidating: isValidating,
//       postsEmpty: !isLoading && !data?.length,
//       mutate
//     }),
//     [data?.data, data?.length, error, isLoading, isValidating, mutate]
//   );
//   return memoizedValue;
// }

// ----------------------------------------------------------------------
