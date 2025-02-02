import { Helmet } from 'react-helmet-async';

import { DriverCreateView } from 'src/sections/driver/view';
// ----------------------------------------------------------------------

export default function DriverCreatePage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Create a new Driver</title>
      </Helmet>

      <DriverCreateView />
    </>
  );
}
