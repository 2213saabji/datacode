import { Helmet } from 'react-helmet-async';

import {VendorListView} from 'src/sections/vendor/view'
// ----------------------------------------------------------------------

export default function VendorManagementListPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Vendor Management</title>
      </Helmet>
          
      <VendorListView />
    </>
  );
}
