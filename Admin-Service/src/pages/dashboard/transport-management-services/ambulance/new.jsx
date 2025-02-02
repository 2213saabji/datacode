import { Helmet } from 'react-helmet-async';

import { AmbulanceCreateView } from 'src/sections/ambulance/view';
// ----------------------------------------------------------------------

export default function AmbulanceCreatePage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Create a new Ambulance</title>
      </Helmet>

      <AmbulanceCreateView />
    </>
  );
}
