import { Helmet } from 'react-helmet-async';

import { CandidateListView } from 'src/sections/candidate/view';
// ----------------------------------------------------------------------

export default function CandidateManagementListPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Candidate Management</title>
      </Helmet>

      <CandidateListView />
    </>
  );
}
