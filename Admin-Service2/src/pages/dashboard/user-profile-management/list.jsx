import { Helmet } from 'react-helmet-async';

import { RoleListView } from 'src/sections/userProfileManagement/view';

// ----------------------------------------------------------------------

export default function RoleManagementListPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Role Management</title>
      </Helmet>

      <RoleListView />
    </>
  );
}
