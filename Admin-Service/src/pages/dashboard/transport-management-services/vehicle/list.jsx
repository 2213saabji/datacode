import { Helmet } from 'react-helmet-async';

import { VehicleListView } from 'src/sections/vehicle/view';
// ----------------------------------------------------------------------

export default function VehicleManagementListPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Vehicle Management</title>
      </Helmet>

      <VehicleListView />
    </>
  );
}
