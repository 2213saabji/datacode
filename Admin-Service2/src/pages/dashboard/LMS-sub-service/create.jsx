import { Helmet } from 'react-helmet-async';

import {SubServiceCreateView} from 'src/sections/sub-service/view'
// ----------------------------------------------------------------------

export default function SubServiceCreatePage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Create a new Sub Service</title>
      </Helmet>

      <SubServiceCreateView />
    </>
  );
}