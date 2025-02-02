import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import {ContractEditView} from 'src/sections/contract/view'

// ----------------------------------------------------------------------

export default function ContractEditPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Dashboard: Contract Edit</title>
      </Helmet>

      <ContractEditView id={`${id}`} />
    </>
  );
}
