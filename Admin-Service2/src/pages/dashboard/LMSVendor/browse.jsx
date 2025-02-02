import { Helmet } from 'react-helmet-async';

import {BrowseView} from 'src/sections/vendor/view'
// ----------------------------------------------------------------------

export default function LawyerManagementListPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Charted Accountant Management</title>
      </Helmet>
          
      <BrowseView />
    </>
  );
}
