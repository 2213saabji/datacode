import React from 'react';
import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { AmbulanceTrack } from 'src/sections/ambulance/view';

export default function Create() {
  const params = useParams();

  const { id } = params;
  return (
    <>
      <Helmet>
        <title> Dashboard: AssignedVehicle Create</title>
      </Helmet>

      <AmbulanceTrack id={`${id}`} />
    </>
  );
}
