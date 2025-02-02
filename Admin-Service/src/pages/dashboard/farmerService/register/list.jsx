import { Helmet } from 'react-helmet-async';

import { FarmerRegListView } from 'src/sections/Farmer-Service/register/view';

// ----------------------------------------------------------------------

export default function FarmerRegListPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Company List</title>
      </Helmet>

      <FarmerRegListView />
    </>
  );
}
