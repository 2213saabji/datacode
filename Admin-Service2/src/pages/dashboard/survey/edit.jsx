import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { JobEditView } from 'src/sections/survey/view';

// ----------------------------------------------------------------------

export default function SurveyEditPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Dashboard: Survey Edit</title>
      </Helmet>

      <JobEditView id={`${id}`} />
    </>
  );
}
