import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import ServiceVersionDetailsView from 'src/sections/serviceversioncontrol/view/service-version-details-view';

// ----------------------------------------------------------------------

export default function ServiceVersionDetailsPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Dashboard: Service version Details</title>
      </Helmet>

      <ServiceVersionDetailsView id={`${id}`} />
    </>
  );
}
