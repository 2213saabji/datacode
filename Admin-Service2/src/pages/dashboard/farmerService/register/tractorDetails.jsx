import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { FarmerTractorDetailsView } from 'src/sections/Farmer-Service/register/view';

// ----------------------------------------------------------------------

export default function FarmerTractorDetailsPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Dashboard: Tractor Details</title>
      </Helmet>

      <FarmerTractorDetailsView id={`${id}`} />
    </>
  );
}
