import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import { useTheme } from '@mui/material/styles';
// import CardHeader from '@mui/material/CardHeader';
import LoadingButton from '@mui/lab/LoadingButton';

// import { useResponsive } from 'src/hooks/use-responsive';

import { useGetWards } from 'src/api/ward';
import { useAuthContext } from 'src/auth/hooks';
import { createBooth, UpdateBooth } from 'src/api/booth';
import {
  BOOTH_STATES,
  BOOTH_COUNTRY,
  INDIAN_CITIES,
  BOOTH_CAPACITY,
  BOOTH_DIMENTIONS,
} from 'src/_mock';

import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { RHFTextField, RHFAutocomplete } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export default function BoothNewEditForm({ currentBooth }) {
  const navigate = useNavigate();
  const theme = useTheme();

  // const mdUp = useResponsive('up', 'md');

  const { user } = useAuthContext();

  const { enqueueSnackbar } = useSnackbar();

  const { wards: WardsList } = useGetWards();

  const WardsListArr = WardsList?.data || [];

  const WardData = WardsListArr.map((list) => ({
    value: list.wardId,
    label: list.wardName,
  }));

  const WardDataForOptions = WardData.map((option) => option.value);

  const boothSchema = Yup.object().shape({
    boothName: Yup.string().required('Booth Name is required'),
    boothDimensions: Yup.number().required('Booth Dimensions is required'),
    boothCapacity: Yup.number().required('Booth Capacity is required'),
    boothStreetAddress: Yup.string().required('Street Address is required'),
    boothCity: Yup.string().required('City is required'),
    boothState: Yup.string().required('State is required'),
    boothPostalCode: Yup.number().required('Postal Code is required'),
    boothCountry: Yup.string().required('Country is required'),
    wardId: Yup.number().required('Ward name is required'),
  });

  const defaultValues = useMemo(
    () => ({
      boothName: currentBooth?.data.boothName || '',
      boothDimensions: currentBooth?.data.boothDimensions || null,
      boothCapacity: currentBooth?.data.boothCapacity || null,
      boothStreetAddress: currentBooth?.data.boothStreetAddress || '',
      boothCity: currentBooth?.data.boothCity || '',
      f: currentBooth?.data.boothState || '',
      boothPostalCode: currentBooth?.data.boothPostalCode || null,
      boothCountry: currentBooth?.data.boothCountry || '',
      wardId: currentBooth?.data.wardId || null,
    }),
    [currentBooth]
  );

  const methods = useForm({
    resolver: yupResolver(boothSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    if (currentBooth) {
      reset(defaultValues);
    }
  }, [currentBooth, defaultValues, reset]);

  // submit handle
  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = await createBooth(data, user?.accessToken);

      if (response) {
        enqueueSnackbar('Booth created successfully', { variant: 'success' });
        navigate(`/dashboard/boothmanagement`);
      } else {
        enqueueSnackbar('Failed to create booth', { variant: 'error' });
      }
    } catch (error) {
      // Handle errors here if necessary
      console.error('Error submitting booth:', error);
      enqueueSnackbar('An error occurred while creating booth', { variant: 'error' });
    }
  });

  // update handle
  const onSubmitUpdate = handleSubmit(async (data) => {
    try {
      const response = await UpdateBooth(currentBooth.data.boothId, data);

      if (response) {
        enqueueSnackbar('Updated booth successfully', { variant: 'success' });
        navigate(`/dashboard/boothmanagement`);
      } else {
        enqueueSnackbar('Failed to update booth', { variant: 'error' });
      }
    } catch (error) {
      // Handle errors here if necessary
      console.error('Error updating booth:', error);
      enqueueSnackbar('An error occurred while updating booth', { variant: 'error' });
    }
  });

  return (
    <FormProvider methods={methods} onSubmit={currentBooth ? onSubmitUpdate : onSubmit}>
      <Grid container spacing={3}>
        <Grid xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={3} sx={{ p: 3 }}>
              <RHFTextField
                name="boothName"
                label="Booth Name"
                InputLabelProps={{
                  style: {
                    color: theme.palette.mode === 'light' ? 'black' : 'white',
                  },
                }}
              />

              <RHFAutocomplete
                name="boothDimensions"
                label="Booth Dimensions in Km"
                options={BOOTH_DIMENTIONS.map((option) => option.label)}
                getOptionLabel={(option) => option}
                InputLabelProps={{
                  style: {
                    color: theme.palette.mode === 'light' ? 'black' : 'white',
                  },
                }}
              />

              <RHFAutocomplete
                name="boothCapacity"
                label="Booth Capacity"
                options={BOOTH_CAPACITY.map((option) => option.label)}
                getOptionLabel={(option) => option}
                InputLabelProps={{
                  style: {
                    color: theme.palette.mode === 'light' ? 'black' : 'white',
                  },
                }}
              />
              <RHFTextField
                name="boothStreetAddress"
                label="Street Address"
                InputLabelProps={{
                  style: {
                    color: theme.palette.mode === 'light' ? 'black' : 'white',
                  },
                }}
              />

              <RHFAutocomplete
                name="boothCity"
                label="City"
                placeholder="Choose a City"
                fullWidth
                options={INDIAN_CITIES.map((option) => option.label)}
                getOptionLabel={(option) => option}
                InputLabelProps={{
                  style: {
                    color: theme.palette.mode === 'light' ? 'black' : 'white',
                  },
                }}
              />
              {/* <RHFTextField name="boothState" label="State" /> */}
              <RHFAutocomplete
                name="boothState"
                label="State"
                placeholder="Choose a state"
                fullWidth
                options={BOOTH_STATES.map((option) => option.label)}
                getOptionLabel={(option) => option}
                InputLabelProps={{
                  style: {
                    color: theme.palette.mode === 'light' ? 'black' : 'white',
                  },
                }}
              />
              <RHFTextField
                name="boothPostalCode"
                label="Postal Code"
                InputLabelProps={{
                  style: {
                    color: theme.palette.mode === 'light' ? 'black' : 'white',
                  },
                }}
              />
              {/* <RHFTextField name="boothCountry" label="Country" /> */}
              <RHFAutocomplete
                name="boothCountry"
                label="Country"
                placeholder="Choose a country"
                fullWidth
                options={BOOTH_COUNTRY.map((option) => option.label)}
                getOptionLabel={(option) => option}
                InputLabelProps={{
                  style: {
                    color: theme.palette.mode === 'light' ? 'black' : 'white',
                  },
                }}
              />

              <RHFAutocomplete
                name="wardId"
                label="Ward Name"
                options={WardDataForOptions}
                getOptionLabel={(value) => {
                  const ward = WardData.find((option) => option.value === value);
                  return ward ? ward.label : '';
                }}
                InputLabelProps={{
                  style: {
                    color: theme.palette.mode === 'light' ? 'black' : 'white',
                  },
                }}
              />
            </Stack>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" size="large" loading={isSubmitting}>
                {!currentBooth ? 'Create Booth' : 'Save Changes'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}

BoothNewEditForm.propTypes = {
  currentBooth: PropTypes.object,
};
