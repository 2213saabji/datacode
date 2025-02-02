import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { ClaimDetailsView } from 'src/sections/claimmanagement/view';

// ----------------------------------------------------------------------

export default function ClaimDetailsPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Dashboard: Claim Details</title>
      </Helmet>

      <ClaimDetailsView id={`${id}`} />
    </>
  );
}
