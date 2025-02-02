import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { PartyDetailsView } from 'src/sections/party_management/view';

// ----------------------------------------------------------------------

export default function PartyDetailsPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Dashboard: Party Details</title>
      </Helmet>

      <PartyDetailsView id={id} />
    </>
  );
}
