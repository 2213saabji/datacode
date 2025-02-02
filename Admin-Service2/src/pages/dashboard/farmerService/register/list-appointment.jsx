import { Helmet } from 'react-helmet-async';

import { FarmerAppointmentListView } from 'src/sections/Farmer-Service/register/view';

// ----------------------------------------------------------------------

export default function FarmerAppointmentListPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Appointment List</title>
      </Helmet>

      <FarmerAppointmentListView />
    </>
  );
}
