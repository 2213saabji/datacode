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
import LoadingButton from '@mui/lab/LoadingButton';

import { useGetUsers } from 'src/api/user';
import { useGetParties } from 'src/api/party';
import { useAuthContext } from 'src/auth/hooks';
import { useGetElections } from 'src/api/election';
import { CANDIDATE_LEGAL_CASE_OPTIONS } from 'src/_mock';
import { useGetCandidates, createCandidateProfile } from 'src/api/candidate';

import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { RHFAutocomplete } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export default function CandidateNewEditForm({ currentCandidate }) {
  const { UpdateCandidateProfile, user } = useAuthContext();

  const navigate = useNavigate();

  const candidateId = currentCandidate?.data.candidateProfileId;

  // Schema

  const CandidateSchema = Yup.object().shape({
    electionId: Yup.number().required('Election is required'),
    userId: Yup.number().required('User name is required'),
    legalCase: Yup.number().required('Legal Case is required'),
    partyId: Yup.number().required('Party name is required'),
  });

  // Default Values

  const defaultValues = useMemo(
    () => ({
      electionId: currentCandidate?.data.electionId || null,
      userId: currentCandidate?.data.userId || null,
      legalCase: currentCandidate?.data.legalCase || 0,
      partyId: currentCandidate?.data.partyId || null,
    }),
    [currentCandidate]
  );

  // Methods

  const methods = useForm({
    resolver: yupResolver(CandidateSchema),
    defaultValues,
  });

  const { handleSubmit, reset, watch } = methods;

  const values = watch();

  useEffect(() => {
    if (currentCandidate) {
      reset(defaultValues);
    }
  }, [currentCandidate, defaultValues, reset]);

  const { enqueueSnackbar } = useSnackbar();

  // for getting all candidates those have candidate profile id

  const { candidates: candidateList } = useGetCandidates(user.accessToken);
  const CandidateListArr = candidateList?.data || [];
  const CandidateProfileList = CandidateListArr?.map((candidate) => candidate.userId) || [];
  // for getting all election ids

  const { elections: electionsList } = useGetElections();

  const ElectionListArr = electionsList?.data || [];

  const ElectionData = ElectionListArr.map((list) => ({
    value: list.electionId,
    label: list.electionTitle,
  }));

  const ElectionListDataForOptions = ElectionData.map((option) => option.value);

  // for getting all the users with role of candidate

  const { users: usersList } = useGetUsers(user.accessToken);

  const allUserArr =
    usersList && usersList.users ? usersList.users.filter((users) => users.userRoleId === 2) : [];
  const usersListArr =
    usersList && usersList.users
      ? usersList.users.filter(
          (users) => users.userRoleId === 2 && !CandidateProfileList.includes(users.userId)
        )
      : [];

  const UserData = usersListArr.map((list) => ({
    value: list.userId,
    label: list.UserProfile?.firstName || list.phone,
  }));

  const AllUserData = allUserArr.map((list) => ({
    value: list.userId,
    label: list.UserProfile?.firstName || list.phone,
  }));

  const AllUserDataForOptions = AllUserData.map((option) => option.value);

  const UserListDataForOptions = UserData.map((option) => option.value);

  // fetching the Party  List
  // useEffect(()=>{
  //   console.log("uutttt",usersList.users,CandidateProfileList);
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // },[])

  const { parties: partyList } = useGetParties();

  const PartyListArr = partyList?.data || [];

  const PartyData = PartyListArr.map((list) => ({
    value: list.partyId,
    label: list.partyName,
    electionId: list.electionId,
  })).filter(
    (party) =>
      // values.electionId === party.electionId
      true
  );

  const PartyListDataForOptions = PartyData.map((option) => option.value);
  // console.log("PartyListDataForOptions",partyList,PartyListArr,PartyData,PartyListDataForOptions)

  // Profile Creation function

  const onSubmitProfile = handleSubmit(async (data) => {
    const PartyHasCandidate = CandidateListArr?.find(
      (candidate) =>
        candidate.electionId === values.electionId && candidate.partyId === values.partyId
    );
    if (PartyHasCandidate) {
      enqueueSnackbar('Different candidate exists from same party', { variant: 'error' });
      return;
    }

    try {
      const response = await createCandidateProfile(data);

      if (response) {
        enqueueSnackbar('Candidate created successfully', { variant: 'success' });
        navigate('/dashboard/candidate');
      }
    } catch (error) {
      // Handle errors here if necessary
      console.error('Error submitting candidate:', error);
      enqueueSnackbar('An error occurred while creating candidate', { variant: 'error' });
    }
  });

  // Profile Update function

  const onSubmitProfileUpdate = handleSubmit(async (data) => {
    try {
      const response = await UpdateCandidateProfile(candidateId, data);

      if (response) {
        enqueueSnackbar('Profile Signature created successfully', { variant: 'success' });
        navigate(`/dashboard/candidate/${candidateId}`);
      }
    } catch (error) {
      // Handle errors here if necessary
      console.error('Error submitting profile Signature:', error);
      enqueueSnackbar('An error occurred while creating profile Signature', { variant: 'error' });
    }
  });

  return (
    <FormProvider
      methods={methods}
      onSubmit={currentCandidate ? onSubmitProfileUpdate : onSubmitProfile}
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
              {currentCandidate ? (
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
                name="electionId"
                label="Choose Election"
                options={ElectionListDataForOptions}
                getOptionLabel={(value) => {
                  const Election = ElectionData.find((option) => option.value === value);
                  return Election ? Election.label : '';
                }}
              />

              <RHFAutocomplete
                name="partyId"
                label="Choose Party"
                options={PartyListDataForOptions}
                getOptionLabel={(value) => {
                  const Party = PartyData.find((option) => option.value === value);
                  return Party ? Party.label : '';
                }}
              />

              <RHFAutocomplete
                name="legalCase"
                label="Legal Case"
                placeholder="Legale Case"
                fullWidth
                options={CANDIDATE_LEGAL_CASE_OPTIONS.map((option) => option.label)}
                getOptionLabel={(option) => option}
              />
            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained">
                {!currentCandidate ? 'Create Candidate' : 'Save Changes'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}

CandidateNewEditForm.propTypes = {
  currentCandidate: PropTypes.object,
};
