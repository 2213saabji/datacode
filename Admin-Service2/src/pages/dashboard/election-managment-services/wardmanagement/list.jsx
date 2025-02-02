import { Helmet } from 'react-helmet-async';

import { WardListView } from 'src/sections/wardmanagement/view';

// ----------------------------------------------------------------------

export default function WardManagementListPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Ward Management</title>
      </Helmet>

      <WardListView />
    </>
  );
}
