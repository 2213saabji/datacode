import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { RoleEditView } from 'src/sections/userProfileManagement/view';

// ----------------------------------------------------------------------

export default function RoleEditPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Dashboard: Role Edit</title>
      </Helmet>

      <RoleEditView id={`${id}`} />
    </>
  );
}
