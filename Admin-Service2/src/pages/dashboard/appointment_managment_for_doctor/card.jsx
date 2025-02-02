import { Helmet } from 'react-helmet-async';

import { AppointmentCard } from 'src/sections/AppointmentWithDoctor/view';

// ----------------------------------------------------------------------

export default function AppointmentCardPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: DrAppointment Management </title>
      </Helmet>

      <AppointmentCard />
    </>
  );
}
