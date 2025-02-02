import useSWR from 'swr';
import { useMemo } from 'react';

import axios from 'src/utils/axios';
import { fetcher, endpoints } from 'src/utils/axios-institution-agriculture';

import { ATTPL_CMS_HOST_API } from 'src/config-global';


const STORAGE_KEY = 'accessToken';
const accessToken = localStorage.getItem(STORAGE_KEY);



// ----------------------------------------------------------------------
// Get API Call For All Equipment Type and Equipment Details
// ----------------------------------------------------------------------

export function useGetEquipments() {
    const URL = endpoints.equipment.list;
    const { data, isLoading, error, isValidating, mutate } = useSWR(
        [URL, { headers: { Authorization: `Bearer ${accessToken}` } }],
        fetcher
    );


    const memoizedValue = useMemo(
        () => ({
            equipments: data || [],
            equipmentsLoading: isLoading,
            equipmentsError: error,
            equipmentsValidating: isValidating,
            equipmentsEmpty: !isLoading && !data?.length,
            mutate

        }),
        [data, error, isLoading, isValidating, mutate]
    );

    return memoizedValue;
}

export function useGetEquipmentsDetails() {
    const URL = endpoints.equipmentDetails.list;
    const { data, isLoading, error, isValidating, mutate } = useSWR(
        [URL, { headers: { Authorization: `Bearer ${accessToken}` } }],
        fetcher
    );


    const memoizedValue = useMemo(
        () => ({
            equipmentDetails: data || [],
            equipmentDetailsLoading: isLoading,
            equipmentDetailsError: error,
            equipmentDetailsValidating: isValidating,
            equipmentDetailsEmpty: !isLoading && !data?.length,
            mutate
        }),
        [data, error, isLoading, isValidating, mutate]
    );

    return memoizedValue;
}

// ----------------------------------------------------------------------
// Get API Call For a specific Equipement Type Detail
// ----------------------------------------------------------------------

export function useGetEquipment(equipmentId) {
    const URL = equipmentId ? `${endpoints.equipment.details}/${equipmentId}` : null;

    const { data, isLoading, error, isValidating } = useSWR(
        [URL, { headers: { Authorization: `Bearer ${accessToken}` } }],
        fetcher
    );
    const memoizedValue = useMemo(
        () => ({
            equipment: data,
            equipmentLoading: isLoading,
            equipmentError: error,
            equipmentValidating: isValidating,
        }),
        [data, error, isLoading, isValidating]
    );

    return memoizedValue;
}

export function useGetEquipmentDetail(equipmentDetailsId) {
    const URL = equipmentDetailsId ? `${endpoints.equipmentDetails.details}/${equipmentDetailsId}` : null;

    const { data, isLoading, error, isValidating } = useSWR(
        [URL, { headers: { Authorization: `Bearer ${accessToken}` } }],
        fetcher
    );
    const memoizedValue = useMemo(
        () => ({
            equipmentDetail: data,
            equipmentDetailLoading: isLoading,
            equipmentDetailError: error,
            equipmentDetailValidating: isValidating,
        }),
        [data, error, isLoading, isValidating]
    );

    return memoizedValue;
}

// ----------------------------------------------------------------------
// Post API to Create Equipment Type
// ----------------------------------------------------------------------

export async function createEquipmentType(formData) {
    const URL = ATTPL_CMS_HOST_API + endpoints.equipment.create;

    try {
        const response = await axios.post(URL, formData, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error Creating Equipment Type:', error);
        throw error;
    }
}

export async function createEquipmentDetails(formData) {
    const URL = ATTPL_CMS_HOST_API + endpoints.equipmentDetails.create;

    try {
        const response = await axios.post(URL, formData, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error adding Equipment Details:', error);
        throw error;
    }
}


// ----------------------------------------------------------------------
// Update API Call For Equipment
// ----------------------------------------------------------------------

export async function UpdateEquipmentType(EquipmentTypeId, formData) {
    const URL = `${ATTPL_CMS_HOST_API + endpoints.equipment.update}/${EquipmentTypeId}`;

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

export async function UpdateEquipmentDetails(EquipmentDetailId, formData) {
    const URL = `${ATTPL_CMS_HOST_API + endpoints.equipmentDetails.update}/${EquipmentDetailId}`;

    try {
        const response = await axios.put(URL, formData, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error Updating Equipment Details:', error);
        throw error;
    }
}
