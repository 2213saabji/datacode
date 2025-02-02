import useSWR from 'swr';
import { useMemo } from 'react';

import axios from 'src/utils/axios';
import { fetcher, endpoints } from 'src/utils/axios-institution-agriculture';

import { ATTPL_CMS_HOST_API } from 'src/config-global';

const STORAGE_KEY = 'accessToken';
const accessToken = localStorage.getItem(STORAGE_KEY);

// ----------------------------------------------------------------------
// Get API Call For All Modern Agri Tool
// ----------------------------------------------------------------------

export function useGetModernAgriTools() {
  const URL = endpoints.modernAgri.list;
  const { data, isLoading, error, isValidating } = useSWR(
    [URL, { headers: { Authorization: `Bearer ${accessToken}` } }],
    fetcher
  );

  const memoizedValue = useMemo(
    () => ({
      tools: data || [],
      toolsLoading: isLoading,
      toolsError: error,
      toolsValidating: isValidating,
      toolsEmpty: !isLoading && !data?.length,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------
// Get API Call For a Modern Agri Tool
// ----------------------------------------------------------------------

export function useGetTool(modernAgriToolId) {
  const URL = modernAgriToolId ? `${endpoints.modernAgri.details}/${modernAgriToolId}` : null;

  const { data, isLoading, error, isValidating } = useSWR(
    [URL, { headers: { Authorization: `Bearer ${accessToken}` } }],
    fetcher
  );
  const memoizedValue = useMemo(
    () => ({
      tool: data,
      toolLoading: isLoading,
      toolError: error,
      toolValidating: isValidating,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------
// Post API to Create Modern Agri tool
// ----------------------------------------------------------------------

export async function createTool(formData) {
  const URL = ATTPL_CMS_HOST_API + endpoints.modernAgri.create;

  try {
    const response = await axios.post(URL, formData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating modern agri tool:', error);
    throw error;
  }
}

// ----------------------------------------------------------------------
// Update API Call For Modern Agri Tool
// ----------------------------------------------------------------------

export async function UpdateTool(modernAgriToolId, formData) {
  const URL = `${ATTPL_CMS_HOST_API + endpoints.modernAgri.update}/${modernAgriToolId}`;

  try {
    const response = await axios.put(URL, formData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error Updating Modern Agri Tool:', error);
    throw error;
  }
}
