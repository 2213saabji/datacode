import { Helmet } from 'react-helmet-async';

import { VoterUserInfo } from 'src/sections/voter_user/view';
// ----------------------------------------------------------------------

export default function RoleManagementListPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Details</title>
      </Helmet>

      <VoterUserInfo />
    </>
  );
}
