import React from 'react';
import { Helmet } from 'react-helmet-async';

import { EmergencyList } from 'src/sections/Emergency Services/view';

export default function create() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Emergency Services</title>
      </Helmet>

      <EmergencyList />
    </>
  );
}
