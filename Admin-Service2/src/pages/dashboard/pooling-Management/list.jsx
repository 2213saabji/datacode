import { Helmet } from 'react-helmet-async';

import { PoolListView } from 'src/sections/poolingManagement/view';

// ----------------------------------------------------------------------

export default function PoolListPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Pool Management</title>
      </Helmet>

      <PoolListView />
    </>
  );
}
