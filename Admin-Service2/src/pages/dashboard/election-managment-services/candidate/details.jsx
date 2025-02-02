import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { CandidateDetailsView } from 'src/sections/candidate/view';

// ----------------------------------------------------------------------

export default function CandidateDetailsPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Dashboard: Candidate Details</title>
      </Helmet>

      <CandidateDetailsView id={`${id}`} />
    </>
  );
}
