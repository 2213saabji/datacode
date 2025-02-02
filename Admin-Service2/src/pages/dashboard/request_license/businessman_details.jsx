import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import BusinessmanDetailsView from 'src/sections/request_license_acceptence/businessman-details';

// ----------------------------------------------------------------------

export default function RequestLicenseAcceptanceDetails() {
  const params = useParams();
  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Dashboard: Busminessman Details</title>
      </Helmet>

      <BusinessmanDetailsView id={`${id}`} />
    </>
  );
}
