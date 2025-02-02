import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { JobDetailsView } from 'src/sections/survey/view';

// ----------------------------------------------------------------------

export default function SurveyDetailsPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Dashboard: Survey Details</title>
      </Helmet>

      <JobDetailsView id={`${id}`} />
    </>
  );
}
