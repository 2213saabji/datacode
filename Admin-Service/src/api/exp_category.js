import useSWR from 'swr';
import { useMemo } from 'react';

import axios from 'src/utils/axios';
import { fetcher, endpoints } from 'src/utils/axios-exp_ms';

import { ATTPL_EXPMS_HOST_API } from 'src/config-global';

// ----------------------------------------------------------------------
// Get API Call For All Categories
// ----------------------------------------------------------------------
const STORAGE_KEY = 'accessToken';
const accessToken = localStorage.getItem(STORAGE_KEY);

export function useGetCategories() {
  const URL = endpoints.exp_category.list;
  const { data, isLoading, error, isValidating } = useSWR(
    [URL, { headers: { Authorization: `Bearer ${accessToken}` } }],
    fetcher
  );
  console.log(data);

  const memoizedValue = useMemo(() => {
    if (!data) {
      return {
        categories: [],
        categoriesLoading: isLoading,
        categoriesError: error,
        categoriesValidating: isValidating,
        categoriesEmpty: true,
      };
    }

    return {
      categories: data || [],
      categoriesLoading: isLoading,
      categoriesError: error,
      categoriesValidating: isValidating,
      categoriesEmpty: data.length === 0,
    };
  }, [data, error, isLoading, isValidating]);

  return memoizedValue;
}

// ----------------------------------------------------------------------
// Get API Call For a Category
// ----------------------------------------------------------------------

export function useGetCategory(categoryId) {
  const URL = categoryId ? `${endpoints.exp_category.details}/${categoryId}` : null;

  const { data, isLoading, error, isValidating } = useSWR(
    [URL, { headers: { Authorization: `Bearer ${accessToken}` } }],
    fetcher
  );
  const memoizedValue = useMemo(
    () => ({
      category: data,
      categoryLoading: isLoading,
      categoryError: error,
      categoryValidating: isValidating,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------
// Post API Call For Ward
// ----------------------------------------------------------------------

export async function createCategory(formData) {
  const URL = ATTPL_EXPMS_HOST_API + endpoints.exp_category.create;

  try {
    const response = await axios.post(URL, formData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating category:', error);
    throw error;
  }
}

// ----------------------------------------------------------------------
// Update API Call For Category
// ----------------------------------------------------------------------

export async function UpdateCategory(categoryId, formData) {
  const URL = `${ATTPL_EXPMS_HOST_API + endpoints.exp_category.update}/${categoryId}`;

  try {
    const response = await axios.put(URL, formData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error Updating Category:', error);
    throw error;
  }
}
