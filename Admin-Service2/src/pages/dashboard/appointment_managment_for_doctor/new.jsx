import { Helmet } from 'react-helmet-async';

import { AppointmentforDoctorCreateView } from 'src/sections/AppointmentWithDoctor/view';

// ----------------------------------------------------------------------

export default function AppointmentCreatePage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Create a new Appointment With Doctor</title>
      </Helmet>

      <AppointmentforDoctorCreateView />
    </>
  );
}
