import React from 'react';
import { Helmet } from 'react-helmet-async';

import { CreateTourAndTravels } from 'src/sections/tourAndTravels/view';

export default function create() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Tour and Travels Create</title>
      </Helmet>

      <CreateTourAndTravels />
    </>
  );
}
