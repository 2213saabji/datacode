import useSWR from 'swr';
import axios from 'axios';
import { useMemo } from 'react';

import { fetcher, endpoints } from 'src/utils/axios-cms';

import { ATTPL_EMS_HOST_API, ATTPL_CMS_HOST_API } from 'src/config-global';

const STORAGE_KEY = 'accessToken';
// ----------------------------------------------------------------------

export function useGetdoctorAppointments() {
  const accessToken = localStorage.getItem(STORAGE_KEY);
  const URL = endpoints.docterappoinment.list;
  const { data, isLoading, error, isValidating } = useSWR(
    [URL, { headers: { Authorization: `Bearer ${accessToken}` } }],
    fetcher
  );
  console.log(data);

  const memoizedValue = useMemo(() => {
    if (!data) {
      return {
        doctorappointments: [],
        doctorappointmentsLoading: isLoading,
        doctorappointmentsError: error,
        doctorappointmentsValidating: isValidating,
        doctorappointmentsEmpty: true,
      };
    }

    return {
      doctorappointments: data || [],
      doctorappointmentsLoading: isLoading,
      doctorappointmentsError: error,
      doctorappointmentsValidating: isValidating,
      doctorappointmentsEmpty: data?.length === 0,
    };
  }, [data, error, isLoading, isValidating]);

  return memoizedValue;
}

export function useGetalldoctorfromUms() {
  const accessToken = localStorage.getItem(STORAGE_KEY);
  const URL = endpoints.docterappoinment.fetchalldoctor;
  const { data, isLoading, error, isValidating } = useSWR(
    [URL, { headers: { Authorization: `Bearer ${accessToken}` } }],
    fetcher
  );
  console.log(data);

  const memoizedValue = useMemo(() => {
    if (!data) {
      return {
        alldoctor: [],
        alldoctorLoading: isLoading,
        alldoctorError: error,
        alldoctorValidating: isValidating,
        alldoctorEmpty: true,
      };
    }

    return {
      alldoctor: data || [],
      alldoctorLoading: isLoading,
      alldoctorError: error,
      alldoctorValidating: isValidating,
      alldoctorEmpty: data?.length === 0,
    };
  }, [data, error, isLoading, isValidating]);

  return memoizedValue;
}

