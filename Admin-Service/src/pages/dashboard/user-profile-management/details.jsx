import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { RoleDetailsView } from 'src/sections/userProfileManagement/view';

// ----------------------------------------------------------------------

export default function RoleDetailsPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Dashboard: Role Details</title>
      </Helmet>

      <RoleDetailsView id={`${id}`} />
    </>
  );
}
