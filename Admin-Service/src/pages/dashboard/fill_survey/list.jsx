import { Helmet } from 'react-helmet-async';

import { JobSubmitView } from 'src/sections/survey-view/view';

// ----------------------------------------------------------------------

export default function FillSurveyDetailsPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Survey Details</title>
      </Helmet>

      <JobSubmitView />
    </>
  );
}
