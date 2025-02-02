import React from 'react';
import { Helmet } from 'react-helmet-async';

import { EmergancyServicesAmbulance } from 'src/sections/ambulance_cards/view';

export default function list() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Emergency Services</title>
      </Helmet>

      <EmergancyServicesAmbulance />
    </>
  );
}
