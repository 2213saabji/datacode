import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { FeedbackDetailsView } from 'src/sections/feedback-form';

// ----------------------------------------------------------------------

export default function FeedbackFormDetails() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Dashboard: Suggestion Details</title>
      </Helmet>

      <FeedbackDetailsView id={`${id}`} />
    </>
  );
}
