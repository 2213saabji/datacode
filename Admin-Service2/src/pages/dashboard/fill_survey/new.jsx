import { Helmet } from 'react-helmet-async';

import { JobCreateView } from 'src/sections/survey-view/view';

// ----------------------------------------------------------------------

export default function FillSurveyCreatePage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Fill Survey</title>
      </Helmet>

      <JobCreateView />
    </>
  );
}
