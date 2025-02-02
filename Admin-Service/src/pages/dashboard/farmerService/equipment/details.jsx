import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';
import { FarmerCombineDetailsView } from 'src/sections/Farmer-Service/equipment/view';


// ----------------------------------------------------------------------

export default function  FarmerDetailsPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Dashboard:  Farmer Details</title>
      </Helmet>

      <FarmerCombineDetailsView id={`${id}`} />
    </>
  );
}
