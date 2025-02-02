import React from 'react';
import { Helmet } from 'react-helmet-async';

import { InstituteBookingCreateView } from 'src/sections/Student-career/view';

export default function createInstituteBooking() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Institute Booking Create</title>
      </Helmet>

      <InstituteBookingCreateView />
    </>
  );
}
