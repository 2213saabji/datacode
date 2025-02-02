import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { PartyEditView } from 'src/sections/party_management/view';

// ----------------------------------------------------------------------

export default function PartyEditPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Dashboard: Party Edit</title>
      </Helmet>

      <PartyEditView id={`${id}`} />
    </>
  );
}
