import { Helmet } from 'react-helmet-async';

import { TripCreateView } from 'src/sections/trip/view';
// ----------------------------------------------------------------------

export default function TripCreatePage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Create a new Trip</title>
      </Helmet>

      <TripCreateView />
    </>
  );
}
