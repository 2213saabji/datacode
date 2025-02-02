import { Helmet } from 'react-helmet-async';

import {LawyerCreateView} from 'src/sections/lawyer/view'
// ----------------------------------------------------------------------

export default function VendorCreatePage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Create a new Lawyer</title>
      </Helmet>

      <LawyerCreateView />
    </>
  );
}