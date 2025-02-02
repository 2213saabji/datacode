import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import ServiceProviderDetailsView from 'src/sections/request_license_acceptence/Service-provider-details';

// ----------------------------------------------------------------------

export default function RequestLicenseAcceptanceDetails() {
  const params = useParams();

  const { id } = params;
  return (
    <>
      <Helmet>
        <title> Dashboard: Doctor Details</title>
      </Helmet>

      <ServiceProviderDetailsView id={`${id}`} />
    </>
  );
}
