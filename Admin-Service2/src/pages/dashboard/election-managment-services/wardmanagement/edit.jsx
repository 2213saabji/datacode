import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { WardEditView } from 'src/sections/wardmanagement/view';

// ----------------------------------------------------------------------

export default function WardEditPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Dashboard: Ward Edit</title>
      </Helmet>

      <WardEditView id={`${id}`} />
    </>
  );
}
