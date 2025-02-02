import { Helmet } from 'react-helmet-async';

import { DesireListView } from 'src/sections/Desire-manegament/view';

// ----------------------------------------------------------------------

export default function AppointmentListPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Desire Management</title>
      </Helmet>

      <DesireListView />
    </>
  );
}
