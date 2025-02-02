import { Helmet } from 'react-helmet-async';

import { DriverListView } from 'src/sections/driver/view';
// ----------------------------------------------------------------------

export default function DriverManagementListPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Driver Management</title>
      </Helmet>

      <DriverListView />
    </>
  );
}
