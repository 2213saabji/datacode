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

import {
  createServiceVersion,
  UpdateServiceVersion,
  // useGetServices,
} from 'src/api/vms';

// import { useGetUsers } from 'src/api/user';
// import { useGetParties } from 'src/api/party';
// import { useGetElections } from 'src/api/election';

import { TextField } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { SERVICE_STATUS } from 'src/_mock';

import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { RHFTextField, RHFAutocomplete } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export default function ServiceVersionNewEditForm({ currentversions }) {
  const navigate = useNavigate();

  // const candidateId = currentversions?.data.candidateProfileId;
  const versionId = currentversions?.data.versionId;

  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();

  // for getting all candidates those have candidate profile id

  // const { candidates: candidateList } = useGetCandidates();
  // const { versions: currentversions } = useGetServices();
  // const CandidateListArr = candidateList?.data || [];
  // const CandidateProfileList = CandidateListArr?.map((candidate) => candidate.userId) || [];

  // const VersionListArr = currentversions?.data || [];
  // const VersionList = VersionListArr?.map((version) => version.sourceCommitId) || [];

  // for getting all election ids

  // const { elections: electionsList } = useGetElections();

  // const ElectionListArr = electionsList?.data || [];

  // const ElectionData = ElectionListArr.map((list) => ({
  //   value: list.electionId,
  //   label: list.electionTitle,
  // }));

  // const ElectionListDataForOptions = ElectionData.map((option) => option.value);

  // for getting all the users with role of candidate

  // const { users: usersList } = useGetUsers();

  // const allUserArr = usersList && usersList.data ? usersList.data.filter(user => user.userRoleId === 2) : [];
  // const usersListArr = usersList && usersList.data ? usersList.data.filter(user => user.userRoleId === 2 && !CandidateProfileList.includes(user.userId)) : [];

  // const UserData = usersListArr.map((list) => ({
  //   value: list.userId,
  //   label: list.userName,
  // }));

  // const AllUserData = allUserArr.map((list) => ({
  //   value: list.userId,
  //   label: list.userName,
  // }));

  // const AllUserDataForOptions = AllUserData.map((option) => option.value);

  // const UserListDataForOptions = UserData.map((option) => option.value);

  // fetching the Party  List

  // const { parties: partyList } = useGetParties();

  // const PartyListArr = partyList?.data || [];

  // const PartyData = PartyListArr.map((list) => ({
  //   value: list.partyId,
  //   label: list.partyName,
  // }));

  // const PartyListDataForOptions = PartyData.map((option) => option.value);

  // Schema

  const ServiceSchema = Yup.object().shape({
    serviceName: Yup.string().required('Service Name is required'),
    serviceShortName: Yup.string().required('service short name is required'),
    serviceVersionMax: Yup.string().required('service version is required'),
    serviceVersionMin: Yup.string().required('service version is required'),
    serviceEnvironment: Yup.string().required('Service Environment is required'),
    serviceOwner: Yup.string().required('Service Owner is required'),
    sourceCommitId: Yup.string().required('Source Commit Id is required'),
    deploymentNotes: Yup.string().required('Deployment Notes is required'),
    status: Yup.string().required('Status is required'),
    dependencies: Yup.string().required('Dependencies is required'),
    testingResults: Yup.string().required('Testing Results is required'),
    rollbackInstructions: Yup.string().required('Rollback Instructions is required'),
  });

  // Default Values

  const defaultValues = useMemo(
    () => ({
      serviceName: currentversions?.data.serviceName || '',
      serviceShortName: currentversions?.data.serviceShortName || '',
      serviceVersionMax: currentversions?.data.serviceVersion || '',
      serviceVersionMin: currentversions?.data.serviceVersion || '',
      serviceEnvironment: currentversions?.data.serviceEnvironment || '',
      serviceOwner: currentversions?.data.serviceOwner || '',
      sourceCommitId: currentversions?.data.sourceCommitId || '',
      deploymentNotes: currentversions?.data.deploymentNotes || '',
      status: currentversions?.data.status || '',
      dependencies: currentversions?.data.dependencies || '',
      testingResults: currentversions?.data.testingResults || '',
      rollbackInstructions: currentversions?.data.rollbackInstructions || '',
    }),
    [currentversions]
  );

  // Methods

  const methods = useForm({
    resolver: yupResolver(ServiceSchema),
    defaultValues,
  });

  const { handleSubmit, reset } = methods;

  useEffect(() => {
    if (currentversions) {
      reset(defaultValues);
    }
  }, [currentversions, defaultValues, reset]);

  // Profile Creation function

  const onSubmitService = handleSubmit(async (data) => {
    try {
      const { serviceVersionMax, serviceVersionMin, ...dataa } = data;
      const updatedData = { ...dataa, serviceVersion: `${serviceVersionMax}.${serviceVersionMin}` };
      // console.log(updatedData)
      const response = await createServiceVersion(updatedData);

      if (response) {
        // console.log('Service version created successfully', response)
        enqueueSnackbar('Service version created successfully', { variant: 'success' });
        navigate('/dashboard/serviceversion');
      }
    } catch (error) {
      // Handle errors here if necessary
      console.error('Error submitting version:', error);
      enqueueSnackbar('An error occurred while creating service', { variant: 'error' });
    }
  });

  // Profile Update function

  const onSubmitServiceUpdate = handleSubmit(async (data) => {
    try {
      const response = await UpdateServiceVersion(versionId, data);
      if (response) {
        enqueueSnackbar('Service updated successfully', { variant: 'success' });
        navigate(`/dashboard/serviceversion`);
      }
    } catch (error) {
      // Handle errors here if necessary
      console.error('Error submitting service:', error);
      enqueueSnackbar('An error occurred while creating service verion', { variant: 'error' });
    }
  });

  return (
    <FormProvider
      methods={methods}
      onSubmit={currentversions ? onSubmitServiceUpdate : onSubmitService}
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
                name="serviceName"
                label="Service Name"
                InputLabelProps={{
                  style: {
                    color: theme.palette.mode === 'light' ? 'black' : 'white',
                  },
                }}
              />

              <RHFTextField
                name="serviceShortName"
                label="Service Short Name"
                InputLabelProps={{
                  style: {
                    color: theme.palette.mode === 'light' ? 'black' : 'white',
                  },
                }}
              />

              <RHFTextField
                name="serviceVersionMax"
                label="Service Major Version"
                InputLabelProps={{
                  style: {
                    color: theme.palette.mode === 'light' ? 'black' : 'white',
                  },
                }}
              />

              <RHFTextField
                name="serviceVersionMin"
                label="Service Minor Version"
                InputLabelProps={{
                  style: {
                    color: theme.palette.mode === 'light' ? 'black' : 'white',
                  },
                }}
              />

              <RHFTextField
                name="serviceEnvironment"
                label="Service Environment"
                InputLabelProps={{
                  style: {
                    color: theme.palette.mode === 'light' ? 'black' : 'white',
                  },
                }}
              />

              <RHFTextField
                name="serviceOwner"
                label="Service Owner"
                InputLabelProps={{
                  style: {
                    color: theme.palette.mode === 'light' ? 'black' : 'white',
                  },
                }}
              />

              <RHFTextField
                name="sourceCommitId"
                label="Source CommitId"
                InputLabelProps={{
                  style: {
                    color: theme.palette.mode === 'light' ? 'black' : 'white',
                  },
                }}
              />

              <RHFTextField
                name="deploymentNotes"
                label="Deployment Notes"
                InputLabelProps={{
                  style: {
                    color: theme.palette.mode === 'light' ? 'black' : 'white',
                  },
                }}
              />

              <RHFAutocomplete
                name="status"
                label="Status"
                options={SERVICE_STATUS.map((option) => option.label)}
                getOptionLabel={(option) => option}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Status"
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
                name="dependencies"
                label="Dependencies"
                InputLabelProps={{
                  style: {
                    color: theme.palette.mode === 'light' ? 'black' : 'white',
                  },
                }}
              />

              <RHFTextField
                name="testingResults"
                label="Testing Results"
                InputLabelProps={{
                  style: {
                    color: theme.palette.mode === 'light' ? 'black' : 'white',
                  },
                }}
              />
            </Box>

            <Stack spacing={1.5} sx={{ mt: 2 }}>
              <RHFTextField
                name="rollbackInstructions"
                fullWidth
                label="Rollback Instructions"
                multiline
                rows={4}
                InputLabelProps={{
                  style: {
                    color: theme.palette.mode === 'light' ? 'black' : 'white',
                  },
                }}
              />
            </Stack>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained">
                {!currentversions ? 'Create Service' : 'Save Changes'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}

ServiceVersionNewEditForm.propTypes = {
  currentversions: PropTypes.object,
};
