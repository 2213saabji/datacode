import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';

// import { ATTPL_EMS_HOST_API } from 'src/config-global';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Unstable_Grid2';
import CardHeader from '@mui/material/CardHeader';
import LoadingButton from '@mui/lab/LoadingButton';

import { useResponsive } from 'src/hooks/use-responsive';

// import { _tags } from 'src/_mock';
import { createCategory, UpdateCategory } from 'src/api/exp_category';

import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { RHFTextField } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export default function CategoryNewEditForm({ currentCategory }) {
  // Required Variablesgthdtxtrrsedsr
  const navigate = useNavigate();
  const theme = useTheme();
  const mdUp = useResponsive('up', 'md');
  const { enqueueSnackbar } = useSnackbar();
  const categoryId = currentCategory?.data.expenseCategoryId;

  // Form Validation Schema
  const CategorySchema = Yup.object().shape({
    expenseCategoryName: Yup.string().required('Category name is required'),
  });

  // Form Values
  const defaultValues = useMemo(
    () => ({
      expenseCategoryName: currentCategory?.data.expenseCategoryName || '',
    }),
    [currentCategory]
  );

  // Form Method
  const methods = useForm({
    resolver: yupResolver(CategorySchema),
    defaultValues,
  });
  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;
  // const values = watch();
  useEffect(() => {
    if (currentCategory) {
      reset(defaultValues);
    }
  }, [currentCategory, defaultValues, reset]);

  // Function Call for New Category
  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = await createCategory(data);

      if (response.status_code === 201) {
        enqueueSnackbar('Category created successfully', { variant: 'success' });
        navigate('/dashboard/category');
      } else {
        enqueueSnackbar('Failed to create category', { variant: 'error' });
      }
    } catch (error) {
      // Handle errors here if necessary
      console.error('Error submitting category:', error);
      enqueueSnackbar('An error occurred while creating category', { variant: 'error' });
    }
  });

  // Function Call for Updating Category
  const onSubmitUpdate = handleSubmit(async (data) => {
    try {
      const response = await UpdateCategory(categoryId, data);

      if (response.status_code === 200) {
        enqueueSnackbar('Category updated successfully', { variant: 'success' });
        navigate(`/dashboard/category/${categoryId}`);
      } else {
        enqueueSnackbar('Failed to update Category', { variant: 'error' });
      }
    } catch (error) {
      // Handle errors here if necessary
      console.error('Error submitting Category :', error);
      enqueueSnackbar('An error occurred while creating Category ', { variant: 'error' });
    }
  });

  return (
    <FormProvider methods={methods} onSubmit={currentCategory ? onSubmitUpdate : onSubmit}>
      <Grid container spacing={3}>
        <Grid xs={12} md={8}>
          <Card>
            {!mdUp && <CardHeader title="Details" />}

            <Stack spacing={3} sx={{ p: 3 }}>
              {/* <RHFTextField name="categoryId" label="Category Id" type='number'/> */}
              <RHFTextField
                name="expenseCategoryName"
                label="Category Name"
                InputLabelProps={{
                  style: {
                    color: theme.palette.mode === 'light' ? 'black' : 'white',
                  },
                }}
              />
            </Stack>
          </Card>
        </Grid>

        {mdUp && <Grid md={4} />}
        <Grid xs={12} md={8} sx={{ display: 'flex', alignItems: 'center' }}>
          <LoadingButton type="submit" variant="contained" size="large" loading={isSubmitting}>
            {!currentCategory ? 'Create Category' : 'Save Changes'}
          </LoadingButton>
        </Grid>
      </Grid>
    </FormProvider>
  );
}

CategoryNewEditForm.propTypes = {
  currentCategory: PropTypes.object,
};
