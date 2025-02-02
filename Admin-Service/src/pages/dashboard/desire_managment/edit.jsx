import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { DesireEditView } from 'src/sections/Desire-manegament/view';

// ----------------------------------------------------------------------

export default function AppointmentEditPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Dashboard: Desire Edit</title>
      </Helmet>

      <DesireEditView id={`${id}`} />
    </>
  );
}
