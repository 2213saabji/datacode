import { Helmet } from 'react-helmet-async';

import {LawyerListView} from 'src/sections/lms-service/civil/view'
// ----------------------------------------------------------------------

export default function LawyerManagementListPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Property Disputes</title>
      </Helmet>
          
      <LawyerListView />
    </>
  );
}
