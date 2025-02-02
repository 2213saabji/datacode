import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { ContactDetailsView } from 'src/sections/adminContact/view';

// ----------------------------------------------------------------------

export default function WardDetailsPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Dashboard: Contact Details</title>
      </Helmet>

      <ContactDetailsView id={id} />
    </>
  );
}
