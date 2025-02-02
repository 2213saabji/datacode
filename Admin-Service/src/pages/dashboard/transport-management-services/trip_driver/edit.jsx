import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { TripDriverEditView } from 'src/sections/trip-driver/view';

// ----------------------------------------------------------------------

export default function TripDriverEditPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Dashboard: TripDriver Edit</title>
      </Helmet>

      <TripDriverEditView id={`${id}`} />
    </>
  );
}
