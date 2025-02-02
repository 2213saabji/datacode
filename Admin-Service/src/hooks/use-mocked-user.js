import axios, { endpoints } from 'src/utils/axios-auth';

// import { _mock } from 'src/_mock';

import { isValidToken, setLocalStorage } from './utils';
// TO GET THE USER FROM THE AUTHCONTEXT, YOU CAN USE

// CHANGE:
// import { useMockedUser } from 'src/hooks/use-mocked-user';
// const { user } = useMockedUser();

// TO:
// import { useAuthContext } from 'src/auth/hooks';
// const { user } = useAuthContext();

// ----------------------------------------------------------------------

// Admin

const STORAGE_KEY = 'accessToken';

export const UseMockedUser = async () => {
  try {
    const accessToken = localStorage.getItem(STORAGE_KEY);

    if (accessToken && isValidToken(accessToken)) {
      // Assuming setLocalStorage is defined elsewhere
      setLocalStorage(accessToken);

      const response = await axios.get(endpoints.auth.me, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      // const { userName, email } = response.data.data;
      const { userId } = response.data.data;
      const { userName } = response.data.data;
      const { email } = response.data.data;
      const { phone } = response.data.data;
      const { isMobileVerified } = response.data;
      const { isEmailVerified } = response.data;
      const { userRoleId } = response.data.data;
      const { UserProfile } = response.data.data;

      // console.log(">>",userName,"name",email);
      // console.log(">>", response)
      return {
        userName,
        email,
        phone,
        isMobileVerified,
        isEmailVerified,
        userId,
        userRoleId,
        UserProfile,
      }; // Return userName and email
    }
  } catch (error) {
    console.error(error);
    // Handle error if needed
    throw error; // Rethrow the error to be handled outside of this function
  }
  return null;
};
