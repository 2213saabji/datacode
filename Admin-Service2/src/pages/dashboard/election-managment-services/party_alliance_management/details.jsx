import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { PartyAllianceDetailsView } from 'src/sections/party_alliance_management/view';

// ----------------------------------------------------------------------

export default function PartyAllianceDetailsPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Dashboard: Party Alliance Details</title>
      </Helmet>

      <PartyAllianceDetailsView id={id} />
    </>
  );
}
