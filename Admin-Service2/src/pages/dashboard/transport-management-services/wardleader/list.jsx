import { Helmet } from 'react-helmet-async';

import { WardLeaderListView } from 'src/sections/ward-leader/view';
// ----------------------------------------------------------------------

export default function TripManagementListPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: WardLeader Management</title>
      </Helmet>

      <WardLeaderListView />
    </>
  );
}
