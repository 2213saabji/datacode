import { Helmet } from 'react-helmet-async';

import { CabTripListView } from 'src/sections/cab-service/view';

// ----------------------------------------------------------------------

export default function CabTripListPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Create a List Cab Trip</title>
      </Helmet>

      <CabTripListView />
    </>
  );
}
