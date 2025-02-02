import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { DriverEditView } from 'src/sections/driver/view';

// ----------------------------------------------------------------------

export default function DriverEditPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Dashboard: Driver Edit</title>
      </Helmet>

      <DriverEditView id={`${id}`} />
    </>
  );
}
