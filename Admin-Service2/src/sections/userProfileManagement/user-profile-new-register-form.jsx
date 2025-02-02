import axios from 'axios';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { useState, useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';

import { useBoolean } from 'src/hooks/use-boolean';

import { useAuthContext } from 'src/auth/hooks';
import { useGetRolesList } from 'src/api/userRole';
import { ATTPL_UMS_HOST_API } from 'src/config-global';

import Iconify from 'src/components/iconify';
import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { RHFTextField, RHFAutocomplete } from 'src/components/hook-form';

export default function UserProfileRegisterView() {
  const { user } = useAuthContext();

  const { registerByAdmin } = useAuthContext();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [timer, setTimer] = useState(50);
  const [showTimer, setShowTimer] = useState(true);
  const password = useBoolean();
  const confirmPassword = useBoolean();

  const [show, setShow] = useState({
    firstForm: true,
    pasForm: false,
  });

  const { users: UserRoleList } = useGetRolesList(user.accessToken);

  const [existingUser, setExistingUser] = useState(false);

  const currentUserRoleId = user.userRoleId;

  const UserRoleListArr =
    UserRoleList?.data.filter((role) => role.userRoleId > currentUserRoleId) || [];

  const UserRoleData = UserRoleListArr.map((list) => ({
    value: list.userRoleId,
    label: list.userRoleType,
  }));

  const UserRoleDataForOptions = UserRoleData.map((option) => option.value);
  useEffect(() => {
    setExistingUser(false);
  }, []);

  useEffect(() => {
    let intervalId;

    if (timer > 0 && showTimer) {
      intervalId = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else {
      setShowTimer(false);
      clearInterval(intervalId);
    }

    return () => clearInterval(intervalId);
  }, [timer, showTimer]);

  const EmailNumberSchema = Yup.object().shape({
    userRoleId: Yup.string().required('User id is required'),
    phone: Yup.string().required('Phone number is required'),
  });

  const PasswordSchema = Yup.object().shape({
    password: Yup.string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,12}$/,
        'Password must contain at least one lowercase letter, one uppercase letter, one number, one special character, and be between 6 to 12 characters long'
      )
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
  });

  const defaultValuesEmailNumber = {
    userRoleId: '',
    phone: '',
  };
  const defaultValuesPassword = {
    password: '',
  };

  const emailNumberMethods = useForm({
    resolver: yupResolver(EmailNumberSchema),
    defaultValuesEmailNumber,
  });

  const passwordMethods = useForm({
    resolver: yupResolver(PasswordSchema),
    defaultValuesPassword,
  });
  const { handleSubmit: handleSubmitEmailNum } = emailNumberMethods;
  const { handleSubmit: handleSubmitPassword } = passwordMethods;

  const onSubmitEmailNumber = handleSubmitEmailNum(async (data) => {
    try {
      const url = `${ATTPL_UMS_HOST_API}/user/search/mobile-number`;
      const headers = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const responseValidNumber = await axios.post(url, { phone: data.phone }, { headers });

      if (responseValidNumber.data.data) {
        setExistingUser(true);
      }
    } catch (error) {
      setShow({ emForm: false, pasForm: true });
    }
  });

  const onSubmitPassword = handleSubmitPassword(async (data) => {
    try {
      if (registerByAdmin) {
        const { response } = await registerByAdmin(
          emailNumberMethods.getValues('phone'),
          data.password,
          emailNumberMethods.getValues('userRoleId'),
          user.userId
        );
        if (response === 'ok') {
          enqueueSnackbar('registered successfully!', { variant: 'success' });
          navigate('/dashboard/userProfileManagement');
        }
      } else {
        console.error('registerByAdmin is not defined');
      }
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Failed to register.', { variant: 'error' });
    }
  });

  return (
    <>
      {show.firstForm && (
        <FormProvider methods={emailNumberMethods} onSubmit={onSubmitEmailNumber}>
          <Grid container spacing={3}>
            <Grid xs={12} md={6}>
              <Card sx={{ pt: 10, pb: 5, px: 3 }}>
                <Box sx={{ mb: 5 }}>
                  <Stack spacing={2}>
                    <RHFAutocomplete
                      name="userRoleId"
                      label="Role Type"
                      options={UserRoleDataForOptions}
                      getOptionLabel={(value) => {
                        const roletype = UserRoleData.find((option) => option.value === value);
                        return roletype ? roletype.label : '';
                      }}
                    />
                    <Typography variant="body2" sx={{ color: 'red' }}>
                      {existingUser && `Mobile Number already exist.`}
                    </Typography>
                    <RHFTextField name="phone" label="Mobile Number" />
                    <Button variant="contained" size="large" type="submit">
                      Next
                    </Button>
                  </Stack>
                </Box>
              </Card>
            </Grid>
          </Grid>
        </FormProvider>
      )}
      {show.pasForm && (
        <FormProvider methods={passwordMethods} onSubmit={onSubmitPassword}>
          <Grid container spacing={3}>
            <Grid xs={12} md={6}>
              <Card sx={{ pt: 10, pb: 5, px: 3 }}>
                <Box sx={{ mb: 5 }}>
                  <Stack spacing={2}>
                    <RHFTextField
                      name="password"
                      label="Password"
                      type={password.value ? 'text' : 'password'}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton onClick={password.onToggle} edge="end">
                              <Iconify
                                icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'}
                              />
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                    <RHFTextField
                      name="confirmPassword"
                      label="Confirm Password"
                      type={confirmPassword.value ? 'text' : 'password'}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton onClick={confirmPassword.onToggle} edge="end">
                              <Iconify
                                icon={
                                  confirmPassword.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'
                                }
                              />
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                    <Button variant="contained" size="large" type="submit">
                      Submit
                    </Button>
                  </Stack>
                </Box>
              </Card>
            </Grid>
          </Grid>
        </FormProvider>
      )}
    </>
  );
}
