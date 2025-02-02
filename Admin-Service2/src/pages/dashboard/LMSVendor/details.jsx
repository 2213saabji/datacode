import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import {VendorDetailsView} from 'src/sections/vendor/view'

// ----------------------------------------------------------------------

export default function VendorDetailsPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Dashboard: Vendor Details</title>
      </Helmet>

      <VendorDetailsView   id={`${id}`}  />
    </>
  );
}
