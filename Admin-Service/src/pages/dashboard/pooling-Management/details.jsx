import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { PoolDetailsView } from 'src/sections/poolingManagement/view';

// ----------------------------------------------------------------------

export default function PoolDetailsPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Dashboard: Pool Details</title>
      </Helmet>

      <PoolDetailsView id={`${id}`} />
    </>
  );
}
