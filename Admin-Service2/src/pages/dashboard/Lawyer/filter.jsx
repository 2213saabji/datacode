import { Helmet } from 'react-helmet-async';

import {LawyerFilterListView} from 'src/sections/lawyer/view'
// ----------------------------------------------------------------------

export default function LawyerManagementListPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Filtered Lawyer List</title>
      </Helmet>
          
      <LawyerFilterListView />
    </>
  );
}
