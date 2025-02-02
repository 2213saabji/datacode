/* eslint-disable no-unused-vars */
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import imageCompression from 'browser-image-compression';
import { useMemo, useState, useEffect, useCallback } from 'react';

import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import { CardHeader } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import Tabs, { tabsClasses } from '@mui/material/Tabs';

import { fData } from 'src/utils/format-number';
import { uploadclaimFileInAWSS3 } from 'src/utils/aws-s3-file-handler';

import { useAuthContext } from 'src/auth/hooks';
import { RequestEmployerForm } from 'src/api/requestLicenseAcceptance';

import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { RHFTextField, RHFUploadAvatar } from 'src/components/hook-form';

const TABS = [
  {
    value: 'frontImg',
    label: 'Front',
    icon: <Box component="img" src="/assets/icons/menuicons/Profile.svg" />,
  },
  {
    value: 'backImg',
    label: 'Back',
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

export default function EmployerLicenseForm() {
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState('frontImg');
  const [errorState, setErrorState] = useState(false);

  const { user: userdata } = useAuthContext();
  const [user, setUser] = useState(userdata);

  const { enqueueSnackbar } = useSnackbar();

  const ProfileSchema = Yup.object().shape({
    employerName: Yup.string().required('Employer Name is required'),
    contactNumber: Yup.string()
      .matches(/^\d{10}$/, 'Employer Phone Number must be exactly 10 digits')
      .required('Employer Phone Number is required'),
    emailId: Yup.string().required('Work Mail is required'),
    businessName: Yup.string().required('Business Name is required'),
    businessAddress: Yup.string().required('Business Address is required'),
    businessPhoneNumber: Yup.string()
      .matches(/^\d{10}$/, 'Business Phone Number must be exactly 10 digits')
      .required('Business Number is required'),
    registrationNumber: Yup.string().required('Registration Number is required'),
    licenseImageUrlFront: Yup.mixed().nullable().required('Front image is required'),
    licenseImageUrlBack: Yup.mixed().nullable().required('Back image is required'),
  });

  const defaultValues = useMemo(
    () => ({
      employerName: '',
      contactNumber: '',
      emailId: '',
      businessName: '',
      businessAddress: '',
      businessPhoneNumber: '',
      registrationNumber: '',
      licenseImageUrlFront: null,
      licenseImageUrlBack: null,
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

  const onSubmitEmployerupload = handleSubmitProfile(async (data) => {
    try {
      const { licenseImageUrlFront, licenseImageUrlBack, ...restdata } = data;
      const newdata = {
        ...restdata,
        employerId: userdata.userId,
        registrationImageUrl: {
          front: licenseImageUrlFront,
          back: licenseImageUrlBack,
        },
      };

      const response = await RequestEmployerForm(newdata, userdata.accessToken);
      if (response) {
        resetProfile();
        enqueueSnackbar('Request Upload Successfully', { variant: 'success' });
      } else {
        enqueueSnackbar('Failed to Upload details', { variant: 'error' });
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
          if (currentTab === 'frontImg') {
            setValue('licenseImageUrlFront', imageUrl);
            enqueueSnackbar('Image Upload Successfully', { variant: 'success' });
          } else if (currentTab === 'backImg') {
            setValue('licenseImageUrlBack', imageUrl);
            enqueueSnackbar('Image Upload Successfully', { variant: 'success' });
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
    <FormProvider methods={methodsProfile} onSubmit={user?.UserProfile && onSubmitEmployerupload}>
      <Grid sx={{ mb: 4, mt: 4 }}>
        <Grid xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <CardHeader title="EMPLOYER VERIFICATION FORM" sx={{ pl: 0, mb: 3 }} />
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
              {currentTab === 'frontImg' && (
                <RHFUploadAvatar
                  name="licenseImageUrlFront"
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
                      Upload ID Proof
                      <br /> max size of {fData(8388608)}
                    </Typography>
                  }
                />
              )}
              {currentTab === 'backImg' && (
                <RHFUploadAvatar
                  name="licenseImageUrlBack"
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
                      Upload ID Proof
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
                name="employerName"
                label={
                  <span>
                    Name<span style={{ color: 'red' }}> *</span>
                  </span>
                }
              />
              <RHFTextField
                name="contactNumber"
                label={
                  <span>
                    Phone No.<span style={{ color: 'red' }}> *</span>
                  </span>
                }
              />
              <RHFTextField
                name="emailId"
                label={
                  <span>
                    Work Email<span style={{ color: 'red' }}> *</span>
                  </span>
                }
              />
              <RHFTextField
                name="businessName"
                label={
                  <span>
                    Business Name<span style={{ color: 'red' }}> *</span>
                  </span>
                }
              />
              <RHFTextField
                name="businessAddress"
                label={
                  <span>
                    Business Address<span style={{ color: 'red' }}> *</span>
                  </span>
                }
              />
              <RHFTextField
                name="businessPhoneNumber"
                label={
                  <span>
                    Bussiness Phone Number<span style={{ color: 'red' }}> *</span>
                  </span>
                }
              />
              <RHFTextField
                name="registrationNumber"
                label={
                  <span>
                    Registrtion Number/GST Number<span style={{ color: 'red' }}> *</span>
                  </span>
                }
              />
            </Box>
            {errorState && (
              <Typography sx={{ color: 'red' }}>fill all the required fields</Typography>
            )}

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained">
                Save Changes
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}

EmployerLicenseForm.propTypes = {};
