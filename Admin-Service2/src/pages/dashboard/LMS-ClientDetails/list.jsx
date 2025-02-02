import { Helmet } from 'react-helmet-async';

import { ClientListView } from 'src/sections/clientDetailsLms/view';

// ----------------------------------------------------------------------

export default function ChartedAccountListPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Client List</title>
      </Helmet>

      <ClientListView />
    </>
  );
}
