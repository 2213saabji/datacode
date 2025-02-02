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
import { uploadclaimFileInAWSS3 } from 'src/utils/aws-s3-file-handler';

import { useAuthContext } from 'src/auth/hooks';
import { RequestVendorRegForm } from 'src/api/requestLicenseAcceptance';

import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { RHFTextField, RHFUploadAvatar } from 'src/components/hook-form';

const TABS = [
  {
    value: 'LicenseImg',
    label: 'Registration Image',
    icon: <Box component="img" src="/assets/icons/menuicons/Profile.svg" />,
  },
];
export default function VendorRegForm({ handleEditChange }) {
  const [currentTab, setCurrentTab] = useState('LicenseImg');
  const [errorState, setErrorState] = useState(false);
  const { user: userdata } = useAuthContext();
  const [user] = useState(userdata);
  const { enqueueSnackbar } = useSnackbar();

  const ProfileSchema = Yup.object().shape({
    vendorName: Yup.string('Lawyer Name is required'),
    licenseCertification: Yup.string().required('Registration Number is required'),
    lawyerCertificateImageUrl: Yup.mixed().required('Registraion Image'),
    serviceDescription: Yup.string().required('Service Description is required'),
  });

  const defaultValues = useMemo(() => {
    const vendorName = userdata?.UserProfile?.firstName || '';

    return {
      vendorName,
      licenseCertification: '',
      lawyerCertificateImageUrl: null,
      serviceDescription: '',
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
    if (!data.vendorName) {
      enqueueSnackbar('Please Update your Profile First.', { variant: 'warning' });
      handleEditChange('event', 'editprofile');
      return;
    }
    try {
      const newdata = {
        ...data,
        userId: userdata.userId,
      };

      const response = await RequestVendorRegForm(newdata, userdata.accessToken);
      if (response) {
        resetProfile();
        setErrorState(false);
        enqueueSnackbar('Vendor Request Upload Successfully', { variant: 'success' });
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
          if (currentTab === 'LicenseImg') {
            setValue('lawyerCertificateImageUrl', imageUrl);
            enqueueSnackbar('Registration Image Upload Successfully', { variant: 'success' });
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
            <CardHeader title="VENDOR REGISTRATION FORM" sx={{ pl: 0, mb: 3 }} />
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
                  name="lawyerCertificateImageUrl"
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
                      JPG/PNG - IMAGE
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
                name="vendorName"
                label={
                  <span>
                    Name<span style={{ color: 'red' }}> *</span>
                  </span>
                }
                disabled
              />
              <RHFTextField
                name="licenseCertification"
                label={
                  <span>
                    License Certification Number <span style={{ color: 'red' }}> *</span>
                  </span>
                }
              />
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
VendorRegForm.propTypes = {
  handleEditChange: PropTypes.object,
};
