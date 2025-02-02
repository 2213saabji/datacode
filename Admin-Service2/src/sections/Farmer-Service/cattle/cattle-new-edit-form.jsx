/* eslint-disable no-unused-vars */
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import imageCompression from 'browser-image-compression';
import { useMemo, useState, useEffect, useCallback } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import { CardContent } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useTheme } from '@mui/material/styles';
import CardHeader from '@mui/material/CardHeader';
import LoadingButton from '@mui/lab/LoadingButton';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { useResponsive } from 'src/hooks/use-responsive';

import {
  uploadUserFilesInAWSS3,
  deleteUserFileFromAWSS3,
  deleteUserFilesFromAWSS3,
} from 'src/utils/aws-s3-file-handler';

import { useAuthContext } from 'src/auth/hooks';
import { INDIAN_CITIES } from 'src/_mock/map/city';
import { statesOfIndia } from 'src/_mock/map/states';
import { cattleTypes, cattleBreeds } from 'src/_mock';
import { createCattle, createCattleDetail, UpdateCattle, UpdateCattleDetails } from 'src/api/agriculture/cattle';

import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { RHFUpload, RHFTextField, RHFAutocomplete } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export default function CattleForm({ currentCattle, currentCattleDetail }) {
  const theme = useTheme();
  console.log('cattle---->', currentCattleDetail)

  const currentCattleTypeId = currentCattle?.data?.cattleTypeId
  const currentCattleId = currentCattleDetail?.data?.cattleId

  const { user } = useAuthContext();

  const [uploadBtn, setUploadBtn] = useState(false);

  // const [cattleId, setCattleId] = useState(null);

  const [toggle, setToggle] = useState(false);

  const navigate = useNavigate();
  const mdUp = useResponsive('up', 'md');
  const { enqueueSnackbar } = useSnackbar();

  const [isHidden, setIsHidden] = useState(true);
  const [cattleType, setCattleType] = useState();

  let imageUrlSchema = Yup.array().notRequired(); // Default schema when isHidden is true

  if (!isHidden) {
    imageUrlSchema = Yup.array().min(1, 'Image is required');
  }

  // Form Validation Schema
  const CattleSchema = Yup.object().shape({
    type: Yup.string().required('Type is required'),
    breed: Yup.string().required('Breed is required'),
    age: Yup.number().required('Age is required'),
    weight: Yup.number().required('Weight is required'),
    healthStatus: Yup.string().required('Health status is required'),
    price: Yup.number().required('Price is required'),
    description: Yup.string().required('Description is required'),
    countOfCattle: Yup.number().required('Count is required'),
    imageUrl: imageUrlSchema,
  });

  const CattleDetaillsSchema = Yup.object().shape({
    state: Yup.string().required('State is required'),
    city: Yup.string().required('City is required'),
    district: Yup.string().required('District is required'),
    tehsil: Yup.string().required('Tehsil is required'),
    zipCode: Yup.string().required('Zip Code is required'),
    dateListed: Yup.date().required('Date Listed is required'),
  });

  // Form Values
  const defaultValues = useMemo(
    () => ({
      type: currentCattle?.data.type || '',
      breed: currentCattle?.data.breed || '',
      age: currentCattle?.data.age || '',
      weight: currentCattle?.data.weight || '',
      healthStatus: currentCattle?.data.healthStatus || '',
      price: currentCattle?.data.price || '',
      description: currentCattle?.data.description || '',
      countOfCattle: currentCattle?.data.countOfCattle || '',
      imageUrl: currentCattle?.data.imageUrl || [],
    }),
    [currentCattle]
  );

  const defaultDetailsValues = useMemo(
    () => ({
      state: currentCattleDetail?.data?.state || '',
      city: currentCattleDetail?.data?.city || '',
      district: currentCattleDetail?.data?.district || '',
      tehsil: currentCattleDetail?.data?.tehsil || '',
      zipCode: currentCattleDetail?.data?.zipCode || "",
      dateListed: currentCattleDetail?.data?.dateListed || '',
    }),
    [currentCattleDetail]
  );

  const detailsMethods = useForm({
    resolver: yupResolver(CattleDetaillsSchema),
    defaultDetailsValues,
  });

  const {
    reset: resetDetails,
    setValue: setDetailsValue,
    handleSubmit: handleSubmitDetails,
    watch: detailsWatch,
    // formState: { isSubmitting },
  } = detailsMethods;

  const value = detailsWatch();

  useEffect(() => {
    if (currentCattleDetail) {
      resetDetails(defaultDetailsValues);
    }
  }, [currentCattleDetail, defaultDetailsValues, resetDetails]);

  // Form Method
  const methods = useForm({
    resolver: yupResolver(CattleSchema),
    defaultValues,
  });
  const {
    reset,
    setValue,
    handleSubmit,
    watch,
    // formState: { isSubmitting },
  } = methods;

  const values = watch();

  useEffect(() => {
    if (currentCattle) {
      reset(defaultValues);
    }
  }, [currentCattle, defaultValues, reset]);

  // Handle Multiple Image Upload
  const handleDropMultiFile = useCallback(
    (acceptedFiles) => {
      const files = values.imageUrl || [];

      const newFiles = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );

      setValue('imageUrl', [...files, ...newFiles], {
        shouldValidate: true,
      });
    },
    [setValue, values.imageUrl]
  );

  const uploadImages = async (files) => {
    try {
      const compressedFilesPromises = files.map(async (file) => {
        const compressedFile = await imageCompression(file, {
          maxSizeMB: 0.5, // Adjust maximum size to 500KB
          maxWidthOrHeight: 800, // Adjust maximum width or height as needed
        });

        return compressedFile;
      });

      const compressedFiles = await Promise.all(compressedFilesPromises);

      const formData = new FormData();
      compressedFiles.forEach((compressedFile, index) => {
        const blob = new Blob([compressedFile], { type: compressedFile.type });
        const newFile = new File([blob], compressedFile.name, { type: compressedFile.type });
        formData.append('images', newFile);
      });

      const response = await uploadUserFilesInAWSS3(formData);
      const imageUrls =
        response.data && response.data.data && response.data.data.length
          ? response?.data?.data
          : [];

      if (imageUrls.length > 0) {
        setValue('imageUrl', imageUrls);
        setUploadBtn(true);
        enqueueSnackbar('Uploaded successfully', { variant: 'success' });
      } else {
        console.error('Error in uploading files:', response);
        enqueueSnackbar('Error while uploading', { variant: 'error' });
      }
    } catch (error) {
      console.error('Error compressing/uploading images:', error);
      enqueueSnackbar('Error while compressing/uploading images', { variant: 'error' });
    }
  };

  const deleteImage = async (removedFile) => {
    const removedFileIndex = values.imageUrl.findIndex(
      (file) => file.name === removedFile.name && file.preview === removedFile.preview
    );

    if (values.imageUrl.length > 0) {
      const selectedImage = values.imageUrl.filter((item) => removedFile.name === item.name);

      const dataToSend = { url: selectedImage[0].preview };
      await deleteUserFilesFromAWSS3(dataToSend)
        .then((data) => {
          const updatedImageUrl = values.imageUrl.filter((item) => removedFile.name !== item.name);
          setValue('imageUrl', updatedImageUrl);
          setValue(
            'imageUrl',
            values.imageUrl.filter((_, index) => index !== removedFileIndex),
            { shouldValidate: true }
          );

          enqueueSnackbar('Deleted successfully', { variant: 'success' });
        })
        .catch((err) => {
          console.error('Error in deleting files:', err);
          enqueueSnackbar('Error while deleting', { variant: 'error' });
        });
    } else {
      setValue(
        'imageUrl',
        values.imageUrl && values.imageUrl?.filter((file) => file !== removedFile),
        { shouldValidate: true }
      );
    }

    if (values.imageUrl.length === 1) {
      setUploadBtn(false); // Set uploadBtn to false when there are no more images to remove
    }
  };

  const deleteImages = async () => {
    const urlArr = [];
    values.imageUrl.forEach((file) => {
      const urlPreview = file.preview;
      urlArr.push(urlPreview);
    });

    const dataToSend = { urls: urlArr };
    await deleteUserFileFromAWSS3(dataToSend)
      .then((data) => {
        setValue('imageUrl', [], { shouldValidate: true });
        setUploadBtn(false);
        setValue('imageUrl', []);
        enqueueSnackbar('Deleted successfully', { variant: 'success' });
      })
      .catch((err) => {
        console.error('Error in deleting files:', err);
        enqueueSnackbar('Error while deleting', { variant: 'error' });
      });
  };

  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = await createCattle(data);
      if (response) {
        enqueueSnackbar('Cattle Type created successfully', { variant: 'success' });
        setCattleType(response)
        setToggle(true)
      } else {
        enqueueSnackbar('Failed to create Cattle Type', { variant: 'error' });
      }
    } catch (error) {
      console.error('Error submitting Cattle Type:', error);
      enqueueSnackbar('An error occurred while creating Cattle Type', { variant: 'error' });
    }
  });

  // Function Call for Updating Cattle
  const onSubmitUpdate = handleSubmit(async (data) => {
    try {

      const response = await UpdateCattle(currentCattleTypeId, data);

      if (response) {
        enqueueSnackbar('Cattle Type updated successfully', { variant: 'success' });
        setToggle(true)

      } else {
        enqueueSnackbar('Failed to update Cattle Type', { variant: 'error' });
      }
    } catch (error) {
      // Handle errors here if necessary
      console.error('Error updating Cattle Type :', error);
      enqueueSnackbar('An error occurred while updating Cattle Type ', { variant: 'error' });
    }
  });

  const onSubmitCattleDetails = handleSubmitDetails(async (data) => {
    try {
      const updatedData = {
        ...data,
        cattleTypeId: cattleType?.data?.cattleTypeId,
        userId: user?.userId,
      };
      const response = await createCattleDetail(updatedData);

      if (response) {
        enqueueSnackbar('Cattle created successfully', { variant: 'success' });
        // console.log('----->', response)
        localStorage.setItem('cattleOwnerUserId', response.data.userId)
        localStorage.setItem('currCattleTab', 'myList')
        navigate('/dashboard/FarmerService');
      } else {
        enqueueSnackbar('Failed to create Cattle', { variant: 'error' });
      }
    } catch (error) {
      // Handle errors here if necessary
      console.error('Error submitting Cattle:', error);
      enqueueSnackbar('An error occurred while creating Cattle', { variant: 'error' });
    }
  });

  const onSubmitUpdateDetails = handleSubmitDetails(async (data) => {
    try {

      const response = await UpdateCattleDetails(currentCattleId, data);

      if (response) {
        enqueueSnackbar('Cattle Details updated successfully', { variant: 'success' });
        navigate('/dashboard/FarmerService');
      } else {
        enqueueSnackbar('Failed to update Cattle Details', { variant: 'error' });
      }
    } catch (error) {
      // Handle errors here if necessary
      console.error('Error updating Cattle Details :', error);
      enqueueSnackbar('An error occurred while updating Cattle Details ', { variant: 'error' });
    }
  });

  return (
    <>
      {
        !toggle &&
        <FormProvider methods={methods} onSubmit={currentCattle ? onSubmitUpdate : onSubmit}>
          <Grid Grid container spacing={3} >
            <Grid xs={12} md={8}>
              <Card>
                {!mdUp && <CardHeader title="Details" />}

                <Stack spacing={3} sx={{ p: 3 }}>

                  <RHFAutocomplete
                    name="type"
                    label="Select Type"
                    options={cattleTypes}
                    getOptionLabel={(option) => option}
                  />
                  <RHFAutocomplete
                    name="breed"
                    label="Select Breed"
                    options={cattleBreeds}
                    getOptionLabel={(option) => option}
                  />

                  <RHFTextField
                    name="age"
                    label="Age"
                    type="number"
                    InputLabelProps={{
                      style: {
                        color: theme.palette.mode === 'light' ? 'black' : 'white',
                      },
                    }}
                  />

                  <RHFTextField
                    name="weight"
                    label="Weight"
                    type="number"
                    InputLabelProps={{
                      style: {
                        color: theme.palette.mode === 'light' ? 'black' : 'white',
                      },
                    }}
                  />

                  <RHFTextField
                    name="healthStatus"
                    label="Health Status"
                    InputLabelProps={{
                      style: {
                        color: theme.palette.mode === 'light' ? 'black' : 'white',
                      },
                    }}
                  />

                  <RHFTextField
                    name="price"
                    label="Price"
                    type="number"
                    InputLabelProps={{
                      style: {
                        color: theme.palette.mode === 'light' ? 'black' : 'white',
                      },
                    }}
                  />

                  <Stack spacing={1.5}>
                    <RHFTextField name="description" fullWidth label="Description" multiline rows={4}
                      InputLabelProps={{
                        style: {
                          color: theme.palette.mode === 'light' ? 'black' : 'white',
                        },
                      }}
                    />
                  </Stack>

                  <RHFTextField
                    name="countOfCattle"
                    label="Count of Cattle"
                    type="number"
                    InputLabelProps={{
                      style: {
                        color: theme.palette.mode === 'light' ? 'black' : 'white',
                      },
                    }}
                  />

                  <Card sx={{}}>
                    <CardHeader title="Images" />
                    <CardContent>
                      <RHFUpload
                        multiple
                        thumbnail
                        disabled={uploadBtn}
                        name="imageUrl"
                        maxSize={8388608}
                        onDrop={handleDropMultiFile}
                        onRemove={(removedFile) => {
                          deleteImage(removedFile);
                        }}
                        onRemoveAll={() => {
                          deleteImages();
                        }}
                        onUpload={() => { uploadImages(values.imageUrl) }}
                      />
                    </CardContent>
                  </Card>
                </Stack>
                <Grid xs={12} md={12} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', p: 2.5, }}>
                  <LoadingButton type="submit" variant="contained" size="large" >
                    {currentCattle ? "Update" : "Next"}
                  </LoadingButton>
                </Grid>
              </Card>
            </Grid>

          </Grid >
        </FormProvider >
      }
      {toggle &&

        <FormProvider methods={detailsMethods} onSubmit={currentCattleDetail ? onSubmitUpdateDetails : onSubmitCattleDetails}>
          <Grid container spacing={3}>
            <Grid xs={12} md={8}>
              <Card>
                {!mdUp && <CardHeader title="Details" />}

                <Stack spacing={3} sx={{ p: 3 }}>

                  <RHFAutocomplete
                    name="state"
                    label="Select State"
                    options={statesOfIndia}
                    getOptionLabel={(option) => option}
                  />
                  <RHFTextField
                    name="district"
                    label="Enter district"
                  />

                  <RHFTextField
                    name="city"
                    label="Enter City"
                  // options={INDIAN_CITIES}
                  // getOptionLabel={(option) => option}
                  />

                  <RHFTextField
                    name="tehsil"
                    label="Tehsil"
                    InputLabelProps={{
                      style: {
                        color: theme.palette.mode === 'light' ? 'black' : 'white',
                      },
                    }}
                  />

                  <RHFTextField
                    name="zipCode"
                    label="Zip Code"
                    InputLabelProps={{
                      style: {
                        color: theme.palette.mode === 'light' ? 'black' : 'white',
                      },
                    }}
                  />

                  <DatePicker
                    views={['year', 'month', 'day']}
                    label="Date Listed"
                    value={value.yearManufactured}
                    onChange={(newValue) => {
                      setDetailsValue('dateListed', newValue);
                    }}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        margin: 'normal',
                      },
                    }}
                  />
                </Stack>
                <Grid xs={12} md={12} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', p: 2.5, }}>
                  <LoadingButton type="submit" variant="contained" size="large" >
                    {currentCattleDetail ? 'Update Cattle' : 'Create Cattle'}
                  </LoadingButton>
                </Grid>
              </Card>
            </Grid>

          </Grid>
        </FormProvider>


      }
    </>
  );
}

CattleForm.propTypes = {
  currentCattle: PropTypes.object,
  currentCattleDetail: PropTypes.object
};