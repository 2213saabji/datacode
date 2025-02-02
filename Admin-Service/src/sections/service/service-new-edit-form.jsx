import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useMemo, useState, useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import { Button  } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useTheme } from '@mui/material/styles';
import LoadingButton from '@mui/lab/LoadingButton';

import { createDriverProfile, updateDriverProfile } from 'src/api/service';

import { useSnackbar } from 'src/components/snackbar';
import FormProvider, {
  RHFTextField,
} from 'src/components/hook-form';

export default function ServiceNewEditForm({ currentDriver }) {
  const navigate = useNavigate();
  const theme = useTheme();
  const [show, setShow] = useState({
    Profile: true,
  });
  console.log(setShow);

  const serviceId = currentDriver?.data.serviceId;

  const { enqueueSnackbar } = useSnackbar();
  

  const ProfileSchema = Yup.object().shape({
    // serviceId:Yup.number().required('Service is Required'),
    userRoleId:Yup.string().required('User Role is required is required'),
    serviceName:Yup.string().required('Service Name is required'),
    serviceDescription: Yup.string().required('Service Description is required'),
    
    // status: Yup.string().required('Experience Level is required'),
  });

  const defaultValues = useMemo(
    () => ({
      // serviceId: currentDriver?.data.serviceId || null,

      serviceName: currentDriver?.data.serviceName || '',
      serviceDescription: currentDriver?.data.serviceDescription || '',
      // status: currentDriver?.data.experienceLevel || '',
      userRoleId: currentDriver?.data.userRoleId || '',
    }),
    [currentDriver]
  );

  const methods = useForm({
    resolver: yupResolver(ProfileSchema),
    defaultValues,
  });

  const { handleSubmit, reset} = methods;

  useEffect(() => {
    if (currentDriver) {
      reset(defaultValues);
    }
  }, [currentDriver, defaultValues, reset]);

  const onSubmitProfile = handleSubmit(async (data) => {
    try {
      const response = await createDriverProfile(data);

      if (response) {
        enqueueSnackbar('Service Profile created successfully', { variant: 'success' });
        navigate('/dashboard/LMS_service');
      } else {
        enqueueSnackbar('Failed to create Service profile', { variant: 'error' });
      }
    } catch (error) {
      console.error('Error submitting Service profile:', error);
      enqueueSnackbar('An error occurred while creating Service profile', { variant: 'error' });
    }
  });

  const onSubmitProfileUpdate = handleSubmit(async (data) => {
    try {
      const response = await updateDriverProfile(serviceId, data);
      if (response) {
        enqueueSnackbar('Service Profile updated successfully', { variant: 'success' });
        navigate(`/dashboard/LMS_service/${serviceId}`);
      } else {
        enqueueSnackbar('Failed to update Service profile', { variant: 'error' });
      }
    } catch (error) {
      console.error('Error updating Service profile:', error);
      enqueueSnackbar('An error occurred while updating Service profile', { variant: 'error' });
    }
  });
  
  return (
    <div>
      {show.Profile && (
        <FormProvider
          methods={methods}
          onSubmit={currentDriver ? onSubmitProfileUpdate : onSubmitProfile}
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
                  
                  <RHFTextField
                    name="serviceName"
                    label="Service Name"
                    InputProps={{
                      style: {
                        color: theme.palette.mode === 'light' ? 'black' : 'white',
                        fontSize: '35px',
                      },
                    }}
                    InputLabelProps={{
                      style: {
                        color: theme.palette.mode === 'light' ? 'black' : 'white',
                      },
                    }}
                  />
                  <RHFTextField
                    name="serviceDescription"
                    label="Service Description"
                    InputProps={{
                      style: {
                        color: theme.palette.mode === 'light' ? 'black' : 'white',
                        fontSize: '35px',
                      },
                    }}
                    InputLabelProps={{
                      style: {
                        color: theme.palette.mode === 'light' ? 'black' : 'white',
                      },
                    }}
                  />

                  

                  
                  
                  {/* <RHFAutocomplete
                    name="status"
                    label="Status"
                    placeholder=" Choose Payment Method"
                    fullWidth
                    options={SERVICE_OPTIONS.map((option) => option.label)}
                    getOptionLabel={(option) => option}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Status"
                        InputProps={{
                          ...params.InputProps,
                          style: {
                            color: theme.palette.mode === 'light' ? 'black' : 'white',
                            fontSize: '35px',
                          },
                        }}
                        InputLabelProps={{
                          style: {
                            color: theme.palette.mode === 'light' ? 'black' : 'white',
                          },
                        }}
                      />
                    )}
                  /> */}
  <RHFTextField
                    name="userRoleId"
                    label="User role"
                    InputProps={{
                      style: {
                        color: theme.palette.mode === 'light' ? 'black' : 'white',
                        fontSize: '35px',
                      },
                    }}
                    InputLabelProps={{
                      style: {
                        color: theme.palette.mode === 'light' ? 'black' : 'white',
                      },
                    }}
                  />

                  
                </Box>
                <Stack direction="row" alignItems="center" spacing={2} sx={{ mt: 3 }}>
                  <Button
                    variant="contained"
                    onClick={() => navigate('/dashboard')}
                  >
                    Back
                  </Button>
                  <LoadingButton
                    type="submit"
                    variant="contained"
                    onClick={
                      !currentDriver
                    }
                    loading={false}
                  >
                    {!currentDriver ? 'Create Service' : 'Save Changes'}
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

ServiceNewEditForm.propTypes = {
  currentDriver: PropTypes.object,
};
