import React from 'react';
import { Helmet } from 'react-helmet-async';

import { JobTopListView } from 'src/sections/labourJobPortal/view';

export default function LabourJobList() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Labour Job Portal</title>
      </Helmet>

      <JobTopListView />
    </>
  );
}
