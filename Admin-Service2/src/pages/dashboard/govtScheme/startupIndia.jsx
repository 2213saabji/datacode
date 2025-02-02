import React from 'react';
import { Helmet } from 'react-helmet-async';

import { StartUpIndia } from 'src/sections/govtSchemes';

export default function Company() {
  return (
    <>
      <Helmet>
        <title> Dashboard:  Start up India</title>
      </Helmet>

      <StartUpIndia />
    </>
  );
}
