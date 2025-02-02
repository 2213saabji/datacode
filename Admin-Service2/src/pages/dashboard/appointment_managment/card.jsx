import { Helmet } from 'react-helmet-async';

import { AppointmentCard } from 'src/sections/Appointment/view';

// ----------------------------------------------------------------------

export default function AppointmentCardPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard:Appointment Management</title>
      </Helmet>

      <AppointmentCard />
    </>
  );
}
