import { Helmet } from 'react-helmet-async';

import { ModelCreateView } from 'src/sections/model_pop/view';

// ----------------------------------------------------------------------

export default function ModelCreatePage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Create a new model</title>
      </Helmet>

      <ModelCreateView />
    </>
  );
}
