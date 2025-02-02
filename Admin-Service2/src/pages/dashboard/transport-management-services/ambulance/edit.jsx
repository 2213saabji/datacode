import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { AmbulanceEditView } from 'src/sections/ambulance/view';

// ----------------------------------------------------------------------

export default function AmbulanceEditPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Dashboard: Ambulance Edit</title>
      </Helmet>

      <AmbulanceEditView id={`${id}`} />
    </>
  );
}
