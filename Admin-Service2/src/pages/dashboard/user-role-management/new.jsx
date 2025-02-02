import { Helmet } from 'react-helmet-async';

import { RoleCreateView } from 'src/sections/userRoleManagement/view';

// ----------------------------------------------------------------------

export default function RoleCreatePage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Create a new Role</title>
      </Helmet>

      <RoleCreateView />
    </>
  );
}
