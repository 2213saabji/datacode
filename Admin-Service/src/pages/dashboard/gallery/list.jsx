import React from 'react';
import { Helmet } from 'react-helmet-async';

import { OverviewGalleryView } from 'src/sections/gallery/view';

export default function create() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Gallery</title>
      </Helmet>

      <OverviewGalleryView />
    </>
  );
}
