import useSWR from 'swr';
import { useMemo } from 'react';

import { fetcher, endpoints } from 'src/utils/axios-templateManagemet';

// ----------------------------------------------------------------------

export function useGetTemplatePosts() {
  const URL = endpoints.templateManagement.fetchall;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      posts: data?.data || [],
      postsLoading: isLoading,
      postsError: error,
      postsValidating: isValidating,
    }),
    [data, error, isLoading, isValidating]
  );
  return memoizedValue;
}

export function useGetTemplateLibraryPosts() {
  const URL = endpoints.templateLibrary.fetchAll;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      posts: data?.data || [],
      postsLoading: isLoading,
      postsError: error,
      postsValidating: isValidating,
    }),
    [data, error, isLoading, isValidating]
  );
  return memoizedValue;
}

// export function useGetTemplatePost() {
//     const URL = endpoints.post.list;

//     const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

//     const memoizedValue = useMemo(
//       () => ({
//         posts: data?.posts || [],
//         postsLoading: isLoading,
//         postsError: error,
//         postsValidating: isValidating,
//         postsEmpty: !isLoading && !data?.posts.length,
//       }),
//       [data?.posts, error, isLoading, isValidating]
//     );
//     return memoizedValue;
//   }
