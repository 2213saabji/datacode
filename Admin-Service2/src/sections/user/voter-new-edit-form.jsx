import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { useMemo, useEffect } from 'react';
// import { useNavigate } from 'react-router';
import { yupResolver } from '@hookform/resolvers/yup';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import { CardHeader } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useTheme } from '@mui/material/styles';
import LoadingButton from '@mui/lab/LoadingButton';

import { useAuthContext } from 'src/auth/hooks';
import { useGetPools } from 'src/api/poolManagement';
import { UpdateNewVoterProfile, createnewVoterProfile } from 'src/api/voter';

import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { RHFTextField } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export default function VoterNewEditForm({ voterEdit, newVoter, setNewVoter }) {
  // const navigate = useNavigate();
  const theme = useTheme();
  // eslint-disable-next-line no-unused-vars
  const voterId = voterEdit?.data?.voterProfileId;
  const newvoterId = newVoter?.data?.newVoterProfileId;
  const { user: CurrentUser } = useAuthContext();

  const { enqueueSnackbar } = useSnackbar();
  const { pools: pollList } = useGetPools();

  const pollListArr = pollList?.data || [];

  const PollData = pollListArr.map((list) => ({
    value: list.pollingStationId,
    label: list.pollingStationName,
  }));

  // eslint-disable-next-line no-unused-vars
  const PollListDataForOptions = PollData.map((option) => option.value);

  const VoterSchema = Yup.object().shape({
    upiId: Yup.string().required('UPI ID is required'),
    epicNo: Yup.number().required('epicNo is required'),
    wardNo: Yup.number().required('wardNo is required'),
    panchayatName: Yup.string().required('panchayatName is required'),
    tehsilName: Yup.string().required('tehsilName is required'),
  });

  const defaultValues = useMemo(
    () => ({
      upiId: '',
      epicNo: '',
      wardNo: '',
      panchayatName: '',
      tehsilName: '',
    }),
    []
  );

  const methods = useForm({
    resolver: yupResolver(VoterSchema),
    defaultValues,
  });

  const { handleSubmit, reset } = methods;

  useEffect(() => {
    if (voterEdit) {
      reset(defaultValues);
    }
  }, [voterEdit, defaultValues, reset]);

  const onSubmitProfileUpdate = handleSubmit(async (data) => {
    try {
      const response = await UpdateNewVoterProfile(newvoterId, data, CurrentUser?.accessToken);

      if (response) {
        setNewVoter(response?.data);
        reset();
        enqueueSnackbar('Voter Profile updated successfully', { variant: 'success' });
      } else {
        enqueueSnackbar('Failed to update voter profile', { variant: 'error' });
      }
    } catch (error) {
      console.error('Error updating  voter profile:', error);
      enqueueSnackbar('An error occurred while updating voter profile', { variant: 'error' });
    }
  });
  const onSubmitProfileCreate = handleSubmit(async (data) => {
    try {
      const newdata = {
        ...data,
        userId: CurrentUser?.userId,
      };

      const response = await createnewVoterProfile(newdata, CurrentUser?.accessToken);

      if (response) {
        setNewVoter(response?.data);
        reset();
        enqueueSnackbar('Voter Profile Create successfully', { variant: 'success' });
      } else {
        enqueueSnackbar('Failed to Create voter profile', { variant: 'error' });
      }
    } catch (error) {
      console.error('Error Creating  voter profile:', error);
      enqueueSnackbar('An error occurred while Creating voter profile', { variant: 'error' });
    }
  });

  return (
    <FormProvider
      methods={methods}
      onSubmit={newvoterId ? onSubmitProfileUpdate : onSubmitProfileCreate}
    >
      <Grid>
        <Grid xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <CardHeader title="VOTER DETAILS FORM" sx={{ pl: 0, mb: 3 }} />
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
                name="epicNo"
                label="Epic No."
                InputProps={{
                  style: {
                    color: theme.palette.mode === 'light' ? 'black' : 'white',
                  },
                }}
                InputLabelProps={{
                  style: {
                    color: theme.palette.mode === 'light' ? 'black' : 'white',
                  },
                }}
              />
              <RHFTextField
                name="wardNo"
                label="Ward No."
                InputProps={{
                  style: {
                    color: theme.palette.mode === 'light' ? 'black' : 'white',
                  },
                }}
                InputLabelProps={{
                  style: {
                    color: theme.palette.mode === 'light' ? 'black' : 'white',
                  },
                }}
              />
            </Box>

            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              sx={{ mt: 2 }}
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
              }}
            >
              <RHFTextField
                name="panchayatName"
                label="Panchayat Name"
                InputProps={{
                  style: {
                    color: theme.palette.mode === 'light' ? 'black' : 'white',
                  },
                }}
                InputLabelProps={{
                  style: {
                    color: theme.palette.mode === 'light' ? 'black' : 'white',
                  },
                }}
              />
              <RHFTextField
                name="tehsilName"
                label="Tehsil Name"
                InputProps={{
                  style: {
                    color: theme.palette.mode === 'light' ? 'black' : 'white',
                  },
                }}
                InputLabelProps={{
                  style: {
                    color: theme.palette.mode === 'light' ? 'black' : 'white',
                  },
                }}
              />
            </Box>

            <RHFTextField sx={{ mt: 2 }} name="upiId" label="UPI ID" />

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained">
                Save Changes
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}

VoterNewEditForm.propTypes = {
  voterEdit: PropTypes.object,
  newVoter: PropTypes.object,
  setNewVoter: PropTypes.func,
};
