import React from 'react';
import { Helmet } from 'react-helmet-async';

import { InstitutionAppointmentCreateView } from 'src/sections/Student-career/Institution_Appointment/view';

export default function create() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Institute Appointment Booking</title>
      </Helmet>

      <InstitutionAppointmentCreateView />
    </>
  );
}
