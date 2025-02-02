import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useMemo, useState, useEffect } from 'react';
// import { ATTPL_TMS_HOST_API } from 'src/config-global';

import { yupResolver } from '@hookform/resolvers/yup';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import { TextField } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useTheme } from '@mui/material/styles';
import LoadingButton from '@mui/lab/LoadingButton';
// import {
//   TRIP_OPTIONS,
// } from 'src/_mock/_trip';

import { createTripProfile, updateTripProfile } from 'src/api/trip_driver';

import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { RHFTextField } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export default function TripDriverNewEditForm({ currentTrip }) {
  const navigate = useNavigate();
  const theme = useTheme();
  // const [sigType, setSigType] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [show, setShow] = useState({
    Profile: true,
  });

  const tripId = currentTrip?.data.tripId;

  const { enqueueSnackbar } = useSnackbar();

  // Schema

  const ProfileSchema = Yup.object().shape({
    driverId: Yup.number().required('Driver Id is required'),
    vehicleId: Yup.number().required('Vehicle ID is required'),
    tripDetails: Yup.string().required('Trip Details is required'),
    tripStatus: Yup.string().required('Trip Status is required'),
    acceptanceTime: Yup.string().required('Acceptance Time is required'),
  });

  // Identity Values

  const defaultProfileValues = useMemo(
    () => ({
      driverId: currentTrip?.data.driverId || '',
      vehicleId: currentTrip?.data.vehicleId || '',
      tripDetails: currentTrip?.data.tripDetails || '',
      acceptanceTime: currentTrip?.data.acceptanceTime || '',
      tripStatus: currentTrip?.data.tripStatus || '',
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
    try {
      const dateObject = new Date(data.acceptanceTime);
      const isoString = dateObject.toISOString();
      data.acceptanceTime = isoString;
      // console.log('>>>',data.acceptanceTime);

      const response = await createTripProfile(data);
      // console.log(response);
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
                  <RHFTextField
                    name="driverId"
                    label="Driver ID"
                    v
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
                    name="vehicleId"
                    label="Vehicle ID"
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
                  <RHFTextField
                    name="tripStatus"
                    label="Trip Status"
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
                    name="acceptanceTime"
                    InputLabelProps={{ shrink: true }}
                    label="Acceptance Time"
                    type="date"
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Acceptance Time"
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

TripDriverNewEditForm.propTypes = {
  currentTrip: PropTypes.object,
};
