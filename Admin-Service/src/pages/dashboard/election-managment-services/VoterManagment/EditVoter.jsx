import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { VoterEditView } from 'src/sections/voter/view';

// ----------------------------------------------------------------------

export default function VoterEditPage() {
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
