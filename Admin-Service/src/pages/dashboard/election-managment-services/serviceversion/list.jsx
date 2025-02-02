import { Helmet } from 'react-helmet-async';

import ServiceVersionListView from 'src/sections/serviceversioncontrol/view/service-version-list-view';
// ----------------------------------------------------------------------

export default function ServiceVersionManagementListPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Service version Management</title>
      </Helmet>

      <ServiceVersionListView />
    </>
  );
}
