/* eslint-disable no-unused-vars */
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { enqueueSnackbar } from 'notistack';
// import { useMemo, useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';

import { Box } from '@mui/system';
import { Card } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Grid from '@mui/material/Unstable_Grid2';

import { RHFTextField } from 'src/components/hook-form';
import FormProvider from 'src/components/hook-form/form-provider';

export default function GetLink() {
  // const currentVoter = null;

  const defaultValues = {
    input: '',
  };

  const InputSchema = Yup.object().shape({
    input: Yup.string().required('Please Enter Valid Link'),
  });

  const methods = useForm({
    resolver: yupResolver(InputSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      // console.log(data);
      enqueueSnackbar('Complaint submit successfully', { variant: 'success' });
      reset();
    } catch (error) {
      console.error(error);
      reset();
      enqueueSnackbar('Complaint submit Failed', { variant: 'error' });
    }
  });

  return (
    <Grid>
      <FormProvider onSubmit={onSubmit} methods={methods}>
        <Card sx={{ p: 3, mt: 3, height: 200, width: 400 }}>
          <Box
            display="grid"
            sx={{
              height: 150,
              //   justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <RHFTextField sx={{ mt: 2 }} name="getlink" label="Your Link" />
            <LoadingButton
              type="submit"
              variant="contained"
              fullWidth="100%"
              sx={{ bgcolor: 'rgb(37, 150, 190)' }}
            >
              Generate Link
            </LoadingButton>
          </Box>
        </Card>
      </FormProvider>
    </Grid>
  );
}
