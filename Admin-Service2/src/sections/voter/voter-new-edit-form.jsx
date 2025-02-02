/* eslint-disable no-unused-vars */
import axios from 'axios';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useTheme } from '@emotion/react';
import { useNavigate } from 'react-router';
import { useMemo, useState, useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller, useFormContext } from 'react-hook-form';

// import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
// import LoadingButton from '@mui/lab/LoadingButton';
import { Button, IconButton, InputAdornment } from '@mui/material';

import { useRouter, useSearchParams } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/use-boolean';

// import { bgGradient } from 'src/theme/css';
import { JOB_TITLES } from 'src/_mock';
import { useGetUsers } from 'src/api/user';
import { useGetParties } from 'src/api/party';
import { useAuthContext } from 'src/auth/hooks';
import { useGetPools } from 'src/api/poolManagement';
import { statesOfIndia } from 'src/_mock/map/states';
import { ATTPL_UMS_HOST_API } from 'src/config-global';
import { useGetVoters, createVoterProfile, UpdateVoterProfile } from 'src/api/voter';

import Iconify from 'src/components/iconify';
import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { RHFTextField, RHFAutocomplete } from 'src/components/hook-form';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function VoterNewEditForm({ currentVoter }) {
  const navigate = useNavigate();
  console.log('currentVoter--->', currentVoter);
  const theme = useTheme();
  const password = useBoolean();
  const confirmPassword = useBoolean();

  const { user, otpGenerate, otpverify, registerInsideLogin } = useAuthContext();
  const [otpcodeId, setOtpCodeId] = useState();
  const [ref, setRef] = useState();

  const [newuser, setNewUser] = useState({
    newVoterDetails: true,
    veificationOtp: false,
    passwords: false,
  });
  const [newVoterDetailsPhase, setNewVoterDetailsPhase] = useState({
    Phase1: true,
    Phase2: false,
    Phase3: false,
  });
  const voterId = currentVoter?.data.voterProfileId;

  const { enqueueSnackbar } = useSnackbar();

  const { voters: voterList } = useGetVoters();
  const VoterListArr = voterList?.data || [];
  const VoterProfileList = VoterListArr?.map((voter) => voter.userId) || [];

  const { users: usersList } = useGetUsers(user.accessToken);
  const searchParams = useSearchParams();
  const referralToken = searchParams.get('referralToken');
  const returnTo = searchParams.get('returnTo');

  const allUserArr = usersList?.data || [];

  const usersListArr =
    usersList && usersList.data
      ? usersList.data.filter((users) => !VoterProfileList.includes(users.userId))
      : [];

  const UserData = usersListArr.map((list) => ({
    value: list.userId,
    label: list.UserProfile?.firstName || list.phone,
  }));

  const AllUserData = allUserArr.map((list) => ({
    value: list.userId,
    label: list.UserProfile?.firstName || list.phone,
  }));

  const AllUserDataForOptions = AllUserData.map((option) => option.value);

  const UserListDataForOptions = UserData.map((option) => option.value);

  const { parties, partiesLoading } = useGetParties();

  const { pools: pollList } = useGetPools();
  const router = useRouter();

  const partyListArr = parties?.data || [];
  // console.log('---------->',user )
  const pollListArr = pollList?.data || [];

  const PartyData = partyListArr.map((list) => ({
    value: list.partyId,
    label: list.partyName,
  }));
  const PollData = pollListArr.map((list) => ({
    value: list.pollingStationId,
    label: list.pollingStationName,
  }));

  const PollListDataForOptions = PollData.map((option) => option.value);
  const PartyListDataForOptions = PartyData.map((option) => option.value);

  // Schema
  const UserDetailsSchemaPhase1 = Yup.object().shape({
    phone: Yup.string().required('Mobile Number is required'),
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    fatherName: Yup.string().required('Father/Spouse name is required'),
  });
  const UserDetailsSchemaPhase2 = Yup.object().shape({
    wardNo: Yup.string().required('wardNo is required'),
    panchayatName: Yup.string().required('panchayatName is required'),
    tehsilName: Yup.string().required('tehsilName is required'),
  });
  const UserDetailsSchemaPhase3 = Yup.object().shape({
    currentJobTitle: Yup.string().required('currentJobTitle is required'),
    districtName: Yup.string().required('District Name is required'),
    userState: Yup.string().required('State is required'),
  });

  const VoterSchema = Yup.object().shape({
    userId: Yup.number().required('User name is required'),
    pollingStationId: Yup.number().required('Polling Station name is required'),
    upiId: Yup.string().required('UPI ID is required'),
  });

  const otpSchema = Yup.object().shape({
    otp1: Yup.string().required('Required'),
    otp2: Yup.string().required('Required'),
    otp3: Yup.string().required('Required'),
    otp4: Yup.string().required('Required'),
    otp5: Yup.string().required('Required'),
    otp6: Yup.string().required('Required'),
  });

  const PasswordSchema = Yup.object().shape({
    password: Yup.string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,12}$/,
        'Password must contain at least one lowercase letter, one uppercase letter, one number, one special character, and be between 6 to 8 characters long'
      )
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
  });

  const defaultValuesUserDetailsPhase1 = useMemo(
    () => ({
      phone: currentVoter?.data?.User?.phone || '',
      firstName: currentVoter?.data?.User?.UserProfile?.firstName || '',
      lastName: currentVoter?.data?.User?.UserProfile?.lastName || '',
      fatherName: currentVoter?.data?.User?.UserProfile?.fatherName || '',
    }),
    [currentVoter]
  );

  const defaultValuesUserDetailsPhase2 = {
    wardNo: '',
    panchayatName: '',
    tehsilName: '',
  };
  const defaultValuesUserDetailsPhase3 = {
    districtName: '',
    currentJobTitle: '',
    userState: '',
  };

  const defaultValuesPassword = {
    password: '',
  };

  const defaultValues = useMemo(
    () => ({
      userId: currentVoter?.data.userId || null,
      pollingStationId: currentVoter?.data.pollingStationId || null,
      upiId: currentVoter?.data.upiId || localStorage.getItem('upiId'),
    }),
    [currentVoter]
  );

  const [otp, setOtp] = useState({
    otp1: '',
    otp2: '',
    otp3: '',
    otp4: '',
    otp5: '',
    otp6: '',
  });

  const otpMethods = useForm({
    defaultValues: {
      otp1: otp.otp1,
      otp2: otp.otp2,
      otp3: otp.otp3,
      otp4: otp.otp4,
      otp5: otp.otp5,
      otp6: otp.otp6,
    },
    resolver: yupResolver(otpSchema),
  });

  const userDetailsMethodsPhase1 = useForm({
    resolver: yupResolver(UserDetailsSchemaPhase1),
    defaultValuesUserDetailsPhase1,
  });
  const userDetailsMethodsPhase2 = useForm({
    resolver: yupResolver(UserDetailsSchemaPhase2),
    defaultValuesUserDetailsPhase2,
  });
  const userDetailsMethodsPhase3 = useForm({
    resolver: yupResolver(UserDetailsSchemaPhase3),
    defaultValuesUserDetailsPhase3,
  });

  const methods = useForm({
    resolver: yupResolver(VoterSchema),
    defaultValues,
  });

  const passwordMethods = useForm({
    resolver: yupResolver(PasswordSchema),
    defaultValuesPassword,
  });

  // for Profile from
  const { handleSubmit: handleSubmitUserDetailsPhase1, reset: resetUserDetailsPhase1 } =
    userDetailsMethodsPhase1;
  const { handleSubmit: handleSubmitUserDetailsPhase2, reset: resetUserDetailsPhase2 } =
    userDetailsMethodsPhase2;
  const { handleSubmit: handleSubmitUserDetailsPhase3, reset: resetUserDetailsPhase3 } =
    userDetailsMethodsPhase3;
  const { handleSubmit: handleSubmitOtp } = otpMethods;
  const { handleSubmit: handleSubmitPassword, reset: resetPassword } = passwordMethods;

  const { handleSubmit, reset, watch } = methods;
  const values = watch();

  useEffect(() => {
    if (currentVoter) {
      reset(defaultValues);
      resetUserDetailsPhase1(defaultValuesUserDetailsPhase1);
    }
  }, [currentVoter, defaultValues, defaultValuesUserDetailsPhase1, reset, resetUserDetailsPhase1]);

  useEffect(() => {
    localStorage.setItem('upiId', values.upiId);
  }, [values.upiId]);

  //  Profile Creation function
  let bool = true;

  const onSubmitUserDetailsPhase1 = handleSubmitUserDetailsPhase1(async (data) => {
    try {
      if (bool) {
        bool = false;
        setTimeout(() => {
          bool = true;
        }, 3000);
        const phoneNumber = { phone: data?.phone };
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
          enqueueSnackbar('Voter Already Exist!', { variant: 'error' });
        } else if (
          (typeof responseValidNumber.data.data === 'object' &&
            !responseValidNumber.data.data.isMobileVerified) ||
          typeof responseValidNumber.data.data === 'boolean'
        ) {
          setNewVoterDetailsPhase({ Phase1: false, Phase2: true, Phase3: false });
        }
      }
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Something went wrong.', { variant: 'error' });
    }
  });

  const onUpdateUserDetailsPhase1 = handleSubmitUserDetailsPhase1(async (data) => {
    try {
      const url = `${ATTPL_UMS_HOST_API}/user/update/user-profile-details/${currentVoter?.data?.User?.userId}/${currentVoter?.data?.User?.UserProfile?.userProfileId}`;
      const headers = {
        // headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user?.accessToken}`,
        // },
      };
      const responseValidNumber = await axios.put(url, data, { headers });
      if (responseValidNumber) {
        enqueueSnackbar('Voter updated successfully.', { variant: 'success' });
        setNewVoterDetailsPhase({ Phase1: false, Phase2: true, Phase3: false });
      }
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Something went wrong.', { variant: 'error' });
    }
  });

  const onSubmitUserDetailsPhase2 = handleSubmitUserDetailsPhase2(async (data) => {
    try {
      setNewVoterDetailsPhase({ Phase1: false, Phase2: false, Phase3: true });
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Something went wrong.', { variant: 'error' });
    }
  });

  const onSubmitUserDetailsPhase3 = handleSubmitUserDetailsPhase3(async (data) => {
    try {
      setNewUser({ newVoterDetails: false, veificationOtp: false, passwords: true });
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Something went wrong.', { variant: 'error' });
    }
  });

  // const onSubmitOtp = handleSubmitOtp(async (data) => {
  //   try {
  //     const mobileOTP = `${Object.values(data).join('')}`;
  //     if (otpverify) {
  //       const { response } = await otpverify(mobileOTP, otpcodeId);
  //       if (response === 'ok') {
  //         enqueueSnackbar('verified successfully!', { variant: 'success' });
  //         setNewUser({newVoterDetails:false,veificationOtp:false,passwords:true})
  //       }
  //     } else {
  //       // Handle the case when otpverify is undefined
  //       console.error('otpverify is not defined');
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     enqueueSnackbar('Failed to verify OTP.', { variant: 'error' });
  //   }
  // });

  const onSubmitProfile = handleSubmit(async (data) => {
    try {
      const response = await createVoterProfile(data);

      if (response) {
        localStorage.setItem('upiId', '');
        enqueueSnackbar('Voter Profile created successfully', { variant: 'success' });
        navigate('/dashboard/voter');
      } else {
        enqueueSnackbar('Failed to create voter profile', { variant: 'error' });
      }
    } catch (error) {
      // Handle errors here if necessary
      console.error('Error submitting voter profile:', error);
      enqueueSnackbar('An error occurred while creating voter profile', { variant: 'error' });
    }
  });

  const onSubmitPassword = handleSubmitPassword(async (data) => {
    try {
      const datatoSend = {
        ...userDetailsMethodsPhase1.getValues(),
        ...userDetailsMethodsPhase2.getValues(),
        ...userDetailsMethodsPhase3.getValues(),
        password: data.password,
        userRoleId: 9,
      };
      // Check if register exists before attempting to call it
      const { response } = await registerInsideLogin(datatoSend, user.accessToken);
      if (response === 'ok') {
        enqueueSnackbar('registered successfully!', { variant: 'success' });
        resetPassword();
        resetUserDetailsPhase1();
        resetUserDetailsPhase2();
        resetUserDetailsPhase3();
        setNewVoterDetailsPhase({ Phase1: true, Phase2: false, Phase3: false });
        setNewUser({ newVoterDetails: true, veificationOtp: false, passwords: false });
      } else {
        enqueueSnackbar('Something went Wrong!.', { variant: 'error' });
      }
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Failed to register.', { variant: 'error' });
    }
  });

  // Profile Update function

  const onSubmitProfileUpdate = handleSubmit(async (data) => {
    try {
      const response = await UpdateVoterProfile(voterId, data);

      if (response) {
        localStorage.setItem('upiId', '');
        enqueueSnackbar('Voter Profile updated successfully', { variant: 'success' });
        navigate(`/dashboard/voter/${voterId}`);
      } else {
        enqueueSnackbar('Failed to update voter profile', { variant: 'error' });
      }
    } catch (error) {
      // Handle errors here if necessary
      console.error('Error updating  voter profile:', error);
      enqueueSnackbar('An error occurred while updating voter profile', { variant: 'error' });
    }
  });

  return (
    <>
      {/* {user.userRoleId !== 9 && (
        <FormProvider
          methods={methods}
          onSubmit={currentVoter ? onSubmitProfileUpdate : onSubmitProfile}
        >
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
                  {currentVoter ? (
                    <RHFAutocomplete
                      name="userId"
                      label="User Name"
                      options={AllUserDataForOptions}
                      getOptionLabel={(value) => {
                        const User = AllUserData.find((option) => option.value === value);
                        return User ? User.label : '';
                      }}
                      disabled
                    />
                  ) : (
                    <RHFAutocomplete
                      name="userId"
                      label="User Name"
                      options={UserListDataForOptions}
                      getOptionLabel={(value) => {
                        const User = UserData.find((option) => option.value === value);
                        return User ? User.label : '';
                      }}
                    />
                  )}

                  <RHFAutocomplete
                    name="pollingStationId"
                    label="Polling Station Name"
                    options={PollListDataForOptions}
                    getOptionLabel={(value) => {
                      const Poll = PollData.find((option) => option.value === value);
                      return Poll ? Poll.label : '';
                    }}
                  />
                </Box>

                <RHFTextField sx={{ mt: 2 }} name="upiId" label="UPI ID" />

                <Stack alignItems="flex-end" sx={{ mt: 3 }}>
                  <LoadingButton type="submit" variant="contained">
                    {!currentVoter ? 'Create Voter' : 'Save Changes'}
                  </LoadingButton>
                </Stack>
              </Card>
            </Grid>
          </Grid>
        </FormProvider>
      )} */}
      {newuser.newVoterDetails && (
        // <FormProvider
        //   methods={methods}
        //   onSubmit={currentVoter ? onSubmitProfileUpdate : onSubmitProfile}
        // >
        <Grid xs={12} md={8}>
          <Card
            sx={{
              p: { xs: 3, md: 5 },
              minWidth: { md: '600px' },
              mt: { xs: 5, md: 10 },
              mr: { md: 5 },
              boxShadow: '0px 0px 7px 2px rgba(0,0,0,0.15)',
              '@media (max-width:900px)': {
                // width:380,
              },
            }}
          >
            {newVoterDetailsPhase.Phase1 && (
              <FormProvider methods={userDetailsMethodsPhase1} onSubmit={onSubmitUserDetailsPhase1}>
                <RHFTextField
                  name="phone"
                  label={
                    <span>
                      Mobile Number<span style={{ color: 'red' }}> *</span>
                    </span>
                  }
                  sx={{
                    mt: 2,
                  }}
                  InputProps={{
                    style: { color: 'black' },
                  }}
                  InputLabelProps={{
                    style: { color: 'black' },
                  }}
                />
                <RHFTextField
                  name="firstName"
                  label={
                    <span>
                      FirstName<span style={{ color: 'red' }}> *</span>
                    </span>
                  }
                  sx={{
                    mt: 2,
                  }}
                  InputProps={{
                    style: { color: 'black' },
                  }}
                  InputLabelProps={{
                    style: { color: 'black' },
                  }}
                />
                <RHFTextField
                  name="lastName"
                  label={
                    <span>
                      LastName<span style={{ color: 'red' }}> *</span>
                    </span>
                  }
                  sx={{
                    mt: 2,
                  }}
                  InputProps={{
                    style: { color: 'black' },
                  }}
                  InputLabelProps={{
                    style: { color: 'black' },
                  }}
                />
                <RHFTextField
                  name="fatherName"
                  label={
                    <span>
                      Father/Spouse Name<span style={{ color: 'red' }}> *</span>
                    </span>
                  }
                  sx={{
                    mt: 2,
                  }}
                  InputProps={{
                    style: { color: 'black' },
                  }}
                  InputLabelProps={{
                    style: { color: 'black' },
                  }}
                />

                <Button
                  variant="contained"
                  size="large"
                  type="submit"
                  sx={{
                    mt: 2,
                    fontWeight: 1,
                    // ...bgGradient({
                    //   direction: '135deg',
                    //   startColor: theme.palette.primary.main,
                    //   endColor: theme.palette.primary.dark,
                    // }),
                    width: '100%',
                    fontSize: 20,
                  }}
                >
                  Next
                </Button>
              </FormProvider>
            )}
            {newVoterDetailsPhase.Phase2 && (
              <FormProvider methods={userDetailsMethodsPhase2} onSubmit={onSubmitUserDetailsPhase2}>
                <RHFTextField
                  name="wardNo"
                  label={
                    <span>
                      Ward Number<span style={{ color: 'red' }}> *</span>
                    </span>
                  }
                  sx={{
                    mt: 2,
                  }}
                  InputProps={{
                    style: { color: 'black' },
                  }}
                  InputLabelProps={{
                    style: { color: 'black' },
                  }}
                />
                <RHFTextField
                  name="panchayatName"
                  label={
                    <span>
                      Panchayat Name<span style={{ color: 'red' }}> *</span>
                    </span>
                  }
                  sx={{
                    mt: 2,
                  }}
                  InputProps={{
                    style: { color: 'black' },
                  }}
                  InputLabelProps={{
                    style: { color: 'black' },
                  }}
                />
                <RHFTextField
                  name="tehsilName"
                  label={
                    <span>
                      Tehsil Name<span style={{ color: 'red' }}> *</span>
                    </span>
                  }
                  sx={{
                    mt: 2,
                  }}
                  InputProps={{
                    style: { color: 'black' },
                  }}
                  InputLabelProps={{
                    style: { color: 'black' },
                  }}
                />
                <RHFAutocomplete
                  name="partyId"
                  label="Party Name"
                  options={PartyListDataForOptions}
                  getOptionLabel={(value) => {
                    const Part = PartyData.find((option) => option.value === value);
                    return Part ? Part.label : '';
                  }}
                  sx={{
                    mt: 2,
                  }}
                />
                <Stack direction="row" gap="10px">
                  <Button
                    variant="contained"
                    size="large"
                    onClick={() =>
                      setNewVoterDetailsPhase({ Phase1: true, Phase2: false, Phase3: false })
                    }
                    sx={{
                      mt: 2,
                      fontWeight: 1,
                      // ...bgGradient({
                      //   direction: '135deg',
                      //   startColor: theme.palette.primary.main,
                      //   endColor: theme.palette.primary.dark,
                      // }),
                      width: '100%',
                      fontSize: 20,
                    }}
                  >
                    Previous
                  </Button>
                  <Button
                    variant="contained"
                    size="large"
                    type="submit"
                    sx={{
                      mt: 2,
                      fontWeight: 1,
                      // ...bgGradient({
                      //   direction: '135deg',
                      //   startColor: theme.palette.primary.main,
                      //   endColor: theme.palette.primary.dark,
                      // }),
                      width: '100%',
                      fontSize: 20,
                    }}
                  >
                    Next
                  </Button>
                </Stack>
              </FormProvider>
            )}

            {newVoterDetailsPhase.Phase3 && (
              <FormProvider methods={userDetailsMethodsPhase3} onSubmit={onSubmitUserDetailsPhase3}>
                <RHFAutocomplete
                  name="currentJobTitle"
                  label={
                    <span>
                      Current Job Title<span style={{ color: 'red' }}> *</span>
                    </span>
                  }
                  placeholder="Choose a job title"
                  fullWidth
                  options={JOB_TITLES.map((option) => option.label)}
                  getOptionLabel={(option) => option}
                  sx={{
                    mt: 2,
                  }}
                  InputProps={{
                    style: { color: 'black' },
                  }}
                  InputLabelProps={{
                    style: { color: 'black' },
                  }}
                />
                <RHFTextField
                  name="districtName"
                  label={
                    <span>
                      District Name<span style={{ color: 'red' }}> *</span>
                    </span>
                  }
                  sx={{
                    mt: 2,
                  }}
                  InputProps={{
                    style: { color: 'black' },
                  }}
                  InputLabelProps={{
                    style: { color: 'black' },
                  }}
                />

                <RHFAutocomplete
                  name="userState"
                  label={
                    <span>
                      Your State<span style={{ color: 'red' }}> *</span>
                    </span>
                  }
                  placeholder="Choose your State"
                  fullWidth
                  options={statesOfIndia}
                  getOptionLabel={(option) => option}
                  sx={{
                    mt: 2,
                  }}
                  InputProps={{
                    style: { color: 'black' },
                  }}
                  InputLabelProps={{
                    style: { color: 'black' },
                  }}
                />
                <Stack direction="row" gap="10px">
                  <Button
                    variant="contained"
                    size="large"
                    onClick={() =>
                      setNewVoterDetailsPhase({ Phase1: false, Phase2: true, Phase3: false })
                    }
                    sx={{
                      mt: 2,
                      fontWeight: 1,
                      // ...bgGradient({
                      //   direction: '135deg',
                      //   startColor: theme.palette.primary.main,
                      //   endColor: theme.palette.primary.dark,
                      // }),
                      width: '100%',
                      fontSize: 20,
                    }}
                  >
                    Previous
                  </Button>
                  <Button
                    variant="contained"
                    size="large"
                    type="submit"
                    sx={{
                      mt: 2,
                      fontWeight: 1,
                      // ...bgGradient({
                      //   direction: '135deg',
                      //   startColor: theme.palette.primary.main,
                      //   endColor: theme.palette.primary.dark,
                      // }),
                      width: '100%',
                      fontSize: 20,
                    }}
                  >
                    Next
                  </Button>
                </Stack>
              </FormProvider>
            )}
            {/* <LoadingButton
                type="submit"
                variant="contained"
                sx={{
                  mt: 2,
                  fontWeight: 1,
                  ...bgGradient({
                    direction: '135deg',
                    startColor: theme.palette.primary.main,
                    endColor: theme.palette.primary.dark,
                  }),
                  width: '100%',
                  fontSize: 20,
                  borderRadius: 50,
                }}
              >
                Create New Voter
              </LoadingButton> */}
          </Card>
        </Grid>
      )}
      {newuser.passwords && (
        <FormProvider methods={passwordMethods} onSubmit={onSubmitPassword}>
          <Grid xs={12} md={8}>
            <Card
              sx={{
                p: { xs: 3, md: 5 },
                minWidth: { md: '600px' },
                mt: { xs: 5, md: 10 },
                mr: { md: 5 },
                boxShadow: '0px 0px 7px 2px rgba(0,0,0,0.15)',
                '@media (max-width:900px)': {
                  // width:380,
                },
              }}
            >
              <Stack spacing={2} sx={{ mt: 2 }}>
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
                          />
                        </IconButton>
                      </InputAdornment>
                    ),
                    style: { color: 'black' },
                  }}
                  InputLabelProps={{
                    style: { color: 'black' },
                  }}
                />
                <RHFTextField
                  name="confirmPassword"
                  label="Confirm Password"
                  type={confirmPassword.value ? 'text' : 'password'}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={confirmPassword.onToggle} edge="end">
                          <Iconify
                            icon={
                              confirmPassword.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'
                            }
                          />
                        </IconButton>
                      </InputAdornment>
                    ),
                    style: { color: 'black' },
                  }}
                  InputLabelProps={{
                    style: { color: 'black' },
                  }}
                />
                <Button variant="contained" size="large" type="submit">
                  Create New Voter
                </Button>
              </Stack>
            </Card>
          </Grid>
        </FormProvider>
      )}
    </>
  );
}

