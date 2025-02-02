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

import { TABS } from 'src/_mock/agriculture';
import { combineHarvesterBrand } from 'src/_mock';
import {
  createCombineHarvester,
  UpdateCombineHarvester,
} from 'src/api/agriculture/combineharvesters';

import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { RHFUpload, RHFTextField, RHFAutocomplete } from 'src/components/hook-form';
import { useAuthContext } from 'src/auth/hooks';
// ----------------------------------------------------------------------

export default function HarvestersNewEditForm({ currentHarvester }) {
  // Required Variablesgthdtxtrrsedsr
  const { user } = useAuthContext()
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const combineHarvesterId = currentHarvester?.data.combineHarvesterId;
  const [harvestorModel, setHarvestor] = useState([]);
  const CombineHarvesterBrand = Object.keys(combineHarvesterBrand).map((option) => option);
  // fetching the election List
  const [currentImageTab, setCurrentImageTab] = useState('frontImage');
  const sellerDetails =
    localStorage.getItem('sellerDetails') !== 'undefined' &&
    JSON.parse(localStorage.getItem('sellerDetails'));

  // Form Validation Schema
  const PartySchema = Yup.object().shape({
    brand: Yup.string().required('Brand is required'),
    model: Yup.string().required('Model Name is required'),
    cuttingWidthMeters: Yup.number().required('Width is required'),
    yearManufactured: Yup.mixed().required('Manufacturing Year is required'),
    condition: Yup.string().required('Condition is required'),
    price: Yup.number().required('Price is required'),
    grainTankCapacityLitres: Yup.number().required('Capacity is required'),
    enginePowerHP: Yup.number().required('Engine Power is required'),
    fuelType: Yup.string().required('Fuel Type is required'),
    image1: Yup.mixed().required('Image is required'),
    image2: Yup.mixed().required('Image is required'),
    weightKg: Yup.number().required('Weight is required'),
  });

  // Form Values
  const defaultValues = useMemo(
    () => ({
      sellerOwnerId: currentHarvester?.data.sellerOwnerId || null,
      brand: currentHarvester?.data.brand || '',
      model: currentHarvester?.data.model || '',
      cuttingWidthMeters: currentHarvester?.data.cuttingWidthMeters || '',
      yearManufactured: currentHarvester?.data.yearManufactured || null,
      condition: currentHarvester?.data.condition || '',
      price: currentHarvester?.data.price || null,
      grainTankCapacityLitres: currentHarvester?.data.grainTankCapacityLitres || null,
      enginePowerHP: currentHarvester?.data.enginePowerHP || null,
      fuelType: currentHarvester?.data.fuelType || '',
      image1: currentHarvester?.data?.imageUrl?.thumbnail || null,
      image2: currentHarvester?.data?.imageUrl?.full || null,
      weightKg: currentHarvester?.data.weightKg || null,
    }),
    [currentHarvester]
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
    if (currentHarvester) {
      reset(defaultValues);
    }
  }, [currentHarvester, defaultValues, reset]);

  useEffect(() => {
    setValue('model', '');
    if (values.brand) setHarvestor(combineHarvesterBrand[values.brand]);
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
      const response = await createCombineHarvester(updatedData);
      if (response) {
        enqueueSnackbar('Harvester created successfully', { variant: 'success' });
        navigate('/dashboard/FarmerService');
      } else {
        enqueueSnackbar('Failed to create Harvester', { variant: 'error' });
      }
    } catch (error) {
      console.error('Error submitting Harvester:', error);
      enqueueSnackbar('An error occurred while creating Harvester', { variant: 'error' });
    }
  });

  // Function Call for Updating Ward Profile
  const onSubmitUpdate = handleSubmit(async (data) => {
    try {
      // const updatedData = {
      //   ...data,
      //   imageUrl: {
      //     thumbnail: currentHarvester?.data?.imageUrl?.thumbnail,
      //     full: currentHarvester?.data?.imageUrl?.full,
      //   }
      // }
      const response = await UpdateCombineHarvester(combineHarvesterId, data);

      if (response) {
        enqueueSnackbar('Harvester updated successfully', { variant: 'success' });
        navigate(`/dashboard/FarmerService/Registration/${combineHarvesterId}/combine_harvester`);
      } else {
        enqueueSnackbar('Failed to update Harvester', { variant: 'error' });
      }
    } catch (error) {
      // Handle errors here if necessary
      console.error('Error updating Harvester :', error);
      enqueueSnackbar('An error occurred while updating Harvester ', { variant: 'error' });
    }
  });

  return (
    <FormProvider methods={methods} onSubmit={currentHarvester ? onSubmitUpdate : onSubmit}>
      <Grid container spacing={3}>
        <Grid xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={3} sx={{ p: 3 }}>
              <RHFAutocomplete
                name="brand"
                label="Select Brand"
                options={CombineHarvesterBrand}
                getOptionLabel={(option) => option}
              />

              <RHFAutocomplete
                name="model"
                label="Model Name"
                fullWidth
                options={harvestorModel}
                getOptionLabel={(option) => option}
              />

              <RHFTextField
                InputProps={{
                  endAdornment: <InputAdornment position="emd">m</InputAdornment>,
                }}
                name="cuttingWidthMeters"
                label="Cutting Width"
                type="number"
              />

              <RHFAutocomplete
                name="condition"
                label="Condition"
                fullWidth
                options={['New', 'Used', 'Refurbished'].map((option) => option)}
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

              <RHFTextField
                InputProps={{
                  endAdornment: <InputAdornment position="end">lt</InputAdornment>,
                }}
                name="grainTankCapacityLitres"
                label="Grain Tank Capacity"
                type="number"
              />
              <RHFTextField
                InputProps={{
                  endAdornment: <InputAdornment position="end">hp</InputAdornment>,
                }}
                name="enginePowerHP"
                label="Horse Power"
                type="number"
              />

              <RHFAutocomplete
                name="fuelType"
                label="Fuel Type"
                fullWidth
                options={['Diesel', 'Gasoline', 'Electric'].map((option) => option)}
                getOptionLabel={(option) => option}
              />

              <RHFTextField
                InputProps={{
                  endAdornment: <InputAdornment position="end">Kg</InputAdornment>,
                }}
                name="weightKg"
                label="Weight"
                type="number"
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
                {!currentHarvester ? 'Add Harvester Details' : 'Save  Harvester Details'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}

HarvestersNewEditForm.propTypes = {
  currentHarvester: PropTypes.object,
};
