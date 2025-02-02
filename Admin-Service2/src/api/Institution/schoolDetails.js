import useSWR from 'swr';
import { useMemo } from 'react';

import axios from 'src/utils/axios';
import { fetcher, endpoints } from 'src/utils/axios-institution-agriculture';

import { ATTPL_CMS_HOST_API } from 'src/config-global';

const STORAGE_KEY = 'accessToken';
const accessToken = localStorage.getItem(STORAGE_KEY);

// ----------------------------------------------------------------------
// Get API Call For All Tractors
// ----------------------------------------------------------------------

export function useGetSchoolDetails() {
  const URL = endpoints.schoolDetails.list;
  const { data, isLoading, error, isValidating } = useSWR(
    [URL, { headers: { Authorization: `Bearer ${accessToken}` } }],
    fetcher
  );

  const memoizedValue = useMemo(
    () => ({
      schools: data || [],
      schoolsLoading: isLoading,
      schoolsError: error,
      schoolsValidating: isValidating,
      schoolsEmpty: !isLoading && !data?.length,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------
// Get API Call For a Tractor
// ----------------------------------------------------------------------

export function useGetSchoolDetail(schoolDetailId) {
  const URL = schoolDetailId ? `${endpoints.schoolDetails.details}/${schoolDetailId}` : null;

  const { data, isLoading, error, isValidating } = useSWR(
    [URL, { headers: { Authorization: `Bearer ${accessToken}` } }],
    fetcher
  );
  const memoizedValue = useMemo(
    () => ({
      school: data,
      schoolLoading: isLoading,
      schoolError: error,
      schoolValidating: isValidating,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------
// Post API to Create Tractor
// ----------------------------------------------------------------------

export async function createSchoolDetail(formData) {
  const URL = ATTPL_CMS_HOST_API + endpoints.schoolDetails.create;

  try {
    const response = await axios.post(URL, formData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating school Deitail:', error);
    throw error;
  }
}

// ----------------------------------------------------------------------
// Update API Call For Tractor
// ----------------------------------------------------------------------

export async function UpdateSchoolDetails(institutionId, formData) {
  const URL = `${ATTPL_CMS_HOST_API + endpoints.schoolDetails.update}/${institutionId}`;

  try {
    const response = await axios.put(URL, formData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error Updating school Details:', error);
    throw error;
  }
}
