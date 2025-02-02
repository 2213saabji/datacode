import useSWR from 'swr';
import axios from 'axios';
import { useMemo } from 'react';
 
import { fetcher, endpoints } from 'src/utils/axios-details';
 
import { ATTPL_EMS_HOST_API } from 'src/config-global';
// ----------------------------------------------------------------------
 
// Admin
 
const STORAGE_KEY = 'accessToken';
const accessToken = localStorage.getItem(STORAGE_KEY);
 
export function useGetAllLocalNews(token) {
    const URL = endpoints.localNews.list;
    const { data, isLoading, error, isValidating } = useSWR(
        [URL, { headers: { Authorization: `Bearer ${token}` } }],
        fetcher
    );
 
    const memoizedValue = useMemo(
        () => ({
            allLocalNews: data || [],
            allLocalNewsLoading: isLoading,
            allLocalNewsError: error,
            allLocalNewsValidating: isValidating,
            allLocalNewsEmpty: !isLoading && !data?.length,
        }),
        [data, error, isLoading, isValidating]
    );
 
    return memoizedValue;
}
 
// for getting all the voters for vote prediction
 
export function useGetLocalNews(Id, token) {
    const URL = Id ? `${endpoints.localNews.detail}/${Id}` : null;
 
    const { data, isLoading, error, isValidating } = useSWR(
        [URL, { headers: { Authorization: `Bearer ${token}` } }],
        fetcher
    );
    const memoizedValue = useMemo(
        () => ({
            localNews: data,
            localNewsLoading: isLoading,
            localNewsError: error,
            localNewsValidating: isValidating,
        }),
        [data, error, isLoading, isValidating]
    );
 
    return memoizedValue;
}