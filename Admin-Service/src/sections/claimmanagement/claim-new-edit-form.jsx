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
import { useTheme } from '@mui/material/styles';
import CardHeader from '@mui/material/CardHeader';
import LoadingButton from '@mui/lab/LoadingButton';
import { CardContent, InputAdornment } from '@mui/material';

import { useResponsive } from 'src/hooks/use-responsive';

import { _paymentMethods } from 'src/_mock';
import { useGetCategories } from 'src/api/exp_category';
import { createClaim, createImageClaim } from 'src/api/exp_claim';

import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { RHFUpload, RHFTextField, RHFAutocomplete } from 'src/components/hook-form';

import {
  deleteFileFromAWSS3,
  deleteFilesFromAWSS3,
  uploadclaimFilesInAWSS3,
} from '../../utils/aws-s3-file-handler';

// ----------------------------------------------------------------------

export default function ClaimNewEditForm({ currentClaim }) {
  // fetching the categories data for their id
  const theme = useTheme();
  const { categories: CategoryList } = useGetCategories();

  const CategoryListArr = CategoryList?.data || [];

  const CategoryData = CategoryListArr.map((list) => ({
    value: list.expenseCategoryId,
    label: list.expenseCategoryName,
  }));

  const CategoryDataForOptions = CategoryData.map((option) => option.value);

  const [uploadBtn, setUploadBtn] = useState(false);

  const [claimId, setClaimId] = useState(null);

  // Required Variablesgthdtxtrrsedsr
  const navigate = useNavigate();
  const mdUp = useResponsive('up', 'md');
  const { enqueueSnackbar } = useSnackbar();

  const [isHidden, setIsHidden] = useState(true);

  let slipImageUrlSchema = Yup.array().notRequired(); // Default schema when isHidden is true

  if (!isHidden) {
    slipImageUrlSchema = Yup.array().min(1, 'Receipt image is required');
  }

  // Form Validation Schema
  const ClaimSchema = Yup.object().shape({
    expenseCategoryId: Yup.number().required('Category name is required'),
    amount: Yup.number().required('Amount is required'),
    paymentMethod: Yup.string().required('Payment method is required'),
    purchaseDate: Yup.string().required('Purchase date is required'),
    description: Yup.string().required('Description is required'),
    slipImageUrl: slipImageUrlSchema,
  });

  // Form Values
  const defaultValues = useMemo(
    () => ({
      expenseCategoryId: currentClaim?.data.expenseCategoryId || null,
      amount: currentClaim?.data.amount || null,
      paymentMethod: currentClaim?.data.paymentMethod || '',
      purchaseDate: currentClaim?.data.purchaseDate || '',
      description: currentClaim?.data.description || '',
      slipImageUrl: [],
      receiptImageUrl: currentClaim?.data.receiptImageUrl || [],
    }),
    [currentClaim]
  );

  // Form Method
  const methods = useForm({
    resolver: yupResolver(ClaimSchema),
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
    if (currentClaim) {
      reset(defaultValues);
    }
  }, [currentClaim, defaultValues, reset]);

  // Handle Multiple Image Upload

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

  // Function Call for Image Upload in BackEnd
  const onSubmit = handleSubmit(async () => {
    if (values.receiptImageUrl.length === 0) {
      enqueueSnackbar('Need to upload receipt image', { variant: 'error' });
      return;
    }

    try {
      const claimReceiptDetails = values.receiptImageUrl.map((item) => ({
        receiptImageDetails: item,
        expenseClaimId: claimId,
      }));

      const response = await createImageClaim({ claimReceiptDetails });

      if (response) {
        enqueueSnackbar('Receipt Image uploaded successfully', { variant: 'success' });
        navigate('/dashboard/claim');
      } else {
        enqueueSnackbar('Failed to upload Receipt Image', { variant: 'error' });
      }
    } catch (error) {
      // Handle errors here if necessary
      console.error('Error submitting claim:', error);
      enqueueSnackbar('An error occurred while uploading Receipt Image', { variant: 'error' });
    }
  });

  // Function Call for Creating claim
  const onSubmitFirst = handleSubmit(async (data) => {
    try {
      const response = await createClaim(data);

      if (response) {
        setClaimId(response.data.expenseClaimId);
        enqueueSnackbar('Claim created successfully', { variant: 'success' });
        setIsHidden(false);
      } else {
        enqueueSnackbar('Failed to create claim', { variant: 'error' });
      }
    } catch (error) {
      // Handle errors here if necessary
      console.error('Error submitting claim:', error);
      enqueueSnackbar('An error occurred while creating claim', { variant: 'error' });
    }
  });

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

      const response = await uploadclaimFilesInAWSS3(formData);
      const imageUrls =
        response.data && response.data.data && response.data.data.length
          ? response?.data?.data
          : [];

      if (imageUrls.length > 0) {
        setValue('receiptImageUrl', imageUrls);
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
    const removedFileIndex = values.slipImageUrl.findIndex(
      (file) => file.name === removedFile.name && file.preview === removedFile.preview
    );

    if (values.receiptImageUrl.length > 0) {
      const selectedImage = values.receiptImageUrl.filter((item) => removedFile.name === item.name);

      const dataToSend = { url: selectedImage[0].preview };
      await deleteFileFromAWSS3(dataToSend)
        .then((data) => {
          const updatedReceiptImageUrl = values.receiptImageUrl.filter(
            (item) => removedFile.name !== item.name
          );
          setValue('receiptImageUrl', updatedReceiptImageUrl);
          setValue(
            'slipImageUrl',
            values.slipImageUrl.filter((_, index) => index !== removedFileIndex),
            { shouldValidate: true }
          );

          enqueueSnackbar('Deleted successfully', { variant: 'success' });
        })
        .catch((err) => {
          console.error('Error in deleting files:', err);
          enqueueSnackbar('Error while deleting', { variant: 'error' });
        });
    } else {
      setValue(
        'slipImageUrl',
        values.slipImageUrl && values.slipImageUrl?.filter((file) => file !== removedFile),
        { shouldValidate: true }
      );
    }

    if (values.slipImageUrl.length === 1) {
      setUploadBtn(false); // Set uploadBtn to false when there are no more images to remove
    }
  };

  const deleteImages = async () => {
    const urlArr = [];
    values.receiptImageUrl.forEach((file) => {
      const urlPreview = file.preview;
      urlArr.push(urlPreview);
    });

    const dataToSend = { urls: urlArr };
    await deleteFilesFromAWSS3(dataToSend)
      .then((data) => {
        setValue('slipImageUrl', [], { shouldValidate: true });
        setUploadBtn(false);
        setValue('receiptImageUrl', []);
        enqueueSnackbar('Deleted successfully', { variant: 'success' });
      })
      .catch((err) => {
        console.error('Error in deleting files:', err);
        enqueueSnackbar('Error while deleting', { variant: 'error' });
      });
  };

  return (
    <FormProvider methods={methods} onSubmit={isHidden ? onSubmitFirst : onSubmit}>
      <Grid container spacing={3}>
        <Grid xs={12} md={8}>
          <Card>
            {!mdUp && <CardHeader title="Details" />}

            <Stack spacing={3} sx={{ p: 3 }}>
              <RHFAutocomplete
                name="expenseCategoryId"
                label="Category Name"
                options={CategoryDataForOptions}
                getOptionLabel={(value) => {
                  const category = CategoryData.find((option) => option.value === value);
                  return category ? category.label : '';
                }}
                InputLabelProps={{
                  style: {
                    color: theme.palette.mode === 'light' ? 'black' : 'white',
                  },
                }}
              />

              <RHFTextField
                InputProps={{
                  startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                }}
                name="amount"
                label="Amount"
                type="number"
                InputLabelProps={{
                  style: {
                    color: theme.palette.mode === 'light' ? 'black' : 'white',
                  },
                }}
              />

              <RHFAutocomplete
                name="paymentMethod"
                label="Payment Method"
                options={_paymentMethods.map((option) => option)}
                getOptionLabel={(option) => option}
                InputLabelProps={{
                  style: {
                    color: theme.palette.mode === 'light' ? 'black' : 'white',
                  },
                }}
              />

              <RHFTextField
                name="purchaseDate"
                // InputLabelProps={{ shrink: true }}
                label="Purchase Date"
                type="date"
                InputLabelProps={{
                  shrink: true,
                  style: {
                    color: theme.palette.mode === 'light' ? 'black' : 'white',
                  },
                }}
              />

              <Stack spacing={1.5}>
                <RHFTextField
                  name="description"
                  fullWidth
                  label="Description"
                  multiline
                  rows={4}
                  InputLabelProps={{
                    style: {
                      color: theme.palette.mode === 'light' ? 'black' : 'white',
                    },
                  }}
                />
              </Stack>

              <Card sx={{ display: isHidden ? 'none' : 'block' }}>
                <CardHeader title="Receipt Image" />
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
            </Stack>
          </Card>
        </Grid>

        {mdUp && <Grid md={4} />}
        <Grid xs={12} md={8} sx={{ display: 'flex', alignItems: 'center' }}>
          <LoadingButton type="submit" variant="contained" size="large" loading={isSubmitting}>
            {!isHidden ? 'Upload Images' : 'Create Claim'}
          </LoadingButton>
        </Grid>
      </Grid>
    </FormProvider>
  );
}

ClaimNewEditForm.propTypes = {
  currentClaim: PropTypes.object,
};
