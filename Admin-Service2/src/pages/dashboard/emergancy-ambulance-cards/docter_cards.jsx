import React from 'react';
import { Helmet } from 'react-helmet-async';

import { DocterCardListView } from 'src/sections/docter_cards/view';

export default function docterCard() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Emergency Services</title>
      </Helmet>

      <DocterCardListView />
    </>
  );
}
