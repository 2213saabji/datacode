import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { TripManagedDetailsView } from 'src/sections/trip/view';
// ----------------------------------------------------------------------

export default function TripManagedDetailsPage() {
  const params = useParams();

  const { id } = params;
  return (
    <>
      <Helmet>
        <title> Dashboard: Trip Management</title>
      </Helmet>

      <TripManagedDetailsView id={`${id}`} />
    </>
  );
}
