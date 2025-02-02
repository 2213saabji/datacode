/* eslint-disable no-unused-vars */
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMemo, useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import { useTheme } from '@mui/material/styles';
import LoadingButton from '@mui/lab/LoadingButton';
import { TextField, CardHeader } from '@mui/material';

import { useGetParties } from 'src/api/party';
import { useAuthContext } from 'src/auth/hooks';
import { useGetProductRolesList } from 'src/api/product_roles';
import {
  UserPincodeData,
  UpdateUserProfile,
  UpdateUserIdentity,
  createUserIdentity,
  UpdateUserAddressesses,
} from 'src/api/user';
import {
  JOB_TITLES,
  religionsInIndia,
  USER_GENDER_OPTIONS,
  USER_ADDRESS_TYPE_OPTIONS,
  USER_HIGHEST_QUALIFICATION_OPTIONS,
} from 'src/_mock';

import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { RHFTextField, RHFAutocomplete } from 'src/components/hook-form';

import Passport from './Assets/Passport.png';
import VoterCard from './Assets/VoterCard.png';
import AadharCard from './Assets/aadhaarCard.png';
import CandidateNewEditForm from './candidate-new-edit-form';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------
const TABS = [
  {
    value: 'VoterId',
    label: 'Voter ID',
  },
  {
    value: 'AadhaarNo',
    label: 'Aadhaar No',
  },
  {
    value: 'PassPortId',
    label: 'PassPort ID',
  },
];
export default function UserProfileNewEditForm({ newVoter, setNewVoter, voter, candidates }) {
  const navigate = useNavigate();
  const theme = useTheme();

  const [selectedIdentity, setSelectedIdentity] = useState('VoterId');
  const handleIdentityChange = (event, value) => {
    const selectedTab = TABS.find((tab) => tab.label === value);
    setSelectedIdentity(selectedTab ? selectedTab.value : '');
  };
  const { user: userdata, refetch } = useAuthContext();
  const [user, setUser] = useState(userdata);
  const [pincodeState, setPincodeState] = useState('');
  const [districtOptions, setDistrictOptions] = useState([]);
  const [show, setShow] = useState({
    Profile: true,
    identity: false,
    address: false,
  });
  const { enqueueSnackbar } = useSnackbar();

  const { parties: partyList } = useGetParties();
  const [currentTab, setCurrentTab] = useState('VoterId');
  const handleChangeTab = useCallback((event, newValue) => {
    const selectedTab = TABS.find((tab) => tab.label === newValue);
    setCurrentTab(selectedTab ? selectedTab.value : '');
  }, []);
  const { users } = useGetProductRolesList(user.accessToken);

  const PartyListArr = partyList?.data || [];

  const PartyData = PartyListArr.map((list) => ({
    value: list.partyId,
    label: list.partyName,
  }));

  const PartyListDataForOptions = PartyData.map((option) => option.value);
  const formatDateToString = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const uniqueProducts = useMemo(
    () =>
      users?.data?.map((item) => ({
        label: item?.productName,
        value: item?.productId,
      })) || [],
    [users]
  );

  const ProfileSchema = Yup.object().shape({
    firstName: Yup.string().required('First Name is required'),
    middleName: Yup.string(),
    lastName: Yup.string(),
    // dateOfBirth: Yup.string().required('Date of Birth is required'),
    dateOfBirth: Yup.date()
      .max(new Date(), 'Date of Birth cannot be today or a future date.')
      .required('Date of Birth is required'),
    gender: Yup.string().required('Gender is required'),
    motherName: Yup.string().required('Mother Name is required'),
    fatherName: Yup.string().required('Father Name is required'),
    currentJobTitle: Yup.string().required('Current Job Title is required'),
    highestQualification: Yup.string().required('Qualification is required'),
    religion: Yup.string().required('Religion is required'),
    // nationality: Yup.string().required('Nationality is required'),
    tehsilName: Yup.string().required('tehsilName is required'),
    whatsappNumber: Yup.string()
      .min(10, 'WhatsApp number must be at least 10 digits')
      .max(10, 'WhatsApp number must not exceed 10 digits')
      .required('Number is required'),
    politicalPartyAffiliation: Yup.number().required('Select Your Political Party'),
  });

  // const ProfilePrictureSchema = Yup.object().shape({
  //   userProfileImageDetails: Yup.mixed().nullable().required('Profile image is required'),
  // });

  const IdentitySchema = Yup.object().shape({
    identityType: Yup.string(),
    // .required('Identity Type is required'),
    identityNumber: Yup.string().required('Identity Number is required'),
    // identityImageDetails: Yup.mixed().nullable().required('Image URL is required'),
    // issueDate: Yup.string().required('Issue date is required'),
    upiId: Yup.string(),
  });
  const defaultIdentityValues = useMemo(
    () => ({
      identityNumber: '',
      upiId: '',
      // issueDate: '',
    }),
    []
  );

  const SignatureSchema = Yup.object().shape({
    streetAddress: Yup.string().required('Street Address is required'),
    userCity: Yup.string().required('District is required'),
    userState: Yup.string().required('State is required'),
    postalCode: Yup.string().required('Pincode Number is required'),
    country: Yup.string().required('Country is required'),
    // latitude: Yup.string(),
    // longitude: Yup.string(),
    wardNo: Yup.number().required('wardNo is required'),
    panchayatName: Yup.string().required('panchayatName is required'),
    addressType: Yup.string().required('Address Type is required'),
    // State: Yup.string().required('State is required'),
    // Pincode: Yup.string().required('Pincode Number is required'),
    // Name: Yup.string().required('Postal Area is required'),
  });

  // const defaultSignatureValues = useMemo(
  //   () => ({
  //     streetAddress: (user?.UserAddressesses && user?.UserAddressesses[0]?.streetAddress) || '',
  //     userCity: (user?.UserAddressesses && user?.UserAddressesses[0]?.userCity) || '',
  //     userState: (user?.UserAddressesses && user?.UserAddressesses[0]?.userState) || '',
  //     postalCode: (user?.UserAddressesses && user?.UserAddressesses[0]?.postalCode) || '',
  //     country: (user?.UserAddressesses && user?.UserAddressesses[0]?.country) || '',
  //     wardNo: (user?.UserAddressesses && user?.UserAddressesses[0]?.wardNo) || "",
  //     panchayatName: (user?.UserAddressesses && user?.UserAddressesses[0]?.panchayatName) || "",
  //     addressType: (user?.UserAddressesses && user?.UserAddressesses[0]?.addressType) || '',
  //     // latitude: (user?.UserAddressesses && user?.UserAddressesses[0]?.latitude) || '',
  //     // longitude: (user?.UserAddressesses && user?.UserAddressesses[0]?.longitude) || '',
  //   }),
  //   [user]
  // );

  const defaultValues = useMemo(
    () => ({
      firstName: (user?.UserProfile && user?.UserProfile?.firstName) || '',
      middleName: (user?.UserProfile && user?.UserProfile?.middleName) || '',
      lastName: (user?.UserProfile && user?.UserProfile?.lastName) || '',
      dateOfBirth: (user?.UserProfile && user?.UserProfile?.dateOfBirth) || '',
      gender: (user?.UserProfile && user?.UserProfile?.gender) || '',
      motherName: (user?.UserProfile && user?.UserProfile?.motherName) || '',
      fatherName: (user?.UserProfile && user?.UserProfile?.fatherName) || '',
      religion: (user?.UserProfile && user?.UserProfile?.religion) || '',
      // nationality: (user?.UserProfile && user?.UserProfile?.nationality) || '',
      tehsilName: (user?.UserProfile && user?.UserProfile?.tehsilName) || '',
      highestQualification: (user?.UserProfile && user?.UserProfile?.highestQualification) || '',
      currentJobTitle: (user?.UserProfile && user?.UserProfile?.currentJobTitle) || '',
      whatsappNumber: (user?.UserProfile && user?.UserProfile?.whatsappNumber) || '',
      politicalPartyAffiliation:
        (user?.UserProfile && Number(user?.UserProfile?.politicalPartyAffiliation)) || null,
    }),
    [user]
  );

  // const defaultValuesProfilePicture = useMemo(
  //   () => ({
  //     userProfileImageDetails:
  //       (user?.UserProfile && user?.UserProfile?.userProfileImageDetails) || '',
  //   }),
  //   [user]
  // );

  // const defaultIdentityValues = useMemo(
  //   () => ({
  //     identityType: (user?.UserIdentityDetails && user?.UserIdentityDetails[0]?.identityType) || '',
  //     identityNumber:
  //       (user?.UserIdentityDetails && user?.UserIdentityDetails[0]?.identityNumber) || '',
  //     identityImageDetails:
  //       (user?.UserIdentityDetails && user?.UserIdentityDetails[0]?.identityImageDetails) || '',
  //     issueDate: (user?.UserIdentityDetails && user?.UserIdentityDetails[0]?.issueDate) || '',
  //   }),
  //   [user]
  // );

  const methodsProfile = useForm({
    resolver: yupResolver(ProfileSchema),
    defaultValues,
  });

  // const methodsProfilePictureUpload = useForm({
  //   resolver: yupResolver(ProfilePrictureSchema),
  //   defaultValuesProfilePicture,
  // });

  const methodsIdentity = useForm({
    resolver: yupResolver(IdentitySchema),
    defaultIdentityValues,
  });

  const methodsSignature = useForm({
    resolver: yupResolver(SignatureSchema),
    defaultValues: {
      streetAddress: (user?.UserAddressesses && user?.UserAddressesses[0]?.streetAddress) || '',
      userCity: (user?.UserAddressesses && user?.UserAddressesses[0]?.userCity) || '',
      userState: (user?.UserAddressesses && user?.UserAddressesses[0]?.userState) || '',
      postalCode: (user?.UserAddressesses && user?.UserAddressesses[0]?.postalCode) || '',
      country: (user?.UserAddressesses && user?.UserAddressesses[0]?.country) || '',
      // Pincode: '',
      // State:  '',
      // Name: '',
      wardNo: (user?.UserAddressesses && user?.UserAddressesses[0]?.wardNo) || '',
      panchayatName: (user?.UserAddressesses && user?.UserAddressesses[0]?.panchayatName) || '',
      addressType: (user?.UserAddressesses && user?.UserAddressesses[0]?.addressType) || '',
      // latitude: (user?.UserAddressesses && user?.UserAddressesses[0]?.latitude) || '',
      // longitude: (user?.UserAddressesses && user?.UserAddressesses[0]?.longitude) || '',
    },
  });

  const {
    handleSubmit: handleSubmitSignature,
    control,
    reset: resetSignature,
    watch,
  } = methodsSignature;
  const { handleSubmit: handleSubmitProfile, reset: resetProfile } = methodsProfile;
  const {
    handleSubmit: handleSubmitIdentity,
    setValue: setValueIdentity,
    reset: resetIdentity,
  } = methodsIdentity;
  const val = watch();
  // const { setValue: setValueUserPicture } = methodsProfilePictureUpload;

  // useEffect(() => {
  //   if (user) {
  //     resetProfile(defaultValues);
  //   }
  // }, [user, defaultValues, resetProfile]);

  // useEffect(() => {
  //   if (user) {
  //     resetIdentity(defaultIdentityValues);
  //   }
  // }, [user, defaultIdentityValues, resetIdentity]);

  // useEffect(() => {
  //   if (user) {
  //     resetSignature(defaultSignatureValues);
  //   }
  // }, [user, defaultSignatureValues, resetSignature]);

  const validateDateOfBirth = (value) => {
    const selectedDate = new Date(value);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set the time to 00:00:00 to only compare dates

    if (selectedDate >= today) {
      enqueueSnackbar('Date of Birth cannot be today or a future date.', { variant: 'error' });
      return false;
    }
    return true;
  };

  const onSubmitProfileupdate = handleSubmitProfile(async (data) => {
    try {
      const { dateOfBirth, ...restdata } = data;
      const newdateobj = { ...restdata, dateOfBirth: formatDateToString(dateOfBirth) };

      const response = await UpdateUserProfile(
        user?.userId,
        user?.UserProfile?.userProfileId,
        newdateobj,
        user?.accessToken
      );
      if (response) {
        enqueueSnackbar('Profile Update successfully', { variant: 'success' });
        // setShow({ Profile: false, identity: false, address: true });
        refetch(user.accessToken);

      } else {
        enqueueSnackbar('Failed to Update profile', { variant: 'error' });
      }
    } catch (error) {
      console.error('Error submitting profile:', error);
      enqueueSnackbar('An error occurred while Update profile', { variant: 'error' });
    }
  });

  //   function findupi(){
  // // const dataaa=[{identitydetails:null},{identitydetails:"hello"},{identitydetails:null}]
  // const result = dataaa.find(item => item.identitydetails !== null);
  // console.log("ressss",result)
  //   }
  // useEffect(()=>{
  // findupi();
  // },[])
  const onSubmitIdentityCreate = handleSubmitIdentity(async (data) => {
    try {
      // eslint-disable-next-line no-nested-ternary
      let IdType;
      if (currentTab === 'VoterId') {
        IdType = 'VOTER';
      } else if (currentTab === 'AadhaarNo') {
        IdType = 'AADHAAR';
      } else {
        IdType = 'PASSPORT';
      }

      const dataToCreate = {
        userId: user?.userId,
        identityType: IdType,
        ...data,
      };

      const response = await createUserIdentity(dataToCreate);
      if (response) {
        enqueueSnackbar('Profile Identity Create successfully', { variant: 'success' });
        resetIdentity();
        refetch(user.accessToken);
      } else {
        enqueueSnackbar('Failed to Create profile Identity', { variant: 'error' });
      }
    } catch (error) {
      console.error('Error submitting profile Identity:', error);
      enqueueSnackbar('An error occurred while Create profile Identity', { variant: 'error' });
    }
  });

  const onSubmitIdentityUpdate = handleSubmitIdentity(async (data) => {
    try {
      // eslint-disable-next-line no-nested-ternary
      let IdType;
      if (currentTab === 'VoterId') {
        IdType = 'VOTER';
      } else if (currentTab === 'AadhaarNo') {
        IdType = 'AADHAAR';
      } else {
        IdType = 'PASSPORT';
      }
      const userIdentityobj = user.UserIdentityDetails.filter((obj) => obj.identityType === IdType);

      const dataToCreate = {
        identityType: IdType,
        ...data,
      };
      const response = await UpdateUserIdentity(
        user?.userId,
        userIdentityobj[0].userIdentityId,
        dataToCreate
      );
      if (response) {
        enqueueSnackbar('Profile Identity Update successfully', { variant: 'success' });
        resetIdentity();
        refetch(user.accessToken);
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
        // navigate(`/dashboard`);
        refetch(user.accessToken);
      } else {
        enqueueSnackbar('Failed to Update profile Address', { variant: 'error' });
      }
    } catch (error) {
      console.error('Error submitting profile Address:', error);
      enqueueSnackbar('An error occurred while Update profile Address', { variant: 'error' });
    }
  });

  async function handleSubmitPincode(data) {
    try {
      const response = await UserPincodeData(data);
      setDistrictOptions(response.data);
      if (response?.data[0]?.Status === 'Success') {
        return response.data[0].PostOffice;
      }
      return 'nodata';
    } catch (error) {
      console.error('Error submitting profile Address:', error);
      enqueueSnackbar('An error occurred while Update profile Address', { variant: 'error' });
      return 'error';
    }
  }

  // const handleDropAvatar = useCallback(
  //   async (imageUrl) => {
  //     if (show.Profile) {
  //       try {
  //         const uploadImageResponse = await uploadUserProfileImage(imageUrl, user?.userId);

  //         if (uploadImageResponse) {
  //           setValueUserPicture('userProfileImageDetails', imageUrl);
  //           enqueueSnackbar('Profile Image Uploaded Successfully', { variant: 'success' });
  //         }
  //       } catch (error) {
  //         enqueueSnackbar('Failed To Upload Image', error);
  //       }
  //     } else if (show.identity) {
  //       setValueIdentity('identityImageDetails', imageUrl);
  //     }
  //   },
  //   [
  //     show.Profile,
  //     show.identity,
  //     setValueUserPicture,
  //     setValueIdentity,
  //     enqueueSnackbar,
  //     user?.userId,
  //   ]
  // );

  // const handleUpdateAvatar = useCallback(
  //   async (imageUrl) => {
  //     if (show.Profile) {
  //       try {
  //         const uploadImageResponse = await UpdateUserProfileImage(imageUrl, user?.userId);

  //         if (uploadImageResponse) {
  //           setValueUserPicture('userProfileImageDetails', imageUrl);
  //           enqueueSnackbar('Profile Image Uploaded Successfully', { variant: 'success' });
  //         }
  //       } catch (error) {
  //         enqueueSnackbar('Failed To Upload Image', error);
  //       }
  //     } else if (show.identity) {
  //       setValueIdentity('identityImageDetails', imageUrl);
  //     }
  //   },
  //   [show.Profile, show.identity, setValueUserPicture, setValueIdentity, enqueueSnackbar, user]
  // );

  // const uploadImage = useMemo(
  //   () => async (file) => {
  //     try {
  //       const compressedFile = await imageCompression(file, {
  //         maxSizeMB: 0.5,
  //         maxWidthOrHeight: 800,
  //       });

  //       const formData = new FormData();
  //       formData.append('image', compressedFile);

  //       const response = await uploadclaimFileInAWSS3(formData);

  //       const imageUrl = response.data && response.data.data ? response.data.data : {};
  //       if (imageUrl) {
  //         if (user?.UserProfile?.userProfileImageDetails?.preview) {
  //           handleUpdateAvatar(imageUrl);
  //         } else {
  //           handleDropAvatar(imageUrl);
  //         }
  //       } else {
  //         console.error('Error in uploading file:', response);
  //         enqueueSnackbar('Error while uploading', { variant: 'error' });
  //       }
  //     } catch (error) {
  //       console.error('Error compressing image:', error);
  //       enqueueSnackbar('Error while compressing image', { variant: 'error' });
  //     }
  //   },
  //   [handleDropAvatar, handleUpdateAvatar, enqueueSnackbar, user]
  // );

  // const handleDropUserPicture = useCallback(
  //   (acceptedFiles) => {
  //     const file = acceptedFiles[0];

  //     const newFile = Object.assign(file, {
  //       preview: URL.createObjectURL(file),
  //     });

  //     if (file) {
  //       uploadImage(newFile);
  //     }
  //   },
  //   [uploadImage]
  // );

  const checkIdentity = (e) => {
    e.preventDefault();
    // eslint-disable-next-line no-nested-ternary
    let IdType;
    if (currentTab === 'VoterId') {
      IdType = 'VOTER';
    } else if (currentTab === 'AadhaarNo') {
      IdType = 'AADHAAR';
    } else {
      IdType = 'PASSPORT';
    }
    if (user?.UserIdentityDetails.length === 0) {
      return false;
    }
    return user.UserIdentityDetails.some((obj) => obj.identityType === IdType);
  };

  const roleShowFunction = async (event) => {
    const { value } = event.target;
    if (value.length === 6) {
      try {
        const res = await handleSubmitPincode(value);
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  const districtData = districtOptions.map((list) => ({
    value: list.PostOffice?.[0]?.District,
    label: list.PostOffice?.[0]?.District,
  }));
 
  const districtDataOptions = districtData?.map((option) => option.value);
 
  const stateData = districtOptions?.map((list) => ({
    value: list.PostOffice?.[0]?.State,
    label: list.PostOffice?.[0]?.State,
  }));
 
  const stateDataOptions = stateData?.map((option) => option.value);
 
  const countryData = districtOptions?.map((list) => ({
    value: list.PostOffice?.[0]?.Country,
    label: list.PostOffice?.[0]?.Country,
  }));
 
  const countryDataOptions = countryData?.map((option) => option.value);


  return (
    <div>
      {show.Profile && (
        <>
          <Box
            rowGap={3}
            columnGap={2}
            display="grid"
            gridTemplateColumns={{
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(2, 1fr)',
            }}
            sx={{ mb: 5 }}
          >
            {/* <FormProvider methods={methodsProfilePictureUpload}>
              <Card sx={{ pt: 10, pb: 10, px: 3 }}>
                <Box sx={{ mb: 12, mt: 11 }}>
                  <RHFUploadAvatar
                    name="userProfileImageDetails"
                    maxSize={8388608}
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
                        <br /> max size of {fData(8388608)}
                      </Typography>
                    }
                  />
                </Box>
              </Card>
            </FormProvider> */}

            <Box>
              <FormProvider
                methods={methodsProfile}
                onSubmit={user?.UserProfile && onSubmitProfileupdate}
              >
                <Grid>
                  <Grid xs={12} md={8}>
                    <Card sx={{ p: 3 }}>
                      <CardHeader title="PROFILE DETAILS FORM" sx={{ pl: 0, mb: 3 }} />
                      <Box
                        rowGap={3}
                        columnGap={2}
                        display="grid"
                        gridTemplateColumns={{
                          xs: 'repeat(1, 1fr)',
                          sm: 'repeat(2, 1fr)',
                        }}
                      >
                        <RHFTextField
                          name="firstName"
                          label={
                            <span>
                              First Name<span style={{ color: 'red' }}> *</span>
                            </span>
                          }
                        />
                        <RHFTextField name="middleName" label="Middle Name" />
                        <RHFTextField name="lastName" label="Last Name" />
                        <RHFTextField
                          name="dateOfBirth"
                          InputLabelProps={{ shrink: true }}
                          label={
                            <span>
                              Date Of Birth<span style={{ color: 'red' }}> *</span>
                            </span>
                          }
                          type="date"
                          validate={validateDateOfBirth}
                        />
                        <RHFTextField
                          name="fatherName"
                          label={
                            <span>
                              Father/Spouse Name<span style={{ color: 'red' }}> *</span>
                            </span>
                          }
                        />
                        <RHFTextField
                          name="motherName"
                          label={
                            <span>
                              Mother Name<span style={{ color: 'red' }}> *</span>
                            </span>
                          }
                        />
                        <RHFAutocomplete
                          name="gender"
                          label={
                            <span>
                              Gender<span style={{ color: 'red' }}> *</span>
                            </span>
                          }
                          fullWidth
                          options={USER_GENDER_OPTIONS.map((option) => option.label)}
                          getOptionLabel={(option) => option}
                        />
                        <RHFAutocomplete
                          name="religion"
                          label={
                            <span>
                              Religion<span style={{ color: 'red' }}> *</span>
                            </span>
                          }
                          fullWidth
                          options={religionsInIndia.map((option) => option)}
                          getOptionLabel={(option) => option}
                        />
          
                        <RHFTextField
                          name="tehsilName"
                          label={
                            <span>
                              Tehsil Name<span style={{ color: 'red' }}> *</span>
                            </span>
                          }
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
                          name="whatsappNumber"
                          label={
                            <span>
                              Phone No.<span style={{ color: 'red' }}> *</span>
                            </span>
                          }
                        />

                        <RHFAutocomplete
                          name="politicalPartyAffiliation"
                          label={
                            <span>
                              Your Political Party<span style={{ color: 'red' }}> *</span>
                            </span>
                          }
                          options={PartyListDataForOptions}
                          getOptionLabel={(value) => {
                            const Party = PartyData.find((option) => option.value === value);
                            return Party ? Party.label : '';
                          }}
                        />
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
                        />
                        <RHFAutocomplete
                          name="highestQualification"
                          label={
                            <span>
                              Highest Qualification<span style={{ color: 'red' }}> *</span>
                            </span>
                          }
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
              {user?.userRoleId === 2 && candidates?.data?.length > 0 && (
                <CandidateNewEditForm currentCandidate={candidates} />
              )}
            </Box>
            <Box>
              <FormProvider methods={methodsSignature} onSubmit={onSubmitAddressessesUpdate}>
                <Grid sx={{ mb: 4 }}>
                  <Grid xs={12} md={8}>
                    <Card sx={{ p: 3 }}>
                      <CardHeader title="ADDRESS DETAILS FORM" sx={{ pl: 0, mb: 3 }} />
                      <Box
                        rowGap={3}
                        columnGap={2}
                        display="grid"
                        gridTemplateColumns={{
                          xs: 'repeat(1, 1fr)',
                          sm: 'repeat(2, 1fr)',
                        }}
                      >
                        <RHFTextField
                          name="streetAddress"
                          label={
                            <span>
                              Street Address<span style={{ color: 'red' }}> *</span>
                            </span>
                          }
                        />

                        <Controller
                          name="postalCode"
                          control={control}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              label={
                                <span>
                                  Choose your Pincode<span style={{ color: 'red' }}> *</span>
                                </span>
                              }
                              onChange={(e) => {
                                field.onChange(e);
                                roleShowFunction(e);
                              }}
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
                          )}
                        />

                        <RHFAutocomplete
                          name="userCity"
                          label={
                            <span>
                              District<span style={{ color: 'red' }}> *</span>
                            </span>
                          }
                          placeholder="Choose your District"
                          fullWidth
                          options={districtDataOptions}
                          getOptionLabel={(option) => option}
                        />

                        <RHFAutocomplete
                          name="userState"
                          label={
                            <span>
                              State<span style={{ color: 'red' }}> *</span>
                            </span>
                          }
                          placeholder="Choose State"
                          fullWidth
                          options={stateDataOptions}
                          getOptionLabel={(option) => option}
                        />

                        <RHFAutocomplete
                          name="country"
                          label={
                            <span>
                              Country<span style={{ color: 'red' }}> *</span>
                            </span>
                          }
                          placeholder="Choose your Country"
                          fullWidth
                          options={countryDataOptions}
                          getOptionLabel={(option) => option}
                        />
                        {/* <RHFTextField name="latitude" label={<span>Latitude</span>} />
                        <RHFTextField name="longitude" label={<span>Longitude</span>} /> */}
                        <RHFTextField
                          name="wardNo"
                          label="Ward No."
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
                          name="panchayatName"
                          label="Panchayat Name"
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
                        <RHFAutocomplete
                          name="addressType"
                          label={
                            <span>
                              Address Type<span style={{ color: 'red' }}> *</span>
                            </span>
                          }
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
              {/* <VoterNewEditForm voterEdit={voter} newVoter={newVoter} setNewVoter={setNewVoter} /> */}
            </Box>
          </Box>

          <Box
            rowGap={3}
            columnGap={2}
            display="grid"
            sx={{ mt: 5 }}
            gridTemplateColumns={{
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(1, 1fr)',
            }}
          >
            <FormProvider
              methods={methodsIdentity}
              onSubmit={(e) =>
                checkIdentity(e) ? onSubmitIdentityUpdate() : onSubmitIdentityCreate()
              }
            >
              <Grid xs={12} md={8}>
                <Card>
                  <CardHeader title="IDENTITY VERIFICATION" sx={{ textAlign: 'center', mb: 2 }} />
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
                      <Card sx={{ height: '300px', display: 'flex', justifyContent: 'center' }}>
                        {currentTab === 'VoterId' && (
                          <img height="100%" src={VoterCard} alt="voterId" />
                        )}
                        {currentTab === 'PassPortId' && (
                          <img height="100%" src={Passport} alt="Passport" />
                        )}
                        {currentTab === 'AadhaarNo' && (
                          <img height="100%" width="100%" src={AadharCard} alt="aadhaarCard" />
                        )}
                      </Card>
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
                          label="Choose your Identity"
                          fullWidth
                          options={TABS.map((option) => option.label)}
                          getOptionLabel={(option) => option}
                          onChange={handleChangeTab}
                        />
                        {currentTab === 'VoterId' && (
                          <>
                            <RHFTextField name="identityNumber" label="Epic Id/Number" />
                            <RHFTextField
                              sx={{ mt: 2 }}
                              name="upiId"
                              label="UPI ID"
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
                          </>
                        )}
                        {currentTab === 'AadhaarNo' && (
                          <>
                            <RHFTextField name="identityNumber" label="Aadhaar/Number" />
                            <RHFTextField
                              sx={{ mt: 2 }}
                              name="upiId"
                              label="UPI ID"
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
                          </>
                        )}
                        {currentTab === 'PassPortId' && (
                          <>
                            <RHFTextField name="identityNumber" label="PassPort/Number" />
                            <RHFTextField
                              sx={{ mt: 2 }}
                              name="upiId"
                              label="UPI ID"
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
                          </>
                        )}
                      </Box>
                    </Box>
                    <Stack alignItems="flex-end" sx={{ mt: 3 }}>
                      <LoadingButton type="submit" variant="contained">
                        Save Changes
                      </LoadingButton>
                    </Stack>
                  </Card>
                </Card>
              </Grid>
            </FormProvider>
          </Box>
        </>
      )}
      {/* {show.identity && (
        <Box
          rowGap={3}
          columnGap={2}
          display="grid"
          gridTemplateColumns={{
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(1, 1fr)',
          }}
        ></Box>
      )} */}
      {/* {show.address && (
        <FormProvider methods={methodsSignature} onSubmit={onSubmitAddressessesUpdate}>
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
                  <RHFTextField name="streetAddress" label={<span>Street Address<span style={{ color: 'red' }}> *</span></span>} />

                  <RHFAutocomplete
                    name="userCity"
                    label={<span>City<span style={{ color: 'red' }}> *</span></span>}
                    placeholder="Choose your City"
                    fullWidth
                    options={INDIAN_CITIES.map((option) => option.label)}
                    getOptionLabel={(option) => option}
                  />

                  <RHFAutocomplete
                    name="userState"
                    label={<span>State<span style={{ color: 'red' }}> *</span></span>}
                    placeholder="Choose State"
                    fullWidth
                    options={USER_STATE_OPTIONS.map((option) => option.label)}
                    getOptionLabel={(option) => option}
                  />
                  <RHFTextField name="postalCode" label={<span>Postal Code<span style={{ color: 'red' }}> *</span></span>} />

                  <RHFAutocomplete
                    name="country"
                    label={<span>Country<span style={{ color: 'red' }}> *</span></span>}
                    placeholder="Choose your Country"
                    fullWidth
                    options={BOOTH_COUNTRY.map((option) => option.label)}
                    getOptionLabel={(option) => option}
                  />
                  <RHFTextField name="latitude" label={<span>Latitude<span style={{ color: 'red' }}> *</span></span>} />
                  <RHFTextField name="longitude" label={<span>Longitude<span style={{ color: 'red' }}> *</span></span>} />
                  <RHFAutocomplete
                    name="addressType"
                    label={<span>Address Type<span style={{ color: 'red' }}> *</span></span>}
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
      )} */}
    </div>
  );
}

UserProfileNewEditForm.propTypes = {
  voter: PropTypes.object,
  candidates: PropTypes.object,
  newVoter: PropTypes.object,
  setNewVoter: PropTypes.func,
};
