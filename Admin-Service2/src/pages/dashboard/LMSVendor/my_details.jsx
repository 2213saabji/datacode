import { Helmet } from 'react-helmet-async';

import {VendorDetailsViewById} from 'src/sections/vendor/view'

// ----------------------------------------------------------------------

export default function VendorDetailsPage() {


  return (
    <>
      <Helmet>
        <title> Dashboard: Your Details</title>
      </Helmet>

      <VendorDetailsViewById/>
    </>
  );
}
