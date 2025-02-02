import { Helmet } from 'react-helmet-async';

import {VendorFilterListView} from 'src/sections/vendor/view'
// ----------------------------------------------------------------------

export default function VendorManagementListPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Filtered Vendor List</title>
      </Helmet>
          
      <VendorFilterListView />
    </>
  );
}
