import { Helmet } from 'react-helmet-async';

import { CaseListView } from 'src/sections/case/view';
// ----------------------------------------------------------------------

export default function CaseManagementListPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Case Management</title>
      </Helmet>

      <CaseListView />
    </>
  );
}
