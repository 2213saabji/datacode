import { Helmet } from 'react-helmet-async';

import { CandidateCreateView } from 'src/sections/candidate/view';
// ----------------------------------------------------------------------

export default function CandidateCreatePage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Create a new Candidate</title>
      </Helmet>

      <CandidateCreateView />
    </>
  );
}
