import React from 'react';
import { Helmet } from 'react-helmet-async';

import { ReferalCreate } from 'src/sections/VoterReferal/view';

export default function create() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Voter Referal Create</title>
      </Helmet>

      <ReferalCreate />
    </>
  );
}
