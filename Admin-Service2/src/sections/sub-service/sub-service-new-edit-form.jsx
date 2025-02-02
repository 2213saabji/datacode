import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useMemo, useState, useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import { useTheme } from '@mui/material/styles';
import { Button, TextField } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

import { useGetServices } from 'src/api/service';
import { createDriverProfile, updateDriverProfile } from 'src/api/sub-service';

import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { RHFTextField, RHFAutocomplete } from 'src/components/hook-form';

export default function SubServiceNewEditForm({ currentDriver }) {
  const navigate = useNavigate();
  const theme = useTheme();
  const [show, setShow] = useState({
    Profile: true,
  });
  console.log(setShow);

  const lawyerId = currentDriver?.data.serviceId;
console.log(lawyerId);

  const { enqueueSnackbar } = useSnackbar();

  const { services: serviceList } = useGetServices();

  const ServiceListArr = serviceList?.data || [];
  console.log(ServiceListArr);

  const ServiceData = ServiceListArr.map((list) => ({
    value: list.serviceId,
    label: list.serviceName,
  }));

  const ServiceDataForOptions = ServiceData.map((option) => option.value);

  const ProfileSchema = Yup.object().shape({
    serviceId: Yup.number().required('Service is Required'),
    issueType: Yup.string().required('Issue Type is required'),
    issueDescription: Yup.string().required('Issue Details ID required'),
  });

  const defaultValues = useMemo(
    () => ({
      serviceId: currentDriver?.data.serviceId || null,
      issueType: currentDriver?.data.issueType || '',
      issueDescription: currentDriver?.data.issueDescription || '',
    }),
    [currentDriver]
  );

  const methods = useForm({
    resolver: yupResolver(ProfileSchema),
    defaultValues,
  });

  const { handleSubmit, reset } = methods;

  useEffect(() => {
    if (currentDriver) {
      reset(defaultValues);
    }
  }, [currentDriver, defaultValues, reset]);

  const onSubmitProfile = handleSubmit(async (data) => {
    try {
      const response = await createDriverProfile(data);

      if (response) {
        enqueueSnackbar('Sub Service Profile created successfully', { variant: 'success' });
        navigate('/dashboard/LMS_sub_service');
      } else {
        enqueueSnackbar('Failed to create Sub Service profile', { variant: 'error' });
      }
    } catch (error) {
      console.error('Error submitting Sub Service profile:', error);
      enqueueSnackbar('An error occurred while creating Sub Service profile', { variant: 'error' });
    }
  });

  const onSubmitProfileUpdate = handleSubmit(async (data) => {
    try {
      const response = await updateDriverProfile(lawyerId, data);
      if (response) {
        enqueueSnackbar('Sub Service Profile updated successfully', { variant: 'success' });
        navigate(`/dashboard/LMS_sub_service/${lawyerId}`);
      } else {
        enqueueSnackbar('Failed to update Sub Service profile', { variant: 'error' });
      }
    } catch (error) {
      console.error('Error updating Sub Service profile:', error);
      enqueueSnackbar('An error occurred while updating Sub Service profile', { variant: 'error' });
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
                  <RHFAutocomplete
                    name="serviceId"
                    label="Service Name"
                    options={ServiceDataForOptions}
                    getOptionLabel={(value) => {
                      const service = ServiceData.find((option) => option.value === value);
                      return service ? service.label : '';
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Service Name"
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
                  />
                  <RHFTextField
                    name="issueType"
                    label="Issue Type"
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
                    name="issueDescription"
                    label="Issue Description"
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
                  <Button variant="contained" onClick={() => navigate('/dashboard')}>
                    Back
                  </Button>
                  <LoadingButton
                    type="submit"
                    variant="contained"
                    onClick={!currentDriver}
                    loading={false}
                  >
                    {!currentDriver ? 'Create Sub Service' : 'Save Changes'}
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

SubServiceNewEditForm.propTypes = {
  currentDriver: PropTypes.object,
};
