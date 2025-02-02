/* eslint-disable no-unused-vars */
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useMemo, useState, useEffect, useCallback } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
// import { ATTPL_TMS_HOST_API } from 'src/config-global';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import { TextField } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Unstable_Grid2';
import LoadingButton from '@mui/lab/LoadingButton';
// import { CardHeader,CardContent } from '@mui/material';

import { VEHICLE_OPTIONS } from 'src/_mock/_vehicle';
import { createVehicleProfile, updateVehicleProfile } from 'src/api/vehicle';

import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { RHFTextField, RHFAutocomplete } from 'src/components/hook-form';
import { deleteFileFromAWSS3, uploadclaimFileInAWSS3 } from 'src/utils/aws-s3-file-handler';
import imageCompression from 'browser-image-compression';
import VehicleFields from './vehicle-form';

// ----------------------------------------------------------------------

export default function VehicleNewEditForm({ currentVehicle }) {
  const theme = useTheme();
  const navigate = useNavigate();
  // const [sigType, setSigType] = useState(null);
  const [show, setShow] = useState({
    Profile: true,
  });
  const defaultDocs = {
    rcPdf: currentVehicle?.data.rcPdf || null,
    insurancePdf: currentVehicle?.data.insurancePdf || null,
    vehicleImageUrl: currentVehicle?.data.vehicleImageUrl || null,
  }

  const vehicleId = currentVehicle?.data.vehicleId;
  const [docs, setDocs] = useState(defaultDocs);

  const { enqueueSnackbar } = useSnackbar();

  console.log("current vehicle is--->>>", currentVehicle)

  // Schema

  const ProfileSchema = Yup.object().shape({
    vehicleName: Yup.string().required('Vehicle Name is required'),
    model: Yup.string().required('Model is required'),
    year: Yup.number().required('Year is required'),
    chassisNumber: Yup.string().required('Chassis Number is required'),
    vehicleType: Yup.string().required('Vehicle Type is required'),
    color: Yup.string().required('Color is required'),
    manufacturingYear: Yup.string().required('Manufacturing Year is required'),
    engineNumber: Yup.string().required('Engine Number is required'),
    fuelType: Yup.string().required('Fuel Type is required'),
    grossVehicleWeight: Yup.string().required('Gross Vehicle Weight is required'),
    registrationNumber: Yup.string().required('Registration Number is required'),
    maintenanceHistory: Yup.string().required('Maintenance History is required'),
    vehicleCondition: Yup.string().required('Vehicle Condition is required'),
    availability: Yup.string().required('Availability is required'),
    gpsTracking: Yup.string().required('GPS Tracking is required'),
    insuranceExpiryDate: Yup.string().required('Insurance Expiry Date is required'),
    additionalEquipment: Yup.string(),
    vehicleImageUrl: Yup.mixed().required('Vehicle image is required'),
    insurancePdf: Yup.mixed().required('Insurance is required'),
    rcPdf: Yup.mixed().required('Rc is required'),
  });

  // Identity Values

  const defaultValues = useMemo(
    () => ({
      vehicleName: currentVehicle?.data.vehicleName || '',
      model: currentVehicle?.data.model || '',
      year: currentVehicle?.data.year || '',
      chassisNumber: `${currentVehicle?.data.chassisNumber || ''}`,
      vehicleType: currentVehicle?.data.vehicleType || '',
      color: currentVehicle?.data.color || '',
      manufacturingYear: currentVehicle?.data.manufacturingYear || '',
      engineNumber: currentVehicle?.data.engineNumber || '',
      fuelType: currentVehicle?.data.fuelType || '',
      grossVehicleWeight: currentVehicle?.data.grossVehicleWeight || '',
      registrationNumber: currentVehicle?.data.registrationNumber || '',
      maintenanceHistory: currentVehicle?.data.maintenanceHistory || '',
      vehicleCondition: currentVehicle?.data.vehicleCondition || '',
      availability: currentVehicle?.data.availability || null,
      gpsTracking: currentVehicle?.data.gpsTracking || null,
      insuranceExpiryDate: currentVehicle?.data.insuranceExpiryDate || '',
      additionalEquipment: currentVehicle?.data.additionalEquipment || '',
      vehicleImageUrl: currentVehicle?.data.vehicleImageUrl || null,
      rcPdf: currentVehicle?.data.rcPdf || null,
      insurancePdf: currentVehicle?.data.insurancePdf || null,
    }),
    [currentVehicle]
  );

  // Methods

  const methodsProfile = useForm({
    resolver: yupResolver(ProfileSchema),
    defaultValues,
  });

  // For profile form
  const { handleSubmit: handleSubmitProfile, reset: profileReset, setValue, getValues, watch, formState: { errors } } = methodsProfile;

  const value = watch();

  useEffect(() => {
    if (currentVehicle) {
      profileReset(defaultValues);
    }
  }, [currentVehicle, defaultValues, profileReset]);

  const uploadImage = useMemo(
    () => async (file, isFile) => {
      try {
        let compressedFile;
        if (!isFile) {
          compressedFile = await imageCompression(file, {
            maxSizeMB: 0.5,
            maxWidthOrHeight: 800,
          });
        }

        const formData = new FormData();
        formData.append('image', isFile ? file : compressedFile);

        const response = await uploadclaimFileInAWSS3(formData);

        const imageUrl = response.data && response.data.data ? response.data.data : {};
        return imageUrl;
      } catch (error) {
        console.error('Error compressing image:', error);
        enqueueSnackbar('Error while compressing image', { variant: 'error' });
        return null;
      }
    },
    [enqueueSnackbar]
  );

  // Profile Creation function

  const onSubmitProfile = handleSubmitProfile(async (data) => {
    try {
      // console.log('>>>', data);
      const response = await createVehicleProfile(data);
      // console.log(response);
      if (response) {
        enqueueSnackbar('Vehicle created successfully', { variant: 'success' });
        navigate('/dashboard/vehicle');
      } else {
        enqueueSnackbar('Failed to create Vehicle', { variant: 'error' });
      }
    } catch (error) {
      // Handle errors here if necessary
      console.error('Error submitting Vehicle:', error);
      enqueueSnackbar('An error occurred while creating Vehicle', { variant: 'error' });
    }
  });

  // Profile Update function

  const onSubmitProfileUpdate = handleSubmitProfile(async (data) => {
    try {
      const response = await updateVehicleProfile(vehicleId, data);
      // console.log('>>>>updatex', response);
      if (response) {
        enqueueSnackbar('Vehicle Updated successfully', { variant: 'success' });
        // navigate('/dashboard/vehicle');
        navigate(`/dashboard/vehicle`);
      } else {
        enqueueSnackbar('Failed to Update Vehicle', { variant: 'error' });
      }
    } catch (error) {
      // Handle errors here if necessary
      console.error('Error submitting Vehicle:', error);
      enqueueSnackbar('An error occurred while updating Vehicle', { variant: 'error' });
    }
  });

  const handleDropUserPicture = useCallback(
    async (acceptedFiles, field, message) => {
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      const isFile = ['insurancePdf', 'rcPdf'].includes(field);

      if (file) {
        const imageUrl = await uploadImage(newFile, isFile);
        if (imageUrl) {
          setValue(field, imageUrl);
          setDocs({
            ...docs,
            [field]: imageUrl,
          });
          enqueueSnackbar(message, { variant: 'success' });
        }
      }
    },
    [uploadImage, setValue, docs, enqueueSnackbar]
  );

  const handleRemoveFile = useCallback(
    async (field) => {
      const url = getValues()[field].preview;
      const dataToSend = { url };
      await deleteFileFromAWSS3(dataToSend)
        .then((data) => {
          setValue(field, null);
          setDocs({
            ...docs,
            [field]: null,
          });
          enqueueSnackbar('Deleted successfully', { variant: 'success' });
        })
        .catch((err) => {
          console.error('Error in deleting files:', err);
          enqueueSnackbar('Error while deleting', { variant: 'error' });
        });
    },
    [getValues, setValue, docs, enqueueSnackbar]
  );

  return (
    <div>
      {show.Profile && (
        <FormProvider
          methods={methodsProfile}
          onSubmit={currentVehicle ? onSubmitProfileUpdate : onSubmitProfile}
        >
          <Grid container spacing={3}>
            <Grid xs={12} md={8}>
              <Card sx={{ p: 3 }}>
                {
                  docs &&
                  <VehicleFields
                    theme={theme}
                    vehicleOptions={VEHICLE_OPTIONS}
                    docs={docs && docs}
                    errors={errors}
                    handleDrop={handleDropUserPicture}
                    handleRemoveFile={handleRemoveFile}
                    values={value} 
                    setValue={setValue}
                    />
                }
                <Stack alignItems="flex-end" sx={{ mt: 3 }}>
                  <LoadingButton type="submit" variant="contained">
                    {!currentVehicle ? 'Create Vehicle' : 'Save Changes'}
                  </LoadingButton>
                </Stack>
              </Card>
            </Grid>
          </Grid>
        </FormProvider>
      )}
    </div>
  );
}

VehicleNewEditForm.propTypes = {
  currentVehicle: PropTypes.object,
};
