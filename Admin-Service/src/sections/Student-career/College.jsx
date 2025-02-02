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
import { useGetAllSurvey } from 'src/api/survey';
// import { useGetRolesList } from 'src/api/userRole';
import { Hostel_Facility } from 'src/_mock/_blog';
import { createCollege, UpdateCollege } from 'src/api/Institution/college';

import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { RHFUpload, RHFTextField, RHFRadioGroup } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export default function College({ surveyData, currentCollege, institutionId }) {
  const router = useRouter();
  const theme = useTheme();

  // console.log('currentCollege------>', currentCollege)

  const { refetch: refetchSurveyResponse } = useGetAllSurvey();

  const [allSelected, setAllSelected] = useState(false);

  const [currentImageTab, setCurrentImageTab] = useState('frontImage');

  const collegeDetailId = currentCollege?.data?.collegeDetailId;

  // const mdUp = useResponsive('up', 'md');
  const { user } = useAuthContext();

  const { enqueueSnackbar } = useSnackbar();

  // schema
  const NewJobSchema = Yup.object().shape({
    // collegeDetailId: Yup.number().required('College Name required'),
    institutionOwnerId: Yup.number().required('Institution Name is required'),
    universityAffiliation: Yup.string().required('University Affiliation is required'),
    coursesOffered: Yup.array().required('Courses Offered is required'),
    stream: Yup.array().required('stream is required'),
    hostelFacility: Yup.string().required('Hostel Facility is required'),
    url: Yup.mixed().required('Image is required'),
    altText: Yup.mixed().required('Image is required'),
    placementRecord: Yup.string().required('Placement Record is required'),
  });

  // default value
  const defaultValues = useMemo(
    () => ({
      // collegeDetailId: currentCollege?.data?.collegeDetailId || '',
      // institutionId:  currentCollege?.data?.institutionId || institutionId,
      institutionOwnerId: currentCollege?.data?.institutionOwnerId || user?.userId,
      universityAffiliation: currentCollege?.data?.universityAffiliation || '',
      coursesOffered: currentCollege?.data?.coursesOffered || [],
      stream: currentCollege?.data?.stream || [],
      hostelFacility: currentCollege?.data?.hostelFacility || null,
      url: currentCollege?.data?.imageUrl?.url || '',
      altText: currentCollege?.data?.imageUrl?.altText || '',
      placementRecord: currentCollege?.data?.placementRecord || '',
    }),
    [currentCollege?.data, user?.userId]
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

  // console.log('value----->', value)

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
        // const imageUrl = response.data && response.data.data ? response.data.data : {};
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
    const allCourses = degreeCourses.map((option) => option);
    // console.log('allUserIds---->', allUserIds)
    setValue('coursesOffered', allCourses);
    setAllSelected(true);
  };

  const handleChange = (event, newValue) => {
    setValue('coursesOffered', newValue);
    if (newValue.length !== degreeCourses.length) {
      setAllSelected(false);
    } else {
      setAllSelected(true);
    }
  };

  const handleChangeStream = (event, newValue) => {
    setValue('stream', newValue);
    // if (newValue.length !== stream.length) {
    //   setAllSelected(false);
    // } else {
    //   setAllSelected(true);
    // }
  };
  useEffect(() => {
    if (currentCollege?.data) {
      reset(defaultValues);
    }
  }, [currentCollege?.data, defaultValues, reset]);

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

      const response = await createCollege(updatedData);
      if (response) {
        enqueueSnackbar(surveyData ? 'Update success!' : 'Create success!');
        reset();
        router.push(paths.dashboard.StudentCareer.instituteList);
        localStorage.setItem('currProduct', 'college');
      } else {
        enqueueSnackbar('College Creation Failed', { variant: 'error' });
      }
    } catch (error) {
      console.error(error);
    }
  });

  const onSubmitUpdate = handleSubmit(async (data) => {
    try {
      const response = await UpdateCollege(collegeDetailId, data);

      if (response) {
        enqueueSnackbar('College updated successfully', { variant: 'success' });
        router.push(paths.dashboard.StudentCareer.instituteList);
        localStorage.setItem('currProduct', 'college');
      } else {
        enqueueSnackbar('Failed to update College', { variant: 'error' });
      }
    } catch (error) {
      // Handle errors here if necessary
      console.error('Error updating College :', error);
      enqueueSnackbar('An error occurred while updating College ', { variant: 'error' });
    }
  });

  const degreeCourses = [
    'Bachelor of Arts',
    'Bachelor of Science',
    'Bachelor of Commerce',
    'Bachelor of Engineering',
    'Bachelor of Technology',
    'Bachelor of Business Administration',
    'Bachelor of Computer Applications',
    'Bachelor of Education',
    'Bachelor of Law',
    'Master of Arts',
    'Master of Science',
    'Master of Commerce',
    'Master of Engineering',
    'Master of Technology',
    'Master of Business Administration',
    'Master of Computer Applications',
    'Master of Education',
    'Master of Law',
  ];

  const streams = [
    'Arts',
    'Science',
    'Commerce',
    'Engineering',
    'Technology',
    'Business Administration',
    'Computer Applications',
    'Education',
    'Law',
  ];

  return (
    <FormProvider methods={methods} onSubmit={currentCollege?.data ? onSubmitUpdate : onSubmit}>
      <Stack spacing={3}>
        <Card sx={{ p: 3 }}>
          <Stack spacing={3} sx={{ p: 3 }}>
            {/* <Stack spacing={1.5}>
            <Typography variant="subtitle2">Institution Id</Typography>
            <RHFTextField name="institutionId"
            disabled
            />
          </Stack> */}
            <Stack spacing={1.5}>
              <Typography variant="subtitle2">Institution Owner Id</Typography>
              <RHFTextField name="institutionOwnerId" disabled />
            </Stack>

            <Stack spacing={1.5}>
              <Typography variant="subtitle2">University Affiliation</Typography>
              <RHFTextField name="universityAffiliation" label="Enter University Affiliation" />
            </Stack>

            <Stack spacing={1.5}>
              <Typography variant="subtitle2">Courses Offered</Typography>
              {/* <Typography variant="subtitle2">Select Users</Typography> */}
              <Controller
                name="coursesOffered"
                control={control}
                render={({ field }) => (
                  <Box>
                    <Autocomplete
                      multiple
                      id="tags-standard"
                      options={degreeCourses}
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
                          {degreeCourses?.find((item) => item === option)}
                        </li>
                      )}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          // variant="standard"
                          label="Select Courses"
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
              <Typography variant="subtitle2">Stream</Typography>
              {/* <Typography variant="subtitle2">Select Users</Typography> */}
              <Controller
                name="stream"
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
                        handleChangeStream(event, newValue);
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
                          label="Select Streams"
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

            <Card>
              {/* {!mdUp && <CardHeader title="Properties" />} */}
              <Stack spacing={0} sx={{ p: 3 }}>
                <Typography variant="subtitle2">Hostel Facility</Typography>
                <RHFRadioGroup row spacing={4} name="hostelFacility" options={Hostel_Facility} />
              </Stack>
            </Card>
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
              <Typography variant="subtitle2">Placement Record</Typography>
              <RHFTextField
                rows={4}
                multiline
                simple
                name="placementRecord"
                label="Information about past placements"
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
                {!currentCollege?.data ? 'Submit' : 'Update'}
              </LoadingButton>
            </Stack>
          </Stack>
        </Card>
      </Stack>
    </FormProvider>
  );
}

College.propTypes = {
  surveyData: PropTypes.object,
  currentCollege: PropTypes.object,
  institutionId: PropTypes.string,
};
