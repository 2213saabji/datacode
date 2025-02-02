import React from 'react';
import { Helmet } from 'react-helmet-async';

import { StudentCareer } from 'src/sections/Student-career/view';

export default function create() {
  return (
    <>
      <Helmet>
        <title> Dashboard: StudentCareer Create</title>
      </Helmet>

      <StudentCareer />
    </>
  );
}
