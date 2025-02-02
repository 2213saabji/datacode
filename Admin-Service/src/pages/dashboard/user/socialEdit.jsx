import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';
import SocialEdit from 'src/sections/account/view/socialEdit';

// ----------------------------------------------------------------------

export default function SocialEditPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Dashboard: Social Profile Edit</title>
      </Helmet>

      <SocialEdit id={`${id}`} />
    </>
  );
}
