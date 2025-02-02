import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

 import { ChartedAccountantEditView } from 'src/sections/chartedAccountant/view';

// ----------------------------------------------------------------------

export default function ContactEditPage() {
  const params = useParams();

  const { id } = params;
  return (
    <>
      <Helmet>
        <title> Dashboard: Charted Account Edit</title>
      </Helmet>

       <ChartedAccountantEditView  id={`${id}`} /> 
    </>
  );
}
