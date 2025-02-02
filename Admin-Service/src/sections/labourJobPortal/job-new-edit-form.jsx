import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useMemo, useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import Autocomplete from '@mui/material/Autocomplete';
import InputAdornment from '@mui/material/InputAdornment';
// import FormControlLabel from '@mui/material/FormControlLabel';

import { Alert, Snackbar } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { MobileDatePicker } from '@mui/x-date-pickers';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useResponsive } from 'src/hooks/use-responsive';

import { useAuthContext } from 'src/auth/hooks';
import { UpdateJob, useGetJobTypes, createLabourJob, getJobTypeCategory } from 'src/api/labour_job';

// import { useGetRolesList } from 'src/api/userRole';
import Iconify from 'src/components/iconify';
import { useSnackbar } from 'src/components/snackbar';
import FormProvider, {
  RHFTextField,
  RHFRadioGroup,
  RHFAutocomplete,
} from 'src/components/hook-form';

import MapModal from './map';

// ----------------------------------------------------------------------

export default function JobNewEditForm({ jobData }) {
  const router = useRouter();
  const theme = useTheme();
  const mdUp = useResponsive('up', 'md');

  const [open, setOpen] = useState(false);
  const jobId = jobData?.jobPostId;
  const { user } = useAuthContext();

  const { enqueueSnackbar } = useSnackbar();

  const [coordinates, setCoordinates] = useState({ lat: null, lng: null });

  const [loading, setLoading] = useState(false);

  const [seletedJobCategory, setSelectedJobCategory] = useState([]);

  const { jobTypes } = useGetJobTypes();

  const jobTypesArr = jobTypes?.data || [];

  function onConfirm() {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition((position) => {
        const newPosition = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setCoordinates(newPosition);
        setLoading(false);
      });
      setOpen(false);
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }

  useEffect(() => {
    onConfirm();
  }, []);
  // schema
  const NewJobSchema = Yup.object().shape({
    jobTitle: Yup.string().required('Job Title is required'),
    companyName: Yup.string().required('Company Name is required'),
    location: Yup.string().required('Address is required'),
    jobType: Yup.string('Job Type is required'),
    employmentType: Yup.string('employment Type is required'),
    howToApply: Yup.string('Please Emter Process How To Apply For This Job'),
    salary: Yup.object().shape({
      type: Yup.string(),
      price: Yup.number().min(1, 'Price is required'),
    }),
    jobDescription: Yup.string().required('Job Description is required'),
    requirements: Yup.array().min(1, 'Please Enter at least One Requirement'),
    responsibilities: Yup.array().min(1, 'Please Enter at least One Responsibility'),
    benefits: Yup.array().min(1, 'Please Enter at least One Benefits'),
    applicationDeadline: Yup.mixed().required('Please Select Application End Date'),
  });

  // default value
  const defaultValues = useMemo(
    () => ({
      userId: user?.userId || '',
      jobTitle: jobData?.jobTitle || '',
      companyName: jobData?.companyName || '',
      location: jobData?.location || '',
      employmentType: jobData?.employmentType || '',
      jobType: jobData?.jobType || '',
      howToApply: jobData?.howToApply || '',
      salary: jobData?.salary || {
        type: 'Hourly',
        price: 0,
      },
      jobStatus: jobData?.jobStatus || 'Open',
      requirements: jobData?.requirements || [],
      responsibilities: jobData?.responsibilities || [],
      benefits: jobData?.benefits || [],
      jobDescription: jobData?.jobDescription || '',
      latitude: jobData?.latitude || null,
      longitude: jobData?.longitude || null,
      applicationDeadline: jobData?.applicationDeadline
        ? new Date(jobData.applicationDeadline)
        : null,
    }),
    [jobData, user]
  );

  const methods = useForm({
    resolver: yupResolver(NewJobSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    watch,
    control,
    setValue,
    formState: { isSubmitting },
  } = methods;

  const value = watch();

  useEffect(() => {
    if (jobData) {
      reset(defaultValues);
    }
  }, [jobData, defaultValues, reset]);

  useEffect(() => {
    setValue('jobTitle', '');
    async function getCategory() {
      const res = await getJobTypeCategory(value.jobType);
      setSelectedJobCategory(res);
    }
    getCategory();
  }, [value.jobType, setValue]);

  const onSubmit = handleSubmit(async (data) => {
    if (!value.latitude || !value.longitude) {
      enqueueSnackbar('Please Select Job Location', { variant: 'error' });
      return;
    }
    try {
      const response = await createLabourJob(data);
      if (response) {
        enqueueSnackbar(jobData ? 'Update success!' : 'Create success!');
        reset();
        router.push(paths.dashboard.labour_job_portal.list);
      } else {
        enqueueSnackbar('Job Post Creation Failed', { variant: 'error' });
      }
    } catch (error) {
      console.error(error);
    }
  });

  const onSubmitUpdate = handleSubmit(async (data) => {
    try {
      const response = await UpdateJob(jobId, data);

      if (response) {
        enqueueSnackbar('Job updated successfully', { variant: 'success' });
        router.push(paths.dashboard.labour_job_portal.list);
      } else {
        enqueueSnackbar('Failed to update Job', { variant: 'error' });
      }
    } catch (error) {
      // Handle errors here if necessary
      console.error('Error updating Job :', error);
      enqueueSnackbar('An error occurred while updating Job ', { variant: 'error' });
    }
  });

  const employmentType = [
    { value: 'full_time', label: 'Full Time' },
    { value: 'part_time', label: 'Part Time' },
    { value: 'on_demant', label: 'On Demand' },
  ];

  const jobStatus = [
    { value: 'Open', label: 'Open' },
    { value: 'Close', label: 'Close' },
  ];

  function handleSelectLocation(coords) {
    setLoading(true);
    if (coordinates.lat && coordinates.lng) {
      setLoading(false);
      setValue('latitude', coords.lat);
      setValue('longitude', coords.lng);
    }
  }

  function handleChooseMap() {
    setLoading(true);
    if (coordinates.lat && coordinates.lng) {
      setOpen(true);
      setLoading(false);
    }
  }

  const [benefitInputValue, setBenefitInputValue] = useState('');
  const [requirementInputValue, setRequirementInputValue] = useState('');
  const [responsibilityInputValue, setResponsibilityInputValue] = useState('');

  const handleAddBenefit = () => {
    if (benefitInputValue && !value.benefits.includes(benefitInputValue)) {
      setValue('benefits', [...value.benefits, benefitInputValue]);
      setBenefitInputValue(''); // Clear the input after adding
    }
  };

  const handleAddRequuirement = () => {
    if (requirementInputValue && !value.requirements.includes(requirementInputValue)) {
      setValue('requirements', [...value.requirements, requirementInputValue]);
      setRequirementInputValue(''); // Clear the input after adding
    }
  };

  const handleAddResponsibility = () => {
    if (responsibilityInputValue && !value.responsibilities.includes(responsibilityInputValue)) {
      setValue('responsibilities', [...value.responsibilities, responsibilityInputValue]);
      setResponsibilityInputValue(''); // Clear the input after adding
    }
  };

  const renderDetails = (
    <>
      <Card>
        {/* {!mdUp && <CardHeader title="Details" />} */}

        <Stack spacing={3} sx={{ p: 3 }}>
          <Stack spacing={1.5}>
            <Typography variant="subtitle2">Job Category</Typography>
            <RHFAutocomplete
              name="jobType"
              placeholder="Choose Job Category"
              fullWidth
              options={jobTypesArr.map(
                (option) =>
                  option.jobType.charAt(0).toUpperCase() + option.jobType.slice(1).toLowerCase()
              )}
              getOptionLabel={(option) => option}
            />
          </Stack>

          {/* Job title input */}
          <Stack spacing={1.5}>
            <Typography variant="subtitle2">Job Type</Typography>
            <RHFAutocomplete
              name="jobTitle"
              placeholder="Choose Job Type"
              fullWidth
              options={seletedJobCategory.map((option) => option.label)}
              getOptionLabel={(option) => option}
            />
          </Stack>

          {/* <Stack spacing={1.5}>
            <Typography variant="subtitle2">Job Type</Typography>
            <RHFTextField
              name="jobTitle"
              placeholder="Ex: Plumber..."
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
          </Stack> */}

          {/* company name input */}
          <Stack spacing={1.5}>
            <Typography variant="subtitle2">Company Name</Typography>
            <RHFTextField
              name="companyName"
              placeholder="Ex: ABC Company..."
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
          </Stack>

          {/* address input */}
          <Stack spacing={1.5}>
            <Typography variant="subtitle2">Address</Typography>
            <RHFTextField
              name="location"
              placeholder="Ex: ABC Road..."
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
          </Stack>

          {/* Job Location */}
          <Stack spacing={1.5}>
            <Typography variant="subtitle2">Job Location</Typography>
            <Stack sx={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
              <LoadingButton
                onClick={() => handleSelectLocation(coordinates)}
                loading={loading}
                loadingIndicator="Loading…"
                variant="contained"
              >
                Current Location
              </LoadingButton>
              <LoadingButton
                onClick={() => handleChooseMap()}
                loading={loading}
                loadingIndicator="Loading…"
                variant="contained"
              >
                Choose On Map
              </LoadingButton>
            </Stack>
          </Stack>

          {/* job type field */}
          <Stack spacing={1.5}>
            <Typography variant="subtitle2">Employment Type</Typography>
            <RHFAutocomplete
              name="employmentType"
              placeholder="Choose Employment Type"
              fullWidth
              options={employmentType.map((option) => option.label)}
              getOptionLabel={(option) => option}
            />
          </Stack>

          {/* salary Range */}
          <Stack spacing={2}>
            <Typography variant="subtitle2">Salary</Typography>

            <Controller
              name="salary.type"
              control={control}
              render={({ field }) => (
                <Box gap={mdUp ? 2 : 1} display="grid" gridTemplateColumns="repeat(4, 1fr)">
                  {[
                    {
                      label: 'Hourly',
                      icon: (
                        <Iconify
                          icon="solar:clock-circle-bold"
                          width={mdUp ? 32 : 18}
                          sx={{ mb: 2 }}
                        />
                      ),
                    },
                    {
                      label: 'Daily',
                      icon: (
                        <Iconify
                          icon="bi:calendar-day-fill"
                          width={mdUp ? 32 : 18}
                          sx={{ mb: 2 }}
                        />
                      ),
                    },
                    {
                      label: 'Weekly',
                      icon: (
                        <Iconify
                          icon="material-symbols:calendar-month"
                          width={mdUp ? 32 : 18}
                          sx={{ mb: 2 }}
                        />
                      ),
                    },
                    {
                      label: 'Montly',
                      icon: (
                        <Iconify
                          icon="material-symbols:calendar-month"
                          width={mdUp ? 32 : 18}
                          sx={{ mb: 2 }}
                        />
                      ),
                    },
                  ].map((item) => (
                    <Paper
                      component={ButtonBase}
                      variant="outlined"
                      key={item.label}
                      onClick={() => field.onChange(item.label)}
                      sx={{
                        p: { xs: 1, md: 2.5 },
                        borderRadius: 1,
                        typography: mdUp ? 'subtitle1' : 'subtitle3',
                        flexDirection: 'column',
                        ...(item.label === field.value && {
                          borderWidth: 2,
                          borderColor: 'text.primary',
                        }),
                      }}
                    >
                      {item.icon}
                      {item.label}
                    </Paper>
                  ))}
                </Box>
              )}
            />

            <RHFTextField
              name="salary.price"
              placeholder="0.00"
              type="number"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Box sx={{ typography: 'subtitle2', color: 'text.disabled' }}>₹</Box>
                  </InputAdornment>
                ),
              }}
            />
          </Stack>

          {/* Job Description */}
          <Stack spacing={1.5}>
            <Typography variant="subtitle2">Work Description</Typography>
            <RHFTextField
              rows={4}
              multiline
              simple
              name="jobDescription"
              placeholder="Ex: Job description..."
              // InputProps={{
              //   style: {
              //     color: theme.palette.mode === 'light' ? 'black' : 'white',

              //   },
              // }}
              InputLabelProps={{
                style: {
                  color: theme.palette.mode === 'light' ? 'black' : 'white',
                },
              }}
            />
          </Stack>

          {/* Job Requirment */}
          <Stack spacing={1.5}>
            <Typography variant="subtitle2">Job Requirement</Typography>

            <Autocomplete
              multiple
              freeSolo
              name="requirements"
              value={value.requirements}
              options={[]}
              onChange={(event, newValue) => setValue('requirements', newValue)}
              inputValue={requirementInputValue}
              onInputChange={(event, newInputValue) => setRequirementInputValue(newInputValue)}
              renderTags={(val, getTagProps) =>
                val.map((option, index) => (
                  <Chip
                    variant="outlined"
                    label={option}
                    {...getTagProps({ index })}
                    style={{ margin: 2 }}
                  />
                ))
              }
              renderInput={(params) => (
                <TextField {...params} variant="outlined" placeholder="Enter Requirements..." />
              )}
            />
            <Stack direction="row" justifyContent="flex-end">
              <Button
                variant="contained"
                sx={{ width: 10 }}
                onClick={handleAddRequuirement}
                disabled={!requirementInputValue}
              >
                Add
              </Button>
            </Stack>
          </Stack>

          {/* Job Responsibility */}
          <Stack spacing={1.5}>
            <Typography variant="subtitle2">Job Responsibilities</Typography>

            <Autocomplete
              multiple
              freeSolo
              name="responsibilities"
              value={value.responsibilities}
              options={[]}
              onChange={(event, newValue) => setValue('responsibilities', newValue)}
              inputValue={responsibilityInputValue}
              onInputChange={(event, newInputValue) => setResponsibilityInputValue(newInputValue)}
              renderTags={(val, getTagProps) =>
                val.map((option, index) => (
                  <Chip
                    variant="outlined"
                    label={option}
                    {...getTagProps({ index })}
                    style={{ margin: 2 }}
                  />
                ))
              }
              renderInput={(params) => (
                <TextField {...params} variant="outlined" placeholder="Enter Responsibilities..." />
              )}
            />
            <Stack direction="row" justifyContent="flex-end">
              <Button
                variant="contained"
                sx={{ width: 10 }}
                onClick={handleAddResponsibility}
                disabled={!responsibilityInputValue}
              >
                Add
              </Button>
            </Stack>
          </Stack>

          {/* Job benefits */}
          <Stack spacing={1.5}>
            <Typography variant="subtitle2">Job Benefits</Typography>
            <Autocomplete
              multiple
              freeSolo
              name="benefits"
              value={value.benefits}
              options={[]}
              onChange={(event, newValue) => setValue('benefits', newValue)}
              inputValue={benefitInputValue}
              onInputChange={(event, newInputValue) => setBenefitInputValue(newInputValue)}
              renderTags={(val, getTagProps) =>
                val.map((option, index) => (
                  <Chip
                    variant="outlined"
                    label={option}
                    {...getTagProps({ index })}
                    style={{ margin: 2 }}
                  />
                ))
              }
              renderInput={(params) => (
                <TextField {...params} variant="outlined" placeholder="Enter Benefits..." />
              )}
            />
            <Stack direction="row" justifyContent="flex-end">
              <Button
                variant="contained"
                sx={{ width: 10 }}
                onClick={handleAddBenefit}
                disabled={!benefitInputValue}
              >
                Add
              </Button>
            </Stack>
          </Stack>

          {/* Job howToApply */}
          <Stack spacing={1.5}>
            <Typography variant="subtitle2">How To Apply</Typography>
            <RHFTextField
              rows={4}
              multiline
              simple
              name="howToApply"
              placeholder="Ex: Call on..."
              // InputProps={{
              //   style: {
              //     color: theme.palette.mode === 'light' ? 'black' : 'white',

              //   },
              // }}
              InputLabelProps={{
                style: {
                  color: theme.palette.mode === 'light' ? 'black' : 'white',
                },
              }}
            />
          </Stack>

          {/* Job howToApply */}
          <Stack spacing={1.5}>
            <Typography variant="subtitle2">Application Deadline</Typography>

            <MobileDatePicker
              orientation="portrait"
              placeholder="Application Deadline"
              value={value.applicationDeadline}
              onChange={(newValue) => {
                setValue('applicationDeadline', newValue);
              }}
              name="applicationDeadline"
              slotProps={{
                textField: {
                  fullWidth: true,
                  margin: 'normal',
                },
              }}
            />
          </Stack>

          <Stack spacing={1}>
            <Typography variant="subtitle2">Job Status</Typography>
            <RHFRadioGroup row spacing={4} name="jobStatus" options={jobStatus} />
          </Stack>
        </Stack>
      </Card>
      {/* </Grid> */}
    </>
  );

  const renderActions = (
    <>
      <Stack
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'flex-end',
        }}
      >
        <LoadingButton
          type="submit"
          variant="contained"
          size="large"
          loading={isSubmitting}
          sx={{ ml: 2, bgcolor: theme.palette.primary.main }}
        >
          {jobData ? 'Update Job' : 'Add Job Post'}
        </LoadingButton>
      </Stack>
      {/* </Grid> */}
    </>
  );

  return (
    <FormProvider methods={methods} onSubmit={jobData ? onSubmitUpdate : onSubmit}>
      <Snackbar
        open={loading}
        autoHideDuration={null} // Set to null for a persistent Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        onClose={() => { }}
      >
        <Alert
          severity="warning"
          variant="standard" // Use variant="filled" for a different appearance
        >
          Please Wait, Location Fetching...
        </Alert>
      </Snackbar>

      <Stack spacing={3}>
        {renderDetails}

        {renderActions}
      </Stack>
      <MapModal
        open={open}
        onClose={() => setOpen(false)}
        coordinates={coordinates}
        setCoordinates={setCoordinates}
        onConfirm={() => onConfirm()}
        handleSelectLocation={(coords) => handleSelectLocation(coords)}
      />
    </FormProvider>
  );
}

JobNewEditForm.propTypes = {
  jobData: PropTypes.object,
};
