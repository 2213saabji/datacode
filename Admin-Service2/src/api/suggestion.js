import useSWR from 'swr';
import axios from 'axios';
import { useMemo } from 'react';

import { puter, fetcher, endpoints } from 'src/utils/axios-cms';

import { ATTPL_CMS_HOST_API } from 'src/config-global';

// -----------------------------------------------------------------------

export function useGetSuggestions(accessToken) {
  const URL = endpoints.suggestion.list;

  const { data, isLoading, error, isValidating } = useSWR(
    [URL, { headers: { Authorization: `Bearer ${accessToken}` } }],
    fetcher
  );
  const memoizedValue = useMemo(
    () => ({
      suggestions: data || [],
      suggestionsLoading: isLoading,
      suggestionsError: error,
      suggestionsValidating: isValidating,
      suggestionsEmpty: !isLoading && !data?.length,
    }),
    [data, error, isLoading, isValidating]
  );
  return memoizedValue;
}

export async function createSuggestion(formData, userId) {
  formData.userId = userId;
  const URL = ATTPL_CMS_HOST_API + endpoints.suggestion.create;

  try {
    const response = await axios.post(URL, formData, {
      headers: {
        'Content-Type': 'application/json',
        // Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`
      },
    });
    return response;
  } catch (error) {
    console.error('Error creating feedback:', error);
    throw error;
  }
}

export function useGetSuggestionByFeedbackId(feedbackId, accessToken) {
  const URL = feedbackId ? `${endpoints.suggestion.details}/${feedbackId}` : null;

  // const accessToken = sessionStorage.getItem("accessToken");

  const { data, isLoading, error, isValidating } = useSWR(
    [URL, { headers: { Authorization: `Bearer ${accessToken}` } }],
    fetcher
  );
  const memoizedValue = useMemo(
    () => ({
      suggestion: data,
      suggestionLoading: isLoading,
      suggestionError: error,
      suggestionValidating: isValidating,
    }),
    [data, error, isLoading, isValidating]
  );
  // console.log(memoizedValue)
  return memoizedValue;
}

// for geting status

export function useGetStatus(accessToken) {
  const URL = endpoints.suggestion.status;
  // const accessToken = sessionStorage.getItem("accessToken");

  const { data, isLoading, error, isValidating } = useSWR(
    [URL, { headers: { Authorization: `Bearer ${accessToken}` } }],
    fetcher
  );
  const memoizedValue = useMemo(
    () => ({
      suggestionstatus: data || [],
      suggestionstatusLoading: isLoading,
      suggestionstatusError: error,
      suggestionstatusValidating: isValidating,
      suggestionstatusEmpty: !isLoading && !data?.length,
    }),
    [data, error, isLoading, isValidating]
  );
  return memoizedValue;
}

// getting feedback status

// export function UpdateStatusCount() {
//   const URL = endpoints.suggestion.statusTwo;
//   const accessToken = sessionStorage.getItem("accessToken");

//   const { data, isLoading, error, isValidating } = useSWR([URL,{ headers: { Authorization: `Bearer ${accessToken}` }}], );
//   const memoizedValue = useMemo(
//     () => ({
//       suggestionstatusTwo: data || [],
//       suggestionstatusTwoLoading: isLoading,
//       suggestionstatusTwoError: error,
//       suggestionstatusTwoValidating: isValidating,
//       suggestionstatusTwoEmpty: !isLoading && !data?.length,
//     }),
//     [data, error, isLoading, isValidating]
//   );
//   return memoizedValue;
// }

export async function UpdateStatusCount(feedbackId, formData) {
  // formData.feedbackId = feedbackId;
  try {
    const URL = `/feedback/status/update/${feedbackId}`;
    const accessToken = sessionStorage.getItem('accessToken');

    const response = await puter(URL, formData, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    if (response) {
      return response;
    }
  } catch (error) {
    console.error('Error creating Survey response:', error);
  }
}
