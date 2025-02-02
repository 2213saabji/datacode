import PropTypes from 'prop-types';

import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { useGetDriver } from 'src/api/driver';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import DriverNewEditForm from '../lawyer-new-edit-form';

// ----------------------------------------------------------------------

export default function LawyerEditView({ id }) {
  const settings = useSettingsContext();

  const { driver: currentDriver } = useGetDriver(id);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="EDIT LAWYER DETAILS"
        links={[
          // { name: 'Dashboard', href: paths.dashboard.root },
          {
            name: 'Lawyer',
            href: paths.dashboard.lawyer.root,
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

LawyerEditView.propTypes = {
  id: PropTypes.string,
};
