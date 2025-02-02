import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import {VendorEditView} from 'src/sections/vendor/view'

// ----------------------------------------------------------------------

export default function VendorEditPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Dashboard: Vendor Edit</title>
      </Helmet>

      <VendorEditView id={`${id}`} />
    </>
  );
}
