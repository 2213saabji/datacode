import { Helmet } from 'react-helmet-async';

import { ElectionCreateView } from 'src/sections/electionmanagement/view';
// ----------------------------------------------------------------------

export default function ElectionCreatePage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Create a new Election</title>
      </Helmet>

      <ElectionCreateView />
    </>
  );
}
