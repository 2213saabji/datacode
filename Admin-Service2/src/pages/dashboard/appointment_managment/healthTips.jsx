import { Helmet } from 'react-helmet-async';

import { HealthTips } from 'src/sections/Appointment/view';

// ----------------------------------------------------------------------

export default function GetHealthTips() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Health Tips</title>
      </Helmet>

      <HealthTips />
    </>
  );
}
