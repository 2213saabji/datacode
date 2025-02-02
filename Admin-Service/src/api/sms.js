import useSWR from 'swr';
import axios from 'axios';
import { useMemo } from 'react';

import { fetcher, endpoints } from 'src/utils/axios-call-sms';

import { ATTPL_SMS_HOST_API } from 'src/config-global';

// ----------------------------------------------------------------------
const STORAGE_KEY = 'accessToken';
// const accessToken = localStorage.getItem(STORAGE_KEY);
export function useGetSms() {
  const accessToken = localStorage.getItem(STORAGE_KEY);
  const URL = endpoints.sms.list;
  const { data, isLoading, error, isValidating } = useSWR(
    [URL, { headers: { Authorization: `Bearer ${accessToken}` } }],
    fetcher
  );
  console.log(data);

  const memoizedValue = useMemo(() => {
    if (!data) {
      return {
        sms: [],
        smsLoading: isLoading,
        smsError: error,
        smsValidating: isValidating,
        smsEmpty: true,
      };
    }

    return {
      sms: data || [],
      smsLoading: isLoading,
      smsError: error,
      smsValidating: isValidating,
      smsEmpty: data.length === 0,
    };
  }, [data, error, isLoading, isValidating]);

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function useGetSmsById(smsId) {
  const accessToken = localStorage.getItem(STORAGE_KEY);
  const URL = smsId ? `${endpoints.sms.details}/${smsId}` : null;

  const { data, isLoading, error, isValidating } = useSWR(
    [URL, { headers: { Authorization: `Bearer ${accessToken}` } }],
    fetcher
  );
  const memoizedValue = useMemo(
    () => ({
      sms: data,
      smsLoading: isLoading,
      smsError: error,
      smsValidating: isValidating,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

// Api Call For Profile Creation
export async function createSms(formData) {
  const URL = ATTPL_SMS_HOST_API + endpoints.sms.create;

  try {
    const response = await axios.post(URL, formData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(response);

    return response;
  } catch (error) {
    console.error('Error creating booth:', error);
    throw error;
  }
}

export async function UpdateSms(smsId, formData) {
  const accessToken = localStorage.getItem(STORAGE_KEY);
  const URL = `${ATTPL_SMS_HOST_API + endpoints.sms.update}/${smsId}`;

  try {
    const response = await axios.put(URL, formData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });
    // const response = await axios.put([URL, { headers: { Authorization: `Bearer ${accessToken}` }}], formData, {
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // });

    if (response) {
      const UpdateSmsId = response.data.issue_id;
      localStorage.setItem('UpdateSmsId', UpdateSmsId);
    }
    console.log(response);
    return response;
  } catch (error) {
    console.error('Error creating booth:', error);
    throw error;
  }
}

// --------------remark--------- //

export function useGetRemark() {
  const accessToken = localStorage.getItem(STORAGE_KEY);
  const URL = endpoints.remark.list;
  const { data, isLoading, error, isValidating } = useSWR(
    [URL, { headers: { Authorization: `Bearer ${accessToken}` } }],
    fetcher
  );
  console.log(accessToken);

  const memoizedValue = useMemo(() => {
    if (!data) {
      return {
        remark: [],
        remarkLoading: isLoading,
        remarkError: error,
        remarkValidating: isValidating,
        remarkEmpty: true,
      };
    }

    return {
      remark: data || [],
      remarkLoading: isLoading,
      remarkError: error,
      remarkValidating: isValidating,
      remarkEmpty: data.length === 0,
    };
  }, [data, error, isLoading, isValidating]);

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function useGetRemarkById(remarkId) {
  const accessToken = localStorage.getItem(STORAGE_KEY);
  const URL = remarkId ? `${endpoints.remark.details}/${remarkId}` : null;

  const { data, isLoading, error, isValidating } = useSWR(
    [URL, { headers: { Authorization: `Bearer ${accessToken}` } }],
    fetcher
  );
  const memoizedValue = useMemo(
    () => ({
      remark: data,
      remarkLoading: isLoading,
      remarkError: error,
      remarkValidating: isValidating,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export async function createRemark(formData) {
  const URL = ATTPL_SMS_HOST_API + endpoints.remark.create;

  try {
    const response = await axios.post(URL, formData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(response);

    return response;
  } catch (error) {
    console.error('Error creating booth:', error);
    throw error;
  }
}

export async function UpdateReamark(remarkId, formData) {
  const accessToken = localStorage.getItem(STORAGE_KEY);
  const URL = `${ATTPL_SMS_HOST_API + endpoints.remark.update}/${remarkId}`;

  try {
    const response = await axios.put(
      [URL, { headers: { Authorization: `Bearer ${accessToken}` } }],
      formData,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (response) {
      const UpdateSmsId = response.data.issue_id;
      localStorage.setItem('UpdateSmsId', UpdateSmsId);
    }
    console.log(response);
    return response;
  } catch (error) {
    console.error('Error creating booth:', error);
    throw error;
  }
}
