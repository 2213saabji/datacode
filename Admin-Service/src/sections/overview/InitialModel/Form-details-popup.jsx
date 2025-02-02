/* eslint-disable no-unused-vars */
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { useMemo, useState, useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';

import Box from '@mui/material/Box';
// import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
// import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';

// import { fData } from 'src/utils/format-number';
// import { uploadUserFileInAWSS3 } from 'src/utils/aws-s3-file-handler';

import { useGetParties } from 'src/api/party';
import { useAuthContext } from 'src/auth/hooks';
import { USER_GENDER_OPTIONS } from 'src/_mock';
import { useGetVotersDetails } from 'src/api/voter';
import { createUserDetails } from 'src/api/poolManagement';
import { updateUserDetails, UpdatePopUpProfileForm } from 'src/api/user';

import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { RHFTextField, RHFAutocomplete } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export default function FormDetailsPop({ handleClose }) {
  const { user } = useAuthContext();

  const { voters: voterDetails } = useGetVotersDetails();
  const detailList = useMemo(() => voterDetails?.data || {}, [voterDetails]);

  // console.log('user---->', user)
  const [show, setShow] = useState({
    profile: true,
    user: false,
  });

  let email;
  let dateOfBirth;
  let gender;
  let firstName;
  let UserIdentityDetails;

  if (user && user.UserProfile) {
    ({
      email,
      UserProfile: { dateOfBirth, gender, firstName },
      UserIdentityDetails,
    } = user);
  }

  useEffect(() => {
    if (email && dateOfBirth && gender && firstName && UserIdentityDetails[0]?.identityNumber) {
      setShow({
        profile: false,
        user: true,
      });
    }
  }, [email, dateOfBirth, gender, firstName, UserIdentityDetails]);

  const { enqueueSnackbar } = useSnackbar();

  // Schema

  const IdentitySchema = Yup.object().shape({
    email: Yup.string().required('Email address is required'),
    identityNumber: Yup.string().required('Identity Number is required'),
    firstName: Yup.string().required('Father Name is required'),
    dateOfBirth: Yup.string().required('Date of Birth is required'),
    gender: Yup.string().required('Gender is required'),
  });

  const ProfileSchema = Yup.object().shape({
    partyId: Yup.number().required('Party Id is required'),
    // upiId: Yup.string().required('Upi Id is required'),
    epicNo: Yup.string().required('Epic No Title is required'),
    wardNo: Yup.string().required('Ward No is required'),
  });

  // const ToggleSchema = Yup.object().shape({
  //     popUpProfileForm: Yup.boolean().required('Toggle'),
  // });

  // Identity Values

  const defaultValues = useMemo(
    () => ({
      partyId: detailList?.partyId || null,
      // upiId: detailList?.upiId || '',
      epicNo: detailList?.epicNo || '',
      wardNo: detailList?.wardNo || '',
    }),
    [detailList]
  );

  const defaultIdentityValues = useMemo(
    () => ({
      email: user?.email || '',
      identityNumber:
        (user?.UserIdentityDetails && user?.UserIdentityDetails[0]?.identityNumber) || '',
      firstName: (user?.UserProfile && user?.UserProfile?.firstName) || '',
      gender: (user?.UserProfile && user?.UserProfile?.gender) || '',
      dateOfBirth: (user?.UserProfile && user?.UserProfile?.dateOfBirth) || '',
    }),
    [user]
  );

  const defaultToggleValues = useMemo(
    () => ({
      identityNumber: (user?.PopUpDetail && user?.PopUpDetail?.pupUpProfileForm) || null,
    }),
    [user]
  );

  // Methods

  const methodsProfile = useForm({
    resolver: yupResolver(ProfileSchema),
    defaultValues,
  });

  const methodsIdentity = useForm({
    resolver: yupResolver(IdentitySchema),
    defaultIdentityValues,
  });
  // const methodsToggle = useForm({
  //     resolver: yupResolver(ToggleSchema),
  //     defaultToggleValues,
  // });

  // For profile form

  const {
    handleSubmit: handleSubmitProfile,
    reset: resetProfile,
    // setValue: setValueUserPicture,
  } = methodsProfile;

  const {
    handleSubmit: handleSubmitIdentity,
    setValue: setValueUserPicture,
    reset: resetIdentity,
  } = methodsIdentity;

  const {
    handleSubmit: handleToggle,
    // setValue: setValueUserPicture,
    reset: resetToggle,
  } = methodsIdentity;

  useEffect(() => {
    if (user) {
      resetProfile(defaultValues);
    }
  }, [user, defaultValues, resetProfile]);

  useEffect(() => {
    if (user) {
      resetIdentity(defaultIdentityValues);
    }
  }, [user, defaultIdentityValues, resetIdentity]);

  // Handling Functions

  const onUpdateUser = handleSubmitIdentity(async (data) => {
    try {
      // const fulldata = { ...data, "userId": user.userId }
      const response = await updateUserDetails(data, user.accessToken);
      // console.log("response------>", response)
      if (response) {
        enqueueSnackbar('Profile Identity created successfully', { variant: 'success' });
        setShow({ profile: false, user: true });
        // handleClose()
        // localStorage.removeItem('register')
      } else {
        enqueueSnackbar('Failed to create profile Identity', { variant: 'error' });
      }
    } catch (error) {
      console.error('Error submitting profile Identity:', error.response.data.message);
      if (error.response.data.message === 'Validation error') {
        enqueueSnackbar('Email id already exist', { variant: 'error' });
      } else {
        enqueueSnackbar('An error occurred while creating profile Identity', { variant: 'error' });
      }
    }
  });

  // Toggle User status

  const handlePopUpProfile = async (userId, popUpProfileForm) => {
    try {
      await UpdatePopUpProfileForm(userId, {}, popUpProfileForm);
      window.location.reload();
    } catch (error) {
      console.error('Error updating popUpProfileForm:', error);
    }
  };

  const onSubmitCreateUserProfile = handleSubmitProfile(async (data) => {
    try {
      const response = await createUserDetails(data, user.accessToken);
      if (response) {
        enqueueSnackbar('Profile Identity Update successfully', { variant: 'success' });
        handleClose();
        setShow({ profile: false, user: false });
        localStorage.removeItem('register');
        handlePopUpProfile(user?.userId, false);
      } else {
        enqueueSnackbar('Failed to Update profile Identity', { variant: 'error' });
      }
    } catch (error) {
      console.error('Error submitting profile Identity:', error);
      enqueueSnackbar('An error occurred while Update profile Identity', { variant: 'error' });
    }
  });

  // fetching the Party  List

  const { parties: partyList } = useGetParties();

  const PartyListArr = partyList?.data || [];

  const PartyData = PartyListArr.map((list) => ({
    value: list.partyId,
    label: list.partyName,
  }));

  const PartyListDataForOptions = PartyData.map((option) => option.value);

  // fetching the Ward  List

  // const { wards: WardsList } = useGetWards();

  // const WardsListArr = WardsList?.data || [];

  // const WardData = WardsListArr.map((list) => (
  //     {
  //         value: list.wardId,
  //         label: list.wardName,
  //     }
  // ))

  // const WardDataForOptions = WardData.map((option) => option.value);

  return (
    <div>
      {show.profile && (
        <FormProvider methods={methodsIdentity} onSubmit={onUpdateUser}>
          <Grid container spacing={3}>
            <Grid xs={12} md={12}>
              {/* <Card sx={{ p: 3 }}> */}
              <Box
                rowGap={3}
                columnGap={2}
                display="grid"
                gridTemplateColumns={{
                  xs: 'repeat(1, 1fr)',
                  sm: 'repeat(1, 1fr)',
                }}
              >
                <RHFTextField name="email" label="Email Id" />

                <RHFTextField name="identityNumber" label="Aadhar Number" />

                <RHFTextField name="firstName" label="First Name" />

                <RHFTextField
                  name="dateOfBirth"
                  InputLabelProps={{ shrink: true }}
                  label="Date Of Birth"
                  type="date"
                />

                <RHFAutocomplete
                  name="gender"
                  label="Gender"
                  fullWidth
                  options={USER_GENDER_OPTIONS.map((option) => option.label)}
                  getOptionLabel={(option) => option}
                />
              </Box>

              <Stack alignItems="flex-end" sx={{ mt: 3 }}>
                <LoadingButton type="submit" variant="contained">
                  Next
                </LoadingButton>
              </Stack>
              {/* </Card> */}
            </Grid>
          </Grid>
        </FormProvider>
      )}
      {show.user && (
        <FormProvider methods={methodsProfile} onSubmit={onSubmitCreateUserProfile}>
          <Grid container spacing={3} sx={{ p: 5, height: '100%' }}>
            <Grid xs={12} md={12}>
              {/* <Card sx={{ p: 3, }}> */}
              <Box
                rowGap={3}
                columnGap={2}
                display="grid"
                gridTemplateColumns={{
                  xs: 'repeat(1, 1fr)',
                  sm: 'repeat(1, 1fr)',
                }}
              >
                <RHFAutocomplete
                  name="partyId"
                  label="Your Political Party"
                  options={PartyListDataForOptions}
                  getOptionLabel={(value) => {
                    const Party = PartyData.find((option) => option.value === value);
                    return Party ? Party.label : '';
                  }}
                />

                {/* <RHFTextField name="partyId" label="Party Name" /> */}

                {/* < RHFTextField name="upiId" label="UPI Id" /> */}

                <RHFTextField name="epicNo" label="Voter ID" />

                <RHFTextField name="wardNo" label="Ward Number" />
                {/* 
                                <RHFAutocomplete
                                    name="wardNo"
                                    label="Ward Name"
                                    options={WardDataForOptions}
                                    getOptionLabel={(value) => {
                                        const ward = WardData.find((option) => option.value === value);
                                        return ward ? ward.label : '';
                                    }}
                                /> */}
              </Box>

              <Stack alignItems="flex-end" sx={{ mt: 3 }}>
                <LoadingButton type="submit" variant="contained">
                  Save Your Profile
                </LoadingButton>
              </Stack>
              {/* </Card> */}
            </Grid>
          </Grid>
        </FormProvider>
      )}
    </div>
  );
}

FormDetailsPop.propTypes = {
  handleClose: PropTypes.string,
};
