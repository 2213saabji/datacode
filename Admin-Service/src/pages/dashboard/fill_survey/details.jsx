import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { JobFillForm } from 'src/sections/survey-view/view';

// ----------------------------------------------------------------------

export default function FillSurveyDetailsPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Dashboard: Fill Survey Details</title>
      </Helmet>

      <JobFillForm id={`${id}`} />
    </>
  );
}
