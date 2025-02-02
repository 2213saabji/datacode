/* eslint-disable no-unused-vars */
import * as Yup from 'yup';
// import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { useMemo, useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import { TextField } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useTheme } from '@mui/material/styles';
import LoadingButton from '@mui/lab/LoadingButton';

import { useAuthContext } from 'src/auth/hooks';
import { useGetCandidates } from 'src/api/candidate';
import { createComplaint } from 'src/api/govtServiceRoadmap';

import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { RHFTextField, RHFAutocomplete } from 'src/components/hook-form';

export default function Complaint() {
  const theme = useTheme();

  const navigate = useNavigate();

  const { user } = useAuthContext();

  const { enqueueSnackbar } = useSnackbar();

  // Schema

  const GovtServiceschema = Yup.object().shape({
    problemDescription: Yup.string().required('Description is required'),
    problemTitle: Yup.string().required('Problem title is required'),
    name: Yup.string().required('Name is required'),
  });

        // {
      //   "userId": 1,
      //     "candidateProfileId":1,
      //   "problemTitle": "Street Light Not Working",
      //   "reportingAuthorityEmail": "sarveshsyadav8@gmail.com",
      //   "problemDescription": "The street light on Elm Street is not working, causing safety concerns for pedestrians.",
      //   "name": "John",
      //   "mobileNumber": "1234567890",
      //   "email": "john.doe@example.com",
      //   "address": "123 Elm Street, Springfield"
      // }

  const defaultValues = useMemo(
    () => ({
      userId: '',
      problemDescription: '',
      candidateProfileId: '',
      reportingAuthorityEmail: '',
      problemTitle: '',
      name: '',
      mobileNumber: '',
      email: '',
      address: '',
    }),
    []
  );

  const methods = useForm({
    resolver: yupResolver(GovtServiceschema),
    defaultValues,
  });

  // for suggesion from

  const { handleSubmit, reset, setValue, watch } = methods;

  const departmentWorkValue = watch('departmentWork');

  // console.log('departmentWorkValue-->', departmentWorkValue)

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  //  Suggesion Creation function

  const onSubmitComplaint = handleSubmit(async (data) => {
    const candidates =
      candidateList?.data?.filter(
        (candidate) =>
          // candidate?.candidateProfileId === data.name) || [];
          candidate?.candidateProfileId === parseInt(data.name, 10)
      ) || [];

    const formData = {
      // voterProblemId: data.voterProblemId,
      userId: user.userId,
      candidateProfileId: data.name,
      problemTitle: data.problemTitle,
      reportingAuthorityEmail: candidates[0].User.email,
      problemDescription: data.problemDescription,
      name: user?.UserProfile?.firstName,
      mobileNumber: user?.phone,
      email: user?.email,
      address: user?.UserAddressesses[0].userState,
    };

    try {
      const response = await createComplaint(formData, user.accessToken);

      if (response) {
        enqueueSnackbar('Suggestion submitted successfully', { variant: 'success' });

        // navigate('/dashboard');
      } else {
        enqueueSnackbar('Failed to create Complaint', { variant: 'error' });
      }
    } catch (error) {
      // Handle errors here if necessary
      console.error('Error submitting Complaint :', error);
      enqueueSnackbar('An error occurred while creating Complaint', { variant: 'error' });
    }
  });

  const { candidates: candidateList } = useGetCandidates(user.accessToken);

  const currentCandidateId = user.userId;

  const UserCandidateArr =
    candidateList?.data?.filter((role) => role?.userId !== currentCandidateId) || [];

  const CandidateData = UserCandidateArr.map((list) => ({
    value: list?.candidateProfileId,
    label: list?.User?.UserProfile?.firstName || list?.User?.phone,
  }));

  const CandidateDataForOptions = CandidateData.map((option) => option.value);

  const options = [
    { value: 'Job Transfer Request', label: 'Job Transfer Request' },
    { value: 'Personal Work', label: 'Personal Work' },
    { value: 'Legal Work', label: 'Legal Work' },
    { value: 'Department Work', label: 'Department Work' },
  ];

  const ProblemData = options.map((list) => ({
    value: list.value,
    label: list.label,
  }));

  const problemDataOptions = ProblemData.map((option) => option.value);

  // const handleSelect = (selectedOption) => {
  //   setValue('problemTitle', selectedOption);
  // };

  // const handleSelectCandidate = (selectAuthEmail){

  // }

  const departmentOptions = [
    'PHED',
    'PWD',
    'CPWD',
    'Education',
    'Home Department',
    'Law Department',
    'Finance Department',
    'Railway',
    'Transport',
    'Food',
    'CM Relief Fund',
    'Electricity Department',
    'other'
  ];

  return (
    //  <RHFAutocomplete
    //                 name="problemTitle"
    //                 label="Subject Type"
    //                 options={problemDataOptions}
    //                  getOptionLabel={(value) => value}
    //                 renderInput={(params) => (
    //                   <TextField
    //                     {...params}
    //                     label="Subject Type"
    //                     InputProps={{
    //                       ...params.InputProps,
    //                       style: {
    //                         color: theme.palette.mode === 'light' ? 'black' : 'white',
    //                         fontSize: '35px',
    //                       },
    //                     }}
    //                     InputLabelProps={{
    //                       style: {
    //                         color: theme.palette.mode === 'light' ? 'black' : 'white',
    //                       },
    //                     }}
    //                   />
    //                 )}
    //               />

    <FormProvider methods={methods} onSubmit={onSubmitComplaint}>
      <Grid>
        <Grid xs={12} md={6}>
          <Card sx={{ pt: 3, px: 3, width: 600 }}>
            <Box sx={{ mb: 5 }}>
              <Stack spacing={2}>
                <RHFAutocomplete
                  name="problemTitle"
                  label="Select Problem "
                  options={problemDataOptions}
                  getOptionLabel={(value) => value}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Subject Type"
                      InputProps={{
                        ...params.InputProps,
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
                  )}
                />

                <RHFAutocomplete
                  name="departmentWork"
                  label="Department"
                  options={departmentOptions}
                  getOptionLabel={(value) => value}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Department"
                      InputProps={{
                        ...params.InputProps,
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
                  )}
                />

                <RHFAutocomplete
                  name="name"
                  label="Your Political Leader"
                  options={CandidateDataForOptions}
                  getOptionLabel={(value) => {
                    const roletype = CandidateData.find((option) => option.value === value);
                    return roletype ? roletype.label : '';
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Select Your Political Leader"
                      InputProps={{
                        ...params.InputProps,
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
                  )}
                // onChange={(e , value) => handleSelectCandidate(value)}
                />
                <RHFTextField
                  name="problemDescription"
                  label="Enter your request here"
                  placeholder={
                    "Enter your request here (e.g., 'The street lights on my block have been out for two weeks, causing safety concerns.')"
                  }
                  multiline
                  rows={5}
                  variant="outlined"
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
                <LoadingButton
                  type="submit"
                  variant="contained"
                  sx={{
                    mt: 2,
                    fontWeight: 1,
                    background: '#078dee',
                    width: '100%',
                    fontSize: 15,
                    borderRadius: 50,
                  }}
                >
                  Submit Request
                </LoadingButton>
              </Stack>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
