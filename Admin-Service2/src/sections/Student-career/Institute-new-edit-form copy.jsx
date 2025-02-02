/* eslint-disable no-unused-vars */
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  useMemo,
  useState,
  useEffect,
  // useCallback
} from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import PersonIcon from '@mui/icons-material/Person';
import { Grid, Chip, Modal, Avatar, Checkbox, TextField, Autocomplete } from '@mui/material';
// import Grid from '@mui/material/Unstable_Grid2';

import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
// import FormControlLabel from '@mui/material/FormControlLabel';

// import CustomDateRangePicker from 'src/components/custom-date-range-picker/custom-date-range-picker';
import { useTheme } from '@mui/material/styles';
import { DateTimePicker } from '@mui/x-date-pickers';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
// import VoterList from '../voter/voter-list';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { fDate, fTime } from 'src/utils/format-time';

import { useGetVoters } from 'src/api/voter';
import { useAuthContext } from 'src/auth/hooks';
// import { useGetRolesList } from 'src/api/userRole';
import { SURVEY_FORM_OPTIONS } from 'src/_mock/_blog';
import { CreateSurvey, UpdateSurvey, useGetAllSurvey } from 'src/api/survey';

import Iconify from 'src/components/iconify';
import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { RHFTextField, RHFRadioGroup } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export default function InstituteNewEditForm({ surveyData }) {
  const router = useRouter();
  const theme = useTheme();

  const [updateQue, setupdateque] = useState(null);

  const { refetch: refetchSurveyResponse } = useGetAllSurvey();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [openTimer, setOpenTimer] = useState(false);
  const handleOpenTimer = () => setOpenTimer(true);
  const handleCloseTimer = () => setOpenTimer(false);

  const [selectedOptions, setSelectedOptions] = useState([]);
  const [allSelected, setAllSelected] = useState(false);

  const surveyId = surveyData?.surveyId;

  // const mdUp = useResponsive('up', 'md');
  const { user } = useAuthContext();

  const { voters: votersList } = useGetVoters();

  const voterlistArr = votersList && votersList.data ? votersList.data : [];

  // console.log('voters------->', voterlistArr)

  const filteredVoterListArr = voterlistArr.filter((list) => list.User !== null);

  // Step 2: Map the filtered array to the desired format
  const VoterRoleData = voterlistArr.map((list) => {
    const firstName = list?.User?.UserProfile?.firstName || list?.User?.phone || 'No Name';
    const lastName = list?.User?.UserProfile?.lastName || '';
    const label = `${firstName} ${lastName}`.trim();

    return {
      value: list.userId,
      label: label !== 'No Name' ? label : 'No Name',
    };
  });

  // Step 3: Extract the values for UserVoterDataForOptions
  const UserVoterDataForOptions = VoterRoleData.map((option) => option.value);

  // useEffect(() => {
  //   setExistingUser(false);
  // }, []);

  const { enqueueSnackbar } = useSnackbar();

  // schema
  const NewJobSchema = Yup.object().shape({
    surveyName: Yup.string().required('Name is required'),
    surveyTitle: Yup.string().required('Title is required'),
    surveyDescription: Yup.string().required('Content is required'),
    surveyQuestions: Yup.array().min(1, 'Add at least one Question'),
    surveyStatus: Yup.string().required('status is required'),
    userIdsForSurvey: Yup.array().required('Select UserId'),
    startTime: Yup.mixed().required('Select Start Time'),
    endTime: Yup.mixed().required('Select End Time'),
  });

  // default value
  const defaultValues = useMemo(
    () => ({
      userId: user?.userId || '',
      surveyName: surveyData?.surveyName || '',
      surveyTitle: surveyData?.surveyTitle || '',
      surveyDescription: surveyData?.surveyDescription || '',
      surveyQuestions: surveyData?.surveyQuestionBanks || [],
      surveyStatus: surveyData?.surveyStatus || 'Open',
      userIdsForSurvey: surveyData?.userIdsForSurvey || [],
      startTime: surveyData?.startTime ? new Date(surveyData.startTime) : null,
      endTime: surveyData?.endTime ? new Date(surveyData.endTime) : null,
    }),
    [surveyData, user]
  );

  // console.log('userIdddsss-----', surveyData?.userIdsForSurvey, VoterRoleData.length)
  const methods = useForm({
    resolver: yupResolver(NewJobSchema),
    defaultValues,
  });

  const {
    reset,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { isSubmitting },
  } = methods;

  const value = watch();

  // console.log('userIdsForSurvey----->', value.userIdsForSurvey)

  const handleSelectAllUsers = () => {
    const allUserIds = UserVoterDataForOptions.map((option) => option);
    // console.log('allUserIds---->', allUserIds)
    setValue('userIdsForSurvey', allUserIds);
    setAllSelected(true);
  };

  const handleChange = (event, newValue) => {
    setValue('userIdsForSurvey', newValue);
    if (newValue.length !== UserVoterDataForOptions.length) {
      setAllSelected(false);
    } else {
      setAllSelected(true);
    }
  };

  useEffect(() => {
    if (surveyData) {
      reset(defaultValues);
    }
  }, [surveyData, defaultValues, reset]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      // console.log("data------>", data);

      const response = await CreateSurvey(data);
      if (response) {
        enqueueSnackbar(surveyData ? 'Update success!' : 'Create success!');
        reset();
        router.push(paths.dashboard.survey.root);
      } else {
        enqueueSnackbar('Survey Creation Failed', { variant: 'error' });
      }
    } catch (error) {
      console.error(error);
    }
  });

  const onSubmitUpdate = handleSubmit(async (data) => {
    try {
      const schemadata = {
        // "surveyDetails": {
        userId: data.userId,
        surveyName: data.surveyName,
        surveyStatus: data.surveyStatus,
        surveyDescription: data.surveyDescription,
        surveyTitle: data.surveyTitle,
        startTime: data.startTime,
        endTime: data.endTime,
        userIdsForSurvey: data.userIdsForSurvey,
        // },
        // "questions": [...data.surveyQuestions]
      };
      // console.log("update", schemadata);
      const response = await UpdateSurvey(surveyId, schemadata);

      if (response) {
        enqueueSnackbar('Survey updated successfully', { variant: 'success' });
        refetchSurveyResponse();
        router.push(paths.dashboard.survey.root);
      } else {
        enqueueSnackbar('Failed to update survey', { variant: 'error' });
      }
    } catch (error) {
      // Handle errors here if necessary
      console.error('Error updating Survey :', error);
      enqueueSnackbar('An error occurred while Updating Survey ', { variant: 'error' });
    }
  });

  const renderDetails = (
    <>
      <Card>
        {/* {!mdUp && <CardHeader title="Details" />} */}

        <Stack spacing={3} sx={{ p: 3 }}>
          <Stack spacing={1.5}>
            <Typography variant="subtitle2">Survey Unique Name</Typography>
            <RHFTextField
              name="surveyName"
              label="Ex: Customer Satisfaction Survey..."
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

          <Stack spacing={1.5}>
            <Typography variant="subtitle2">Survey Title</Typography>
            <RHFTextField
              name="surveyTitle"
              label="Ex: Product Feedback Survey..."
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

          <Stack spacing={1.5}>
            <Typography variant="subtitle2">Survey Description</Typography>
            <RHFTextField
              rows={4}
              multiline
              simple
              name="surveyDescription"
              label="Ex: Survey description..."
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

          <Stack spacing={1.5}>
            {/* <Typography variant="subtitle2">Select Users</Typography> */}
            <Controller
              name="userIdsForSurvey"
              control={control}
              render={({ field }) => (
                <Box>
                  <Autocomplete
                    multiple
                    id="tags-standard"
                    options={UserVoterDataForOptions}
                    disableCloseOnSelect
                    getOptionLabel={(val) => {
                      const roletype = VoterRoleData.find((option) => option.value === val);
                      return roletype ? roletype.label : '';
                    }}
                    value={field.value}
                    onChange={(event, newValue) => {
                      handleChange(event, newValue);
                      field.onChange(newValue);
                    }}
                    renderOption={(props, option, { selected }) => (
                      <li {...props}>
                        <Checkbox
                          icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                          checkedIcon={<CheckBoxIcon fontSize="small" />}
                          style={{ marginRight: 8 }}
                          checked={selected || allSelected}
                        />
                        {VoterRoleData?.find((item) => item.value === option)?.label}
                      </li>
                    )}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        // variant="standard"
                        label="Select Users..."
                        InputLabelProps={{
                          style: {
                            color: theme.palette.mode === 'light' ? 'black' : 'white',
                          },
                        }}
                      />
                    )}
                    renderTags={(val, getTagProps) =>
                      allSelected ? (
                        <Chip
                          key="all-selected"
                          label="All users selected"
                          style={{ backgroundColor: '#75b4fc', color: 'black', margin: '5px' }}
                          avatar={
                            <Avatar style={{ backgroundColor: '#75b4fc', color: 'black' }}>
                              <PersonIcon />
                            </Avatar>
                          }
                        />
                      ) : (
                        val.map((option, index) => (
                          <Chip
                            label={VoterRoleData?.find((item) => item.value === option)?.label}
                            {...getTagProps({ index })}
                            style={{ backgroundColor: '#75b4fc', color: 'black' }}
                            avatar={
                              <Avatar style={{ color: 'black' }}>
                                <PersonIcon />
                              </Avatar>
                            }
                          />
                        ))
                      )
                    }
                  />
                  <Box style={{ textAlign: 'end' }}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleSelectAllUsers}
                      style={{ marginTop: '10px' }}
                    >
                      <PersonIcon /> &nbsp; Select All Users
                    </Button>
                  </Box>
                </Box>
              )}
            />
          </Stack>

          <Stack
            spacing={1.5}
            sx={{
              backgroundColor:
                (value?.startTime && value?.endTime) ||
                (surveyData?.startTime && surveyData?.endTime)
                  ? '#75b4fc'
                  : 'transparent',
              p: 2,
              width: '100%',
              borderRadius: 2,
            }}
          >
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
              {value?.startTime && value?.endTime ? 'Update duration' : 'Set duration'}
            </Typography>

            {surveyData?.startTime && surveyData?.endTime ? (
              <Grid container spacing={2} sx={{}}>
                <Grid item xs={12} sm={6} md={4}>
                  <Stack direction="row" alignItems="center">
                    <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                      Survey Start :
                    </Typography>
                    <Typography variant="subtitle2" sx={{ ml: 1 }}>
                      {fDate(surveyData?.startTime)} - {fTime(surveyData?.startTime)}
                    </Typography>
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Stack direction="row" alignItems="center">
                    <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                      Survey End :
                    </Typography>
                    <Typography variant="subtitle2" sx={{ ml: 1 }}>
                      {fDate(surveyData?.endTime)} - {fTime(surveyData?.endTime)}
                    </Typography>
                  </Stack>
                </Grid>
              </Grid>
            ) : (
              value?.startTime &&
              value?.endTime && (
                <Grid container spacing={2} sx={{}}>
                  <Grid item xs={12} sm={6} md={4}>
                    <Stack direction="row" alignItems="center">
                      <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                        Survey Start :
                      </Typography>
                      <Typography variant="subtitle2" sx={{ ml: 1 }}>
                        {fDate(value?.startTime)} - {fTime(value?.startTime)}
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <Stack direction="row" alignItems="center">
                      <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                        Survey End :
                      </Typography>
                      <Typography variant="subtitle2" sx={{ ml: 1 }}>
                        {fDate(value?.endTime)} - {fTime(value?.endTime)}
                      </Typography>
                    </Stack>
                  </Grid>
                </Grid>
              )
            )}

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={4}>
                <LoadingButton
                  type="button"
                  variant="contained"
                  // loading={isSubmitting}
                  sx={{ width: '100%' }}
                  onClick={handleOpenTimer}
                >
                  {surveyData?.startTime ||
                  surveyData?.endTime ||
                  (value?.startTime && value?.endTime)
                    ? 'Update duration'
                    : 'Add duration'}
                </LoadingButton>
              </Grid>
            </Grid>
          </Stack>
        </Stack>

        <Modal
          open={openTimer}
          onClose={handleCloseTimer}
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
              width: { xs: 350, md: 400 },
              bgcolor: 'background.paper',
              border: '2px solid #000',
              borderRadius: '18px',
              boxShadow: 24,
              p: 4,
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 2,
              // m:{xs:2}
              // border:'1px solid red'
            }}
          >
            <DateTimePicker
              label="DateTimePicker"
              // value={value}
              onChange={(newValue) => {
                setValue('startTime', newValue);
              }}
              slotProps={{
                textField: {
                  fullWidth: true,
                  // margin: 'normal',
                },
              }}
            />

            <DateTimePicker
              name="endTime"
              value={value.endTime}
              onChange={(newValue) => {
                setValue('endTime', newValue);
              }}
              slotProps={{
                textField: {
                  fullWidth: true,
                  // margin: 'normal',
                },
              }}
            />
            {/* )}
            /> */}

            {/* <Box> */}
            <LoadingButton
              variant="contained"
              onClick={handleCloseTimer}
              sx={{ float: 'right', bgcolor: theme.palette.primary.main }}
            >
              Done
            </LoadingButton>
            {/* </Box> */}
          </Box>
        </Modal>
      </Card>
      {/* </Grid> */}
    </>
  );

  const renderProperties = (
    <Card>
      {/* {!mdUp && <CardHeader title="Properties" />} */}

      <Stack spacing={3} sx={{ p: 3 }}>
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

          {!surveyData && (
            <Button
              color="inherit"
              startIcon={
                <Iconify
                  icon={open ? 'solar:close-circle-broken' : 'mingcute:add-line'}
                  sx={{ mr: -0.5 }}
                />
              }
              onClick={handleOpen}
              sx={{ fontSize: 14 }}
            >
              {open ? ' ' : 'Add  Question'}
            </Button>
          )}
        </Stack>
      </Stack>
    </Card>
  );

  const renderActions = (
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
        {!surveyData ? 'Create Survey' : 'Save Changes'}
      </LoadingButton>
    </Stack>
  );

  return (
    <FormProvider methods={methods} onSubmit={surveyData ? onSubmitUpdate : onSubmit}>
      <Stack spacing={3}>
        {renderDetails}

        {renderProperties}

        {renderActions}
      </Stack>
    </FormProvider>
  );
}

InstituteNewEditForm.propTypes = {
  surveyData: PropTypes.object,
};
