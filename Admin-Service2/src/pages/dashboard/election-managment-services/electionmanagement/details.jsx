import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { ElectionDetailsView } from 'src/sections/electionmanagement/view';

// ----------------------------------------------------------------------

export default function ElectionDetailsPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Dashboard: Election Details</title>
      </Helmet>

      <ElectionDetailsView id={`${id}`} />
    </>
  );
}
