import { Helmet } from 'react-helmet-async';

import {ContractCreateView} from 'src/sections/contract/view'
// ----------------------------------------------------------------------

export default function ContractCreatePage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Create a new Contract </title>
      </Helmet>

      <ContractCreateView />
    </>
  );
}