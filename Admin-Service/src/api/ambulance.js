// import useSWR from 'swr';
// import { useMemo } from 'react';

import { isValidToken, setLocalStorage } from 'src/hooks/utils';

import axios from 'src/utils/axios';
import { endpoints } from 'src/utils/axios-tms';

import { ATTPL_TMS_HOST_API } from 'src/config-global';

// ----------------------------------------------------------------------
// variables for creating Trip

// ----------------------------------------------------------------------
// Fetch Api Calls For Trip
// ----------------------------------------------------------------------
const STORAGE_KEY = 'accessToken';

export async function useGetTrips() {
  try {
    const accessToken = localStorage.getItem(STORAGE_KEY);
    console.log('token', accessToken);
    if (accessToken && isValidToken(accessToken)) {
      // Assuming setLocalStorage is defined elsewhere
      setLocalStorage(accessToken);

      const response = await axios.get(ATTPL_TMS_HOST_API + endpoints.ambulance.list, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      // console.log("res",response);
      const { data } = response.data.data;

      // console.log(data);

      return data; // Return userName and email
    }
  } catch (error) {
    console.error(error);
    // Handle error if needed
    throw error; // Rethrow the error to be handled outside of this function
  }
  return null;
}

// export function useGetTrip(tripId) {
//   const URL = tripId ? `${endpoints.trip.details}/${tripId}` : null;

//   const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);
//   console.log("use get Trip",data)
//   const memoizedValue = useMemo(
//     () => ({
//       trip: data,
//       tripLoading: isLoading,
//       tripError: error,
//       tripValidating: isValidating,
//     }),
//     [data, error, isLoading, isValidating]
//   );

//   return memoizedValue;
// }

export async function useGetTrip(tripId) {
  try {
    const accessToken = localStorage.getItem(STORAGE_KEY);

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
// Post Api Calls For Trip
// ----------------------------------------------------------------------
export async function createTripProfile(formData) {
  const URL = ATTPL_TMS_HOST_API + endpoints.ambulance.create;

  try {
    console.log('>>>>>>>>>>>>>>>>', localStorage.getItem('accessToken'));
    const response = await axios.post(URL, formData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });

    if (response) {
      const tripID = response.data.tripId;
      localStorage.setItem('tripIdFromCreateTripProfile', tripID);
    }

    return response;
  } catch (error) {
    console.error('Error creating trip profile:', error);
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
    const accessToken = localStorage.getItem(STORAGE_KEY);
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
