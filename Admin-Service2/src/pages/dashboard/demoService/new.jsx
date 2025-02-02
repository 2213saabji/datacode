import { Helmet } from 'react-helmet-async';

import { CaseListClientView } from 'src/sections/case/view';
// ----------------------------------------------------------------------

export default function CaseManagementListPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Case Details</title>
      </Helmet>

      <CaseListClientView />
    </>
  );
}
