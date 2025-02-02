import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { DriverDetailsView } from 'src/sections/driver/view';

// ----------------------------------------------------------------------

export default function DriverDetailsPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Dashboard: Driver Details</title>
      </Helmet>

      <DriverDetailsView id={`${id}`} />
    </>
  );
}
