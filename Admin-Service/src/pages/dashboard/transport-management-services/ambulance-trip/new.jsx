import { Helmet } from 'react-helmet-async';

import { AmbulanceTripCreateView } from 'src/sections/ambulance-trip/view';
// ----------------------------------------------------------------------

export default function AmbulanceTripCreatePage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Create a new Ambulance Trip</title>
      </Helmet>

      <AmbulanceTripCreateView />
    </>
  );
}
