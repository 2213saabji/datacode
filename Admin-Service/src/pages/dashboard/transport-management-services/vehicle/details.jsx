import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { VehicleDetailsView } from 'src/sections/vehicle/view';

// ----------------------------------------------------------------------

export default function VehicleDetailsPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Dashboard: Vehicle Details</title>
      </Helmet>

      <VehicleDetailsView id={`${id}`} />
    </>
  );
}
