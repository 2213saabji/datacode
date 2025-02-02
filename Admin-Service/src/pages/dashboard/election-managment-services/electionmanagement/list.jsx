import { Helmet } from 'react-helmet-async';

import { ElectionListView } from 'src/sections/electionmanagement/view';
// ----------------------------------------------------------------------

export default function ElectionManagementListPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Election Management</title>
      </Helmet>

      <ElectionListView />
    </>
  );
}
