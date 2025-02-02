import useSWR from 'swr';
import { useMemo } from 'react';

import axios from 'src/utils/axios';
import { fetcher, endpoints } from 'src/utils/axios-institution-agriculture';

import { ATTPL_CMS_HOST_API } from 'src/config-global';

const STORAGE_KEY = 'accessToken';
const accessToken = localStorage.getItem(STORAGE_KEY);

export async function createAppointment(formData) {
  const URL = ATTPL_CMS_HOST_API + endpoints.appoinmnetforagri.create;

  try {
    const response = await axios.post(URL, formData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating tractor:', error);
    throw error;
  }
}

export async function UpdateAppoinmnetForAgri(Id, formData) {
  const URL = `${ATTPL_CMS_HOST_API + endpoints.appoinmnetforagri.update}/${Id}`;

  try {
    const response = await axios.put(URL, formData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error Updating Tractor:', error);
    throw error;
  }
}

export function useGetAppoinmnetForAgri(agricultureAppointmentId) {
  const URL = agricultureAppointmentId
    ? `${endpoints.appoinmnetforagri.details}/${agricultureAppointmentId}`
    : null;

  const { data, isLoading, error, isValidating } = useSWR(
    [URL, { headers: { Authorization: `Bearer ${accessToken}` } }],
    fetcher
  );
  const memoizedValue = useMemo(
    () => ({
      appointment: data,
      appointmentLoading: isLoading,
      appointmentError: error,
      appointmentValidating: isValidating,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

export function useGetAppointments() {
  const URL = endpoints.appoinmnetforagri.list;
  const { data, isLoading, error, isValidating } = useSWR(
    [URL, { headers: { Authorization: `Bearer ${accessToken}` } }],
    fetcher
  );

  const memoizedValue = useMemo(
    () => ({
      appointments: data || [],
      appointmentsLoading: isLoading,
      appointmentsError: error,
      appointmentsValidating: isValidating,
      appointmentsEmpty: !isLoading && !data?.length,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}
export function useGetAppointmentsFarmer() {
  const URL = endpoints.appoinmnetforagri.fetchByFarmer;
  const { data, isLoading, error, isValidating } = useSWR(
    [URL, { headers: { Authorization: `Bearer ${accessToken}` } }],
    fetcher
  );

  const memoizedValue = useMemo(
    () => ({
      farmerAppointments: data || [],
      farmerAppointmentsLoading: isLoading,
      farmerAppointmentsError: error,
      farmerAppointmentsValidating: isValidating,
      farmerAppointmentsEmpty: !isLoading && !data?.length,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}
export function useGetAppointmentsSeller() {
  const URL = endpoints.appoinmnetforagri.fetchBySeller;
  const { data, isLoading, error, isValidating } = useSWR(
    [URL, { headers: { Authorization: `Bearer ${accessToken}` } }],
    fetcher
  );

  const memoizedValue = useMemo(
    () => ({
      sellerAppointments: data || [],
      sellerAppointmentsLoading: isLoading,
      sellerAppointmentsError: error,
      sellerAppointmentsValidating: isValidating,
      sellerAppointmentsEmpty: !isLoading && !data?.length,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}
