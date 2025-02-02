import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { InstituteAppointmentEdit } from 'src/sections/Student-career/Institution_Appointment/view';

export default function InstituteAppointmentEditView() {
  const params = useParams();

  const { id } = params;
  return (
    <>
      <Helmet>
        <title> Dashboard: Institute Appointment Update </title>
      </Helmet>

      <InstituteAppointmentEdit id={`${id}`} />
    </>
  );
}
