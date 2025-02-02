import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { DesireDetailsView } from 'src/sections/Desire-manegament/view';

// ----------------------------------------------------------------------

export default function AppointmentDetailsPage() {
  const params = useParams();

  const { id } = params;
  //  console.log(id)
  return (
    <>
      <Helmet>
        <title> Dashboard: Desire Details</title>
      </Helmet>

      <DesireDetailsView id={id} />
    </>
  );
}
