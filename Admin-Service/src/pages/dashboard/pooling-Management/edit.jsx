import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { PoolEditView } from 'src/sections/poolingManagement/view';

// ----------------------------------------------------------------------

export default function PoolEditPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Dashboard: Pool Edit</title>
      </Helmet>

      <PoolEditView id={`${id}`} />
    </>
  );
}
