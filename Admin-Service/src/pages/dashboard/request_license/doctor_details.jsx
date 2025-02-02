import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import DoctorDetailsView from 'src/sections/request_license_acceptence/doctor-details';

// ----------------------------------------------------------------------

export default function RequestLicenseAcceptanceDetails() {
  const params = useParams();

  const { id } = params;
  return (
    <>
      <Helmet>
        <title> Dashboard: Doctor Details</title>
      </Helmet>

      <DoctorDetailsView id={`${id}`} />
    </>
  );
}
