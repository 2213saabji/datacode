import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { ProductRoleEditView } from 'src/sections/product-Management/view';

// ----------------------------------------------------------------------

export default function ProductRoleEditPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Dashboard: Product Role Edit</title>
      </Helmet>

      <ProductRoleEditView id={`${id}`} />
    </>
  );
}
