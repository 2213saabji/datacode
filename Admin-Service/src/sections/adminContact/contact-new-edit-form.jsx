// import * as Yup from 'yup';
// import PropTypes from 'prop-types';
// import { useForm } from 'react-hook-form';
// import { useMemo, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { yupResolver } from '@hookform/resolvers/yup';

// import Box from '@mui/material/Box';
// import Card from '@mui/material/Card';
// import Stack from '@mui/material/Stack';
// import Grid from '@mui/material/Unstable_Grid2';
// import LoadingButton from '@mui/lab/LoadingButton';

// import { _contactStatus } from 'src/_mock';
// import { UpdateContact } from 'src/api/contact';

// import { useSnackbar } from 'src/components/snackbar';
// import FormProvider, {
//   RHFTextField,
//   RHFAutocomplete,
// } from 'src/components/hook-form';

// // ----------------------------------------------------------------------

// export default function ContactNewEditForm({ currentContact }) {
//   // console.log(currentContact)

//   const navigate = useNavigate();

//   const { enqueueSnackbar } = useSnackbar();

//   const contactId = currentContact?.data.contactId;

//   const NewContactSchema = Yup.object().shape({
//     name: Yup.string().required('Name is required'),
//     email: Yup.string().required('Email is required').email('Email must be a valid email address'),
//     mobileNumber: Yup.string().required('Phone number is required'),
//     description: Yup.string().required('description is required'),
//     remark: Yup.string().required('remark is required'),
//     status: Yup.string().required('status is required'),
//     subject: Yup.mixed().nullable().required('subject is required'),
//   });

//   const defaultValues = useMemo(
//     () => ({
//       name: currentContact?.data.name || '',
//       email: currentContact?.data.email || '',
//       status: currentContact?.data.status || '',
//       remark: currentContact?.data.remark || '',
//       subject: currentContact?.data.subject || '',
//       description: currentContact?.data.description || '',
//       mobileNumber: currentContact?.data.mobileNumber || '',
//     }),
//     [currentContact]
//   );

//   const methods = useForm({
//     resolver: yupResolver(NewContactSchema),
//     defaultValues,
//   });

//   const {
//     reset,
//     handleSubmit,
//     formState: { isSubmitting },
//   } = methods;

//   useEffect(() => {
//     if (currentContact) {
//       reset(defaultValues);
//     }
//   }, [currentContact, defaultValues, reset]);

//   const onSubmit = handleSubmit(async (data) => {
//     try {
//       const response = await UpdateContact(contactId, data);

//       if(response) {
//         enqueueSnackbar('Contact updated successfully', { variant: 'success' });
//         navigate(`/dashboard/contact/${contactId}`);
//       } else {
//         enqueueSnackbar('Failed to update Contact', { variant: 'error' });
//       }
//     } catch (error) {
//       // Handle errors here if necessary
//       console.error('Error updating Contact :', error);
//       enqueueSnackbar('An error occurred while updating contact ', { variant: 'error' });
//     }
//   });

//   return (
//     <FormProvider methods={methods} onSubmit={onSubmit}>
//       <Grid container spacing={3}>

//         <Grid xs={12} md={8}>
//           <Card sx={{ p: 3 }}>
//             <Box
//               rowGap={3}
//               columnGap={2}
//               display="grid"
//               gridTemplateColumns={{
//                 xs: 'repeat(1, 1fr)',
//                 sm: 'repeat(2, 1fr)',
//               }}
//             >
//               <RHFTextField name="name" label="Name" disabled />
//               <RHFTextField name="email" label="Email" disabled />
//               <RHFTextField name="mobileNumber" label="Phone No." disabled />
//               <RHFTextField name="subject" label="Subject" disabled />
//               <Stack spacing={1.5}>
//                 <RHFTextField
//                   name="description"
//                   fullWidth
//                   label="Description"
//                   multiline
//                   rows={4}
//                   disabled
//                 />
//               </Stack>

//               <RHFAutocomplete
//                 name="status"
//                 type="status"
//                 label="Status"
//                 placeholder="Choose a status"
//                 fullWidth
//                 options={_contactStatus.map((option) => option)}
//                 getOptionLabel={(option) => option}
//               />

//               <RHFTextField name="remark" label="Remark" />

//             </Box>

//             <Stack alignItems="flex-end" sx={{ mt: 3 }}>
//               <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
//                 Save Changes
//               </LoadingButton>
//             </Stack>
//           </Card>
//         </Grid>
//       </Grid>
//     </FormProvider>
//   );
// }

// ContactNewEditForm.propTypes = {
//   currentContact: PropTypes.object,
// };
import * as Yup from 'yup';
import { m } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';

import { Box } from '@mui/system';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
// import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { callPoster } from 'src/api/contact_2';

import { useSnackbar } from 'src/components/snackbar';
import { varFade, MotionViewport } from 'src/components/animate';
import FormProvider, { RHFTextField } from 'src/components/hook-form';

