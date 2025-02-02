import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { FarmerCultivationDetailsView } from 'src/sections/Farmer-Service/register/view';

// ----------------------------------------------------------------------

export default function FarmerCultivationDetailsPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Dashboard: Cultivation Tool Details</title>
      </Helmet>

      <FarmerCultivationDetailsView id={`${id}`} />
    </>
  );
}
