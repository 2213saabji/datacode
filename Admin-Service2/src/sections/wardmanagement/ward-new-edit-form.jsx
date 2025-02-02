import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import { useTheme } from '@mui/material/styles';
import LoadingButton from '@mui/lab/LoadingButton';

// import { useResponsive } from 'src/hooks/use-responsive';

import { useGetElections } from 'src/api/election';
import { createWardProfile, UpdateWardProfile } from 'src/api/ward';
import { WARD_STATES, WARD_COUNTRY, INDIAN_CITIES, WARD_CAPACITY } from 'src/_mock';

import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { RHFTextField, RHFAutocomplete } from 'src/components/hook-form';

// import { ATTPL_EMS_HOST_API } from 'src/config-global';

// ----------------------------------------------------------------------

export default function WardNewEditForm({ currentWard }) {
  // Required Variablesgthdtxtrrsedsr
  const navigate = useNavigate();
  const theme = useTheme();
  // const mdUp = useResponsive('up', 'md');
  const { enqueueSnackbar } = useSnackbar();
  const wardId = currentWard?.data.wardId;

  const { elections: electionsList } = useGetElections();

  const ElectionListArr = electionsList?.data || [];

  const ElectionData = ElectionListArr.map((list) => ({
    value: list.electionId,
    label: list.electionTitle,
  }));

  const ElectionListDataForOptions = ElectionData.map((option) => option.value);

  // Form Validation Schema
  const WardSchema = Yup.object().shape({
    wardNumber: Yup.number().required('Ward number is required'),
    wardName: Yup.string().required('Ward name is required'),
    wardStreetAddress: Yup.string().required('Street address is required'),
    wardCity: Yup.string().required('City is required'),
    wardState: Yup.string().required('State is required'),
    wardPostalCode: Yup.number().required('Postal code is required'),
    wardCountry: Yup.string().required('Country is required'),
    wardCapacity: Yup.number().required('Capacity is required'),
    securityMeasures: Yup.string().required('Security measures are required'),
    emergencyContactNumber: Yup.number().required('Emergency contact number is required'),
    incidentReporting: Yup.string().required('Incident reporting information is required'),
    districtName: Yup.string().required('District name is required'),
    tehsilName: Yup.string().required('Tehsil is required'),
    electionId: Yup.number().required('Election is required'),
  });

  // Form Values
  const defaultValues = useMemo(
    () => ({
      wardNumber: currentWard?.data.wardNumber || null,
      wardName: currentWard?.data.wardName || '',
      wardStreetAddress: currentWard?.data.wardStreetAddress || '',
      wardCity: currentWard?.data.wardCity || '',
      wardState: currentWard?.data.wardState || '',
      wardPostalCode: currentWard?.data.wardPostalCode || null,
      wardCountry: currentWard?.data.wardCountry || '',
      wardCapacity: currentWard?.data.wardCapacity || null,
      securityMeasures: currentWard?.data.securityMeasures || '',
      emergencyContactNumber: currentWard?.data.emergencyContactNumber || null,
      incidentReporting: currentWard?.data.incidentReporting || '',
      districtName: currentWard?.data.districtName || '',
      tehsilName: currentWard?.data.tehsilName || '',
      electionId: currentWard?.data.electionId || null,
    }),
    [currentWard]
  );

  // Form Method
  const methods = useForm({
    resolver: yupResolver(WardSchema),
    defaultValues,
  });
  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;
  useEffect(() => {
    if (currentWard) {
      reset(defaultValues);
    }
  }, [currentWard, defaultValues, reset]);

  // Function Call for New Ward Profile
  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = await createWardProfile(data);
      if (response) {
        enqueueSnackbar('Profile created successfully', { variant: 'success' });
        navigate('/dashboard/wardmanagement');
      } else {
        enqueueSnackbar('Failed to create profile', { variant: 'error' });
      }
    } catch (error) {
      console.error('Error submitting profile:', error);
      enqueueSnackbar('An error occurred while creating profile', { variant: 'error' });
    }
  });

  // Function Call for Updating Ward Profile
  const onSubmitUpdate = handleSubmit(async (data) => {
    try {
      const response = await UpdateWardProfile(wardId, data);

      if (response) {
        enqueueSnackbar('Ward Profile created successfully', { variant: 'success' });
        navigate(`/dashboard/wardmanagement/${wardId}`);
      } else {
        enqueueSnackbar('Failed to create Ward profile', { variant: 'error' });
      }
    } catch (error) {
      // Handle errors here if necessary
      console.error('Error submitting Ward profile :', error);
      enqueueSnackbar('An error occurred while creating Ward profile ', { variant: 'error' });
    }
  });

  return (
    <FormProvider methods={methods} onSubmit={currentWard ? onSubmitUpdate : onSubmit}>
      <Grid container spacing={3}>
        <Grid xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={3} sx={{ p: 3 }}>
              <RHFAutocomplete
                name="electionId"
                label="Choose Election"
                options={ElectionListDataForOptions}
                getOptionLabel={(value) => {
                  const Election = ElectionData.find((option) => option.value === value);
                  return Election ? Election.label : '';
                }}
                InputLabelProps={{
                  style: {
                    color: theme.palette.mode === 'light' ? 'black' : 'white',
                  },
                }}
              />

              <RHFTextField
                name="wardNumber"
                label="Ward Number"
                type="number"
                InputLabelProps={{
                  style: {
                    color: theme.palette.mode === 'light' ? 'black' : 'white',
                  },
                }}
              />

              <RHFTextField
                name="wardName"
                label="Ward Name"
                InputLabelProps={{
                  style: {
                    color: theme.palette.mode === 'light' ? 'black' : 'white',
                  },
                }}
              />

              <RHFTextField
                name="wardStreetAddress"
                label="Ward Street Address"
                InputLabelProps={{
                  style: {
                    color: theme.palette.mode === 'light' ? 'black' : 'white',
                  },
                }}
              />

              <RHFTextField
                name="wardPostalCode"
                label="Ward Postal Code"
                type="number"
                InputLabelProps={{
                  style: {
                    color: theme.palette.mode === 'light' ? 'black' : 'white',
                  },
                }}
              />

              {/* // ADD NEW DISTRICT AND THASIL VALUE INM FROM  */}

              <RHFAutocomplete
                name="districtName"
                label="District Name"
                fullWidth
                options={INDIAN_CITIES.map((option) => option.label)}
                getOptionLabel={(option) => option}
                InputLabelProps={{
                  style: {
                    color: theme.palette.mode === 'light' ? 'black' : 'white',
                  },
                }}
              />

              <RHFAutocomplete
                name="tehsilName"
                label="Tehsil"
                fullWidth
                options={INDIAN_CITIES.map((option) => option.label)}
                getOptionLabel={(option) => option}
                InputLabelProps={{
                  style: {
                    color: theme.palette.mode === 'light' ? 'black' : 'white',
                  },
                }}
              />

              <RHFAutocomplete
                name="wardCity"
                label="Ward City"
                placeholder="Choose a City"
                fullWidth
                options={INDIAN_CITIES.map((option) => option.label)}
                getOptionLabel={(option) => option}
                InputLabelProps={{
                  style: {
                    color: theme.palette.mode === 'light' ? 'black' : 'white',
                  },
                }}
              />

              <RHFAutocomplete
                name="wardState"
                label="Ward State"
                fullWidth
                options={WARD_STATES.map((option) => option.label)}
                getOptionLabel={(option) => option}
                InputLabelProps={{
                  style: {
                    color: theme.palette.mode === 'light' ? 'black' : 'white',
                  },
                }}
              />

              <RHFAutocomplete
                name="wardCountry"
                label="Ward Country"
                fullWidth
                options={WARD_COUNTRY.map((option) => option.label)}
                getOptionLabel={(option) => option}
                InputLabelProps={{
                  style: {
                    color: theme.palette.mode === 'light' ? 'black' : 'white',
                  },
                }}
              />

              <RHFAutocomplete
                name="wardCapacity"
                label="Number of Ward Voters"
                fullWidth
                options={WARD_CAPACITY.map((option) => option.label)}
                getOptionLabel={(option) => option}
                InputLabelProps={{
                  style: {
                    color: theme.palette.mode === 'light' ? 'black' : 'white',
                  },
                }}
              />

              <RHFTextField
                name="emergencyContactNumber"
                label="Ward Leader Contact Number"
                type="number"
                InputLabelProps={{
                  style: {
                    color: theme.palette.mode === 'light' ? 'black' : 'white',
                  },
                }}
              />

              <RHFTextField
                name="incidentReporting"
                label="Incident Reporting"
                InputLabelProps={{
                  style: {
                    color: theme.palette.mode === 'light' ? 'black' : 'white',
                  },
                }}
              />

              <Stack spacing={1.5}>
                <RHFTextField
                  name="securityMeasures"
                  fullWidth
                  label="Security Measures"
                  multiline
                  rows={4}
                  InputLabelProps={{
                    style: {
                      color: theme.palette.mode === 'light' ? 'black' : 'white',
                    },
                  }}
                />
              </Stack>
            </Stack>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" size="large" loading={isSubmitting}>
                {!currentWard ? 'Create Ward' : 'Save Changes'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}

WardNewEditForm.propTypes = {
  currentWard: PropTypes.object,
};
