import { Helmet } from 'react-helmet-async';

import { JobCreateView } from 'src/sections/survey/view';

// ----------------------------------------------------------------------

export default function SurveyCreatePage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Create a new survey</title>
      </Helmet>

      <JobCreateView />
    </>
  );
}
