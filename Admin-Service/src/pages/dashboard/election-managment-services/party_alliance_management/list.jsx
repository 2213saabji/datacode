import { Helmet } from 'react-helmet-async';

import { PartyAllianceListView } from 'src/sections/party_alliance_management/view';

// ----------------------------------------------------------------------

export default function PartyAllianceListPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Party Alliance Management</title>
      </Helmet>

      <PartyAllianceListView />
    </>
  );
}
