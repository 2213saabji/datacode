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
import LoadingButton from '@mui/lab/LoadingButton';
import { Tab, Tabs, tabsClasses } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { uploadUserFileInAWSS3, deleteUserFileFromAWSS3 } from 'src/utils/aws-s3-file-handler';

import { createcultivation, Updatecultivation } from 'src/api/agriculture/cultivation';
import {
  TABS,
  systemCondition,
  cultivationEquipSize,
  cultivationEquipmentTypes,
} from 'src/_mock/agriculture';

import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { RHFUpload, RHFTextField, RHFAutocomplete } from 'src/components/hook-form';
import { useAuthContext } from 'src/auth/hooks';

// ----------------------------------------------------------------------

export default function CultivationEquipEditForm({ currentCultivation }) {
  // Required Variablesgthdtxtrrsedsr
  const { user } = useAuthContext()
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const cultivationEquipmentId = currentCultivation?.data.cultivationEquipmentId;

  const sellerDetails =
    localStorage.getItem('sellerDetails') !== 'undefined' &&
    JSON.parse(localStorage.getItem('sellerDetails'));

  const [currentImageTab, setCurrentImageTab] = useState('frontImage');

  // Form Validation Schema
  const PartySchema = Yup.object().shape({
    type: Yup.string().required('Type is required'),
    size: Yup.string().required('Description is required'),
    yearManufactured: Yup.mixed().required('Manufactured Year is required'),
    condition: Yup.string().required('Condition is required'),
    price: Yup.number().required('Price is required'),
    brand: Yup.string().required('Brand is required'),
    workingWidthMeters: Yup.number().required('Working Width Meters is required'),
    image1: Yup.string().required('Image is required'),
    image2: Yup.string().required('Image is required'),
    depthCm: Yup.number().required('Depth is required'),
  });

  // Form Values
  const defaultValues = useMemo(
    () => ({
      sellerOwnerId: currentCultivation?.data.sellerOwnerId || null,
      type: currentCultivation?.data.type || '',
      size: currentCultivation?.data.size || '',
      yearManufactured: currentCultivation?.data.yearManufactured || null,
      condition: currentCultivation?.data.condition || '',
      price: currentCultivation?.data.price || null,
      brand: currentCultivation?.data.brand || '',
      workingWidthMeters: currentCultivation?.data.workingWidthMeters || null,
      image1: currentCultivation?.data?.imageUrl?.image1 || '',
      image2: currentCultivation?.data?.imageUrl?.image2 || '',
      depthCm: currentCultivation?.data.depthCm || null,
    }),
    [currentCultivation]
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
    if (currentCultivation) {
      reset(defaultValues);
    }
  }, [currentCultivation, defaultValues, reset]);

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
        sellerOwnerId: sellerDetails.sellerOwnerId,
        imageUrl: {
          image1: values.image1,
          image2: values.image2,
        },
        state:user?.UserAddressesses?.[0]?.userState || 'NA',
        city:user?.UserAddressesses?.[0]?.userCity || 'NA',
        district:user?.UserAddressesses?.[0]?.userCity || 'NA',
        tehsil:user?.UserAddressesses?.[0]?.userCity || 'NA',
      };
      const response = await createcultivation(updatedData);
      if (response) {
        enqueueSnackbar('Cultivation equipment added successfully', { variant: 'success' });
        navigate('/dashboard/FarmerService');
      } else {
        enqueueSnackbar('Failed to add Cultivation equipment', { variant: 'error' });
      }
    } catch (error) {
      console.error('Error submitting Cultivation equipment:', error);
      enqueueSnackbar('An error occurred while creating Cultivation equipment', {
        variant: 'error',
      });
    }
  });

  // Function Call for Updating Ward Profile
  const onSubmitUpdate = handleSubmit(async (data) => {
    try {
      const response = await Updatecultivation(cultivationEquipmentId, data);

      if (response) {
        enqueueSnackbar('Cultivation equipment updated successfully', { variant: 'success' });
        navigate(
          `/dashboard/FarmerService/Registration/${cultivationEquipmentId}/cultivation_tool`
        );
      } else {
        enqueueSnackbar('Failed to update Cultivation equipment', { variant: 'error' });
      }
    } catch (error) {
      // Handle errors here if necessary
      console.error('Error updating Cultivation equipment :', error);
      enqueueSnackbar('An error occurred while updating Cultivation equipment ', {
        variant: 'error',
      });
    }
  });

  return (
    <FormProvider methods={methods} onSubmit={currentCultivation ? onSubmitUpdate : onSubmit}>
      <Grid container spacing={3}>
        <Grid xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={3} sx={{ p: 3 }}>
              <RHFAutocomplete
                name="type"
                label="Select Type"
                options={cultivationEquipmentTypes.map((option) => option)}
                getOptionLabel={(option) => option}
              />

              <RHFAutocomplete
                name="size"
                label="Select Size"
                options={cultivationEquipSize.map((option) => option)}
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

              <RHFAutocomplete
                name="condition"
                label="Condition"
                fullWidth
                options={systemCondition.map((option) => option)}
                getOptionLabel={(option) => option}
              />

              <RHFTextField name="brand" label="Brand" />

              <RHFTextField
                InputProps={{
                  endAdornment: <InputAdornment position="end">m</InputAdornment>,
                }}
                name="workingWidthMeters"
                label="Working Width"
                type="number"
              />

              <RHFTextField
                InputProps={{
                  endAdornment: <InputAdornment position="end">cm</InputAdornment>,
                }}
                name="depthCm"
                label="Depth"
                type="number"
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
                {!currentCultivation ? 'Submit' : 'Update'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}

CultivationEquipEditForm.propTypes = {
  currentCultivation: PropTypes.object,
};
