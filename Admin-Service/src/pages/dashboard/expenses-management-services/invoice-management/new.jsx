import { Helmet } from 'react-helmet-async';

import { ExpensesCreateView } from 'src/sections/expenses/view';

// ----------------------------------------------------------------------

export default function ExpensesCreatePage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Create a new invoice</title>
      </Helmet>

      <ExpensesCreateView />
    </>
  );
}
