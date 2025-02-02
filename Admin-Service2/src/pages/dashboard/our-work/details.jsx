import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { WorkDetailsView } from 'src/sections/ourwork/view';

// ----------------------------------------------------------------------

export default function WorkDetailsPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Dashboard: Work Details</title>
      </Helmet>

      <WorkDetailsView id={`${id}`} />
    </>
  );
}
