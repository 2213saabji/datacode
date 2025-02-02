import React from 'react';
import { Helmet } from 'react-helmet-async';

import { LabourService } from 'src/sections/Labour-Service/view';

export default function create() {
  return (
    <>
      <Helmet>
        <title> Dashboard: LabourService Create</title>
      </Helmet>

      <LabourService />
    </>
  );
}
