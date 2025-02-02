import React from 'react';
import { useParams } from 'react-router';
import { Helmet } from 'react-helmet-async';

import { CollegeDetailsView } from 'src/sections/Student-career/view';

export default function InstituteDetails() {
  const params = useParams();
  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Dashboard: College Details</title>
      </Helmet>

      <CollegeDetailsView id={id} />
    </>
  );
}
