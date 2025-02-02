import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { VehicleEditView } from 'src/sections/vehicle/view';

// ----------------------------------------------------------------------

export default function VehicleEditPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Dashboard: Vehicle Edit</title>
      </Helmet>

      <VehicleEditView id={`${id}`} />
    </>
  );
}
