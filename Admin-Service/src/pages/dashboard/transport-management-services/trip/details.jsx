import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { TripDetailsView } from 'src/sections/trip/view';

// ----------------------------------------------------------------------

export default function TripDetailsPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Dashboard: Trip Details</title>
      </Helmet>

      <TripDetailsView id={`${id}`} />
    </>
  );
}
