import PropTypes from 'prop-types';
import { useMemo, useEffect, useReducer, useCallback } from 'react';

import { deleter } from 'src/utils/axios-ums';
// import { poster } from 'src/utils/axios-ums';
import axios, { poster, endpoints } from 'src/utils/axios-auth';

import { callPoster } from 'src/api/auth';
import { registerPoster } from 'src/api/accountRegister';
import { UpdateCandidateProfile } from 'src/api/candidate';

import { AuthContext } from './auth-context';
import { isValidToken, setLocalStorage } from './utils';

const initialState = {
  user: null,
  open: false,
  openModal: false,
  loading: true,
  toggling: true,
};

// const { } = use

const reducer = (state, action) => {
  if (action.type === 'INITIAL') {
    return {
      ...state,
      loading: false,
      user: action.payload.user,
      toggling: true,
    };
  }
  if (action.type === 'LOGIN') {
    return {
      ...state,
      user: action.payload.user,
    };
  }
  if (action.type === 'REGISTER') {
    return {
      ...state,
      user: action.payload.user,
    };
  }
  if (action.type === 'LOGOUT') {
    return {
      ...state,
      user: null,
    };
  }
  if (action.type === 'TOGGLING') {
    return {
      ...state,
      toggling: action.payload.toggling,
    };
  }
  if (action.type === 'PAYMENTOPEN') {
    return {
      ...state,
      open: action.payload.open,
    };
  }
  if (action.type === 'PAYMENTMODALOPEN') {
    return {
      ...state,
      openModal: action.payload.openModal,
    };
  }

  return state;
};

// ----------------------------------------------------------------------

