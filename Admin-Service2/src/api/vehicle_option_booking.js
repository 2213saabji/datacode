import useSWR from 'swr';
import { useMemo } from 'react';

import axios from 'src/utils/axios';
import { fetcher, endpoints } from 'src/utils/axios-tms';

import { ATTPL_TMS_HOST_API } from 'src/config-global';


const STORAGE_KEY = 'accessToken';
const accessToken = localStorage.getItem(STORAGE_KEY);



// ----------------------------------------------------------------------
// Get API Call For All Emergeny Contact Number
// ----------------------------------------------------------------------

export function useGetVehicleOptions() {
    const URL = endpoints.vehicleBookingOption.list;
    const { data, isLoading, error, isValidating, mutate } = useSWR(
        [URL, { headers: { Authorization: `Bearer ${accessToken}` } }],
        fetcher
    );


    const memoizedValue = useMemo(
        () => ({
            vehicleOptions: data || [],
            vehicleOptionsLoading: isLoading,
            vehicleOptionsError: error,
            vehicleOptionsValidating: isValidating,
            vehicleOptionsEmpty: !isLoading && !data?.length,
            mutate

        }),
        [data, error, isLoading, isValidating, mutate]
    );

    return memoizedValue;
}

// ----------------------------------------------------------------------
// Get API Call For a specific Emergency Number Detail
// ----------------------------------------------------------------------

export function useGetVehicleOption(vehicleOptionId) {
    const URL = vehicleOptionId ? `${endpoints.vehicleBookingOption.details}/${vehicleOptionId}` : null;
    const { data, isLoading, error, isValidating } = useSWR(
        [URL, { headers: { Authorization: `Bearer ${accessToken}` } }],
        fetcher
    );
    const memoizedValue = useMemo(
        () => ({
            VehicleOption: data,
            VehicleOptionLoading: isLoading,
            VehicleOptionError: error,
            VehicleOptionValidating: isValidating,
        }),
        [data, error, isLoading, isValidating]
    );

    return memoizedValue;
}

// ----------------------------------------------------------------------
// Post API to Create Emergency Number
// ----------------------------------------------------------------------

export async function createVehicleOption(formData) {
    const URL = ATTPL_TMS_HOST_API + endpoints.vehicleBookingOption.create;

    try {
        const response = await axios.post(URL, formData, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
        });
        return response;
    } catch (error) {
        console.error('Error Creating Vehicle Booking Option:', error);
        throw error;
    }
}


// ----------------------------------------------------------------------
// Update API Call For Emergency Number
// ----------------------------------------------------------------------

export async function UpdateVehicleOption(vehicleOptionId, formData) {
    const URL = `${ATTPL_TMS_HOST_API + endpoints.vehicleBookingOption.edit}/${vehicleOptionId}`;

    try {
        const response = await axios.put(URL, formData, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error Updating Vehicle Booking Option:', error);
        throw error;
    }
}
