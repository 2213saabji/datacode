

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
export async function useGetCabTrips() {
  try {
     console.log("token",accessToken);
    if (accessToken && isValidToken(accessToken)) {
      // Assuming setLocalStorage is defined elsewhere
      setLocalStorage(accessToken);

      const response = await axios.get(ATTPL_TMS_HOST_API+endpoints.cab_service.list, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log("res",response.data);
      const {data} = response.data;
      
    // console.log(data);
     
      return data;  // data
      
    }
  } catch (error) {
    console.error(error);
    // Handle error if needed
    throw error; // Rethrow the error to be handled outside of this function
  }
  return null;
};


//  fetch single trip
// fetch all delivery trip
export async function useGetCabTrip(id) {
  try {
     console.log("token",accessToken);
    if (accessToken && isValidToken(accessToken)) {
      // Assuming setLocalStorage is defined elsewhere
      setLocalStorage(accessToken);
 
      const URL = `${ATTPL_TMS_HOST_API}${endpoints.cab_service.details}/${id}`;

      const response = await axios.get(URL, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log("res",response.data);
      const {data} = response.data;
      
    // console.log(data);
     
      return data;  // data
      
    }
  } catch (error) {
    console.error(error);
    // Handle error if needed
    throw error; // Rethrow the error to be handled outside of this function
  }
  return null;
};

export async function createCabRequest(formData) {
  const URL =  ATTPL_TMS_HOST_API+endpoints.cab_service.create;
  try {
    const response = await axios.post(URL, formData, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
    });

    if (response) {
        return response.data;
    }
     return null;

  } catch (error) {
    console.error('Error creating Cab Request:', error);
    throw error;
  }
}


export async function getAllCabVehicleOption() {
  const URL =  ATTPL_TMS_HOST_API+endpoints.cab_service.vehicleList;
  try {
    const response = await axios.get(URL, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
    });

    if (response) {
        return response.data;
    }
     return null;

  } catch (error) {
    console.error('Error creating Cab Request:', error);
    throw error;
  }
}

export async function UpdateCab(cabRequestId, formData) {
  const URL = `${ATTPL_TMS_HOST_API + endpoints.cab_service.update}/${cabRequestId}`;

  try {
    const response = await axios.put(URL, formData, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error Updating Job:', error);
    throw error;
  }
}

