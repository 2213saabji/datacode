import { Helmet } from 'react-helmet-async';

import { OverviewBankingView } from 'src/sections/template-view/template-library/view';

// ----------------------------------------------------------------------

export default function TemplateViewView() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Analytics</title>
      </Helmet>

      <OverviewBankingView />
    </>
  );
}
