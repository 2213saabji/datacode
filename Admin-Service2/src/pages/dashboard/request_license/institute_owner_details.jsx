import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import InstituteOwnerDetailsView from 'src/sections/request_license_acceptence/institute-details';

// ----------------------------------------------------------------------

export default function RequestLicenseInstituteOwnerAcceptanceDetails() {
  const params = useParams();

  const { id } = params;
  return (
    <>
      <Helmet>
        <title> Dashboard: Institute Owner Details</title>
      </Helmet>

      <InstituteOwnerDetailsView id={`${id}`} />
    </>
  );
}
