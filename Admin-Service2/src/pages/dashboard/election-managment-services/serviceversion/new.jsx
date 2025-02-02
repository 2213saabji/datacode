import { Helmet } from 'react-helmet-async';

import ServiceVersionCreateView from 'src/sections/serviceversioncontrol/view/service-version-create-view';
// ----------------------------------------------------------------------

export default function ServiceVersionCreatePage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Add a new Service version</title>
      </Helmet>

      <ServiceVersionCreateView />
    </>
  );
}
