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
import { CardContent } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import CardHeader from '@mui/material/CardHeader';
import LoadingButton from '@mui/lab/LoadingButton';

import { useResponsive } from 'src/hooks/use-responsive';

import { deleteFileFromAWSS3, uploadclaimFileInAWSS3 } from 'src/utils/aws-s3-file-handler';

import { UpdateWork, createWork } from 'src/api/work';

import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { RHFUpload, RHFTextField } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export default function WorkNewEditForm({ currentWork }) {
  const ourWorkId = currentWork?.data.ourWorkId;

  // const [uploadBtn, setUploadBtn] = useState(false);

  // Required Variablesgthdtxtrrsedsr
  const navigate = useNavigate();
  const mdUp = useResponsive('up', 'md');
  const { enqueueSnackbar } = useSnackbar();

  // Form Validation Schema
  const WorkSchema = Yup.object().shape({
    title: Yup.string().required('Title method is required'),
    description: Yup.string().required('Description is required'),
    // imageArr: Yup.array().min(1, 'Receipt image is required'),
    imageDetails: Yup.mixed('Receipt image is required'),
  });

  // Form Values
  const defaultValues = useMemo(
    () => ({
      title: currentWork?.data.title || '',
      description: currentWork?.data.description || '',
      // imageArr: currentWork?.data.imageArr || '',
      imageDetails: currentWork?.data.imageDetails || null,
      // imageUrl: currentWork?.data.imageUrl || '',
    }),
    [currentWork]
  );

  // Form Method
  const methods = useForm({
    resolver: yupResolver(WorkSchema),
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
    if (currentWork) {
      reset(defaultValues);
    }
  }, [currentWork, defaultValues, reset]);

  // upload Image in Server
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

        const response = await uploadclaimFileInAWSS3(formData);
        const imageUrl = response.data && response.data.data ? response.data.data : {};

        if (imageUrl) {
          setValue('imageDetails', imageUrl);
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

  const handdleUploadSingleFile = useCallback(
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

  // Delete image In Server
  const handleRemoveFile = useCallback(async () => {
    // console.log("data",values.imageDetails);
    try {
      const dataToSend = { url: values.imageDetails?.preview };

      const data = await deleteFileFromAWSS3(dataToSend);

      if (data) {
        // console.log(data);
        setValue('imageDetails', null);
      }

      enqueueSnackbar('Deleted successfully', { variant: 'success' });
    } catch (error) {
      console.error('Error in deleting files:', error);
      enqueueSnackbar('Error while deleting', { variant: 'error' });
    }
  }, [setValue, enqueueSnackbar, values.imageDetails]);

  // Function Call for New Category
  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = await createWork(data);

      if (response) {
        enqueueSnackbar('Work created successfully', { variant: 'success' });
        navigate('/dashboard/work');
      } else {
        enqueueSnackbar('Failed to create work', { variant: 'error' });
      }
    } catch (error) {
      // Handle errors here if necessary
      console.error('Error submitting work:', error);
      enqueueSnackbar('An error occurred while creating work', { variant: 'error' });
    }
  });

  // Function Call for Updating Category
  const onSubmitUpdate = handleSubmit(async (data) => {
    // if (!values.imageUrl) {
    //   enqueueSnackbar('Need to upload receipt image', { variant: 'error' });
    //   return;
    // }
    try {
      const response = await UpdateWork(ourWorkId, data);
      // console.log(response);

      if (response) {
        enqueueSnackbar('Category updated successfully', { variant: 'success' });
        navigate(`/dashboard/work/${ourWorkId}`);
      } else {
        enqueueSnackbar('Failed to update Work', { variant: 'error' });
      }
    } catch (error) {
      // Handle errors here if necessary
      console.error('Error updating Work :', error);
      enqueueSnackbar('An error occurred while updating Work ', { variant: 'error' });
    }
  });

  return (
    <FormProvider methods={methods} onSubmit={currentWork ? onSubmitUpdate : onSubmit}>
      <Grid container spacing={3}>
        <Grid xs={12} md={8}>
          <Card>
            {!mdUp && <CardHeader title="Details" />}

            <Stack spacing={3} sx={{ p: 3 }}>
              <RHFTextField name="title" label="Title Name" />

              <Stack spacing={1.5}>
                <RHFTextField name="description" fullWidth label="Description" multiline rows={4} />
              </Stack>
              <Card>
                <CardHeader title="Cover Image" />
                <CardContent>
                  <RHFUpload
                    name="imageDetails"
                    maxSize={8388608}
                    onDrop={handdleUploadSingleFile}
                    onDelete={handleRemoveFile}
                  />
                </CardContent>
              </Card>
            </Stack>
          </Card>
        </Grid>

        {mdUp && <Grid md={4} />}
        <Grid xs={12} md={8} sx={{ display: 'flex', alignItems: 'center' }}>
          <LoadingButton type="submit" variant="contained" size="large" loading={isSubmitting}>
            {!currentWork ? 'Create Work' : 'Save Changes'}
          </LoadingButton>
        </Grid>
      </Grid>
    </FormProvider>
  );
}

WorkNewEditForm.propTypes = {
  currentWork: PropTypes.object,
};
