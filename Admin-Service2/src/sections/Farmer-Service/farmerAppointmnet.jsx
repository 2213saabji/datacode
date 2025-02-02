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
import Grid from '@mui/material/Unstable_Grid2';
import { TimePicker } from '@mui/x-date-pickers';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { useParams } from 'src/routes/hooks';

import { uploadUserFileInAWSS3, deleteUserFileFromAWSS3 } from 'src/utils/aws-s3-file-handler';

import { useAuthContext } from 'src/auth/hooks';
import { createNotifications } from 'src/api/notifications';
import { useGetSellers } from 'src/api/agriculture/sellerDetails';
import { createAppointment, UpdateAppoinmnetForAgri } from 'src/api/agriculture/appointmentforagri';

import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { RHFUpload, RHFTextField, RHFAutocomplete } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export default function FarmerAppointment({ currentappointment }) {
  // Required Variablesgthdtxtrrsedsr
  const params = useParams();
  const { sellerId } = params;

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { user } = useAuthContext();
  const { sellers } = useGetSellers();

  const filteredSeller = sellers?.data?.filter(
    (item) => item?.seller_owner_detail?.sellerOwnerId === Number(sellerId)
  );
  // console.log('filteredSeller---->', filteredSeller[0].seller_owner_detail?.sellerOwnerfirstName)
  // const sellerName = (filteredSeller && filteredSeller[0].seller_owner_detail) && filteredSeller[0].seller_owner_detail?.sellerOwnerfirstName
  let sellerName = '';
  if (filteredSeller && filteredSeller.length > 0 && filteredSeller[0].seller_owner_detail) {
    sellerName = filteredSeller[0].seller_owner_detail.sellerOwnerfirstName;
  }
  console.log('sellerName---->', sellerName);

  // const [selectedValue, setSelectedValue] = useState(sellerName || '');
  // const [selectedId, setSelectedId] = useState('');

  const [selectedValue, setSelectedValue] = useState(sellerName || '');
  const [selectedId, setSelectedId] = useState(sellerId || '');

  const agricultureAppointmentId = currentappointment?.data.agricultureAppointmentId;
  const sellerDetails =
    localStorage.getItem('sellerDetails') !== 'undefined' &&
    JSON.parse(localStorage.getItem('sellerDetails'));

  // fetching the election List
  const handleChange = (event) => {
    const { value } = event.target;
    setSelectedValue(value);
    const selectedOption = sellers?.data?.find(
      (option) => option?.seller_owner_detail?.sellerOwnerfirstName === value
    );
    setSelectedId(selectedOption ? selectedOption?.seller_owner_detail?.sellerOwnerId : '');
    // setCandidate(selectedOption);
  };
  // Form Validation Schema
  const appointmentSchema = Yup.object().shape({
    // farmerId: Yup.number().required('Farmer ID is required').positive('Farmer ID must be positive'),
    // sellerOwnerId: Yup.number().required('Seller ID is required').positive('Seller ID must be positive'),
    description: Yup.string().required('Description is required'),
    appointmentType: Yup.string().required('Appointment Type is required'),
    appointmentTime: Yup.string().required('Appointment Time is required'),
    // appointmentTime: Yup.string()
    // .nullable()
    // .matches(
    //   /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/,
    //   'Invalid time format. Please use HH:MM format (24-hour).'
    // )
    // .required('Appointment Time is required'),

    appointmentDate: Yup.date().required('Appointment Date is required'),
    appointmentPassStatus: Yup.string().required('Fee Catogory is required'),
    // appointmentPassMeetingLink: Yup.mixed().required('Fee Catogory is required'),

    //  pdfImageUrl: Yup.object().required('Pdf Img Url is required'),
  });

  //  useEffect(()=>{

  //  }, [])

  // Form Values
  const defaultValues = useMemo(
    () => ({
      sellerOwnerId: currentappointment?.data.sellerOwnerId || sellerName,
      farmerId: currentappointment?.data.farmerId || user?.userId,
      description: currentappointment?.data.description || '',
      appointmentType: currentappointment?.data.appointmentType || '',
      appointmentTime: currentappointment?.data.appointmentTime || '',
      appointmentDate: currentappointment?.data.appointmentDate || null,
      appointmentPassStatus: currentappointment?.data.appointmentPassStatus || 'Pending',
      pdfImageUrl: currentappointment?.data.pdfImageUrl || null,
      appointmentPassMeetingLink: currentappointment?.data.appointmentPassMeetingLink || null,
    }),
    [currentappointment, user?.userId, sellerName]
  );
  // appointmentDate
  // Form Method
  const methods = useForm({
    resolver: yupResolver(appointmentSchema),
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

  // useEffect(() => {
  //   if (sellerName) {
  //     setSelectedValue(sellerName);
  //   }
  // }, [sellerName]);
  useEffect(() => {
    if (currentappointment) {
      reset(defaultValues);
    }
  }, [currentappointment, defaultValues, reset]);


  useEffect(() => {
    if (currentappointment) {
      setValue('sellerOwnerId', currentappointment?.data?.sellerOwnerId);
      const selectedSeller = sellers?.data?.find(
        (seller) =>
          seller?.seller_owner_detail?.sellerOwnerId === currentappointment?.data?.sellerOwnerId
      );
      setSelectedValue(selectedSeller?.seller_owner_detail?.sellerOwnerfirstName || '');
    } else {
      setValue('sellerOwnerId', sellerId);
      setSelectedValue(sellerName || '');
    }
  }, [currentappointment, sellerId, setValue, sellers, sellerName]);

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
        const imageUrl = response.data && response.data.data ? response.data.data : {};

        if (imageUrl) {
          console.log('hfdhui');
          setValue('pdfImageUrl', imageUrl);
          enqueueSnackbar('Uploaded successfully', { variant: 'success' });
        } else {
          console.error('Error in uploading file:', response);
          enqueueSnackbar('Error while uploading', { variant: 'error' });
        }
      } catch (error) {
        console.error('Error compressing image:', error);
        enqueueSnackbar('Error while compressing image', { variant: 'error' });
      }
    },
    [setValue, enqueueSnackbar]
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
    const dataToSend = {
      url: values.pdfImageUrl.preview,
    };
    await deleteUserFileFromAWSS3(dataToSend)
      .then((data) => {
        setValue('pdfImageUrl', null);
        // console.log(data);
        enqueueSnackbar('Deleted successfully', { variant: 'success' });
      })
      .catch((err) => {
        console.error('Error in deleting files:', err);
        enqueueSnackbar('Error while deleting', { variant: 'error' });
      });
  }, [setValue, enqueueSnackbar, values.pdfImageUrl]);

  // Function Call for New Ward Profile
  const onSubmit = handleSubmit(async (data) => {
    try {
      const updatedData = {
        ...data,
        // farmerId: user?.userId,
        // sellerOwnerId: sellerDetails?.seller_owner_detail?.sellerOwnerId,
      };
      const response = await createAppointment(updatedData);
      if (response) {
        createNotifications(
          sellerId,
          'Farmer booked appoinnet',
          'Appoinment booking',
          'dashboard/FarmerService/new'
        );
        enqueueSnackbar('appointment created successfully', { variant: 'success' });
        navigate('/dashboard/FarmerService/new');
      } else {
        enqueueSnackbar('Failed to create appointment', { variant: 'error' });
      }
    } catch (error) {
      console.error('Error submitting appointment:', error);
      enqueueSnackbar('An error occurred while creating appointment', { variant: 'error' });
    }
  });

  // Function Call for Updating Ward Profile
  const onSubmitUpdate = handleSubmit(async (data) => {
    try {
      // const updatedData = {
      //   ...data,
      //   farmerId: user?.userId,
      //   sellerOwnerId: currentappointment?.seller_owner_detail?.sellerOwnerId,
      // }
      const response = await UpdateAppoinmnetForAgri(agricultureAppointmentId, data);

      if (response) {
        enqueueSnackbar('appointment updated successfully', { variant: 'success' });
        navigate(
          `/dashboard/FarmerService/Registration/${agricultureAppointmentId}/appointment_Details`
        );
      } else {
        enqueueSnackbar('Failed to update appointment', { variant: 'error' });
      }
    } catch (error) {
      // Handle errors here if necessary
      console.error('Error updating appointment :', error);
      enqueueSnackbar('An error occurred while updating appointment ', { variant: 'error' });
    }
  });
  console.log(defaultValues);

  return (
    <FormProvider methods={methods} onSubmit={currentappointment ? onSubmitUpdate : onSubmit}>
      {/* <Grid container spacing={3} sx={{ mt: -5 }}>
        <Grid xs={12} md={8}>
          {!currentappointment && (
            <Card sx={{ p: 3 }} >
              <RHFTextField
                  name="sellerOwnerId"
                  type="text"
                  label="Your Seller"
                  value={selectedValue}
                  disabled
                />
              {/* <FormControl fullWidth>
                <InputLabel id="dropdown-label">Select Your Seller</InputLabel>
                <Select

                  labelId="dropdown-label"
                  name="sellerOwnerId"
                  id="dropdown"
                  value={selectedValue}
                  onChange={handleChange}
                  label="Select Your Seller" // Ensure this prop is set
                  fullWidth
                >
                  {sellers?.data?.map((option) => (
                    <MenuItem key={option.userId} value={option?.seller_owner_detail?.
                      sellerOwnerfirstName}>
                      {option?.seller_owner_detail?.
                        sellerOwnerfirstName}
                    </MenuItem>
                  ))}


                </Select>
              </FormControl> */}
      {/* </Card>
      {/* </Card>
          )}
        </Grid>
      </Grid> }
    </Grid> */}

    < Grid container spacing = { 3} >
      <Grid xs={12} md={8}>
        <Card sx={{ p: 3 }}>
          <Stack spacing={2} sx={{ p: 3.5 }}>
            {/* <Stack spacing={3} sx={{ p: 3 }}> */}
            <RHFAutocomplete
              name="appointmentType"
              label="Appointment Type"
              options={['Office', 'Remote'].map((option) => option)}
              getOptionLabel={(option) => option}
            />

            {/* </Stack> */}
            <>
              <TimePicker
                name="appointmentTime"
                label="Appointment Time"
                onChange={(newValue) => {
                  setValue('appointmentTime', newValue);
                }}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    // margin: 'normal',
                  },
                }}
              />

              <DatePicker
                name="appointmentDate"
                label="Appointment Date"
                // value={value}
                onChange={(newValue) => {
                  setValue('appointmentDate', newValue);
                }}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    // margin: 'normal',
                  },
                }}
              />
            </>

            {currentappointment && (
              <RHFAutocomplete
                name="appointmentPassStatus"
                label="Appointment Pass Status"
                placeholder="Appointment Pass Status"
                // disalble
                fullWidth
                options={['Pending', 'Accepted', 'Rejected'].map((option) => option)}
                getOptionLabel={(option) => option}
              />
            )}

            {currentappointment && (
              <Stack spacing={1.5}>
                <RHFTextField
                  name="appointmentPassMeetingLink"
                  type="text"
                  fullWidth
                  label="Appointment PassMeeting Link"
                />
              </Stack>
            )}

            <Stack spacing={1.5}>
              <Typography variant="subtitle2">Img Url</Typography>
              <RHFUpload
                name="pdfImageUrl"
                maxSize={8388608}
                onDrop={handleDropUserPicture}
                onDelete={handleRemoveFile}
              />
            </Stack>

            {!currentappointment && (
              <RHFTextField
                name="description"
                type="text"
                label="Description"
                multiline
                rows={4}
              />
            )}
          </Stack>

          <Stack alignItems="flex-end" sx={{ mt: 3 }}>
            <LoadingButton type="submit" variant="contained" size="large" loading={isSubmitting}>
              {!currentappointment ? 'Book Appointment with Seller' : 'Save  Changes'}
            </LoadingButton>
          </Stack>
          {/* </Stack> */}
        </Card>
      </Grid>
      </Grid >
    </FormProvider >
  );
}

FarmerAppointment.propTypes = {
  currentappointment: PropTypes.object,
};
