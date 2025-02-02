import { Helmet } from 'react-helmet-async';

import {ContractListView} from 'src/sections/contract/view'
// ----------------------------------------------------------------------

export default function ContractManagementListPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Contract Management</title>
      </Helmet>
          
      <ContractListView />
    </>
  );
}
