import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { ModelEditView } from 'src/sections/model_pop/view';

// ----------------------------------------------------------------------

export default function PoolEditPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Dashboard: model Edit</title>
      </Helmet>

      <ModelEditView id={`${id}`} />
    </>
  );
}
