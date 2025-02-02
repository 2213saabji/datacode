import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import imageCompression from 'browser-image-compression';
import { useMemo, useState, useEffect, useCallback } from 'react';

import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import { CardHeader } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { TimePicker } from '@mui/x-date-pickers';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import Tabs, { tabsClasses } from '@mui/material/Tabs';

import { fData } from 'src/utils/format-number';
import { uploadclaimFileInAWSS3 } from 'src/utils/aws-s3-file-handler';

import { useAuthContext } from 'src/auth/hooks';
import { RequestDoctorForm, useGetSingleDoctorRequestList } from 'src/api/requestLicenseAcceptance';

import { useSnackbar } from 'src/components/snackbar';
import FormProvider, {
  RHFTextField,
  RHFAutocomplete,
  RHFUploadAvatar,
} from 'src/components/hook-form';

const TABS = [
  {
    value: 'LicenseImg',
    label: 'License',
    icon: <Box component="img" src="/assets/icons/menuicons/Profile.svg" />,
  },
  {
    value: 'degreeImg',
    label: 'Degree',
    icon: <Box component="img" src="/assets/icons/menuicons/Profile.svg" />,
  },
];
const ExperienceLevelTabs = [
  {
    value: '<1year',
    label: 'Less than 1 year',
  },
  {
    value: '1year',
    label: '1 year',
  },
  {
    value: '2years',
    label: '2 years',
  },
  {
    value: '3years',
    label: '3 years',
  },
  {
    value: '4years',
    label: '4 years',
  },
  {
    value: '5years',
    label: '5 years',
  },
  {
    value: '6years',
    label: '6 years',
  },
  {
    value: '7years',
    label: '7 years',
  },
  {
    value: '8years',
    label: '8 years',
  },
  {
    value: '9years',
    label: '9 years',
  },
  {
    value: '10years',
    label: '10 years',
  },
  {
    value: '10-15years',
    label: '10 to 15 years',
  },
  {
    value: '15-20years',
    label: '15 to 20 years',
  },
  {
    value: '>20years',
    label: 'More than 20 years',
  },
];

