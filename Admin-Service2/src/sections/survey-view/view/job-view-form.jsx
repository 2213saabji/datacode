/* eslint-disable no-unused-vars */
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { useMemo, useState, useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';

import Box from '@mui/material/Box';
import { Modal } from '@mui/material';
// import Chip from '@mui/material/Chip';
import Card from '@mui/material/Card';
// import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
// import Grid from '@mui/material/Unstable_Grid2';
// import Grid from '@mui/material/Unstable_Grid2';
// import ButtonBase from '@mui/material/ButtonBase';
// import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
// import InputAdornment from '@mui/material/InputAdornment';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import FormControlLabel from '@mui/material/FormControlLabel';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

// import { useResponsive } from 'src/hooks/use-responsive';

// import { status } from 'nprogress';

// import { useBoolean } from 'src/hooks/use-boolean';
import Container from '@mui/material/Container';

import { CreateSurvey } from 'src/api/survey';
// import { countries } from 'src/assets/data';
// import { _pastSurvey,_surveyNew } from 'src/_mock';
import { SURVEY_FORM_OPTIONS } from 'src/_mock/_blog';

import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
// ----------------------------------------------------------------------

// import {
//   // _roles,
//   // _analyticTasks,
//   // JOB_SKILL_OPTIONS,
//   // JOB_BENEFIT_OPTIONS,
//   // JOB_EXPERIENCE_OPTIONS,
//   // JOB_EMPLOYMENT_TYPE_OPTIONS,
//   // JOB_WORKING_SCHEDULE_OPTIONS,

// } from 'src/_mock';

import Iconify from 'src/components/iconify';
import { useSnackbar } from 'src/components/snackbar';
import FormProvider, {
  // RHFEditor,
  // RHFSwitch,
  // RHFTextField,
  RHFRadioGroup,
  // RHFMultiCheckbox,
  // RHFAutocomplete,
} from 'src/components/hook-form';

// import QuestionsList from './job-new-questions';
// import JobAddQuestions from './job-add-questions';

export default function JobFillForm({ currentJob }) {
  // const openAddQuestion = useBoolean();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // const mdUp = useResponsive('up', 'md');

  const { enqueueSnackbar } = useSnackbar();

  // schema
  const NewJobSchema = Yup.object().shape({
    surveyName: Yup.string().required('Name is required'),
    surveyTitle: Yup.string().required('Title is required'),
    surveyDescription: Yup.string().required('Content is required'),
    surveyQuestions: Yup.array().min(1, 'Add at least one Question'),
    // role: Yup.string().required('Role is required'),
    // skills: Yup.array().min(1, 'Choose at least one option'),
    // workingSchedule: Yup.array().min(1, 'Choose at least one option'),
    // benefits: Yup.array().min(1, 'Choose at least one option'),
    // locations: Yup.array().min(1, 'Choose at least one option'),
    // surveyExpiredDate: Yup.mixed().nullable().required('Expired date is required'),
    // salary: Yup.object().shape({
    // type: Yup.string(),
    // price: Yup.number().min(1, 'Price is required'),
    // negotiable: Yup.boolean(),
    // }),
    // experience: Yup.string(),
    surveyStatus: Yup.string(),
  });

  // default value
  const defaultValues = useMemo(
    () => ({
      surveyName: currentJob?.name || '',
      surveyTitle: currentJob?.title || '',
      surveyDescription: currentJob?.content || '',
      surveyQuestions: currentJob?.questions || [],
      // experience: currentJob?.experience || '1 year exp',
      // role: currentJob?.role || _roles[1],
      // skills: currentJob?.skills || [],
      // workingSchedule: currentJob?.workingSchedule || [],
      // locations: currentJob?.locations || [],
      // benefits: currentJob?.benefits || [],
      // surveyExpiredDate: currentJob?.expiredDate || null,
      surveyStatus: currentJob?.status || 'opened',
    }),
    [currentJob]
  );

  const methods = useForm({
    resolver: yupResolver(NewJobSchema),
    defaultValues,
  });

  const {
    reset,
    // control,
    handleSubmit,
    watch,
    // setValue,
    formState: { isSubmitting },
  } = methods;

  const value = watch();

  useEffect(() => {
    if (currentJob) {
      reset(defaultValues);
    }
  }, [currentJob, defaultValues, reset]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = await CreateSurvey(data);
      // console.log(response);
      if (response) {
        enqueueSnackbar(currentJob ? 'Update success!' : 'Create success!');
        reset();
        router.push(paths.dashboard.survey.root);
      } else {
        enqueueSnackbar('Survey Creation Failed', { variant: 'error' });
      }
      // console.info('DATA', data);
    } catch (error) {
      console.error(error);
    }
  });

  const renderDetails = (
    <>
      {/* {mdUp && (
        <Grid md={4}>
          <Typography variant="h6" sx={{ mb: 0.5 }}>
            Details
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Title, short description, image...
          </Typography>
        </Grid>
      )}

      <Grid xs={12} md={8}> */}

      <Container
        maxWidth={false}
        sx={{
          py: 3,
          mb: 5,
          borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
        }}
      >
        <CustomBreadcrumbs
          links={[
            {
              name: 'Submited Surveys',
              href: paths.dashboard.fill_survey.list,
            },
            {
              name: 'New Survey',
              href: paths.dashboard.fill_survey,
            },
          ]}
          sx={{ maxWidth: 720, mx: 'auto' }}
        />
      </Container>

      <Card>
        {/* {!mdUp && <CardHeader title="Details" />} */}

        <Stack spacing={3} sx={{ p: 3 }}>
          <Stack spacing={1.5}>
            <Typography variant="h6">Survey Name :</Typography>
            <Typography variant="subtitle2">How was your experice using this App?</Typography>
            {/* <RHFTextField name="surveyName" placeholder="Ex: Customer Satisfaction Survey..." /> */}
          </Stack>

          <Stack spacing={1.5}>
            <Typography variant="h6">Survey Title :</Typography>
            <Typography variant="subtitle2">Feed back form</Typography>
            {/* <RHFTextField name="surveyTitle" placeholder="Ex: Product Feedback Survey..." /> */}
          </Stack>

          <Stack spacing={1.5}>
            <Typography variant="h6">Survey Description :</Typography>
            {/* <RHFEditor simple name="surveyDescription" /> */}
            <Typography variant="subtitle2">
              Your sign-in was successful but does not meet the criteria to access this resource.
              For example, you might be signing in from a browser, app, or location that is
              restricted by your admin.
            </Typography>
          </Stack>
        </Stack>
      </Card>
      {/* </Grid> */}
    </>
  );

  const renderProperties = (
    <>
      {/* {mdUp && (
        <Grid md={4}>
          <Typography variant="h6" sx={{ mb: 0.5 }}>
            Properties
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Additional functions and attributes...
          </Typography>
        </Grid>
      )}

      <Grid xs={12} md={8}> */}
      <Card>
        {/* {!mdUp && <CardHeader title="Properties" />} */}

        <Stack spacing={3} sx={{ p: 3 }}>
          {/* <Stack spacing={1}>
              <Typography variant="subtitle2">Employment type</Typography>
              <RHFMultiCheckbox
                row
                spacing={4}
                name="employmentTypes"
                options={JOB_EMPLOYMENT_TYPE_OPTIONS}
              />
            </Stack> */}
          <Stack
            spacing={1}
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <Stack spacing={1}>
              <Typography variant="subtitle2">Survey Status</Typography>
              <RHFRadioGroup row spacing={4} name="surveyStatus" options={SURVEY_FORM_OPTIONS} />
            </Stack>

            <Button
              // fullWidth={false}
              color="inherit"
              startIcon={
                <Iconify
                  icon={open ? 'solar:close-circle-broken' : 'mingcute:add-line'}
                  sx={{ mr: -0.5 }}
                />
              }
              // onClick={openAddQuestion.onToggle}
              onClick={handleOpen}
              sx={{ fontSize: 14 }}
            >
              {open ? ' ' : 'Add  Question'}
              {/* Add  Question */}
            </Button>
          </Stack>

          <Stack spacing={1.5}>
            {value.surveyQuestions.length > 0 && (
              <Typography variant="subtitle2" name="surveyQuestions">
                Survey Questions
              </Typography>
            )}

            {/* <QuestionsList title="Tasks" list={value.surveyQuestions} /> */}
          </Stack>

          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            BackdropProps={{
              style: {
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
              },
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 400,
                bgcolor: 'background.paper',
                border: '2px solid #000',
                borderRadius: '18px',
                boxShadow: 24,
                p: 4,
              }}
            >
              {/* <JobAddQuestions setOpen={setOpen} setValueParent={setValue} parentValue={value} /> */}
            </Box>
          </Modal>

          {/* <Stack spacing={1.5}>
              <Typography variant="subtitle2">Role</Typography>
              <RHFAutocomplete
                name="role"
                autoHighlight
                options={_roles.map((option) => option)}
                getOptionLabel={(option) => option}
                renderOption={(props, option) => (
                  <li {...props} key={option}>
                    {option}
                  </li>
                )}
              />
            </Stack> */}

          {/* <Stack spacing={1.5}>
              <Typography variant="subtitle2">Skills</Typography>
              <RHFAutocomplete
                name="skills"
                placeholder="+ Skills"
                multiple
                disableCloseOnSelect
                options={JOB_SKILL_OPTIONS.map((option) => option)}
                getOptionLabel={(option) => option}
                renderOption={(props, option) => (
                  <li {...props} key={option}>
                    {option}
                  </li>
                )}
                renderTags={(selected, getTagProps) =>
                  selected.map((option, index) => (
                    <Chip
                      {...getTagProps({ index })}
                      key={option}
                      label={option}
                      size="small"
                      color="info"
                      variant="soft"
                    />
                  ))
                }
              />
            </Stack> */}

          {/* <Stack spacing={1.5}>
              <Typography variant="subtitle2">Working schedule</Typography>
              <RHFAutocomplete
                name="workingSchedule"
                placeholder="+ Schedule"
                multiple
                disableCloseOnSelect
                options={JOB_WORKING_SCHEDULE_OPTIONS.map((option) => option)}
                getOptionLabel={(option) => option}
                renderOption={(props, option) => (
                  <li {...props} key={option}>
                    {option}
                  </li>
                )}
                renderTags={(selected, getTagProps) =>
                  selected.map((option, index) => (
                    <Chip
                      {...getTagProps({ index })}
                      key={option}
                      label={option}
                      size="small"
                      color="info"
                      variant="soft"
                    />
                  ))
                }
              />
            </Stack> */}

          {/* <Stack spacing={1.5}>
              <Typography variant="subtitle2">Locations</Typography>
              <RHFAutocomplete
                name="locations"
                type="country"
                placeholder="+ Locations"
                multiple
                options={countries.map((option) => option.label)}
                getOptionLabel={(option) => option}
              />
            </Stack> */}

          {/* <Stack spacing={1.5}>
            <Typography variant="subtitle2">Set Expirey Date</Typography>
            <Controller
              name="surveyExpiredDate"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <DatePicker
                  {...field}
                  format="dd/MM/yyyy"
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      error: !!error,
                      helperText: error?.message,
                    },
                  }}
                />
              )}
            />
          </Stack> */}

          {/* <Stack spacing={2}>
              <Typography variant="subtitle2">Salary</Typography>

              <Controller
                name="salary.type"
                control={control}
                render={({ field }) => (
                  <Box gap={2} display="grid" gridTemplateColumns="repeat(2, 1fr)">
                    {[
                      {
                        label: 'Hourly',
                        icon: <Iconify icon="solar:clock-circle-bold" width={32} sx={{ mb: 2 }} />,
                      },
                      {
                        label: 'Custom',
                        icon: <Iconify icon="solar:wad-of-money-bold" width={32} sx={{ mb: 2 }} />,
                      },
                    ].map((item) => (
                      <Paper
                        component={ButtonBase}
                        variant="outlined"
                        key={item.label}
                        onClick={() => field.onChange(item.label)}
                        sx={{
                          p: 2.5,
                          borderRadius: 1,
                          typography: 'subtitle2',
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
                      <Box sx={{ typography: 'subtitle2', color: 'text.disabled' }}>$</Box>
                    </InputAdornment>
                  ),
                }}
              />
              <RHFSwitch name="salary.negotiable" label="Salary is negotiable" />
            </Stack> */}

          {/* <Stack spacing={1}>
              <Typography variant="subtitle2">Benefits</Typography>
              <RHFMultiCheckbox
                name="benefits"
                options={JOB_BENEFIT_OPTIONS}
                sx={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                }}
              />
            </Stack> */}
        </Stack>
      </Card>
      {/* </Grid> */}
    </>
  );

  const renderActions = (
    <>
      {/* {mdUp && <Grid md={4} />}
      <Grid xs={12} md={8} sx={{ display: 'flex', alignItems: 'center' }}> */}
      <Stack sx={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
        <FormControlLabel
          control={<Switch defaultChecked />}
          label="Publish"
          sx={{ flexGrow: 1, pl: 3 }}
        />

        <LoadingButton
          type="submit"
          variant="contained"
          size="large"
          loading={isSubmitting}
          sx={{ ml: 2 }}
        >
          {!currentJob ? 'Submit Survey' : 'Save Changes'}
        </LoadingButton>
      </Stack>
      {/* </Grid> */}
    </>
  );

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Stack spacing={3}>
        {renderDetails}

        {renderProperties}

        {/* {renderActions} */}
      </Stack>
    </FormProvider>
  );
}

JobFillForm.propTypes = {
  currentJob: PropTypes.object,
};
