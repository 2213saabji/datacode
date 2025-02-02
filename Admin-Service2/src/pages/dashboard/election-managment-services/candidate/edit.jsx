import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { CandidateEditView } from 'src/sections/candidate/view';

// ----------------------------------------------------------------------

export default function CandidateEditPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Dashboard: Candidate Edit</title>
      </Helmet>

      <CandidateEditView id={`${id}`} />
    </>
  );
}
