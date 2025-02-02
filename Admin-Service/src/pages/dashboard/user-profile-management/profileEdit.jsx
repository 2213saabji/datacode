import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { ProfileRole } from 'src/sections/userProfileManagement/view';

// ----------------------------------------------------------------------

export default function ProfileEdit() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Dashboard: Profile User Edit</title>
      </Helmet>

      <ProfileRole id={`${id}`} />
    </>
  );
}
