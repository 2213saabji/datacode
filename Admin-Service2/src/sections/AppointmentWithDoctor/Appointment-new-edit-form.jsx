/* eslint-disable no-unused-vars */
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import imageCompression from 'browser-image-compression';
import { useMemo, useState, useEffect, useCallback } from 'react';

import { LoadingButton } from '@mui/lab';
import { useTheme } from '@mui/material/styles';
import { DatePicker } from '@mui/x-date-pickers';
import CardHeader from '@mui/material/CardHeader';
import {
  Card,
  Grid,
  Stack,
  Select,
  MenuItem,
  TextField,
  InputLabel,
  FormControl,
  CardContent,
} from '@mui/material';

import { uploadappoinmentFilesInAWSS3 } from 'src/utils/aws-s3-file-handler';

import { useAuthContext } from 'src/auth/hooks';
import { createNotifications } from 'src/api/notifications';
import { useGetAppointmentsCandidate } from 'src/api/appointment';
import {
  useGetalldoctorfromUms,
  createDoctorAppointment,
  updateDoctorAppointment,
} from 'src/api/appointmentwithdoctor';

import { useSnackbar } from 'src/components/snackbar';
// import FormProvider, { RHFTextField, RHFAutocomplete } from 'src/components/hook-form';
import FormProvider, { RHFUpload, RHFTextField, RHFAutocomplete } from 'src/components/hook-form';

