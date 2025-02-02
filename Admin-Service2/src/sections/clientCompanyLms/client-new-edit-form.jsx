/* eslint-disable jsx-a11y/label-has-associated-control */
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { useMemo, useState, useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
// import { ATTPL_TMS_HOST_API } from 'src/config-global';

import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
// import { TextField } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useTheme } from '@mui/material/styles';
import LoadingButton from '@mui/lab/LoadingButton';

import { useGetUsers } from 'src/api/user';
import { useAuthContext } from 'src/auth/hooks';
import { createDriverProfile, updateDriverProfile } from 'src/api/clientLms';

import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { RHFAutocomplete, RHFTextField } from 'src/components/hook-form';
import { Button, TextField, Typography } from '@mui/material';

// ----------------------------------------------------------------------

export default function ClientNewEditForm({ currentClient }) {
  const navigate = useNavigate();
  const theme = useTheme();
  // eslint-disable-next-line no-unused-vars
  const [show, setShow] = useState({
    Profile: true,
  });

  const clientId = currentClient?.data.clientId;
  const [fileData, setFileData] = useState({
    name: '',
    url: '',
  });
  const { enqueueSnackbar } = useSnackbar();
  const { user: userAuthToken } = useAuthContext();

  const { users: userList } = useGetUsers(userAuthToken?.accessToken);

  const usersListArr = useMemo(
    () =>
      userList?.users
        ? userList.users.filter((user) => user.userRoleId === 9 && user.UserProfile)
        : [],
    [userList]
  );

  const UserNameData = usersListArr.map((list) => ({
    value: list.userId,
    label: `${list.UserProfile?.firstName || ''} ${list.UserProfile?.lastName || ''}`,
    userId: `${list.UserProfile?.firstName || ''} ${list.UserProfile?.lastName || ''}`,
  }));

  const UserNameDataForOptions = UserNameData.map((option) => option.value);

  const ProfileSchema = Yup.object().shape({
    // userId: Yup.number().required('UserName is Required'),
    // currentJobTitle: Yup.string().required('Current Job Title is required'),
    // companyName: Yup.string().required('Company Name is required'),
    // contactPerson: Yup.string().required('Contact Person is required'),
    // phone: Yup.number().required('Contact Number is required'),
    // email: Yup.string()
    //   .required('User')
    //   .required('Email is required')
    //   .email('Email must be a valid email address'),
    // address: Yup.string().required('Street Address is required'),
    // industry: Yup.string().required('Industry is required'),
    // billingContact: Yup.number().required('Billing Contact is required'),
    // annualRevenue: Yup.number().required('Annual Revenue is required'),
  });

  // Identity Values

  const defaultValues = useMemo(
    () => ({
      userId: currentClient?.data?.userId || '',
      // clientCompanyId: currentClient?.data?.clientCompanyId || null,
      currentJobTitle: currentClient?.data.currentJobTitle || '',
      companyName: currentClient?.data.companyName || '',
      contactPerson: currentClient?.data.contactPerson || '',
      phone: currentClient?.data.phone || '',
      email: currentClient?.data.email || '',
      address: `${currentClient?.data.address || ''}`,
      industry: currentClient?.data.industry || '',
      sector: currentClient?.data.sector || '',
      panNumber: currentClient?.data.panNumber || '',
      gstNumber: currentClient?.data.gstNumber || '',
      billingContact: currentClient?.data.billingContact || '',
      documentPdf: `${currentClient?.data.documentPdf || ''}`,
      annualRevenue: currentClient?.data.annualRevenue || '',
    }),
    [currentClient]
  );

  const methods = useForm({
    resolver: yupResolver(ProfileSchema),
    defaultValues,
  });

  // For profile form
  const { handleSubmit, reset, setValue, watch } = methods;

  const value1 = watch();
  useEffect(() => {
    if (currentClient) {
      reset(defaultValues);
    }
  }, [currentClient, defaultValues, reset]);

  // Profile Creation function

  const onSubmitProfile = handleSubmit(async (data) => {
    try {
      console.log('>>>', data);
      const response = await createDriverProfile(data);
      console.log(response);
      if (response) {
        enqueueSnackbar('Client Profile created successfully', { variant: 'success' });
        navigate('/dashboard/Lms_client');
      } else {
        enqueueSnackbar('Failed to create Client profile', { variant: 'error' });
      }
    } catch (error) {
      // Handle errors here if necessary
      console.error('Error submitting Client profile:', error);
      enqueueSnackbar('An error occurred while creating  Client profile', { variant: 'error' });
    }
  });

  // Profile Update function

  const onSubmitProfileUpdate = handleSubmit(async (data) => {
    try {
      const response = await updateDriverProfile(clientId, data);
      console.log('>>>>updatex', response);
      if (response) {
        enqueueSnackbar(' Client Profile Signature created successfully', { variant: 'success' });
        // navigate('/dashboard/driver');
        navigate(`/dashboard/driver/${clientId}`);
      } else {
        enqueueSnackbar('Failed to create Client profile Signature', { variant: 'error' });
      }
    } catch (error) {
      // Handle errors here if necessary
      console.error('Error submitting Client profile Signature:', error);
      enqueueSnackbar('An error occurred while creating  Client profile Signature', {
        variant: 'error',
      });
    }
  });
  const handleFileChanges = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setFileData({
        name: file.name,
        url,
      });

      // Set value in the form for RHFTextField
      setValue('documentPdf', file.name);
    }
  };
  return (
    <div>
      {show.Profile && (
        <FormProvider
          methods={methods}
          onSubmit={currentClient ? onSubmitProfileUpdate : onSubmitProfile}
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
                  <RHFAutocomplete
                    name="userId"
                    label="full Name"
                    value={value1.userId}
                    onChange={(event, value3) => {
                      setValue('userId', value3);
                      console.log(value3);
                      const user = UserNameData.find((option) => option.value === value3);
                      if (user) {
                        setValue('providerName', user.providerName);
                      }
                    }}
                    options={UserNameDataForOptions}
                    getOptionLabel={(value3) => {
                      const user = UserNameData.find((option) => option.value === value3);
                      return user ? user.label : '';
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Full Name"
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
                  {/* <RHFTextField
                    name="userId"
                    label="User ID"
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
                  /> */}
                  <RHFTextField
                    name="currentJobTitle"
                    label="Current Job Title"
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
                    name="companyName"
                    label="Company Name"
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
                    name="contactPerson"
                    label="Contact Person"
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
                    name="phone"
                    label="Phone Number"
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
                    name="email"
                    label="Email"
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
                    name="address"
                    label="Address"
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
                    name="sector"
                    label="Sector"
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
                    name="panNumber"
                    label="Pan Number"
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
                    name="gstNumber"
                    label="GST Number"
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
                    name="industry"
                    label="Industry"
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
                    name="billingContact"
                    label="Billing Contact"
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
                    name="documentPdf"
                    label="Document"
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
                    name="annualRevenue"
                    label="Annual Revenue"
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
                   <Grid container spacing={2} sx={{ mb: 3 }}>
                    <Grid item xs={12}>
                      <input
                        type="file"
                        accept="application/pdf"
                        onChange={handleFileChanges}
                        style={{ display: 'none' }}
                        id="pdf-upload"
                      />
                      <label htmlFor="pdf-upload">
                        <Button variant="contained" component="span">
                          Upload PDF
                        </Button>
                      </label>
                      {fileData.url && (
                        <div>
                          <Typography variant="body1">Selected PDF: {fileData.name}</Typography>
                          <a href={fileData.url} target="_blank" rel="noopener noreferrer">
                            Preview PDF
                          </a>
                        </div>
                      )}
                    </Grid>
                  </Grid>
                </Box>

                <Stack alignItems="flex-end" sx={{ mt: 3 }}>
                  {/* <Button  variant="contained" onClick={() => navigate('/dashboard/LMSUserProfile/new')}>
                    Back
                  </Button> */}
                  <LoadingButton type="submit" variant="contained">
                    {!currentClient ? 'Create Client' : 'Save Changes'}
                  </LoadingButton>
                </Stack>
              </Card>
            </Grid>
          </Grid>
        </FormProvider>
      )}
    </div>
  );
}

ClientNewEditForm.propTypes = {
  currentClient: PropTypes.object,
};
