import { Helmet } from 'react-helmet-async';

import { BasicFeaturesView } from 'src/sections/basic-features/view';
// ----------------------------------------------------------------------

export default function BasicFeaturesPage() {
  return (
    <>
      <Helmet>
        <title> EMS: Basic Features</title>
      </Helmet>

      <BasicFeaturesView />
    </>
  );
}
