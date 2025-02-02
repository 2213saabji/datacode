import { Helmet } from 'react-helmet-async';

import { ClientListView } from 'src/sections/clientCompanyLms/view';

// ----------------------------------------------------------------------

export default function ChartedAccountListPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Client Company List</title>
      </Helmet>

      <ClientListView />
    </>
  );
}
