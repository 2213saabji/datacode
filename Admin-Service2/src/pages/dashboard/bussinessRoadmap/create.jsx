import React from 'react';
import { Helmet } from 'react-helmet-async';

import { BussinessRoadmap } from 'src/sections/Bussiness-Roadmap/view';

export default function create() {
  return (
    <>
      <Helmet>
        <title> Dashboard: BussinessRoadmap Create</title>
      </Helmet>

      <BussinessRoadmap />
    </>
  );
}
