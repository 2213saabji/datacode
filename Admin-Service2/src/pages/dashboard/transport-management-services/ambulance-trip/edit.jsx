import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { AmbulanceTripEditView } from 'src/sections/ambulance-trip/view';

// ----------------------------------------------------------------------

export default function AmbulanceTripEditPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Dashboard: Ambulance Edit</title>
      </Helmet>

      <AmbulanceTripEditView id={`${id}`} />
    </>
  );
}
