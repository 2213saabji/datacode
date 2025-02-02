import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { AmbulanceTripDetailsView } from 'src/sections/ambulance-trip/view';

// ----------------------------------------------------------------------

export default function AmbulanceTripDetailsPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Dashboard: Ambulance Details</title>
      </Helmet>

      <AmbulanceTripDetailsView id={`${id}`} />
    </>
  );
}
