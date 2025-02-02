/* eslint-disable no-unused-vars */
import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { CreateYourPost } from 'src/sections/voter/view';

// ----------------------------------------------------------------------

export default function CreatePost() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Dashboard: Create Your Post</title>
      </Helmet>

      <CreateYourPost />
    </>
  );
}
