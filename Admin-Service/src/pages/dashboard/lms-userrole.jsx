import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
 
import { useTheme } from '@mui/material/styles';
import { Box, Card, Grid, Stack, Button, MenuItem, TextField } from '@mui/material';
 
import FormProvider from 'src/components/hook-form';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
 
export default function CreateLMSUserProfile() {
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
   
    if (data.userType === 'vendor') {
      navigate('/dashboard/lms_vendor/create');
    } else if (data.userType === 'ca') {
      navigate('/dashboard/chartered_accountant/create');
    } else if (data.userType === 'lawyer') {
      navigate('/dashboard/lawyer/create');
    }
  };
 
 
  return (
    <>
    <CustomBreadcrumbs
    heading="CREATE A NEW LMS USER"
    links={[
   
      {
        name: 'LMS USER ',
        // href: paths.dashboard.lawyer.root,
      },
      { name: 'New LMS USER' },
    ]}
    sx={{
      mb: { xs: 3, md: 5 },
    }}
  />
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
       
      <Grid container spacing={3} style={{ minHeight: '100vh' }}>
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 3 }}>
            <Box
              display="grid"
              gridTemplateColumns="1fr"
              rowGap={3}
              columnGap={2}
            >
              <TextField
                select
                label="User Type"
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
                <MenuItem value="ca">Chartered accountant</MenuItem>
                <MenuItem value="vendor">Vendor</MenuItem>
                <MenuItem value="lawyer">Lawyer</MenuItem>
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
 
CreateLMSUserProfile.propTypes = {
  // Add propTypes if necessary
};
 