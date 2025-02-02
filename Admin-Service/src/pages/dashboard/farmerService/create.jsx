import React from 'react';
import { Helmet } from 'react-helmet-async';

import { FarmerServiceView } from 'src/sections/Farmer-Service/view';

export default function create() {
  return (
    <>
      <Helmet>
        <title> Dashboard: FarmerService Create</title>
      </Helmet>

      <FarmerServiceView />
    </>
  );
}
