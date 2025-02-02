import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { FarmerAppointmentDetailsView } from 'src/sections/Farmer-Service/register/view';

// ----------------------------------------------------------------------

export default function FarmerAppointmentDetailsPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Dashboard: Appointment Details</title>
      </Helmet>

      <FarmerAppointmentDetailsView id={`${id}`} />
    </>
  );
}
