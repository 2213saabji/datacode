import { Helmet } from 'react-helmet-async';

import { RequestListView } from 'src/sections/request_license_acceptence/view';

// ----------------------------------------------------------------------

export default function RequestLicenseAcceptance() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Requests acceptance</title>
      </Helmet>

      <RequestListView />
    </>
  );
}
