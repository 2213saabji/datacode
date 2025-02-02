import React from 'react';
import { Helmet } from 'react-helmet-async';

import { JobCreateView } from 'src/sections/labourJobPortal/view';

export default function create() {
  return (
    <>
      <Helmet>
        <title>Dashboard: Labour Job Portal</title>
      </Helmet>

      <JobCreateView />
    </>
  );
}
