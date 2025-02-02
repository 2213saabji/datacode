import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { PartyAllianceEditView } from 'src/sections/party_alliance_management/view';

// ----------------------------------------------------------------------

export default function PartyAllianceEditPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Dashboard: Party Alliance Edit</title>
      </Helmet>

      <PartyAllianceEditView id={`${id}`} />
    </>
  );
}
