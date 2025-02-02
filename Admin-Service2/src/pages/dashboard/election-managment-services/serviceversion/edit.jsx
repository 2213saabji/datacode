import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import ServiceVersionEditView from 'src/sections/serviceversioncontrol/view/service-version-edit-view';

// ----------------------------------------------------------------------

export default function ServiceVersionEditPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Dashboard: Service version Edit</title>
      </Helmet>

      <ServiceVersionEditView id={`${id}`} />
    </>
  );
}
