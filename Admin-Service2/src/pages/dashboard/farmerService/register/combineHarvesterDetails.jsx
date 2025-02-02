import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { FarmerCombineDetailsView } from 'src/sections/Farmer-Service/register/view';

// ----------------------------------------------------------------------

export default function FarmerCombineDetailsPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Dashboard: Combine Harverter Details</title>
      </Helmet>

      <FarmerCombineDetailsView id={`${id}`} />
    </>
  );
}
