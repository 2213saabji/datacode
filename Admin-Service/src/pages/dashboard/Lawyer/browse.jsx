import { Helmet } from 'react-helmet-async';

import {BrowseView} from 'src/sections/lawyer/view'
// ----------------------------------------------------------------------

export default function LawyerManagementListPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Lawyer Management</title>
      </Helmet>
          
      <BrowseView />
    </>
  );
}
