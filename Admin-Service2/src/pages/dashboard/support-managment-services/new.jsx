import { Helmet } from 'react-helmet-async';

import { SmsCreateView } from 'src/sections/supportmanagement/view';

// ----------------------------------------------------------------------

export default function SmsCreatePage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Create a new Sms</title>
      </Helmet>

      <SmsCreateView />
    </>
  );
}
