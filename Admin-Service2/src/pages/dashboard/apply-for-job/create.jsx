import React from 'react';
import { Helmet } from 'react-helmet-async';

import { CreateApplyForJob } from 'src/sections/Apply-for-job/view';

export default function create() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Job Application</title>
      </Helmet>

      <CreateApplyForJob />
    </>
  );
}
