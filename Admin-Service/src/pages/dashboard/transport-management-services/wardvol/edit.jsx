import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { WardvolEditView } from 'src/sections/wardvol/view';

// ----------------------------------------------------------------------

export default function WardvolEditPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Dashboard: Wardvol Edit</title>
      </Helmet>

      <WardvolEditView id={`${id}`} />
    </>
  );
}
