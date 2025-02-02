import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import { useTheme } from '@mui/material/styles';
import LoadingButton from '@mui/lab/LoadingButton';

import { BOOTH_CAPACITY } from 'src/_mock';
import { useGetBooths } from 'src/api/booth';
import { useAuthContext } from 'src/auth/hooks';
import { createPool, UpdatePool } from 'src/api/poolManagement';

import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { RHFTextField, RHFAutocomplete } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export default function PoolNewEditForm({ currentPool }) {
  const navigate = useNavigate();
  const theme = useTheme();

  const poolId = currentPool?.data.pollingStationId;

  const { user } = useAuthContext();

  const { booths: boothsList } = useGetBooths();

  const BoothListArr = boothsList?.data || [];

  const BoothData = BoothListArr.map((list) => ({
    value: list.boothId,
    label: list.boothName,
  }));

  const BoothDataForOptions = BoothData.map((option) => option.value);

  const { enqueueSnackbar } = useSnackbar();

  // Schema
  const PoolSchema = Yup.object().shape({
    boothId: Yup.number().required('Booth Id is Required'),
    pollingStationName: Yup.string().required('polling Station Name is required'),
    pollingCapacity: Yup.number().required('polling Capacity is required'),
    numberOfBooth: Yup.number().required('number Of Booth is required'),
  });

  // Identity Values
  const defaultValues = useMemo(
    () => ({
      boothId: currentPool?.data.boothId || null,
      pollingStationName: currentPool?.data.pollingStationName || '',
      pollingCapacity: currentPool?.data.pollingCapacity || null,
      numberOfBooth: currentPool?.data.numberOfBooth || null,
    }),
    [currentPool]
  );

  // Methods
  const methods = useForm({
    resolver: yupResolver(PoolSchema),
    defaultValues,
  });

  const { handleSubmit, reset } = methods;

  useEffect(() => {
    if (currentPool) {
      reset(defaultValues);
    }
  }, [currentPool, defaultValues, reset]);

  // Handling Functions
  const onSubmitPool = handleSubmit(async (data) => {
    try {
      const response = await createPool(data, user.accessToken);
      if (response) {
        enqueueSnackbar('Pool created successfully', { variant: 'success' });
        navigate('/dashboard/poolmanagement');
      } else {
        enqueueSnackbar('Failed to create pool', { variant: 'error' });
      }
    } catch (error) {
      console.error('Error submitting pool:', error);
    }
  });

  // Profile Update function
  const onSubmitPoolUpdate = handleSubmit(async (data) => {
    try {
      const response = await UpdatePool(poolId, data);
      if (response) {
        enqueueSnackbar('User Pool Updated successfully', { variant: 'success' });
        navigate(`/dashboard/poolmanagement/${poolId}`);
      } else {
        enqueueSnackbar('Failed to update User Pool', { variant: 'error' });
      }
    } catch (error) {
      console.error('Error submitting User Pool:', error);
      enqueueSnackbar('An error occurred while updating pool Signature', { variant: 'error' });
    }
  });

  return (
    <FormProvider methods={methods} onSubmit={currentPool ? onSubmitPoolUpdate : onSubmitPool}>
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
              {currentPool ? (
                <RHFAutocomplete
                  name="boothId"
                  label="Booth Name"
                  options={BoothDataForOptions}
                  getOptionLabel={(value) => {
                    const category = BoothData.find((option) => option.value === value);
                    return category ? category.label : '';
                  }}
                  disabled
                  InputLabelProps={{
                    style: {
                      color: theme.palette.mode === 'light' ? 'black' : 'white',
                    },
                  }}
                />
              ) : (
                <RHFAutocomplete
                  name="boothId"
                  label="Booth Name"
                  options={BoothDataForOptions}
                  getOptionLabel={(value) => {
                    const category = BoothData.find((option) => option.value === value);
                    return category ? category.label : '';
                  }}
                />
              )}

              <RHFTextField name="pollingStationName" label="Polling Station Name" />
              <RHFAutocomplete
                name="pollingCapacity"
                label="Polling Station Capacity"
                options={BOOTH_CAPACITY.map((option) => option.label)}
                getOptionLabel={(option) => option}
              />
              <RHFTextField name="numberOfBooth" label="Number of Booth" />
            </Box>
            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained">
                {!currentPool ? 'Create Poll' : 'Save Changes'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}

PoolNewEditForm.propTypes = {
  currentPool: PropTypes.object,
};
