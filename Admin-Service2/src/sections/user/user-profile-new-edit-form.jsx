import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMemo, useState, useEffect, useCallback } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';

import { fData } from 'src/utils/format-number';
import { uploadUserFileInAWSS3 } from 'src/utils/aws-s3-file-handler';

import { useGetParties } from 'src/api/party';
import { useAuthContext } from 'src/auth/hooks';
import {
  UpdateUserProfile,
  UpdateUserIdentity,
  UpdateUserAddressesses,
  uploadUserProfileImage,
} from 'src/api/user';
import {
  JOB_TITLES,
  INDIAN_CITIES,
  BOOTH_COUNTRY,
  USER_STATE_OPTIONS,
  USER_GENDER_OPTIONS,
  USER_IDENTITY_OPTIONS,
  USER_NATIONALITY_OPTIONS,
  USER_ADDRESS_TYPE_OPTIONS,
  USER_HIGHEST_QUALIFICATION_OPTIONS,
} from 'src/_mock';

import { useSnackbar } from 'src/components/snackbar';
import FormProvider, {
  RHFTextField,
  RHFAutocomplete,
  RHFUploadAvatar,
} from 'src/components/hook-form';

// ----------------------------------------------------------------------

export default function UserProfileNewEditForm() {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const [show, setShow] = useState({
    Profile: true,
    identity: false,
    address: false,
  });

  const { enqueueSnackbar } = useSnackbar();

  const { parties: partyList } = useGetParties();

  const PartyListArr = partyList?.data || [];

  const PartyData = PartyListArr.map((list) => ({
    value: list.partyId,
    label: list.partyName,
  }));

  const PartyListDataForOptions = PartyData.map((option) => option.value);

  const ProfileSchema = Yup.object().shape({
    userProfileImageDetails: Yup.mixed().nullable().required('Profile image is required'),
    firstName: Yup.string().required('First Name is required'),
    middleName: Yup.string(),
    lastName: Yup.string(),
    dateOfBirth: Yup.string().required('Date of Birth is required'),
    gender: Yup.string().required('Gender is required'),
    motherName: Yup.string().required('Mother Name is required'),
    fatherName: Yup.string().required('Father Name is required'),
    currentJobTitle: Yup.string().required('Current Job Title is required'),
    highestQualification: Yup.string().required('Qualification is required'),
    nationality: Yup.string().required('Nationality is required'),
    whatsappNumber: Yup.string()
      .min(10, 'WhatsApp number must be at least 10 digits')
      .max(10, 'WhatsApp number must not exceed 10 digits')
      .required('Number is required'),
    politicalPartyAffiliation: Yup.number().required('Current Job Title is required'),
  });

  const IdentitySchema = Yup.object().shape({
    identityType: Yup.string().required('Identity Type is required'),
    identityNumber: Yup.string().required('Identity Number is required'),
    identityImageDetails: Yup.mixed().nullable().required('Image URL is required'),
    issueDate: Yup.string().required('Issue date is required'),
  });

  const SignatureSchema = Yup.object().shape({
    streetAddress: Yup.string().required('Street Address is required'),
    userCity: Yup.string().required('City is required'),
    userState: Yup.string().required('State is required'),
    postalCode: Yup.string().required('Postal Code is required'),
    country: Yup.string().required('Country is required'),
    latitude: Yup.number().required('Latitude is required'),
    longitude: Yup.number().required('Longitude is required'),
    addressType: Yup.string().required('Address Type is required'),
  });

  const defaultValues = useMemo(
    () => ({
      firstName: (user?.UserProfile && user?.UserProfile?.firstName) || '',
      middleName: (user?.UserProfile && user?.UserProfile?.middleName) || '',
      lastName: (user?.UserProfile && user?.UserProfile?.lastName) || '',
      dateOfBirth: (user?.UserProfile && user?.UserProfile?.dateOfBirth) || '',
      gender: (user?.UserProfile && user?.UserProfile?.gender) || '',
      motherName: (user?.UserProfile && user?.UserProfile?.motherName) || '',
      fatherName: (user?.UserProfile && user?.UserProfile?.fatherName) || '',
      nationality: (user?.UserProfile && user?.UserProfile?.nationality) || '',
      highestQualification: (user?.UserProfile && user?.UserProfile?.highestQualification) || '',
      currentJobTitle: (user?.UserProfile && user?.UserProfile?.currentJobTitle) || '',
      userProfileImageDetails:
        (user?.UserProfile && user?.UserProfile?.userProfileImageDetails) || '',
      whatsappNumber: (user?.UserProfile && user?.UserProfile?.whatsappNumber) || '',
      politicalPartyAffiliation:
        (user?.UserProfile && Number(user?.UserProfile?.politicalPartyAffiliation)) || null,
    }),
    [user]
  );

  const defaultIdentityValues = useMemo(
    () => ({
      identityType: (user?.UserIdentityDetails && user?.UserIdentityDetails[0]?.identityType) || '',
      identityNumber:
        (user?.UserIdentityDetails && user?.UserIdentityDetails[0]?.identityNumber) || '',
      identityImageDetails:
        (user?.UserIdentityDetails && user?.UserIdentityDetails[0]?.identityImageDetails) || '',
      issueDate: (user?.UserIdentityDetails && user?.UserIdentityDetails[0]?.issueDate) || '',
    }),
    [user]
  );

  const defaultSignatureValues = useMemo(
    () => ({
      streetAddress: (user?.UserAddressesses && user?.UserAddressesses[0]?.streetAddress) || '',
      userCity: (user?.UserAddressesses && user?.UserAddressesses[0]?.userCity) || '',
      userState: (user?.UserAddressesses && user?.UserAddressesses[0]?.userState) || '',
      postalCode: (user?.UserAddressesses && user?.UserAddressesses[0]?.postalCode) || '',
      country: (user?.UserAddressesses && user?.UserAddressesses[0]?.country) || '',
      latitude: (user?.UserAddressesses && user?.UserAddressesses[0]?.latitude) || '',
      longitude: (user?.UserAddressesses && user?.UserAddressesses[0]?.longitude) || '',
      addressType: (user?.UserAddressesses && user?.UserAddressesses[0]?.addressType) || '',
    }),
    [user]
  );

  const methodsProfile = useForm({
    resolver: yupResolver(ProfileSchema),
    defaultValues,
  });

  const methodsIdentity = useForm({
    resolver: yupResolver(IdentitySchema),
    defaultIdentityValues,
  });

  const methodsSignature = useForm({
    resolver: yupResolver(SignatureSchema),
    defaultSignatureValues,
  });

  const {
    handleSubmit: handleSubmitProfile,
    reset: resetProfile,
    setValue: setValueUserPicture,
  } = methodsProfile;
  const {
    handleSubmit: handleSubmitIdentity,
    setValue: setValueIdentity,
    reset: resetIdentity,
  } = methodsIdentity;
  const { handleSubmit: handleSubmitSignature, reset: resetSignature } = methodsSignature;

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

  useEffect(() => {
    if (user) {
      resetSignature(defaultSignatureValues);
    }
  }, [user, defaultSignatureValues, resetSignature]);

  const onSubmitProfileupdate = handleSubmitProfile(async (data) => {
    try {
      const response = await UpdateUserProfile(
        user?.userId,
        user?.UserProfile?.userProfileId,
        data
      );
      if (response) {
        enqueueSnackbar('Profile Update successfully', { variant: 'success' });
        setShow({ Profile: false, identity: true, address: false });
      } else {
        enqueueSnackbar('Failed to Update profile', { variant: 'error' });
      }
    } catch (error) {
      console.error('Error submitting profile:', error);
      enqueueSnackbar('An error occurred while Update profile', { variant: 'error' });
    }
  });

  const onSubmitIdentityUpdate = handleSubmitIdentity(async (data) => {
    try {
      const response = await UpdateUserIdentity(
        user?.userId,
        user?.UserIdentityDetails[0]?.userIdentityId,
        data
      );
      if (response) {
        enqueueSnackbar('Profile Identity Update successfully', { variant: 'success' });
        setShow({ Profile: false, identity: false, address: true });
      } else {
        enqueueSnackbar('Failed to Update profile Identity', { variant: 'error' });
      }
    } catch (error) {
      console.error('Error submitting profile Identity:', error);
      enqueueSnackbar('An error occurred while Update profile Identity', { variant: 'error' });
    }
  });

  const onSubmitAddressessesUpdate = handleSubmitSignature(async (data) => {
    try {
      const response = await UpdateUserAddressesses(
        user?.userId,
        user?.UserAddressesses[0]?.userAddressId,
        data
      );

      if (response) {
        enqueueSnackbar('Profile Address Update successfully', { variant: 'success' });
        navigate(`/dashboard`);
        window.location.reload();
      } else {
        enqueueSnackbar('Failed to Update profile Address', { variant: 'error' });
      }
    } catch (error) {
      console.error('Error submitting profile Address:', error);
      enqueueSnackbar('An error occurred while Update profile Address', { variant: 'error' });
    }
  });

  const handleDropAvatar = useCallback(
    async (imageUrl) => {
      if (show.Profile) {
        setValueUserPicture('userProfileImageDetails', imageUrl);
        try {
          const uploadImageResponse = await uploadUserProfileImage(imageUrl, user?.userId);
          if (uploadImageResponse) {
            enqueueSnackbar('Profile Image Uploaded Successfully', { variant: 'success' });
          }
        } catch (error) {
          enqueueSnackbar('Failed To Upload Image', error);
        }
      } else if (show.identity) {
        setValueIdentity('identityImageDetails', imageUrl);
      }
    },
    [
      show.Profile,
      show.identity,
      setValueUserPicture,
      setValueIdentity,
      enqueueSnackbar,
      user?.userId,
    ]
  );

  const uploadImage = useMemo(
    () => async (file) => {
      const formData = new FormData();
      formData.append('image', file);
      const response = await uploadUserFileInAWSS3(formData);
      const imageUrl = response.data && response.data.data ? response?.data?.data : {};

      if (imageUrl) {
        handleDropAvatar(imageUrl);
        enqueueSnackbar('Uploaded successfully', { variant: 'success' });
      } else {
        console.error('Error in uploading file:', response);
        enqueueSnackbar('Error while uploading', { variant: 'error' });
      }
    },
    [enqueueSnackbar, handleDropAvatar]
  );

  const handleDropUserPicture = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (file) {
        uploadImage(newFile);
      }
    },
    [uploadImage]
  );

  // for user identity image

  // const handleDropIdentity = useCallback(
  //   (acceptedFiles) => {
  //     const file = acceptedFiles[0];

  //     const newFile = Object.assign(file, {
  //       preview: URL.createObjectURL(file),
  //     });

  //     if (file) {
  //       uploadFileInAWSS3(newFile)
  //     }
  //   },
  //   [uploadFileInAWSS3]
  // );

  return (
    <div>
      {show.Profile && (
        <FormProvider
          methods={methodsProfile}
          onSubmit={user?.UserProfile && onSubmitProfileupdate}
        >
          <Grid container spacing={3}>
            <Grid xs={12} md={4}>
              <Card sx={{ pt: 10, pb: 5, px: 3 }}>
                <Box sx={{ mb: 5 }}>
                  <RHFUploadAvatar
                    name="userProfileImageDetails"
                    maxSize={512017}
                    onDrop={handleDropUserPicture}
                    helperText={
                      <Typography
                        variant="caption"
                        sx={{
                          mt: 3,
                          mx: 'auto',
                          display: 'block',
                          textAlign: 'center',
                          color: 'text.disabled',
                        }}
                      >
                        Profile Picture
                        <br /> max size of {fData(512017)}
                      </Typography>
                    }
                  />
                </Box>
              </Card>
            </Grid>

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
                  <RHFTextField name="firstName" label="First Name" />
                  <RHFTextField name="middleName" label="Middle Name" />
                  <RHFTextField name="lastName" label="Last Name" />
                  <RHFTextField
                    name="dateOfBirth"
                    InputLabelProps={{ shrink: true }}
                    label="Date Of Birth"
                    type="date"
                  />
                  <RHFTextField name="fatherName" label="Father Name" />
                  <RHFTextField name="motherName" label="Mother Name" />
                  <RHFAutocomplete
                    name="gender"
                    label="Gender"
                    fullWidth
                    options={USER_GENDER_OPTIONS.map((option) => option.label)}
                    getOptionLabel={(option) => option}
                  />
                  <RHFAutocomplete
                    name="nationality"
                    label="Nationality"
                    fullWidth
                    options={USER_NATIONALITY_OPTIONS.map((option) => option.label)}
                    getOptionLabel={(option) => option}
                  />
                  <RHFTextField name="whatsappNumber" label="Phone No." />

                  <RHFAutocomplete
                    name="politicalPartyAffiliation"
                    label="Your Political Party"
                    options={PartyListDataForOptions}
                    getOptionLabel={(value) => {
                      const Party = PartyData.find((option) => option.value === value);
                      return Party ? Party.label : '';
                    }}
                  />

                  <RHFAutocomplete
                    name="currentJobTitle"
                    label="Current Job Title"
                    placeholder="Choose a job title"
                    fullWidth
                    options={JOB_TITLES.map((option) => option.label)}
                    getOptionLabel={(option) => option}
                  />
                  <RHFAutocomplete
                    name="highestQualification"
                    label="Highest Qualification"
                    fullWidth
                    options={USER_HIGHEST_QUALIFICATION_OPTIONS.map((option) => option.label)}
                    getOptionLabel={(option) => option}
                  />
                </Box>
                <Stack alignItems="flex-end" sx={{ mt: 3 }}>
                  <LoadingButton type="submit" variant="contained">
                    Save Changes
                  </LoadingButton>
                </Stack>
              </Card>
            </Grid>
          </Grid>
        </FormProvider>
      )}
      {show.identity && (
        <FormProvider
          methods={methodsIdentity}
          onSubmit={
            user?.UserIdentityDetails &&
            user?.UserIdentityDetails.length === 0 &&
            onSubmitIdentityUpdate
          }
        >
          <Grid container spacing={3}>
            <Grid xs={12} md={4}>
              <Card sx={{ pt: 10, pb: 5, px: 3 }}>
                <Box sx={{ mb: 5 }}>
                  <RHFUploadAvatar
                    name="identityImageDetails"
                    maxSize={512017}
                    onDrop={handleDropUserPicture}
                    helperText={
                      <Typography
                        variant="caption"
                        sx={{
                          mt: 3,
                          mx: 'auto',
                          display: 'block',
                          textAlign: 'center',
                          color: 'text.disabled',
                        }}
                      >
                        Allowed *.jpeg, *.jpg, *.png, *.gif
                        <br /> max size of {fData(512017)}
                      </Typography>
                    }
                  />
                </Box>
              </Card>
            </Grid>

            <Grid xs={12} md={8}>
              <Card sx={{ p: 3 }}>
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
                    name="identityType"
                    label="identityType"
                    placeholder="Choose Identity"
                    fullWidth
                    options={USER_IDENTITY_OPTIONS.map((option) => option.label)}
                    getOptionLabel={(option) => option}
                  />

                  <RHFTextField name="identityNumber" label="Identity Number" />
                  <RHFTextField
                    name="issueDate"
                    InputLabelProps={{ shrink: true }}
                    label="Date Of Issue"
                    type="date"
                  />
                </Box>

                <Stack alignItems="flex-end" sx={{ mt: 3 }}>
                  <LoadingButton type="submit" variant="contained">
                    Save Changes
                  </LoadingButton>
                </Stack>
              </Card>
            </Grid>
          </Grid>
        </FormProvider>
      )}
      {show.address && (
        <FormProvider
          methods={methodsSignature}
          onSubmit={user?.UserAddressesses.length === 0 && onSubmitAddressessesUpdate}
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
                    sm: 'repeat(1, 1fr)',
                  }}
                >
                  <RHFTextField name="streetAddress" label="Street Address" />

                  <RHFAutocomplete
                    name="userCity"
                    label="City"
                    placeholder="Choose your City"
                    fullWidth
                    options={INDIAN_CITIES.map((option) => option.label)}
                    getOptionLabel={(option) => option}
                  />

                  <RHFAutocomplete
                    name="userState"
                    label="State"
                    placeholder="Choose State"
                    fullWidth
                    options={USER_STATE_OPTIONS.map((option) => option.label)}
                    getOptionLabel={(option) => option}
                  />
                  <RHFTextField name="postalCode" label="Postal Code" />

                  <RHFAutocomplete
                    name="country"
                    label="Country"
                    placeholder="Choose your Country"
                    fullWidth
                    options={BOOTH_COUNTRY.map((option) => option.label)}
                    getOptionLabel={(option) => option}
                  />
                  <RHFTextField name="latitude" label="Latitude" />
                  <RHFTextField name="longitude" label="Longitude" />
                  <RHFAutocomplete
                    name="addressType"
                    label="Address Type"
                    placeholder="Choose Address Type"
                    fullWidth
                    options={USER_ADDRESS_TYPE_OPTIONS.map((option) => option.label)}
                    getOptionLabel={(option) => option}
                  />
                </Box>

                <Stack alignItems="flex-end" sx={{ mt: 3 }}>
                  <LoadingButton type="submit" variant="contained">
                    Save Changes
                  </LoadingButton>
                </Stack>
              </Card>
            </Grid>
          </Grid>
        </FormProvider>
      )}
    </div>
  );
}

UserProfileNewEditForm.propTypes = {};
