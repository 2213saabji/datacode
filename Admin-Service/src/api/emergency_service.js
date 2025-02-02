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

export function useGetEmergencyNumbers() {
    const URL = endpoints.emergencyService.list;
    const { data, isLoading, error, isValidating, mutate } = useSWR(
        [URL, { headers: { Authorization: `Bearer ${accessToken}` } }],
        fetcher
    );


    const memoizedValue = useMemo(
        () => ({
            emergencyNumbers: data || [],
            emergencyNumbersLoading: isLoading,
            emergencyNumbersError: error,
            emergencyNumbersValidating: isValidating,
            emergencyNumbersEmpty: !isLoading && !data?.length,
            mutate

        }),
        [data, error, isLoading, isValidating, mutate]
    );

    return memoizedValue;
}

// ----------------------------------------------------------------------
// Get API Call For a specific Emergency Number Detail
// ----------------------------------------------------------------------

export function useGetEmergencyNumber(emergencyId) {
    const URL = emergencyId ? `${endpoints.emergencyService.details}/${emergencyId}` : null;

    const { data, isLoading, error, isValidating } = useSWR(
        [URL, { headers: { Authorization: `Bearer ${accessToken}` } }],
        fetcher
    );
    const memoizedValue = useMemo(
        () => ({
            emergencyNumber: data,
            emergencyNumberLoading: isLoading,
            emergencyNumberError: error,
            emergencyNumberValidating: isValidating,
        }),
        [data, error, isLoading, isValidating]
    );

    return memoizedValue;
}

// ----------------------------------------------------------------------
// Post API to Create Emergency Number
// ----------------------------------------------------------------------

export async function createEmergencyNumber(formData) {
    const URL = ATTPL_TMS_HOST_API + endpoints.emergencyService.create;

    try {
        const response = await axios.post(URL, formData, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error Creating Emergency Service:', error);
        throw error;
    }
}


// ----------------------------------------------------------------------
// Update API Call For Emergency Number
// ----------------------------------------------------------------------

export async function UpdateEmergencyNumber(EmergencyId, formData) {
    const URL = `${ATTPL_TMS_HOST_API + endpoints.emergencyService.edit}/${EmergencyId}`;

    try {
        const response = await axios.put(URL, formData, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error Updating Equipment Type:', error);
        throw error;
    }
}
