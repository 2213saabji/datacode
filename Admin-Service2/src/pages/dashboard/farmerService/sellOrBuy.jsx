import React from 'react';
import { Helmet } from 'react-helmet-async';

import { Button } from '@mui/material';

import { RouterLink } from 'src/routes/components';

import { FarmersForm } from 'src/sections/Farmer-Service/view';

export default function create() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Sell or Buy Products</title>
      </Helmet>
      <Button
        component={RouterLink}
        to="/dashboard"
        variant="outlined"
        color="primary"
        sx={{ textDecoration: 'none', width: '150px', padding: '3px 5px', ml: 4 }}
      >
        Back
      </Button>
      <FarmersForm />
    </>
  );
}
