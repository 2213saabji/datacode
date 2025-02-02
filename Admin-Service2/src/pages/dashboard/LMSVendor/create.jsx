import { Helmet } from 'react-helmet-async';

import {VendorCreateView} from 'src/sections/vendor/view'
// ----------------------------------------------------------------------

export default function VendorCreatePage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Create a new Vendor</title>
      </Helmet>

      <VendorCreateView />
    </>
  );
}