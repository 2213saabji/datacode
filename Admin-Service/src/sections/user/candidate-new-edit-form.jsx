import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { useMemo, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import { CardHeader } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import LoadingButton from '@mui/lab/LoadingButton';

// import { useGetUsers } from 'src/api/user';
import { useGetParties } from 'src/api/party';
// import { useGetElections } from 'src/api/election';
import { CANDIDATE_LEGAL_CASE_OPTIONS } from 'src/_mock';
import {
  // useGetCandidates,
  // createCandidateProfile,
  UpdateCandidateProfile,
} from 'src/api/candidate';

import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { RHFTextField, RHFAutocomplete } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export default function CandidateNewEditForm({ currentCandidate }) {
  const { enqueueSnackbar } = useSnackbar();

  const { parties: partyList } = useGetParties();

  const PartyListArr = partyList?.data || [];

  const PartyData = PartyListArr.map((list) => ({
    value: list.partyId,
    label: list.partyName,
  }));

  const PartyListDataForOptions = PartyData.map((option) => option.value);

  // Schema

  const CandidateSchema = Yup.object().shape({
    electionId: Yup.string(),
    partyId: Yup.string(),
    legalCase: Yup.number(),
  });

  // Default Values

  const defaultValues = useMemo(
    () => ({
      electionId: currentCandidate?.data[0]?.ElectionDetail?.electionType || null,
      legalCase: currentCandidate?.data[0]?.legalCase || 0,
      partyId: currentCandidate?.data[0]?.PartyDetail?.partyName || null,
    }),
    [currentCandidate]
  );

  // Methods

  const methods = useForm({
    resolver: yupResolver(CandidateSchema),
    defaultValues,
  });

  const { handleSubmit, reset } = methods;

  useEffect(() => {
    if (currentCandidate) {
      reset(defaultValues);
    }
  }, [currentCandidate, defaultValues, reset]);

  // Profile Creation function

  const onSubmitUpdateCandidate = handleSubmit(async (data) => {
    try {
      const {
        // its urgent needed , pls dont remove it from  warning.
        // eslint-disable-next-line no-unused-vars
        electionId, // its urgent needed , pls dont remove it from  warning.
        ...restdata
      } = data;
      const candidateId = currentCandidate?.data[0]?.candidateProfileId;
      const response = UpdateCandidateProfile(candidateId, restdata);
      if (response.ok) {
        enqueueSnackbar('Candidate datails Updated', { variant: 'success' });
      }
    } catch (error) {
      console.error('Error Updating candidate:', error);
      enqueueSnackbar('An error occurred while Updating candidate', { variant: 'error' });
    }
  });

  return (
    <FormProvider methods={methods} onSubmit={onSubmitUpdateCandidate}>
      {/* <Grid container spacing={3}>
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
            > */}
      <Grid sx={{ mb: 4, mt: 4 }}>
        <Grid xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <CardHeader title="CANDIDATE DETAILS FORM" sx={{ pl: 0, mb: 3 }} />
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
              }}
            >
              <RHFTextField name="electionId" label="Election" disabled />

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
                Update Candidate
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
