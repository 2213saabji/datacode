import { Helmet } from 'react-helmet-async';

import { PartyCreateView } from 'src/sections/party_management/view';

// ----------------------------------------------------------------------

export default function PartyCreatePage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Create a new party</title>
      </Helmet>

      <PartyCreateView />
    </>
  );
}
