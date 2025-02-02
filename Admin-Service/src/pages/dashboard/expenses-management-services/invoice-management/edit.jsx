import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { ExpensesEditView } from 'src/sections/expenses/view';

// ----------------------------------------------------------------------

export default function ExpensesEditPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Dashboard: expenses Edit</title>
      </Helmet>

      <ExpensesEditView id={`${id}`} />
    </>
  );
}
