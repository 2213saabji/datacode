/* eslint-disable no-unused-vars */
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import imageCompression from 'browser-image-compression';
import { useParams, useNavigate } from 'react-router-dom';
import { useMemo, useState, useEffect, useCallback } from 'react';

import { Box } from '@mui/system';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import { TimePicker } from '@mui/x-date-pickers';
import LoadingButton from '@mui/lab/LoadingButton';
import { Tab, Tabs, tabsClasses } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { uploadUserFileInAWSS3, deleteUserFileFromAWSS3 } from 'src/utils/aws-s3-file-handler';

import { TABS } from 'src/_mock/agriculture';
import { useAuthContext } from 'src/auth/hooks';
import { useGetElections } from 'src/api/election';
import { UpdatePartyProfile } from 'src/api/party';
import { useGetPartyAlliances } from 'src/api/party_alliance';
import { createInsituteAppointment } from 'src/api/Institution/InstituteAppointments';

import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { RHFUpload, RHFTextField, RHFAutocomplete } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export default function InstituteAppointmentBooking({ currentParty }) {
  // Required Variablesgthdtxtrrsedsr
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const partyId = currentParty?.data.partyId;

  const { user } = useAuthContext();
  const params = useParams();
  const instituteIdParam = params?.instituteId;
  console.log('user------>', user);

  // fetching the election List

  const { elections: electionsList } = useGetElections();

  const ElectionListArr = electionsList?.data || [];

  const ElectionData = ElectionListArr.map((list) => ({
    value: list.electionId,
    label: list.electionTitle,
  }));

  const ElectionListDataForOptions = ElectionData.map((option) => option.value);

  // fetching the Party Alliacne List

  const { PartyAlliances: PartyAlliacneList } = useGetPartyAlliances();
  const [currentImageTab, setCurrentImageTab] = useState('frontImage');

  const AllianceListArr = PartyAlliacneList?.data || [];

  const AllianceData = AllianceListArr.map((list) => ({
    value: list.partyAllianceId,
    label: list.partyAllianceName,
  }));

  const AllianceListDataForOptions = AllianceData.map((option) => option.value);

  // Form Validation Schema
  const PartySchema = Yup.object().shape({
    // studentId: Yup.string().required('Student Name is required'),
    // institutionId: Yup.string().required('Institution Id is required'),
    description: Yup.string().required('Description is required'),
    appointmentType: Yup.string().required('Appointment Type is required'),
    // appointmentPassStatus: Yup.string().required('Appointment Pass Status is required'),
    // appointmentTime: Yup.string().required('Appointment Time is required'),
    // appointmentDate: Yup.string().required('Appointment Date is required'),
    // pdf: Yup.mixed().required('Image is required'),
    // image: Yup.mixed().required('Image is required'),
    // appointmentPassMeetingLink: Yup.mixed().required('Appointment Pass Meeting Link is required'),
  });

  // Form Values
  const defaultValues = useMemo(
    () => ({
      studentId: user?.userId,
      institutionId: instituteIdParam,
      description: '',
      appointmentType: '',
      appointmentDate: '',
      appointmentPassStatus: 'Pending',
      pdf: '',
      image: '',
      oppointmentPassMeetingLink: '',
    }),
    [instituteIdParam, user?.userId]
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

  const value = watch();

  useEffect(() => {
    if (currentParty) {
      reset(defaultValues);
    }
  }, [currentParty, defaultValues, reset]);

  // for user profile image
  const handleChangeImageTab = useCallback((event, newValue) => {
    setCurrentImageTab(newValue);
  }, []);

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
        // const imageUrl = response.data && response.data.data ? response.data.data : {};
        const imageUrl = response?.data?.data?.preview || {};
        if (imageUrl) {
          if (currentImageTab === 'frontImage') {
            setValue('pdf', imageUrl);
            enqueueSnackbar(' Image Upload Successfully', { variant: 'success' });
          } else if (currentImageTab === 'sideImage') {
            setValue('image', imageUrl);
            enqueueSnackbar('Image Upload Successfully', { variant: 'success' });
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
        url: value.pdf,
      };
      await deleteUserFileFromAWSS3(dataToSend)
        .then((data) => {
          setValue('pdf', null);
          // console.log(data);
          enqueueSnackbar('Deleted successfully', { variant: 'success' });
        })
        .catch((err) => {
          console.error('Error in deleting files:', err);
          enqueueSnackbar('Error while deleting', { variant: 'error' });
        });
    } else {
      const dataToSend = {
        url: value.image,
      };
      await deleteUserFileFromAWSS3(dataToSend)
        .then((data) => {
          setValue('image', null);
          // console.log(data);
          enqueueSnackbar('Deleted successfully', { variant: 'success' });
        })
        .catch((err) => {
          console.error('Error in deleting files:', err);
          enqueueSnackbar('Error while deleting', { variant: 'error' });
        });
    }
  }, [setValue, currentImageTab, enqueueSnackbar, value.pdf, value.image]);

  // Function Call for New Ward Profile
  const onSubmit = handleSubmit(async (data) => {
    try {
      const updatedData = {
        ...data,
        institutionId: Number(instituteIdParam),
        studentId: user?.userId,
        pdfImageUrl: {
          pdf: data.pdf,
          image: data.image,
        },
      };
      const response = await createInsituteAppointment(updatedData);
      if (response) {
        enqueueSnackbar('Appoinment created successfully', { variant: 'success' });
        // navigate('/dashboard/party');
      } else {
        enqueueSnackbar('Failed to create Appoinment', { variant: 'error' });
      }
    } catch (error) {
      console.error('Error submitting party:', error);
      enqueueSnackbar('An error occurred while creating Appointment', { variant: 'error' });
    }
  });

  // Function Call for Updating Ward Profile
  const onSubmitUpdate = handleSubmit(async (data) => {
    try {
      const response = await UpdatePartyProfile(partyId, data);

      if (response) {
        enqueueSnackbar('Appoinment updated successfully', { variant: 'success' });
        navigate(`/dashboard/party/${partyId}`);
      } else {
        enqueueSnackbar('Failed to update Appoinment', { variant: 'error' });
      }
    } catch (error) {
      // Handle errors here if necessary
      console.error('Error updating Appoinment :', error);
      enqueueSnackbar('An error occurred while updating Appoinment ', { variant: 'error' });
    }
  });

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>
        <Grid xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={3} sx={{ p: 3 }}>
              <RHFAutocomplete
                name="appointmentType"
                label="Appointment Type"
                // options={ElectionListDataForOptions}
                // getOptionLabel={(value) => {
                //   const Election = ElectionData.find((option) => option.value === value);
                //   return Election ? Election.label : '';
                // }}
                options={['Office', 'Remote'].map((option) => option)}
                getOptionLabel={(option) => option}
              />
              <Stack spacing={1.5}>
                <RHFTextField
                  name="description"
                  type="text"
                  fullWidth
                  label="Description"
                  multiline
                  rows={4}
                />
              </Stack>
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

              <RHFAutocomplete
                name="appointmentPassStatus"
                label="Appointment Pass Status"
                placeholder="Choose a Status"
                fullWidth
                disabled={!(user?.userRoleId === 44)}
                options={['Pending', 'Accepted', 'Rejected'].map((option) => option)}
                getOptionLabel={(option) => option}
              />

              {/* <RHFAutocomplete
                name="feeStructure"
                label="Fee Structure"
                placeholder="Choose a Party Name"
                fullWidth
                options={Party_Name.map((option) => option)}
                getOptionLabel={(option) => option}
              /> */}

              <Card sx={{ p: 4 }}>
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
                      name="pdf"
                      maxSize={8388608}
                      onDrop={handleDropUserPicture}
                      onDelete={handleRemoveFile}
                    />
                  )}
                  {currentImageTab === 'sideImage' && (
                    <RHFUpload
                      name="image"
                      maxSize={8388608}
                      onDrop={handleDropUserPicture}
                      onDelete={handleRemoveFile}
                    />
                  )}
                </Box>
              </Card>

              <Stack spacing={1.5}>
                <RHFTextField
                  name="oppointmentPassMeetingLink"
                  type="text"
                  fullWidth
                  label="Oppointment PassMeeting Link"
                  multiline
                  rows={4}
                />
              </Stack>
            </Stack>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" size="large" loading={isSubmitting}>
                Book Appointment with Institute
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}

InstituteAppointmentBooking.propTypes = {
  currentParty: PropTypes.object,
};
