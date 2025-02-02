import PropTypes from 'prop-types';

import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { useGetDriver } from 'src/api/driver';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import DriverNewEditForm from '../driver-new-edit-form';

// ----------------------------------------------------------------------

export default function DriverEditView({ id }) {
  const settings = useSettingsContext();

  const { driver: currentDriver } = useGetDriver(id);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="EDIT DRIVER DETAILS"
        links={[
          // { name: 'Dashboard', href: paths.dashboard.root },
          {
            name: 'Driver',
            href: paths.dashboard.driver.root,
          },
          { name: currentDriver?.data.fullName },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <DriverNewEditForm currentDriver={currentDriver} />
    </Container>
  );
}

DriverEditView.propTypes = {
  id: PropTypes.string,
};
