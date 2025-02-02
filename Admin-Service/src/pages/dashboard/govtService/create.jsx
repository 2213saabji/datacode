import React from 'react';
import { Helmet } from 'react-helmet-async';

import { GovtServiceView } from 'src/sections/govt-service/view';

export default function create() {
  return (
    <>
      <Helmet>
        <title> Dashboard: FarmerService Create</title>
      </Helmet>

      <GovtServiceView />
    </>
  );
}
