import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { FarmerIrrigationDetailsView } from 'src/sections/Farmer-Service/register/view';

// ----------------------------------------------------------------------

export default function FarmerIrrigationDetailsPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Dashboard: Irrigation Tool Details</title>
      </Helmet>

      <FarmerIrrigationDetailsView id={`${id}`} />
    </>
  );
}
