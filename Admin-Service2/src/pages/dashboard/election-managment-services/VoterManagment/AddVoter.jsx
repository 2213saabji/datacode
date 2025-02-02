import { Helmet } from 'react-helmet-async';

import { VoterCreateView } from 'src/sections/voter/view';

// ----------------------------------------------------------------------

export default function AddVoter() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Create a new Voter</title>
      </Helmet>

      <VoterCreateView />
    </>
  );
}
