import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { AppointmentDetailsView } from 'src/sections/Appointment/view';

// ----------------------------------------------------------------------

export default function AppointmentDetailsPage() {
  const params = useParams();

  const { id } = params;
  //  console.log(id)
  return (
    <>
      <Helmet>
        <title> Dashboard: Appointment Details</title>
      </Helmet>

      <AppointmentDetailsView id={id} />
    </>
  );
}
