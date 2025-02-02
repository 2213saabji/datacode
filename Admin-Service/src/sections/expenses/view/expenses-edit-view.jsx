import PropTypes from 'prop-types';

import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { _expenses } from 'src/_mock';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import ExpensesNewEditForm from '../expenses-new-edit-form';

// ----------------------------------------------------------------------

export default function ExpensesEditView({ id }) {
  const settings = useSettingsContext();

  const currentExpenses = _expenses.find((expenses) => expenses.id === id);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Edit"
        links={[
          {
            name: 'Invoice',
            href: paths.dashboard.invoice.root,
          },
          { name: currentExpenses?.expensesNumber },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <ExpensesNewEditForm currentExpenses={currentExpenses} />
    </Container>
  );
}

ExpensesEditView.propTypes = {
  id: PropTypes.string,
};
