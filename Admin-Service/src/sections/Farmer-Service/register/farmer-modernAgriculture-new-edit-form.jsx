import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import imageCompression from 'browser-image-compression';
import { useMemo, useState, useEffect, useCallback } from 'react';

import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import LoadingButton from '@mui/lab/LoadingButton';
import Tabs, { tabsClasses } from '@mui/material/Tabs';
import InputAdornment from '@mui/material/InputAdornment';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { uploadUserFileInAWSS3, deleteUserFileFromAWSS3 } from 'src/utils/aws-s3-file-handler';

import { createTool, UpdateTool } from 'src/api/agriculture/modernAgri';
import {
  powerSource,
  modernAgricultureTools,
  framerProductConditions,
  modernAgricultureToolApplications,
} from 'src/_mock';

import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { RHFUpload, RHFTextField, RHFAutocomplete } from 'src/components/hook-form';
import { useAuthContext } from 'src/auth/hooks';

const TABS = [
  {
    value: 'frontImage',
    label: 'Front Image',
  },
  {
    value: 'sideImage',
    label: 'Side Image',
  },
];

// ----------------------------------------------------------------------

export default function ModernAgriEditForm({ currentTool }) {
  // Required Variablesgthdtxtrrsedsr
  const { user } = useAuthContext()
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const modernAgriToolId = currentTool?.data.modernAgriToolId;

  const [currentImageTab, setCurrentImageTab] = useState('frontImage');

  const sellerDetails =
    localStorage.getItem('sellerDetails') !== 'undefined' &&
    JSON.parse(localStorage.getItem('sellerDetails'));

  // Form Validation Schema
  const PartySchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    description: Yup.string().required('Description is required'),
    yearManufactured: Yup.mixed().required('Manufactured Year is required'),
    condition: Yup.string().required('Condition is required'),
    price: Yup.number().required('Price is required'),
    brand: Yup.string().required('Brand is required'),
    applicationType: Yup.string().required('Application Type is required'),
    powerSource: Yup.string().required('Power Source is required'),
    thumbnail: Yup.string().required('Image is required'),
    full: Yup.string().required('Image is required'),
  });

  // Form Values
  const defaultValues = useMemo(
    () => ({
      name: currentTool?.data.name || '',
      description: currentTool?.data.description || '',
      yearManufactured: currentTool?.data.yearManufactured || null,
      condition: currentTool?.data.condition || '',
      price: currentTool?.data.price || null,
      brand: currentTool?.data.brand || '',
      applicationType: currentTool?.data.applicationType || '',
      thumbnail: currentTool?.data?.imageUrl?.thumbnail || '',
      full: currentTool?.data?.imageUrl?.full || '',
      powerSource: currentTool?.data.powerSource || '',
    }),
    [currentTool]
  );

  // Form Method
  const methods = useForm({
    resolver: yupResolver(PartySchema),
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
    if (currentTool) {
      reset(defaultValues);
    }
  }, [currentTool, defaultValues, reset]);

  const handleChangeImageTab = useCallback((event, newValue) => {
    setCurrentImageTab(newValue);
  }, []);

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
            setValue('thumbnail', imageUrl);
            enqueueSnackbar(' Image Upload Successfully', { variant: 'success' });
          } else if (currentImageTab === 'sideImage') {
            setValue('full', imageUrl);
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
    [setValue, currentImageTab, enqueueSnackbar]
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
        url: values.full,
      };
      await deleteUserFileFromAWSS3(dataToSend)
        .then((data) => {
          setValue('full', null);
          // console.log(data);
          enqueueSnackbar('Deleted successfully', { variant: 'success' });
        })
        .catch((err) => {
          console.error('Error in deleting files:', err);
          enqueueSnackbar('Error while deleting', { variant: 'error' });
        });
    }
  }, [setValue, currentImageTab, enqueueSnackbar, values.thumbnail, values.full]);

  // Function Call for New Ward Profile
  const onSubmit = handleSubmit(async (data) => {
    try {
      const updatedData = {
        ...data,
        sellerOwnerId: sellerDetails?.sellerOwnerId,
        imageUrl: {
          thumbnail: values.thumbnail,
          full: values.full,
        },
        state:user?.UserAddressesses?.[0]?.userState || 'NA',
        city:user?.UserAddressesses?.[0]?.userCity || 'NA',
        district:user?.UserAddressesses?.[0]?.userCity || 'NA',
        tehsil:user?.UserAddressesses?.[0]?.userCity || 'NA',
      };
      const response = await createTool(updatedData);
      if (response) {
        enqueueSnackbar('Tool details registered successfully', { variant: 'success' });
        navigate('/dashboard/FarmerService');
      } else {
        enqueueSnackbar('Failed to register Tool details', { variant: 'error' });
      }
    } catch (error) {
      console.error('Error submitting Tool details:', error);
      enqueueSnackbar('An error occurred while registering Tool details', { variant: 'error' });
    }
  });

  // Function Call for Updating Ward Profile
  const onSubmitUpdate = handleSubmit(async (data) => {
    try {
      const response = await UpdateTool(modernAgriToolId, data);

      if (response) {
        enqueueSnackbar('Tool details updated successfully', { variant: 'success' });
        navigate(
          `/dashboard/FarmerService/Registration/${modernAgriToolId}/modern_agriculture_tool`
        );
      } else {
        enqueueSnackbar('Failed to update Tool details', { variant: 'error' });
      }
    } catch (error) {
      // Handle errors here if necessary
      console.error('Error updating Tool details :', error);
      enqueueSnackbar('An error occurred while updating Tool details ', { variant: 'error' });
    }
  });

  return (
    <FormProvider methods={methods} onSubmit={currentTool ? onSubmitUpdate : onSubmit}>
      <Grid container spacing={3}>
        <Grid xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={3} sx={{ p: 3 }}>
              <RHFAutocomplete
                name="name"
                label="Tool Name"
                options={modernAgricultureTools.map((option) => option)}
                getOptionLabel={(option) => option}
              />

              <RHFTextField name="brand" label="Brand" />

              <RHFAutocomplete
                name="condition"
                label="Condition"
                fullWidth
                options={framerProductConditions.map((option) => option)}
                getOptionLabel={(option) => option}
              />

              <RHFAutocomplete
                name="applicationType"
                label="Application Type"
                fullWidth
                options={modernAgricultureToolApplications.map((option) => option)}
                getOptionLabel={(option) => option}
              />

              <RHFAutocomplete
                name="powerSource"
                label="Power Source"
                fullWidth
                options={powerSource.map((option) => option)}
                getOptionLabel={(option) => option}
              />

              <DatePicker
                views={['year']}
                label="Year of Manufacturing"
                value={values.yearManufactured}
                onChange={(newValue) => {
                  setValue('yearManufactured', newValue);
                }}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    margin: 'normal',
                  },
                }}
              />

              <RHFTextField rows={4} multiline name="description" label="Description" />

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
                    name="full"
                    maxSize={8388608}
                    onDrop={handleDropUserPicture}
                    onDelete={handleRemoveFile}
                  />
                )}
              </Box>

              <RHFTextField
                InputProps={{
                  startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                }}
                name="price"
                label="Price"
                type="number"
              />
            </Stack>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" size="large" loading={isSubmitting}>
                {!currentTool ? 'Add Tool Detials' : 'Save Tool Details'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}

ModernAgriEditForm.propTypes = {
  currentTool: PropTypes.object,
};
