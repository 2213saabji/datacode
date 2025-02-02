import { Helmet } from 'react-helmet-async';

import { AppointmentCreateView } from 'src/sections/Appointment/view';

// ----------------------------------------------------------------------

export default function AppointmentCreatePage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Create a new Appointment</title>
      </Helmet>

      <AppointmentCreateView />
    </>
  );
}
