import React from 'react';
// import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { useTheme } from '@mui/material/styles';
import { Box, Card, Grid, Stack, Button, MenuItem, TextField } from '@mui/material';

import FormProvider from 'src/components/hook-form';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

export default function CreateSTDUserProfile() {
  const navigate = useNavigate();
  const theme = useTheme();

  const methods = useForm({
    defaultValues: {
      userType: '',
    },
  });

  const { handleSubmit, setValue, watch } = methods;
  const selectedUserType = watch('userType');

  const onSubmit = (data) => {
    // sessionStorage.setItem('LMS_UserType', data.userType);

    // if (data.userType === 'vendor') {
    //   navigate('/dashboard/lms_vendor/create');
    // }
    //   if (data.userType === 'ca') {
    //   navigate('/dashboard/chartered_accountant/create');
    // } else if (data.userType === 'lawyer') {
    //   navigate('/dashboard/lawyer/create');
    // }
    if (data.userType === '10th') {
      navigate('/dashboard/STDUserProfile/10th');
    } else if (data.userType === '12th') {
      navigate('/dashboard/STDUserProfile/12th');
    } else if (data.userType === 'college') {
      navigate('/dashboard/STDUserProfile/college');
    }
  };

  return (
    <>
      <Button
        component={RouterLink}
        to="/dashboard/StudentCareer/new"
        variant="outlined"
        color="primary"
        style={{
          textDecoration: 'none',
          width: '150px',
          padding: '3px 5px',
          marginBottom: '30px',
        }}
      >
        Back
      </Button>
      <CustomBreadcrumbs
        heading="CHOOSE STUDENT CAREER "
        links={[
          {
            name: 'STUDENT ',
            href: paths.dashboard,
          },
          { name: 'New STUDENT' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3} style={{ minHeight: '100vh' }}>
          <Grid item xs={12} md={6}>
            <Card sx={{ p: 3 }}>
              <Box display="grid" gridTemplateColumns="1fr" rowGap={3} columnGap={2}>
                <TextField
                  select
                  label="Choose Career"
                  name="userType"
                  value={selectedUserType}
                  onChange={(e) => setValue('userType', e.target.value)}
                  fullWidth
                  InputProps={{
                    style: {
                      color: theme.palette.mode === 'light' ? 'black' : 'white',
                      fontSize: '16px',
                    },
                  }}
                  InputLabelProps={{
                    style: {
                      color: theme.palette.mode === 'light' ? 'black' : 'white',
                    },
                  }}
                >
                  <MenuItem value="10th">10th</MenuItem>
                  <MenuItem value="12th">12th</MenuItem>
                  <MenuItem value="college">College</MenuItem>
                </TextField>
              </Box>
              <Stack alignItems="flex-end" sx={{ mt: 3 }}>
                <Button type="submit" variant="contained">
                  Next
                </Button>
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </FormProvider>
    </>
  );
}

CreateSTDUserProfile.propTypes = {
  // Add propTypes if necessary
};
