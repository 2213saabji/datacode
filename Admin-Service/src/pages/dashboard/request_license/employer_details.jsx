import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import EmployerDetailsView from 'src/sections/request_license_acceptence/employer-details';

// ----------------------------------------------------------------------

export default function RequestLicenseAcceptanceDetails() {
  const params = useParams();

  const { id } = params;
  return (
    <>
      <Helmet>
        <title> Dashboard: Employee Details</title>
      </Helmet>

      <EmployerDetailsView id={`${id}`} />
    </>
  );
}
