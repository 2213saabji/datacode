import React from 'react';
import { Helmet } from 'react-helmet-async';

import { WomanEmpourment } from 'src/sections/woman_empourment/view';

export default function create() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Woman Empourment</title>
      </Helmet>

      <WomanEmpourment />
    </>
  );
}
