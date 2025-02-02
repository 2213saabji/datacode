import { isValidToken, setLocalStorage } from 'src/hooks/utils';

import axios from 'src/utils/axios';
import { endpoints } from 'src/utils/axiox-delivery-service';

import { ATTPL_TMS_HOST_API } from 'src/config-global';

// ----------------------------------------------------------------------
// variables for creating Trip

// ----------------------------------------------------------------------
// Fetch Api Calls For Trip
// ----------------------------------------------------------------------
const STORAGE_KEY = 'accessToken';
const accessToken = localStorage.getItem(STORAGE_KEY);


// fetch all delivery trip
export async function useGetDeliveryTrips() {
  try {
    console.log('token', accessToken);
    if (accessToken && isValidToken(accessToken)) {
      // Assuming setLocalStorage is defined elsewhere
      setLocalStorage(accessToken);

      const response = await axios.get(ATTPL_TMS_HOST_API + endpoints.delivery_service.list, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log('res', response.data);
      const { data } = response.data;

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

//  fetch single trip
export async function useGetDeliveryTrip(bookingId) {
  try {
    if (accessToken) {
      const response = await axios.get(
        `${ATTPL_TMS_HOST_API + endpoints.delivery_service.details}/${bookingId}`,
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

export async function createDeliveryService(formData) {
  const URL = ATTPL_TMS_HOST_API + endpoints.delivery_service.create;
  try {
    const response = await axios.post(URL, formData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response) {
      return response.data;
    }
    return null;
  } catch (error) {
    console.error('Error creating Delivery  Job Request profile:', error);
    throw error;
  }
};



//  fetch all vehicle List
export async function getVehicleOptions(type) {
  try {
    if (accessToken) {
      const response = await axios.get(
        `${ATTPL_TMS_HOST_API + endpoints.vehicle_option.list}/${type}`,
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


