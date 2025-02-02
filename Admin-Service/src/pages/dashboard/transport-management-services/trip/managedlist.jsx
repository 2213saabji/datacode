import { Helmet } from 'react-helmet-async';

import { TripManagedListView } from 'src/sections/trip/view';
// ----------------------------------------------------------------------

export default function TripManagedListPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Trip Management</title>
      </Helmet>

      <TripManagedListView />
    </>
  );
}
