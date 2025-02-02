import { Helmet } from 'react-helmet-async';

import { AmbulancelistListView } from 'src/sections/ambulance/view';
// ----------------------------------------------------------------------

export default function AmbulanceManagementListPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Ambulance Management</title>
      </Helmet>

      <AmbulancelistListView />
    </>
  );
}
