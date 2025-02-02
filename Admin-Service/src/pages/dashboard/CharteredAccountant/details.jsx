import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { ChartedAccountantDetailsView } from 'src/sections/chartedAccountant/view';

// ----------------------------------------------------------------------

export default function ChartedDetailPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Dashboard: Charted Account Details</title>
      </Helmet>

      <ChartedAccountantDetailsView id={id} />
    </>
  );
}
