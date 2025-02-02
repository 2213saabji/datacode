import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import {LawyerEditView} from 'src/sections/lawyer/view'

// ----------------------------------------------------------------------

export default function LawyerEditPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Dashboard: Lawyer Edit</title>
      </Helmet>

      <LawyerEditView id={`${id}`} />
    </>
  );
}
