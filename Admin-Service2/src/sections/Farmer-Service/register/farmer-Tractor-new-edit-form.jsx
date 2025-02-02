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

import { tractorBrand, tractorTireTypes } from 'src/_mock';
import { createTractor, UpdateTractor } from 'src/api/agriculture/tractor';

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

export default function FarmerTractorNewEditForm({ currentTractor }) {
  // Required Variablesgthdtxtrrsedsr
  const { user } = useAuthContext()
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const sellerDetails =
    localStorage.getItem('sellerDetails') !== 'undefined' &&
    JSON.parse(localStorage.getItem('sellerDetails'));

  const tractorId = currentTractor?.data.tractorId;

  const [tractorModel, setTractorModel] = useState([]);

  const [currentImageTab, setCurrentImageTab] = useState('frontImage');
  const brandOptions = Object.keys(tractorBrand).map((option) => option);

  // Form Validation Schema
  const PartySchema = Yup.object().shape({
    brand: Yup.string().required('Brand name is required'),
    model: Yup.string().required('Model Name is required'),
    horsepower: Yup.number().required('Detail is required'),
    yearManufactured: Yup.mixed().required('Year of Manufacture is required'),
    condition: Yup.string().required('Detail is required'),
    price: Yup.number().required('Price is required'),
    engineType: Yup.string().required('Engine Type is required'),
    fuelCapacityLitres: Yup.number().required('Detail is required'),
    transmissionType: Yup.string().required('Detail is required'),
    tireType: Yup.string().required('Detail is required'),
    weightKg: Yup.string().required('Detail is required'),
    frontImageUrl: Yup.string().required('Image is required'),
    sideImageUrl: Yup.string().required('Image is required'),
  });

  // Form Values
  const defaultValues = useMemo(
    () => ({
      sellerOwnerId: currentTractor?.data.sellerOwnerId || null,
      brand: currentTractor?.data.brand || '',
      model: currentTractor?.data.model || '',
      horsepower: currentTractor?.data.horsepower || null,
      yearManufactured: currentTractor?.data.yearManufactured || null,
      condition: currentTractor?.data.condition || '',
      price: currentTractor?.data.price || null,
      engineType: currentTractor?.data.engineType || '',
      fuelCapacityLitres: currentTractor?.data.fuelCapacityLitres || null,
      transmissionType: currentTractor?.data.transmissionType || '',
      tireType: currentTractor?.data.tireType || '',
      weightKg: currentTractor?.data.weightKg || null,
      frontImageUrl: currentTractor?.data?.imageUrl?.frontView || '',
      sideImageUrl: currentTractor?.data?.imageUrl?.sideView || '',
    }),
    [currentTractor]
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
    if (currentTractor) {
      reset(defaultValues);
    }
  }, [currentTractor, defaultValues, reset]);

  useEffect(() => {
    setValue('model', '');
    if (values.brand) setTractorModel(tractorBrand[values.brand]);
  }, [values.brand, setValue]);

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
            setValue('frontImageUrl', imageUrl);
            enqueueSnackbar(' Image Upload Successfully', { variant: 'success' });
          } else if (currentImageTab === 'sideImage') {
            setValue('sideImageUrl', imageUrl);
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

  const handleDropTractorPicture = useCallback(
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
        url: values.frontImageUrl,
      };
      await deleteUserFileFromAWSS3(dataToSend)
        .then((data) => {
          setValue('frontImageUrl', null);
          // console.log(data);
          enqueueSnackbar('Deleted successfully', { variant: 'success' });
        })
        .catch((err) => {
          console.error('Error in deleting files:', err);
          enqueueSnackbar('Error while deleting', { variant: 'error' });
        });
    } else {
      const dataToSend = {
        url: values.sideImageUrl,
      };
      await deleteUserFileFromAWSS3(dataToSend)
        .then((data) => {
          setValue('sideImageUrl', null);
          // console.log(data);
          enqueueSnackbar('Deleted successfully', { variant: 'success' });
        })
        .catch((err) => {
          console.error('Error in deleting files:', err);
          enqueueSnackbar('Error while deleting', { variant: 'error' });
        });
    }
  }, [setValue, currentImageTab, enqueueSnackbar, values.frontImageUrl, values.sideImageUrl]);

  // Function Call for New Ward Profile
  const onSubmit = handleSubmit(async (data) => {
    try {
      const updatedData = {
        ...data,
        sellerOwnerId: sellerDetails?.sellerOwnerId,
        imageUrl: {
          frontView: data.frontImageUrl,
          sideView: data.sideImageUrl,
        },
        state:user?.UserAddressesses?.[0]?.userState || 'NA',
        city:user?.UserAddressesses?.[0]?.userCity || 'NA',
        district:user?.UserAddressesses?.[0]?.userCity || 'NA',
        tehsil:user?.UserAddressesses?.[0]?.userCity || 'NA',
      };
      const response = await createTractor(updatedData);
      if (response) {
        enqueueSnackbar('Tractor added successfully', { variant: 'success' });
        navigate('/dashboard/FarmerService');
      } else {
        enqueueSnackbar('Failed to add tractor', { variant: 'error' });
      }
    } catch (error) {
      console.error('Error submitting tractor:', error);
      enqueueSnackbar('An error occurred while adding tractor', { variant: 'error' });
    }
  });

  // Function Call for Updating Ward Profile
  const onSubmitUpdate = handleSubmit(async (data) => {
    try {
      const response = await UpdateTractor(tractorId, data);

      if (response) {
        enqueueSnackbar('Tractor details updated successfully', { variant: 'success' });
        navigate(`/dashboard/FarmerService/Registration/${tractorId}/tractor`);
      } else {
        enqueueSnackbar('Failed to update tractor details', { variant: 'error' });
      }
    } catch (error) {
      // Handle errors here if necessary
      console.error('Error updating party :', error);
      enqueueSnackbar('An error occurred while updating tractor details ', { variant: 'error' });
    }
  });

  return (
    <FormProvider methods={methods} onSubmit={currentTractor ? onSubmitUpdate : onSubmit}>
      <Grid container spacing={3}>
        <Grid xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={3} sx={{ p: 3 }}>
              <RHFAutocomplete
                name="brand"
                label="Select Brand"
                options={brandOptions}
                getOptionLabel={(option) => option}
              />

              <RHFAutocomplete
                name="model"
                label="Select Model"
                options={tractorModel}
                getOptionLabel={(option) => option}
              />

              <RHFTextField
                InputProps={{
                  endAdornment: <InputAdornment position="end">hp</InputAdornment>,
                }}
                name="horsepower"
                label="Horse Power"
                type="number"
              />

              <RHFTextField
                InputProps={{
                  endAdornment: <InputAdornment position="end">ltr</InputAdornment>,
                }}
                name="fuelCapacityLitres"
                label="Fule Capacity"
                type="number"
              />

              <RHFTextField
                InputProps={{
                  endAdornment: <InputAdornment position="end">Kg</InputAdornment>,
                }}
                name="weightKg"
                label="Weight"
                type="number"
              />

              <RHFAutocomplete
                name="condition"
                label="Condition"
                fullWidth
                options={['New', 'Used', 'Refurbished'].map((option) => option)}
                getOptionLabel={(option) => option}
              />

              <RHFAutocomplete
                name="engineType"
                label="Engine Type"
                fullWidth
                options={['Diesel', 'Gasoline', 'Electric'].map((option) => option)}
                getOptionLabel={(option) => option}
              />

              <RHFAutocomplete
                name="transmissionType"
                label="Transmission Type"
                fullWidth
                options={['Manual', 'Automatic'].map((option) => option)}
                getOptionLabel={(option) => option}
              />

              <RHFAutocomplete
                name="tireType"
                label="Tire Type"
                fullWidth
                options={tractorTireTypes.map((option) => option)}
                getOptionLabel={(option) => option}
              />

              <DatePicker
                views={['year']}
                label="Manufactured Year"
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
                    name="frontImageUrl"
                    maxSize={8388608}
                    onDrop={handleDropTractorPicture}
                    onDelete={handleRemoveFile}
                  />
                )}
                {currentImageTab === 'sideImage' && (
                  <RHFUpload
                    name="sideImageUrl"
                    maxSize={8388608}
                    onDrop={handleDropTractorPicture}
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
                {!currentTractor ? 'Add Tractor' : 'Save Tractor'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}

FarmerTractorNewEditForm.propTypes = {
  currentTractor: PropTypes.object,
};
