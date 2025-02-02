import React from 'react';
import { Helmet } from 'react-helmet-async';

import { GovtScheme } from 'src/sections/govtSchemes';

export default function create() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Government Scheme</title>
      </Helmet>

      <GovtScheme />
    </>
  );
}
