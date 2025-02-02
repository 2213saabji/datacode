import { Helmet } from 'react-helmet-async';

import { DesireCard } from 'src/sections/Desire-manegament/view';

// ----------------------------------------------------------------------

export default function AppointmentCardPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard:Desire Management</title>
      </Helmet>

      <DesireCard />
    </>
  );
}
