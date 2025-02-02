import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import PoolNewEditForm from '../pooling-Management-new-edit-form';

// ----------------------------------------------------------------------

export default function PoolCreateView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="CREATE NEW POLL"
        links={[
          {
            name: 'Poll',
            href: paths.dashboard.poolmanagement.root,
          },
          { name: 'New Poll' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
      <PoolNewEditForm />
    </Container>
  );
}
