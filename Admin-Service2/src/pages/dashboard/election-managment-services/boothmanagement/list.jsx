import { Helmet } from 'react-helmet-async';

import { BoothListView } from 'src/sections/boothmanagement/view';
// ----------------------------------------------------------------------

export default function BoothManagementListPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Booth Management</title>
      </Helmet>

      <BoothListView />
    </>
  );
}
