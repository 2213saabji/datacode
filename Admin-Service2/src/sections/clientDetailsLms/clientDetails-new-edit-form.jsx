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
import { TextField } from '@mui/material';
import {useTheme} from '@mui/material/styles'
import Grid from '@mui/material/Unstable_Grid2';
import LoadingButton from '@mui/lab/LoadingButton';

import { useGetUsers } from 'src/api/user';
import {useGetServices} from 'src/api/case';
import { useAuthContext } from 'src/auth/hooks';
import { createClientDetails, updateClientDetails} from 'src/api/clientDetails';

import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { RHFAutocomplete } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export default function ClientNewEditForm({ currentDriver }) {
  const navigate = useNavigate();
 const theme = useTheme();
  // eslint-disable-next-line no-unused-vars
  const [show, setShow] = useState({
    Profile: true,
  });

  const clientId = currentDriver?.data.clientId;

  const { enqueueSnackbar } = useSnackbar();
  const {services: ServiceList} = useGetServices();
  const ServiceListArr = ServiceList?.data || [];
  const ServiceData = ServiceListArr.map((list)=>({
    value: list.caseId,
    label:list.caseDetails,
  }))
 const ServiceDataForOptions = ServiceData.map((option) => option.value)
console.log(ServiceDataForOptions);

const { user: userAuthToken } = useAuthContext();
const { users: userList } = useGetUsers(userAuthToken?.accessToken);
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
const UserNameDataForOptions = UserNameData?.map((option) => option.value);


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
      userId: currentDriver?.data?.userId || '',
      caseId: currentDriver?.data?.caseId || '',
      
    }),
    [currentDriver]
  );

  const methods = useForm({
    resolver: yupResolver(ProfileSchema),
    defaultValues,
  });

  // For profile form
  const { handleSubmit, reset,setValue,watch} = methods;
  const value1 = watch();

  useEffect(() => {
    if (currentDriver) {
      reset(defaultValues);
    }
  }, [currentDriver, defaultValues, reset]);

  // Profile Creation function

  const onSubmitProfile = handleSubmit(async (data) => {
    try {
      console.log('>>>', data);
      const response = await createClientDetails(data);
      console.log(response)
      if (response) {
        enqueueSnackbar('Client Profile created successfully', { variant: 'success' });
        navigate('/dashboard/LMS_caseDetails');
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
      const response = await updateClientDetails(clientId, data);
      console.log('>>>>updatex', response);
      if (response) {
        enqueueSnackbar(' Client Profile Signature created successfully', { variant: 'success' });
        // navigate('/dashboard/driver');
        navigate(`/dashboard/LMS_caseDetails/${clientId}`);
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

  return (
    <div>
      {show.Profile && (
        <FormProvider
          methods={methods}
          onSubmit={currentDriver ? onSubmitProfileUpdate : onSubmitProfile}
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
                   <RHFAutocomplete
                    name="userId"
                    label="User Name"
                    value={value1.userId}
                    onChange={(event, value2) => {
                      setValue('userId', value2);
                      console.log(value2);
                      const user = UserNameData.find((option) => option.value === value2);
                      if (user) {
                        setValue('fullName', user.fullName);
                      }
                    }}
                    options={UserNameDataForOptions}
                    getOptionLabel={(value2) => {
                      const user = UserNameData.find((option) => option.value === value2);
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
                  />
                  <RHFAutocomplete
                    name="caseId"
                    label="Case Name"
                    options={ServiceDataForOptions}
                    getOptionLabel={(value) => {
                      const service = ServiceData.find((option) => option.value === value);
                      return service ? service.label : '';
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Case Name"
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
                </Box>

                <Stack alignItems="flex-end" sx={{ mt: 3 }}>
                {/* <Button  variant="contained" onClick={() => navigate('/dashboard/LMSUserProfile/new')}>
                    Back
                  </Button> */}
                  <LoadingButton type="submit" variant="contained">
                    {!currentDriver ? 'Create Client' : 'Save Changes'}
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
  currentDriver: PropTypes.object,
};
