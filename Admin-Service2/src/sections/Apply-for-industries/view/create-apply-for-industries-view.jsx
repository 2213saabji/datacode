/* eslint-disable no-nested-ternary */
// import * as Yup from 'yup';
// import { useForm } from 'react-hook-form';
// import { useState, useEffect } from 'react';
// import { yupResolver } from '@hookform/resolvers/yup';

// import { useTheme } from '@mui/material/styles';
// import { Box, Card, Grid, Chip, Button, Typography } from '@mui/material';

// import { paths } from 'src/routes/paths';

// import { useBoolean } from 'src/hooks/use-boolean';

// import { useAuthContext } from 'src/auth/hooks';
// import { createOrder } from 'src/api/exp_order';
// import { createJobApplication, updateJobApplication } from 'src/api/applyJob';
// import { Year, education, jobCategory, employmentType, experienceYears, majorFieldsForDoctoral, majorFieldsForPostGraduate, majorFieldsForUnderGraduate } from 'src/_mock/_jobApply';

// import { useSnackbar } from 'src/components/snackbar';
// import { LoadingScreen } from 'src/components/loading-screen';
// import FormProvider, { RHFTextField, RHFAutocomplete } from 'src/components/hook-form';

import { Button } from '@mui/material';

import { RouterLink } from 'src/routes/components';

import ZohoForm from '../apply-for-industries';

export default function CreateApplyForJob() {


  return (
    <>
      <Button
        component={RouterLink}
        to="/dashboard"
        variant="outlined"
        color="primary"
        sx={{ textDecoration: 'none', width: '150px', padding: '3px 5px', ml: 4 }}
      >
        Back
      </Button>

      <ZohoForm />

     
    </>
  );
}
