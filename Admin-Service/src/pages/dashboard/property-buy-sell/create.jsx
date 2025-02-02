import React from 'react';
import { Helmet } from 'react-helmet-async';

import { PropertyForm } from 'src/sections/property/view';

export default function create() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Property Buy or Sell</title>
      </Helmet>

      <PropertyForm />
    </>
  );
}
