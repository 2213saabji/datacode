import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import SellerOwnerDetailsView from 'src/sections/request_license_acceptence/seller-owner-details';

// ----------------------------------------------------------------------

export default function RequestLicenseSellerOwnerAcceptanceDetails() {
  const params = useParams();

  const { id } = params;
  return (
    <>
      <Helmet>
        <title> Dashboard: Seller Owner Details</title>
      </Helmet>

      <SellerOwnerDetailsView id={`${id}`} />
    </>
  );
}
