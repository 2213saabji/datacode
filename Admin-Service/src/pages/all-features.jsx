import { Helmet } from 'react-helmet-async';

import { AllFeaturesView } from 'src/sections/all-features/view';
// ----------------------------------------------------------------------

export default function AllFeaturesPage() {
  return (
    <>
      <Helmet>
        <title> EMS: All Features</title>
      </Helmet>

      <AllFeaturesView />
    </>
  );
}
