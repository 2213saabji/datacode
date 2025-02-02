import React from 'react';
import { useParams } from 'react-router';
import { Helmet } from 'react-helmet-async';

import { InstitutionAppointmentDetailsView } from 'src/sections/Student-career/Institution_Appointment/view';

export default function InstituteAppointmentDetails() {
  const params = useParams();
  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Dashboard: Institute Appointment Details</title>
      </Helmet>

      <InstitutionAppointmentDetailsView id={id} />
    </>
  );
}
