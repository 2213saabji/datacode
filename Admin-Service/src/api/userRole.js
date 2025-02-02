import useSWR from 'swr';
import { useMemo } from 'react';

import { puter, poster, fetcher, endpoints } from 'src/utils/axios-ums';

export function useGetRole(userRoleId, authToken) {
  const URL = `${endpoints.userRoles.details}/${userRoleId}`;

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${authToken}`,
  };

  const config = {
    headers,
  };

  const { data, isLoading, error, isValidating } = useSWR([URL, config], fetcher);

  const memoizedValue = useMemo(
    () => ({
      user: data?.data,
      userLoading: isLoading,
      userError: error,
      userValidating: isValidating,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

export function useGetSingleUser(userId, authToken) {
  const URL = `${endpoints.userRoles.updateUserProfile}/${userId}`;

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${authToken}`,
  };

  const config = {
    headers,
  };

  const { data, isLoading, error, isValidating } = useSWR([URL, config], fetcher);

  const memoizedValue = useMemo(
    () => ({
      user: data?.data,
      userLoading: isLoading,
      userError: error,
      userValidating: isValidating,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

export function useGetRolesList(authToken) {
  const URL = endpoints.userRoles.list;

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${authToken}`,
  };

  const { data, isLoading, error, isValidating } = useSWR([URL, { headers }], fetcher);

  const memoizedValue = useMemo(() => {
    if (!data) {
      return {
        users: [],
        usersLoading: isLoading,
        usersError: error,
        usersValidating: isValidating,
        usersEmpty: true,
      };
    }

    return {
      users: data || [],
      usersLoading: isLoading,
      usersError: error,
      usersValidating: isValidating,
      usersEmpty: data.length === 0,
    };
  }, [data, error, isLoading, isValidating]);

  return memoizedValue;
}

export async function createUserRole(dataToCreate, authToken) {
  try {
    const URL = endpoints.userRoles.create;
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`,
    };
    const response = await poster(URL, dataToCreate, headers);
    return response;
  } catch (error) {
    console.error('Error while creating User Role Type:', error);
    throw error;
  }
}

export async function updateUserRole(dataToUpdate, authToken, roleId) {
  try {
    const URL = `${endpoints.userRoles.update}/${roleId}`;
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`,
    };
    const response = await puter(URL, dataToUpdate, headers);
    return response;
  } catch (error) {
    console.error('Error while updating User Role Type:', error);
    throw error;
  }
}
