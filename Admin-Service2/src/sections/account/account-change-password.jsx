import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { yupResolver } from '@hookform/resolvers/yup';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';

import { useBoolean } from 'src/hooks/use-boolean';

import { useAuthContext } from 'src/auth/hooks';

import Iconify from 'src/components/iconify';
import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { RHFTextField } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export default function AccountChangePassword() {
  const navigate = useNavigate();
  const { user, createNewPassword } = useAuthContext();

  const { enqueueSnackbar } = useSnackbar();

  const oldPassword = useBoolean();
  const newPassword = useBoolean();
  const confirmNewPassword = useBoolean();

  const ChangePassWordSchema = Yup.object().shape({
    oldPassword: Yup.string().required('Old Password is required'),
    newPassword: Yup.string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#_])[A-Za-z\d@$!%*?&#_]{6,16}$/,
        'Password must contain at least one lowercase letter, one uppercase letter, one number, one special character, and be between 6 to 16 characters long'
      )
      .required('Password is required'),
    confirmNewPassword: Yup.string()
      .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
      .required('Confirm Password is required'),
  });

  const defaultValues = {
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  };

  const methods = useForm({
    resolver: yupResolver(ChangePassWordSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  // const updateNewPassword = handleSubmit(async (data) => {
  //   try {
  //     const updatedData = {
  //       oldPassword: data.oldPassword,
  //       newPassword: data.newPassword,
  //     }
  //     const response = await createNewPassword(updatedData);
  //     if (response) {
  //       enqueueSnackbar('Password Changed successfully', { variant: 'success' });
  //       navigate('/dashboard');
  //     } else {
  //       enqueueSnackbar('Failed to create Password', { variant: 'error' });
  //     }
  //   } catch (error) {
  //     // Handle errors here if necessary
  //     console.error('Error Creating Password :', error);
  //     enqueueSnackbar('An error occurred while creating Password', { variant: 'error' });
  //   }
  // });

  const updateNewPassword = handleSubmit(async (data) => {
    try {
      const updatedData = {
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
      };
      const response = await createNewPassword(updatedData, user?.accessToken);
      if (response) {
        enqueueSnackbar('Password Changed successfully', { variant: 'success' });
        navigate('/dashboard');
      } else {
        enqueueSnackbar('Failed to create Password', { variant: 'error' });
      }
    } catch (error) {
      // Handle errors here if necessary
      console.error('Error Creating Password :', error);
      enqueueSnackbar('An error occurred while creating Password', { variant: 'error' });
    }
  });

  return (
    <FormProvider methods={methods} onSubmit={updateNewPassword}>
      <Stack component={Card} spacing={3} sx={{ p: 3 }}>
        <RHFTextField
          name="oldPassword"
          type={oldPassword.value ? 'text' : 'password'}
          label="Old Password"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={oldPassword.onToggle} edge="end">
                  <Iconify icon={oldPassword.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <RHFTextField
          name="newPassword"
          label="New Password"
          type={newPassword.value ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={newPassword.onToggle} edge="end">
                  <Iconify icon={newPassword.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
          helperText={
            <Stack component="span" direction="row" alignItems="center">
              <Iconify icon="eva:info-fill" width={16} sx={{ mr: 0.5 }} /> Password must be minimum
              6+
            </Stack>
          }
        />

        <RHFTextField
          name="confirmNewPassword"
          type={confirmNewPassword.value ? 'text' : 'password'}
          label="Confirm New Password"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={confirmNewPassword.onToggle} edge="end">
                  <Iconify
                    icon={confirmNewPassword.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'}
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <LoadingButton type="submit" variant="contained" loading={isSubmitting} sx={{ ml: 'auto' }}>
          Save Changes
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
