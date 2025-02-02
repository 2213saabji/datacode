import { Helmet } from 'react-helmet-async';

import { AmbulanceListView } from 'src/sections/ambulance/view';
// ----------------------------------------------------------------------

export default function AmbulanceListPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Ambulance Management</title>
      </Helmet>

      <AmbulanceListView />
    </>
  );
}
