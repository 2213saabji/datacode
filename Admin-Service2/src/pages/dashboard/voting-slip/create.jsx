import React from 'react';
import { Helmet } from 'react-helmet-async';

import { VotingSlip } from 'src/sections/voting-slip/view';

export default function create() {
  return (
    <>
      <Helmet>
        <title> Dashboard: VotingSlip Create</title>
      </Helmet>

      <VotingSlip />
    </>
  );
}
