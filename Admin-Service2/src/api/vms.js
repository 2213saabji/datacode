import useSWR from 'swr';
import { useMemo } from 'react';

import axios from 'src/utils/axios';
import { fetcher, endpoints } from 'src/utils/axios-vms';

import { ATTPL_VMS_HOST_API } from 'src/config-global';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------
// Fetch Api Calls For Services
// ----------------------------------------------------------------------
export function useGetServices() {
  const URL = endpoints.vms_service.list;
  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);
  const memoizedValue = useMemo(
    () => ({
      versions: data || [],
      versionsLoading: isLoading,
      versionsError: error,
      versionsValidating: isValidating,
      versionsEmpty: !isLoading && !data?.length,
    }),
    [data, error, isLoading, isValidating]
  );
  return memoizedValue;
}

// ----------------------------------------------------------------------

export function useGetService(serviceId) {
  const URL = serviceId ? `${endpoints.vms_service.details}/${serviceId}` : null;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);
  const memoizedValue = useMemo(
    () => ({
      versions: data,
      versionsLoading: isLoading,
      versionsError: error,
      versionsValidating: isValidating,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------
// Post Api Calls For Service
// ----------------------------------------------------------------------
// ----------------------------------------------------------------------
// Api Call For Service Creation

export async function createServiceVersion(formData) {
  const URL = ATTPL_VMS_HOST_API + endpoints.vms_service.create;

  try {
    const response = await axios.post(URL, formData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response;
  } catch (error) {
    console.error('Error creating candidate profile:', error);
    throw error;
  }
}

// ----------------------------------------------------------------------
// Api call for Service Update

export async function UpdateServiceVersion(serviceId, formData) {
  const URL = `${ATTPL_VMS_HOST_API + endpoints.vms_service.update}/${serviceId}`;

  try {
    const response = await axios.put(URL, formData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response;
  } catch (error) {
    console.error('Error creating candidate profile:', error);
    throw error;
  }
}
