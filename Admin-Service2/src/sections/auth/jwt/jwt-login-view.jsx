import axios from 'axios';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState, useEffect, useCallback } from 'react';

import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { Box, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';
import {
  useRouter,
  // useSearchParams
} from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/use-boolean';

import { useAuthContext } from 'src/auth/hooks';
import { setLocalStorage } from 'src/auth/context/jwt/utils';
import { PATH_AFTER_LOGIN, ATTPL_UMS_HOST_API } from 'src/config-global';

import Iconify from 'src/components/iconify';
import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { RHFTextField } from 'src/components/hook-form';

// import UserProfileNewEditForm from 'src/sections/userProfileManagement/user-profile-new-edit-form';

// ----------------------------------------------------------------------

export default function JwtLoginView() {
  const {
    login,
    userdata,
    dispatch,
    otpGenerateMobileVerify,
    otpGenerate,
    otpForUserVerify,
    otpVerifyAdmin,
    otpGenerateForEmail,
    otpGenerateForgotPassword,
  } = useAuthContext();
  const theme = useTheme();
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  // const [showLoginForm, setShowLoginFrom] = useState(true);
  const [timerEmail, setTimerEmail] = useState({ otpExpiry: 0, state: false });
  const [timerMobile, setTimerMobile] = useState({ otpExpiry: 0, state: false });
  // const [timer, setTimer] = useState({});
  // eslint-disable-next-line no-unused-vars
  const [userInfo, setUserInfo] = useState(null);
  const [ref, setRef] = useState({});
  // const [showTimer, setShowTimer] = useState({ mobile: false, email: false });
  const [otpcodeId, setOtpCodeId] = useState({});
  const params = new URLSearchParams(window.location.search);
  const token = params.get('token');
  const [show, setShow] = useState({
    userAvailability: true,
    showLoginForm: false,
    showOtpForm: false,
  });
  async function crossToken() {
    try {
      const data = await userdata(token);
      console.log('helo');
      setLocalStorage(token);
      if (data) {
        dispatch({
          type: 'LOGIN',
          payload: {
            user: {
              ...data,
              token,
            },
          },
        });
        router.push(PATH_AFTER_LOGIN);
      }
    } catch (err) {
      console.error(err);
    }
  }
  useEffect(() => {
    if (token) {
      crossToken();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const [errorMsg, setErrorMsg] = useState('');

  // const searchParams = useSearchParams();
  // const returnTo = searchParams.get('returnTo');

  const password = useBoolean();

  const LoginSchema = Yup.object().shape({
    phone: Yup.number()
      .min(1000000000, 'Phone number must be at least 10 digits')
      .max(9999999999, 'Phone number must be at most 10 digits')
      .required('Phone number is required'),
    password: Yup.string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#_])[A-Za-z\d@$!%*?&#_]{6,16}$/,
        'Password must contain at least one lowercase letter, one uppercase letter, one number, one special character, and be between 6 to 16 characters long'
      )
      .required('Password is required'),
  });

  const userSchema = Yup.object().shape({
    userphone: Yup.string()
      .min(10, 'Phone number must be at least 10 digits')
      .max(10, 'Phone number must be at most 10 digits')
      .required('Phone number is required'),
  });

  const schema = () => {
    const schemaa = {};
    if (userInfo?.data?.userRoleId === 1) {
      schemaa.emailOTP = Yup.string().required('Email OTP is required');
      schemaa.mobileOTP = Yup.string().required('Mobile OTP is required');
    } else {
      schemaa.mobileOTP = Yup.string().required('Mobile OTP is required');
    }
    return schemaa;
  };

  const OtpSchema = Yup.object().shape(schema());

  const defaultValues = {
    phone: '',
    password: '',
  };

  const defaultValuesOtp = () => {
    const dfValue = {};
    if (userInfo?.data?.userRoleId === 1) {
      dfValue.emailOTP = '';
      dfValue.mobileOTP = '';
    } else {
      dfValue.mobileOTP = '';
    }
    return dfValue;
  };

  const defaultValuesUser = {
    userphone: '6283929651',
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const otpMethods = useForm({
    resolver: yupResolver(OtpSchema),
    defaultValuesOtp,
  });

  const userMethods = useForm({
    resolver: yupResolver(userSchema),
    defaultValuesUser,
  });

  const { handleSubmit: handleSubmitUser, watch } = userMethods;

  const { handleSubmit: handleSubmitOtp } = otpMethods;
  const value = watch();

  const {
    // reset,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    if (value.userphone) {
      if (value.userphone.length === 10) {
        localStorage.setItem('phone', value.userphone);
        setValue('phone', value.userphone);
      }
    }
  }, [value.userphone, setValue]);
  let bool = true;
  const onSubmitUser = handleSubmitUser(async (data) => {
    try {
      if (bool) {
        bool = false;
        setTimeout(() => {
          bool = true;
        }, 3000);
        const phoneNumber = { phone: data?.userphone };
        const url = `${ATTPL_UMS_HOST_API}/user/search/mobile-number`;
        const headers = {
          headers: {
            'Content-Type': 'application/json',
          },
        };
        const responseValidNumber = await axios.post(url, phoneNumber, { headers });

        if (
          typeof responseValidNumber.data.data === 'object' &&
          responseValidNumber.data.data.isMobileVerified
        ) {
          setShow({ userAvailability: false, showLoginForm: true, showOtpForm: false });
        } else if (
          (typeof responseValidNumber.data.data === 'object' &&
            !responseValidNumber.data.data.isMobileVerified) ||
          typeof responseValidNumber.data.data === 'boolean'
        ) {
          const { response, otpRefs, otpCodeId, otpExpiry } = await otpGenerate(data.userphone);
          if (response === 'ok') {
            // setRef(otpRefs);
            // setOtpCodeId(otpCodeId);
            // setOtpExpiry(otpExpiry);
            // setTimer(otpExpiry);
            // setShowTimer(true);
            localStorage.setItem('otpRefs', JSON.stringify(otpRefs));
            localStorage.setItem('otpCodeId', JSON.stringify(otpCodeId));
            localStorage.setItem('otpExpiry', JSON.stringify(otpExpiry));
            localStorage.setItem('ShowTimer', JSON.stringify(true));
            enqueueSnackbar('Sent OTP successfully!', { variant: 'success' });
            window.location.href = paths.auth.jwt.register;
          }
        }
      }
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Some error Occurs', { variant: 'error' });
    }
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      await login?.(data.phone, data.password);
      // if (ATTPL_UMS_HOST_API.slice(0, 14) !== "https://umsapi") {
      router.push(PATH_AFTER_LOGIN);
      // }
      // else {
      //   if (res) {
      //     setUserInfo(res)
      //     setErrorMsg("");
      //   };
      //   setShow({ userAvailability: false, showLoginForm: false, showOtpForm: true })
      //   // setShowLoginFrom(false);
      // }
    } catch (error) {
      console.error(error);
      // reset();
      // console.log(typeof error === 'string')
      setErrorMsg(typeof error === 'string' ? 'Something Went Wrong' : error.message);
    }
  });

  const onSubmitOtp = handleSubmitOtp(async (data) => {
    try {
      if (userInfo?.data?.userRoleId === 1) {
        // Check if otpverify exists before attempting to call it
        if (otpVerifyAdmin) {
          const { response } = await otpVerifyAdmin(
            data.mobileOTP,
            data.emailOTP,
            otpcodeId,
            userInfo
          );
          if (response === 'ok') {
            enqueueSnackbar('verified successfully!', { variant: 'success' });
            router.push(PATH_AFTER_LOGIN);
          }
        } else {
          // Handle the case when otpverify is undefined
          console.error('otpverify is not defined');
        }
      } else if (otpForUserVerify) {
        // add by gurpreet
        const { response } = await otpForUserVerify(data.mobileOTP, otpcodeId, userInfo);

        if (response === 'ok') {
          enqueueSnackbar('verified successfully!', { variant: 'success' });
          // router.push(returnTo || PATH_AFTER_LOGIN);
          router.push(PATH_AFTER_LOGIN);
        }
      } else {
        // Handle the case when otpverify is undefined
        console.error('otpverify is not defined');
      }
    } catch (error) {
      console.error(error);
      // setErrorMsg(typeof error === 'string' ? error : error.message);
      enqueueSnackbar('Failed to verify OTP.', { variant: 'error' });
    }
  });

  const generateOTP = useCallback(async () => {
    if (userInfo) {
      const { email, phone, userRoleId } = userInfo.data;
      if (userRoleId !== 1) {
        // generate OTP For Mobile
        const { response, otpRefs, otpExpiry, otpCodeId } = await otpGenerateMobileVerify(phone);
        if (response === 'ok') {
          setRef(otpRefs);
          // setTimer((pre) => ({ ...pre, mobile: otpExpiry })); // Reset the timer to OTP expiry time
          // setShowTimer({ mobile: true, email: true }); // Show the timer
          setTimerMobile({ state: true, otpExpiry });
          setOtpCodeId(otpCodeId);
        }
      } else {
        const {
          response,
          otpRefs,
          otpExpiry,
          otpCodeId,
          // otpExpiryMobile
        } = await otpGenerate(email, phone);

        if (response === 'ok') {
          setOtpCodeId(otpCodeId);
          setRef(otpRefs);
          // setTimer({ mobile: otpExpiry, email: otpExpiryMobile }); // Reset the timer to OTP expiry time
          setTimerMobile({ state: true, otpExpiry }); // Reset the timer to OTP expiry time
          setTimerEmail({ state: true, otpExpiry });
          // setShowTimer({ mobile: true, email: true });  // Show the timer
        }
      }
    }
  }, [userInfo, otpGenerate, otpGenerateMobileVerify]);

  useEffect(() => {
    generateOTP();
  }, [userInfo, generateOTP]);

  useEffect(() => {
    let intervalId;

    if (timerMobile.state) {
      intervalId = setInterval(() => {
        setTimerMobile((p) => ({ state: p.otpExpiry > 0, otpExpiry: p.otpExpiry - 1 }));
      }, 1000);
    } else {
      clearInterval(intervalId);
    }

    return () => clearInterval(intervalId);
  }, [timerMobile.state]);

  useEffect(() => {
    let intervalId;

    if (timerEmail.state) {
      intervalId = setInterval(() => {
        setTimerEmail((p) => ({ state: p.otpExpiry > 0, otpExpiry: p.otpExpiry - 1 }));
      }, 1000);
    } else {
      clearInterval(intervalId);
    }

    return () => clearInterval(intervalId);
  }, [timerEmail.state]);

  const handleResendClick = async (isEmailResendOtp) => {
    try {
      if (isEmailResendOtp) {
        if (otpGenerateForgotPassword && userInfo) {
          const { response, otpRefs, otpExpiry, otpCodeId } = await otpGenerateForEmail(
            userInfo?.data?.email
          );

          if (response === 'ok') {
            setRef({ ...ref, ...otpRefs });
            // setTimer((pre) => ({ ...pre, email: otpExpiry }));
            // setShowTimer((pre) => ({ ...pre, email: true }));
            setTimerEmail({ state: true, otpExpiry });
            setOtpCodeId(otpCodeId);
          }
        } else {
          console.error('otpGenerate is not defined');
        }
      } else if (otpGenerateMobileVerify && userInfo) {
        const { response, otpRefs, otpExpiry, otpCodeId } = await otpGenerateMobileVerify(
          userInfo?.data?.phone,
          userInfo?.data?.userName
        );
        if (response === 'ok') {
          setRef({ ...ref, ...otpRefs });
          // setTimer((pre) => ({ ...pre, mobile: otpExpiry }));
          // setShowTimer((pre) => ({ ...pre, mobile: true }));
          setTimerMobile({ state: true, otpExpiry });
          setOtpCodeId(otpCodeId);
        }
      } else {
        console.error('otpGenerate is not defined');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const renderHead = (
    <Stack spacing={2} sx={{ mb: 5 }}>
      <Typography variant="h4">WELCOME TO ATTPL GROUP</Typography>

      {/* <Stack direction="row" spacing={0.5}>
        <Typography variant="body2">New user?</Typography>

        <Link component={RouterLink} href={paths.auth.jwt.register} variant="subtitle2">
          Create an account
        </Link>
      </Stack> */}
    </Stack>
  );

  const renderLoginForm = (
    <Stack spacing={2.5}>
      <RHFTextField
        name="phone"
        label="Mobile Number"
        disabled
        sx={{ display: 'none' }}
        InputProps={{
          style: {
            color: theme.palette.mode === 'light' ? 'black' : 'white',
          },
        }}
        InputLabelProps={{
          style: {
            color: theme.palette.mode === 'light' ? 'black' : 'white',
          },
        }}
      />
      <RHFTextField
        name="password"
        label="Please enter your password"
        type={password.value ? 'text' : 'password'}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={password.onToggle} edge="end">
                <Iconify
                  icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'}
                  sx={{
                    height: { xs: '48px', md: 'auto' },
                    width: { xs: '48px', md: 'auto' },
                  }}
                />
              </IconButton>
            </InputAdornment>
          ),
          style: {
            color: theme.palette.mode === 'light' ? 'black' : 'white',
          },
        }}
        InputLabelProps={{
          style: {
            color: theme.palette.mode === 'light' ? 'black' : 'white',
          },
        }}
      />

      <Box
        component={RouterLink}
        href={paths.auth.jwt.forgotpassword}
        variant="body2"
        color="inherit"
        underline="always"
        sx={{
          alignSelf: 'flex-end',
          color: theme.palette.mode === 'light' ? 'black' : 'white',
          height: { xs: '48px', md: 'auto' },
        }}
      >
        Forgot Password?
      </Box>

      <LoadingButton
        fullWidth
        color="inherit"
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
      >
        Login
      </LoadingButton>
    </Stack>
  );

  const renderUserAvailForm = (
    <Stack spacing={2.5}>
      <Typography variant="body2">
        Please provide your mobile number, excluding the country code (+91).
      </Typography>
      <RHFTextField
        name="userphone"
        label="Mobile Number"
        InputProps={{
          style: {
            color: theme.palette.mode === 'light' ? 'black' : 'white',
          },
        }}
        InputLabelProps={{
          style: {
            color: theme.palette.mode === 'light' ? 'black' : 'white',
          },
        }}
      />

      <LoadingButton fullWidth color="inherit" size="large" type="submit" variant="contained">
        Next
      </LoadingButton>
    </Stack>
  );

  const renderOtpForm = (
    <Stack spacing={2.5}>
      {userInfo?.data?.userRoleId === 1 && (
        <>
          <Typography variant="body2">Ref for email :{ref?.email}</Typography>
          <RHFTextField
            name="emailOTP"
            label="Email OTP"
            InputProps={{
              style: {
                color: theme.palette.mode === 'light' ? 'black' : 'white',
              },
            }}
            InputLabelProps={{
              style: {
                color: theme.palette.mode === 'light' ? 'black' : 'white',
              },
            }}
          />
          <Stack direction="row" spacing={2}>
            {timerEmail.state ? (
              <Button variant="outlined" size="large">
                {Math.floor(timerEmail.otpExpiry / 60)}:
                {(timerEmail.otpExpiry % 60).toString().padStart(2, '0')}
              </Button>
            ) : (
              <Button
                variant="contained"
                size="large"
                onClick={() => {
                  handleResendClick(true);
                }}
              >
                Resend
              </Button>
            )}
          </Stack>
        </>
      )}

      {/* //mobile otp  verify */}
      <Typography variant="body2">Ref for Mobile : {ref?.mobile}</Typography>
      <RHFTextField
        name="mobileOTP"
        label="Mobile OTP"
        InputProps={{
          style: {
            color: theme.palette.mode === 'light' ? 'black' : 'white',
          },
        }}
        InputLabelProps={{
          style: {
            color: theme.palette.mode === 'light' ? 'black' : 'white',
          },
        }}
      />
      <Stack direction="row" spacing={2}>
        {timerMobile.state ? (
          <Button variant="outlined" size="large">
            {Math.floor(timerMobile.otpExpiry / 60)}:
            {(timerMobile.otpExpiry % 60).toString().padStart(2, '0')}
          </Button>
        ) : (
          <Button
            variant="contained"
            size="large"
            onClick={() => {
              handleResendClick(false);
            }}
          >
            Resend
          </Button>
        )}
      </Stack>
      <Button variant="contained" size="large" type="submit">
        Submit
      </Button>
    </Stack>
  );

  return (
    <>
      {!!errorMsg && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {errorMsg}
        </Alert>
      )}
      {show.userAvailability && (
        <>
          {renderHead}
          <FormProvider methods={userMethods} onSubmit={onSubmitUser}>
            {renderUserAvailForm}
          </FormProvider>
        </>
      )}

      {show.showLoginForm && (
        <>
          {renderHead}
          <FormProvider methods={methods} onSubmit={onSubmit}>
            {renderLoginForm}
          </FormProvider>
        </>
      )}
      {show.showOtpForm && (
        <FormProvider methods={otpMethods} onSubmit={onSubmitOtp}>
          {renderOtpForm}
        </FormProvider>
      )}
    </>
  );
}
