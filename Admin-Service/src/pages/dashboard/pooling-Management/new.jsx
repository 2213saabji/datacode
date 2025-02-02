import { Helmet } from 'react-helmet-async';

import { PoolCreateView } from 'src/sections/poolingManagement/view';

// ----------------------------------------------------------------------

export default function PoolCreatePage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Create a new Pool</title>
      </Helmet>

      <PoolCreateView />
    </>
  );
}
