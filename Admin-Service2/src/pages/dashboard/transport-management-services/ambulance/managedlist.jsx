import { Helmet } from 'react-helmet-async';

import { AmbulanceManagedListView } from 'src/sections/ambulance/view';
// ----------------------------------------------------------------------

export default function AmbulanceManagedListPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Ambulance Management</title>
      </Helmet>

      <AmbulanceManagedListView />
    </>
  );
}
