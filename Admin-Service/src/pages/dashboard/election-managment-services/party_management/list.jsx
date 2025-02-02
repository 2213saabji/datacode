import { Helmet } from 'react-helmet-async';

import { PartyListView } from 'src/sections/party_management/view';

// ----------------------------------------------------------------------

export default function PartyListPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Party Management</title>
      </Helmet>

      <PartyListView />
    </>
  );
}
