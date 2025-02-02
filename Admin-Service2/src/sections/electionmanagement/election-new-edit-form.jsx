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

import { createElection, UpdateElection } from 'src/api/election';
import {
  ELECTION_TYPE_OPTIONS,
  ELECTION_METHODS_OPTIONS,
  ELECTION_ELIGIBILITY_TYPE_OPTIONS,
  // ELECTION_CONFIGURATION_TYPE_OPTIONS,
} from 'src/_mock';

import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { RHFTextField, RHFAutocomplete } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export default function ElectionNewEditForm({ currentElection }) {
  const navigate = useNavigate();

  const ElectionId = currentElection?.data.electionId;

  const { enqueueSnackbar } = useSnackbar();

  // Schema

  const ProfileSchema = Yup.object().shape({
    electionTitle: Yup.string().required('Election Title is required'),
    electionDescription: Yup.string().required('Election Description is required'),
    electionDate: Yup.string().required('Election Date Time is required'),
    electionStartTime: Yup.string().required('Election Start Time is required'),
    electionEndTime: Yup.string().required('Election End Time is required'),
    electionType: Yup.string().required('Election Type is required'),
    eligibilityType: Yup.string().required('Eligibility Type is required'),
    securityMeasures: Yup.string().required('Security Measures is required'),
    electionInstrumentUsed: Yup.string().required('election method is required'),
    nominationStart: Yup.string().required('Nomination Start Date is required'),
    nominationEnd: Yup.string().required('Nomination End Date is required'),
  });

  const defaultValues = useMemo(
    () => ({
      electionTitle: currentElection?.data.electionTitle || '',
      electionDescription: currentElection?.data.electionDescription || '',
      electionDate: currentElection?.data.electionDate || '',
      electionStartTime: currentElection?.data.electionStartTime || '',
      electionEndTime: currentElection?.data.electionEndTime || '',
      electionType: currentElection?.data.electionType || '',
      securityMeasures: currentElection?.data.securityMeasures || '',
      electionInstrumentUsed: currentElection?.data.electionInstrumentUsed || '',
      eligibilityType: currentElection?.data.eligibilityType || '',
      nominationStart: currentElection?.data.nominationStart || '',
      nominationEnd: currentElection?.data.nominationEnd || '',
    }),
    [currentElection]
  );

  // Methods

  const methods = useForm({
    resolver: yupResolver(ProfileSchema),
    defaultValues,
  });

  // For profile form
  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    if (currentElection) {
      reset(defaultValues);
    }
  }, [currentElection, defaultValues, reset]);

  const onSubmitUpdate = handleSubmit(async (data) => {
    try {
      const response = await UpdateElection(ElectionId, data);

      if (response) {
        enqueueSnackbar('Election updated successfully', { variant: 'success' });
        navigate(`/dashboard/electionmanagement/${ElectionId}`);
      } else {
        enqueueSnackbar('Failed to update Election', { variant: 'error' });
      }
    } catch (error) {
      // Handle errors here if necessary
      console.error('Error updating Election :', error);
      enqueueSnackbar('An error occurred while updating Election ', { variant: 'error' });
    }
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = await createElection(data);

      if (response) {
        enqueueSnackbar('Election created successfully', { variant: 'success' });
        navigate('/dashboard/electionmanagement');
      } else {
        enqueueSnackbar('Failed to create election', { variant: 'error' });
      }
    } catch (error) {
      // Handle errors here if necessary
      console.error('Error submitting election:', error);
      enqueueSnackbar('An error occurred while creating election', { variant: 'error' });
    }
  });

  return (
    <div>
      <FormProvider methods={methods} onSubmit={currentElection ? onSubmitUpdate : onSubmit}>
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
                <RHFTextField name="electionTitle" label="Election Title" />
                <RHFTextField
                  name="electionDate"
                  label="Election Date"
                  InputLabelProps={{ shrink: true }}
                  type="date"
                />
                <RHFTextField
                  name="electionStartTime"
                  InputLabelProps={{ shrink: true }}
                  label="Election Start Time"
                  type="time"
                />

                <RHFTextField
                  name="electionEndTime"
                  InputLabelProps={{ shrink: true }}
                  label="Election End Time"
                  type="time"
                />

                <RHFAutocomplete
                  name="electionType"
                  label="Election Type"
                  placeholder="Choose Election Type"
                  fullWidth
                  options={ELECTION_TYPE_OPTIONS.map((option) => option.label)}
                  getOptionLabel={(option) => option}
                />

                <RHFAutocomplete
                  name="electionInstrumentUsed"
                  label="Method"
                  placeholder="Choose a Method"
                  fullWidth
                  options={ELECTION_METHODS_OPTIONS.map((option) => option.label)}
                  getOptionLabel={(option) => option}
                />

                <RHFAutocomplete
                  name="eligibilityType"
                  label="Eligibility Type"
                  placeholder="Choose Eligibility Type"
                  fullWidth
                  options={ELECTION_ELIGIBILITY_TYPE_OPTIONS.map((option) => option.label)}
                  getOptionLabel={(option) => option}
                />

                <RHFTextField
                  name="nominationStart"
                  InputLabelProps={{ shrink: true }}
                  label="Nomination Start"
                  type="date"
                />
                <RHFTextField
                  name="nominationEnd"
                  InputLabelProps={{ shrink: true }}
                  label="Nomination End"
                  type="date"
                />
              </Box>
              <Stack spacing={1.5} sx={{ marginTop: 4 }}>
                <RHFTextField
                  name="securityMeasures"
                  fullWidth
                  label="Security Measures"
                  multiline
                  rows={2}
                />
              </Stack>
              <Stack spacing={1.5} sx={{ marginTop: 4 }}>
                <RHFTextField
                  name="electionDescription"
                  fullWidth
                  label="Election Description"
                  multiline
                  rows={4}
                />
              </Stack>

              <Stack alignItems="flex-end" sx={{ mt: 3 }}>
                <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                  {!currentElection ? 'Create Election' : 'Save Election Changes'}
                </LoadingButton>
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </FormProvider>
    </div>
  );
}

ElectionNewEditForm.propTypes = {
  currentElection: PropTypes.object,
};
