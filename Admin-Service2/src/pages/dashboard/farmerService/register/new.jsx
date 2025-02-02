import { Helmet } from 'react-helmet-async';

import { FarmerRegCreateView } from 'src/sections/Farmer-Service/register/view';

// ----------------------------------------------------------------------

export default function FarmerRegCreatePage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Register a new company</title>
      </Helmet>

      <FarmerRegCreateView />
    </>
  );
}
