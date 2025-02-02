/* eslint-disable no-unused-vars */
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import imageCompression from 'browser-image-compression';
import { useMemo, useState, useEffect, useCallback } from 'react';

import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import { DatePicker } from '@mui/x-date-pickers';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import Tabs, { tabsClasses } from '@mui/material/Tabs';
import { Chip, useTheme, CardHeader } from '@mui/material';

import { fData } from 'src/utils/format-number';
import { deleteFileFromAWSS3, uploadclaimFileInAWSS3 } from 'src/utils/aws-s3-file-handler';

import { useAuthContext } from 'src/auth/hooks';
import { statesOfIndia } from 'src/_mock/map/states';
import { DRIVER_VEHICLE_OPTIONS } from 'src/_mock/_vehicle';
import { RequestDriverForm } from 'src/api/requestLicenseAcceptance';

import { useSnackbar } from 'src/components/snackbar';
import FormProvider, {
  RHFTextField,
  RHFAutocomplete,
  RHFUploadAvatar,
} from 'src/components/hook-form';
import DriverVehicleFeids from '../vehicle/driver-vehicle-form';

const TABS = [
  {
    value: 'LicenseImg',
    label: 'Front',
    icon: <Box component="img" src="/assets/icons/menuicons/Profile.svg" />,
  },
  {
    value: 'degreeImg',
    label: 'Back',
    icon: <Box component="img" src="/assets/icons/menuicons/Profile.svg" />,
  },
];

