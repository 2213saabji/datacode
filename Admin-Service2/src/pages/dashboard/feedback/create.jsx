import React from 'react';
import { Helmet } from 'react-helmet-async';

import { FeedbackForm } from 'src/sections/feedback-form';

export default function Feedback() {
  return (
    <>
      <Helmet>
        <title> Dashboard: FarmerService Create</title>
      </Helmet>

      <FeedbackForm />
    </>
  );
}
