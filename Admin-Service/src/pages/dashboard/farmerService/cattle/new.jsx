import { Helmet } from 'react-helmet-async';

import { CattleRegCreateView } from 'src/sections/Farmer-Service/cattle/view';
// ----------------------------------------------------------------------

export default function CattleCreatePage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Add Create</title>
      </Helmet>

      <CattleRegCreateView />
    </>
  );
}
