import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import ServiceVersionNewEditForm from '../service-version-new-edit-form';

// ----------------------------------------------------------------------

export default function ServiceVersionCreateView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Add a new Service version"
        links={[
          {
            name: 'Service Version ',
            href: paths.dashboard.serviceversion.root,
          },
          { name: 'New Service version' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
      <ServiceVersionNewEditForm />
    </Container>
  );
}
