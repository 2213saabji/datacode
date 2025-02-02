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

import { createIrrigation, UpdateIrrigation } from 'src/api/agriculture/irrigation';
import {
  TABS,
  nozzleType,
  controlSystem,
  systemCondition,
  irrigationSystems,
} from 'src/_mock/agriculture';

import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { RHFUpload, RHFTextField, RHFAutocomplete } from 'src/components/hook-form';
import { useAuthContext } from 'src/auth/hooks';

// ----------------------------------------------------------------------

export default function IrrigationEditForm({ currentIrrigation }) {
  // Required Variablesgthdtxtrrsedsr
  const { user } = useAuthContext()
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const irrigationSystemId = currentIrrigation?.data.irrigationSystemId;

  const [currentImageTab, setCurrentImageTab] = useState('frontImage');
  const sellerDetails =
    localStorage.getItem('sellerDetails') !== 'undefined' &&
    JSON.parse(localStorage.getItem('sellerDetails'));
  // Form Validation Schema
  const PartySchema = Yup.object().shape({
    type: Yup.string().required('Type is required'),
    capacityLitresPerHour: Yup.number().required('Capacity is required'),
    coverageAreaHectares: Yup.number().required('Condition is required'),
    yearInstalled: Yup.mixed().required('Installed Year is required'),
    condition: Yup.string().required('Condition is required'),
    price: Yup.number().required('Price is required'),
    brand: Yup.string().required('Brand is required'),
    controlSystem: Yup.string().required('Control System is required'),
    image1: Yup.string().required('Image is required'),
    image2: Yup.string().required('Image is required'),
    nozzleType: Yup.string().required('Nozzle Type is required'),
  });

  // Form Values
  const defaultValues = useMemo(
    () => ({
      sellerOwnerId: currentIrrigation?.data.sellerOwnerId || null,
      brand: currentIrrigation?.data.brand || '',
      type: currentIrrigation?.data.type || '',
      capacityLitresPerHour: currentIrrigation?.data.capacityLitresPerHour || null,
      coverageAreaHectares: currentIrrigation?.data.coverageAreaHectares || null,
      yearInstalled: currentIrrigation?.data.yearInstalled || null,
      condition: currentIrrigation?.data.condition || '',
      price: currentIrrigation?.data.price || null,
      controlSystem: currentIrrigation?.data.controlSystem || '',
      image1: currentIrrigation?.data?.imageUrl?.thumbnail || '',
      image2: currentIrrigation?.data?.imageUrl?.full || '',
      nozzleType: currentIrrigation?.data.nozzleType || '',
    }),
    [currentIrrigation]
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
    if (currentIrrigation) {
      reset(defaultValues);
    }
  }, [currentIrrigation, defaultValues, reset]);

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
        const imageUrl = response?.data?.data?.preview || '';

        if (imageUrl) {
          if (currentImageTab === 'frontImage') {
            setValue('image1', imageUrl);
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
        url: values.image1,
      };
      await deleteUserFileFromAWSS3(dataToSend)
        .then((data) => {
          setValue('image1', null);
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
  }, [setValue, currentImageTab, enqueueSnackbar, values.image1, values.image2]);

  // Function Call for New Ward Profile
  const onSubmit = handleSubmit(async (data) => {
    try {
      const updatedData = {
        ...data,
        sellerOwnerId: sellerDetails?.sellerOwnerId,
        imageUrl: {
          thumbnail: values.image1,
          full: values.image2,
        },
        state:user?.UserAddressesses?.[0]?.userState || 'NA',
        city:user?.UserAddressesses?.[0]?.userCity || 'NA',
        district:user?.UserAddressesses?.[0]?.userCity || 'NA',
        tehsil:user?.UserAddressesses?.[0]?.userCity || 'NA',
      };
      const response = await createIrrigation(updatedData);
      if (response) {
        enqueueSnackbar('Irrigation System created successfully', { variant: 'success' });
        navigate('/dashboard/FarmerService');
      } else {
        enqueueSnackbar('Failed to create Irrigation System', { variant: 'error' });
      }
    } catch (error) {
      console.error('Error submitting Irrigation System:', error);
      enqueueSnackbar('An error occurred while creating Irrigation System', { variant: 'error' });
    }
  });

  // Function Call for Updating Ward Profile
  const onSubmitUpdate = handleSubmit(async (data) => {
    try {
      const response = await UpdateIrrigation(irrigationSystemId, data);

      if (response) {
        enqueueSnackbar('Irrigation System updated successfully', { variant: 'success' });
        navigate(`/dashboard/FarmerService/Registration/${irrigationSystemId}/irrigation_tool`);
      } else {
        enqueueSnackbar('Failed to update Irrigation System', { variant: 'error' });
      }
    } catch (error) {
      // Handle errors here if necessary
      console.error('Error updating Irrigation System :', error);
      enqueueSnackbar('An error occurred while updating Irrigation System ', { variant: 'error' });
    }
  });

  return (
    <FormProvider methods={methods} onSubmit={currentIrrigation ? onSubmitUpdate : onSubmit}>
      <Grid container spacing={3}>
        <Grid xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={3} sx={{ p: 3 }}>
              <RHFAutocomplete
                name="type"
                label="Select Type"
                options={irrigationSystems.map((option) => option.type)}
                getOptionLabel={(option) => option}
              />

              <RHFTextField
                InputProps={{
                  endAdornment: <InputAdornment position="end">lt/hr</InputAdornment>,
                }}
                name="capacityLitresPerHour"
                label="Capacity"
                type="number"
              />

              <RHFTextField
                InputProps={{
                  endAdornment: <InputAdornment position="end">hectare</InputAdornment>,
                }}
                name="coverageAreaHectares"
                label="Coverage Area"
                type="number"
              />

              <RHFAutocomplete
                name="condition"
                label="Condition"
                fullWidth
                options={systemCondition.map((option) => option)}
                getOptionLabel={(option) => option}
              />
              <RHFTextField name="brand" label="Brand" />

              <RHFAutocomplete
                name="controlSystem"
                label="Control System"
                fullWidth
                options={controlSystem.map((option) => option)}
                getOptionLabel={(option) => option}
              />

              <RHFAutocomplete
                name="nozzleType"
                label="Nozzle Type"
                fullWidth
                options={nozzleType.map((option) => option)}
                getOptionLabel={(option) => option}
              />

              <DatePicker
                views={['year']}
                label="Year of Manufacturing"
                value={values.yearInstalled}
                onChange={(newValue) => {
                  setValue('yearInstalled', newValue);
                }}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    margin: 'normal',
                  },
                }}
              />

              <Stack spacing={1.5}>
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
                      name="image1"
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
              </Stack>

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
                {!currentIrrigation ? 'Add Detials' : 'Save Details'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}

IrrigationEditForm.propTypes = {
  currentIrrigation: PropTypes.object,
};
