import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { WardDetailsView } from 'src/sections/wardmanagement/view';

// ----------------------------------------------------------------------

export default function WardDetailsPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Dashboard: Ward Details</title>
      </Helmet>

      <WardDetailsView id={id} />
    </>
  );
}
