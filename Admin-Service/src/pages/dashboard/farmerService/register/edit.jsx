import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { FarmerRegEditView } from 'src/sections/Farmer-Service/register/view';

// ----------------------------------------------------------------------

export default function FarmerRegEditPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Dashboard: Company Edit</title>
      </Helmet>

      <FarmerRegEditView id={`${id}`} />
    </>
  );
}
