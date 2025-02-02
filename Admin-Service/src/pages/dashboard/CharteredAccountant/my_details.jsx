import { Helmet } from 'react-helmet-async';

import {ChartedAccountantDetailsViewById} from 'src/sections/chartedAccountant/view'

// ----------------------------------------------------------------------

export default function VendorDetailsPage() {


  return (
    <>
      <Helmet>
        <title> Dashboard: Your Details</title>
      </Helmet>

      <ChartedAccountantDetailsViewById/>
    </>
  );
}
