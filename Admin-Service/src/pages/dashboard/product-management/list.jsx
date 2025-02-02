import { Helmet } from 'react-helmet-async';

import { ProductListView } from 'src/sections/product-Management/view';

// ----------------------------------------------------------------------

export default function ProductManagementListPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Product List</title>
      </Helmet>

      <ProductListView />
    </>
  );
}
