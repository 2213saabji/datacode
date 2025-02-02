import PropTypes from 'prop-types';

import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { _expenses } from 'src/_mock';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import ExpensesDetails from '../expenses-details';

// ----------------------------------------------------------------------

export default function ExpensesDetailsView({ id }) {
  const settings = useSettingsContext();

  const currentExpenses = _expenses.filter((expenses) => expenses.id === id)[0];

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading={currentExpenses?.expensesNumber}
        links={[
          {
            name: 'Invoice',
            href: paths.dashboard.invoice.root,
          },
          { name: currentExpenses?.expensesNumber },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <ExpensesDetails expenses={currentExpenses} />
    </Container>
  );
}

ExpensesDetailsView.propTypes = {
  id: PropTypes.string,
};
