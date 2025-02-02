import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { VoterDetailsView } from 'src/sections/voter/view';

// ----------------------------------------------------------------------

export default function VoterDetailsPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Dashboard: Voter Details</title>
      </Helmet>

      <VoterDetailsView id={id} />
    </>
  );
}
