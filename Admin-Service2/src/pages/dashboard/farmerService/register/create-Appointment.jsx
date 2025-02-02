import React from 'react';
import { Helmet } from 'react-helmet-async';

import { FarmerAppointmentCreateView } from 'src/sections/Farmer-Service/register/view';

export default function createAppointment() {
  return (
    <>
      <Helmet>
        <title> Dashboard: FarmerAppointmnet Create</title>
      </Helmet>

      <FarmerAppointmentCreateView />
    </>
  );
}
