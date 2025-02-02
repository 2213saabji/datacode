import React from 'react';
import { Helmet } from 'react-helmet-async';

import { InstitutionDetailsCreateView } from 'src/sections/Student-career/Institution Details';

export default function create() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Institute Create</title>
      </Helmet>

      <InstitutionDetailsCreateView />
    </>
  );
}
