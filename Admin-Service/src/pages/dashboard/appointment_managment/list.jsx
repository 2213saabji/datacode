import { Helmet } from 'react-helmet-async';

import { AppointmentListView } from 'src/sections/Appointment/view';

// ----------------------------------------------------------------------

export default function AppointmentListPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Appointment Management</title>
      </Helmet>

      <AppointmentListView />
    </>
  );
}
