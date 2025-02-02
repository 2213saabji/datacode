import useSWR from 'swr';
import { useMemo } from 'react';

import axios from 'src/utils/axios';
import { fetcher, endpoints } from 'src/utils/axios-cms';

import { ATTPL_CMS_HOST_API } from 'src/config-global';

// ----------------------------------------------------------------------
const STORAGE_KEY = 'accessToken';
// ----------------------------------------------------------------------

export function useGetContacts() {
  const accessToken = localStorage.getItem(STORAGE_KEY);
  const URL = endpoints.contact.list;

  const { data, isLoading, error, isValidating } = useSWR(
    [URL, { headers: { Authorization: `Bearer ${accessToken}` } }],
    fetcher
  );

  const memoizedValue = useMemo(
    () => ({
      contacts: data || [],
      contactsLoading: isLoading,
      contactsError: error,
      contactsValidating: isValidating,
      contactsEmpty: !isLoading && !data?.length,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function useGetContact(contactId) {
  const accessToken = localStorage.getItem(STORAGE_KEY);
  const URL = contactId ? `${endpoints.contact.details}/${contactId}` : null;

  const { data, isLoading, error, isValidating } = useSWR(
    [URL, { headers: { Authorization: `Bearer ${accessToken}` } }],
    fetcher
  );

  const memoizedValue = useMemo(
    () => ({
      contact: data,
      contactLoading: isLoading,
      contactError: error,
      contactValidating: isValidating,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// Update API Call For Contact
// ----------------------------------------------------------------------

export async function UpdateContact(contactId, formData) {
  const URL = `${ATTPL_CMS_HOST_API + endpoints.contact.edit}/${contactId}`;

  try {
    const response = await axios.put(URL, formData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error Updating Contact:', error);
    throw error;
  }
}

// ----------------------------------------------------------------------

export function useSearchProducts(query) {
  const URL = query ? [endpoints.product.search, { params: { query } }] : '';

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher, {
    keepPreviousData: true,
  });

  const memoizedValue = useMemo(
    () => ({
      searchResults: data?.results || [],
      searchLoading: isLoading,
      searchError: error,
      searchValidating: isValidating,
      searchEmpty: !isLoading && !data?.results.length,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}
