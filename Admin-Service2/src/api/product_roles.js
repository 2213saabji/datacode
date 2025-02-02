import useSWR from 'swr';
import { useMemo } from 'react';

import { puter, poster, fetcher, endpoints } from 'src/utils/axios-ums';

export function useGetProductRole(ProductId, accessToken) {
  const URL = `${endpoints.productRoles.details}/${ProductId}`;

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${accessToken}`,
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

export function useGetSingleProductUser(ProductId, authToken) {
  const URL = `${endpoints.userRoles.updateUserProfile}/${ProductId}`;

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

export function useGetProductRolesList(authToken) {
  const URL = endpoints.productRoles.list;

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

export async function createUserProductRole(dataToCreate, authToken) {
  try {
    const URL = endpoints.productRoles.create;
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

export async function updateUserProductRole(dataToUpdate, accessToken, ProductId) {
  try {
    const URL = `${endpoints.productRoles.update}/${ProductId}`;
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    };
    const response = await puter(URL, dataToUpdate, headers);
    return response;
  } catch (error) {
    console.error('Error while updating User Role Type:', error);
    throw error;
  }
}

// --------------------------------------------------------
//  product mapping api's
// --------------------------------------------------------

export function useGetProductMappingRolesList(authToken) {
  const URL = endpoints.productMappingroles.list;

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

export async function updateUserProductRoleMapping(dataToUpdate, accessToken) {
  try {
    const URL = `${endpoints.productMappingroles.update}`;
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    };
    const response = await puter(URL, dataToUpdate, headers);
    return response;
  } catch (error) {
    console.error('Error while updating User Role Type:', error);
    throw error;
  }
}
