import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import {LawyerDetailsView} from 'src/sections/lawyer/view'

// ----------------------------------------------------------------------

export default function VendorDetailsPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Dashboard: Lawyer Details</title>
      </Helmet>

      <LawyerDetailsView   id={`${id}`}  />
    </>
  );
}
