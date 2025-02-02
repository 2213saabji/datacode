import { Helmet } from 'react-helmet-async';

import { BoothCreateView } from 'src/sections/boothmanagement/view';
// ----------------------------------------------------------------------

export default function BoothCreatePage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Create a new booth</title>
      </Helmet>

      <BoothCreateView />
    </>
  );
}
