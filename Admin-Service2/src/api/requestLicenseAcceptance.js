import useSWR from 'swr';
import { useMemo, useEffect} from 'react';

import { puter, poster, fetcher, endpoints } from 'src/utils/axios-ums';

// -----------------------------------------------------------
// Api call for Send Verification Token Request
// -----------------------------------------------------------

export function SendVerificationTokenRequest(dataToSend, authToken) {
  const URL = `${endpoints.requestLicenseAcceptance.SendVerification}`;
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${authToken}`,
  };

  const response = poster(URL, dataToSend, headers);
  return response;
}

// -----------------------------------------------------------
// Api call for Accept Request
// -----------------------------------------------------------

export async function SendAcceptRequest(dataToSend, authToken, user) {
  const URL = `${endpoints.requestLicenseAcceptance.UpdateAccountAccept}/${user}`;
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${authToken}`,
  };
  const response = puter(URL, dataToSend, headers);
  return response;
}

// -----------------------------------------------------------
// Api call for update user role after verification
// -----------------------------------------------------------

export async function updateUserRoleAfterVerification(Id, dataToSend, authToken) {
  const URL = `${endpoints.user.updateUserDetails}/${Id}`;
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${authToken}`,
  };
  const response = puter(URL, dataToSend, headers);
  return response;
}

// ----------------------Request profile update-------------------------

// -----------------------------------------------------------
// Api call for Doctor Profile Request
// -----------------------------------------------------------

export async function RequestDoctorForm(dataToCreate, authToken) {
  try {
    const URL = endpoints.user.uploadDoctorForm;
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`,
    };
    const response = await poster(URL, dataToCreate, headers);
    console.log('rr', response);
    return response;
  } catch (error) {
    console.error('Error creating Address:', error);
    throw error;
  }
}

// -----------------------------------------------------------
// Api call for Employee Profile Request
// -----------------------------------------------------------

export async function RequestEmployerForm(dataToCreate, authToken) {
  try {
    const URL = endpoints.user.uploadEmployerForm;
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`,
    };
    const response = await poster(URL, dataToCreate, headers);
    return response;
  } catch (error) {
    console.error('Error creating Address:', error);
    throw error;
  }
}
// -----------------------------------------------------------
// Api call for Businessman Profile Request
// -----------------------------------------------------------

export async function RequestBusinessmanForm(dataToCreate, authToken) {
  try {
    const URL = endpoints.user.uploadBusinessmanForm;
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`,
    };
    const response = await poster(URL, dataToCreate, headers);
    return response;
  } catch (error) {
    console.error('Error creating Address:', error);
    throw error;
  }
}

// -----------------------------------------------------------
// Api call for InstituteOwner Profile Request
// -----------------------------------------------------------

export async function RequestInstituteOwnerForm(dataToCreate, authToken) {
  try {
    const URL = endpoints.user.uploadInstituteOwnerForm;
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`,
    };
    const response = await poster(URL, dataToCreate, headers);
    return response;
  } catch (error) {
    console.error('Error creating Address:', error);
    throw error;
  }
}

// -----------------------------------------------------------
// Api call for SellerOwner Profile Request
// -----------------------------------------------------------

export async function RequestSellerOwnerForm(dataToCreate, authToken) {
  try {
    const URL = endpoints.user.uploadSellerOwnerForm;
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`,
    };
    const response = await poster(URL, dataToCreate, headers);
    return response;
  } catch (error) {
    console.error('Error creating Address:', error);
    throw error;
  }
}

// -----------------------------------------------------------
// Api call for Driver Profile Request
// -----------------------------------------------------------

export async function RequestDriverForm(dataToCreate, authToken) {
  try {
    const URL = endpoints.user.uploadDriverForm;
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`,
    };
    const response = await poster(URL, dataToCreate, headers);
    return response;
  } catch (error) {
    console.error('Error creating Address:', error);
    throw error;
  }
}

// -----------------------------------------------------------
// Api call for Service Provider Request
// -----------------------------------------------------------

export async function RequestServiceProviderForm(dataToCreate, authToken) {
  try {
    const URL = endpoints.user.uploadProviderForm;
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`,
    };
    const response = await poster(URL, dataToCreate, headers);
    return response;
  } catch (error) {
    console.error('Error creating Form:', error);
    throw error;
  }
}

// -----------------------------------------------------------
// Api call for Charted Accountant Request
// -----------------------------------------------------------

export async function RequestCAForm(dataToCreate, authToken) {
  try {
    const URL = endpoints.user.uploadCaForm;
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`,
    };
    const response = await poster(URL, dataToCreate, headers);
    return response;
  } catch (error) {
    console.error('Error creating Form:', error);
    throw error;
  }
}



// -----------------------------------------------------------
// Api call for Lawyer Upgrade Request
// -----------------------------------------------------------

export async function RequestLawyerRegForm(dataToCreate, authToken) {
  try {
    const URL = endpoints.user.uploadLawyerRegForm;
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`,
    };
    const response = await poster(URL, dataToCreate, headers);
    return response;
  } catch (error) {
    console.error('Error creating Form:', error);
    throw error;
  }
}


