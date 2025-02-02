import { Helmet } from 'react-helmet-async';

import { AppointmentforDoctorListView } from 'src/sections/AppointmentWithDoctor/view';

// ----------------------------------------------------------------------

export default function AppointmentListPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: DrAppointment Management</title>
      </Helmet>

      <AppointmentforDoctorListView />
    </>
  );
}