export default function ContactForm(currentContact) {
  console.log(currentContact?.currentContact?.data?.name);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  // show states
  const [show, setShow] = useState({
    firstForm: true,
    otpForm: false,
    submitted: false,
  });

  // otp timer
  const [timer, setTimer] = useState(0); // 1 minutes in seconds
  const [timeExpiry, setTimeExpiry] = useState(0);
  // const [emailSmsId, setEmailSmsId] = useState('');
  const [mobileSmsId, setMobileSmsId] = useState('');
  // const [emailref, setEmailref] = useState('');
  const [mobileref, setMobileref] = useState('');
  const [showResendButton, setShowResendButton] = useState(false);

  // Schema for form
  const ContactSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    mobile: Yup.string()
      .required('Mobile number is required')
      .matches(/^\d{10}$/, 'Mobile number must be 10 digits'),
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
    subject: Yup.string().required('Subject is required'),
    message: Yup.string().required('Message is required'),
  });

  // Schema for Otp
  const OTPSchema = Yup.object().shape({
    mobileOtp: Yup.string().required('Mobile OTP is required'),
    // emailOtp: Yup.string().required('Email OTP is required'),
  });

  const defaultValues = {
    name: currentContact?.currentContact?.data?.name || '',
    mobile: currentContact?.currentContact?.data?.mobile || '',
    email: currentContact?.currentContact?.data?.email || '',
    subject: currentContact?.currentContact?.data?.subject || '',
    message: currentContact?.currentContact?.data?.message || '',
  };

  const defaultOtpValues = {
    mobileOtp: '',
    // emailOtp: '',
  };

  const methods = useForm({
    resolver: yupResolver(ContactSchema),
    defaultValues,
  });

  const otpMethods = useForm({
    resolver: yupResolver(OTPSchema),
    defaultOtpValues,
  });

  // both form handlers defined
  const { handleSubmit: handleFirstFormSubmit } = methods;
  const { handleSubmit: handleOTPSubmit } = otpMethods;

  // Countdown the timer every second
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => Math.max(prevTimer - 1, 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Show resend button when timer reaches 0
  useEffect(() => {
    if (timer === 0) {
      setShowResendButton(true);
    }
  }, [timer]);

  // logic for otp generation
  const generateAndSendOTP = async (data) => {
    try {
      const mobileDataToSend = {
        fullName: data.name,
        mobileNumber: data.mobile,
      };

      // Making API calls concurrently
      const [responseMobile] = await Promise.all([callPoster('sentOTP', mobileDataToSend)]);

      // Check if both API calls were successful
      if (responseMobile.success) {
        setMobileSmsId(responseMobile.data.otpCodeId);
        setMobileref(responseMobile.data.refId);
        console.log('otp', responseMobile.data.otpCodeId);
        setTimeExpiry(responseMobile.data.expiry);
        setTimer(responseMobile.data.expiry);
      }
    } catch (error) {
      console.error('Error in generateAndSendOTP:', error);
      throw error;
    }
  };

  const VerifyOtp = async (data) => {
    try {
      const mobileOtpAndSmsIdToSend = {
        otpCode: data.mobileOtp,
        otpCodeId: mobileSmsId,
      };

      // Making API calls concurrently
      const [responseVerifyMobile] = await Promise.all([
        callPoster('verifyOTP', mobileOtpAndSmsIdToSend),
      ]);

      if (responseVerifyMobile.status === 'rejected') {
        console.error('Error in verifying mobile OTP:', responseVerifyMobile.reason);
        enqueueSnackbar('Could not verify Mobile OTP', { variant: 'error' });
        // Handle error or throw if necessary
      }
      if (responseVerifyMobile.success) {
        enqueueSnackbar('OTP Verified successfully!', { variant: 'success' });
      }
    } catch (error) {
      console.error('Error in verifing OTPs:', error);
      throw error;
    }
  };

  const onSubmitContact = handleFirstFormSubmit(async (data) => {
    try {
      sessionStorage.setItem('formData', JSON.stringify(data));

      await generateAndSendOTP(data);

      setShow({ ...show, firstForm: false, otpForm: true, submitted: false });

      enqueueSnackbar('OTP sent successfully!', { variant: 'success' });
      setShowResendButton(false);
      // navigate(`/dashboard/contact`);
      // setShowResendButton(false);
    } catch (error) {
      console.error('Error sending OTP:', error);
      enqueueSnackbar('Failed to send OTP. Please try again.', { variant: 'error' });
    }
  });

  const onSubmitOTP = handleOTPSubmit(async (data) => {
    try {
      await VerifyOtp(data);
      const storedFormData = JSON.parse(sessionStorage.getItem('formData'));

      const contactDataToSend = {
        name: storedFormData.name,
        email: storedFormData.email,
        emailVerified: true,
        mobileNumberVerified: true,
        mobileNumber: storedFormData.mobile,
        subject: storedFormData.subject,
        description: storedFormData.message,
      };

      const response = await callPoster('create', contactDataToSend);

      if (response) {
        setShow({ ...show, firstForm: false, otpForm: false, submitted: true });
        enqueueSnackbar(response.message, { variant: 'success' });
        navigate(`/dashboard/contact`);
      } else {
        enqueueSnackbar('Failed to submit form', { variant: 'error' });
      }
    } catch (error) {
      console.error('Error validating OTPs:', error);
    }
  });

  const handleResendOTP = async () => {
    try {
      const storedFormData = JSON.parse(sessionStorage.getItem('formData'));
      await generateAndSendOTP(storedFormData);

      enqueueSnackbar('OTP resent successfully!', { variant: 'success' });
      setTimer(timeExpiry);
      setShowResendButton(false);
    } catch (error) {
      console.error('Error resending OTP:', error);
      enqueueSnackbar('Failed to resend OTP. Please try again.', { variant: 'error' });
    }
  };

  return (
    <Stack component={MotionViewport} spacing={5}>
      <m.div variants={varFade().inUp}>
        <Typography variant="h3">
          Feel free to contact us. <br />
        </Typography>
      </m.div>

      {show.firstForm && (
        <FormProvider spacing={3} methods={methods} onSubmit={onSubmitContact}>
          <Grid container spacing={3}>
            <Grid xs={12} md={8}>
              <Card sx={{ p: 3 }}>
                <Box
                  rowGap={3}
                  columnGap={2}
                  display="grid"
                  gridTemplateColumns={{
                    xs: 'repeat(1, 1fr)',
                    sm: 'repeat(2, 1fr)',
                  }}
                >
                  {/* <Box
            rowGap={3}
            columnGap={2}
            display="grid"
            width="300px"
            gridTemplateColumns={{
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(1, 1fr)',
            }}
          > */}
                  <m.div variants={varFade().inUp}>
                    <RHFTextField name="name" fullWidth label="Name" spellCheck="false" />
                  </m.div>

                  <m.div variants={varFade().inUp}>
                    <RHFTextField name="mobile" fullWidth label="Mobile Number" />
                  </m.div>

                  <m.div variants={varFade().inUp}>
                    <RHFTextField name="email" fullWidth label="Email" />
                  </m.div>

                  <m.div variants={varFade().inUp}>
                    <RHFTextField name="subject" fullWidth label="Subject" spellCheck="false" />
                  </m.div>

                  <m.div variants={varFade().inUp}>
                    <RHFTextField
                      name="message"
                      fullWidth
                      label="Enter your message here."
                      multiline
                      rows={4}
                      spellCheck="false"
                    />
                  </m.div>
                </Box>
                <m.div variants={varFade().inUp}>
                  <Stack alignItems="flex-end" sx={{ mt: 3 }}>
                    <Button type="submit" size="large" variant="contained">
                      Submit Now
                    </Button>
                  </Stack>
                </m.div>
              </Card>
            </Grid>
          </Grid>
        </FormProvider>
      )}

      {show.otpForm && (
        <FormProvider spacing={3} methods={otpMethods} onSubmit={onSubmitOTP}>
          <Box
            rowGap={3}
            columnGap={2}
            display="grid"
            gridTemplateColumns={{
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(1, 1fr)',
            }}
          >
            <Typography variant="body2" color="textSecondary" textAlign="right">
              Time remaining: {Math.floor(timer / 60)}:{timer % 60 < 10 ? '0' : ''}
              {timer % 60}
            </Typography>
            {/* <Typography variant="body2">Email OTP Reference Code: {emailref}</Typography>
            <RHFTextField name="emailOtp" fullWidth label="Enter email OTP" /> */}
            <Typography variant="body2">Mobile OTP Reference Code: {mobileref}</Typography>
            <RHFTextField name="mobileOtp" fullWidth label="Enter mobile OTP" />

            <Typography variant="body2" color="textSecondary">
              Verify your mobile number , OTP has been sent to your number.
            </Typography>

            {!showResendButton && (
              <Button type="submit" size="large" variant="contained">
                Submit OTP
              </Button>
            )}

            {showResendButton && (
              <Stack alignItems="flex-end" sx={{ mt: 3, pt: 3 }}>
                <Button type="button" size="large" variant="contained" onClick={handleResendOTP}>
                  Resend OTP
                </Button>
              </Stack>
            )}
          </Box>
        </FormProvider>
      )}
      {/* <Stack alignItems="flex-end" sx={{ mt: 3 }}>
//               <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
//                 Save Changes
//               </LoadingButton>
//             </Stack> */}
      {show.submitted && (
        <div style={{ backgroundColor: '#f0f0f0', padding: '20px', borderRadius: '5px' }}>
          <Typography variant="h5" style={{ textAlign: 'center' }}>
            Thank you for submitting the form. We will contact you soon.
          </Typography>
        </div>
      )}
    </Stack>
  );
}
