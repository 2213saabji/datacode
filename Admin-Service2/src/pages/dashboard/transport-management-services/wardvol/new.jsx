import { Helmet } from 'react-helmet-async';

import { WardvolCreateView } from 'src/sections/wardvol/view';
// ----------------------------------------------------------------------

export default function WardvolCreatePage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Create a new Wardvol</title>
      </Helmet>

      <WardvolCreateView />
    </>
  );
}
