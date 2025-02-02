import PropTypes from 'prop-types';

import { Button } from '@mui/material';
import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { useGetCharteredAccountant } from 'src/api/chartedAccountant';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import ChartedAccountantEditForm from '../chartedAccountant-new-edit-form';

// ----------------------------------------------------------------------

export default function ChartedAccountEditView({ id }) {
  const settings = useSettingsContext();

  const { chartedaccpunt: currentDriver } = useGetCharteredAccountant(id);

  return (
    <>
      <Button
        component={RouterLink}
        to="/dashboard"
        variant="outlined"
        color="primary"
        style={{ textDecoration: 'none', width: '150px', padding: '3px 5px' }}
      >
        Back
      </Button>
      <Container maxWidth={settings.themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="EDIT CHARTERED ACCOUNTANT DETAILS"
          links={[
            // { name: 'Dashboard', href: paths.dashboard.root },
            {
              name: 'Charted Accountant',
              href: paths.dashboard.chartered_accountant.root,
            },
            { name: currentDriver?.data.fullName },
          ]}
          sx={{
            mb: { xs: 3, md: 5 },
          }}
        />

        <ChartedAccountantEditForm currentDriver={currentDriver} />
      </Container>
    </>
  );
}

ChartedAccountEditView.propTypes = {
  id: PropTypes.string,
};
