import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { AmbulanceManagedDetailsView } from 'src/sections/ambulance/view';
// ----------------------------------------------------------------------

export default function AmbulanceManagedDetailsPage() {
  const params = useParams();

  const { id } = params;
  return (
    <>
      <Helmet>
        <title> Dashboard: Ambulance Management</title>
      </Helmet>

      <AmbulanceManagedDetailsView id={`${id}`} />
    </>
  );
}
