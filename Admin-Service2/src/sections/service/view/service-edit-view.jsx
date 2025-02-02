import PropTypes from 'prop-types';

import { Button } from '@mui/material';
import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { useGetService } from 'src/api/service';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import ServiceNewEditForm from '../service-new-edit-form';

// ----------------------------------------------------------------------

export default function ServiceEditView({ id }) {
  const settings = useSettingsContext();

  const { service: currentDriver } = useGetService(id);

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
        heading="EDIT SERVICE DETAILS"
        links={[
          // { name: 'Dashboard', href: paths.dashboard.root },
          {
            name: 'Service',
            href: paths.dashboard.LMS_service.root,
          },
          { name: currentDriver?.data.serviceArea },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <ServiceNewEditForm currentDriver={currentDriver} />
    </Container>
    </>
  );
}

ServiceEditView.propTypes = {
  id: PropTypes.string,
};
