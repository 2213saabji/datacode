import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { ClientDetailsView } from 'src/sections/clientCompanyLms/view';



// ----------------------------------------------------------------------

export default function ChartedDetailPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Dashboard: Client Details</title>
      </Helmet>


      <ClientDetailsView id={id} />

      

    </>
  );
}
