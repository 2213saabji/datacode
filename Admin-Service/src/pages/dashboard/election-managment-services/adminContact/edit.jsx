import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { ContactEditView } from 'src/sections/adminContact/view';

// ----------------------------------------------------------------------

export default function ContactEditPage() {
  const params = useParams();

  const { id } = params;
  return (
    <>
      <Helmet>
        <title> Dashboard: Contact Edit</title>
      </Helmet>

      <ContactEditView id={`${id}`} />
    </>
  );
}
