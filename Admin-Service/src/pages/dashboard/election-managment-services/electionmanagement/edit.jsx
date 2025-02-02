import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { ElectionEditView } from 'src/sections/electionmanagement/view';

// ----------------------------------------------------------------------

export default function ElectionEditPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Dashboard: Election Edit</title>
      </Helmet>

      <ElectionEditView id={`${id}`} />
    </>
  );
}
