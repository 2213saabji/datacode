import { Helmet } from 'react-helmet-async';

import {ChartedAccountantFilterListView} from 'src/sections/chartedAccountant/view'
// ----------------------------------------------------------------------

export default function LawyerManagementListPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Filtered CA List</title>
      </Helmet>
          
      <ChartedAccountantFilterListView />
    </>
  );
}
