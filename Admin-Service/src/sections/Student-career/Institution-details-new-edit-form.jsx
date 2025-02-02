/* eslint-disable no-unused-vars */
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useMemo, useState, useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
// import imageCompression from 'browser-image-compression';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
// import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';

import { useAuthContext } from 'src/auth/hooks';
import { INDIAN_CITIES } from 'src/_mock/map/city';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { statesOfIndia } from 'src/_mock/map/states';
import { useGetSingleInstituteOwnerRequestList } from 'src/api/requestLicenseAcceptance';
import {
  createInsitute,
  UpdateInsitute,
  useGetInstituteDetail,
} from 'src/api/Institution/InstituteCreate';

// import { deleteFileFromAWSS3, uploadclaimFileInAWSS3 } from 'src/utils/aws-s3-file-handler';
import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { RHFTextField, RHFAutocomplete } from 'src/components/hook-form';
// import { createSchoolDetail, UpdateSchoolDetails } from 'src/api/Institution/schoolDetails';
// import { Box } from '@mui/system';
// import { Tab, Tabs, tabsClasses } from '@mui/material';

// Mock data for institution types and other options
const institutionTypes = ['School', 'College', 'Coaching center'];
const states = ['State1', 'State2', 'State3'];
const feeCategories = ['Category1', 'Category2', 'Category3'];

// ----------------------------------------------------------------------

