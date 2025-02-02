import React from 'react';
import { Helmet } from 'react-helmet-async';

import { InstituteCreateView } from 'src/sections/Student-career/view';

export default function create() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Institute Create</title>
      </Helmet>

      <InstituteCreateView />
    </>
  );
}
