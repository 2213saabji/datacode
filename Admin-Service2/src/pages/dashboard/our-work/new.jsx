import { Helmet } from 'react-helmet-async';

import { WorkCreateView } from 'src/sections/ourwork/view';

// ----------------------------------------------------------------------

export default function WorkCreatePage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Create a new Work</title>
      </Helmet>

      <WorkCreateView />
    </>
  );
}
