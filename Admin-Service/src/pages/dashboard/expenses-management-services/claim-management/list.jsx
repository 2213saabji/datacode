import { Helmet } from 'react-helmet-async';

import { ClaimListView } from 'src/sections/claimmanagement/view';

// ----------------------------------------------------------------------

export default function ClaimListPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Claim List</title>
      </Helmet>

      <ClaimListView />
    </>
  );
}
