import { Helmet } from 'react-helmet-async';

import { CattleListView } from 'src/sections/Farmer-Service/cattle/view';

// ----------------------------------------------------------------------

export default function CattleListPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Cattle List</title>
      </Helmet>

      <CattleListView />
    </>
  );
}
