import { Helmet } from 'react-helmet-async';

import { ContactListView } from 'src/sections/adminContact/view';

// ----------------------------------------------------------------------

export default function ContactListPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Contact</title>
      </Helmet>

      <ContactListView />
    </>
  );
}
