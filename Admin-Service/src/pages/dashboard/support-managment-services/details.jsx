import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { SmsDetailsView } from 'src/sections/supportmanagement/view';

// ----------------------------------------------------------------------

export default function SmsDetailsPage() {
  const params = useParams();

  const { id } = params;
  //
  return (
    <>
      <Helmet>
        <title> Dashboard: Sms Details</title>
      </Helmet>

      <SmsDetailsView id={`${id}`} />
    </>
  );
}
