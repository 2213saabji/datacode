import useSWR from 'swr';
import axios from 'axios';
import { useMemo } from 'react';

import { puter, poster, fetcher, endpoints } from 'src/utils/axios-ums';

import { ATTPL_UMS_HOST_API } from 'src/config-global';

// ----------------------------------------------------------------------
const STORAGE_KEY = 'accessToken';
const accessToken = localStorage.getItem(STORAGE_KEY);
// ----------------------------------------------------------------------

export function useGetUser(authToken) {
  const URL = endpoints.user.details;
  const { data, isLoading, error, isValidating } = useSWR(
    [URL, { headers: { Authorization: `Bearer ${authToken}` } }],
    fetcher
  );
  console.log(data);
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

// Voter Referral
export async function GetVoterReferral(authToken) {
  const URL = `${ATTPL_UMS_HOST_API}${endpoints.user.voterReferral}`;
  // const { data, isLoading, error, isValidating } =  useSWR([URL, { headers: { Authorization: `Bearer ${authToken}` }}], fetcher);
  // const memoizedValue = useMemo(
  //   () => ({
  //     voterReferral: data,
  //     voterReferralLoading: isLoading,
  //     voterReferralError: error,
  //     voterReferralValidating: isValidating,
  //   }),
  //   [data, error, isLoading, isValidating]
  // );
  try {
    const res = await axios.get(URL, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return res;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
  // return memoizedValue;
}

export function useGetUsers(authToken) {
  const URL = endpoints.user.list;
  const { data, isLoading, error, isValidating } = useSWR(
    [URL, { headers: { Authorization: `Bearer ${authToken}` } }],
    fetcher
  );

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
      users: data?.data || [],
      usersLoading: isLoading,
      usersError: error,
      usersValidating: isValidating,
      usersEmpty: data.length === 0,
    };
  }, [data, error, isLoading, isValidating]);
  return memoizedValue;
}

// ----------------------------------------------------------------------
// Post Api Calls For User
// ----------------------------------------------------------------------

export async function createUserProfile(dataToCreate) {
  try {
    const URL = endpoints.user.create;
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    };
    const response = await poster(URL, dataToCreate, headers);
    return response;
  } catch (error) {
    console.error('Error while creating User :', error);
    throw error;
  }
}

export async function uploadUserProfileImage(imageData, userId, authToken) {
  try {
    const URL = endpoints.user.uploadProfileImage; // Assuming endpoints is defined somewhere in your code
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`,
    };

    const imageDataToSend = {
      userId,
      userProfileImageDetails: {
        ...imageData,
      },
    };

    const response = await poster(URL, imageDataToSend, headers); // Assuming poster function is defined somewhere in your code
    return response;
  } catch (error) {
    console.error('Error while uploading user profile image:', error);
    throw error;
  }
}

export async function UpdateUserProfileImage(imageData, userId, authToken) {
  try {
    const URL = `${endpoints.user.updateProfileImage}/${userId}`; // Assuming endpoints is defined somewhere in your code
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`,
    };

    const imageDataToSend = {
      userProfileImageDetails: {
        ...imageData,
      },
    };

    const response = await puter(URL, imageDataToSend, headers); // Assuming poster function is defined somewhere in your code
    return response;
  } catch (error) {
    console.error('Error while uploading user profile image:', error);
    throw error;
  }
}

// User pop-up form api

