import React from 'react';
import { Helmet } from 'react-helmet-async';

import { InstitutionListView } from 'src/sections/Student-career/view';

export default function InstituteList() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Institute Create</title>
      </Helmet>

      <InstitutionListView />
    </>
  );
}
