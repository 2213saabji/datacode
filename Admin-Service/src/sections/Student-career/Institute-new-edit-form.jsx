/* eslint-disable no-unused-vars */
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import imageCompression from 'browser-image-compression';
import { useMemo, useState, useEffect, useCallback } from 'react';

import { Box } from '@mui/system';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import { Tab, Tabs, tabsClasses } from '@mui/material';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { uploadUserFileInAWSS3, deleteUserFileFromAWSS3 } from 'src/utils/aws-s3-file-handler';

import { TABS } from 'src/_mock/agriculture';
import { useAuthContext } from 'src/auth/hooks';
import { schoolFeeTypes } from 'src/_mock/Institution';
import { gradeOffered, Hostel_Facility } from 'src/_mock';
import { createSchoolDetail, UpdateSchoolDetails } from 'src/api/Institution/schoolDetails';

import { useSnackbar } from 'src/components/snackbar';
import FormProvider, {
  RHFUpload,
  RHFTextField,
  RHFRadioGroup,
  RHFAutocomplete,
} from 'src/components/hook-form';

// ----------------------------------------------------------------------

export default function InstituteNewEditForm({ currentSchool, institutionId }) {
  // console.log('currentSchool--->', currentSchool)
  // Required Variablesgthdtxtrrsedsr
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const currentSchoolId = currentSchool?.data.schoolDetailId;

  const router = useRouter();
  const { user } = useAuthContext();

  // fetching the election List
  // const { elections: electionsList } = useGetElections();

  // const ElectionListArr = electionsList?.data || [];

  // const ElectionData = ElectionListArr.map((list) => ({
  //   value: list.electionId,
  //   label: list.electionTitle,
  // }));

  // const ElectionListDataForOptions = ElectionData.map((option) => option.value);

  // fetching the Party Alliacne List
  const [currentImageTab, setCurrentImageTab] = useState('frontImage');

  // const { PartyAlliances: PartyAlliacneList } = useGetPartyAlliances();

  // const AllianceListArr = PartyAlliacneList?.data || [];

  // const AllianceData = AllianceListArr.map((list) => ({
  //   value: list.partyAllianceId,
  //   label: list.partyAllianceName,
  // }));

  // const AllianceListDataForOptions = AllianceData.map((option) => option.value);

  // Form Validation Schema
  const SchoolSchema = Yup.object().shape({
    // electionId: Yup.number().required('Election is required'),
    // partyAllianceId: Yup.number().required('Party Alliance is required'),
    institutionOwnerId: Yup.number().required('Institution Owner Id is required'),
    board: Yup.string().required('Board is required'),
    gradesOffered: Yup.string().required('Grades Offered is required'),
    hostelFacility: Yup.string().required('Hostel Facility is required'),
    feeCategory: Yup.string().required('Fee Catogory is required'),
    feeStructure: Yup.string().required('Fee Structure is required'),
    thumbnail: Yup.mixed().required('Img Url is required'),
    image2: Yup.mixed().required('Img Url is required'),
    // extracurricularActivities: Yup.string().required('Extracurricular Activities is required'),
  });

  // Form Values
  const defaultValues = useMemo(
    () => ({
      // electionId: currentSchool?.data.electionId || null,
      // partyAllianceId: currentSchool?.data.partyAllianceId || null,
      institutionOwnerId: currentSchool?.data?.institutionOwnerId || user?.userId,
      board: currentSchool?.data.board || '',
      gradesOffered: currentSchool?.data.gradesOffered || '',
      hostelFacility: currentSchool?.data?.hostelFacility || null,
      feeCategory: currentSchool?.data.feeCategory || '',
      feeStructure: currentSchool?.data.feeStructure || '',
      thumbnail: currentSchool?.data.imageUrl?.thumbnail || null,
      image2: currentSchool?.data.imageUrl?.thumbnail || null,
      extracurricularActivities: currentSchool?.data.extracurricularActivities || null,
    }),
    [currentSchool?.data, user?.userId]
  );

  // Form Method
  const methods = useForm({
    resolver: yupResolver(SchoolSchema),
    defaultValues,
  });
  const {
    reset,
    handleSubmit,
    setValue,
    watch,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  // console.log('values-------->', values)

  useEffect(() => {
    if (currentSchool?.data) {
      reset(defaultValues);
    }
  }, [currentSchool?.data, defaultValues, reset]);

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
            setValue('thumbnail', imageUrl);
            enqueueSnackbar(' Image Upload Successfully', { variant: 'success' });
          } else if (currentImageTab === 'sideImage') {
            setValue('image2', imageUrl);
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
        url: values.thumbnail,
      };
      await deleteUserFileFromAWSS3(dataToSend)
        .then((data) => {
          setValue('thumbnail', null);
          // console.log(data);
          enqueueSnackbar('Deleted successfully', { variant: 'success' });
        })
        .catch((err) => {
          console.error('Error in deleting files:', err);
          enqueueSnackbar('Error while deleting', { variant: 'error' });
        });
    } else {
      const dataToSend = {
        url: values.image2,
      };
      await deleteUserFileFromAWSS3(dataToSend)
        .then((data) => {
          setValue('image2', null);
          // console.log(data);
          enqueueSnackbar('Deleted successfully', { variant: 'success' });
        })
        .catch((err) => {
          console.error('Error in deleting files:', err);
          enqueueSnackbar('Error while deleting', { variant: 'error' });
        });
    }
  }, [setValue, currentImageTab, enqueueSnackbar, values.thumbnail, values.image2]);

  // Function Call for New Ward Profile
  const onSubmit = handleSubmit(async (data) => {
    try {
      const updatedData = {
        ...data,
        imageUrl: {
          thumbnail: data.thumbnail,
          image2: data.image2,
        },
        state:user?.UserAddressesses?.[0]?.userState || 'NA',
        city:user?.UserAddressesses?.[0]?.userCity || 'NA',
        district:user?.UserAddressesses?.[0]?.userCity || 'NA',
        tehsil:user?.UserAddressesses?.[0]?.userCity || 'NA',
      };
      const response = await createSchoolDetail(updatedData);
      if (response) {
        enqueueSnackbar('School Details created successfully', { variant: 'success' });
        router.push(paths.dashboard.StudentCareer.instituteList);
        localStorage.setItem('currProduct', 'school');
      } else {
        enqueueSnackbar('Failed to create School Details', { variant: 'error' });
      }
    } catch (error) {
      console.error('Error submitting School Details:', error);
      enqueueSnackbar('An error occurred while creating School Details', { variant: 'error' });
    }
  });

  // Function Call for Updating Ward Profile
  const onSubmitUpdate = handleSubmit(async (data) => {
    try {
      const response = await UpdateSchoolDetails(currentSchoolId, data);

      if (response) {
        enqueueSnackbar('School Details updated successfully', { variant: 'success' });
        router.push(paths.dashboard.StudentCareer.instituteList);
        localStorage.setItem('currProduct', 'school');
      } else {
        enqueueSnackbar('Failed to update School Details', { variant: 'error' });
      }
    } catch (error) {
      // Handle errors here if necessary
      console.error('Error updating School Details :', error);
      enqueueSnackbar('An error occurred while updating School Details ', { variant: 'error' });
    }
  });

  return (
    <FormProvider methods={methods} onSubmit={currentSchool ? onSubmitUpdate : onSubmit}>
      <Grid container spacing={3}>
        <Grid xs={12} md={12}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={3} sx={{ p: 3 }}>
              <Typography variant="subtitle2">Institution Owner Id</Typography>
              <RHFTextField name="institutionOwnerId" disabled />

              <RHFAutocomplete
                name="board"
                label="Board"
                // options={ElectionListDataForOptions}
                // getOptionLabel={(value) => {
                //   const Election = ElectionData.find((option) => option.value === value);
                //   return Election ? Election.label : '';
                // }}
                options={['CBSE', 'ICSE', 'State Board'].map((option) => option)}
                getOptionLabel={(option) => option}
              />

              <RHFAutocomplete
                name="gradesOffered"
                label="Grades Offered"
                // options={AllianceListDataForOptions}
                // getOptionLabel={(value) => {
                //   const Alliacne = AllianceData.find((option) => option.value === value);
                //   return Alliacne ? Alliacne.label : '';
                // }}
                options={gradeOffered.map((option) => option)}
                getOptionLabel={(option) => option}
              />

              {/* <RHFAutocomplete
                name="hostelFacility"
                label="Hostel Facility"
                placeholder="Choose a Party Name"
                fullWidth
                // options={Party_Name.map((option) => option)}
                // getOptionLabel={(option) => option}
                options={['YES', 'NO'].map((option) => option)}
                getOptionLabel={(option) => option}
              /> */}

              <RHFAutocomplete
                name="feeCategory"
                label="Fee Category"
                placeholder="Choose a Party Name"
                fullWidth
                options={schoolFeeTypes.map((option) => option)}
                getOptionLabel={(option) => option}
              />

              <RHFTextField
                name="feeStructure"
                label="Fee Structure"
                placeholder="Enter Fee structure"
                fullWidth
                // options={Party_Name.map((option) => option)}
                // getOptionLabel={(option) => option}
              />

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
                    name="thumbnail"
                    maxSize={8388608}
                    onDrop={handleDropUserPicture}
                    onDelete={handleRemoveFile}
                  />
                )}
                {currentImageTab === 'sideImage' && (
                  <RHFUpload
                    name="image2"
                    maxSize={8388608}
                    onDrop={handleDropUserPicture}
                    onDelete={handleRemoveFile}
                  />
                )}
              </Box>

              <Card>
                <Stack spacing={0} sx={{ p: 3 }}>
                  <Typography variant="subtitle2">Hostel Facility</Typography>
                  <RHFRadioGroup row spacing={4} name="hostelFacility" options={Hostel_Facility} />
                </Stack>
              </Card>

              <Stack spacing={1.5}>
                <RHFTextField
                  name="extracurricularActivities"
                  type="text"
                  fullWidth
                  label="Extracurricular Activities"
                  multiline
                  rows={4}
                />
              </Stack>
            </Stack>

            {/* <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" size="large" loading={isSubmitting}>
                {!currentSchool ? 'Create School' : 'Save School'}
              </LoadingButton>
            </Stack> */}

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
                sx={{ mr: 2.5 }}
              >
                {!currentSchool ? 'Submit' : 'Update'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}

InstituteNewEditForm.propTypes = {
  currentSchool: PropTypes.object,
  institutionId: PropTypes.string,
};
