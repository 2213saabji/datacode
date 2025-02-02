import { Helmet } from 'react-helmet-async';

import { ExpensesListView } from 'src/sections/expenses/view';

// ----------------------------------------------------------------------

export default function ExpensesListPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: expenses List</title>
      </Helmet>

      <ExpensesListView />
    </>
  );
}
