import { useParams } from 'react-router';
import { Helmet } from 'react-helmet-async';

import { CabTripDetailsView } from 'src/sections/cab-service/view';

// ----------------------------------------------------------------------

export default function CabTripDetailsPage() {
  const params = useParams();

  const { id } = params;
  return (
    <>
      <Helmet>
        <title> Dashboard: Create a Cab Trip Details</title>
      </Helmet>

      <CabTripDetailsView id={id}/>
    </>
  );
}
