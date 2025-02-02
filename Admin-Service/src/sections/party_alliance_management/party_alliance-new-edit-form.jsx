import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';

// import { ATTPL_EMS_HOST_API } from 'src/config-global';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import LoadingButton from '@mui/lab/LoadingButton';

// import { useResponsive } from 'src/hooks/use-responsive';

// import { _tags} from 'src/_mock';
import { createPartyAllianceProfile, UpdatePartyAllianceProfile } from 'src/api/party_alliance';

import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { RHFTextField } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export default function PartyAllianceNewEditForm({ currentPartyAlliance }) {
  // Required Variablesgthdtxtrrsedsr
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const partyAllianceId = currentPartyAlliance?.data.partyAllianceId;

  // Form Validation Schema
  const PartyAllianceSchema = Yup.object().shape({
    partyAllianceName: Yup.string().required('Party alliance name is required'),
  });

  // Form Values
  const defaultValues = useMemo(
    () => ({
      partyAllianceName: currentPartyAlliance?.data.partyAllianceName || '',
    }),
    [currentPartyAlliance]
  );

  // Form Method
  const methods = useForm({
    resolver: yupResolver(PartyAllianceSchema),
    defaultValues,
  });
  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    if (currentPartyAlliance) {
      reset(defaultValues);
    }
  }, [currentPartyAlliance, defaultValues, reset]);

  // Function Call for New Ward Profile
  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = await createPartyAllianceProfile(data);
      if (response) {
        enqueueSnackbar('Party Alliance created successfully', { variant: 'success' });
        navigate('/dashboard/party_alliance');
      } else {
        enqueueSnackbar('Failed to create party alliance', { variant: 'error' });
      }
    } catch (error) {
      console.error('Error submitting party alliance:', error);
      enqueueSnackbar('An error occurred while creating party alliance', { variant: 'error' });
    }
  });

  // Function Call for Updating Ward Profile
  const onSubmitUpdate = handleSubmit(async (data) => {
    try {
      const response = await UpdatePartyAllianceProfile(partyAllianceId, data);

      if (response) {
        enqueueSnackbar('Party Alliance updated successfully', { variant: 'success' });
        navigate(`/dashboard/party_alliance/${partyAllianceId}`);
      } else {
        enqueueSnackbar('Failed to update party alliance', { variant: 'error' });
      }
    } catch (error) {
      // Handle errors here if necessary
      console.error('Error updating party alliance :', error);
      enqueueSnackbar('An error occurred while updating party alliance ', { variant: 'error' });
    }
  });

  return (
    <FormProvider methods={methods} onSubmit={currentPartyAlliance ? onSubmitUpdate : onSubmit}>
      <Grid container spacing={3}>
        <Grid xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={3} sx={{ p: 3 }}>
              <RHFTextField name="partyAllianceName" label="Party Alliance Name" />
            </Stack>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {!currentPartyAlliance ? 'Create Party Alliance' : 'Save Party Alliance'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}

PartyAllianceNewEditForm.propTypes = {
  currentPartyAlliance: PropTypes.object,
};
