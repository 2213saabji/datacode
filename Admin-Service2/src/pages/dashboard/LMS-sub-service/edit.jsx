import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import {SubServiceEditView} from 'src/sections/sub-service/view'

// ----------------------------------------------------------------------

export default function SubServiceEditPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Dashboard: Sub Service Edit</title>
      </Helmet>

      <SubServiceEditView id={`${id}`} />
    </>
  );
}
