import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
// import { useNavigate } from 'react-router';
import { useMemo, useState, useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { useAuthContext } from 'src/auth/hooks';

import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { RHFTextField } from 'src/components/hook-form';

export default function JwtRegisterView({ user }) {
  // Required Variables

  const { otpGenerate, otpverify, emailOtpVerifyByUser } = useAuthContext();
  const { enqueueSnackbar } = useSnackbar();
  // const navigate = useNavigate();

  const [timer, setTimer] = useState(50); // 5 minutes in seconds
  const [showTimer, setShowTimer] = useState(true);
  const [ref, setRef] = useState({});
  const [otpcodeId, setOtpCodeId] = useState({});
  // const [expiry, setOtpExpiry] = useState();

  const [show, setShow] = useState({
    emForm: true,
    otpForm: false,
  });

  useEffect(() => {
    let intervalId;

    if (timer > 0 && showTimer) {
      intervalId = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else {
      setShowTimer(false);
      clearInterval(intervalId);
    }

    return () => clearInterval(intervalId);
  }, [timer, showTimer]);

  const EmailNumberSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
    phone: Yup.string().required('Phone number is required'),
  });

  const OtpSchema = Yup.object().shape({
    mobileOTP: Yup.string().required('Mobile OTP is required'),
    emailOTP: Yup.string().required('Email OTP is required'),
  });

  const defaultValuesEmailNumber = useMemo(
    () => ({
      fullName: user?.userName || '',
      email: user?.email || '',
      phone: user?.phone || '',
    }),
    [user]
  );

  const defaultValuesOtp = {
    mobileOTP: '',
    emailOTP: '',
  };

  const emailNumberMethods = useForm({
    resolver: yupResolver(EmailNumberSchema),
    defaultValuesEmailNumber,
  });
  const otpMethods = useForm({
    resolver: yupResolver(OtpSchema),
    defaultValuesOtp,
  });

  const { handleSubmit: handleSubmitEmailNum, reset: resetPhoneEmail } = emailNumberMethods;
  const { handleSubmit: handleSubmitOtp } = otpMethods;

  useEffect(() => {
    if (user) {
      resetPhoneEmail(defaultValuesEmailNumber);
    }
  }, [user, defaultValuesEmailNumber, resetPhoneEmail]);

  const onSubmitEmailNumber = handleSubmitEmailNum(async (data) => {
    try {
      if (otpGenerate) {
        const { response, otpRefs, otpCodeId, otpExpiry } = await otpGenerate(
          data.email,
          data.phone,
          data.fullName
        );

        if (response === 'ok') {
          setRef(otpRefs);
          setOtpCodeId(otpCodeId);
          // setOtpExpiry(otpExpiry);
          setShow({ firstForm: false, emForm: false, otpForm: true, pasForm: false });
          enqueueSnackbar('Sent OTP successfully!', { variant: 'success' });
          setTimer(otpExpiry); // Start the timer with OTP expiry time
          setShowTimer(true); // Show the timer
        }
      } else {
        console.error('otpGenerate is not defined');
      }
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Failed to generate OTP.', { variant: 'error' });
    }
  });

  const onSubmitOtp = handleSubmitOtp(async (data) => {
    try {
      // Check if otpverify exists before attempting to call it
      if (otpverify && emailOtpVerifyByUser) {
        const [otpResponse, emailResponse] = await Promise.all([
          otpverify(data.mobileOTP, data.emailOTP, otpcodeId),
          emailOtpVerifyByUser(),
        ]);

        if (otpResponse.response === 'ok' && emailResponse.response === 'ok') {
          enqueueSnackbar('Verified successfully!', { variant: 'success' });
        } else {
          enqueueSnackbar('Failed to verify OTP or email OTP.', { variant: 'error' });
        }
      } else {
        console.error('otpverify or emailOtpVerifyByUser is not defined');
      }
    } catch (error) {
      console.error(error);
      enqueueSnackbar('An error occurred while verifying OTP.', { variant: 'error' });
    }
  });

  const handleResendClick = async () => {
    try {
      if (otpGenerate) {
        const { response, otpRefs, otpExpiry } = await otpGenerate(
          emailNumberMethods.getValues('email'),
          emailNumberMethods.getValues('phoneNumber'),
          emailNumberMethods.getValues('fullName')
        );

        if (response === 'ok') {
          setRef(otpRefs);
          // setOtpExpiry(otpExpiry); // Update the OTP expiry time
          setTimer(otpExpiry); // Reset the timer to OTP expiry time
          setShowTimer(true); // Show the timer
        }
      } else {
        console.error('otpGenerate is not defined');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {/* Second Form: Email and Phone Number */}
      {show.emForm && (
        <FormProvider methods={emailNumberMethods} onSubmit={onSubmitEmailNumber}>
          <Stack spacing={2}>
            {!user.isEmailVerified && <RHFTextField name="email" label="Email address" />}
            {!user.isMobileVerified && <RHFTextField name="phone" label="Phone number" />}
            <Button variant="contained" size="large" type="submit">
              Next
            </Button>
          </Stack>
        </FormProvider>
      )}

      {/* Third Form: OTPs */}
      {show.otpForm && (
        <FormProvider methods={otpMethods} onSubmit={onSubmitOtp}>
          <Stack spacing={2}>
            {!user.isMobileVerified && (
              <>
                <Typography variant="body2">Ref for mobile : {ref.mobile}</Typography>
                <RHFTextField name="mobileOTP" label="Mobile OTP" />
              </>
            )}
            {!user.isEmailVerified && (
              <>
                <Typography variant="body2">Ref for email : {ref.email}</Typography>
                <RHFTextField name="emailOTP" label="Email OTP" />
              </>
            )}

            <Stack direction="row" spacing={2}>
              {showTimer ? (
                <Button variant="outlined" size="large">
                  {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')}
                </Button>
              ) : (
                <Button variant="contained" size="large" onClick={handleResendClick}>
                  Resend
                </Button>
              )}
            </Stack>
            <Button variant="contained" size="large" type="submit">
              Submit
            </Button>
          </Stack>
        </FormProvider>
      )}
    </>
  );
}

JwtRegisterView.propTypes = {
  user: PropTypes.object,
};
