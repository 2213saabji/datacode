import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { BoothDetailsView } from 'src/sections/boothmanagement/view';

// ----------------------------------------------------------------------

export default function BoothDetailsPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Dashboard: Booth Details</title>
      </Helmet>

      <BoothDetailsView id={id} />
    </>
  );
}
