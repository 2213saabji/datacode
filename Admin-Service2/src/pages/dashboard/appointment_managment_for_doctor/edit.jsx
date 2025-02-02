import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { AppointmentforDoctorEditView } from 'src/sections/AppointmentWithDoctor/view';

// ----------------------------------------------------------------------

export default function AppointmentEditPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Dashboard: DrAppointment Edit</title>
      </Helmet>

      <AppointmentforDoctorEditView id={`${id}`} />
    </>
  );
}
