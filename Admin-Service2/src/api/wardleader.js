// import useSWR from 'swr';

import { isValidToken, setLocalStorage } from 'src/hooks/utils';

import axios from 'src/utils/axios';
import {
  // fetcher,
  endpoints,
} from 'src/utils/axios-tms';

import { ATTPL_TMS_HOST_API } from 'src/config-global';
// import { useMemo } from 'react';
// ----------------------------------------------------------------------
// variables for creating Trip

// ----------------------------------------------------------------------
// Fetch Api Calls For Trip
// ----------------------------------------------------------------------
// export function useGetTrips() {
//   const URL = ATTPL_TMS_HOST_API + endpoints.trip.list;
//   const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);
//   const memoizedValue = useMemo(
//     () => ({
//       trips: data || [],
//       tripsLoading: isLoading,
//       tripsError: error,
//       tripsValidating: isValidating,
//       tripsEmpty: !isLoading && !data?.length,
//     }),
//     [data, error, isLoading, isValidating]
//   );
//   return memoizedValue;
// }
const STORAGE_KEY = 'accessToken';
export async function useGetTrips() {
  try {
    const accessToken = localStorage.getItem(STORAGE_KEY);

    if (accessToken && isValidToken(accessToken)) {
      // Assuming setLocalStorage is defined elsewhere
      setLocalStorage(accessToken);

      const response = await axios.get(ATTPL_TMS_HOST_API + endpoints.wardleader.list, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

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

export async function useGetTrip(tripId) {
  try {
    const accessToken = localStorage.getItem(STORAGE_KEY);

    if (accessToken && isValidToken(accessToken)) {
      // Assuming setLocalStorage is defined elsewhere
      setLocalStorage(accessToken);

      const response = await axios.get(
        `${ATTPL_TMS_HOST_API + endpoints.wardleader.details}/${tripId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
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
// ----------------------------------------------------------------------
// Post Api Calls For Trip
// ----------------------------------------------------------------------
export async function createTripProfile(formData) {
  const URL = ATTPL_TMS_HOST_API + endpoints.wardleader.create;
  console.log(`URL => ${URL}`);

  try {
    const response = await axios.post(URL, formData, {
      headers: {
        'Content-Type': 'application/json',
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
  // const URL = `${ATTPL_TMS_HOST_API + endpoints.wardleader.edit}/${tripId}`;
  // const response = await axios.get(`${ATTPL_TMS_HOST_API + endpoints.wardleader.edit}/${tripId}`,{
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  // });
  // console.log('dsfsdfhjksfhkshfs',response);
  // formData.userId = response.data.data.userId;

  try {
    const res = await axios.put(
      `${ATTPL_TMS_HOST_API + endpoints.wardleader.edit}/${tripId}`,
      formData,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (res) {
      const updatedTripIdentityId = res.data.tripId;
      localStorage.setItem('UpdateTripIdentity', updatedTripIdentityId);
    }

    return res;
  } catch (error) {
    console.error('Error updating trip profile:', error);
    throw error;
  }
}

//------------------------------------
// export function useGetDriverByWardBooth(wardId,boothId) {
//   const accessToken = localStorage.getItem(STORAGE_KEY);
//   const URL = `${endpoints.wardleader.driverList}/${wardId}/${boothId}`;
//   const { data, isLoading, error, isValidating } = useSWR([URL,{ headers: { Authorization: `Bearer ${accessToken}` }}], fetcher);

//   const memoizedValue = useMemo(
//     () => ({
//       drivers: data || [],
//       driversLoading: isLoading,
//       driversError: error,
//       driversValidating: isValidating,
//       driversEmpty: !isLoading && !data?.length,
//     }),
//     [data, error, isLoading, isValidating]
//   );
//   return memoizedValue;
// }
export async function GetDriverByWardBooth(wardId, boothId) {
  try {
    const accessToken = localStorage.getItem(STORAGE_KEY);

    if (accessToken && isValidToken(accessToken)) {
      // Assuming setLocalStorage is defined elsewhere
      setLocalStorage(accessToken);

      const response = await axios.get(
        `${ATTPL_TMS_HOST_API}${endpoints.wardleader.driverList}/${wardId}/${boothId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const { data } = response.data;
      console.log('data', data);
      return data; // Return userName and email
    }
  } catch (error) {
    console.error(error);
    // Handle error if needed
    throw error; // Rethrow the error to be handled outside of this function
  }
  return null;
}
