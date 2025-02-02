/* eslint-disable import/no-unresolved */
// /* eslint-disable import/no-unresolved */
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useMemo, useState, useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import { useTheme } from '@mui/material/styles';
import { Button, TextField } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

import { useGetLawyers } from 'src/api/lawyer';
import { useGetDocuments } from 'src/api/document';
import { useGetSubServices } from 'src/api/sub-service';
import { useGetClientDetails } from 'src/api/clientDetails';
import { createCaseDetails, updateCaseDetails } from 'src/api/case';

import { useSnackbar } from 'src/components/snackbar';
import FormProvider, {
  RHFTextField,
  RHFAutocomplete,
  // RHFAutocomplete,
} from 'src/components/hook-form';

export default function CaseNewEditForm({ currentDriver }) {
  const navigate = useNavigate();
  const theme = useTheme();
  const [show, setShow] = useState({
    Profile: true,
  });
  console.log(setShow);

  const lawyerId = currentDriver?.data.providerId;

  const { enqueueSnackbar } = useSnackbar();

  const { lawyers: lawyerList } = useGetLawyers();
  const LawyerListArr = lawyerList?.data || [];
  const LawyerData = LawyerListArr.map((list) => ({
    value: list.providerId,
    label: list.providerName,
  }));
  console.log(LawyerData);
  const LawyerDataForOptions = LawyerData.map((option) => option.value);

  const { clients: clientList } = useGetClientDetails();
  const ClientListArr = clientList?.data || [];
  const ClientData = ClientListArr.map((list) => ({
    value: list.userId,
    label: list.userId,
  }));

  const ClientDataForOptions = ClientData.map((option) => option.value);

  const { subservices: subserviceList } = useGetSubServices();
  const SubServiceListArr = subserviceList?.data || [];
  const SubServiceData = SubServiceListArr.map((list) => ({
    value: list.issueId,
    label: list.issueType,
  }));
  const SubServiceDataForOptions = SubServiceData.map((option) => option.value);
  console.log(SubServiceData);

  const { documents: documentList } = useGetDocuments();
  const DocumentListArr = documentList?.data || [];
  const DocumentData = DocumentListArr.map((list) => ({
    value: list.documentId,
    label: list.documentType,
  }));
  const DocumentDataForOptions = DocumentData.map((option) => option.value);

  const ProfileSchema = Yup.object().shape({
    caseApprovalDate: Yup.date().required('Case Approval Date is required'),
    deadline: Yup.date().required('Deadline is required'),
    // userRegistrationId: Yup.string().required('User Registration Id is required'),
    // userId: Yup.number().required('UserName is Required'),
    // serviceId:Yup.number().required('Service is Required'),
    // userFullName:Yup.string().required('Full Name is required'),
    // issueId:Yup.number().required('Issue Details ID required'),
    // email: Yup.string()
    //   .required('User')
    //   .required('Email is required')
    //   .email('Email must be a valid email address'),
    //   experienceLevel: Yup.string().required('Experience Level is required'),
    //   registrationNumber: Yup.string().required('registrationNumber is required'),
    //   registrationImageUrl: Yup.string().required('Registration Image Url is required'),
    //   serviceArea: Yup.string().required('Service Area is required'),
    //   licenseCertification: Yup.string().required('licenseCertification is required'),
    //   serviceDescription: Yup.string().required('Service Description is required'),
    //   rating: Yup.string().required('Rating is required'),
  });

  const defaultValues = useMemo(
    () => ({
      providerId: currentDriver?.data.providerId || '',
      clientsId: currentDriver?.data.clientsId || null,
      issueId: currentDriver?.data.issueId || '',
      caseDetails: currentDriver?.data.caseDetails || '',
      documentId: currentDriver?.data.documentId || '',
      caseStatus: currentDriver?.data.caseStatus || 'upcoming',
      caseApprovalDate: currentDriver?.data.caseApprovalDate || '',
      caseNotes: currentDriver?.data.caseNotes || '',
      deadline: currentDriver?.data.deadline || '',
      urgency: currentDriver?.data.urgency || '',
      feedback: currentDriver?.data.feedback || '',
    }),
    [currentDriver]
  );

  const methods = useForm({
    resolver: yupResolver(ProfileSchema),
    defaultValues,
  });

  const { handleSubmit, reset, setValue } = methods;

  // Add this useEffect to retrieve documentId from session storage
  useEffect(() => {
    const sessionDocumentId = sessionStorage.getItem('LMSdocumentId');
    if (sessionDocumentId) {
      setValue('documentId', sessionDocumentId); // Set documentId from session storage
    }
    console.log(sessionDocumentId);
  }, [setValue]);

  useEffect(() => {
    if (lawyerId) {
      setValue('providerId', lawyerId); // Set providerId value from the id prop
    }
  }, [lawyerId, setValue]);

  useEffect(() => {
    if (currentDriver) {
      reset(defaultValues);
    }
  }, [currentDriver, defaultValues, reset]);

  const onSubmitProfile = handleSubmit(async (data) => {
    try {
      const response = await createCaseDetails(data);

      if (response) {
        enqueueSnackbar('Case created successfully', { variant: 'success' });
        navigate('/dashboard/LMS_case');
      } else {
        enqueueSnackbar('Failed to create Case', { variant: 'error' });
      }
    } catch (error) {
      console.error('Error submitting Case:', error);
      enqueueSnackbar('An error occurred while creating Case', { variant: 'error' });
    }
  });

  const onSubmitProfileUpdate = handleSubmit(async (data) => {
    try {
      const response = await updateCaseDetails(lawyerId, data);
      if (response) {
        enqueueSnackbar('Case updated successfully', { variant: 'success' });
        navigate(`/dashboard/LMS_case/${lawyerId}`);
      } else {
        enqueueSnackbar('Failed to update Case', { variant: 'error' });
      }
    } catch (error) {
      console.error('Error updating Lawyer profile:', error);
      enqueueSnackbar('An error occurred while updating Case', { variant: 'error' });
    }
  });

  return (
    <div>
      {show.Profile && (
        <FormProvider
          methods={methods}
          onSubmit={currentDriver ? onSubmitProfileUpdate : onSubmitProfile}
        >
          <Grid container spacing={3}>
            <Grid xs={12} md={8}>
              <Card sx={{ p: 3 }}>
                <Box
                  rowGap={3}
                  columnGap={2}
                  display="grid"
                  gridTemplateColumns={{
                    xs: 'repeat(1, 1fr)',
                    sm: 'repeat(2, 1fr)',
                  }}
                >
                  {/* <RHFTextField
                    name="providerId"
                    label="Provider Id"
                    InputProps={{
                      style: {
                        color: theme.palette.mode === 'light' ? 'black' : 'white',
                        fontSize: '35px',
                      },
                    }}
                    InputLabelProps={{
                      style: {
                        color: theme.palette.mode === 'light' ? 'black' : 'white',
                      },
                    }}
                  /> */}
                  <RHFAutocomplete
                    name="providerId"
                    label="Provider Name"
                    options={LawyerDataForOptions}
                    getOptionLabel={(value) => {
                      const service = LawyerData.find((option) => option.value === value);
                      return service ? service.label : '';
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Provider Name"
                        InputProps={{
                          ...params.InputProps,
                          style: {
                            color: theme.palette.mode === 'light' ? 'black' : 'white',
                            fontSize: '35px',
                          },
                        }}
                        InputLabelProps={{
                          style: {
                            color: theme.palette.mode === 'light' ? 'black' : 'white',
                          },
                        }}
                      />
                    )}
                  />

                  <RHFAutocomplete
                    name="clientsId"
                    label="Clients Id"
                    options={ClientDataForOptions}
                    getOptionLabel={(value) => {
                      const service = ClientData.find((option) => option.value === value);
                      return service ? service.label : '';
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Clients Id"
                        InputProps={{
                          ...params.InputProps,
                          style: {
                            color: theme.palette.mode === 'light' ? 'black' : 'white',
                            fontSize: '35px',
                          },
                        }}
                        InputLabelProps={{
                          style: {
                            color: theme.palette.mode === 'light' ? 'black' : 'white',
                          },
                        }}
                      />
                    )}
                  />

                  <RHFAutocomplete
                    name="issueId"
                    label="Issue Name"
                    options={SubServiceDataForOptions}
                    getOptionLabel={(value3) => {
                      const service = SubServiceData.find((option) => option.value === value3);
                      return service ? service.label : '';
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Issue Name"
                        InputProps={{
                          ...params.InputProps,
                          style: {
                            color: theme.palette.mode === 'light' ? 'black' : 'white',
                            fontSize: '35px',
                          },
                        }}
                        InputLabelProps={{
                          style: {
                            color: theme.palette.mode === 'light' ? 'black' : 'white',
                          },
                        }}
                      />
                    )}
                  />

                  {/* <RHFAutocomplete
                    name="documentId"
                    label="Document Name"
                    options={DocumentDataForOptions}
                    getOptionLabel={(value3) => {
                      const service = DocumentData.find((option) => option.value === value3);
                      return service ? service.label : '';
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Docuemnt Name"
                        InputProps={{
                          ...params.InputProps,
                          style: {
                            color: theme.palette.mode === 'light' ? 'black' : 'white',
                            fontSize: '35px',
                          },
                        }}
                        InputLabelProps={{
                          style: {
                            color: theme.palette.mode === 'light' ? 'black' : 'white',
                          },
                        }}
                      />
                    )}
                  /> */}
                  {/* <RHFAutocomplete
                    name="caseStatus"
                    label="Case Status"
                    placeholder=" Choose Payment Method"
                    fullWidth
                    options={SERVICE_OPTIONS.map((option) => option.label)}
                    getOptionLabel={(option) => option}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Case Status"
                        InputProps={{
                          ...params.InputProps,
                          style: {
                            color: theme.palette.mode === 'light' ? 'black' : 'white',
                            fontSize: '35px',
                          },
                        }}
                        InputLabelProps={{
                          style: {
                            color: theme.palette.mode === 'light' ? 'black' : 'white',
                          },
                        }}
                      />
                    )}
                  /> */}

                  {/* <RHFTextField
                    name="caseDetails"
                    label="Case Details"
                    InputProps={{  
                      style: {
                        color: theme.palette.mode === 'light' ? 'black' : 'white',
                        fontSize: '35px',
                      },
                    }}
                    InputLabelProps={{
                      style: {
                        color: theme.palette.mode === 'light' ? 'black' : 'white',
                      },
                    }}
                  /> */}
                  <RHFTextField
                    name="caseDetails"
                    label="Case Details"
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={4}
                    sx={{ 
                      '& .MuiInputLabel-root': { color: theme.palette.text.secondary },
                      '& .MuiOutlinedInput-root': { 
                        '& fieldset': { borderColor: theme.palette.divider },
                        '&:hover fieldset': { borderColor: theme.palette.primary.main },
                        '&.Mui-focused fieldset': { borderColor: theme.palette.primary.main },
                      },
                    }}
                  />
                  {/* <RHFTextField */}
                  {/* <DatePicker
                    name="caseApprovalDate"
                    label="Case Approval Date"
                    InputProps={{
                      style: {
                        color: theme.palette.mode === 'light' ? 'black' : 'white',
                        fontSize: '35px',
                      },
                    }}
                    InputLabelProps={{
                      style: {
                        color: theme.palette.mode === 'light' ? 'black' : 'white',
                      },
                    }}
                  /> */}
                  {/* <RHFTextField
                    name="deadline"
                    label="Deadline"
                    InputProps={{
                      style: {
                        color: theme.palette.mode === 'light' ? 'black' : 'white',
                        fontSize: '35px',
                      },
                    }}
                    InputLabelProps={{
                      style: {
                        color: theme.palette.mode === 'light' ? 'black' : 'white',
                      },
                    }}
                  />

                  <RHFTextField
                    name="caseNotes"
                    label="Case Notes"
                    InputProps={{
                      style: {
                        color: theme.palette.mode === 'light' ? 'black' : 'white',
                        fontSize: '35px',
                      },
                    }}
                    InputLabelProps={{
                      style: {
                        color: theme.palette.mode === 'light' ? 'black' : 'white',
                      },
                    }}
                  /> */}
                   <RHFTextField
                    name="deadline"
                    label="Deadline"
                    variant="outlined"
                    fullWidth
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    sx={{ 
                      '& .MuiInputLabel-root': { color: theme.palette.text.secondary },
                      '& .MuiOutlinedInput-root': { 
                        '& fieldset': { borderColor: theme.palette.divider },
                        '&:hover fieldset': { borderColor: theme.palette.primary.main },
                        '&.Mui-focused fieldset': { borderColor: theme.palette.primary.main },
                      },
                    }}
                  />

                  <RHFTextField
                    name="caseNotes"
                    label="Case Notes"
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={3}
                    sx={{ 
                      '& .MuiInputLabel-root': { color: theme.palette.text.secondary },
                      '& .MuiOutlinedInput-root': { 
                        '& fieldset': { borderColor: theme.palette.divider },
                        '&:hover fieldset': { borderColor: theme.palette.primary.main },
                        '&.Mui-focused fieldset': { borderColor: theme.palette.primary.main },
                      },
                    }}
                  />

                  

                  {/* <RHFTextField */}
                  {/* <DatePicker
                    name="deadline"
                    label="Deadline"
                    InputProps={{
                      style: {
                        color: theme.palette.mode === 'light' ? 'black' : 'white',
                        fontSize: '35px',
                      },
                    }}
                    InputLabelProps={{
                      style: {
                        color: theme.palette.mode === 'light' ? 'black' : 'white',
                      },
                    }}
                  /> */}
                  {/* <RHFTextField
                    name="caseApprovalDate"
                    label="Case Approval Date"
                    InputProps={{
                      style: {
                        color: theme.palette.mode === 'light' ? 'black' : 'white',
                        fontSize: '35px',
                      },
                    }}
                    InputLabelProps={{
                      style: {
                        color: theme.palette.mode === 'light' ? 'black' : 'white',
                      },
                    }}
                  /> */}
                  <RHFTextField
                    name="caseApprovalDate"
                    label="Case Approval Date"
                    variant="outlined"
                    fullWidth
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    sx={{ 
                      '& .MuiInputLabel-root': { color: theme.palette.text.secondary },
                      '& .MuiOutlinedInput-root': { 
                        '& fieldset': { borderColor: theme.palette.divider },
                        '&:hover fieldset': { borderColor: theme.palette.primary.main },
                        '&.Mui-focused fieldset': { borderColor: theme.palette.primary.main },
                      },
                    }}
                  />

                  <RHFTextField
                    name="urgency"
                    label="Urgency"
                    InputProps={{
                      style: {
                        color: theme.palette.mode === 'light' ? 'black' : 'white',
                        fontSize: '35px',
                      },
                    }}
                    InputLabelProps={{
                      style: {
                        color: theme.palette.mode === 'light' ? 'black' : 'white',
                      },
                    }}
                  />
                  {/* <FormControl fullWidth>
                    <InputLabel id="urgency-label">Urgency</InputLabel>
                    <Select
                      labelId="urgency-label"
                      id="urgency"
                      name="urgency"
                      value={value1.urgency || ''}
                      onChange={(e) => setValue('urgency', e.target.value)}
                      inputProps={{
                        style: {
                          color: theme.palette.mode === 'light' ? 'black' : 'white',
                          fontSize: '35px',
                        },
                      }}
                      label="Urgency"
                    >
                      <MenuItem value="High">High</MenuItem>
                      <MenuItem value="Medium">Medium</MenuItem>
                      <MenuItem value="Low">Low</MenuItem>
                    </Select>
                  </FormControl> */}

                  <RHFTextField
                    name="feedback"
                    label="Feedback"
                    InputProps={{
                      style: {
                        color: theme.palette.mode === 'light' ? 'black' : 'white',
                        fontSize: '35px',
                      },
                    }}
                    InputLabelProps={{
                      style: {
                        color: theme.palette.mode === 'light' ? 'black' : 'white',
                      },
                    }}
                  />

                  {/* <RHFTextField
                    name="approvalStatus"
                    label="Approval Status"
                    InputProps={{
                      style: {
                        color: theme.palette.mode === 'light' ? 'black' : 'white',
                        fontSize: '35px',
                      },
                    }}
                    InputLabelProps={{
                      style: {
                        color: theme.palette.mode === 'light' ? 'black' : 'white',
                      },
                    }}
                  /> */}
                </Box>

                <Stack direction="row" alignItems="center" spacing={2} sx={{ mt: 3 }}>
                  <Button
                    variant="contained"
                    onClick={() => {
                      const sessionDocumentId = sessionStorage.getItem('LMSdocumentId');
                      navigate(`/dashboard/LMS_document/${sessionDocumentId}/edit`);
                    }}
                  >
                    Back
                  </Button>
                  <LoadingButton
                    type="submit"
                    variant="contained"
                    onClick={!currentDriver}
                    loading={false}
                  >
                    {!currentDriver ? 'Create Case' : 'Save Changes'}
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

CaseNewEditForm.propTypes = {
  currentDriver: PropTypes.object,
};




