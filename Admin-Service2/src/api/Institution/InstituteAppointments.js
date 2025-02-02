import useSWR from 'swr';
import { useMemo } from 'react';

import axios from 'src/utils/axios';
import { fetcher, endpoints } from 'src/utils/axios-institution-agriculture';

import { ATTPL_CMS_HOST_API } from 'src/config-global';

const STORAGE_KEY = 'accessToken';
const accessToken = localStorage.getItem(STORAGE_KEY);

// ----------------------------------------------------------------------
// Get API Call For All Appointments
// ----------------------------------------------------------------------

export function useGetAppointmentsDetail() {
  const URL = endpoints.appointment.list;
  const { data, isLoading, error, isValidating } = useSWR(
    [URL, { headers: { Authorization: `Bearer ${accessToken}` } }],
    fetcher
  );

  const memoizedValue = useMemo(
    () => ({
      AppointmentsLoading: isLoading,
      AppointmentsError: error,
      AppointmentsValidating: isValidating,
      AppointmentsEmpty: !isLoading && !data?.length,
      Appointments: data || [],
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------
// Get API Call For Student Appointments
// ----------------------------------------------------------------------

export function useGetStudentAppointmentsDetail() {
  const URL = endpoints.appointment.studentList;
  const { data, isLoading, error, isValidating } = useSWR(
    [URL, { headers: { Authorization: `Bearer ${accessToken}` } }],
    fetcher
  );

  const memoizedValue = useMemo(
    () => ({
      studentAppointLoading: isLoading,
      studentAppointError: error,
      studentAppointValidating: isValidating,
      studentAppointEmpty: !isLoading && !data?.length,
      studentAppoint: data || [],
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}
// ----------------------------------------------------------------------
// Get API Call For Institute Appointments
// ----------------------------------------------------------------------

export function useGetInstituteAppointmentsDetail() {
  const URL = endpoints.appointment.instituteAppointmentList;
  const { data, isLoading, error, isValidating } = useSWR(
    [URL, { headers: { Authorization: `Bearer ${accessToken}` } }],
    fetcher
  );

  const memoizedValue = useMemo(
    () => ({
      InstituteAppointLoading: isLoading,
      InstituteAppointError: error,
      InstituteAppointValidating: isValidating,
      InstituteAppointEmpty: !isLoading && !data?.length,
      InstituteAppoint: data || [],
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------
// Post API to Create Appointment
// ----------------------------------------------------------------------

export async function createInsituteAppointment(formData) {
  const URL = ATTPL_CMS_HOST_API + endpoints.appointment.create;

  try {
    const response = await axios.post(URL, formData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating Insitute Appointment:', error);
    throw error;
  }
}
// ----------------------------------------------------------------------
// Post API to Update Appointment
// ----------------------------------------------------------------------

export async function UpdateInsituteAppointment(InsituteId, formData) {
  const URL = `${ATTPL_CMS_HOST_API + endpoints.appointment.update}/${InsituteId}`;

  try {
    const response = await axios.put(URL, formData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error Updating Insitute Appointment:', error);
    throw error;
  }
}

// ----------------------------------------------------------------------
// Post API to Get Appointment by Id
// ----------------------------------------------------------------------

export function useGetInstituteAppointmentDetail(InsituteId) {
  const URL = InsituteId ? `${endpoints.appointment.details}/${InsituteId}` : null;
  const { data, isLoading, error, isValidating } = useSWR(
    [URL, { headers: { Authorization: `Bearer ${accessToken}` } }],
    fetcher
  );
  const memoizedValue = useMemo(
    () => ({
      instituteAppointDetails: data,
      instituteAppointDetailsLoading: isLoading,
      instituteAppointDetailsError: error,
      instituteAppointDetailsValidating: isValidating,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}
