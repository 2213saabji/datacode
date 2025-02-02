import { Helmet } from 'react-helmet-async';

import { VoterListView } from 'src/sections/voter_prediction/view';

// ----------------------------------------------------------------------

export default function VotePredictionListPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Voter List</title>
      </Helmet>

      <VoterListView />
    </>
  );
}
