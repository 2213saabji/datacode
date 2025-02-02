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
import Container from '@mui/material/Container';
// import FormProvider, { RHFTextField, RHFAutocomplete } from 'src/components/hook-form';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import LoadingButton from '@mui/lab/LoadingButton';
import {
  Box,
  Tab,
  Tabs,
  Select,
  Button,
  MenuItem,
  useTheme,
  TextField,
  InputLabel,
  FormControl,
  tabsClasses,
  CardContent,
} from '@mui/material';

import { RouterLink } from 'src/routes/components';

// import { useGetAppointmentsCandidate } from 'src/api/appointment';
import { uploadappoinmentFilesInAWSS3 } from 'src/utils/aws-s3-file-handler';

import { useAuthContext } from 'src/auth/hooks';
import { createDesire, updateDesire } from 'src/api/desire';
import { createNotifications } from 'src/api/notifications';
import { useGetAppointmentsCandidate } from 'src/api/appointment';

import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { RHFUpload, RHFTextField, RHFAutocomplete } from 'src/components/hook-form';
// import {  SpeedDial, SpeedDialAction,} from '@mui/material';
// ----------------------------------------------------------------------

export default function DesireNewEditForm({ currentappointment }) {
  const [candidate, setCandidate] = useState('');
  const [uploadBtn, setUploadBtn] = useState(false);
  const [currentTab, setCurrentTab] = useState('attplChannel');
  const [selectedValue, setSelectedValue] = useState('');
  const [selectedId, setSelectedId] = useState('');
  const [show, setShow] = useState();
  console.log(show);
  const theme = useTheme();
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();
  const { user } = useAuthContext();
  const { candidates } = useGetAppointmentsCandidate();
  console.log(`data--->${candidates}`);
  const appointmentId = currentappointment?.data.desireAppointmentId;
  const candidateProfiles = candidates?.data?.[0]?.CandidateProfiles;
  console.log(candidateProfiles);
  const handleChange = (event) => {
    const { value } = event.target;
    setSelectedValue(value);
    const selectedOption = candidates?.data?.find(
      (option) => option?.User?.UserProfile?.firstName === value
    );
    setSelectedId(selectedOption ? selectedOption.User.userId : '');
    setCandidate(selectedOption);
  };

  console.log('setcandidate', candidate);

  const AppoinmentSchema = Yup.object().shape({
    voterId: Yup.number().required('Voter ID is required').typeError('Voter ID must be a number'),
    candidateId: Yup.number()
      .required('Candidate ID is required')
      .typeError('Candidate ID must be a number'),
    problemDescription: Yup.string().required('Problem Description is required'),
    appointmentPassStatus: Yup.string().required('Appointment Status is required'),
    // appointmentType: Yup.string().required('Appointment Type is required'),
    // appointmentDate: Yup.date()
    //   .required('Appointment Date is required')
    //   .typeError('Invalid date format'),

    // appointmentPassMeetingLink: Yup.string()
    //   .url('Invalid URL format')
    //   .when('appointmentType', {
    //     is: 'Remote',
    //     then: Yup.string().required(
    //       'Appointment Pass Meeting Link is required for remote appointments'
    //     ),
    //   }),
    // reportingContactNumber: Yup.string()
    //   .matches(/^\d{10}$/, 'Reporting contact number must be exactly 10 digits')
    //   .required('Reporting Contact Number is required'),
    // reportingContactName: Yup.string().required('Reporting Contact Name is required'),
    // reportingContactAddress: Yup.string().required('Reporting Contact Address is required'),
  });

  const body = `Dear Sir/Ma'am,

  I hope this message finds you well. My name is ${user?.UserProfile?.firstName}, and I am a resident of [Your Constituency/Community]. As an engaged and concerned voter, I would like to request an appointment with you to discuss several pressing issues affecting our community.
  
  Specifically, I am interested in addressing the following matters:
  
  [Issue 1: Brief description]
  [Issue 2: Brief description]
  [Issue 3: Brief description]
  
  I believe that your insights and leadership are crucial in finding effective solutions to these concerns. I am available for a meeting at your earliest convenience and can adjust my schedule to accommodate yours. Please let me know a suitable date and time for our meeting.
  
  Thank you for your attention to this request. I look forward to the opportunity to speak with you and contribute to the betterment of our community.
  
  Best regards,
  
   ${user?.UserProfile?.firstName} ${user?.UserProfile?.lastName}
   ${user?.phone || 'No Mobile Number Found'} 
   ${user?.email || 'No Email Found'} 
  `;

  const defaultValues = useMemo(
    () => ({
      voterId: currentappointment?.data.voterId || user?.userId,
      candidateId: currentappointment?.data.candidateId || selectedId,
      problemDescription: currentappointment?.data.problemDescription || body,
      appointmentType: currentappointment?.data.appointmentType || '',
      appointmentTime: currentappointment?.data.appointmentTime || '',
      appointmentDate: currentappointment?.data.appointmentDate || '',
      appointmentPassStatus: currentappointment?.data.appointmentPassStatus || 'open',
      appointmentPassMeetingLink: currentappointment?.data.appointmentPassMeetingLink || '',
      reportingContactNumber: currentappointment?.data.reportingContactNumber || '',
      reportingContactName: currentappointment?.data.reportingContactName || '',
      reportingContactAddress: currentappointment?.data.reportingContactAddress || '',
      slipImageUrl: [],
      pdfImageUrl: currentappointment?.data.pdfImageUrl || '',
    }),
    [currentappointment, user?.userId, selectedId, body]
  );

  // Form Method
  const methods = useForm({
    resolver: yupResolver(AppoinmentSchema),
    defaultValues,
  });
  const {
    reset,
    handleSubmit,
    setValue,
    watch,
    formState: { isSubmitting },
    // control,
  } = methods;
  console.log(defaultValues);
  const values = watch();

  useEffect(() => {
    if (currentappointment) {
      reset(defaultValues);
    }
  }, [currentappointment, defaultValues, reset]);

  useEffect(() => {
    if (currentappointment) {
      setValue('candidateId', currentappointment?.data?.candidateId);
    } else {
      // console.log(selectedId)
      // console.log(defaultValues)
      setValue('candidateId', selectedId);
    }
    // setValue('appointmentType', show);
  }, [selectedId, setValue, currentappointment]);

  const recipient = candidate?.User?.email || 'Select Leader';
  const cc = 'attpl_Traker@gmail.com';
  const subject = 'Request for Appointment to Discuss Local Community Concerns';

  const gmail = (event) => {
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(recipient)}&cc=${encodeURIComponent(cc)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(gmailUrl, '_blank');
  };

  const onSubmit = handleSubmit(async (data) => {
    try {
      console.log('onsubmit');
      const response = await createDesire(data);

      if (response) {
        createNotifications(
          selectedId,
          'voter Created Desire',
          'Desire booking',
          '/dashboard/Desire/list/?status=open'
        );
        enqueueSnackbar('Deisre created successfully', { variant: 'success' });

        navigate(`/dashboard/Desire/list/?status=open`);
      } else {
        enqueueSnackbar('Failed to create Appointment', { variant: 'error' });
      }
    } catch (error) {
      console.error('Error submitting Desire:', error);
      enqueueSnackbar('An error occurred while creating Appointment', { variant: 'error' });
    }
  });

  const onSubmitUpdate = handleSubmit(async (data) => {
    try {
      const response = await updateDesire(appointmentId, data);
      if (response) {
        createNotifications(
          currentappointment?.voterId,
          'candidate confirmed your booked desired',
          'DESIRED CONFIRMED',
          `desire/${currentappointment?.DesireId}/details`
        );
        enqueueSnackbar('Desire updated successfully', { variant: 'success' });
        navigate(`/dashboard/desire/${appointmentId}`);
      } else {
        enqueueSnackbar('Failed to update Desire', { variant: 'error' });
      }
    } catch (error) {
      console.error('Error updating Appointment:', error);
      enqueueSnackbar('An error occurred while updating Appointment', { variant: 'error' });
    }
  });
  const handleSelectionChange = (newValue) => {
    setShow(newValue);
  };
  console.log(handleSelectionChange);

  const TABS = [
    {
      value: 'attplChannel',
      label: 'VIA ATTPL CHANNEL',
    },
    {
      value: 'mailChannel',
      label: 'VIA MAIL CHANNEL',
    },
  ];

  const handleChangeTab = useCallback((event, newValue) => {
    setCurrentTab(newValue);
  }, []);

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
        setValue('pdfImageUrl:', imageUrls);
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
    // if (values.pdfImageUrl:.length > 0) {
    //   const selectedImage = values.pdfImageUrl:.filter((item) => removedFile.name === item.name)
    //   const dataToSend = { 'url': selectedImage[0].preview };
    //   await deleteFileFromAWSS3(dataToSend)
    //     .then((data) => {
    //       const updatedReceiptImageUrl = values.pdfImageUrl:.filter((item) => removedFile.name !== item.name)
    //       setValue('pdfImageUrl:', updatedReceiptImageUrl);
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
    // values.pdfImageUrl:.forEach((file) => {
    //   const urlPreview = file.preview;
    //   urlArr.push(urlPreview);
    // });
    // const dataToSend = { 'urls': urlArr };
    // await deleteFilesFromAWSS3(dataToSend)
    //   .then((data) => {
    //     setValue('slipImageUrl', [], { shouldValidate: true });
    //     setUploadBtn(false);
    //     setValue('pdfImageUrl:', []);
    //     enqueueSnackbar('Deleted successfully', { variant: 'success' });
    //   })
    //   .catch((err) => {
    //     console.error('Error in deleting files:', err);
    //     enqueueSnackbar('Error while deleting', { variant: 'error' });
    //   });
  };

  const renderAttplChannel = (
    <>
      <Grid container spacing={3} sx={{ mt: -5 }}>
        <Grid xs={12} md={8}>
          <Button
            component={RouterLink}
            // to="/dashboard/Appointment/card"
            to="/dashboard"
            variant="outlined"
            color="primary"
            style={{
              textDecoration: 'none',
              width: '150px',
              padding: '3px 5px',
              marginBottom: '10px',
            }}
          >
            {/* Back to card */}
            Back
          </Button>
          {!currentappointment && (
            <Card sx={{ p: 3 }}>
              <FormControl fullWidth>
                <InputLabel id="dropdown-label">Select Your Political Leader</InputLabel>
                <Select
                  labelId="dropdown-label"
                  name="candidateId"
                  id="dropdown"
                  value={selectedValue}
                  onChange={handleChange}
                  label="Select Your political Leader" // Ensure this prop is set
                  fullWidth
                >
                  {candidates?.data?.map((option) => (
                    <MenuItem key={option.userId} value={option?.User?.UserProfile?.firstName}>
                      {option?.User?.UserProfile?.firstName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Card>
          )}
        </Grid>
      </Grid>

      <FormProvider methods={methods} onSubmit={currentappointment ? onSubmitUpdate : onSubmit}>
        <Grid container spacing={3} sx={{ mt: -9 }}>
          <Grid xs={12} md={8}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={3}>
                <TextField
                  label="Describe regarding the subject of your meeting"
                  name="problemDescription"
                  multiline
                  rows={10}
                  fullWidth
                  defaultValue={body}
                />

                <Card>
                  <CardHeader title="Upload Your Desire Images" />
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

                {/* <RHFTextField  n
                ame="problemDescription" label="Reporting Contact Name"   multiline  rows={10}
                  fullWidth/> */}

                <Stack spacing={3}>
                  <RHFAutocomplete
                    name="appointmentType"
                    label="Appointment Type"
                    placeholder="Appointment Type"
                    fullWidth
                    options={['Office', 'Remote'].map((option) => option)}
                    getOptionLabel={(option) => option}
                  />
                  {/* <RHFAutocomplete
                    name="appointmentType"
                    label="Appointment Type"
                    placeholder="Appointment Type"
                    fullWidth
                    value={show}
                    options={['Office', 'Remote'].map((option) => option)}
                    getOptionLabel={(option) => option}
                    onChange={(event, value) => handleSelectionChange(value)}
                    isOptionEqualToValue={(option, value) =>
                      option.toLowerCase() === value.toLowerCase()
                    }
                    /> */}
                  {/* {currentappointment ? ( */}

                  {currentappointment?.data.appointmentType === 'office' && (
                    <>
                      <RHFTextField
                        name="reportingContactNumber"
                        label="Reporting Contact Number"
                      />
                      <RHFTextField name="reportingContactName" label="Reporting Contact Name" />
                      <RHFTextField
                        name="reportingContactAddress"
                        label="Reporting Contact Address"
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
                          )}
                        /> */}

                      {/* <Controller
                          name="appointmentDate"
                          control={control}
                          render={({ field }) => (
                            <DatePicker
                              {...field}
                              label="Appointment Date"
                              renderInput={(params) => <TextField {...params} fullWidth />}
                            />
                          )}
                        /> */}
                      <RHFAutocomplete
                        name="appointmentPassStatus"
                        label="Appointment Status"
                        placeholder="Appointment Status"
                        fullWidth
                        options={['open', 'closed', 'in-progress'].map((option) => option)}
                        getOptionLabel={(option) => option}
                      />
                    </>
                  )}

                  {currentappointment?.data.appointmentType === 'remote' && (
                    <>
                      <RHFTextField
                        name="appointmentPassMeetingLink"
                        label="Appointment Pass Meeting Link"
                      />
                      <RHFAutocomplete
                        name="appointmentStatus"
                        label="Appointment Status"
                        placeholder="Appointment Status"
                        fullWidth
                        options={['open', 'closed', 'in-progress'].map((option) => option)}
                        getOptionLabel={(option) => option}
                      />
                    </>
                  )}
                </Stack>
                {/* ) : null} */}

                <Stack alignItems="flex-end" sx={{ mt: 3 }}>
                  <LoadingButton
                    type="submit"
                    variant="contained"
                    size="large"
                    loading={isSubmitting}
                  >
                    {!currentappointment ? 'Submit' : 'Appointment Link'}
                  </LoadingButton>
                </Stack>
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </FormProvider>
    </>
  );

  const renderMail = (
    <>
      <Stack>
        <Grid container spacing={3} sx={{ mt: -5 }}>
          <Grid xs={12} md={8}>
            <Button
              component={RouterLink}
              // to="/dashboard/Appointment/card"
              to="/dashboard"
              variant="outlined"
              color="primary"
              style={{
                textDecoration: 'none',
                width: '150px',
                padding: '3px 5px',
                marginBottom: '10px',
              }}
            >
              {/* Back to card */}
              Back
            </Button>
            {!currentappointment && (
              <Card sx={{ p: 3 }}>
                <FormControl fullWidth>
                  <InputLabel id="dropdown-label">Select Your Political Leader</InputLabel>
                  <Select
                    labelId="dropdown-label"
                    id="dropdown"
                    value={selectedValue}
                    onChange={handleChange}
                    label="Select Your Political Leader" // Ensure this prop is set
                    fullWidth
                  >
                    {candidates?.data?.map((option) => (
                      <MenuItem key={option.userId} value={option?.User?.UserProfile?.firstName}>
                        {option?.User?.UserProfile?.firstName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Card>
            )}
          </Grid>

          {/* previous */}
          {/* {selectedId && (
            <Grid xs={12} md={8}>
              <Card sx={{ p: 3 }}>
                <Stack
                  direction="column"
                  // alignItems="center"
                >
                  <Stack
                    direction="row"
                    justifyContent="spaceBetween"
                    alignItems="center"
                    //  spacing={3}
                    //  sx={{ p: 3 }}
                  >
                    <StyledLabel>(Reciever) Candidate email:</StyledLabel>
                    <Typography variant="body1">
                      {candidateProfiles?.find((item) => item?.User?.userId === selectedId)?.User
                        ?.email || 'NO Email found on Database'}
                    </Typography>
                    <CopyToClipboard text={textToCopy}>
                      <Tooltip title="Copy to clipboard">
                        <IconButton color="primary">
                          <ContentCopyIcon />
                        </IconButton>
                      </Tooltip>
                    </CopyToClipboard>
                  </Stack>

                  <Stack
                    direction="row"
                    justifyContent="spaceBetween"
                    alignItems="center"
                    //  spacing={3}
                    //  sx={{ p: 3 }}
                  >
                    <StyledLabel>(Tracker) Attpl email:</StyledLabel>
                    <Typography variant="body1">{textToCopy}</Typography>

                    <CopyToClipboard text={textToCopy}>
                      <Tooltip title="Copy to clipboard">
                        <IconButton color="primary">
                          <ContentCopyIcon />
                        </IconButton>
                      </Tooltip>
                    </CopyToClipboard>
                  </Stack>
                </Stack>
              </Card>

              <Stack
                sx={{
                  mt: 4,
                }}
              >
                <SpeedDial
                  direction={smUp ? 'left' : 'up'}
                  ariaLabel="Share post"
                  icon={<Iconify icon="solar:download-bold" />}
                  FabProps={{ size: 'medium' }}
                >
                  {_mails.map((action) => (
                    <SpeedDialAction
                      key={action.name}
                      icon={<Iconify icon={action.icon} sx={{ color: action.color }} />}
                      tooltipTitle={action.name}
                      tooltipPlacement="top"
                      FabProps={{ color: 'default' }}
                      onClick={() => handleClick(action.path)} // Add mailto link
                    />
                  ))}
                </SpeedDial>
              </Stack>
            </Grid>
          )} */}
        </Grid>
      </Stack>

      {/* chceck add */}
      <Grid container spacing={3} sx={{ mt: -9 }}>
        <Grid xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <form
              style={{
                maxWidth: '600px',
                margin: 'auto',
                padding: '16px',
              }}
              noValidate
              autoComplete="off"
            >
              <Typography variant="h4" component="h1" gutterBottom>
                Sample Compose Email
              </Typography>
              <TextField
                required
                id="to"
                label="To"
                variant="outlined"
                fullWidth
                margin="normal"
                // value={email}
                value={candidate?.User?.email || 'No Email Found'}
              />

              <TextField
                id="cc"
                label="CC"
                variant="outlined"
                fullWidth
                margin="normal"
                defaultValue="attpl_Traker@gmail.com"
              />
              <TextField
                required
                id="subject"
                label="Subject"
                variant="outlined"
                fullWidth
                margin="normal"
                defaultValue={subject}
              />
              <TextField
                id="body"
                label="Message"
                multiline
                rows={10}
                variant="outlined"
                fullWidth
                margin="normal"
                defaultValue={body}
              />
              {/* <Button
                variant="contained"
                color="primary"
                type="submit"
                sx={{ mt: 2 }}
                onClick={gmail}
              >
                Send
              </Button> */}

              <Stack alignItems="flex-end" sx={{ mt: 3 }}>
                <LoadingButton
                  variant="contained"
                  size="large"
                  loading={isSubmitting}
                  onClick={gmail}
                >
                  {!currentappointment ? 'Compose Email' : 'create Appointment'}
                </LoadingButton>
              </Stack>
            </form>
          </Card>
        </Grid>
      </Grid>
    </>
  );

  const renderTabs = (
    <>
      {/* <BusinessCareerHero currentTab={currentTab} /> */}
      <Container
        sx={{
          pl: 2,
          pb: 10,
          // pt: { xs: 10, md: 10 },
          position: 'relative',
        }}
      >
        <Box
          gap={10}
          display="grid"
          gridTemplateColumns={{
            xs: 'repeat(1, 1fr)',
            md: 'repeat(1, 1fr)',
          }}
        >
          <Tabs
            value={currentTab}
            onChange={handleChangeTab}
            sx={{
              width: 1,
              bottom: 0,
              zIndex: 9,
              pl: { xs: 0, md: 3 },
              pb: 1,
              borderRadius: 1,
              // position: 'absolute',
              bgcolor: 'background.paper',
              [`& .${tabsClasses.flexContainer}`]: {
                // pr: { md: 3 },
                justifyContent: {
                  sm: 'center',
                  md: 'flex-start',
                },
              },
              '& .MuiTabs-scrollButtons': {
                // Styles for scroll buttons
                color: theme.palette.primary.main, // Change color of scroll buttons
              },
            }}
          >
            {TABS.map((tab) =>
              (tab.value !== 'candidate' && tab.value !== 'editcandidate') ||
              tab.value === 'candidate' ||
              tab.value === 'editcandidate' ? (
                <Tab
                  key={tab.value}
                  value={tab.value}
                  sx={{
                    color: theme.palette.primary.main, // Change the text color to red (you can use any valid CSS color here)
                  }}
                  icon={tab.icon}
                  label={tab.label}
                />
              ) : null
            )}
          </Tabs>
          {currentTab === 'attplChannel' && renderAttplChannel}

          {currentTab === 'mailChannel' && renderMail}
        </Box>
      </Container>
    </>
  );

  return <>{renderTabs}</>;
}

DesireNewEditForm.propTypes = {
  currentappointment: PropTypes.object,
};
