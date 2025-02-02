import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { FarmerAppointmentEditView } from 'src/sections/Farmer-Service/register/view';

// ----------------------------------------------------------------------

export default function FarmerAppoinmentEditPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Dashboard: Appointmnet Edit</title>
      </Helmet>

      <FarmerAppointmentEditView id={`${id}`} />
    </>
  );
}
