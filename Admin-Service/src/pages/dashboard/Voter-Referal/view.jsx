import React from 'react';
import { Helmet } from 'react-helmet-async';

import { ReferalView } from 'src/sections/VoterReferal/view';

export default function view() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Voter Referal Details</title>
      </Helmet>

      <ReferalView />
    </>
  );
}
