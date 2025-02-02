import { Helmet } from 'react-helmet-async';

import { CaseListLawyerView } from 'src/sections/case/view';
// ----------------------------------------------------------------------

export default function CaseManagementListPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard:All Case Management</title>
      </Helmet>

      <CaseListLawyerView />
    </>
  );
}
