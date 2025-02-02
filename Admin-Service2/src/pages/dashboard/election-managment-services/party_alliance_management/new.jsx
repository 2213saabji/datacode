import { Helmet } from 'react-helmet-async';

import { PartyAllianceCreateView } from 'src/sections/party_alliance_management/view';

// ----------------------------------------------------------------------

export default function PartyAllianceCreatePage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Create a new party alliance</title>
      </Helmet>

      <PartyAllianceCreateView />
    </>
  );
}
