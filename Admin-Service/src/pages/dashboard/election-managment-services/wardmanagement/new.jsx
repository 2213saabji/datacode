import { Helmet } from 'react-helmet-async';

import { WardCreateView } from 'src/sections/wardmanagement/view';

// ----------------------------------------------------------------------

export default function WardCreatePage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Create a new ward</title>
      </Helmet>

      <WardCreateView />
    </>
  );
}
