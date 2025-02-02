import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { VoterEditView } from 'src/sections/voter_prediction/view';

// ----------------------------------------------------------------------

export default function VotePredictionEditPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Dashboard: Voter Edit</title>
      </Helmet>

      <VoterEditView id={`${id}`} />
    </>
  );
}
