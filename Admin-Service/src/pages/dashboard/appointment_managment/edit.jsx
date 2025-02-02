import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { AppointmentEditView } from 'src/sections/Appointment/view';

// ----------------------------------------------------------------------

export default function AppointmentEditPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Dashboard: Appointment Edit</title>
      </Helmet>

      <AppointmentEditView id={`${id}`} />
    </>
  );
}
