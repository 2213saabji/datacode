import { Helmet } from 'react-helmet-async';

import { TripRouteMapView } from 'src/sections/trip-driver/view';
// ----------------------------------------------------------------------

export default function TripDriverCreatePage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Trip Route</title>
      </Helmet>

      <TripRouteMapView />
    </>
  );
}
