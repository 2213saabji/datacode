import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { ClaimEditView } from 'src/sections/claimmanagement/view';

// ----------------------------------------------------------------------

export default function ClaimEditPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Dashboard: Claim Edit</title>
      </Helmet>

      <ClaimEditView id={`${id}`} />
    </>
  );
}
