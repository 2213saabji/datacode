import { Helmet } from 'react-helmet-async';
import React, { useState, useEffect } from 'react';

import { useParams } from 'src/routes/hooks';

import { JobListView } from 'src/sections/labourJobPortal/view';

export default function LabourJobList() {
  const params = useParams();
  const { jobType } = params;

  const [selfCoordinates, setSelfCoordinates] = useState({ lat: null, lng: null });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition((position) => {
        const newPosition = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        setSelfCoordinates(newPosition);
      });
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }, []);
  return (
    <>
      <Helmet>
        <title> Dashboard: Labour Job Portal</title>
      </Helmet>

      <JobListView selfCoordinates={selfCoordinates} jobType={jobType} />
    </>
  );
}
