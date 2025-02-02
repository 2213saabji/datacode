import { Helmet } from 'react-helmet-async';

import { VoterResposnseView } from 'src/sections/survey/view';

// ----------------------------------------------------------------------

export default function SurveyVoterResponsePage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Voter Response List</title>
      </Helmet>

      <VoterResposnseView />
    </>
  );
}
