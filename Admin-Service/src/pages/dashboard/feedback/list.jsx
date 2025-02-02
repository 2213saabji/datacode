import { Helmet } from 'react-helmet-async';

import { FeedbackFormList } from 'src/sections/feedback-form';

// ----------------------------------------------------------------------

export default function FeedbackFormListPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Suggestion Box</title>
      </Helmet>
      <FeedbackFormList />
    </>
  );
}
