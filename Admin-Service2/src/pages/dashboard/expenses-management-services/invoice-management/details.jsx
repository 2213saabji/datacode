import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { ExpensesDetailsView } from 'src/sections/expenses/view';

// ----------------------------------------------------------------------

export default function ExpensesDetailsPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Dashboard: expenses Details</title>
      </Helmet>

      <ExpensesDetailsView id={`${id}`} />
    </>
  );
}