export async function createDoctorAppointment(formData) {
  const URL = ATTPL_CMS_HOST_API + endpoints.docterappoinment.create;
  const accessToken = localStorage.getItem(STORAGE_KEY);
  try {
    const response = await axios.post(URL, formData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response;
  } catch (error) {
    console.error('Error while creating DoctorAppointment:', error);
    throw error;
  }
}

export function useGetDoctorAppointment(appointmentsID) {
  const accessToken = localStorage.getItem(STORAGE_KEY);
  const URL = appointmentsID ? `${endpoints.docterappoinment.details}/${appointmentsID}` : null;

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

export async function updateDoctorAppointment(id, formData) {
  const URL = `${ATTPL_CMS_HOST_API}${endpoints.docterappoinment.update}/${id}`;

  try {
    const response = await axios.put(URL, formData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });
    return response;
  } catch (error) {
    console.error('Error creating booth:', error);
    throw error;
  }
}

export function useGetalldoctorDetails() {
  const accessToken = localStorage.getItem(STORAGE_KEY);
  const URL = endpoints.docterappoinment.fetchalldoctordetails;
  const { data, isLoading, error, isValidating } = useSWR(
    [URL, { headers: { Authorization: `Bearer ${accessToken}` } }],
    fetcher
  );
  console.log(data);

  const memoizedValue = useMemo(() => {
    if (!data) {
      return {
        alldoctorDetails: [],
        alldoctorDetailsLoading: isLoading,
        alldoctorDetailsError: error,
        alldoctorDetailsValidating: isValidating,
        alldoctorDetailsEmpty: true,
      };
    }

    return {
      alldoctorDetails: data || [],
      alldoctorDetailsLoading: isLoading,
      alldoctorDetailsError: error,
      alldoctorDetailsValidating: isValidating,
      alldoctorDetailsEmpty: data?.length === 0,
    };
  }, [data, error, isLoading, isValidating]);

  return memoizedValue;
}

export function useGetAppointmentsByvoter() {
  const accessToken = localStorage.getItem(STORAGE_KEY);
  const URL = endpoints.appointment.fetchvv;
  const { data, isLoading, error, isValidating } = useSWR(
    [URL, { headers: { Authorization: `Bearer ${accessToken}` } }],
    fetcher
  );
  console.log(data);

  const memoizedValue = useMemo(() => {
    if (!data) {
      return {
        appointment: [],
        appointmentLoading: isLoading,
        appointmentsError: error,
        appointmentsValidating: isValidating,
        appointmentsEmpty: true,
      };
    }

    return {
      appointment: data || [],
      appointmentLoading: isLoading,
      appointmentsError: error,
      appointmentsValidating: isValidating,
      appointmentsEmpty: data?.length === 0,
    };
  }, [data, error, isLoading, isValidating]);

  return memoizedValue;
}

// :electionId/:wardId/:boothId/:pollingStationId

export function useGetAppointmentsCandidate() {
  const accessToken = localStorage.getItem(STORAGE_KEY);
  // const URL = endpoints.appointment.filter;
  const URL = `${endpoints.appointment.filter}/${0}/${0}/${0}/${0}`;
  const { data, isLoading, error, isValidating } = useSWR(
    [URL, { headers: { Authorization: `Bearer ${accessToken}` } }],
    fetcher
  );
  console.log(data);

  const memoizedValue = useMemo(() => {
    if (!data) {
      return {
        candidates: [],
        candidatesLoading: isLoading,
        candidatesError: error,
        candidatesValidating: isValidating,
        candidatesEmpty: true,
      };
    }

    return {
      candidates: data || [],
      candidatesLoading: isLoading,
      candidatesError: error,
      candidatesValidating: isValidating,
      candidatesEmpty: data?.length === 0,
    };
  }, [data, error, isLoading, isValidating]);

  return memoizedValue;
}

export function useGetAppointmentsByCandidate() {
  const accessToken = localStorage.getItem(STORAGE_KEY);
  const URL = endpoints.appointment.fetchvc;
  const { data, isLoading, error, isValidating } = useSWR(
    [URL, { headers: { Authorization: `Bearer ${accessToken}` } }],
    fetcher
  );
  console.log(data);

  const memoizedValue = useMemo(() => {
    if (!data) {
      return {
        appointmentc: [],
        appointmentcLoading: isLoading,
        appointmentsError: error,
        appointmentsValidating: isValidating,
        appointmentsEmpty: true,
      };
    }

    return {
      appointmentc: data || [],
      appointmentcLoading: isLoading,
      appointmentsError: error,
      appointmentsValidating: isValidating,
      appointmentsEmpty: data?.length === 0,
    };
  }, [data, error, isLoading, isValidating]);

  return memoizedValue;
}
// ----------------------------------------------------------------------

export function useGetAppointment(appointmentsID) {
  const accessToken = localStorage.getItem(STORAGE_KEY);
  const URL = appointmentsID ? `${endpoints.appointment.details}/${appointmentsID}` : null;

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

// ----------------------------------------------------------------------

// Api Call For Profile Creation
export async function createAppointment(formData) {
  const URL = ATTPL_EMS_HOST_API + endpoints.appointment.create;

  try {
    const response = await axios.post(URL, formData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response;
  } catch (error) {
    console.error('Error creating booth:', error);
    throw error;
  }
}

export async function updateAppointment(id, formData) {
  const URL = `${ATTPL_EMS_HOST_API}${endpoints.appointment.update}/${id}`;

  try {
    const response = await axios.put(URL, formData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });
    return response;
  } catch (error) {
    console.error('Error creating booth:', error);
    throw error;
  }
}
