import { Helmet } from 'react-helmet-async';

import { TripListView } from 'src/sections/trip/view';
// ----------------------------------------------------------------------

export default function TripManagementListPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Trip Management</title>
      </Helmet>

      <TripListView />
    </>
  );
}
