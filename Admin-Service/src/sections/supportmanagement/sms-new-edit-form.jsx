// import AWS from 'aws-sdk';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMemo, useEffect, useCallback } from 'react';
import imageCompression from 'browser-image-compression';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
// import { CardContent } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import LoadingButton from '@mui/lab/LoadingButton';

import { useResponsive } from 'src/hooks/use-responsive';

import { uploadsmsFileInAWSS3 } from 'src/utils/axios-call-sms';

import { createSms, UpdateSms } from 'src/api/sms';
// import {
//   ATTPL_AWS_REGION,
//   ATTPL_AWS_BUCKET,
//   ATTPL_AWS_ACCESS_KEY_ID,
//   ATTPL_AWS_SECRET_ACCESS_KEY,
// } from 'src/config-global';

import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { RHFUpload, RHFTextField, RHFAutocomplete } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export default function SmsNewEditForm({ currentSms }) {
  const navigate = useNavigate();
  // const [uploadBtn, setUploadBtn] = useState(false);
  const mdUp = useResponsive('up', 'md');

  const { enqueueSnackbar } = useSnackbar();

  const smsSchema = Yup.object().shape({
    service_name: Yup.string().required('Service name is required'),
    assignee_id: Yup.number().required('Assign_Id is required'),
    issue_title: Yup.string().required('Sms Title is required'),
    issue_description: Yup.string().required('Description is required'),
    priority: Yup.string().required('Priority is required'),
    issue_status: Yup.string().required('Status is required'),
    imageArr: Yup.array().min(1, 'Receipt image is required'),
  });

  // const userRoleId = parseInt(localStorage.getItem('userRoleId'), 10);

  const defaultValues = useMemo(
    () => ({
      service_name: currentSms?.data.service_name || '',
      issue_title: currentSms?.data.issue_title || '',
      issue_description: currentSms?.data.issue_description || '',
      priority: currentSms?.data.priority || '',
      issue_status: currentSms?.data.issue_status || '',
      customer_id: 1,
      assignee_id: currentSms?.data.assignee_id || '',
      // imageArr: currentSms?.data.imageArr || [],
      issue_image_url: currentSms?.data.issue_image_url || '',
    }),
    [currentSms]
  );

  const methods = useForm({
    resolver: yupResolver(smsSchema),
    defaultValues,
  });

  const {
    reset,
    setValue,
    handleSubmit,
    watch,
    formState: { isSubmitting },
  } = methods;

  const values = watch();
  useEffect(() => {
    if (currentSms) {
      reset(defaultValues);
    }
  }, [currentSms, defaultValues, reset]);

  // const handleDropMultiFile = useCallback(
  //   (acceptedFiles) => {
  //     const files = values.imageArr || [];

  //     const newFiles = acceptedFiles.map((file) =>
  //       Object.assign(file, {
  //         preview: URL.createObjectURL(file),
  //       })
  //     );

  //     setValue('imageArr', [...files, ...newFiles], {
  //       shouldValidate: true,
  //     });
  //   },
  //   [setValue, values.imageArr]
  // );
  // const uploadImage = useMemo(() => async (file) => {
  //   const formData = new FormData();
  //   formData.append('image', file);
  //   console.log("formData", formData);

  //   const response = await uploadUserFileInAWSS3(formData);
  //   const imageUrl = response.data && response.data.data ? response?.data?.data : {};
  //   console.log("imageUrl", imageUrl);

  //   if (imageUrl) {
  //     setValue('imageArr', imageUrl);
  //     enqueueSnackbar('Uploaded successfully', { variant: 'success' });
  //   } else {
  //     console.error('Error in uploading file:', response);
  //     enqueueSnackbar('Error while uploading', { variant: 'error' });
  //   }
  // }, [setValue, enqueueSnackbar]);

  // const uploadFileInAWSS3 = (files) => {
  //   try {
  //     const s3 = new AWS.S3({
  //       accessKeyId: ATTPL_AWS_ACCESS_KEY_ID,
  //       secretAccessKey: ATTPL_AWS_SECRET_ACCESS_KEY,
  //       region: ATTPL_AWS_REGION,
  //       bucket: ATTPL_AWS_BUCKET,
  //     });

  //     let result = '';

  //     // Array to store promises of each upload
  //     const uploadPromises = [];

  //     files.forEach((file) => {
  //       const params = {
  //         Bucket: 'attplgrouppublic',
  //         Key: file.name,
  //         Body: file,
  //         ACL: 'public-read',
  //       };

  //       // Push the promise of each upload into the array
  //       uploadPromises.push(
  //         s3
  //           .upload(params)
  //           .promise()
  //           .then((data) => {
  //             console.log('Upload successful:', data);
  //             result += `${data.Location},`;
  //             console.log('result', result);
  //           })
  //           .catch((error) => {
  //             console.error('Upload failed:', error);
  //             // Handle the error appropriately
  //           })
  //       );
  //     });

  //     // Wait for all uploads to complete
  //     Promise.all(uploadPromises)
  //       .then(() => {
  //         console.log('issue_image_url =>', result);
  //         setValue('issue_image_url', result);
  //         setUploadBtn(true);
  //         enqueueSnackbar('Uploaded successfully', { variant: 'success' });
  //       })
  //       .catch((error) => {
  //         enqueueSnackbar('Error while uploading', { variant: 'error' });
  //         console.error('Error in uploading files:', error);
  //       });
  //   } catch (error) {
  //     console.error('Upload error:', error);
  //   }
  // };

  const uploadImage = useMemo(
    () => async (file) => {
      try {
        const compressedFile = await imageCompression(file, {
          maxSizeMB: 0.5, // Adjust maximum size as needed
          maxWidthOrHeight: 800, // Adjust maximum width or height as needed
        });

        const formData = new FormData();
        formData.append('image', compressedFile);

        const response = await uploadsmsFileInAWSS3(formData);
        // console.log(response)
        const imageUrl = response.data && response.data.data ? response.data.data : {};

        if (imageUrl) {
          setValue('issue_image_url', imageUrl);
          // console.log(imageUrl)
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

  const handleDropPicture = useCallback(
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

  // const handleRemoveFile = useCallback(async () => {
  //   const dataToSend = {
  //     'url': values.issue_image_url.
  //       preview
  //   };
  //   await deleteFileFromAWSS3(dataToSend)
  //     .then((data) => {
  //       setValue('ImageDetails', null);
  //       console.log(data);
  //       enqueueSnackbar('Deleted successfully', { variant: 'success' });
  //     })
  //     .catch((err) => {
  //       console.error('Error in deleting files:', err);
  //       enqueueSnackbar('Error while deleting', { variant: 'error' });
  //     });

  // }, [setValue, enqueueSnackbar, values.issue_image_url]);

  // submit handle
  const onSubmit = handleSubmit(async (data) => {
    // console.log('FJJD')
    if (!values.issue_image_url) {
      enqueueSnackbar('Need to upload receipt image', { variant: 'error' });
      return;
    }

    try {
      const response = await createSms(data);

      if (response) {
        enqueueSnackbar('Sms created successfully', { variant: 'success' });
        navigate(`/dashboard/sms`);
      } else {
        enqueueSnackbar('Failed to create Sms', { variant: 'error' });
      }
    } catch (error) {
      // Handle errors here if necessary
      console.error('Error submitting sms:', error);
      enqueueSnackbar('An error occurred while creating sms', { variant: 'error' });
    }
  });

  // update handle
  const onSubmitUpdate = handleSubmit(async (data) => {
    try {
      const response = await UpdateSms(currentSms.data.issue_id, data);

      if (response) {
        enqueueSnackbar('Updated Sms successfully', { variant: 'success' });
        navigate(`/dashboard/sms/${currentSms.data.issue_id}`);
      } else {
        enqueueSnackbar('Failed to update sms', { variant: 'error' });
      }
    } catch (error) {
      console.error('Error updating sms:', error);
      enqueueSnackbar('An error occurred while updating sms', { variant: 'error' });
    }
  });
  const handleRemoveFile = () => {};
  return (
    <FormProvider methods={methods} onSubmit={currentSms ? onSubmitUpdate : onSubmit}>
      <Grid container spacing={3}>
        <Grid xs={12} md={8}>
          <Card>
            {!mdUp && <CardHeader title="Details" />}

            <Stack spacing={3} sx={{ p: 3 }}>
              <Stack spacing={3} direction="row" alignItems="start">
                <RHFTextField name="service_name" label="Service Name" />
                <RHFTextField name="assignee_id" label="Assign_To" />
              </Stack>
              <RHFTextField name="issue_title" label="Title" />
              <Stack spacing={3} direction="row" alignItems="start">
                <RHFAutocomplete
                  name="priority"
                  label="Priority"
                  placeholder="Choose Priority"
                  fullWidth
                  options={['High', 'Medium', 'Low'].map((option) => option)}
                  getOptionLabel={(option) => option}
                />
                <RHFAutocomplete
                  name="issue_status"
                  label="Status"
                  placeholder="Choose Status"
                  fullWidth
                  options={['Pending', 'Resolve', 'Rejected'].map((option) => option)}
                  getOptionLabel={(option) => option}
                />
              </Stack>
              <RHFTextField
                name="issue_description"
                fullWidth
                label="Description"
                multiline
                rows={4}
              />
              <Stack spacing={1.5}>
                <Typography variant="subtitle2">Image</Typography>
                <RHFUpload
                  name="issue_image_url"
                  maxSize={8388608}
                  onDrop={handleDropPicture}
                  onDelete={handleRemoveFile}
                />
              </Stack>

              {/* <Card>
                <CardHeader title="Cover Image" />
                <CardContent>
                  <RHFUpload
                    multiple
                    thumbnail
                    disabled={uploadBtn}
                    name="imageArr"
                    maxSize={512017}
                    onDrop={handleDropMultiFile}
                    onRemove={(inputFile) => {
                      setValue(
                        'imageArr',
                        values.imageArr && values.imageArr?.filter((file) => file !== inputFile),
                        { shouldValidate: true }
                      );
                      if (values.imageArr.length === 1) {
                        setUploadBtn(false);
                      }
                    }}
                    onRemoveAll={() => {
                      setValue('imageArr', [], { shouldValidate: true });
                      setUploadBtn(false);
                      setValue('issue_image_url', '');
                    }}
                    onUpload={() => uploadFileInAWSS3(values.imageArr)}
                  />
                </CardContent>
              </Card> */}
            </Stack>
          </Card>
        </Grid>

        {mdUp && <Grid md={4} />}
        <Grid xs={12} md={8} sx={{ display: 'flex', alignItems: 'center' }}>
          <LoadingButton type="submit" variant="contained" size="large" loading={isSubmitting}>
            {!currentSms ? 'Create Support Ticket' : 'Save Changes'}
          </LoadingButton>
        </Grid>
      </Grid>
    </FormProvider>
  );
}

SmsNewEditForm.propTypes = {
  currentSms: PropTypes.object,
};

// import AWS from 'aws-sdk';
// import * as Yup from 'yup';
// import PropTypes from 'prop-types';
// import { useForm } from 'react-hook-form';
// import { useNavigate } from 'react-router-dom';
// import { yupResolver } from '@hookform/resolvers/yup';
// import { useMemo, useState, useEffect, useCallback } from 'react';
// import imageCompression from 'browser-image-compression';
// import Card from '@mui/material/Card';
// import Stack from '@mui/material/Stack';
// import { CardContent } from '@mui/material';
// import Grid from '@mui/material/Unstable_Grid2';
// import CardHeader from '@mui/material/CardHeader';
// import LoadingButton from '@mui/lab/LoadingButton';

// import { useResponsive } from 'src/hooks/use-responsive';

// import { createSms, UpdateSms } from 'src/api/sms';
// import {
//   ATTPL_AWS_REGION,
//   ATTPL_AWS_BUCKET,
//   ATTPL_AWS_ACCESS_KEY_ID,
//   ATTPL_AWS_SECRET_ACCESS_KEY,
// } from 'src/config-global';

// import { useSnackbar } from 'src/components/snackbar';
// import FormProvider, { RHFUpload, RHFTextField, RHFAutocomplete } from 'src/components/hook-form';

// // ----------------------------------------------------------------------

// export default function SmsNewEditForm({ currentSms }) {
//   const navigate = useNavigate();
//   const [uploadBtn, setUploadBtn] = useState(false);
//   const mdUp = useResponsive('up', 'md');

//   const { enqueueSnackbar } = useSnackbar();

//   const smsSchema = Yup.object().shape({
//     service_name: Yup.string().required('Service name is required'),
//     assignee_id: Yup.number().required('Assign_Id is required'),
//     issue_title: Yup.string().required('Sms Title is required'),
//     issue_description: Yup.string().required('Description is required'),
//     priority: Yup.string().required('Priority is required'),
//     issue_status: Yup.string().required('Status is required'),
//     imageArr: Yup.array().min(1, 'Receipt image is required'),
//   });

//   // const userRoleId = parseInt(localStorage.getItem('userRoleId'), 10);

//   const defaultValues = useMemo(
//     () => ({
//       service_name: currentSms?.data.service_name || '',
//       issue_title: currentSms?.data.issue_title || '',
//       issue_description: currentSms?.data.issue_description || '',
//       priority: currentSms?.data.priority || '',
//       issue_status: currentSms?.data.issue_status || '',
//       customer_id: 1,
//       assignee_id: currentSms?.data.assignee_id || '',
//       imageArr: currentSms?.data.imageArr || [],
//       issue_image_url: currentSms?.data.issue_image_url || '',
//     }),
//     [currentSms]
//   );

//   const methods = useForm({
//     resolver: yupResolver(smsSchema),
//     defaultValues,
//   });

//   const {
//     reset,
//     setValue,
//     handleSubmit,
//     watch,
//     formState: { isSubmitting },
//   } = methods;

//   const values = watch();
//   useEffect(() => {
//     if (currentSms) {
//       reset(defaultValues);
//     }
//   }, [currentSms, defaultValues, reset]);

//   const handleDropMultiFile = useCallback(
//     (acceptedFiles) => {
//       const files = values.imageArr || [];

//       const newFiles = acceptedFiles.map((file) =>
//         Object.assign(file, {
//           preview: URL.createObjectURL(file),
//         })
//       );

//       setValue('imageArr', [...files, ...newFiles], {
//         shouldValidate: true,
//       });
//     },
//     [setValue, values.imageArr]
//   );
//   // const uploadImage = useMemo(() => async (file) => {
//   //   const formData = new FormData();
//   //   formData.append('image', file);
//   //   console.log("formData", formData);

//   //   const response = await uploadUserFileInAWSS3(formData);
//   //   const imageUrl = response.data && response.data.data ? response?.data?.data : {};
//   //   console.log("imageUrl", imageUrl);

//   //   if (imageUrl) {
//   //     setValue('imageArr', imageUrl);
//   //     enqueueSnackbar('Uploaded successfully', { variant: 'success' });
//   //   } else {
//   //     console.error('Error in uploading file:', response);
//   //     enqueueSnackbar('Error while uploading', { variant: 'error' });
//   //   }
//   // }, [setValue, enqueueSnackbar]);

//   // const uploadFileInAWSS3 = (files) => {
//   //   try {
//   //     const s3 = new AWS.S3({
//   //       accessKeyId: ATTPL_AWS_ACCESS_KEY_ID,
//   //       secretAccessKey: ATTPL_AWS_SECRET_ACCESS_KEY,
//   //       region: ATTPL_AWS_REGION,
//   //       bucket: ATTPL_AWS_BUCKET,
//   //     });

//   //     let result = '';

//   //     // Array to store promises of each upload
//   //     const uploadPromises = [];

//   //     files.forEach((file) => {
//   //       const params = {
//   //         Bucket: 'attplgrouppublic',
//   //         Key: file.name,
//   //         Body: file,
//   //         ACL: 'public-read',
//   //       };

//   //       // Push the promise of each upload into the array
//   //       uploadPromises.push(
//   //         s3
//   //           .upload(params)
//   //           .promise()
//   //           .then((data) => {
//   //             console.log('Upload successful:', data);
//   //             result += `${data.Location},`;
//   //             console.log('result', result);
//   //           })
//   //           .catch((error) => {
//   //             console.error('Upload failed:', error);
//   //             // Handle the error appropriately
//   //           })
//   //       );
//   //     });

//   //     // Wait for all uploads to complete
//   //     Promise.all(uploadPromises)
//   //       .then(() => {
//   //         console.log('issue_image_url =>', result);
//   //         setValue('issue_image_url', result);
//   //         setUploadBtn(true);
//   //         enqueueSnackbar('Uploaded successfully', { variant: 'success' });
//   //       })
//   //       .catch((error) => {
//   //         enqueueSnackbar('Error while uploading', { variant: 'error' });
//   //         console.error('Error in uploading files:', error);
//   //       });
//   //   } catch (error) {
//   //     console.error('Upload error:', error);
//   //   }
//   // };

//   const uploadImage = useMemo(() => async (file) => {
//     try {
//       const compressedFile = await imageCompression(file, {
//         maxSizeMB: 0.5, // Adjust maximum size as needed
//         maxWidthOrHeight: 800, // Adjust maximum width or height as needed
//       });

//       const formData = new FormData();
//       formData.append('image', compressedFile);

//       const response = await uploadclaimFileInAWSS3(formData);
//       const imageUrl = response.data && response.data.data ? response.data.data : {};

//       if (imageUrl) {
//         setValue('ImageDetails', imageUrl);
//         enqueueSnackbar('Uploaded successfully', { variant: 'success' });
//       } else {
//         console.error('Error in uploading file:', response);
//         enqueueSnackbar('Error while uploading', { variant: 'error' });
//       }
//     } catch (error) {
//       console.error('Error compressing image:', error);
//       enqueueSnackbar('Error while compressing image', { variant: 'error' });
//     }
//   }, [setValue, enqueueSnackbar]);

//   const handleDropPicture = useCallback(
//     (acceptedFiles) => {
//       const file = acceptedFiles[0];

//       const newFile = Object.assign(file, {
//         preview: URL.createObjectURL(file),
//       });

//       if (file) {
//         uploadImage(newFile);
//       }
//     },
//     [uploadImage]
//   );

//   const handleRemoveFile = useCallback(async () => {
//     const dataToSend = {
//       'url': values.issue_image_url.
//         preview
//     };
//     await deleteFileFromAWSS3(dataToSend)
//       .then((data) => {
//         setValue('ImageDetails', null);
//         console.log(data);
//         enqueueSnackbar('Deleted successfully', { variant: 'success' });
//       })
//       .catch((err) => {
//         console.error('Error in deleting files:', err);
//         enqueueSnackbar('Error while deleting', { variant: 'error' });
//       });

//   }, [setValue, enqueueSnackbar, values.issue_image_url]);

//   // submit handle
//   const onSubmit = handleSubmit(async (data) => {
//     if (!values.issue_image_url) {
//       enqueueSnackbar('Need to upload receipt image', { variant: 'error' });
//       return;
//     }

//     try {
//       const response = await createSms(data);

//       if (response) {
//         enqueueSnackbar('Sms created successfully', { variant: 'success' });
//         navigate(`/dashboard/sms`);
//       } else {
//         enqueueSnackbar('Failed to create Sms', { variant: 'error' });
//       }
//     } catch (error) {
//       // Handle errors here if necessary
//       console.error('Error submitting sms:', error);
//       enqueueSnackbar('An error occurred while creating sms', { variant: 'error' });
//     }
//   });

//   // update handle
//   const onSubmitUpdate = handleSubmit(async (data) => {
//     try {
//       const response = await UpdateSms(currentSms.data.issue_id, data);

//       if (response) {
//         enqueueSnackbar('Updated Sms successfully', { variant: 'success' });
//         navigate(`/dashboard/sms/${currentSms.data.issue_id}`);
//       } else {
//         enqueueSnackbar('Failed to update sms', { variant: 'error' });
//       }
//     } catch (error) {
//       console.error('Error updating sms:', error);
//       enqueueSnackbar('An error occurred while updating sms', { variant: 'error' });
//     }
//   });

//   return (
//     <FormProvider methods={methods} onSubmit={currentSms ? onSubmitUpdate : onSubmit}>
//       <Grid container spacing={3}>
//         <Grid xs={12} md={8}>
//           <Card>
//             {!mdUp && <CardHeader title="Details" />}

//             <Stack spacing={3} sx={{ p: 3 }}>
//               <Stack spacing={3} direction="row" alignItems="start">
//                 <RHFTextField name="service_name" label="Service Name" />
//                 <RHFTextField name="assignee_id" label="Assign_To" />
//               </Stack>
//               <RHFTextField name="issue_title" label="Title" />
//               <Stack spacing={3} direction="row" alignItems="start">
//                 <RHFAutocomplete
//                   name="priority"
//                   label="Priority"
//                   placeholder="Choose Priority"
//                   fullWidth
//                   options={['High', 'Medium', 'Low'].map((option) => option)}
//                   getOptionLabel={(option) => option}
//                 />
//                 <RHFAutocomplete
//                   name="issue_status"
//                   label="Status"
//                   placeholder="Choose Status"
//                   fullWidth
//                   options={['Panding', 'Resolve', 'Rejected'].map((option) => option)}
//                   getOptionLabel={(option) => option}
//                 />
//               </Stack>
//               <RHFTextField
//                 name="issue_description"
//                 fullWidth
//                 label="Description"
//                 multiline
//                 rows={4}
//               />
//                <Stack spacing={1.5}>
//                 <Typography variant="subtitle2">Image</Typography>
//                 <RHFUpload
//                   name="issue_image_url"
//                   maxSize={8388608}
//                   onDrop={handleDropPicture }
//                   onDelete={handleRemoveFile}
//                 />
//               </Stack>

//               {/* <Card>
//                 <CardHeader title="Cover Image" />
//                 <CardContent>
//                   <RHFUpload
//                     multiple
//                     thumbnail
//                     disabled={uploadBtn}
//                     name="imageArr"
//                     maxSize={512017}
//                     onDrop={handleDropMultiFile}
//                     onRemove={(inputFile) => {
//                       setValue(
//                         'imageArr',
//                         values.imageArr && values.imageArr?.filter((file) => file !== inputFile),
//                         { shouldValidate: true }
//                       );
//                       if (values.imageArr.length === 1) {
//                         setUploadBtn(false);
//                       }
//                     }}
//                     onRemoveAll={() => {
//                       setValue('imageArr', [], { shouldValidate: true });
//                       setUploadBtn(false);
//                       setValue('issue_image_url', '');
//                     }}
//                     onUpload={() => uploadFileInAWSS3(values.imageArr)}
//                   />
//                 </CardContent>
//               </Card> */}
//             </Stack>
//           </Card>
//         </Grid>

//         {mdUp && <Grid md={4} />}
//         <Grid xs={12} md={8} sx={{ display: 'flex', alignItems: 'center' }}>
//           <LoadingButton type="submit" variant="contained" size="large" loading={isSubmitting}>
//             {!currentSms ? 'Create Support Ticket' : 'Save Changes'}
//           </LoadingButton>
//         </Grid>
//       </Grid>
//     </FormProvider>
//   );
// }

// SmsNewEditForm.propTypes = {
//   currentSms: PropTypes.object,
// };
