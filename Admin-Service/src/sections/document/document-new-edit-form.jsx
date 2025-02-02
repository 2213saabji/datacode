/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/img-redundant-alt */
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { capitalize } from 'lodash';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import imageCompression from 'browser-image-compression';
import { useMemo, useState, useEffect, useCallback } from 'react';
import { RouterLink } from 'src/routes/components';
import { Box } from '@mui/system';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import { useTheme } from '@mui/material/styles';
import { Button, Typography, TextField } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

import {
  uploadLMSDOCUMENTFileInAWSS3,
  deleteLMSDOCUMENTFileFromAWSS3,
} from 'src/utils/aws-s3-file-handler';

import { createDocumentDetails, updateDocumentDetails } from 'src/api/document';

import { useSnackbar } from 'src/components/snackbar';
import FormProvider, {
  RHFUpload,
  RHFTextField,
  // RHFAutocomplete,
} from 'src/components/hook-form';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';




export default function DocumentNewEditForm({ currentDriver }) {
  const [fileData, setFileData] = useState({
    name: '',
    url: '',
  });
  const [videoFile, setVideoFile] = useState({
    name: '',
    url: '',
  });
  const navigate = useNavigate();
  const theme = useTheme();
  // const mdUp = useResponsive('up', 'md');
  const [show, setShow] = useState({
    Profile: true,
  });

  console.log(setShow);

  const lawyerId = currentDriver?.data.documentId;

  const { enqueueSnackbar } = useSnackbar();

  //   const formData = {
  //     uploadDate,
  //     created_at: new Date().toISOString(),
  //     updated_at: new Date().toISOString(),
  //   };
  // console.log(formData);
  const [uploadBtn, setUploadBtn] = useState(false);
  const ProfileSchema = Yup.object().shape({});

  const defaultValues = useMemo(
    () => ({
      documentType: currentDriver?.data.documentType || null,
      video: currentDriver?.data.video || null,
      uploadDate: currentDriver?.data.uploadDate || '',
      image: `${currentDriver?.data.image || ''}`,
      documentPdf: `${currentDriver?.data.documentPdf || ''}`,
    }),
    [currentDriver]
  );

  const methods = useForm({
    resolver: yupResolver(ProfileSchema),
    defaultValues,
  });

  const { handleSubmit, reset, setValue, watch } = methods;

  const value = watch();

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
      const response = await createDocumentDetails(data);

      if (response && response.data && response.data.documentId) {
        // Save documentId to session storage
        sessionStorage.setItem('LMSdocumentId', response.data.documentId);

        enqueueSnackbar('Document created successfully', { variant: 'success' });
        navigate('/dashboard/LMS_case/create');
      } else {
        enqueueSnackbar('Failed to create Document', { variant: 'error' });
      }
    } catch (error) {
      console.error('Error submitting Document:', error);
      enqueueSnackbar('An error occurred while creating Documnent', { variant: 'error' });
    }
  });

  const onSubmitProfileUpdate = handleSubmit(async (data) => {
    try {
      const response = await updateDocumentDetails(lawyerId, data);
      if (response) {
        enqueueSnackbar(' Document updated successfully', { variant: 'success' });
        navigate(`/dashboard/LMS_case/create`);
      } else {
        enqueueSnackbar('Failed to update Document', { variant: 'error' });
      }
    } catch (error) {
      console.error('Error updating Document:', error);
      enqueueSnackbar('An error occurred while updating Document', { variant: 'error' });
    }
  });
  const uploadImage = useMemo(
    () => async (file) => {
      try {
        const compressedFile = await imageCompression(file, {
          maxSizeMB: 0.5, // Adjust maximum size as needed
          maxWidthOrHeight: 800, // Adjust maximum width or height as needed
        });

        const formData = new FormData();
        formData.append('image', compressedFile);

        const response = await uploadLMSDOCUMENTFileInAWSS3(formData);
        console.log(response);
        const imageUrl = response.data.data;

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
      await deleteLMSDOCUMENTFileFromAWSS3(dataToSend)
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

  // const [formData, setFormData] = useState({
  //   documentId: '',
  //   documentType: '',
  //   documentPdf: { url: '', name: '' },
  //   image: { url: '', name: '' },
  //   video: { url: '', name: '' },
  //   uploadDate: '',
  //   created_at: '',
  //   updated_at: '',
  // });
  // const handleFileChange = (event, field) => {
  //   const file = event.target.files[0];
  //   if (!file) return;

  //   // Validate file type based on the field
  //   let valid = false;
  //   if (field === 'documentPdf') {
  //     valid = file.type === 'application/pdf';
  //   } else if (field === 'image') {
  //     valid = file.type.startsWith('image/');
  //   } else if (field === 'video') {
  //     valid = file.type.startsWith('video/');
  //   }

  //   if (valid) {
  //     const url = URL.createObjectURL(file); // Generate a temporary URL
  //     setFormData((prevState) => ({
  //       ...prevState,
  //       [field]: { url, name: file.name },
  //     }));
  //   } else {
  //     alert('Invalid file type. Please select a valid file.');
  //   }
  // };
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
  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const videoUrl = URL.createObjectURL(file);
      setVideoFile({
        name: file.name,
        url: videoUrl,
      });

      // Set the video file name in the form for RHFTextField
      setValue('video', file.name);
    }
  };
  return (
    <div>
      {show.Profile && (
        <FormProvider
          methods={methods}
          onSubmit={currentDriver ? onSubmitProfileUpdate : onSubmitProfile}
        >
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Card sx={{ p: 2 }}>
                <Box
                  display="grid"
                  gridTemplateColumns={{
                    xs: 'repeat(1, 1fr)',
                    sm: 'repeat(2, 1fr)',
                  }}
                  gap={2}
                  sx={{ mb: 2 }}
                >
                  {['documentType', 'documentPdf', 'image', 'video'].map((field) => (
                    <RHFTextField
                      key={field}
                      name={field}
                      label={capitalize(field.replace(/([A-Z])/g, ' $1'))}
                      InputProps={{
                        style: {
                          color: theme.palette.mode === 'light' ? 'black' : 'white',
                        },
                      }}
                      InputLabelProps={{
                        style: {
                          color: theme.palette.mode === 'light' ? 'black' : 'white',
                        },
                      }}
                    />
                  ))}
                   <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2" gutterBottom>
                      Upload Date
                    </Typography>
                    <Controller
                      name="uploadDate"
                      control={methods.control}
                      render={({ field }) => (
                        <DatePicker
                          {...field}
                          onChange={(date) => setValue('uploadDate', date)}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              fullWidth
                              sx={{
                                '& .MuiInputBase-input': {
                                  color: theme.palette.text.primary,
                                },
                                '& .MuiInputLabel-root': {
                                  color: theme.palette.text.primary,
                                },
                              }}
                            />
                          )}
                        />
                      )}
                    />
                  </Grid>
              
                </Box>

               

                <Grid container spacing={2} sx={{ mb: 3 }}>
                  <Grid item xs={12}>
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
                  </Grid>
                </Grid>

                <Grid container spacing={2} sx={{ mb: 3 }}>
                  <Grid item xs={12}>
                    <input
                      type="file"
                      accept="video/*"
                      onChange={handleVideoChange}
                      style={{ display: 'none' }}
                      id="video-upload"
                    />
                    {/* <label htmlFor="video-upload">
                      <Button variant="contained" component="span">
                        Upload Video
                      </Button>
                    </label>
                    {videoFile.url && (
                      <div>
                        <Typography variant="body1">Selected Video: {videoFile.name}</Typography>
                        <video
                          src={videoFile.url}
                          controls
                          style={{ maxWidth: '300px', marginTop: '10px' }}
                        />
                      </div> */}
                      <label htmlFor="video-upload">
                      <Button variant="contained" component="span" color="primary" fullWidth>
                        Upload Video
                      </Button>
                    </label>
                    {videoFile.url && (
                      <div style={{ marginTop: '10px' }}>
                        <Typography variant="body1" gutterBottom>
                          Selected Video: {videoFile.name}
                        </Typography>
                        <video
                          src={videoFile.url}
                          controls
                          style={{ maxWidth: '100%', borderRadius: '8px' }}
                        />
                      </div>
                    )}
                  </Grid>
                </Grid>

                <Grid container spacing={2} sx={{ mb: 3 }}>
                  <Grid item xs={12}>
                    <input
                      type="file"
                      accept="application/pdf"
                      onChange={handleFileChanges}
                      style={{ display: 'none' }}
                      id="pdf-upload"
                    />
                    {/* <label htmlFor="pdf-upload">
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
                      </div> */}
                       <label htmlFor="pdf-upload">
                      <Button variant="contained" component="span" color="primary" fullWidth>
                        Upload PDF
                      </Button>
                    </label>
                    {fileData.url && (
                      <div style={{ marginTop: '10px' }}>
                        <Typography variant="body1" gutterBottom>
                          Selected PDF: {fileData.name}
                        </Typography>
                        <a href={fileData.url} target="_blank" rel="noopener noreferrer">
                          <Button variant="outlined" color="primary">
                            Preview PDF
                          </Button>
                        </a>
                      </div>
                    )}
                  </Grid>
                </Grid>

                <Stack direction="row" alignItems="center" spacing={2} sx={{ mt: 3, justifyContent: 'flex-end' }}>
                  {/* <Button variant="outlined" onClick={() => navigate('/dashboard')}>
                    Back
                  </Button> */}
                  <LoadingButton
                    type="submit"
                    variant="contained"
                    onClick={!currentDriver}
                    loading={false}
                  >
                    {!currentDriver ? 'Next' : 'Save Changes'}
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

DocumentNewEditForm.propTypes = {
  currentDriver: PropTypes.object,
};



