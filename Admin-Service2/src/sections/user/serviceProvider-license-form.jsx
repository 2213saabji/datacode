import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
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
import { deleteFileFromAWSS3, uploadclaimFileInAWSS3 } from 'src/utils/aws-s3-file-handler';

import { useAuthContext } from 'src/auth/hooks';
import { RequestServiceProviderForm } from 'src/api/requestLicenseAcceptance';

import { Upload } from 'src/components/upload';
import { useSnackbar } from 'src/components/snackbar';
import FormProvider, {
  RHFTextField,
  RHFAutocomplete,
  RHFUploadAvatar,
} from 'src/components/hook-form';

const TABS = [
  {
    value: 'registrationImage',
    label: 'Registration Image',
    icon: <Box component="img" src="/assets/icons/menuicons/Profile.svg" />,
  },
  {
    value: 'documentPdf',
    label: 'Document Pdf',
    icon: <Box component="img" src="/assets/icons/menuicons/Profile.svg" />,
  },
];


const ExperienceLevelTabs = [
  {
    value: 'fresher',
    label: 'Fresher',
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

const SERVICE_TYPES = {
  31: 'Lawyer',
  32: 'LMS Vendor',
  49: 'Chartered Accountant',
};

export default function ServiceProviderForm({formNo, handleEditChange}) {
  const [currentTab, setCurrentTab] = useState('registrationImage');
  const [errorState, setErrorState] = useState(false);
  const { user: userdata } = useAuthContext();
  const [user] = useState(userdata);
  const { enqueueSnackbar } = useSnackbar();
  const [doc, setDoc] = useState(null);

  const ProfileSchema = Yup.object().shape({
    providerName: Yup.string('Lawyer Name is required'),
    serviceAreaState: Yup.string('State is required'),
    serviceAreaDistrict: Yup.string('District is required'),
    serviceAreaTehsil: Yup.string('Tehsil is required'),
    experienceLevel: Yup.string().required('Experience Level is required'),
    registrationNumber: Yup.string().required('Registration Number is required'),
    serviceAreaCity: Yup.string().required('City is required'),
    registrationImageUrl: Yup.mixed().nullable(),
    documentPdf: Yup.mixed().nullable(),
    serviceDescription: Yup.string().required('Service Description is required'),
    rating: Yup.string().nullable(),
  });

  const defaultValues = useMemo(() => {
    const { UserProfile, UserAddressesses } = userdata || {};
    const { firstName, tehsilName } = UserProfile || {};
    const userAddress = UserAddressesses?.[0] || {};
    const { userState, userCity } = userAddress;

    return {
      providerName: firstName || '',
      serviceAreaState: userState || '',
      serviceAreaDistrict: userCity || '',
      serviceAreaTehsil: tehsilName || '',
      experienceLevel: '',
      registrationNumber: '',
      serviceAreaCity: '',
      registrationImageUrl: null,
      documentPdf: null,
      serviceDescription: '',
      rating: '',
    };
  }, [userdata]);

  const methodsProfile = useForm({
    resolver: yupResolver(ProfileSchema),
    defaultValues,
  });

  const {
    handleSubmit: handleSubmitProfile,
    reset: resetProfile,
    setValue,
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
    if (
      !data.providerName || 
      !data.serviceAreaState ||
      !data.serviceAreaDistrict ||
      !data.serviceAreaTehsil
    ) {
      enqueueSnackbar('Please Update your Profile First.',{ variant: 'warning' });
      handleEditChange("event" , "editprofile")
      return;
    }
    try {
      const newdata = {
        ...data,
        providerType: SERVICE_TYPES[formNo],
        userId: userdata.userId,
      };

      const response = await RequestServiceProviderForm(newdata, userdata.accessToken);
      if (response) {
        resetProfile();
        setErrorState(false);
        enqueueSnackbar('Service Provider Request Upload Successfully', { variant: 'success' });
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
          if (currentTab === 'registrationImage') {
            setValue('registrationImageUrl', imageUrl);
            enqueueSnackbar('Registration Image Upload Successfully', { variant: 'success' });
          } else if (currentTab === 'documentPdf') {
            setValue('documentPdf', imageUrl);
            enqueueSnackbar('Document Pdf Upload Successfully', { variant: 'success' });
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

  const uploadFile = useMemo(
    () => async (file) => {
      try {
        const formData = new FormData();
        formData.append('image', file);
        const response = await uploadclaimFileInAWSS3(formData);
        const imageUrl = response.data && response.data.data ? response.data.data : {};
        if (imageUrl) {
          setValue('documentPdf', imageUrl);
          setDoc(imageUrl);
          enqueueSnackbar('Document Upload Successfully', { variant: 'success' });
        }
      } catch (error) {
        console.error('Error in uploading file:', error);
        enqueueSnackbar('Error while uploading', { variant: 'error' });
      }
    },
    [enqueueSnackbar, setValue]
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

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (file) {
        uploadFile(newFile);
      }
    },
    [uploadFile]
  );

  const handleRemoveFile = useCallback(async () => {
    const dataToSend = {
      url: doc.preview,
    };
    await deleteFileFromAWSS3(dataToSend)
      .then((data) => {
        setValue('documentPdf', null);
        setDoc(null);
        enqueueSnackbar('Deleted successfully', { variant: 'success' });
      })
      .catch((err) => {
        console.error('Error in deleting files:', err);
        enqueueSnackbar('Error while deleting', { variant: 'error' });
      });
  }, [setValue, enqueueSnackbar, doc]);

  return (
    <FormProvider methods={methodsProfile} onSubmit={user?.UserProfile && onSubmitProfileupload}>
      <Grid sx={{ mb: 4, mt: 4 }}>
        <Grid xs={12} md={8}>
          <Card sx={{ p: 3 }}>
          <CardHeader title={`${SERVICE_TYPES[formNo]?.toUpperCase()} VERIFICATION FORM`} sx={{ pl: 0, mb: 3 }} />
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
              {currentTab === 'registrationImage' && (
                <RHFUploadAvatar
                  name="registrationImageUrl"
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
                      Image
                      <br /> max size of {fData(8388608)}
                    </Typography>
                  }
                />
              )}
              {currentTab === 'documentPdf' && (
                <Upload file={doc} onDrop={handleDrop} onDelete={handleRemoveFile} />
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
                name="providerName"
                label={
                  <span>
                    Name<span style={{ color: 'red' }}> *</span>
                  </span>
                }
                disabled
              />

              <RHFTextField
                name="serviceAreaState"
                label={
                  <span>
                    State <span style={{ color: 'red' }}> *</span>
                  </span>
                }
                disabled
              />

              <RHFTextField
                name="serviceAreaDistrict"
                label={
                  <span>
                    District <span style={{ color: 'red' }}> *</span>
                  </span>
                }
                disabled
              />

              <RHFTextField
                name="serviceAreaTehsil"
                label={
                  <span>
                    Tehsil <span style={{ color: 'red' }}> *</span>
                  </span>
                }
                disabled
              />

              <RHFAutocomplete
                name="experienceLevel"
                label={
                  <span>
                    Work Experience <span style={{ color: 'red' }}> *</span>
                  </span>
                }
                fullWidth
                options={ExperienceLevelTabs.map((option) => option.label)}
                getOptionLabel={(option) => option}
              />

              <RHFTextField
                name="registrationNumber"
                label={
                  <span>
                    Registration Number <span style={{ color: 'red' }}> *</span>
                  </span>
                }
              />

              <RHFTextField
                name="serviceAreaCity"
                label={
                  <span>
                    City <span style={{ color: 'red' }}> *</span>
                  </span>
                }
              />

              <RHFTextField name="rating" label="Rating" />

              <RHFTextField
                name="serviceDescription"
                multiline
                variant="outlined"
                rows={3}
                label={
                  <span>
                    Service Description <span style={{ color: 'red' }}> *</span>
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

ServiceProviderForm.propTypes = {
  formNo: PropTypes.number.isRequired,
  handleEditChange: PropTypes.object,
};
