import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { BoothEditView } from 'src/sections/boothmanagement/view';

// ----------------------------------------------------------------------

export default function BoothEditPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Dashboard: Booth Edit</title>
      </Helmet>

      <BoothEditView id={`${id}`} />
    </>
  );
}
