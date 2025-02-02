import useSWR from 'swr';
import { useMemo } from 'react';

import axios from 'src/utils/axios';
import { fetcher, endpoints } from 'src/utils/axios-institutionOwner';

import { ATTPL_UMS_HOST_API } from 'src/config-global';

const STORAGE_KEY = 'accessToken';
const accessToken = localStorage.getItem(STORAGE_KEY);

// ----------------------------------------------------------------------
// Get API Call For All Tractors
// ----------------------------------------------------------------------

export function useGetInstitutesDetail() {
  const URL = endpoints.institution.list;
  const { data, isLoading, error, isValidating } = useSWR(
    [URL, { headers: { Authorization: `Bearer ${accessToken}` } }],
    fetcher
  );

  const memoizedValue = useMemo(
    () => ({
      InstitutesLoading: isLoading,
      InstitutesError: error,
      InstitutesValidating: isValidating,
      InstitutesEmpty: !isLoading && !data?.length,
      Institutes: data || [],
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------
// Get API Call For a Tractor
// ----------------------------------------------------------------------

export function useGetInstituteDetail(InsituteId) {
  const URL = InsituteId ? `${endpoints.institution.details}/${InsituteId}` : null;
  const { data, isLoading, error, isValidating } = useSWR(
    [URL, { headers: { Authorization: `Bearer ${accessToken}` } }],
    fetcher
  );
  const memoizedValue = useMemo(
    () => ({
      institute: data,
      instituteLoading: isLoading,
      instituteError: error,
      instituteValidating: isValidating,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------
// Get API Call For Institution owner details
// ----------------------------------------------------------------------

export function useGetInstituteOwnerDetail(userId) {
  // console.log("userId", userId)
  const URL = userId ? `${endpoints.institutionOwner.details}/${userId}` : null;

  const { data, isLoading, error, isValidating } = useSWR(
    [URL, { headers: { Authorization: `Bearer ${accessToken}` } }],
    fetcher
  );
  // console.log("data", data)
  const memoizedValue = useMemo(
    () => ({
      InsituteOwner: data,
      InsituteOwnerLoading: isLoading,
      InsituteOwnerError: error,
      InsituteOwnerValidating: isValidating,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------
// Post API to Create Tractor
// ----------------------------------------------------------------------

export async function createInsitute(formData) {
  const URL = ATTPL_UMS_HOST_API + endpoints.institution.create;

  try {
    const response = await axios.post(URL, formData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating Insitute System:', error);
    throw error;
  }
}

// ----------------------------------------------------------------------
// Update API Call For Tractor
// ----------------------------------------------------------------------

export async function UpdateInsitute(InsituteId, formData) {
  const URL = `${ATTPL_UMS_HOST_API + endpoints.institution.update}/${InsituteId}`;

  try {
    const response = await axios.put(URL, formData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error Updating Insitute System:', error);
    throw error;
  }
}
