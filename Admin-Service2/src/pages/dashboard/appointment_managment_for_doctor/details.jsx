import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { AppointmentforDoctorDetailsView } from 'src/sections/AppointmentWithDoctor/view';

// ----------------------------------------------------------------------

export default function AppointmentDetailsPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Dashboard: Appointment Details</title>
      </Helmet>

      <AppointmentforDoctorDetailsView id={id} />
    </>
  );
}
