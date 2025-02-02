import { Helmet } from 'react-helmet-async';

import { CustomFeaturesView } from 'src/sections/custom-features/view';
// ----------------------------------------------------------------------

export default function BasicFeaturesPage() {
  return (
    <>
      <Helmet>
        <title> EMS: Basic Features</title>
      </Helmet>

      <CustomFeaturesView />
    </>
  );
}
