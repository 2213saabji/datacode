import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import {CaseEditView} from 'src/sections/case/view'

// ----------------------------------------------------------------------

export default function CaseEditPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Dashboard: Case Edit</title>
      </Helmet>

      <CaseEditView id={`${id}`} />
    </>
  );
}
