import useSWR from 'swr';
import { useMemo } from 'react';

import { isValidToken, setLocalStorage } from 'src/hooks/utils';

import axios from 'src/utils/axios';
import { fetcher, endpoints } from 'src/utils/axiox-labour-job-portal';

import { ATTPL_TMS_HOST_API } from 'src/config-global';

// ----------------------------------------------------------------------
// variables for creating Trip

// ----------------------------------------------------------------------
// Fetch Api Calls For Trip
// ----------------------------------------------------------------------
const STORAGE_KEY = 'accessToken';
const accessToken = localStorage.getItem(STORAGE_KEY);

export async function fetchLabourJobs() {
  try {
    if (accessToken && isValidToken(accessToken)) {
      const response = await axios.get(ATTPL_TMS_HOST_API + endpoints.labour_job.list, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      // console.log("res",response);
      const { data } = response.data;

      return data; // Return userName and email
    }
  } catch (error) {
    console.error(error);
    // Handle error if needed
    throw error; // Rethrow the error to be handled outside of this function
  }
  return null;
}

export function useGetJob(jobId) {
  const URL = jobId ? `${endpoints.labour_job.details}/${jobId}` : null;

  const { data, isLoading, error, isValidating } = useSWR(
    [URL, { headers: { Authorization: `Bearer ${accessToken}` } }],
    fetcher
  );
  const memoizedValue = useMemo(
    () => ({
      job: data,
      jobLoading: isLoading,
      jobError: error,
      jobValidating: isValidating,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

export function useGetJobTypes() {
  const URL = endpoints.labour_job.jobType_list;
  const { data, isLoading, error, isValidating } = useSWR(
    [URL, { headers: { Authorization: `Bearer ${accessToken}` } }],
    fetcher
  );

  const memoizedValue = useMemo(
    () => ({
      jobTypes: data || [],
      jobTypesLoading: isLoading,
      jobTypesError: error,
      jobTypesValidating: isValidating,
      jobTypesEmpty: !isLoading && !data?.length,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

export async function useGetTrip(tripId) {
  try {
    if (accessToken && isValidToken(accessToken)) {
      // Assuming setLocalStorage is defined elsewhere
      setLocalStorage(accessToken);

      const response = await axios.get(
        `${ATTPL_TMS_HOST_API + endpoints.ambulance.details}/${tripId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const { data } = response.data.data;

      return data; // Return userName and email
    }
  } catch (error) {
    console.error(error);
    // Handle error if needed
    throw error; // Rethrow the error to be handled outside of this function
  }
  return null;
}

// ----------------------------------------------------------------------
// Post Api Calls For job type category
// ----------------------------------------------------------------------

export async function getJobTypeCategory(jobType) {
  try {
    const response = await axios.get(
      `${ATTPL_TMS_HOST_API + endpoints.labour_job.jobType_category}/${jobType}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const { data } = response?.data || [];

    return data; // Return userName and email
  } catch (error) {
    console.error(error);
    // Handle error if needed
    throw error; // Rethrow the error to be handled outside of this function
  }
}

export async function createLabourJob(formData) {
  const URL = ATTPL_TMS_HOST_API + endpoints.labour_job.create;
  try {
    const response = await axios.post(URL, formData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response) {
      return response;
    }
    return null;
  } catch (error) {
    console.error('Error creating trip profile:', error);
    throw error;
  }
}

export async function UpdateJob(jobId, formData) {
  const URL = `${ATTPL_TMS_HOST_API + endpoints.labour_job.update}/${jobId}`;

  try {
    const response = await axios.put(URL, formData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error Updating Job:', error);
    throw error;
  }
}

// ----------------------------------------------------------------------
// Api call for Trip Update

export async function updateTripProfile(tripId, formData) {
  const URL = `${ATTPL_TMS_HOST_API + endpoints.trip.edit}/${tripId}`;

  try {
    const response = await axios.put(URL, formData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response) {
      const updatedTripIdentityId = response.data.tripId;
      localStorage.setItem('UpdateTripIdentity', updatedTripIdentityId);
    }

    return response;
  } catch (error) {
    console.error('Error updating trip profile:', error);
    throw error;
  }
}
// ----------------------------------------------------------------------------

export async function getUserNameSearch(value) {
  try {
    console.log('token', accessToken);
    if (accessToken && isValidToken(accessToken)) {
      // Assuming setLocalStorage is defined elsewhere
      setLocalStorage(accessToken);

      const response = await axios.get(
        `${ATTPL_TMS_HOST_API}${endpoints.user.searchList}name=${value}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      // console.log("res",response);
      const { data } = response.data;

      console.log(response.data.data);

      return data; // Return userName and email
    }
  } catch (error) {
    console.error(error);
    // Handle error if needed
    throw error; // Rethrow the error to be handled outside of this function
  }
  return null;
}
