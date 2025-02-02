import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { TripEditView } from 'src/sections/trip/view';

// ----------------------------------------------------------------------

export default function TripEditPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Dashboard: Trip Edit</title>
      </Helmet>

      <TripEditView id={`${id}`} />
    </>
  );
}
