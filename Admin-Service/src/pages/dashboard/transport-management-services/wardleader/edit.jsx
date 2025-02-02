import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { WardLeaderEditView } from 'src/sections/ward-leader/view';

// ----------------------------------------------------------------------

export default function WardLeaderEditPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Dashboard: WardLeader Edit</title>
      </Helmet>

      <WardLeaderEditView id={`${id}`} />
    </>
  );
}
