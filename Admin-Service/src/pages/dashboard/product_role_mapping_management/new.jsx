import { Helmet } from 'react-helmet-async';

import { ProductMappingCreateView } from 'src/sections/product-management-role-mapping/view';

// ----------------------------------------------------------------------

export default function ProductCreatePage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Create a new product Role Mapping</title>
      </Helmet>

      <ProductMappingCreateView />
    </>
  );
}
