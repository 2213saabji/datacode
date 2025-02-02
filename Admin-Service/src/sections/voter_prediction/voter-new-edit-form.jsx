import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { yupResolver } from '@hookform/resolvers/yup';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { Avatar } from '@mui/material';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import LoadingButton from '@mui/lab/LoadingButton';

import { useGetUsers } from 'src/api/user';
import { useAuthContext } from 'src/auth/hooks';
import { useGetPools } from 'src/api/poolManagement';
import { useGetVoterView, useGetVotePredictions } from 'src/api/election_details';
import { useGetVoters, createVoterProfile, UpdateVoterProfile } from 'src/api/voter';

import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { RHFTextField, RHFAutocomplete } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export default function VoterNewEditForm({ currentVoter }) {
  const navigate = useNavigate();

  const voterId = currentVoter?.data.voterProfileId;
  const pollId = currentVoter?.data.pollingStationId;

  const { enqueueSnackbar } = useSnackbar();

  const { user } = useAuthContext();

  // For getting current user's election id

  const { claims: dataList } = useGetVoterView(user.accessToken);

  const dataObj = dataList && dataList.data && dataList.data.length > 0 ? dataList.data[0] : {};

  const individualElectionId = dataObj.electionId;

  // for getting party details

  const { votepredictions: partyList } = useGetVotePredictions(
    individualElectionId || 0,
    0,
    0,
    pollId
  );

  const partyObj = useMemo(
    () => (partyList && partyList.data && partyList.data.length > 0 ? partyList.data[0] : {}),
    [partyList]
  );

  const partyData =
    partyObj && partyObj.WardDetails
      ? partyObj.CandidateProfiles.map((list) => ({
          value: list.partyId,
          label: list.PartyDetail.partyName,
          candidate: list.User.userName,
          img: list.PartyDetail.partySymbol,
        }))
      : [];

  const PartyDataForOptions = partyData.map((option) => option.value);

  // for getting all voters those have voter profile id

  const { voters: voterList } = useGetVoters();
  const VoterListArr = voterList?.data || [];
  const VoterProfileList = VoterListArr?.map((voter) => voter.userId) || [];

  // for getting all the users with role of candidate

  const { users: usersList } = useGetUsers();

  const allUserArr = usersList?.data || [];

  const usersListArr =
    usersList && usersList.data
      ? usersList.data.filter((currUser) => !VoterProfileList.includes(currUser.userId))
      : [];

  const UserData = usersListArr.map((list) => ({
    value: list.userId,
    label: list.userName,
  }));

  const AllUserData = allUserArr.map((list) => ({
    value: list.userId,
    label: list.userName,
  }));

  const AllUserDataForOptions = AllUserData.map((option) => option.value);

  const UserListDataForOptions = UserData.map((option) => option.value);

  // for getting all the polling stations

  const { pools: pollList } = useGetPools();

  const pollListArr = pollList?.data || [];

  const PollData = pollListArr.map((list) => ({
    value: list.pollingStationId,
    label: list.pollingStationName,
  }));

  const PollListDataForOptions = PollData.map((option) => option.value);

  // Schema
  const VoterSchema = Yup.object().shape({
    userId: Yup.number().required('User name is required'),
    // partyId: Yup.number().required('Party name is required'),
    pollingStationId: Yup.number().required('Polling Station name is required'),
    upiId: Yup.string().required('UPI ID is required'),
  });

  const defaultValues = useMemo(
    () => ({
      userId: currentVoter?.data.userId || null,
      pollingStationId: currentVoter?.data.pollingStationId || null,
      upiId: currentVoter?.data.upiId || '',
      partyId: currentVoter?.data.partyId || null,
    }),
    [currentVoter]
  );

  const methods = useForm({
    resolver: yupResolver(VoterSchema),
    defaultValues,
  });

  // for Profile from
  const { handleSubmit, reset } = methods;

  useEffect(() => {
    if (currentVoter) {
      reset(defaultValues);
    }
  }, [currentVoter, defaultValues, reset]);

  //  Profile Creation function

  const onSubmitProfile = handleSubmit(async (data) => {
    try {
      const response = await createVoterProfile(data);

      if (response) {
        enqueueSnackbar('Voter Profile created successfully', { variant: 'success' });
        navigate('/dashboard/voter');
      } else {
        enqueueSnackbar('Failed to create voter profile', { variant: 'error' });
      }
    } catch (error) {
      // Handle errors here if necessary
      console.error('Error submitting voter profile:', error);
      enqueueSnackbar('An error occurred while creating voter profile', { variant: 'error' });
    }
  });

  // Profile Update function

  const onSubmitProfileUpdate = handleSubmit(async (data) => {
    try {
      const response = await UpdateVoterProfile(voterId, data);

      if (response) {
        enqueueSnackbar('Voter Profile updated successfully', { variant: 'success' });
        navigate(`/dashboard/voter/${voterId}`);
      } else {
        enqueueSnackbar('Failed to update voter profile', { variant: 'error' });
      }
    } catch (error) {
      // Handle errors here if necessary
      console.error('Error updating  voter profile:', error);
      enqueueSnackbar('An error occurred while updating voter profile', { variant: 'error' });
    }
  });

  return (
    <FormProvider
      methods={methods}
      onSubmit={currentVoter ? onSubmitProfileUpdate : onSubmitProfile}
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
              {currentVoter ? (
                <RHFAutocomplete
                  name="userId"
                  label="User Name"
                  options={AllUserDataForOptions}
                  getOptionLabel={(value) => {
                    const User = AllUserData.find((option) => option.value === value);
                    return User ? User.label : '';
                  }}
                  disabled
                />
              ) : (
                <RHFAutocomplete
                  name="userId"
                  label="User Name"
                  options={UserListDataForOptions}
                  getOptionLabel={(value) => {
                    const User = UserData.find((option) => option.value === value);
                    return User ? User.label : '';
                  }}
                />
              )}

              <RHFAutocomplete
                name="pollingStationId"
                label="Polling Station Name"
                options={PollListDataForOptions}
                getOptionLabel={(value) => {
                  const Poll = PollData.find((option) => option.value === value);
                  return Poll ? Poll.label : '';
                }}
              />

              <RHFAutocomplete
                name="partyId"
                label="Give Your Vote"
                options={PartyDataForOptions}
                getOptionLabel={(value) => {
                  const Party = partyData.find((option) => option.value === value);
                  return (
                    <span>
                      <Avatar src={Party?.img} alt={Party?.lable} />
                      {`${Party?.candidate} (${Party?.label})`}
                    </span>
                  );
                }}
              />

              <RHFTextField name="upiId" label="UPI ID" />
            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained">
                {!currentVoter ? 'Create Voter' : 'Save Changes'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}

VoterNewEditForm.propTypes = {
  currentVoter: PropTypes.object,
};

export function getParty(inputValue, partyData) {
  const option = partyData ? true : [];

  return {
    ...option,
  };
}
