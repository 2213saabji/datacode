import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import {LawyerDetailsViewById} from 'src/sections/lawyer/view'

// ----------------------------------------------------------------------

export default function VendorDetailsPage() {

  const params = useParams();

  const { id } = params;
  return (
    <>
      <Helmet>
        <title> Dashboard: Your Details</title>
      </Helmet>

      <LawyerDetailsViewById  id={`${id}`} />
    </>
  );
}
