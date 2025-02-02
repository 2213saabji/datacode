import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import {
  // values,
  debounce,
} from 'lodash';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMemo, useState, useEffect, useCallback } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
// import TextField from '@mui/material/TextField';
import { TextField } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useTheme } from '@mui/material/styles';
import LoadingButton from '@mui/lab/LoadingButton';

import { useGetUsers } from 'src/api/user';
import { useAuthContext } from 'src/auth/hooks';
import { createTripProfile, updateTripProfile, getUserNameSearch } from 'src/api/wardvol';

import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { RHFTextField, RHFAutocomplete } from 'src/components/hook-form';

import ComponentBlock from '../_examples/component-block';
// ----------------------------------------------------------------------

export default function WardvolNewEditForm({ currentTrip }) {
  // const [typedText, setTypedText] = useState('');
  const theme = useTheme();
  const [userSuggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();
  const tripId = currentTrip?.data.tripId;
  const { enqueueSnackbar } = useSnackbar();
  // const [selectedValues, setSelectedValues] = useState([]);
  const ProfileSchema = Yup.object().shape({
    tripSource: Yup.string().required('Trip Source is required'),
    tripDestination: Yup.string().required('Trip Destination  is required'),
    tripDetails: Yup.string().required('Trip Details is required'),
  });

  const defaultProfileValues = useMemo(
    () => ({
      tripSource: currentTrip?.data.tripSource || '',
      tripDestination: currentTrip?.data.tripDestination || '',
      tripDetails: currentTrip?.data.tripDetails || '',
    }),
    [currentTrip]
  );
  const UserListArr = userSuggestions ?? [];

  const UserData = UserListArr.map((list) => ({
    value: list.userId,
    label: `${list.UserProfile?.firstName} ${list.UserProfile?.middleName ? list.UserProfile.middleName : ''} ${list.UserProfile?.lastName}`,
  }));
  console.log(UserData, 'user');
  const UserDataForOptions = UserData?.map((option) => option.value);
  console.log(UserDataForOptions);
  const methodsProfile = useForm({
    resolver: yupResolver(ProfileSchema),
    defaultProfileValues,
  });

  const { handleSubmit: handleSubmitProfile, reset: profileReset } = methodsProfile;

  const { user: userAuthToken } = useAuthContext();
  // user add

  const { users: userList } = useGetUsers(userAuthToken?.accessToken);
  // const UserList = userList?.data;
  const usersListArr = useMemo(
    () =>
      userList?.users
        ? userList?.users?.filter((user) => user.userRoleId === 9 && user.UserProfile)
        : [],
    [userList]
  );
  console.log(usersListArr, '>>>>>');
  const UserNameData = usersListArr?.map((list) => ({
    value: list?.userId,
    label: `${list?.UserProfile?.firstName} ${list?.UserProfile?.lastName}`,
    fullName: `${list?.UserProfile?.firstName} ${list?.UserProfile?.lastName}`,
  }));

  // const UserFullNameData = usersListArr?.map((list) => ({
  //   value: `${list?.UserProfile?.firstName} ${list?.UserProfile?.lastName}`,
  //   label: `${list?.UserProfile?.firstName} ${list?.UserProfile?.lastName}`,
  // }));

  // const UserFullNameDataForOptions = UserFullNameData?.map((option) => option.value);
  const UserNameDataForOptions = UserNameData?.map((option) => option.value);

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
  console.log(memoizedFetchUserSuggestions);
  const methods = useForm({
    resolver: yupResolver(ProfileSchema),
    // defaultValues,
  });
  const { setValue, watch } = methods;
  const value1 = watch();
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
                label="Trip Source"
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
                label="Destination"
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
              {/* <RHFAutocomplete
                name="userId"
                label="User Name"
                onChange={(event, value) => {
                  console.log(event);
                  // setSearchTerm(value);
                  console.log(value);
                  // const user = UserNameData.find((option) => option.value === value);
                  // if (user) {
                  //   setValue('fullName',user.fullName);
                  // }
                }}
                options={[]}
                // getOptionLabel={(value) => {
                //   const user = UserNameData.find((option) => option.value === value);
                //   return user ? user.label : '';
                // }}

              /> */}
              <ComponentBlock title="Voter's">
                {/* Autocomplete component */}
                {/* <Autocomplete
                  fullWidth
                  multiple
                  limitTags={8}
                  options={UserDataForOptions}
                  getOptionLabel={(value) => {
                    const user = UserData.find((option) => option.value === value);
                    return user ? user.label : '';
                  }}
                  // value={selectedValues}
                  // onChange={(event, newValue) => setSelectedValues([...selectedValues, newValue])}
                  onInputChange={(event, newValue) => {
                    console.log(newValue);
                    // Assuming fetchUserSuggestions is defined somewhere else and works correctly
                    fetchUserSuggestions(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField {...params} label="Multiple Select" placeholder="Favorites" />
                  )}
                  renderTags={(selected, getTagProps) =>
                    selected.map((option, index) => (
                      <Chip
                        {...getTagProps({ index })}
                        key={option.value}
                        label={option.label}
                        size="small"
                        variant="outlined"
                      />
                    ))
                  }
                /> */}

                {/* RHFAutocomplete component */}
                <RHFAutocomplete
                  name="travellingMembers"
                  label="Voter's"
                  multiple
                  fullWidth
                  limitTags={8}
                  // options={UserNameDataForOptions}
                  // getOptionLabel={(value) => {
                  //   const user = UserData.find((option) => option.value === value);
                  //   return user ? user.label : '';
                  // }}
                  // onInputChange={(event, newValue) => {
                  //   // Assuming memoizedFetchUserSuggestions is defined somewhere else and works correctly
                  //   memoizedFetchUserSuggestions(newValue);
                  // }}
                  value={value1.userId}
                  onChange={(event, value) => {
                    setValue('userId', value);
                    console.log(value);
                    const user = UserNameData.find((option) => option.value === value);
                    if (user) {
                      setValue('fullName', user.fullName);
                    }
                  }}
                  options={UserNameDataForOptions}
                  getOptionLabel={(value) => {
                    const user = UserNameData.find((option) => option.value === value);
                    return user ? user.label : '';
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Voter's"
                      InputProps={{
                        ...params.InputProps,
                        style: {
                          color: theme.palette.mode === 'light' ? 'black' : 'white',
                          fontSize: '16px', // Adjusted font size for readability
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
              </ComponentBlock>

              {/* <RHFAutocomplete
                name="userId"
                label="Voter's"
                value={value1.userId}
                onChange={(event, value) => {
                  setValue('userId', value);
                  console.log(value);
                  const user = UserNameData.find((option) => option.value === value);
                  if (user) {
                    setValue('fullName', user.fullName);
                  }
                }}
                options={UserNameDataForOptions}
                getOptionLabel={(value) => {
                  const user = UserNameData.find((option) => option.value === value);
                  return user ? user.label : '';
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="User Name"
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
              <Stack spacing={1.5}>
                <RHFTextField
                  name="tripDetails"
                  fullWidth
                  label="TripDetails"
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
                {!currentTrip ? 'Create Trip' : 'Save Changes'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}

WardvolNewEditForm.propTypes = {
  currentTrip: PropTypes.object,
};
