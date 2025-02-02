/* eslint-disable jsx-a11y/label-has-associated-control */
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import imageCompression from 'browser-image-compression';
import { useMemo, useState, useEffect, useCallback } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import { useTheme } from '@mui/material/styles';
import LoadingButton from '@mui/lab/LoadingButton';
import { Button, TextField, Typography } from '@mui/material';

import {
  uploadLMSContractInAWSS3,
  deleteLMSContractFromAWSS3,
} from 'src/utils/aws-s3-file-handler';

import {useGetServices} from 'src/api/case'
import { SERVICE_OPTIONS } from 'src/_mock/_service';
import { createContract, updateContract } from 'src/api/contract';

import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { RHFUpload ,RHFTextField, RHFAutocomplete} from 'src/components/hook-form';

export default function ContractNewEditForm({ currentDriver }) {
  const navigate = useNavigate();
  // const { control } = useFormContext();

  const theme = useTheme();
  const [show, setShow] = useState({
    Profile: true,
  });
  console.log(setShow);
  const [fileData, setFileData] = useState({
    name: '',
    url: '',
  });
  const lawyerId = currentDriver?.data.caseId;

  const { enqueueSnackbar } = useSnackbar();
  
 
  
   const {services: serviceList} = useGetServices();
   
   const ServiceListArr = serviceList?.data || [];
   const ServiceData = ServiceListArr.map((list)=>({
    value:list.caseId,
    label:list.caseDetails,
   }))
   const ServiceDataForOptions = ServiceData.map((option)=> option.value)
  
   const [uploadBtn, setUploadBtn] = useState(false);
   const ProfileSchema = Yup.object().shape({
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
      caseId: currentDriver?.data.caseId || '',
      startDate: currentDriver?.data.startDate || '',
      endDate: currentDriver?.data.endDate || '',
      status: currentDriver?.data.status || '',
      paymentAmount: currentDriver?.data.paymentAmount || '',
      contractType: `${currentDriver?.data.contractType || ''}`,
      contractDescription: currentDriver?.data.contractDescription || '',
      contractDocumentImageUrl: currentDriver?.data.contractDocumentImageUrl || '',
      contractDocumentPdf: currentDriver?.data.contractDocumentPdf || '',
      // rating: currentDriver?.data.rating || '',
    }),
    [currentDriver]
  );

  const methods = useForm({
    resolver: yupResolver(ProfileSchema),
    defaultValues,
  });

  const { handleSubmit, reset,setValue,watch} = methods;
  const value = watch();


  useEffect(() => {
    if (currentDriver) {
      reset(defaultValues);
    }
  }, [currentDriver, defaultValues, reset]);

  const onSubmitProfile = handleSubmit(async (data) => {
    try {
      const response = await createContract(data);
       console.log(response);
      if (response) {
        enqueueSnackbar('Lawyer Profile created successfully', { variant: 'success' });
        navigate('/dashboard/LMS_contract');
      } else {
        enqueueSnackbar('Failed to create Contract profile', { variant: 'error' });
      }
    } catch (error) {
      console.error('Error submitting Contract profile:', error);
      enqueueSnackbar('An error occurred while creating Contract profile', { variant: 'error' });
    }
  });

  const onSubmitProfileUpdate = handleSubmit(async (data) => {
    try {
      const response = await updateContract(lawyerId, data);
      if (response) {
        enqueueSnackbar('Lawyer Profile updated successfully', { variant: 'success' });
        navigate(`/dashboard/LMS_contract/${lawyerId}`);
      } else {
        enqueueSnackbar('Failed to update Contract profile', { variant: 'error' });
      }
    } catch (error) {
      console.error('Error updating Contract profile:', error);
      enqueueSnackbar('An error occurred while updating Contract profile', { variant: 'error' });
    }
  });
  const handleFileChanges = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setFileData({
        name: file.name,
        url,
      });

      // Set value in the form for RHFTextField
      setValue('documentPdf', file.name);
    }
  };
  const uploadImage = useMemo(
    () => async (file) => {
      try {
        const compressedFile = await imageCompression(file, {
          maxSizeMB: 0.5, // Adjust maximum size as needed
          maxWidthOrHeight: 800, // Adjust maximum width or height as needed
        });

        const formData = new FormData();
        formData.append('image', compressedFile);

        const response = await uploadLMSContractInAWSS3(formData);
        console.log(response);
        const imageUrl = response.data;

        if (imageUrl) {
          console.log(imageUrl);
          setValue('image', imageUrl);
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
  const handleDropSingleFile = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (file) {
        uploadImage(file);
      }
    },
    [uploadImage]
  );
  const deleteImage = useCallback(
    async (name) => {
      const dataToSend = { url: value[name].preview };
      await deleteLMSContractFromAWSS3(dataToSend)
        .then((data) => {
          setValue(name, null);
          console.log(data);
          enqueueSnackbar('Deleted successfully', { variant: 'success' });
        })
        .catch((err) => {
          console.error('Error in deleting files:', err);
          enqueueSnackbar('Error while deleting', { variant: 'error' });
        });

      // console.log("values.preview =>", values.preview);
    },
    [setValue, enqueueSnackbar, value]
  );
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
                    name="caseId"
                    label="Case Id"
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
                    name="caseId"
                    label="Case Details"
                    options={ServiceDataForOptions}
                    getOptionLabel={(value1) => {
                      const service = ServiceData.find((option) => option.value === value1);
                      return service ? service.label : '';
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Case Details"
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
                  <RHFTextField
                    name="startDate"
                    label="Start Date"
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
                    name="endDate"
                    label="End Date"
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
                    name="status"
                    label="Status"
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
                    name="status"
                    label="Contract Status"
                    placeholder=" Choose Payment Method"
                    fullWidth
                    options={SERVICE_OPTIONS.map((option) => option.label)}
                    getOptionLabel={(option) => option}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Contract Status"
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
                  <RHFTextField
                    name="paymentAmount"
                    label="Payment Amount"
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
                    name="contractType"
                    label="Contract Type"
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
                    name="contractDescription"
                    label="Contract Description"
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
                    name="contractDocumentImageUrl"
                    label="Contract Document Image"
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
                    name="contractDocumentPdf"
                    label="Contract Document Pdf"
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
                   {/* Document Image  */}
                   <Grid
                    container
                    spacing={2}
                    style={{ paddingLeft: 16, paddingRight: 16, paddingTop: 16, paddingBottom: 16 }}
                  >
                    {/* <Grid
                    item
                    xs={8}
                    md={6}
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'flex-start',
                      paddingLeft: 8,
                    }}
                  > */}
                    <Box>
                      <Typography variant="subtitle2">Upload Image</Typography>
                      <RHFUpload
                        thumbnail
                        disabled={uploadBtn}
                        name="image"
                        maxSize={8388608}
                        onDrop={(file) => handleDropSingleFile(file, 'image')}
                        onDelete={() => deleteImage('image')}
                        onRemove={(inputFile) => {
                          setValue(
                            'image',
                            value.licenseNumberBackImage?.filter((file) => file !== inputFile),
                            { shouldValidate: true }
                          );
                          if (value.licenseNumberBackImage?.length === 1) {
                            setUploadBtn(false);
                          }
                        }}
                        onRemoveAll={() => {
                          setValue('image', [], { shouldValidate: true });
                          setUploadBtn(false);
                          setValue('image', '');
                        }}
                      />
                    </Box>
                    {/* </Grid> */}
                  </Grid>
                   {/* Document PDF */}
                   <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <input
                        type="file"
                        accept="application/pdf"
                        onChange={handleFileChanges}
                        style={{ display: 'none' }}
                        id="pdf-upload"
                      />
                      <label htmlFor="pdf-upload">
                        <Button variant="contained" component="span">
                          Upload PDF
                        </Button>
                      </label>
                      {fileData.url && (
                        <div>
                          <Typography variant="body1">Selected PDF: {fileData.name}</Typography>
                          <a href={fileData.url} target="_blank" rel="noopener noreferrer">
                            Preview PDF
                          </a>
                        </div>
                      )}
                    </Grid>
                  </Grid>
                </Box>
                <Stack direction="row" alignItems="center" spacing={2} sx={{ mt: 3 }}>
                  <Button
                    variant="contained"
                    onClick={() => navigate('/dashboard/lawyer/filter')}
                  >
                    Back
                  </Button>
                  <LoadingButton
                    type="submit"
                    variant="contained"
                    onClick={!currentDriver}
                    loading={false}
                  >
                    {!currentDriver ? 'Create contract' : 'Save Changes'}
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

ContractNewEditForm.propTypes = {
  currentDriver: PropTypes.object,
};
