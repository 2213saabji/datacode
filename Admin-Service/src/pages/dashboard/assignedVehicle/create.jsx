import React from 'react';
import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { AssignedVehicle } from 'src/sections/assigned-vehicle/view';

export default function Create() {
  const params = useParams();

  const { id } = params;
  return (
    <>
      <Helmet>
        <title> Dashboard: AssignedVehicle Create</title>
      </Helmet>

      <AssignedVehicle id={`${id}`} />
    </>
  );
}
