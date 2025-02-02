import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import {SubServiceDetailsView} from 'src/sections/sub-service/view'

// ----------------------------------------------------------------------

export default function SubServiceDetailsPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Dashboard: Sub Service Details</title>
      </Helmet>

      <SubServiceDetailsView   id={`${id}`}  />
    </>
  );
}
