import { Helmet } from 'react-helmet-async';

import {CaseCreateView} from 'src/sections/case/view'
// ----------------------------------------------------------------------

export default function CaseCreatePage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Create a new Case</title>
      </Helmet>

      <CaseCreateView />
    </>
  );
}