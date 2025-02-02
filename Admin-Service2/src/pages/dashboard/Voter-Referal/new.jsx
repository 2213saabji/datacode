import { Helmet } from 'react-helmet-async';

import { VoterReferalEdit } from 'src/sections/VoterReferal/view';

// ----------------------------------------------------------------------

export default function VoterReferalCreatePage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Create a new Voter Referal</title>
      </Helmet>

      <VoterReferalEdit />
    </>
  );
}
