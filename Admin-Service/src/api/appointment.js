import useSWR from 'swr' ;
import axios from 'axios' ;
import { useMemo } from 'react' ;

import { fetcher, endpoints } from 'src/utils/axios-call' ;

import { ATTPL_EMS_HOST_API } from 'src/config-global';

const STORAGE_KEY = 'accessToken';
// ----------------------------------------------------------------------
// useGetAppointmentsCandidate

export function useGetAppointments() {
  const accessToken = localStorage.getItem(STORAGE_KEY);      
  const URL = endpoints.appointment.list;
  const { data, isLoading, error, isValidating } = useSWR([URL, { headers: { Authorization: `Bearer ${accessToken}` }}], fetcher);

  const memoizedValue = useMemo(() => {
    if (!data) {
      return {
        appointments: [],
        appointmentsLoading: isLoading,
        appointmentsError: error,
        appointmentsValidating: isValidating,
        appointmentsEmpty: true,
      };
    }

    return {
        appointments: data || [],
        appointmentsLoading: isLoading,
        appointmentsError: error,
        appointmentsValidating: isValidating,
        appointmentsEmpty: data?.length === 0,
    };
  }, [data, error, isLoading, isValidating]);

  return memoizedValue;
}

export function useGetAppointmentsByvoter() {
  const accessToken = localStorage.getItem(STORAGE_KEY);      
  const URL = endpoints.appointment.fetchvv;
  const { data, isLoading, error, isValidating } = useSWR([URL, { headers: { Authorization: `Bearer ${accessToken}` }}], fetcher);
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

// api/v1/candidate/fetchAll


export function  useGetAppointmentsCandidate() {
  const accessToken = localStorage.getItem(STORAGE_KEY);      
  
   const URL=`${ATTPL_EMS_HOST_API}/candidate/fetchAll`
   
  const { data, isLoading, error, isValidating } = useSWR([URL, { headers: { Authorization: `Bearer ${accessToken}` }}], fetcher);
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
  const { data, isLoading, error, isValidating } = useSWR([URL, { headers: { Authorization: `Bearer ${accessToken}` }}], fetcher);
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

export function useGetAppointment(appointmentsID ) {
  const accessToken = localStorage.getItem(STORAGE_KEY);
  const URL = appointmentsID ? `${endpoints.appointment.details}/${appointmentsID }` : null;

  const { data, isLoading, error, isValidating } = useSWR([URL, { headers: { Authorization: `Bearer ${accessToken}` }}], fetcher);
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



export async function updateAppointment(id,formData) {
  const URL = `${ATTPL_EMS_HOST_API}${endpoints.appointment.update}/${id}`;
  

  try {

    const response = await axios.put(URL, formData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`
      },
    });
    return response;
  } catch (error) {
    console.error('Error creating booth:', error);
    throw error;
  }
}