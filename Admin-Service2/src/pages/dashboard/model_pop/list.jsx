import { Helmet } from 'react-helmet-async';

import { ModelListView } from 'src/sections/model_pop/view';

// ----------------------------------------------------------------------

export default function ModelListPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Model list</title>
      </Helmet>

      <ModelListView />
    </>
  );
}
