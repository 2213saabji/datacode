import React from 'react';
import { useParams } from 'react-router';
import { Helmet } from 'react-helmet-async';

import { InstitutionDetailsView } from 'src/sections/Student-career/view';

export default function InstituteDetails() {
  const params = useParams();
  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Dashboard: Institute Details</title>
      </Helmet>

      <InstitutionDetailsView id={id} />
    </>
  );
}
