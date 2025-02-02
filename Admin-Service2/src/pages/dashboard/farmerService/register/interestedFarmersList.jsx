import { Helmet } from 'react-helmet-async';

import { InterestedFarmersListView } from 'src/sections/Farmer-Service/register/view';

// ----------------------------------------------------------------------

export default function InterestedFarmerRegListPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Company List</title>
      </Helmet>

      <InterestedFarmersListView />
    </>
  );
}
