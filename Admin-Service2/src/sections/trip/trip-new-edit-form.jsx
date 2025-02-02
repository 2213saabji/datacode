import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { useMemo, useState, useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
// import { ATTPL_TMS_HOST_API } from 'src/config-global';

import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import { useTheme } from '@mui/material/styles';
import LoadingButton from '@mui/lab/LoadingButton';

import { useGetDrivers } from 'src/api/driver';
import { useGetVehicles } from 'src/api/vehicle';
import { createTripProfile, updateTripProfile } from 'src/api/trip';
// import {
//   TRIP_OPTIONS,
// } from 'src/_mock/_trip';
import { TextField } from '@mui/material';

import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { RHFTextField, RHFAutocomplete } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export default function TripNewEditForm({ currentTrip }) {
  const theme = useTheme();
  const navigate = useNavigate();
  // const [sigType, setSigType] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [show, setShow] = useState({
    Profile: true,
  });

  const tripId = currentTrip?.data.tripId;

  //

  const { drivers: driverList } = useGetDrivers();

  const DriverListArr = driverList?.data || [];

  const DriverData = DriverListArr.map((list) => ({
    value: list.userId,
    label: list.fullName,
  }));

  const DriverDataForOptions = DriverData.map((option) => option.value);

  const { vehicles: vehicleList } = useGetVehicles();

  const VehicleListArr = vehicleList?.data || [];

  const VehicleData = VehicleListArr.map((list) => ({
    value: list.vehicleId,
    label: list.vehicleName,
  }));

  const VehicleDataForOptions = VehicleData.map((option) => option.value);

  // const tripId = currentTrip?.tripId;
  //
  const { enqueueSnackbar } = useSnackbar();

  // Schema

  const ProfileSchema = Yup.object().shape({
    userId: Yup.number().required('Driver is required'),
    // vehicleId: Yup.number().required('Vehicle is required'),
    tripDetails: Yup.string().required('Trip Details is required'),
    tripSource: Yup.string().required('Trip Status is required'),
    tripDestination: Yup.string().required('Acceptance Time is required'),
  });

  // Identity Values

  const defaultProfileValues = useMemo(
    () => ({
      userId: currentTrip?.data.userId || null,
      // vehicleId: currentTrip?.data.vehicleId || '',
      tripDetails: currentTrip?.data.tripDetails || '',
      tripSource: currentTrip?.data.tripSource || '',
      tripDestination: currentTrip?.data.tripDestination || '',
      // tripStatus: currentTrip?.data.tripStatus || '',
    }),
    [currentTrip]
  );

  // Methods

  const methodsProfile = useForm({
    resolver: yupResolver(ProfileSchema),
    defaultProfileValues,
  });

  // For profile form
  const { handleSubmit: handleSubmitProfile, reset: profileReset } = methodsProfile;

  useEffect(() => {
    if (currentTrip) {
      profileReset(defaultProfileValues);
    }
  }, [currentTrip, defaultProfileValues, profileReset]);
  // Profile Creation function

  const onSubmitProfile = handleSubmitProfile(async (data) => {
    console.log('trip', data);

    try {
      // const dateObject = new Date(data.acceptanceTime);
      // const isoString = dateObject.toISOString();
      // data.acceptanceTime = isoString;
      // console.log('>>>', data.acceptanceTime);

      const response = await createTripProfile(data);
      if (response) {
        enqueueSnackbar('Trip created successfully', { variant: 'success' });
        navigate('/dashboard/trip');
      } else {
        enqueueSnackbar('Failed to create Trip', { variant: 'error' });
      }
    } catch (error) {
      // Handle errors here if necessary
      console.error('Error submitting Trip:', error);
      enqueueSnackbar('An error occurred while creating Trip', { variant: 'error' });
    }
  });

  // Profile Update function

  const onSubmitProfileUpdate = handleSubmitProfile(async (data) => {
    try {
      // console.log('hhh');
      const response = await updateTripProfile(tripId, data);
      // console.log('>>>>updatex', response);
      if (response) {
        enqueueSnackbar('Trip Edited created successfully', { variant: 'success' });
        // navigate('/dashboard/trip');
        navigate(`/dashboard/trip/${tripId}`);
      } else {
        enqueueSnackbar('Failed to create Trip Edited', { variant: 'error' });
      }
    } catch (error) {
      // Handle errors here if necessary
      console.error('Error submitting Trip Edited:', error);
      enqueueSnackbar('An error occurred while creating Trip Edited', { variant: 'error' });
    }
  });

  return (
    <div>
      {show.Profile && (
        <FormProvider
          methods={methodsProfile}
          onSubmit={currentTrip ? onSubmitProfileUpdate : onSubmitProfile}
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
                    name="userId"
                    label="Driver Name"
                    options={DriverDataForOptions}
                    getOptionLabel={(value) => {
                      const driver = DriverData.find((option) => option.value === value);
                      return driver ? driver.label : '';
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Driver Name"
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
                  <RHFAutocomplete
                    name="vehicleId"
                    label="Vehicle Name"
                    options={VehicleDataForOptions}
                    getOptionLabel={(value) => {
                      const vehicle = VehicleData.find((option) => option.value === value);
                      return vehicle ? vehicle.label : '';
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Vehicle Name"
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
                    name="tripSource"
                    label="Pickup Address"
                    InputProps={{
                      style: {
                        color: theme.palette.mode === 'light' ? 'black' : 'white',
                        // fontSize: '35px',
                      },
                    }}
                    InputLabelProps={{
                      style: {
                        color: theme.palette.mode === 'light' ? 'black' : 'white',
                      },
                    }}
                  />
                  <RHFTextField
                    name="tripDestination"
                    label="Drop Address"
                    InputProps={{
                      style: {
                        color: theme.palette.mode === 'light' ? 'black' : 'white',
                        // fontSize: '35px',
                      },
                    }}
                    InputLabelProps={{
                      style: {
                        color: theme.palette.mode === 'light' ? 'black' : 'white',
                      },
                    }}
                  />
                  <RHFTextField
                    name="tripDetails"
                    label="Any Suggestion Landmark"
                    InputProps={{
                      style: {
                        color: theme.palette.mode === 'light' ? 'black' : 'white',
                        // fontSize: '35px',
                      },
                    }}
                    InputLabelProps={{
                      style: {
                        color: theme.palette.mode === 'light' ? 'black' : 'white',
                      },
                    }}
                  />
                </Box>

                <Stack alignItems="flex-end" sx={{ mt: 3 }}>
                  <LoadingButton type="submit" variant="contained">
                    {!currentTrip ? 'Create Trip' : 'Save Changes'}
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

TripNewEditForm.propTypes = {
  currentTrip: PropTypes.object,
};