export default function InstitutionDetailsNewEditForm({ currentSchool, setIsModalOpen }) {
  const { user } = useAuthContext();

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const [currentImageTab, setCurrentImageTab] = useState('frontImage');

  const { users } = useGetSingleInstituteOwnerRequestList(user.userId, user.accessToken) || [];

  const approvedInstituteOwner = users?.data?.find((institute) => institute.approvalStatus === 1);

  const { institute } = useGetInstituteDetail(approvedInstituteOwner?.institutionOwnerId);

  const SchoolSchema = Yup.object().shape({
    // institution_id: Yup.number().required('Institution ID is required'),
    // Institution_owner_id: Yup.number().required('Institution Owner ID is required'),
    name: Yup.string().required('Name is required'),
    institutionType: Yup.string().required('Institution Type is required'),
    address: Yup.string().required('Address is required'),
    website: Yup.string().required('Website is required'),
    description: Yup.string().required('Description is required'),
    admissionProcedure: Yup.string().required('Admission Procedure is required'),
    facilities: Yup.string().required('Facilities are required'),
  });

  const defaultValues = useMemo(
    () => ({
      // institution_id: currentSchool?.data.institution_id || '',
      // Institution_owner_id: currentSchool?.data.Institution_owner_id || '',
      name: currentSchool?.data.name || '',
      institutionType: currentSchool?.data.institution_type || '',
      address: currentSchool?.data.address || '',
      state: currentSchool?.data.state || '',
      city: currentSchool?.data.city || '',
      postalCode: currentSchool?.data.postal_code || '',
      contactNumber: currentSchool?.data.contact_number || '',
      website: currentSchool?.data.website || '',
      description: currentSchool?.data.description || '',
      admissionProcedure: currentSchool?.data.admission_procedure || '',
      facilities: currentSchool?.data.facilities || '',
    }),
    [currentSchool?.data]
  );


  const userLocation = user?.UserAddressesses?.[0]

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

  useEffect(() => {
    if (currentSchool?.data) {
      reset(defaultValues);
    }
  }, [currentSchool?.data, defaultValues, reset]);

  // const handleChangeImageTab = useCallback((event, newValue) => {
  //   setCurrentImageTab(newValue);
  // }, []);

  // const uploadImage = useMemo(
  //   () => async (file) => {
  //     try {
  //       const compressedFile = await imageCompression(file, {
  //         maxSizeMB: 0.5, // Adjust maximum size as needed
  //         maxWidthOrHeight: 800, // Adjust maximum width or height as needed
  //       });

  //       const formData = new FormData();
  //       formData.append('image', compressedFile);

  //       const response = await uploadUserFileInAWSS3(formData);
  //       const imageUrl = response?.data?.data?.preview || '';

  //       if (imageUrl) {
  //         setValue('logo', imageUrl);
  //         enqueueSnackbar(' Image Upload Successfully', { variant: 'success' });
  //       } else {
  //         console.error('Error in uploading file:', response);
  //         enqueueSnackbar('Error while uploading', { variant: 'error' });
  //       }
  //     } catch (error) {
  //       console.error('Error compressing image:', error);
  //       enqueueSnackbar('Error while compressing image', { variant: 'error' });
  //     }
  //   },
  //   [setValue, enqueueSnackbar]
  // );

  // const handleDropTractorPicture = useCallback(
  //   (acceptedFiles) => {
  //     const file = acceptedFiles[0];

  //     const newFile = Object.assign(file, {
  //       preview: URL.createObjectURL(file),
  //     });
  //     if (file) {
  //       uploadImage(newFile);
  //     }
  //   },
  //   [uploadImage]
  // );

  // const handleRemoveFile = useCallback(async () => {
  //   const dataToSend = {
  //     url: values.logo,
  //   };
  //   await deleteUserFileFromAWSS3(dataToSend)
  //     .then((data) => {
  //       setValue('logo', null);
  //       // console.log(data);
  //       enqueueSnackbar('Deleted successfully', { variant: 'success' });
  //     })
  //     .catch((err) => {
  //       console.error('Error in deleting files:', err);
  //       enqueueSnackbar('Error while deleting', { variant: 'error' });
  //     });
  // }, [setValue, enqueueSnackbar, values.logo]);
  
  

  const onSubmit = handleSubmit(async (data) => {
    try {
      const updatedData = {
        ...data,
        institutionOwnerId: user?.userId,
        state: userLocation?.userState || 'NA',
        city: userLocation?.userCity || 'NA',
        postalCode: userLocation?.postalCode || 'NA',
        contactNumber: user?.phone || 'NA',
      };
      const response = await createInsitute(updatedData);
      if (response) {
        enqueueSnackbar('School Details created successfully', { variant: 'success' });
        setIsModalOpen(false)
        navigate('/dashboard');
      } else {
        enqueueSnackbar('Failed to create School Details', { variant: 'error' });
      }
    } catch (error) {
      console.error('Error submitting School Details:', error);
      enqueueSnackbar('An error occurred while creating School Details', { variant: 'error' });
    }
  });

  const onSubmitUpdate = handleSubmit(async (data) => {
    try {
      const response = await UpdateInsitute(currentSchool?.data.partyId, data);
      if (response) {
        enqueueSnackbar('School Details updated successfully', { variant: 'success' });
      } else {
        enqueueSnackbar('Failed to update School Details', { variant: 'error' });
      }
    } catch (error) {
      console.error('Error updating School Details :', error);
      enqueueSnackbar('An error occurred while updating School Details ', { variant: 'error' });
    }
  });

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid xs={12} md={8}>
        {/* <Card sx={{ p: 3 }}> */}
          <Stack spacing={3} sx={{ p: 3 }}>
            <RHFTextField name="name" label="Institution Name" />
            <RHFAutocomplete
              name="institutionType"
              label="Institution Type"
              options={institutionTypes}
              getOptionLabel={(option) => option}
            />
            <RHFTextField name="address" label="Address" />

            <RHFTextField name="website" label="Website" />
            <RHFTextField name="description" label="Description" multiline rows={4} />
            <RHFTextField
              name="admissionProcedure"
              label="Admission Procedure"
              multiline
              rows={4}
            />
            <RHFTextField name="facilities" label="Facilities" multiline rows={4} />
          </Stack>

          <Stack alignItems="flex-end" sx={{ mt: 3 }}>
            <LoadingButton type="submit" variant="contained" size="large" loading={isSubmitting}>
              Add Institute Details
            </LoadingButton>
          </Stack>
        {/* </Card> */}
      </Grid>
    </FormProvider>
  );
}

InstitutionDetailsNewEditForm.propTypes = {
  currentSchool: PropTypes.object,
  setIsModalOpen: PropTypes.func,
};
