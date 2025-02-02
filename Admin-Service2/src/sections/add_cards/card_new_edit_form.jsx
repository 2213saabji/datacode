/* eslint-disable no-unused-vars */
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMemo, useState, useCallback } from 'react';
import imageCompression from 'browser-image-compression';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';

// import FormControlLabel from '@mui/material/FormControlLabel';

import { useTheme } from '@mui/material/styles';
import { Grid, Alert, Snackbar } from '@mui/material';

import { uploadTMSFileInAWSS3, deleteTMSFileFromAWSS3 } from 'src/utils/aws-s3-file-handler';

import { createCard } from 'src/api/blog';

import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { RHFUpload, RHFTextField } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export default function CardsNewEditForm() {
  const [loading, setLoading] = useState(false);

  const [uploadBtn, setUploadBtn] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const theme = useTheme();

  // default value
  const defaultValues = useMemo(
    () => ({
      routeName: '',
      routeTypeName: '',
      subRouteTypes: '',
      cardName: '',
      cardDescription: '',
      cardUrl: '',
      cardImage: null,
    }),
    []
  );

  // schema
  const NewJobSchema = Yup.object().shape({
    routeName: Yup.string().required('Card Route is required'),
    routeTypeName: Yup.string().required('Card Route Type is required'),
    subRouteTypes: Yup.string().required('Card Sub Route Name is required'),
    cardName: Yup.string().required('Card Title is required'),
    cardDescription: Yup.string().required('Card Description is required'),
    cardUrl: Yup.string().required('Card URL is required'),
    cardImage: Yup.mixed('Card Image is required'),
  });

  const methods = useForm({
    resolver: yupResolver(NewJobSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    watch,
    setValue,
    formState: { isSubmitting },
  } = methods;

  const value = watch();

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

        const response = await uploadTMSFileInAWSS3(formData);
        console.log(response);
        const imageUrl = response.data.data;

        if (imageUrl) {
          console.log(imageUrl);
          setValue('cardImage', imageUrl);
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

  const deleteImage = useCallback(async () => {
    const dataToSend = { url: value.imageDetails.preview };
    await deleteTMSFileFromAWSS3(dataToSend)
      .then((data) => {
        setValue('imageDetails', null);
        console.log(data);
        enqueueSnackbar('Deleted successfully', { variant: 'success' });
      })
      .catch((err) => {
        console.error('Error in deleting files:', err);
        enqueueSnackbar('Error while deleting', { variant: 'error' });
      });

    // console.log("values.preview =>", values.preview);
  }, [setValue, enqueueSnackbar, value.imageDetails]);

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
    try {
      const res = await createCard(data);
      if (res.success) {
        enqueueSnackbar('Card Added Successfully.', { variant: 'success' });
        reset();
      } else {
        enqueueSnackbar('Error While Card adding', { variant: 'error' });
      }
      console.log(res);
    } catch (error) {
      console.log(error);
      enqueueSnackbar('Error While Card adding', { variant: 'error' });
    }
  });

  const renderDetails = (
    <Grid sx={{ p: 1 }}>
      {[
        { name: 'routeName', label: 'Card Route Name' },
        { name: 'routeTypeName', label: 'Card Route Type Name' },
        { name: 'subRouteTypes', label: 'Card Sub Route Type' },
        { name: 'cardName', label: 'Card Sub Route Type' },
        { name: 'cardDescription', label: 'Card Description' },
        { name: 'cardUrl', label: 'Card URL' },
      ].map(({ name, label }) => (
        <Stack key={name} spacing={1.5}>
          <Typography variant="subtitle2">{label}</Typography>
          <RHFTextField
            name={name}
            placeholder={label}
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
        </Stack>
      ))}

      <Stack spacing={1.5}>
        <Typography variant="subtitle2">Card Image</Typography>
        <RHFUpload
          thumbnail
          disabled={uploadBtn}
          name="cardImage"
          maxSize={8388608}
          onDrop={handleDropSingleFile}
          onDelete={deleteImage}
          onRemove={(inputFile) => {
            setValue(
              'cardImage',
              value.cardImage?.filter((file) => file !== inputFile),
              { shouldValidate: true }
            );
            if (value.imageDetails?.length === 1) {
              setUploadBtn(false);
            }
          }}
          onRemoveAll={() => {
            setValue('cardImage', [], { shouldValidate: true });
            setUploadBtn(false);
            setValue('cardImage', '');
          }}
        />
      </Stack>
    </Grid>
  );

  const renderActions = (
    <Grid>
      <LoadingButton
        type="submit"
        variant="contained"
        size="large"
        loading={isSubmitting}
        sx={{ bgcolor: theme.palette.primary.main }}
        // disabled={buttonDisable}
      >
        Add New Card
      </LoadingButton>
    </Grid>
  );

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Snackbar
        open={loading}
        autoHideDuration={null}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert severity="warning" variant="standard">
          Please Wait, Location Fetching...
        </Alert>
      </Snackbar>

      <Grid spacing={3} container justifyContent="center">
        <Grid item md={10} xs={12}>
          <Card>
            {renderDetails}
            {renderActions}
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
