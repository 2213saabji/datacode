import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';
import LawyerDetailsView from '../../../sections/request_license_acceptence/lawyer-details';


// ----------------------------------------------------------------------

export default function RequestLicenseAcceptanceDetails() {
  const params = useParams();

  const { id } = params;
  return (
    <>
      <Helmet>
        <title> Dashboard: Lawyer Details</title>
      </Helmet>

      <LawyerDetailsView id={`${id}`} />
    </>
  );
}
