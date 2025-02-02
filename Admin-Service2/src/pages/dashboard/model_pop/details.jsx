import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { ModelDetailsView } from 'src/sections/model_pop/view';

// ----------------------------------------------------------------------

export default function ModelDetailsPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Dashboard: Model</title>
      </Helmet>

      <ModelDetailsView id={`${id}`} />
    </>
  );
}
