import { Helmet } from 'react-helmet-async';

import { ChartedAccountantListView } from 'src/sections/chartedAccountant/view';

// ----------------------------------------------------------------------

export default function ChartedAccountListPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Charted Accountant List</title>
      </Helmet>

      <ChartedAccountantListView />
    </>
  );
}