export default function DoctorLicenseForm() {
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState('LicenseImg');
  const [errorState, setErrorState] = useState(false);
  const { user: userdata } = useAuthContext();
  const [user, setUser] = useState(userdata);
  const { users, usersLoading, usersError } = useGetSingleDoctorRequestList(
    userdata.userId,
    userdata.accessToken
  );
  const { enqueueSnackbar } = useSnackbar();
  const [authentication, setAuthentication] = useState(true);
  console.log(navigate, setUser, setUser, usersLoading, usersError);

  useEffect(() => {
    if (users && user?.data) {
      let authenticationGiven = true;
      users?.data?.forEach((item) => {
        if (item.approvalStatus === 0) {
          authenticationGiven = false;
        }
      });
      setAuthentication(authenticationGiven);
    }
  }, [user?.data, users]);

  function formatTime(date) {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  }

  const ProfileSchema = Yup.object().shape({
    doctorName: Yup.string().required('Doctor Name is required'),
    phoneNumber: Yup.string()
      .matches(/^\d{10}$/, 'Doctor Phone Number must be exactly 10 digits')
      .required('Doctor Phone Number is required'),
    workEmailId: Yup.string().required('Work Mail is required'),
    degree: Yup.string().required('Degree is required'),
    specialization: Yup.string().required('Specialization is required'),
    experienceLevel: Yup.string(),
    hospitalName: Yup.string().required('Hospital Name is required'),
    hospitalAddress: Yup.string().required('Hospital Address is required'),
    hospitalPhoneNumber: Yup.string()
      .min(10, 'Hospital Phone Number must be at least 10 digits')
      .max(10, 'Hospital Phone Number must not exceed 10 digits')
      .required('Number is required'),
    startTime: Yup.date().required('Start Time is required'),
    endTime: Yup.date().required('End Time is required'),
    licenseNumber: Yup.string().required('License Number is required'),
    licenseImageUrl: Yup.mixed().nullable().required('License image is required'),
    degreeImageUrl: Yup.mixed().nullable().required('degree image is required'),
  });

  const defaultValues = useMemo(
    () => ({
      doctorName: '',
      workEmailId: '',
      phoneNumber: '',
      degree: '',
      specialization: '',
      experienceLevel: '',
      hospitalName: '',
      hospitalAddress: '',
      hospitalPhoneNumber: '',
      startTime: null,
      endTime: null,
      licenseNumber: '',
      licenseImageUrl: null,
      degreeImageUrl: null,
    }),
    []
  );

  const methodsProfile = useForm({
    resolver: yupResolver(ProfileSchema),
    defaultValues,
  });

  const {
    handleSubmit: handleSubmitProfile,
    reset: resetProfile,
    setValue,
    control,
    formState: { errors },
  } = methodsProfile;

  useEffect(() => {
    if (user) {
      resetProfile(defaultValues);
    }
  }, [user, defaultValues, resetProfile]);

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      setErrorState(true);
    }
  }, [errors]);
  const handleChangeTab = useCallback((event, newValue) => {
    setCurrentTab(newValue);
  }, []);

  const onSubmitProfileupload = handleSubmitProfile(async (data) => {
    try {
      if (authentication) {
        const { licenseImageUrl, degreeImageUrl, ...restdata } = data;
        const newdata = {
          ...restdata,
          doctorId: userdata.userId,
          degreeCertificate: {
            front: degreeImageUrl,
            back: '',
          },
          licenseImageUrl: {
            front: licenseImageUrl,
            back: '',
          },
          startTime: formatTime(new Date(data.startTime)),
          endTime: formatTime(new Date(data.endTime)),
        };

        const response = await RequestDoctorForm(newdata, userdata.accessToken);
        if (response) {
          resetProfile();
          setErrorState(false);
          enqueueSnackbar('Request Upload Successfully', { variant: 'success' });
        } else {
          enqueueSnackbar('Failed to Upload details', { variant: 'error' });
        }
      } else {
        enqueueSnackbar('Your Previous Requst is in Process', { variant: 'error' });
      }
    } catch (error) {
      console.error('Error Requeset Upload Details:', error);
      enqueueSnackbar('An error occurred while Requesting Upload Details', { variant: 'error' });
    }
  });

  const uploadImage = useMemo(
    () => async (file) => {
      try {
        const compressedFile = await imageCompression(file, {
          maxSizeMB: 0.5,
          maxWidthOrHeight: 800,
        });

        const formData = new FormData();
        formData.append('image', compressedFile);

        const response = await uploadclaimFileInAWSS3(formData);

        const imageUrl = response.data && response.data.data ? response.data.data : {};
        if (imageUrl) {
          if (currentTab === 'LicenseImg') {
            setValue('licenseImageUrl', imageUrl);
            enqueueSnackbar('License Image Upload Successfully', { variant: 'success' });
          } else if (currentTab === 'degreeImg') {
            setValue('degreeImageUrl', imageUrl);
            enqueueSnackbar('Degree Image Upload Successfully', { variant: 'success' });
          }
        } else {
          console.error('Error in uploading file:', response);
          enqueueSnackbar('Error while uploading', { variant: 'error' });
        }
      } catch (error) {
        console.error('Error compressing image:', error);
        enqueueSnackbar('Error while compressing image', { variant: 'error' });
      }
    },
    [currentTab, enqueueSnackbar, setValue]
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

  return (
    <FormProvider methods={methodsProfile} onSubmit={user?.UserProfile && onSubmitProfileupload}>
      <Grid sx={{ mb: 4, mt: 4 }}>
        <Grid xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <CardHeader title="DOCTOR VERIFICATION FORM" sx={{ pl: 0, mb: 3 }} />
            <Box sx={{ mb: 2 }}>
              <Box sx={{ mb: 2 }}>
                <Tabs
                  value={currentTab}
                  onChange={handleChangeTab}
                  sx={{
                    width: 1,
                    zIndex: 9,
                    bgcolor: 'background.paper',
                    [`& .${tabsClasses.flexContainer}`]: {
                      pr: { md: 3 },
                      justifyContent: {
                        xs: 'center',
                        sm: 'center',
                        md: 'center',
                      },
                    },
                  }}
                >
                  {TABS.map((tab) => (
                    <Tab key={tab.value} value={tab.value} icon={tab.icon} label={tab.label} />
                  ))}
                </Tabs>
              </Box>
              {currentTab === 'LicenseImg' && (
                <RHFUploadAvatar
                  name="licenseImageUrl"
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
                      License Picture
                      <br /> max size of {fData(8388608)}
                    </Typography>
                  }
                />
              )}
              {currentTab === 'degreeImg' && (
                <RHFUploadAvatar
                  name="degreeImageUrl"
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
                      Degree Picture
                      <br /> max size of {fData(8388608)}
                    </Typography>
                  }
                />
              )}
            </Box>
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
                name="doctorName"
                label={
                  <span>
                    Name<span style={{ color: 'red' }}> *</span>
                  </span>
                }
              />
              <RHFTextField
                name="phoneNumber"
                label={
                  <span>
                    Phone No.<span style={{ color: 'red' }}> *</span>
                  </span>
                }
              />
              <RHFTextField
                name="workEmailId"
                label={
                  <span>
                    Work Email<span style={{ color: 'red' }}> *</span>
                  </span>
                }
              />
              <RHFTextField
                name="degree"
                label={
                  <span>
                    Degree<span style={{ color: 'red' }}> *</span>
                  </span>
                }
              />
              <RHFTextField
                name="specialization"
                label={
                  <span>
                    Specialization<span style={{ color: 'red' }}> *</span>
                  </span>
                }
              />
              <RHFAutocomplete
                name="experienceLevel"
                label="Choose your Experience Level"
                fullWidth
                options={ExperienceLevelTabs.map((option) => option.label)}
                getOptionLabel={(option) => option}
              />

              <RHFTextField
                name="hospitalName"
                label={
                  <span>
                    Hospital Name<span style={{ color: 'red' }}> *</span>
                  </span>
                }
              />
              <RHFTextField
                name="hospitalAddress"
                label={
                  <span>
                    Hospital Address<span style={{ color: 'red' }}> *</span>
                  </span>
                }
              />
              <RHFTextField
                name="hospitalPhoneNumber"
                label={
                  <span>
                    Hospital Phone Number<span style={{ color: 'red' }}> *</span>
                  </span>
                }
              />
              <RHFTextField
                name="licenseNumber"
                label={
                  <span>
                    License Number<span style={{ color: 'red' }}> *</span>
                  </span>
                }
              />
              <Controller
                name="startTime"
                control={control}
                render={({ field }) => (
                  <TimePicker
                    label="Start Time"
                    {...field}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        margin: 'normal',
                      },
                    }}
                  />
                )}
              />
              <Controller
                name="endTime"
                control={control}
                render={({ field }) => (
                  <TimePicker
                    label="End Time"
                    {...field}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        margin: 'normal',
                      },
                    }}
                  />
                )}
              />
            </Box>
            {errorState && (
              <Typography sx={{ color: 'red' }}>fill all the required fields</Typography>
            )}
            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained">
                {authentication ? 'Save Changes' : 'You have already Submit the Request'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}

DoctorLicenseForm.propTypes = {
  user: PropTypes.object,
};