export async function updateUserDetails(dataToCreate, authToken) {
  try {
    const URL = endpoints.user.updateUserPopup;
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`,
    };
    const response = await poster(URL, dataToCreate, headers);
    return response;
  } catch (error) {
    console.error('Error while creating User :', error);
    throw error;
  }
}

// handle popupform

export async function UpdatePopUpProfileForm(userId, data, popUpProfileForm) {
  const url = `${ATTPL_UMS_HOST_API + endpoints.user.UpdatepopUpForm}/${userId}`;
  try {
    const requestData = { ...data, popUpProfileForm };
    const response = await axios.put(url, requestData, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return response;
  } catch (error) {
    console.error('Error updating User profile:', error);
    throw error;
  }
}

export async function UpdatePopUpSurveyForm(userId, data) {
  const url = `${ATTPL_UMS_HOST_API + endpoints.user.UpdatepopUpForm}/${userId}`;
  try {
    const response = await axios.put(url, data, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    console.log(response);
    return response;
  } catch (error) {
    console.error('Error updating User profile:', error);
    throw error;
  }
}

export async function createUserIdentity(dataToCreate) {
  try {
    const URL = endpoints.user.createIdentity;
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    };
    const response = await poster(URL, dataToCreate, headers);

    return response;
  } catch (error) {
    console.error('Error creating Identity:', error);
    throw error;
  }
}

export async function createUserAddressesses(dataToCreate) {
  try {
    const URL = endpoints.user.createAddress;
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    };
    const response = await poster(URL, dataToCreate, headers);

    return response;
  } catch (error) {
    console.error('Error creating Address:', error);
    throw error;
  }
}

// ----------------------------------------------------------------------
// Api call for Profile Update

export async function UpdateUserProfile(userId, userProfileId, data, jwtToken) {
  const url = `${ATTPL_UMS_HOST_API + endpoints.user.update}/${userId}/${userProfileId}`;
  try {
    const response = await axios.put(url, data, {
      headers: { Authorization: `Bearer ${jwtToken}` },
    });
    const UserIdentity = response?.data.data.UserIdentityDetails[0]?.userIdentityId;
    localStorage.setItem('userIdentityId', UserIdentity);
    return response;
  } catch (error) {
    console.error('Error creating User profile:', error);
    throw error;
  }
}

export async function UpdateUserIdentity(userId, userProfileId, data) {
  const URL = `${ATTPL_UMS_HOST_API + endpoints.user.updateIdentity}/${userId}/${userProfileId}`;

  try {
    const response = await axios.put(URL, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const UserProfileIdentityId = response.data.data.UserIdentityDetails[0].userIdentityId;
    localStorage.setItem('UserProfileIdentityUpdateId', UserProfileIdentityId);
    return response;
  } catch (error) {
    console.error('Error creating user profile:', error);
    throw error;
  }
}

export async function UpdateUserAddressesses(userId, userProfileId, data) {
  const URL = `${ATTPL_UMS_HOST_API + endpoints.user.updateAddress}/${userId}/${userProfileId}`;

  try {
    const response = await axios.put(URL, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response;
  } catch (error) {
    console.error('Error creating user profile:', error);
    throw error;
  }
}

// getUserByUserId-------------------------

export function useGetUserByUserId(id) {
  const URL = `${endpoints.user.get}/${id}`;
  const { data, isLoading, error, isValidating } = useSWR(
    [URL, { headers: { Authorization: `Bearer ${accessToken}` } }],
    fetcher
  );
  const memoizedValue = useMemo(
    () => ({
      user: data,
      userLoading: isLoading,
      userError: error,
      userValidating: isValidating,
    }),
    [data, error, isLoading, isValidating]
  );
  return memoizedValue;
}

// get User by name

export async function getUserNameSearch(value, currUserPage, limitForUser) {
  try {
    if (accessToken) {
      const response = await axios.get(
        `${ATTPL_UMS_HOST_API}${endpoints.user.searchList}name=${value}&page=${currUserPage}&limit=${limitForUser}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      // console.log("res",response);
      const { data } = response.data;
      return data; // Return userName and email
    }
  } catch (error) {
    console.error(error);
    // Handle error if needed
    throw error; // Rethrow the error to be handled outside of this function
  }
  return null;
}

// -----------------------------------------------------------
// Api call for Getting Roles
// -----------------------------------------------------------

export async function UserRoleGetter(ProductId) {
  const URL = `${ATTPL_UMS_HOST_API + endpoints.userRoles.getUserRoles}/${ProductId}`;
  try {
    const response = await axios.get(URL, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response?.data;
  } catch (error) {
    console.error('Error creating voter profile:', error);
    throw error;
  }
}

// -----------------------------------------------------------
// Api call for Getting Pincode
// -----------------------------------------------------------

export async function UserPincodeData(pincode) {
  const URL = `https://api.postalpincode.in/pincode/${pincode}`;
  try {
    const response = await axios.get(URL);
    return response;
  } catch (error) {
    console.error('Error while fetching pincode:', error);
    throw error;
  }
}


// -----------------------------------------------------------
// Api call for Create Social Links
// -----------------------------------------------------------

export async function createUserSocialLink(dataToCreate, userId, authToken) {
  dataToCreate.userId = userId;
  try {
    const URL = endpoints.user.createSocialLink;
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`,
    };
    const response = await poster(URL, dataToCreate, headers);
    return response;
  } catch (error) {
    console.error('Error while creating Social Link :', error);
    throw error;
  }
}

// -----------------------------------------------------------
// Api call for Update Social Links
// -----------------------------------------------------------

export async function UpdateUserSocialMedia(socialMediaLinksId, data, authToken) {
  console.log("authToken", authToken)
  try {
    const URL = `${endpoints.user.socialLinkUpdate}/${socialMediaLinksId}`;
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`,
    };

    const response = await puter(URL, data, headers);
    return response;
  } catch (error) {
    console.error('Error while uploading user social profile:', error);
    throw error;
  }
}


// -----------------------------------------------------------
// Api call for get Social Links
// -----------------------------------------------------------

export function useGetSocialMedia(authToken) {
  const URL = endpoints.user.getSocialLink;
  const { data, isLoading, error, isValidating } = useSWR(
    [URL, { headers: { Authorization: `Bearer ${authToken}` } }],
    fetcher
  );
  console.log(data);
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


// -----------------------------------------------------------
// Api call for get Social Links by Id
// -----------------------------------------------------------


export function useGetSocialDetail(socialMediaLinksId, authToken) {
  const URL = socialMediaLinksId ? `${endpoints.user.getSocialLinkDetails}/${socialMediaLinksId}` : null;

  const { data, isLoading, error, isValidating } = useSWR(
    [URL, { headers: { Authorization: `Bearer ${authToken}` } }],
    fetcher
  );
  const memoizedValue = useMemo(
    () => ({
      socialMedia: data,
      socialMediaLoading: isLoading,
      socialMediaError: error,
      socialMediaValidating: isValidating,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

