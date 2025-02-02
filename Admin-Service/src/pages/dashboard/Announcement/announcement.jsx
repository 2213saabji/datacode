import React from 'react';
import { Helmet } from 'react-helmet-async';

import { LaunchAnnouncement } from 'src/sections/Announcement/view';

export default function LaunchEvent() {
  return (
    <>
      <Helmet>
        <title> Dashboard: EMS Launch Announcement</title>
      </Helmet>

      <LaunchAnnouncement />
    </>
  );
}