export default function AppointmentwithdoctorNewEditForm({ currentappointment }) {
  const appointmentId = currentappointment?.data.doctorAppointmentId;
  const [candidate, setCandidate] = useState('');
  const [selectedValue, setSelectedValue] = useState('');
  const [selectedproblemtype, setSelectedproblemtypeValue] = useState('');

  const [selectedId, setSelectedId] = useState('');
  const [show, setShow] = useState();
  const navigate = useNavigate();
  const [uploadBtn, setUploadBtn] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const { user } = useAuthContext();
  const { candidates } = useGetAppointmentsCandidate();
  const { alldoctor } = useGetalldoctorfromUms();
  console.log(alldoctor);
  const doctors = alldoctor?.data;
  console.log('doctors-------->', doctors);

  const theme = useTheme();

  // const candidateProfiles = candidates?.data?.[0]?.CandidateProfiles;

  const handleChange = (event) => {
    const { value } = event.target;
    setSelectedValue(value);
    console.log('value----->', value);
    const selectedOption = doctors.find((option) => option?.UserProfile?.firstName === value);
    console.log('data----->', selectedOption.userId);
    setSelectedId(selectedOption ? selectedOption.userId : '');
    setCandidate(selectedOption);
  };

  const AppoinmentSchema = Yup.object().shape({
    problemTitle: Yup.string().required('Problem Title is required'),
    problemDescription: Yup.string().required('Problem Description is required'),
    appointmentType: Yup.string().required('appointmentType  is required'),
  });

  const defaultValues = useMemo(
    () => ({
      problemTitle: currentappointment?.data.problemTitle || '',
      patientId: currentappointment?.data.patientId || user?.userId,
      doctorId: currentappointment?.data.doctorId || selectedId,
      problemDescription: currentappointment?.data.problemDescription || '',
      appointmentType: currentappointment?.data.appointmentType || '',
      appointmentPassStatus: currentappointment?.data.appointmentPassStatus || 'open',
      appointmentTime: currentappointment?.data.appointmentTime || '',
      appointmentDate: currentappointment?.data.appointmentDate || '',
      appointmentPassMeetingLink: currentappointment?.data.appointmentPassMeetingLink || '',
      slipImageUrl: [],
      medicalRecords: currentappointment?.data.medicalRecords || [],
    }),
    [currentappointment, user?.userId, selectedId]
  );

  const methods = useForm({
    resolver: yupResolver(AppoinmentSchema),
    defaultValues,
  });

  const {
    reset,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { isSubmitting },
  } = methods;
  const values = watch();

  console.log('values-------->', values);

  useEffect(() => {
    if (currentappointment) {
      reset(defaultValues);
    }
  }, [currentappointment, defaultValues, reset]);

  useEffect(() => {
    if (currentappointment) {
      setValue('doctorId', currentappointment?.data?.docterId);
    } else {
      setValue('doctorId', selectedId);
    }
  }, [selectedId, setValue, currentappointment]);

  const onSubmit = handleSubmit(async (data) => {
    console.log('Submitting form', data);
    try {
      const response = await createDoctorAppointment(data);

      if (response) {
        createNotifications(
          selectedId,
          'patient booked appoinment',
          'PATIENT APPOINTMENT BOOKING',
          'Appointmenttodoctor/list/?status=open'
        );
        enqueueSnackbar('Appointment created successfully', { variant: 'success' });
        navigate(`/dashboard/Appointmenttodoctor/list/?status=open`);
      } else {
        enqueueSnackbar('Failed to create Appointment', { variant: 'error' });
      }
    } catch (error) {
      console.error('Error submitting Appointment:', error);
      enqueueSnackbar('An error occurred while creating Appointment', { variant: 'error' });
    }
  });
  const onSubmitUpdate = handleSubmit(async (data) => {
    try {
      const response = await updateDoctorAppointment(appointmentId, data);
      if (response) {
        createNotifications(
          currentappointment?.patientId,
          'doctor confirmed your appointment',
          `APPOINTMENT CONFIRMED","Appointmenttodoctor/${currentappointment?.doctorAppointmentId}/details`
        );
        enqueueSnackbar('Appointment updated successfully', { variant: 'success' });
        navigate(`/dashboard/Appointmenttodoctor/${appointmentId}`);
      } else {
        enqueueSnackbar('Failed to update Appointment', { variant: 'error' });
      }
    } catch (error) {
      console.error('Error updating Appointment:', error);
      enqueueSnackbar('An error occurred while updating Appointment', { variant: 'error' });
    }
  });

  const handleChanges = (e) => {
    setSelectedproblemtypeValue(e.target.value);
    console.log(e.target.value);
  };

  const handleDropMultiFile = useCallback(
    (acceptedFiles) => {
      const files = values.slipImageUrl || [];

      const newFiles = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );

      setValue('slipImageUrl', [...files, ...newFiles], {
        shouldValidate: true,
      });
    },
    [setValue, values.slipImageUrl]
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
        // Create a new Blob object with the compressed file content and type
        const blob = new Blob([compressedFile], { type: compressedFile.type });
        // Create a new File object with the Blob and original filename
        const newFile = new File([blob], compressedFile.name, { type: compressedFile.type });
        formData.append('images', newFile);
      });

      const response = await uploadappoinmentFilesInAWSS3(formData);
      const imageUrls =
        response.data && response.data.data && response.data.data.length
          ? response?.data?.data
          : [];

      if (imageUrls.length > 0) {
        setValue('medicalRecords', imageUrls);
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
    // const removedFileIndex = values.slipImageUrl.findIndex(
    //   (file) =>
    //     file.name === removedFile.name && file.preview === removedFile.preview
    // );
    // if (values.medicalRecords.length > 0) {
    //   const selectedImage = values.medicalRecords.filter((item) => removedFile.name === item.name)
    //   const dataToSend = { 'url': selectedImage[0].preview };
    //   await deleteFileFromAWSS3(dataToSend)
    //     .then((data) => {
    //       const updatedReceiptImageUrl = values.medicalRecords.filter((item) => removedFile.name !== item.name)
    //       setValue('medicalRecords', updatedReceiptImageUrl);
    //       setValue(
    //         'slipImageUrl',
    //         values.slipImageUrl.filter((_, index) => index !== removedFileIndex),
    //         { shouldValidate: true }
    //       );
    //       enqueueSnackbar('Deleted successfully', { variant: 'success' });
    //     })
    //     .catch((err) => {
    //       console.error('Error in deleting files:', err);
    //       enqueueSnackbar('Error while deleting', { variant: 'error' });
    //     });
    // } else {
    //   setValue(
    //     'slipImageUrl',
    //     values.slipImageUrl && values.slipImageUrl?.filter((file) => file !== removedFile),
    //     { shouldValidate: true }
    //   )
    // }
    // if (values.slipImageUrl.length === 1) {
    //   setUploadBtn(false); // Set uploadBtn to false when there are no more images to remove
    // }
  };

  const deleteImages = async () => {
    // const urlArr = [];
    // values.medicalRecords.forEach((file) => {
    //   const urlPreview = file.preview;
    //   urlArr.push(urlPreview);
    // });
    // const dataToSend = { 'urls': urlArr };
    // await deleteFilesFromAWSS3(dataToSend)
    //   .then((data) => {
    //     setValue('slipImageUrl', [], { shouldValidate: true });
    //     setUploadBtn(false);
    //     setValue('medicalRecords', []);
    //     enqueueSnackbar('Deleted successfully', { variant: 'success' });
    //   })
    //   .catch((err) => {
    //     console.error('Error in deleting files:', err);
    //     enqueueSnackbar('Error while deleting', { variant: 'error' });
    //   });
  };

  // >>>>>>> c1a533169ea48e61839258c825e5b84a3536f8be

  return (
    <FormProvider methods={methods} onSubmit={currentappointment ? onSubmitUpdate : onSubmit}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }} spacing={3}>
            {/* <Stack spacing={3}> */}

            <FormControl fullWidth sx={{ p: 3 }}>
              <Stack spacing={3}>
                {!currentappointment && (
                  <Card sx={{ p: 3 }}>
                    <FormControl fullWidth>
                      <InputLabel id="dropdown-label-f">Select Your Problem Type</InputLabel>
                      <Select
                        labelId="dropdown-label-f"
                        id="dropdown"
                        value={selectedproblemtype}
                        onChange={handleChanges}
                        label="Select Your Problem Type"
                        fullWidth
                      >
                        {[
                          'General Practitioner (GP)',
                          'Dentist',
                          'Pediatrician',
                          'Cardiologist',
                          'Dermatologist',
                          'Ophthalmologist',
                          'Orthopedic Surgeon',
                          'Neurologist',
                          'Psychiatrist',
                          'Gynecologist',
                        ].map((option, i) => (
                          <MenuItem key={i} value={option}>
                            {option}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Card>
                )}

                {!currentappointment && (
                  <Card sx={{ p: 3 }}>
                    <FormControl fullWidth>
                      <InputLabel id="dropdown-label">Select Your Doctor</InputLabel>
                      <Select
                        labelId="dropdown-label"
                        // name="candidateId"
                        id="dropdown"
                        value={selectedValue}
                        onChange={handleChange}
                        label="Select Your Doctor" // Ensure this prop is set
                        fullWidth
                      >
                        {doctors?.map((option) => (
                          <MenuItem key={option.userId} value={option?.UserProfile?.firstName}>
                            {option?.UserProfile?.firstName}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Card>
                )}

                <RHFTextField name="problemTitle" label="Title" />

                <RHFTextField
                  name="problemDescription"
                  label="Describe your problem"
                  multiline
                  rows={4}
                />

                <RHFAutocomplete
                  name="appointmentType"
                  label="Appointment Type"
                  placeholder="Appointment Type"
                  fullWidth
                  options={['Clinic', 'Remote'].map((option) => option)}
                  getOptionLabel={(option) => option}
                />
                <Stack spacing={1.5}>
                  {/* <Typography variant="subtitle2">Upload Your Previous Data</Typography> */}
                  {/* <RHFUpload
                  name="medicalRecords"
                  maxSize={8388608}
                  onDrop={handleDropPicture }
                   onDelete={handleRemoveFile}
                /> */}
                </Stack>
                <Card>
                  <CardHeader title="Upload Your Previous Data" />
                  <CardContent>
                    <RHFUpload
                      multiple
                      thumbnail
                      disabled={uploadBtn}
                      name="slipImageUrl"
                      maxSize={8388608}
                      onDrop={handleDropMultiFile}
                      onRemove={(removedFile) => {
                        deleteImage(removedFile);
                      }}
                      onRemoveAll={() => {
                        deleteImages();
                      }}
                      // -----------------------------------------------------------
                      onUpload={() => {
                        uploadImages(values.slipImageUrl);
                      }}
                    />
                  </CardContent>
                </Card>

                {currentappointment?.data?.appointmentType === 'clinic' && (
                  <>
                    <RHFAutocomplete
                      name="appointmentPassStatus"
                      label="Appointment Status"
                      placeholder="Appointment Status"
                      fullWidth
                      options={['open', 'closed', 'in-progress'].map((option) => option)}
                      getOptionLabel={(option) => option}
                    />
                    {/* <Controller
                          name="appointmentTime"
                          control={control}
                          render={({ field }) => (
                            <TimePicker
                              {...field}
                              label="Appointment Time"
                              renderInput={(params) => <TextField {...params} fullWidth />}
                            />
                          )}/> */}

                    <Controller
                      name="appointmentDate"
                      control={control}
                      render={({ field }) => (
                        <DatePicker
                          {...field}
                          label="Appointment Date"
                          renderInput={(params) => <TextField {...params} fullWidth />}
                        />
                      )}
                    />
                  </>
                )}

                {currentappointment?.data?.appointmentType === 'Remote' && (
                  <>
                    <RHFAutocomplete
                      name="appointmentPassStatus"
                      label="Appointment Status"
                      placeholder="Appointment Status"
                      fullWidth
                      options={['open', 'close', 'in-progress'].map((option) => option)}
                      getOptionLabel={(option) => option}
                    />

                    <RHFTextField
                      name="appointmentPassMeetingLink"
                      label="Appointment Pass Meeting Link"
                    />
                    {/* <Controller
                          name="appointmentTime"
                          control={control}
                          render={({ field }) => (
                            <TimePicker
                              {...field}
                              label="Appointment Time"
                              renderInput={(params) => <TextField {...params} fullWidth />}
                            />j
                          )}/> */}

                    <Controller
                      name="appointmentDate"
                      control={control}
                      render={({ field }) => (
                        <DatePicker
                          {...field}
                          label="Appointment Date"
                          renderInput={(params) => <TextField {...params} fullWidth />}
                        />
                      )}
                    />
                  </>
                )}
              </Stack>
            </FormControl>
            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" size="large" loading={isSubmitting}>
                Submit
              </LoadingButton>
            </Stack>
            {/* </Stack> */}
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}

AppointmentwithdoctorNewEditForm.propTypes = {
  currentappointment: PropTypes.object,
};