const defaultDocs = {
  rcPdf: null,
  insurancePdf: null,
  vehicleImageUrl: null,
}
export default function DriverLicenseForm() {
  const theme = useTheme();

  const [currentTab, setCurrentTab] = useState('LicenseImg');
  const [currentStep, setCurrentStep] = useState(1); // Manage current step

  const [errorState, setErrorState] = useState(false);
  const { user: userdata } = useAuthContext();
  const [user] = useState(userdata);
  const [docs, setDocs] = useState(defaultDocs);
  const { enqueueSnackbar } = useSnackbar();

  const driverTypes = ['Amubulance Driver', 'Cab Driver', 'Delivery Driver'];

  const accountTypes = ['Saving', 'Current'];

  const paymentMethods = [
    'Cash',
    'UPI',
    'Card Payment',
    'Net Banking',
    'Mobile Wallet',
    'Cryptocurrency',
    'Bank Transfer',
    'Cheque',
  ];

  const uploadMessages = {
    licenseNumberFrontImage: 'License Front Image Upload Successfully',
    licenseNumberBackImage: 'License Back Image Upload Successfully',
  };

  const ProfileSchema = Yup.object().shape({
    driverName: Yup.string().required('Driver Name is required'),
    driverType: Yup.string().required('Driver Type is required'),
    licenseNumber: Yup.string().required('License Number is required'),
    licenseExpirationDate: Yup.string().required('License Expiration Date Date is required'),
    licenseIssuingState: Yup.string('License Issuing State is required'),
    licenseNumberFrontImage: Yup.mixed().required('License Number Front image is required'),
    licenseNumberBackImage: Yup.mixed().required('License Number Back image is required'),
    accountType: Yup.string().required(' Account Type is required'),
    paymentMethod: Yup.array().min(1, 'Payment Method is required'),
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
    maintenanceHistory: Yup.string().required('Maintenance History is required'),
    vehicleCondition: Yup.string().required('Vehicle Condition is required'),
    availability: Yup.boolean().required('Availability is required'),
    gpsTracking: Yup.boolean().required('GPS Tracking is required'),
    insuranceExpiryDate: Yup.string().required('Insurance Expiry Date is required'),
    additionalEquipment: Yup.string().nullable(),
    vehicleImageUrl: Yup.mixed().required('Vehicle image is required'),
    insurancePdf: Yup.mixed().required('Insurance is required'),
    rcPdf: Yup.mixed().required('Rc is required'),
  });

  const defaultValues = useMemo(
    () => ({
      driverType: '',
      driverName: `${userdata?.UserProfile?.firstName}` || '',
      licenseNumber: '',
      licenseExpirationDate: '',
      licenseIssuingState: '',
      licenseNumberFrontImage: null,
      licenseNumberBackImage: null,
      accountType: '',
      paymentMethod: [],
      vehicleName: '',
      model: '',
      year: null,
      chassisNumber: `${''}`,
      vehicleType: '',
      color: '',
      manufacturingYear: '',
      engineNumber: '',
      fuelType: '',
      grossVehicleWeight: '',
      registrationNumber: '',
      maintenanceHistory: '',
      vehicleCondition: '',
      availability: null,
      gpsTracking: null,
      insuranceExpiryDate: '',
      additionalEquipment: '',
      vehicleImageUrl: null,
      insurancePdf: null,
      rcPdf: null,
    }),
    [userdata?.UserProfile?.firstName]
  );

  const methodsProfile = useForm({
    resolver: yupResolver(ProfileSchema),
    defaultValues,
  });

  const {
    handleSubmit: handleSubmitProfile,
    reset: resetProfile,
    setValue,
    getValues,
    formState: { errors },
  } = methodsProfile;

  useEffect(() => {
    if (user) {
      resetProfile(defaultValues);
    }
  }, [user, defaultValues, resetProfile]);

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      setErrorState(true);
    }
  }, [errors]);

  const handleChangeTab = useCallback((event, newValue) => {
    setCurrentTab(newValue);
  }, []);

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

  const onSubmitProfileupload = handleSubmitProfile(async (data) => {
    try {
      const driverData = {
        driverType: data.driverType,
        driverName: data.driverName,
        licenseNumber: data.licenseNumber,
        licenseExpirationDate: data.licenseExpirationDate,
        licenseIssuingState: data.licenseIssuingState,
        licenseNumberFrontImage: { image: data.licenseNumberFrontImage },
        licenseNumberBackImage: { image: data.licenseNumberBackImage },
        accountType: data.accountType,
        paymentMethod: data.paymentMethod,
        approvalStatus: 0,
        userId: userdata.userId,
      };

      const vehicleData = {
        vehicleType: data.vehicleType,
        vehicleName: data.vehicleName,
        model: data.model,
        year: data.year,
        chassisNumber: data.chassisNumber,
        color: data.color,
        manufacturingYear: data.manufacturingYear,
        engineNumber: data.engineNumber,
        fuelType: data.fuelType,
        grossVehicleWeight: data.grossVehicleWeight,
        registrationNumber: data.registrationNumber,
        maintenanceHistory: data.maintenanceHistory,
        vehicleCondition: data.vehicleCondition,
        availability: data.availability,
        vehicleImageUrl: data.vehicleImageUrl,
        rcPdf: data.rcPdf,
        insurancePdf: data.insurancePdf,
        gpsTracking: data.gpsTracking,
        insuranceExpiryDate: data.insuranceExpiryDate,
        additionalEquipment: data.additionalEquipment,
      };

      const finalData = {
        driver: driverData,
        vehicle: vehicleData,
      };

      const response = await RequestDriverForm(finalData, userdata.accessToken);
      if (response) {
        resetProfile();
        setDocs(defaultDocs)
        setErrorState(false);
        enqueueSnackbar('Driver Request Upload Successfully', { variant: 'success' });
      } else {
        enqueueSnackbar('Failed to Upload details', { variant: 'error' });
      }
    } catch (error) {
      console.error('Error Request Upload Details:', error);
      enqueueSnackbar('An error occurred while Requesting Upload Details', { variant: 'error' });
    }
  });

  const handleNext = () => {
    if (currentStep === 1) {
      setCurrentStep(2);
    }
  };

  const handleBack = () => {
    setCurrentStep(1);
    setErrorState(false);
  };

  return (
    <FormProvider methods={methodsProfile} onSubmit={user?.UserProfile && onSubmitProfileupload}>
      <Grid sx={{ mb: 4, mt: 4 }}>
        <Grid xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <CardHeader title="DRIVER VERIFICATION FORM" sx={{ pl: 0, mb: 3 }} />
            {currentStep === 1 ? (
              <>
                <Box sx={{ mb: 2 }}>
                  <Box sx={{ mb: 2 }}>
                    <Tabs
                      value={currentTab}
                      onChange={handleChangeTab}
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
                        <Tab key={tab.value} value={tab.value} icon={tab.icon} label={tab.label} />
                      ))}
                    </Tabs>
                  </Box>
                  {currentTab === 'LicenseImg' && (
                    <RHFUploadAvatar
                      name="licenseNumberFrontImage"
                      maxSize={8388608}
                      onDrop={(file) =>
                        handleDropUserPicture(
                          file,
                          'licenseNumberFrontImage',
                          uploadMessages.licenseNumberFrontImage
                        )
                      }
                      helperText={
                        <Typography
                          variant="caption"
                          sx={{
                            mt: 3,
                            mx: 'auto',
                            display: 'block',
                            textAlign: 'center',
                            color: 'text.disabled',
                          }}
                        >
                          License Picture
                          <br /> max size of {fData(8388608)}
                        </Typography>
                      }
                    />
                  )}
                  {currentTab === 'degreeImg' && (
                    <RHFUploadAvatar
                      name="licenseNumberBackImage"
                      maxSize={8388608}
                      onDrop={(file) =>
                        handleDropUserPicture(
                          file,
                          'licenseNumberBackImage',
                          uploadMessages.licenseNumberBackImage
                        )
                      }
                      helperText={
                        <Typography
                          variant="caption"
                          sx={{
                            mt: 3,
                            mx: 'auto',
                            display: 'block',
                            textAlign: 'center',
                            color: 'text.disabled',
                          }}
                        >
                          License Picture
                          <br /> max size of {fData(8388608)}
                        </Typography>
                      }
                    />
                  )}
                </Box>
                <Box
                  rowGap={3}
                  columnGap={2}
                  display="grid"
                  gridTemplateColumns={{
                    xs: 'repeat(1, 1fr)',
                    sm: 'repeat(2, 1fr)',
                  }}
                >
                  <RHFTextField
                    name="driverName"
                    label={
                      <span>
                        Name<span style={{ color: 'red' }}> *</span>
                      </span>
                    }
                    disabled
                  />
                  <RHFAutocomplete
                    name="driverType"
                    label={
                      <span>
                        Driver Type<span style={{ color: 'red' }}> *</span>
                      </span>
                    }
                    fullWidth
                    options={driverTypes.map((option) => option)}
                    isOptionEqualToValue={(option, value) => option === value || value === ''}
                    getOptionLabel={(option) => option || ''}
                  />

                  <RHFTextField
                    name="licenseNumber"
                    label={
                      <span>
                        License Number<span style={{ color: 'red' }}> *</span>
                      </span>
                    }
                  />

                  <DatePicker
                    name="licenseExpirationDate"
                    label={
                      <span>
                        License Expiration Date<span style={{ color: 'red' }}> *</span>
                      </span>
                    }
                    // value={value}
                    onChange={(newValue) => {
                      setValue('licenseExpirationDate', newValue);
                    }}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        // margin: 'normal',
                      },
                    }}
                  />

                  <RHFAutocomplete
                    name="licenseIssuingState"
                    label={
                      <span>
                        Choose License Issuing State<span style={{ color: 'red' }}> *</span>
                      </span>
                    }
                    fullWidth
                    options={statesOfIndia.map((option) => option)}
                    isOptionEqualToValue={(option, value) => option === value || value === ''}
                    getOptionLabel={(option) => option || ''}
                    InputLabelProps={{
                      style: {
                        color: theme.palette.mode === 'light' ? 'black' : 'white',
                      },
                    }}
                  />

                  <RHFAutocomplete
                    name="accountType"
                    label={
                      <span>
                        Account Type<span style={{ color: 'red' }}> *</span>
                      </span>
                    }
                    fullWidth
                    options={accountTypes.map((option) => option)}
                    isOptionEqualToValue={(option, value) => option === value || value === ''}
                    getOptionLabel={(option) => option || ''}
                    InputLabelProps={{
                      style: {
                        color: theme.palette.mode === 'light' ? 'black' : 'white',
                      },
                    }}
                  />

                  <RHFAutocomplete
                    name="paymentMethod"
                    label="Payment Methods"
                    placeholder="+ Methods"
                    multiple
                    freeSolo
                    disableCloseOnSelect
                    options={paymentMethods.map((option) => option)}
                    isOptionEqualToValue={(option, value) => option === value || value === ''}
                    getOptionLabel={(option) => option || ''}
                    renderOption={(props, option) => (
                      <li {...props} key={option}>
                        {option}
                      </li>
                    )}
                    renderTags={(selected, getTagProps) =>
                      selected.map((option, index) => (
                        <Chip
                          {...getTagProps({ index })}
                          key={option}
                          label={option}
                          size="small"
                          color="info"
                          variant="soft"
                        />
                      ))
                    }
                  />
                </Box>
              </>
            ) : (
              <DriverVehicleFeids
                theme={theme}
                docs={docs}
                errors={errors}
                vehicleOptions={DRIVER_VEHICLE_OPTIONS}
                handleDrop={handleDropUserPicture}
                handleRemoveFile={handleRemoveFile}
              />
            )}
            {errorState && (
              <Typography sx={{ color: 'red' }}>fill all the required fields</Typography>
            )}
            <Stack direction="row" justifyContent="end" sx={{ mt: 3 }}>
              {currentStep === 2 && (
                <LoadingButton sx={{ mr: '20px' }} onClick={handleBack} variant="outlined">
                  Back
                </LoadingButton>
              )}

              {currentStep === 1 && (
                <LoadingButton onClick={handleNext} variant="contained">
                  Next
                </LoadingButton>
              )}

              {currentStep === 2 && (
                <LoadingButton type="submit" variant="contained">
                  Save Changes
                </LoadingButton>
              )}
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}

DriverLicenseForm.propTypes = {
  //   user: PropTypes.object,
};
