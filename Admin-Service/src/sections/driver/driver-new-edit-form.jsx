import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMemo, useState, useEffect, useCallback } from 'react';
// import { ATTPL_TMS_HOST_API } from 'src/config-global';

import { useNavigate } from 'react-router-dom';
import imageCompression from 'browser-image-compression';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import { useTheme } from '@mui/material/styles';
import LoadingButton from '@mui/lab/LoadingButton';
import { TextField, Typography } from '@mui/material';

import { uploadTMSFileInAWSS3, deleteTMSFileFromAWSS3 } from 'src/utils/aws-s3-file-handler';

import { useGetUsers } from 'src/api/user';
import { useGetWards } from 'src/api/ward';
import { useGetBooths } from 'src/api/booth';
import { useAuthContext } from 'src/auth/hooks';
import { useGetVehicles } from 'src/api/vehicle';
import { createDriverProfile, updateDriverProfile } from 'src/api/driver';
import { DRIVER_STATES, DRIVER_PATMENT_OPTIONS } from 'src/_mock/_driver';

import { useSnackbar } from 'src/components/snackbar';
// import { fData } from 'src/utils/format-number';
import FormProvider, {
  RHFUpload,
  RHFTextField,
  // RHFUploadAvatar,
  RHFAutocomplete,
} from 'src/components/hook-form';
// import logo from 'src/components/logo';
// ----------------------------------------------------------------------

