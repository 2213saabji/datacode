import useSWR from 'swr';
import { useMemo } from 'react';

import axios from 'src/utils/axios';
import { fetcher, endpoints } from 'src/utils/axios-exp_ms';

import { ATTPL_EXPMS_HOST_API } from 'src/config-global';

// ----------------------------------------------------------------------
// Get API Call For All Invoices
// ----------------------------------------------------------------------

export function useGetInvoices() {
  const URL = endpoints.exp_invoice.list;
  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);
  console.log(data);

  const memoizedValue = useMemo(() => {
    if (!data) {
      return {
        invoices: [],
        invoicesLoading: isLoading,
        invoicesError: error,
        invoicesValidating: isValidating,
        invoicesEmpty: true,
      };
    }

    return {
      invoices: data || [],
      invoicesLoading: isLoading,
      invoicesError: error,
      invoicesValidating: isValidating,
      invoicesEmpty: data.length === 0,
    };
  }, [data, error, isLoading, isValidating]);

  return memoizedValue;
}

// ----------------------------------------------------------------------
// Get API Call For a Invoice
// ----------------------------------------------------------------------

export function useGetInvoice(invoiceId) {
  const URL = invoiceId ? `${endpoints.exp_invoice.details}/${invoiceId}` : null;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);
  const memoizedValue = useMemo(
    () => ({
      invoice: data,
      invoiceLoading: isLoading,
      invoiceError: error,
      invoiceValidating: isValidating,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------
// Post API Call For Invoice
// ----------------------------------------------------------------------

export async function createInvoice(formData) {
  const URL = ATTPL_EXPMS_HOST_API + endpoints.exp_invoice.create;

  //   formData.receiptImageUrl = 'www.example.jpg';

  try {
    const response = await axios.post(URL, formData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating invoice:', error);
    throw error;
  }
}

// ----------------------------------------------------------------------
// Update API Call For Invoice
// ----------------------------------------------------------------------

export async function UpdateInvoice(invoiceId, formData) {
  const URL = `${ATTPL_EXPMS_HOST_API + endpoints.exp_invoice.update}/${invoiceId}`;

  try {
    const response = await axios.put(URL, formData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error Updating Invoice:', error);
    throw error;
  }
}
