import { Helmet } from 'react-helmet-async';

import { ServiceListView } from 'src/sections/service/view';
// ----------------------------------------------------------------------

export default function ServiceManagementListPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Service Management</title>
      </Helmet>

      <ServiceListView />
    </>
  );
}
