/* eslint-disable no-unused-vars */
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMemo, useState, useEffect, useCallback } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import { CardHeader } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';

import { useAuthContext } from 'src/auth/hooks';
import { RequestSellerOwnerForm } from 'src/api/requestLicenseAcceptance';

import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { RHFTextField } from 'src/components/hook-form';

const TABS = [
  {
    value: 'frontImg',
    label: 'FrontImg',
    icon: <Box component="img" src="/assets/icons/menuicons/Profile.svg" />,
  },
  {
    value: 'backImg',
    label: 'BackImg',
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

export default function SellerLicenseForm() {
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState('frontImg');
  const [errorState, setErrorState] = useState(false);

  const { user: userdata } = useAuthContext();
  const [user, setUser] = useState(userdata);

  const { enqueueSnackbar } = useSnackbar();

  const ProfileSchema = Yup.object().shape({
    sellerOwnerfirstName: Yup.string().required('First Name is required'),
    sellerOwnerlastName: Yup.string().required('Last Name is required'),
    sellerOwnercontactNumber: Yup.string()
      .matches(/^\d{10}$/, 'Phone Number must be exactly 10 digits')
      .required('Phone Number is required'),
    sellerOwneremail: Yup.string().required('Mail is required'),
    sellerOwneraddress: Yup.string().required('Address is required'),
  });

  const defaultValues = useMemo(
    () => ({
      sellerOwnerfirstName: '',
      sellerOwnerlastName: '',
      sellerOwnercontactNumber: userdata?.phone || '',
      sellerOwneremail: '',
      sellerOwneraddress: '',
    }),
    [userdata?.phone]
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

  const onSubmitSellerUpload = handleSubmitProfile(async (data) => {
    try {
      const newdata = {
        ...data,
        userId: userdata.userId,
      };

      const response = await RequestSellerOwnerForm(newdata, userdata.accessToken);
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

  return (
    <FormProvider methods={methodsProfile} onSubmit={user?.UserProfile && onSubmitSellerUpload}>
      <Grid sx={{ mb: 4, mt: 4 }}>
        <Grid xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <CardHeader
              title="AGRICULTURE EQUIPMENT SELLER OWNER VERIFICATION FORM"
              sx={{ pl: 0, mb: 3 }}
            />

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
                name="sellerOwnerfirstName"
                label={
                  <span>
                    First Name<span style={{ color: 'red' }}> *</span>
                  </span>
                }
              />
              <RHFTextField
                name="sellerOwnerlastName"
                label={
                  <span>
                    Last Name<span style={{ color: 'red' }}> *</span>
                  </span>
                }
              />
              <RHFTextField
                name="sellerOwneremail"
                label={
                  <span>
                    Email<span style={{ color: 'red' }}> *</span>
                  </span>
                }
              />
              <RHFTextField
                name="sellerOwnercontactNumber"
                label={
                  <span>
                    Contact Number<span style={{ color: 'red' }}> *</span>
                  </span>
                }
                disabled
              />
              <RHFTextField
                name="sellerOwneraddress"
                label={
                  <span>
                    Address<span style={{ color: 'red' }}> *</span>
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

SellerLicenseForm.propTypes = {};
