import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { CattleCombineDetailsView } from 'src/sections/Farmer-Service/cattle/view';

// ----------------------------------------------------------------------

export default function CattleDetailsPage() {
  const params = useParams();

  const { id, cattleTypeId } = params;
  console.log('---->', cattleTypeId)

  return (
    <>
      <Helmet>
        <title> Dashboard: Cattle Details</title>
      </Helmet>

      <CattleCombineDetailsView id={`${id}`} cattleTypeId={`${cattleTypeId}`}/>
    </>
  );
}
