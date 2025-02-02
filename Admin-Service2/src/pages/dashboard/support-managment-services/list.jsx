import { Helmet } from 'react-helmet-async';

import { SmsListView } from 'src/sections/supportmanagement/view';

// ----------------------------------------------------------------------

export default function SmsListPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Sms List</title>
      </Helmet>

      <SmsListView />
    </>
  );
}