VoterNewEditForm.propTypes = {
  currentVoter: PropTypes.object,
};

const OtpField = ({ name, index }) => {
  const { control, setValue } = useFormContext();

  useEffect(() => {
    const handleBackspace = (event) => {
      if (event.key === 'Backspace' && !event.target.value) {
        const prevField = document.querySelector(`input[name=otp${index}]`);
        if (prevField) prevField.focus();
      }
    };

    const handlePaste = (event) => {
      const paste = (event.clipboardData || window.clipboardData).getData('text');
      if (paste.length === 6 && /^\d+$/.test(paste)) {
        paste.split('').forEach((char, idx) => {
          setValue(`otp${idx + 1}`, char);
        });
        event.preventDefault();
      }
    };

    const inputField = document.querySelector(`input[name=${name}]`);
    inputField.addEventListener('keydown', handleBackspace);
    inputField.addEventListener('paste', handlePaste);

    return () => {
      inputField.removeEventListener('keydown', handleBackspace);
      inputField.removeEventListener('paste', handlePaste);
    };
  }, [index, name, setValue]);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <RHFTextField
          {...field}
          type="text"
          sx={{ mx: 0.5 }}
          inputProps={{ maxLength: 1, style: { textAlign: 'center', height: 15 } }}
          onChange={(e) => {
            const { value } = e.target;
            if (/^\d?$/.test(value)) {
              setValue(name, value);
              if (value && index < 5) {
                const nextField = document.querySelector(`input[name=otp${index + 2}]`);
                if (nextField) nextField.focus();
              }
            }
          }}
        />
      )}
    />
  );
};

OtpField.propTypes = {
  name: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};
