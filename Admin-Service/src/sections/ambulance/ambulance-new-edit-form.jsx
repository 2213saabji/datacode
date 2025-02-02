/* eslint-disable no-unused-vars */
import * as Yup from 'yup';
import { debounce } from 'lodash';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMemo, useState, useEffect, useCallback } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import { useTheme } from '@mui/material/styles';
import LoadingButton from '@mui/lab/LoadingButton';
// import Autocomplete from '@mui/material/Autocomplete';

// import { useGetDrivers } from 'src/api/driver';
import { createTripProfile, updateTripProfile, getUserNameSearch } from 'src/api/ambulance';

import { useSnackbar } from 'src/components/snackbar';
import FormProvider, {
  RHFTextField,
  // RHFAutocomplete
} from 'src/components/hook-form';

// ----------------------------------------------------------------------

export default function AmbulanceNewEditForm({ currentTrip }) {
  const theme = useTheme();
  // const [typedText, setTypedText] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [userSuggestions, setSuggestions] = useState([]);
  // const [driverList,setDriverList]= useState([]);
  const navigate = useNavigate();
  const tripId = currentTrip?.data.tripId;
  const { enqueueSnackbar } = useSnackbar();
  // const [selectedValues, setSelectedValues] = useState([]);

  const ProfileSchema = Yup.object().shape({
    // userId:  Yup.number().required('User Id is required'),
    tripSource: Yup.string().required('Trip Source is required'),
    tripDestination: Yup.string().required('Trip Destination  is required'),
    tripDetails: Yup.string().required('Trip Details is required'),
  });

  // const {drivers} = useGetDrivers();
  // const DriverListArr =  drivers?.data || [];

  //   const DriverData = DriverListArr?.map((list) => {
  //     if(list && list.VehicleDetail){
  //       return {
  //         value: list.userId,
  //         label: list.fullName,
  //       };
  //     }
  //       return null;

  // }).filter(Boolean);

  // const DriverDataForOptions = DriverData?.map((option) => option.value);

  const defaultProfileValues = useMemo(
    () => ({
      // userId: currentTrip?.data.userId || '',
      tripSource: currentTrip?.data.tripSource || '',
      tripDestination: currentTrip?.data.tripDestination || '',
      tripDetails: currentTrip?.data.tripDetails || '',
    }),
    [currentTrip]
  );
  // const UserListArr = userSuggestions ?? [];

  // const UserData = UserListArr.map((list) => ({
  //   value: list.userId,
  //   label: `${list.UserProfile?.firstName} ${list.UserProfile?.middleName?list.UserProfile.middleName:''} ${list.UserProfile?.lastName}`
  // }));
  // const UserDataForOptions = UserData?.map((option) => option.value);
  const methodsProfile = useForm({
    resolver: yupResolver(ProfileSchema),
    defaultProfileValues,
  });

  const { handleSubmit: handleSubmitProfile, reset: profileReset } = methodsProfile;

  useEffect(() => {
    if (currentTrip) {
      profileReset(defaultProfileValues);
    }
  }, [currentTrip, defaultProfileValues, profileReset]);

  const onSubmitProfile = handleSubmitProfile(async (data) => {
    try {
      const response = await createTripProfile(data);
      console.log(response);
      if (response) {
        enqueueSnackbar('Trip created successfully', { variant: 'success' });
        navigate('/dashboard/trip');
      } else {
        enqueueSnackbar('Failed to create Trip', { variant: 'error' });
      }
    } catch (error) {
      console.error('Error submitting Trip:', error);
      enqueueSnackbar('An error occurred while creating Trip', { variant: 'error' });
    }
  });

  const onSubmitProfileUpdate = handleSubmitProfile(async (data) => {
    try {
      const response = await updateTripProfile(tripId, data);
      if (response) {
        enqueueSnackbar('Trip Edited created successfully', { variant: 'success' });
        // navigate('/dashboard/trip');
        navigate(`/dashboard/trip/${tripId}`);
      } else {
        enqueueSnackbar('Failed to create Trip Edited', { variant: 'error' });
      }
    } catch (error) {
      console.error('Error submitting Trip Edited:', error);
      enqueueSnackbar('An error occurred while creating Trip Edited', { variant: 'error' });
    }
  });
  const fetchUserSuggestions = useMemo(
    () =>
      debounce(async (value) => {
        try {
          const response = await getUserNameSearch(value);
          // console.log("Response:", response);
          setSuggestions(response || []); // Set suggestions or an empty array if no response
        } catch (error) {
          console.error('Error fetching suggestions:', error);
          // Uncomment the following line if you want to display a snackbar message
          // enqueueSnackbar('Error fetching suggestions', { variant: 'error' });
        }
      }, 300), // Debounce delay
    []
  );
  const memoizedFetchUserSuggestions = useCallback(
    (value) => {
      fetchUserSuggestions(value);
    },
    [fetchUserSuggestions] // Explicitly include fetchUserSuggestions as a dependency
  );

  return (
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
                sm: 'repeat(1, 1fr)',
              }}
            >
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
              <Stack spacing={1.5}>
                <RHFTextField
                  name="tripDetails"
                  fullWidth
                  label="Any Suggestion Landmark"
                  multiline
                  rows={4}
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
              </Stack>
            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained">
                {!currentTrip ? 'Request a Ambulance' : 'Save Changes'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
AmbulanceNewEditForm.propTypes = {
  currentTrip: PropTypes.object,
};
