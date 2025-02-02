import React from 'react';
import { Helmet } from 'react-helmet-async';

import { Button } from '@mui/material';

import { RouterLink } from 'src/routes/components';

import { ConsultantForm } from 'src/sections/Bussiness-Roadmap/view';

export default function ConsultantNewForm() {
  return (
    <>
      <Helmet>
        <title> Dashboard: ATTPL Consultancy Form</title>
      </Helmet>
      <Button
        component={RouterLink}
        to="/dashboard"
        variant="outlined"
        color="primary"
        sx={{ textDecoration: 'none', width: '150px', padding: '3px 5px', mt: 2, ml: 3.5 }}
      >
        Back
      </Button>
      <ConsultantForm />
    </>
  );
}
