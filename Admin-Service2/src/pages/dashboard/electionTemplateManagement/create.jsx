import { Helmet } from 'react-helmet-async';

import { OverviewFileView } from 'src/sections/template-managment/view';

// ----------------------------------------------------------------------

export default function OverviewFilePage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Upload Templates</title>
      </Helmet>

      <OverviewFileView />
    </>
  );
}
