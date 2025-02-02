import { Helmet } from 'react-helmet-async';

import { ClaimCreateView } from 'src/sections/claimmanagement/view';

// ----------------------------------------------------------------------

export default function ClaimCreatePage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Create a new claim</title>
      </Helmet>

      <ClaimCreateView />
    </>
  );
}
