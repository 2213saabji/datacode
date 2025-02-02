import { Helmet } from 'react-helmet-async';

import { ProductMappingListView } from 'src/sections/product-management-role-mapping/view';

// ----------------------------------------------------------------------

export default function ProductManagementListPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Product Role Mapping List</title>
      </Helmet>

      <ProductMappingListView />
    </>
  );
}
