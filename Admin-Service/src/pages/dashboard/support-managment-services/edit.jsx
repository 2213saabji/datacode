import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { SmsEditView } from 'src/sections/supportmanagement/view';

// ----------------------------------------------------------------------

export default function SmsEditPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Dashboard: Sms Edit</title>
      </Helmet>

      <SmsEditView id={`${id}`} />
    </>
  );
}