// -----------------------------------------------------------
// Api call for Vendor Upgrade Request
// -----------------------------------------------------------

export async function RequestVendorRegForm(dataToCreate, authToken) {
  try {
    const URL = endpoints.user.uploadVendorRegForm;
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`,
    };
    const response = await poster(URL, dataToCreate, headers);
    return response;
  } catch (error) {
    console.error('Error creating Form:', error);
    throw error;
  }
}


// -----------------------------------------------------------
// Api call for Doctor Profile Request
// -----------------------------------------------------------

export function useGetDoctorRequestList(authToken) {
  const URL = `${endpoints.requestLicenseAcceptance.Doctorlist}`;

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${authToken}`,
  };

  // Using useSWR to fetch data
  const { data, isLoading, error, isValidating } = useSWR([URL, { headers }], fetcher);

  // Log the data only when it changes
  useEffect(() => {
    if (data || error) {
      console.log("Doctor")
    }
  }, [data, error]);

  // Memoize the value to prevent unnecessary recalculations on every render
  const memoizedValue = useMemo(() => {
    const hasData = Boolean(data);

    return {
      users: hasData ? data : [],
      usersLoading: isLoading,
      usersError: error,
      usersValidating: isValidating,
      usersEmpty: !hasData || data.length === 0,
    };
  }, [data, isLoading, error, isValidating]);

  return memoizedValue;
}

// -----------------------------------------------------------
// Api call for Single Doctor Profile Request
// -----------------------------------------------------------

export function useGetSingleDoctorRequestList(id, authToken) {
  const URL = `${endpoints.requestLicenseAcceptance.Doctordetails}/${id}`;

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

// -----------------------------------------------------------
// Api call for Employer Profile Request
// -----------------------------------------------------------

export function useGetEmployerRequestList(authToken) {
  const URL = `${endpoints.requestLicenseAcceptance.Employerlist}`;

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${authToken}`,
  };

  // Using useSWR to fetch data
  const { data, isLoading, error, isValidating } = useSWR([URL, { headers }], fetcher);

  // Log the data only when it changes
  useEffect(() => {
    if (data || error) {
      console.log("Employer");
    }
  }, [data, error]);

  // Memoize the value to prevent unnecessary recalculations on every render
  const memoizedValue = useMemo(() => {
    const hasData = Boolean(data);

    return {
      users: hasData ? data : [],
      usersLoading: isLoading,
      usersError: error,
      usersValidating: isValidating,
      usersEmpty: !hasData || data.length === 0,
    };
  }, [data, isLoading, error, isValidating]);

  return memoizedValue;
}

// -----------------------------------------------------------
// Api call for InstituteOwner Profile Request
// -----------------------------------------------------------

export function useGetInstituteOwnerRequestList(authToken) {
  const URL = `${endpoints.requestLicenseAcceptance.InstituteOwnerlist}`;

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${authToken}`,
  };

  // Using useSWR to fetch data
  const { data, isLoading, error, isValidating } = useSWR([URL, { headers }], fetcher);

  // Log the data only when it changes
  useEffect(() => {
    if (data || error) {
      console.log("InstituteOwner");
    }
  }, [data, error]);

  // Memoize the value to prevent unnecessary recalculations on every render
  const memoizedValue = useMemo(() => {
    const hasData = Boolean(data);

    return {
      users: hasData ? data : [],
      usersLoading: isLoading,
      usersError: error,
      usersValidating: isValidating,
      usersEmpty: !hasData || data.length === 0,
    };
  }, [data, isLoading, error, isValidating]);

  return memoizedValue;
}
// -----------------------------------------------------------
// Api call for SellerOwner Profile Request
// -----------------------------------------------------------

