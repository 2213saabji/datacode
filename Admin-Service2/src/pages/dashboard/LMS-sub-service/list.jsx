import { Helmet } from 'react-helmet-async';

import {SubServiceListView } from 'src/sections/sub-service/view';
// ----------------------------------------------------------------------

export default function SubServiceManagementListPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Sub Service Management</title>
      </Helmet>

      <SubServiceListView />
    </>
  );
}
