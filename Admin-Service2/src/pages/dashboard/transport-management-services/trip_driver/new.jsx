import { Helmet } from 'react-helmet-async';

import { TripDriverCreateView } from 'src/sections/trip-driver/view';
// ----------------------------------------------------------------------

export default function TripDriverCreatePage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Create a new TripDriver</title>
      </Helmet>

      <TripDriverCreateView />
    </>
  );
}
