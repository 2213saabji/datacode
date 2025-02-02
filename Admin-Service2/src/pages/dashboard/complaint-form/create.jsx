import React from 'react';
import { Helmet } from 'react-helmet-async';

import { CreateComplaint } from 'src/sections/complaintForm/view';

// src/sections/complaintForm/view
export default function create() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Complaint Create</title>
      </Helmet>

      <CreateComplaint />
    </>
  );
}