export default function DriverNewEditForm({ currentDriver }) {
  const navigate = useNavigate();
  const theme = useTheme();
  // eslint-disable-next-line no-unused-vars
  const [show, setShow] = useState({
    Profile: true,
  });
  const [uploadBtn, setUploadBtn] = useState(false);
  const driverId = currentDriver?.data.driverId;

  const { enqueueSnackbar } = useSnackbar();
  const { user: userAuthToken } = useAuthContext();
  // user add

  const { users: userList } = useGetUsers(userAuthToken?.accessToken);
  // const UserList = userList?.data;
  const usersListArr = useMemo(
    () =>
      userList?.users
        ? userList?.users?.filter((user) => user.userRoleId === 8 && user.UserProfile)
        : [],
    [userList]
  );

  const UserNameData = usersListArr?.map((list) => ({
    value: list?.userId,
    label: `${list?.UserProfile?.firstName} ${list?.UserProfile?.lastName}`,
    fullName: `${list?.UserProfile?.firstName} ${list?.UserProfile?.lastName}`,
  }));

  // const UserFullNameData = usersListArr?.map((list) => ({
  //   value: `${list?.UserProfile?.firstName} ${list?.UserProfile?.lastName}`,
  //   label: `${list?.UserProfile?.firstName} ${list?.UserProfile?.lastName}`,
  // }));

  // const UserFullNameDataForOptions = UserFullNameData?.map((option) => option.value);
  const UserNameDataForOptions = UserNameData?.map((option) => option.value);

  // Fetching All Ward List
  const { wards: wardList } = useGetWards();

  const WardListArr = wardList?.data || [];
  console.log(WardListArr, '>>>>>>>>');
  const WardData = WardListArr.map((list) => ({
    value: list.wardId,
    label: list.wardName,
  }));
  const WardDataForOptions = WardData.map((option) => option.value);
  // Fetching All Booth List
  const { booths: boothList } = useGetBooths();
  const BoothListArr = boothList?.data || [];
  const BoothData = BoothListArr.map((list) => ({
    value: list.boothId,
    label: list.boothName,
  }));
  const BoothDataForOptions = BoothData.map((option) => option.value);
  // ------------
  const { vehicles: vehicleList } = useGetVehicles();

  const VehicleListArr = vehicleList?.data || [];

  const VehicleData = VehicleListArr.map((list) => ({
    value: list.vehicleId,
    label: list.vehicleName,
  }));

  // fetching all vehicles list

  const VehicleDataForOptions = VehicleData.map((option) => option.value);

  // Schema

  const ProfileSchema = Yup.object().shape({
    fullName: Yup.string().required('Full Name is required'),
    // userId: Yup.number().required('UserName is Required'),
    email: Yup.string()
      .required('User')
      .required('Email is required')
      .email('Email must be a valid email address'),
    phone: Yup.number().required('Contact Number is required'),
    address: Yup.string().required('Street Address is required'),
    licenseNumber: Yup.string().required('LicenseNumber is required'),
    licenseExpirationDate: Yup.string().required('License Expiration Date is required'),
    licenseIssuingState: Yup.string().required('license Issuing State is required'),
    accountType: Yup.string().required('Account Type is required'),
    paymentMethod: Yup.string().required('Payment Method is required'),
    licenseNumberBackImage: Yup.mixed().required('Licensence Back Image is required'),
    licenseNumberFrontImage: Yup.mixed().required('Licensence Front Image is required'),
  });

  // Identity Values

  const defaultValues = useMemo(
    () => ({
      fullName: currentDriver?.data.fullName || '',
      userId: currentDriver?.data.userId || '',
      email: currentDriver?.data.email || '',
      phone: currentDriver?.data.phone || '',
      address: `${currentDriver?.data.address || ''}`,
      licenseNumber: currentDriver?.data.licenseNumber || '',
      licenseExpirationDate: currentDriver?.data.licenseExpirationDate || '',
      licenseIssuingState: currentDriver?.data.licenseIssuingState || '',
      accountType: currentDriver?.data.accountType || '',
      paymentMethod: currentDriver?.data.paymentMethod || '',
      driverType: currentDriver?.data.driverType || 'Election Driver',
      licenseNumberFrontImage: currentDriver?.data.licenseNumberFrontImage || null,
      licenseNumberBackImage: currentDriver?.data.licenseNumberBackImage || null,
    }),
    [currentDriver]
  );

  const methods = useForm({
    resolver: yupResolver(ProfileSchema),
    defaultValues,
  });

  // For profile form
  const { handleSubmit, reset, setValue, watch } = methods;
  const value1 = watch();
  const value = watch();

  useEffect(() => {
    if (currentDriver) {
      reset(defaultValues);
    }
  }, [currentDriver, defaultValues, reset]);

  // Profile Creation function

  const onSubmitProfile = handleSubmit(async (data) => {
    try {
      console.log('>>>', data);
      const response = await createDriverProfile(data);

      if (response) {
        enqueueSnackbar('Driver Profile created successfully', { variant: 'success' });
        navigate('/dashboard/driver');
      } else {
        enqueueSnackbar('Failed to create Driver profile', { variant: 'error' });
      }
    } catch (error) {
      // Handle errors here if necessary
      console.error('Error submitting Driver profile:', error);
      enqueueSnackbar('An error occurred while creating  Driver profile', { variant: 'error' });
    }
  });

  // Profile Update function

  const onSubmitProfileUpdate = handleSubmit(async (data) => {
    try {
      const response = await updateDriverProfile(driverId, data);
      console.log('>>>>updatex', response);
      if (response) {
        enqueueSnackbar(' Driver Profile Signature created successfully', { variant: 'success' });
        // navigate('/dashboard/driver');
        navigate(`/dashboard/driver/${driverId}`);
      } else {
        enqueueSnackbar('Failed to create Driver profile Signature', { variant: 'error' });
      }
    } catch (error) {
      // Handle errors here if necessary
      console.error('Error submitting Driver profile Signature:', error);
      enqueueSnackbar('An error occurred while creating  Driver profile Signature', {
        variant: 'error',
      });
    }
  });
  const uploadImage = useMemo(
    () => async (file, name) => {
      try {
        const compressedFile = await imageCompression(file, {
          maxSizeMB: 0.5, // Adjust maximum size as needed
          maxWidthOrHeight: 800, // Adjust maximum width or height as needed
        });

        const formData = new FormData();
        formData.append('image', compressedFile);

        const response = await uploadTMSFileInAWSS3(formData);
        console.log(response);
        const imageUrl = response.data.data;

        if (imageUrl) {
          console.log(imageUrl);
          setValue(name, imageUrl);
          enqueueSnackbar('Uploaded successfully', { variant: 'success' });
        } else {
          console.error('Error in uploading file:', response);
          enqueueSnackbar('Error while uploading', { variant: 'error' });
        }
      } catch (error) {
        console.error('Error compressing image:', error);
        enqueueSnackbar('Error while compressing image', { variant: 'error' });
      }
    },
    [setValue, enqueueSnackbar]
  );
  const handleDropSingleFile = useCallback(
    (acceptedFiles, name) => {
      const file = acceptedFiles[0];

      Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (file) {
        uploadImage(file, name);
      }
    },
    [uploadImage]
  );
  const deleteImage = useCallback(
    async (name) => {
      const dataToSend = { url: value[name].preview };
      await deleteTMSFileFromAWSS3(dataToSend)
        .then((data) => {
          setValue(name, null);
          console.log(data);
          enqueueSnackbar('Deleted successfully', { variant: 'success' });
        })
        .catch((err) => {
          console.error('Error in deleting files:', err);
          enqueueSnackbar('Error while deleting', { variant: 'error' });
        });

      // console.log("values.preview =>", values.preview);
    },
    [setValue, enqueueSnackbar, value]
  );
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
                  <RHFAutocomplete
                    name="wardId"
                    label="Ward Name"
                    options={WardDataForOptions}
                    getOptionLabel={(value2) => {
                      const ward = WardData.find((option) => option.value === value2);
                      return ward ? ward.label : '';
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Ward Name"
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
                    name="boothId"
                    label="Booth Name"
                    options={BoothDataForOptions}
                    getOptionLabel={(value2) => {
                      const booth = BoothData.find((option) => option.value === value2);
                      return booth ? booth.label : '';
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Booth Name"
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
                  {/* <RHFTextField
                    name="driverType"
                    label="Driver Type"
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
                    name="licenseNumber"
                    label="License Number"
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
                  <RHFAutocomplete
                    name="licenseIssuingState"
                    label="license Issuing State"
                    placeholder="Choose a state"
                    fullWidth
                    options={DRIVER_STATES.map((option) => option.label)}
                    getOptionLabel={(option) => option}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="license Issuing State"
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
                    name="accountType"
                    label="Account Type"
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
                    name="licenseExpirationDate"
                    InputLabelProps={{ shrink: true }}
                    label="license Expiration Date"
                    type="date"
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="license Expiration Date"
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
                    name="paymentMethod"
                    label="Payment Method"
                    placeholder="Choose Payment Method"
                    fullWidth
                    options={DRIVER_PATMENT_OPTIONS.map((option) => option.label)}
                    getOptionLabel={(option) => option}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Choose Payment Method"
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
                    name="vehicleId"
                    label="Vehicle Name"
                    options={VehicleDataForOptions}
                    getOptionLabel={(value2) => {
                      const vehicle = VehicleData.find((option) => option.value === value2);
                      return vehicle ? vehicle.label : '';
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Vehicle Name"
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
                    name="licenseNumberFrontImage"
                    label="licenseNumberFrontImage"
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
                    name="licenseNumberBackImage"
                    label="licenseNumberBackImage"
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
                </Box>
                <Grid
                  container
                  spacing={2}
                  style={{ paddingLeft: 16, paddingRight: 16, paddingTop: 16, paddingBottom: 16 }}
                >
                  <Grid
                    item
                    xs={8}
                    md={6}
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'flex-start',
                      paddingRight: 16,
                    }}
                  >
                    <Box>
                      <Typography variant="subtitle2">Front License Image</Typography>
                      <RHFUpload
                        thumbnail
                        disabled={uploadBtn}
                        name="licenseNumberFrontImage"
                        maxSize={8388608}
                        onDrop={(file) => handleDropSingleFile(file, 'licenseNumberFrontImage')}
                        onDelete={() => deleteImage('licenseNumberFrontImage')}
                        onRemove={(inputFile) => {
                          setValue(
                            'licenseNumberFrontImage',
                            value.name?.filter((file) => file !== inputFile),
                            { shouldValidate: true }
                          );
                          if (value.licenseNumberFrontImage?.length === 1) {
                            setUploadBtn(false);
                          }
                        }}
                      />
                    </Box>
                  </Grid>

                  <Grid
                    item
                    xs={8}
                    md={6}
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'flex-start',
                      paddingLeft: 8,
                    }}
                  >
                    <Box>
                      <Typography variant="subtitle2">Back License Image</Typography>
                      <RHFUpload
                        thumbnail
                        disabled={uploadBtn}
                        name="licenseNumberBackImage"
                        maxSize={8388608}
                        onDrop={(file) => handleDropSingleFile(file, 'licenseNumberBackImage')}
                        onDelete={() => deleteImage('licenseNumberBackImage')}
                        onRemove={(inputFile) => {
                          setValue(
                            'licenseNumberBackImage',
                            value.licenseNumberBackImage?.filter((file) => file !== inputFile),
                            { shouldValidate: true }
                          );
                          if (value.licenseNumberBackImage?.length === 1) {
                            setUploadBtn(false);
                          }
                        }}
                        onRemoveAll={() => {
                          setValue('licenseNumberBackImage', [], { shouldValidate: true });
                          setUploadBtn(false);
                          setValue('licenseNumberBackImage', '');
                        }}
                      />
                    </Box>
                  </Grid>
                </Grid>
                <Stack alignItems="flex-end" sx={{ mt: 3 }}>
                  <LoadingButton type="submit" variant="contained">
                    {!currentDriver ? 'Create Driver' : 'Save Changes'}
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

DriverNewEditForm.propTypes = {
  currentDriver: PropTypes.object,
};