const STORAGE_KEY = 'accessToken';

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  // refferal points fetcher
  const refferal = useCallback(async (token) => {
    const response = await axios.get(endpoints.auth.refferal, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response?.data?.data;
  }, []);

  const userdata = useCallback(
    async (token) => {
      const res = await axios.get(endpoints.auth.me, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const refferaldata = await refferal(token);
      const { data } = res.data;

      return { ...data, refferaldata };
    },
    [refferal]
  );

  const initialize = useCallback(async () => {
    try {
      const accessToken = localStorage.getItem(STORAGE_KEY);

      if (accessToken && isValidToken(accessToken)) {
        setLocalStorage(accessToken);

        const user = await userdata(accessToken);

        dispatch({
          type: 'INITIAL',
          payload: {
            user: {
              ...user,
              accessToken,
            },
          },
        });
      } else {
        dispatch({
          type: 'INITIAL',
          payload: {
            user: null,
          },
        });
      }
    } catch (error) {
      dispatch({
        type: 'INITIAL',
        payload: {
          user: null,
        },
      });
    }
  }, [userdata]);

  useEffect(() => {
    // Profile Fetch
    initialize();
  }, [initialize]);

  const openPaymentModal = useCallback(async () => {
    dispatch({
      type: 'PAYMENTMODALOPEN',
      payload: {
        openModal: true,
      },
    });
  }, []);

  const closePaymentModal = useCallback(async () => {
    dispatch({
      type: 'PAYMENTMODALOPEN',
      payload: {
        openModal: false,
      },
    });
  }, []);


  // Refetch User Details 

  const refetch = useCallback(
    async(accessToken, ) => {
      const data = await userdata(accessToken);
      dispatch({
        type: 'LOGIN',
        payload: {
          user: {
            ...data,
            accessToken,
          },
        },
      });
    }
  ,[userdata])

  // LOGIN
  const login = useCallback(
    async (phone, password) => {
      const dataToSend = {
        phone,
        password,
      };

      const response = await axios.post(endpoints.auth.login, dataToSend);

      // if (ATTPL_UMS_HOST_API.slice(0, 14) !== 'https://umsapi') {
      const { token: accessToken } = response.data.data;
      const data = await userdata(accessToken);
      setLocalStorage(accessToken);
      dispatch({
        type: 'LOGIN',
        payload: {
          user: {
            ...data,
            accessToken,
          },
        },
      });
      // }

      // return response.data.data;
    },
    [userdata]
  );

  // // REGISTER
  // Do Not Delete this code it is for Future use (Thomas)
  // const otpGenerate = useCallback(async (receiverEmail, mobileNumber, fullName) => {
  //   try {
  //     const emailDataToSend = {
  //       receiverEmail,
  //       fullName,
  //     };
  //     const mobileDataToSend = {
  //       mobileNumber,
  //       fullName,
  //     };

  //     const [responseEmail, responseMobile] = await Promise.all([
  //       callPoster('sentEmail', emailDataToSend),
  //       callPoster('sentOTP', mobileDataToSend),
  //     ]);

  //     if (responseEmail.success === responseMobile.success) {
  //       const otpRefEmail = responseEmail.data.refId;
  //       const otpRefMobile = responseMobile.data.refId;
  //       const otpCodeIdEmail = responseEmail.data.otpCodeId;
  //       const otpCodeIdMobile = responseMobile.data.otpCodeId;
  //       const otpExpiry = responseMobile.data.expiry;
  //       return {
  //         response: 'ok',
  //         otpRefs: { email: otpRefEmail, mobile: otpRefMobile },
  //         otpCodeId: { email: otpCodeIdEmail, mobile: otpCodeIdMobile },
  //         otpExpiry,
  //       };
  //     }
  //   } catch (error) {
  //     console.error('Error in otpGenerate:', error);
  //     throw error;
  //   }
  //   return undefined;
  // }, []);

  const otpGenerate = useCallback(async (mobileNumber) => {
    try {
      const mobileDataToSend = {
        mobileNumber,
      };

      const responseMobile = await callPoster('sentOTP', mobileDataToSend);

      if (responseMobile.success) {
        const otpRefMobile = responseMobile.data.refId;
        const otpCodeIdMobile = responseMobile.data.otpCodeId;
        const otpExpiry = responseMobile.data.expiry;
        return {
          response: 'ok',
          otpRefs: { mobile: otpRefMobile },
          otpCodeId: { mobile: otpCodeIdMobile },
          otpExpiry,
        };
      }
    } catch (error) {
      console.error('Error in otpGenerate:', error);
      throw error;
    }
    return undefined;
  }, []);

  // Forgot Password Api For Forgot Password

  const otpGenerateForgotPassword = useCallback(async (receiverPhone) => {
    try {
      const phoneDataToSend = {
        mobileNumber: receiverPhone.phone,
      };
      const responseMobile = await callPoster('sentOTP', phoneDataToSend);

      if (responseMobile) {
        const otpRefMobile = responseMobile.data.refId;
        const otpCodeIdMobile = responseMobile.data.otpCodeId;
        const otpExpiry = responseMobile.data.expiry;
        return {
          response: 'ok',
          otpRefs: { mobile: otpRefMobile },
          otpCodeId: { mobile: otpCodeIdMobile },
          otpExpiry,
        };
      }
    } catch (error) {
      console.error('Error in otpGenerate:', error);
      throw error;
    }
    return undefined;
  }, []);

  // Do not delete this code required for future use (Thomas)
  // const otpverify = useCallback(async (mobileOtp, emailOtp, otpCodeId) => {
  //   console.log('OtpCode Id ', otpCodeId);
  //   try {
  //     const emailOtpAndSmsIdToSend = {
  //       otpCode: emailOtp,
  //       otpCodeId: otpCodeId.email,
  //     };
  //     const mobileOtpAndSmsIdToSend = {
  //       otpCode: mobileOtp,
  //       otpCodeId: otpCodeId.mobile,
  //     };

  //     const [responseEmail, responseMobile] = await Promise.all([
  //       callPoster('verifyEmail', emailOtpAndSmsIdToSend),
  //       callPoster('verifyOTP', mobileOtpAndSmsIdToSend),
  //     ]);

  //     if (responseEmail.success === responseMobile.success) {
  //       return {
  //         response: 'ok',
  //       };
  //     }
  //   } catch (error) {
  //     console.error('Error in otpVerify:', error);
  //     throw error;
  //   }
  //   return undefined;
  // }, []);

  // This OTP Verify is Temp Code
  const otpverify = useCallback(
    async (mobileOtp, otpCodeId) => {
      try {
        const mobileOtpAndSmsIdToSend = {
          otpCode: mobileOtp,
          otpCodeId: otpCodeId.mobile,
        };

        const responseMobile = await callPoster('verifyOTP', mobileOtpAndSmsIdToSend);
        initialize();
        if (responseMobile.success) {
          return {
            response: 'ok',
          };
        }
      } catch (error) {
        console.error('Error in otpVerify:', error);
        throw error;
      }
      return undefined;
    },
    [initialize]
  );

  const otpGenerateMobileVerify = useCallback(async (mobileNumber) => {
    try {
      const mobileDataToSend = {
        mobileNumber,
      };

      // ___________________________________________________________________________________MOCK
      const responseMobile = await callPoster('sentOTP', mobileDataToSend);
      // const responseMobile = mockMobile

      if (responseMobile.success) {
        const otpRefMobile = responseMobile.data.refId;
        const otpCodeIdMobile = responseMobile.data.otpCodeId;
        const otpExpiry = responseMobile.data.expiry;

        return {
          response: 'ok',
          otpRefs: { mobile: otpRefMobile },
          otpCodeId: { mobile: otpCodeIdMobile },
          otpExpiry,
        };
      }
    } catch (error) {
      console.error('Error in otpGenerate:', error);
      throw error;
    }
    return undefined;
  }, []);

  const otpGenerateForEmail = useCallback(async (receiverEmail) => {
    try {
      const emailDataToSend = {
        receiverEmail,
      };
      const responseEmail = await callPoster('sentEmail', emailDataToSend);

      if (responseEmail.success) {
        const otpRef = responseEmail.data.refId;
        // eslint-disable-next-line prefer-destructuring
        const otpCodeId = responseEmail.data.otpCodeId;
        const otpExpiry = responseEmail.data.expiresIn; // made change by gurpreet
        return {
          response: 'ok',
          otpRefs: { email: otpRef },
          otpCodeId: { email: otpCodeId },
          otpExpiry,
        };
      }
    } catch (error) {
      console.error('Error in otpGenerate:', error);
      throw error;
    }
    return undefined;
  }, []);

  const otpForUserVerify = useCallback(
    async (mobileOtp, otpCodeId, userData) => {
      try {
        const mobileOtpAndSmsIdToSend = {
          otpCode: mobileOtp,
          otpCodeId: otpCodeId.mobile,
        };
        // ___________________________________________________________________________________MOCK
        const responseMobile = await callPoster('verifyOTP', mobileOtpAndSmsIdToSend);
        // const responseMobile = mockVerify

        if (responseMobile.success) {
          const { token: accessToken } = userData;
          const { userId } = userData.data;
          const { userRoleId } = userData.data;

          const data = await userdata(accessToken);
          localStorage.setItem('UserLoginId', userId);
          sessionStorage.setItem('userRoleId', userRoleId);

          setLocalStorage(accessToken);
          dispatch({
            type: 'LOGIN',
            payload: {
              user: {
                ...data,
                accessToken,
                userId,
              },
            },
          });

          return {
            response: 'ok',
          };
          // // ___________________________________________________________________________________MOCK
          // const responseMobile = await callPoster('verifyOTP', mobileOtpAndSmsIdToSend);
          // // const responseMobile = mockVerify

          // // console.log(responseMobile)
          // if (responseMobile.success) {
          //   const { token: accessToken, data: user } = userData;
          //   const { userId } = userData.data;
          //   const { userRoleId } = userData.data;

          //   // console.log("enter responseMobile.success",userData);
          //   initialize();
          //   localStorage.setItem('UserLoginId', userId);
          //   sessionStorage.setItem('userRoleId', userRoleId);
          //   // setSession(accessToken);
          //   setLocalStorage(accessToken);
          //   dispatch({
          //     type: 'LOGIN',
          //     payload: {
          //       user: {
          //         ...user,
          //         accessToken,
          //         userId,
          //       },
          //     },
          //   });

          //   return {
          //     response: 'ok',
          //   };
          // }
        }
      } catch (error) {
        console.error('Error in otpVerify:', error);
        throw error;
      }
      return undefined;
    },
    [userdata]
  );

  const otpverifyForFOrgotPassword = useCallback(async (phoneOtp, otpCodeId) => {
    try {
      const mobileOtpAndSmsIdToSend = {
        otpCode: phoneOtp,
        otpCodeId: otpCodeId.mobile,
      };

      const responseMobile = await callPoster('verifyOTP', mobileOtpAndSmsIdToSend);

      if (responseMobile.success) {
        return {
          response: 'ok',
        };
      }
    } catch (error) {
      console.error('Error in otpVerify:', error);
      throw error;
    }
    return undefined;
  }, []);

  // ----------------------------------------------------Change New Password -------------------------------------

  const createNewPassword = useCallback(async (formData, accessToken) => {
    const URL = endpoints.auth.newPassword;
    console.log('accessToken', accessToken);
    try {
      const response = await poster(URL, formData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error while creating new password :', error);
      throw error;
    }
  }, []);

  // ---------------------------------------------------------------------------------------------------------------------

  // Register
  const register = useCallback(
    async (firstName, lastName, fatherName, userState,referralSource, phone, password, referralToken) => {
      try {
        const registerDataToSend = {
          userRoleId: 9,
          firstName,
          lastName,
          fatherName,
          userState,
          phone,
          password,
          referralToken,
          referralSource,
          isMobileVerified: true,
          ipAddress: '192.168.1.100',
          macAddress: '00:1A:2B:3C:4D:5E',
          createdBy: null,
        };
        const response = await axios.post(endpoints.auth.register, registerDataToSend);

        const { token: accessToken } = response.data.data;

        const data = await userdata(accessToken);

        setLocalStorage(accessToken);
        localStorage.setItem('register', JSON.stringify(true));
        dispatch({
          type: 'REGISTER',
          payload: {
            user: {
              ...data,
              accessToken,
            },
          },
        });

        if (response) {
          return {
            response: 'ok',
          };
        }
      } catch (error) {
        console.error('Error in registering:', error);
        throw error;
      }

      return undefined;
    },
    [userdata]
  );

  // registerInsideLogin---------------------------------
  const registerInsideLogin = useCallback(async (data, accessToken) => {
    try {
      const headers = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      };
      const response = await axios.post(endpoints.auth.registerInsideLogin, data, headers);
      console.log(response);
      if (response) {
        return {
          response: 'ok',
        };
      }
    } catch (error) {
      console.error('Error in registering:', error);
      throw error;
    }

    return undefined;
  }, []);

  // register by Admin
  const registerByAdmin = useCallback(async (phone, password, userRoleId, createdBy) => {
    try {
      const registerDataToSend = {
        userRoleId,
        phone,
        password,
        createdBy,
        isMobileVerified: false,
        ipAddress: '192.168.1.1',
        macAddress: '00:1A:2B:3C:4D:5E',
      };
      const response = await registerPoster('register', registerDataToSend);
      if (response)
        return {
          response: 'ok',
        };
    } catch (error) {
      console.error('Error in registering:', error);
      throw error;
    }

    return undefined;
  }, []);

  // Forgot Password Register

  const registerForgotPasword = useCallback(async (phone, password) => {
    try {
      const registerDataToSend = {
        phone,
        password,
      };

      const response = await registerPoster('registerfP', registerDataToSend);

      if (response) {
        return {
          response: 'ok',
        };
      }
    } catch (error) {
      console.error('Error in registering:', error);
      throw error;
    }

    return undefined;
  }, []);

  // delete user account
  const deleteAccount = useCallback(async (userId) => {
    console.log('helo2');
    const url = `${endpoints.auth.delete}/${userId}`;
    const accessToken = localStorage.getItem(STORAGE_KEY);
    const headers = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    };
    const response = await deleter(url, headers);
    console.log('helo-2');
    return response;
  }, []);

  const logout = useCallback(async () => {
    setLocalStorage(null);
    dispatch({
      type: 'LOGOUT',
    });
    localStorage.setItem('upiId', '');
    localStorage.removeItem('myClaimList');
    localStorage.setItem('votePredictWardId', 0);
    localStorage.setItem('votePredictBoothId', 0);
    localStorage.setItem('votePredictPollId', 0);
    localStorage.setItem('votePredictList', JSON.stringify([]));

    localStorage.removeItem('accessToken');
    window.location.reload();
  }, []);

  // ----------------------------------------------------------------------

  const checkAuthenticated = state.user ? 'authenticated' : 'unauthenticated';

  const status = state.loading ? 'loading' : checkAuthenticated;

  const memoizedValue = useMemo(
    () => ({
      user: state.user,
      open: state.open,
      openModal: state.openModal,
      method: 'jwt',
      loading: status === 'loading',
      authenticated: status === 'authenticated',
      unauthenticated: status === 'unauthenticated',
      toggling: state.toggling,
      dispatch,
      login,
      userdata,
      register,
      registerInsideLogin,
      registerByAdmin,
      logout,
      otpverify,
      deleteAccount,
      otpGenerate,
      otpGenerateForEmail,
      otpForUserVerify,
      otpGenerateMobileVerify,
      otpGenerateForgotPassword,
      otpverifyForFOrgotPassword,
      registerForgotPasword,
      UpdateCandidateProfile,
      openPaymentModal,
      closePaymentModal,
      createNewPassword,
      refetch
    }),
    [
      login,
      logout,
      register,
      openPaymentModal,
      closePaymentModal,
      registerInsideLogin,
      registerByAdmin,
      otpverify,
      userdata,
      otpGenerate,
      deleteAccount,
      otpGenerateMobileVerify,
      otpGenerateForEmail,
      otpForUserVerify,
      state.user,
      state.toggling,
      state.open,
      state.openModal,
      dispatch,
      status,
      otpGenerateForgotPassword,
      otpverifyForFOrgotPassword,
      registerForgotPasword,
      createNewPassword,
      refetch
    ]
  );

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
}

AuthProvider.propTypes = {
  children: PropTypes.node,
};

// ------------------------------------------
