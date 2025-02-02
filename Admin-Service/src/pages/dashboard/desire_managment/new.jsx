import { Helmet } from 'react-helmet-async';

import { DesireCreateView } from 'src/sections/Desire-manegament/view';

// ----------------------------------------------------------------------

export default function AppointmentCreatePage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Create a new Desire</title>
      </Helmet>

      <DesireCreateView />
    </>
  );
}
