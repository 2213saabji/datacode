import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useMemo, useState, useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import { TextField } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useTheme } from '@mui/material/styles';
import LoadingButton from '@mui/lab/LoadingButton';

import { useGetWards } from 'src/api/ward';
import { useGetBooths } from 'src/api/booth';
// import { useGetDrivers } from 'src/api/driver';
// import { useGetVehicles } from 'src/api/vehicle';
import { createTripProfile, updateTripProfile, GetDriverByWardBooth } from 'src/api/wardleader';

import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { RHFTextField, RHFAutocomplete } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export default function WardLeaderNewEditForm({ currentTrip }) {
  const theme = useTheme();
  const navigate = useNavigate();
  // const [sigType, setSigType] = useState(null);
  const [ward, setWard] = useState(null);
  const [booth, setBooth] = useState(null);
  const [driverList, setDriverList] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [show, setShow] = useState({
    Profile: true,
  });

  useEffect(() => {
    if (ward && booth) {
      // Call the custom hook to fetch driver list
      GetDriverByWardBooth(ward, booth).then((res) => {
        setDriverList(res);
      });
    }
  }, [ward, booth]);
  // Fetching All Ward List
  const { wards: wardList } = useGetWards();

  const WardListArr = wardList?.data || [];
  const WardData = WardListArr?.map((list) => ({
    value: list.wardId,
    label: list.wardName,
  }));
  const WardDataForOptions = WardData?.map((option) => option.value);
  // Fetching All Booth List
  const { booths: boothList } = useGetBooths();
  const BoothListArr = boothList?.data || [];
  const BoothData = BoothListArr?.map((list) => ({
    value: list.boothId,
    label: list.boothName,
  }));
  const BoothDataForOptions = BoothData?.map((option) => option.value);
  // fetching all driver list
  // const { drivers: driverList } = useGetDrivers();

  const DriverListArr = driverList || [];

  const DriverData = DriverListArr?.map((list) => {
    if (list && list.VehicleDetail) {
      return {
        value: list.userId,
        label: list.fullName,
      };
    }
    return null;
  }).filter(Boolean);

  const DriverDataForOptions = DriverData?.map((option) => option.value);

  // const { vehicles: vehicleList } = useGetVehicles();

  // const VehicleListArr = vehicleList?.data || [];

  // const VehicleData = VehicleListArr.map((list) => ({
  //   value: list.vehicleId,
  //   label: list.vehicleName,
  // }));

  // fetching all vehicles list

  // const VehicleDataForOptions = VehicleData.map((option) => option.value);

  // const tripId = currentTrip?.tripId;

  const { enqueueSnackbar } = useSnackbar();

  // Schema

  const ProfileSchema = Yup.object().shape({
    userId: Yup.number().required('Driver Name is required'),
    // vehicleId: Yup.number().required('Vehicle Name is required'),
    tripDetails: Yup.string().required('Trip Details is required'),
    tripStatus: Yup.string().required('Trip Status is required'),
  });

  // Identity Values

  const defaultValues = useMemo(
    () => ({
      userId: currentTrip?.userId || '',
      // vehicleId: currentTrip?.vehicleId || '',
      tripDetails: currentTrip?.tripDetails || '',
      tripStatus: currentTrip?.tripStatus || 'Pending',
    }),
    [currentTrip]
  );

  // Methods

  const methods = useForm({
    resolver: yupResolver(ProfileSchema),
    defaultValues,
  });

  // For profile form
  const { handleSubmit, watch, reset } = methods;
  const values = watch();
  useEffect(() => {
    if (values.wardId) {
      setWard(values.wardId);
    }
    if (values.boothId) {
      setBooth(values.boothId);
    }
  }, [values.wardId, values.boothId]);
  useEffect(() => {
    if (currentTrip) {
      reset(defaultValues);
    }
  }, [currentTrip, defaultValues, reset]);
  // Profile Creation function

  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = await createTripProfile(data);
      console.log(response);
      if (response) {
        enqueueSnackbar('Trip created successfully', { variant: 'success' });
        navigate('/dashboard/trip');
      } else {
        enqueueSnackbar('Failed to create Trip', { variant: 'error' });
      }
    } catch (error) {
      // Handle errors here if necessary
      console.error('Error submitting Trip:', error);
      enqueueSnackbar('An error occurred while creating Trip', { variant: 'error' });
    }
  });

  // Profile Update function

  const onSubmitUpdate = handleSubmit(async (data) => {
    console.log(data);
    try {
      const response = await updateTripProfile(currentTrip?.tripId, data);
      console.log('>>>>updatex', response);
      if (response) {
        enqueueSnackbar('Trip Edited created successfully', { variant: 'success' });
        navigate(`/dashboard/trip/managedtrip/list`);
      } else {
        enqueueSnackbar('Failed to create Trip Edited', { variant: 'error' });
      }
    } catch (error) {
      // Handle errors here if necessary
      console.error('Error submitting Trip Edited:', error);
      enqueueSnackbar('An error occurred while creating Trip Edited', { variant: 'error' });
    }
  });

  return (
    <div>
      {show.Profile && (
        <FormProvider methods={methods} onSubmit={currentTrip ? onSubmitUpdate : onSubmit}>
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
                    getOptionLabel={(value) => {
                      const wardid = WardData?.find((option) => option.value === value);
                      return wardid ? wardid.label : '';
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
                    getOptionLabel={(value) => {
                      const boothid = BoothData?.find((option) => option.value === value);
                      return boothid ? boothid.label : '';
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
                  {/* user id fetch krni h  */}
                  <RHFAutocomplete
                    name="userId"
                    label="Driver Name"
                    options={DriverDataForOptions}
                    getOptionLabel={(value) => {
                      const driver = DriverData?.find((option) => option.value === value);
                      return driver ? driver.label : '';
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Driver Name"
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
                    name="tripDetails"
                    label="Trip Details"
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
                    name="tripStatus"
                    label="Trip Status"
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
                </Box>

                <Stack alignItems="flex-end" sx={{ mt: 3 }}>
                  <LoadingButton type="submit" variant="contained">
                    {!currentTrip ? 'Create Trip' : 'Assign'}
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

WardLeaderNewEditForm.propTypes = {
  currentTrip: PropTypes.object,
};
