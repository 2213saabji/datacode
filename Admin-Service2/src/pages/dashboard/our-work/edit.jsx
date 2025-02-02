import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { WorkEditView } from 'src/sections/ourwork/view';

// ----------------------------------------------------------------------

export default function PoolEditPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Dashboard: Work Edit</title>
      </Helmet>

      <WorkEditView id={`${id}`} />
    </>
  );
}
