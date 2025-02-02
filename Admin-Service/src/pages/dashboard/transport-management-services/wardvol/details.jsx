import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { WardvolDetailsView } from 'src/sections/wardvol/view';

// ----------------------------------------------------------------------

export default function WardvolDetailsPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Dashboard: Wardvol Details</title>
      </Helmet>

      <WardvolDetailsView id={`${id}`} />
    </>
  );
}
