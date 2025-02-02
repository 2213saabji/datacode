import { Helmet } from 'react-helmet-async';

import { CabCreateView } from 'src/sections/cab-service/view';

// ----------------------------------------------------------------------

export default function CabTripCreatePage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Create a new Cab Request</title>
      </Helmet>

      <CabCreateView />
    </>
  );
}
