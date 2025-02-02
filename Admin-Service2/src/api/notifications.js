import useSWR from 'swr';
import { useMemo } from 'react';

import axios from 'src/utils/axios';
import { poster, fetcher, endpoints } from 'src/utils/axios-cms';

import { ATTPL_CMS_HOST_API } from 'src/config-global';

export async function createNotifications(userIds, messageInfo, service, Url, status) {
  try {
    const accessToken = localStorage.getItem('accessToken');
    const URL = endpoints.notification.create;
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    };
    const response = await poster(
      URL,
      {
        userId: userIds,
        notificationMessage: messageInfo,
        serviceName: service,
        serviceUrl: Url,
        status: 'unread',
      },
      headers
    );
    console.log(response);
    return response;
  } catch (error) {
    console.error('Error while creating User :', error);
    throw error;
  }
}

export function useGetNotifications(userId) {
  const accessToken = localStorage.getItem('accessToken');
  const URL = `${endpoints.notification.details}/${userId}`;
  const { data, isLoading, error, isValidating } = useSWR(
    [URL, { headers: { Authorization: `Bearer ${accessToken}` } }],
    fetcher
  );

  const memoizedValue = useMemo(
    () => ({
      users: data,
      userLoading: isLoading,
      userError: error,
      userValidating: isValidating,
    }),
    [data, error, isLoading, isValidating]
  );
  return memoizedValue;
}

export function useGetArchiveNotifications(userId) {
  const accessToken = localStorage.getItem('accessToken');
  const URL = `${endpoints.notification.details}/archive/${userId}`;
  const { data, isLoading, error, isValidating } = useSWR(
    [URL, { headers: { Authorization: `Bearer ${accessToken}` } }],
    fetcher
  );

  const memoizedValue = useMemo(
    () => ({
      users: data,
      userLoading: isLoading,
      userError: error,
      userValidating: isValidating,
    }),
    [data, error, isLoading, isValidating]
  );
  return memoizedValue;
}

export async function UpdateNotifications(notificationId, formData) {
  const URL = `${ATTPL_CMS_HOST_API + endpoints.notification.update}/${notificationId}`;
  const accessToken = localStorage.getItem('accessToken');
  try {
    const response = await axios.put(URL, formData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error Updating Model:', error);
    throw error;
  }
}

export async function useGetarchive(userId) {
  const URL = userId ? `${endpoints.notification.archive}/${userId}` : null;
  const accessToken = localStorage.getItem('accessToken');
  const { data, isLoading, error, isValidating } = useSWR(
    [URL, { headers: { Authorization: `Bearer ${accessToken}` } }],
    fetcher
  );
  console.log(data);

  const memoizedValue = useMemo(
    () => ({
      archive: data,
      archiveLoading: isLoading,
      archiveError: error,
      archiveValidating: isValidating,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}
