import React from 'react';
import { Helmet } from 'react-helmet-async';

import { InterestedStudentsListView } from 'src/sections/Student-career/view';

export default function InterestedStudentsList() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Interested Students</title>
      </Helmet>

      <InterestedStudentsListView />
    </>
  );
}
