import { Helmet } from 'react-helmet-async';

import { WardLeaderCreateView } from 'src/sections/ward-leader/view';
// ----------------------------------------------------------------------

export default function TripCreatePage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Create a new WardLeader</title>
      </Helmet>

      <WardLeaderCreateView />
    </>
  );
}
