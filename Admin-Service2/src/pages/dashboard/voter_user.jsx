import { Helmet } from 'react-helmet-async';

import { VoterUserView } from 'src/sections/voter_user/view';
// ----------------------------------------------------------------------

export default function RoleManagementListPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Details</title>
      </Helmet>

      <VoterUserView />
    </>
  );
}
