import { Helmet } from 'react-helmet-async';

import { JobListView } from 'src/sections/survey/view';

// ----------------------------------------------------------------------

export default function SurveyListPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Survey List</title>
      </Helmet>

      <JobListView />
    </>
  );
}
