import React from 'react';
import { Helmet } from 'react-helmet-async';

import { CardCreateView } from 'src/sections/add_cards/view';

export default function CardAddPageView() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Card Add</title>
      </Helmet>

      <CardCreateView />
    </>
  );
}
