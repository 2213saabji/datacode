import { Helmet } from 'react-helmet-async';

import { ProductCreateView } from 'src/sections/product-Management/view';

// ----------------------------------------------------------------------

export default function ProductManagementCreatePage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Create a new productId</title>
      </Helmet>

      <ProductCreateView />
    </>
  );
}
