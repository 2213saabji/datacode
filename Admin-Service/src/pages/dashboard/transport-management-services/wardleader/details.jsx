import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { WardLeaderDetailsView } from 'src/sections/ward-leader/view';

// ----------------------------------------------------------------------

export default function WardLeaderDetailsPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Dashboard: WardLeader Details</title>
      </Helmet>

      <WardLeaderDetailsView id={`${id}`} />
    </>
  );
}
