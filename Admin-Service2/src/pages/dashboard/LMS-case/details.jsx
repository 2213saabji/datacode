import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import {CaseDetailsView} from 'src/sections/case/view'

// ----------------------------------------------------------------------

export default function CaseDetailsPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Dashboard: Case Details</title>
      </Helmet>

      <CaseDetailsView   id={`${id}`}  />
    </>
  );
}