export function useGetSellerOwnerRequestList(authToken) {
  const URL = `${endpoints.requestLicenseAcceptance.SellerOwnerlist}`;

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${authToken}`,
  };

  // Using useSWR to fetch data
  const { data, isLoading, error, isValidating } = useSWR([URL, { headers }], fetcher);

  // Log the data only when it changes
  useEffect(() => {
    if (data || error) {
      console.log("SellerOwner");
    }
  }, [data, error]);

  // Memoize the value to prevent unnecessary recalculations on every render
  const memoizedValue = useMemo(() => {
    const hasData = Boolean(data);

    return {
      users: hasData ? data : [],
      usersLoading: isLoading,
      usersError: error,
      usersValidating: isValidating,
      usersEmpty: !hasData || data.length === 0,
    };
  }, [data, isLoading, error, isValidating]);

  return memoizedValue;
}

// -----------------------------------------------------------
// Api call for Businessman Profile Request
// -----------------------------------------------------------

export function useGetBusinessmanRequestList(authToken) {
  const URL = `${endpoints.requestLicenseAcceptance.Businessmanlist}`;

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${authToken}`,
  };

  // Using useSWR to fetch data
  const { data, isLoading, error, isValidating } = useSWR([URL, { headers }], fetcher);

  // Log the data only when it changes
  useEffect(() => {
    if (data || error) {
      console.log("Businessman");
    }
  }, [data, error]);

  // Memoize the value to prevent unnecessary recalculations on every render
  const memoizedValue = useMemo(() => {
    const hasData = Boolean(data);

    return {
      users: hasData ? data : [],
      usersLoading: isLoading,
      usersError: error,
      usersValidating: isValidating,
      usersEmpty: !hasData || data.length === 0,
    };
  }, [data, isLoading, error, isValidating]);

  return memoizedValue;
}

// -----------------------------------------------------------
// Api call for Driver Profile Request
// -----------------------------------------------------------

export function useGetDriverRequestList(authToken) {
  const URL = `${endpoints.requestLicenseAcceptance.Driverlist}`;

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${authToken}`,
  };

  // Using useSWR to fetch data
  const { data, isLoading, error, isValidating } = useSWR([URL, { headers }], fetcher);

  // Log only when data or error state changes
  useEffect(() => {
    if (data || error) {
      console.log("Driver");
    }
  }, [data, error]);

  // Memoize the values to avoid recalculating unnecessarily on every render
  const memoizedValue = useMemo(() => {
    const hasData = Boolean(data); // Simplifying the data check

    return {
      users: hasData ? data : [],
      usersLoading: isLoading,
      usersError: error,
      usersValidating: isValidating,
      usersEmpty: !hasData || data.length === 0,
    };
  }, [data, isLoading, error, isValidating]);

  return memoizedValue;
}

// -----------------------------------------------------------
// Api call for Lawyer Request List
// -----------------------------------------------------------

export function useGetLawyerRequestList(authToken) {
  const URL = `${endpoints.requestLicenseAcceptance.Laywerlist}`;
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${authToken}`,
  };

  const { data, isLoading, error, isValidating } = useSWR([URL, { headers }], fetcher);

  // Log only when data is fetched or error occurs
  useEffect(() => {
    if (data || error) {
      console.log("Lawyer");
    }
  }, [data, error]);

  const memoizedValue = useMemo(() => {
    const hasData = Boolean(data);
    return {
      users: hasData ? data : [],
      usersLoading: isLoading,
      usersError: error,
      usersValidating: isValidating,
      usersEmpty: !hasData || data.length === 0,
    };
  }, [data, isLoading, error, isValidating]);

  return memoizedValue;
}

// -----------------------------------------------------------
// Api call for Single Employer Profile Request
// -----------------------------------------------------------

export function useGetSingleEmployerRequestList(id, authToken) {
  const URL = `${endpoints.requestLicenseAcceptance.Employerdetails}/${id}`;

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

// -----------------------------------------------------------
// Api call for Single Businessman Profile Request
// -----------------------------------------------------------

export function useGetSingleBusinessmanRequestList(id, authToken) {
  const URL = `${endpoints.requestLicenseAcceptance.Businessmandetails}/${id}`;

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
// -----------------------------------------------------------
// Api call for Single SellerOwner Profile Request
// -----------------------------------------------------------

export function useGetSingleSellerOwnerRequestList(id, authToken) {
  const URL = `${endpoints.requestLicenseAcceptance.SellerOwnerdetails}/${id}`;

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
// -----------------------------------------------------------
// Api call for Single InstituteOwner Profile Request
// -----------------------------------------------------------

export function useGetSingleInstituteOwnerRequestList(id, authToken) {
  const URL = `${endpoints.requestLicenseAcceptance.InstituteOwnerdetails}/${id}`;

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

// -----------------------------------------------------------
// Api call for Single Driver Profile Request
// -----------------------------------------------------------

export function useGetSingleDriverRequestList(id, authToken) {
  const URL = `${endpoints.requestLicenseAcceptance.Driverdetails}/${id}`;

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




// -----------------------------------------------------------
// Api call for Single Service Provider Details
// -----------------------------------------------------------

export function useGetSingleServiceProviderDetails(id, authToken) {
  const URL = `${endpoints.requestLicenseAcceptance.ServiceProviderdetails}/${id}`;

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

// -----------------------------------------------------------
// Api call for serviceHistory Profile Request
// -----------------------------------------------------------

export function useGetServiceHistoryRequestList(id, authToken) {
  const URL = `${endpoints.requestLicenseAcceptance.ServiceHistorylist}/${id}`;

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
