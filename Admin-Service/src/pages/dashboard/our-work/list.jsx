import { Helmet } from 'react-helmet-async';

import { WorkListView } from 'src/sections/ourwork/view';

// ----------------------------------------------------------------------

export default function WorkListPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Work list</title>
      </Helmet>

      <WorkListView />
    </>
  );
}
