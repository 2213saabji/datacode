import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { FarmerModernAgriDetailsView } from 'src/sections/Farmer-Service/register/view';

// ----------------------------------------------------------------------

export default function FarmerModerAgriDetailsPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Dashboard: Modern Agriculture Tool Details</title>
      </Helmet>

      <FarmerModernAgriDetailsView id={`${id}`} />
    </>
  );
}
