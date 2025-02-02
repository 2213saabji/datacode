import { Helmet } from 'react-helmet-async';

import { VehicleCreateView } from 'src/sections/vehicle/view';
// ----------------------------------------------------------------------

export default function VehicleCreatePage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Create a new Vehicle</title>
      </Helmet>

      <VehicleCreateView />
    </>
  );
}
