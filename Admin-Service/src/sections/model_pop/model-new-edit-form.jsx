import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import imageCompression from 'browser-image-compression';
import { useMemo, useState, useEffect, useCallback } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import { CardContent } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import CardHeader from '@mui/material/CardHeader';
import LoadingButton from '@mui/lab/LoadingButton';

import { useResponsive } from 'src/hooks/use-responsive';

import { UpdateModel, createModel } from 'src/api/model';

import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { RHFUpload, RHFTextField } from 'src/components/hook-form';

import { deleteFileFromAWSS3, uploadclaimFileInAWSS3 } from '../../utils/aws-s3-file-handler';

// ----------------------------------------------------------------------

export default function ModelNewEditForm({ currentModel }) {
  const ourModelId = currentModel?.data?.ourWorkId;

  const [uploadBtn, setUploadBtn] = useState(false);

  // Required Variablesgthdtxtrrsedsr
  const navigate = useNavigate();
  const mdUp = useResponsive('up', 'md');
  const { enqueueSnackbar } = useSnackbar();

  // Form Validation Schema
  const ModelSchema = Yup.object().shape({
    title: Yup.string().required('Title method is required'),
    description: Yup.string().required('Description is required'),
    imageDetails: Yup.mixed().nullable().required('Cover is required'),
    status: Yup.string().required('Status'),
  });

  // Form Values
  const defaultValues = useMemo(
    () => ({
      title: currentModel?.data?.title || '',
      description: currentModel?.data?.description || '',
      imageDetails: currentModel?.data?.imageDetails || '',
      status: currentModel?.data?.status || '',
      // imageUrl: currentModel?.data.imageUrl || '',
      // tag: 'modal',
    }),
    [currentModel]
  );

  // Form Method
  const methods = useForm({
    resolver: yupResolver(ModelSchema),
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
  // console.log(values)

  useEffect(() => {
    if (currentModel) {
      reset(defaultValues);
    }
  }, [currentModel, defaultValues, reset]);

  // upload images

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
          // console.log(imageUrl)
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

  // delete image

  const deleteImage = useCallback(async () => {
    const dataToSend = { url: values.imageDetails.preview };
    await deleteFileFromAWSS3(dataToSend)
      .then((data) => {
        setValue('imageDetails', null);
        // console.log(data);
        enqueueSnackbar('Deleted successfully', { variant: 'success' });
      })
      .catch((err) => {
        console.error('Error in deleting files:', err);
        enqueueSnackbar('Error while deleting', { variant: 'error' });
      });

    // console.log("values.preview =>", values.preview);
  }, [setValue, enqueueSnackbar, values.imageDetails]);

  // Function Call for New Category
  const onSubmit = handleSubmit(async (data) => {
    //  console.log('onSubmit');
    try {
      const response = await createModel(data);

      if (response) {
        enqueueSnackbar('model created successfully', { variant: 'success' });
        navigate('/dashboard/model');
      } else {
        enqueueSnackbar('Failed to create model', { variant: 'error' });
      }
    } catch (error) {
      // Handle errors here if necessary
      console.error('Error submitting model:', error);
      enqueueSnackbar('An error occurred while creating model', { variant: 'error' });
    }
  });

  // Function Call for Updating Category
  const onSubmitUpdate = handleSubmit(async (data) => {
    try {
      const response = await UpdateModel(ourModelId, data);
      // console.log(response);

      if (response) {
        enqueueSnackbar('Category updated successfully', { variant: 'success' });
        navigate(`/dashboard/model/${ourModelId}`);
      } else {
        enqueueSnackbar('Failed to update model', { variant: 'error' });
      }
    } catch (error) {
      // Handle errors here if necessary
      console.error('Error updating Model :', error);
      enqueueSnackbar('An error occurred while updating Model ', { variant: 'error' });
    }
  });

  return (
    <FormProvider methods={methods} onSubmit={currentModel ? onSubmitUpdate : onSubmit}>
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
                    // multiple
                    thumbnail
                    disabled={uploadBtn}
                    name="imageDetails"
                    maxSize={8388608}
                    onDrop={handleDropSingleFile}
                    onDelete={deleteImage}
                    onRemove={(inputFile) => {
                      setValue(
                        'imageDetails',
                        values.imageDetails &&
                          values.imageDetails?.filter((file) => file !== inputFile),
                        { shouldValidate: true }
                      );
                      if (values.imageDetails.length === 1) {
                        setUploadBtn(false);
                      }
                    }}
                    onRemoveAll={() => {
                      setValue('imageDetails', [], { shouldValidate: true });
                      setUploadBtn(false);
                      setValue('imageUrl', '');
                    }}
                  />
                </CardContent>
              </Card>
            </Stack>
          </Card>
        </Grid>

        {mdUp && <Grid md={4} />}
        <Grid xs={12} md={8} sx={{ display: 'flex', alignItems: 'center' }}>
          <LoadingButton type="submit" variant="contained" size="large" loading={isSubmitting}>
            {!currentModel ? 'Create Model' : 'Save Changes'}
          </LoadingButton>
        </Grid>
      </Grid>
    </FormProvider>
  );
}

ModelNewEditForm.propTypes = {
  currentModel: PropTypes.object,
};
