/* eslint-disable no-unused-vars */
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  useMemo,
  useState,
  useEffect,
  useCallback,
  // useCallback
} from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import { Tab, Tabs, Checkbox, TextField, tabsClasses, Autocomplete } from '@mui/material';
// import Grid from '@mui/material/Unstable_Grid2';

import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
// import FormControlLabel from '@mui/material/FormControlLabel';

import imageCompression from 'browser-image-compression';

// import CustomDateRangePicker from 'src/components/custom-date-range-picker/custom-date-range-picker';
import { useTheme } from '@mui/material/styles';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
// import VoterList from '../voter/voter-list';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { uploadUserFileInAWSS3, deleteUserFileFromAWSS3 } from 'src/utils/aws-s3-file-handler';

import { TABS } from 'src/_mock/agriculture';
import { useAuthContext } from 'src/auth/hooks';
import { streams, timings, subjects } from 'src/_mock/Institution';
import { createcoaching, Updatecoaching } from 'src/api/Institution/coaching';

import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { RHFUpload, RHFTextField } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export default function Coaching({ surveyData, currentCoaching, institutionId }) {
  const router = useRouter();
  const theme = useTheme();

  // console.log('currentCoaching------>', currentCoaching)

  const [allSelected, setAllSelected] = useState(false);

  const [currentImageTab, setCurrentImageTab] = useState('frontImage');

  const coachingId = currentCoaching?.data?.coachingCenterDetailId;

  // const mdUp = useResponsive('up', 'md');
  const { user } = useAuthContext();

  const { enqueueSnackbar } = useSnackbar();

  // schema
  const NewJobSchema = Yup.object().shape({
    // coachingCenterDetailId: Yup.number().required('College Name required'),
    institutionOwnerId: Yup.number().required('Institution Name is required'),
    subjectsOffered: Yup.array().required('University Affiliation is required'),
    competitiveExams: Yup.array().required('Courses Offered is required'),
    batchTimings: Yup.array().required('stream is required'),
    url: Yup.mixed().required('Image is required'),
    altText: Yup.mixed().required('Image is required'),
    successRate: Yup.string().required('Placement Record is required'),
  });

  // default value
  const defaultValues = useMemo(
    () => ({
      // coachingCenterDetailId: currentCoaching?.data?.coachingCenterDetailId || '',
      institutionOwnerId: currentCoaching?.data?.institutionOwnerId || user?.userId,
      subjectsOffered: currentCoaching?.data?.subjectsOffered || [],
      competitiveExams: currentCoaching?.data?.competitiveExams || [],
      batchTimings: currentCoaching?.data?.batchTimings || [],
      url: currentCoaching?.data?.imageUrl?.url || '',
      altText: currentCoaching?.data?.imageUrl?.altText || '',
      successRate: currentCoaching?.data?.successRate || '',
    }),
    [currentCoaching?.data, user?.userId]
  );

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

  // for image upload
  const handleChangeImageTab = useCallback((event, newValue) => {
    setCurrentImageTab(newValue);
  }, []);

  // for user profile image

  // for user profile image
  const uploadImage = useMemo(
    () => async (file) => {
      try {
        const compressedFile = await imageCompression(file, {
          maxSizeMB: 0.5, // Adjust maximum size as needed
          maxWidthOrHeight: 800, // Adjust maximum width or height as needed
        });

        const formData = new FormData();
        formData.append('image', compressedFile);

        const response = await uploadUserFileInAWSS3(formData);
        const imageUrl = response?.data?.data?.preview || {};

        if (imageUrl) {
          if (currentImageTab === 'frontImage') {
            setValue('url', imageUrl);
            enqueueSnackbar(' Image Upload Successfully', { variant: 'success' });
          } else if (currentImageTab === 'sideImage') {
            setValue('altText', imageUrl);
            enqueueSnackbar('Degree Image Upload Successfully', { variant: 'success' });
          }
        } else {
          console.error('Error in uploading file:', response);
          enqueueSnackbar('Error while uploading', { variant: 'error' });
        }
      } catch (error) {
        console.error('Error compressing image:', error);
        enqueueSnackbar('Error while compressing image', { variant: 'error' });
      }
    },
    [setValue, enqueueSnackbar, currentImageTab]
  );

  const handleDropUserPicture = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });
      if (file) {
        uploadImage(newFile);
      }
    },
    [uploadImage]
  );

  const handleRemoveFile = useCallback(async () => {
    if (currentImageTab === 'frontImage') {
      const dataToSend = {
        url: value.url,
      };
      await deleteUserFileFromAWSS3(dataToSend)
        .then((data) => {
          setValue('url', null);
          // console.log(data);
          enqueueSnackbar('Deleted successfully', { variant: 'success' });
        })
        .catch((err) => {
          console.error('Error in deleting files:', err);
          enqueueSnackbar('Error while deleting', { variant: 'error' });
        });
    } else {
      const dataToSend = {
        url: value.altText,
      };
      await deleteUserFileFromAWSS3(dataToSend)
        .then((data) => {
          setValue('altText', null);
          // console.log(data);
          enqueueSnackbar('Deleted successfully', { variant: 'success' });
        })
        .catch((err) => {
          console.error('Error in deleting files:', err);
          enqueueSnackbar('Error while deleting', { variant: 'error' });
        });
    }
  }, [setValue, currentImageTab, enqueueSnackbar, value.url, value.altText]);

  const handleSelectAllUsers = () => {
    const allCourses = subjects.map((option) => option);
    // console.log('allUserIds---->', allUserIds)
    setValue('coursesOffered', allCourses);
    setAllSelected(true);
  };

  const handleChange = (event, newValue) => {
    setValue('coursesOffered', newValue);
    if (newValue.length !== subjects.length) {
      setAllSelected(false);
    } else {
      setAllSelected(true);
    }
  };

  useEffect(() => {
    if (currentCoaching?.data) {
      reset(defaultValues);
    }
  }, [currentCoaching?.data, defaultValues, reset]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      const updatedData = {
        ...data,
        imageUrl: {
          url: data.url,
          altText: data.altText,
        },
        state:user?.UserAddressesses?.[0]?.userState || 'NA',
        city:user?.UserAddressesses?.[0]?.userCity || 'NA',
        district:user?.UserAddressesses?.[0]?.userCity || 'NA',
        tehsil:user?.UserAddressesses?.[0]?.userCity || 'NA',
      };

      const response = await createcoaching(updatedData);
      if (response) {
        enqueueSnackbar('Create success!');
        reset();
        router.push(paths.dashboard.StudentCareer.instituteList);
        localStorage.setItem('currProduct', 'coachingCenter');
      } else {
        enqueueSnackbar('Coaching center Creation Failed', { variant: 'error' });
      }
    } catch (error) {
      console.error(error);
    }
  });

  const onSubmitUpdate = handleSubmit(async (data) => {
    // console.log("Hiiiiiiiiiiiiiiiiiiii");

    try {
      const response = await Updatecoaching(coachingId, data);

      if (response) {
        enqueueSnackbar('Coaching center updated successfully', { variant: 'success' });
        router.push(paths.dashboard.StudentCareer.instituteList);
        localStorage.setItem('currProduct', 'coachingCenter');
      } else {
        enqueueSnackbar('Failed to update Coaching center', { variant: 'error' });
      }
    } catch (error) {
      // Handle errors here if necessary
      console.error('Error updating Coaching center :', error);
      enqueueSnackbar('An error occurred while updating Coaching center ', { variant: 'error' });
    }
  });

  return (
    <FormProvider methods={methods} onSubmit={currentCoaching ? onSubmitUpdate : onSubmit}>
      <Stack spacing={3}>
        <Card sx={{ p: 3 }}>
          <Stack spacing={3} sx={{ p: 3 }}>
            {/* <Stack spacing={1.5}>
            <Typography variant="subtitle2">Coaching center details id</Typography>
            <RHFTextField name="coachingCenterDetailId" label="Ex: Enter Coaching Center Detail Id..."

              InputLabelProps={{
                style: {
                  color: theme.palette.mode === 'light' ? 'black' : 'white'
                },
              }} />
          </Stack> */}

            <Stack spacing={1.5}>
              <Typography variant="subtitle2">Institution Owner Id</Typography>
              <RHFTextField name="institutionOwnerId" disabled />
            </Stack>

            <Stack spacing={1.5}>
              <Typography variant="subtitle2">Subjects Offered</Typography>
              {/* <Typography variant="subtitle2">Select Users</Typography> */}
              <Controller
                name="subjectsOffered"
                control={control}
                render={({ field }) => (
                  <Box>
                    <Autocomplete
                      multiple
                      id="tags-standard"
                      options={subjects}
                      disableCloseOnSelect
                      getOptionLabel={(option) => option}
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
                          {subjects?.find((item) => item === option)}
                        </li>
                      )}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          // variant="standard"
                          label="Select Subjects..."
                          InputLabelProps={{
                            style: {
                              color: theme.palette.mode === 'light' ? 'black' : 'white',
                            },
                          }}
                        />
                      )}
                      // renderTags={(val, getTagProps) => (
                      //   allSelected
                      //     ? <Chip key="all-selected" label="All selected" style={{ backgroundColor: '#75b4fc', color: 'black', margin: '5px' }} avatar={<Avatar style={{ backgroundColor: '#75b4fc', color: 'black' }}><PersonIcon /></Avatar>} />
                      //     : val.map((option, index) => (
                      //       <Chip
                      //         label={degreeCourses?.find(item => item === option)}
                      //         {...getTagProps({ index })}
                      //         style={{ backgroundColor: '#75b4fc', color: 'black' }}
                      //       // avatar={<Avatar style={{ color: 'black' }}><PersonIcon /></Avatar>}
                      //       />
                      //     ))
                      // )}
                    />
                    {/* <Box style={{ textAlign: 'end' }}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleSelectAllUsers}
                      style={{ marginTop: '10px' }}
                    >
                      Select All
                    </Button>
                  </Box> */}
                  </Box>
                )}
              />
            </Stack>

            <Stack spacing={1.5}>
              <Typography variant="subtitle2">Competitive Exams</Typography>
              {/* <Typography variant="subtitle2">Select Users</Typography> */}
              <Controller
                name="competitiveExams"
                control={control}
                render={({ field }) => (
                  <Box>
                    <Autocomplete
                      multiple
                      id="tags-standard"
                      options={streams}
                      disableCloseOnSelect
                      getOptionLabel={(option) => option}
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
                          {streams?.find((item) => item === option)}
                        </li>
                      )}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          // variant="standard"
                          label="Select Competitive Exams..."
                          InputLabelProps={{
                            style: {
                              color: theme.palette.mode === 'light' ? 'black' : 'white',
                            },
                          }}
                        />
                      )}
                      // renderTags={(val, getTagProps) => (
                      //   allSelected
                      //     ? <Chip key="all-selected" label="All selected" style={{ backgroundColor: '#75b4fc', color: 'black', margin: '5px' }} avatar={<Avatar style={{ backgroundColor: '#75b4fc', color: 'black' }}><PersonIcon /></Avatar>} />
                      //     : val.map((option, index) => (
                      //       <Chip
                      //         label={degreeCourses?.find(item => item === option)}
                      //         {...getTagProps({ index })}
                      //         style={{ backgroundColor: '#75b4fc', color: 'black' }}
                      //       // avatar={<Avatar style={{ color: 'black' }}><PersonIcon /></Avatar>}
                      //       />
                      //     ))
                      // )}
                    />
                    {/* <Box style={{ textAlign: 'end' }}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleSelectAllUsers}
                      style={{ marginTop: '10px' }}
                    >
                      Select All
                    </Button>
                  </Box> */}
                  </Box>
                )}
              />
            </Stack>
            <Stack spacing={1.5}>
              <Typography variant="subtitle2">Batch Timings</Typography>
              {/* <Typography variant="subtitle2">Select Users</Typography> */}
              <Controller
                name="batchTimings"
                control={control}
                render={({ field }) => (
                  <Box>
                    <Autocomplete
                      multiple
                      id="tags-standard"
                      options={timings}
                      disableCloseOnSelect
                      getOptionLabel={(option) => option}
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
                          {timings?.find((item) => item === option)}
                        </li>
                      )}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          // variant="standard"
                          label="Select Batch Timings..."
                          InputLabelProps={{
                            style: {
                              color: theme.palette.mode === 'light' ? 'black' : 'white',
                            },
                          }}
                        />
                      )}
                      // renderTags={(val, getTagProps) => (
                      //   allSelected
                      //     ? <Chip key="all-selected" label="All selected" style={{ backgroundColor: '#75b4fc', color: 'black', margin: '5px' }} avatar={<Avatar style={{ backgroundColor: '#75b4fc', color: 'black' }}><PersonIcon /></Avatar>} />
                      //     : val.map((option, index) => (
                      //       <Chip
                      //         label={degreeCourses?.find(item => item === option)}
                      //         {...getTagProps({ index })}
                      //         style={{ backgroundColor: '#75b4fc', color: 'black' }}
                      //       // avatar={<Avatar style={{ color: 'black' }}><PersonIcon /></Avatar>}
                      //       />
                      //     ))
                      // )}
                    />
                    {/* <Box style={{ textAlign: 'end' }}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleSelectAllUsers}
                      style={{ marginTop: '10px' }}
                    >
                      Select All
                    </Button>
                  </Box> */}
                  </Box>
                )}
              />
            </Stack>

            <Card sx={{ p: 4 }}>
              <Box sx={{ mb: 2 }}>
                <Box sx={{ mb: 2 }}>
                  <Tabs
                    value={currentImageTab}
                    onChange={handleChangeImageTab}
                    sx={{
                      width: 1,
                      zIndex: 9,
                      bgcolor: 'background.paper',
                      [`& .${tabsClasses.flexContainer}`]: {
                        pr: { md: 3 },
                        justifyContent: {
                          xs: 'center',
                          sm: 'center',
                          md: 'center',
                        },
                      },
                    }}
                  >
                    {TABS.map((tab) => (
                      <Tab key={tab.value} value={tab.value} label={tab.label} />
                    ))}
                  </Tabs>
                </Box>
                {currentImageTab === 'frontImage' && (
                  <RHFUpload
                    name="url"
                    maxSize={8388608}
                    onDrop={handleDropUserPicture}
                    onDelete={handleRemoveFile}
                  />
                )}
                {currentImageTab === 'sideImage' && (
                  <RHFUpload
                    name="altText"
                    maxSize={8388608}
                    onDrop={handleDropUserPicture}
                    onDelete={handleRemoveFile}
                  />
                )}
              </Box>
            </Card>

            <Stack spacing={1.5}>
              <Typography variant="subtitle2">Success Rate</Typography>
              <RHFTextField
                rows={4}
                multiline
                simple
                name="successRate"
                label="Ex: Percentage of successful students..."
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
                {!currentCoaching ? 'Submit' : 'Update'}
              </LoadingButton>
            </Stack>
          </Stack>
        </Card>
      </Stack>
    </FormProvider>
  );
}

Coaching.propTypes = {
  surveyData: PropTypes.object,
  currentCoaching: PropTypes.object,
  institutionId: PropTypes.string,
};
