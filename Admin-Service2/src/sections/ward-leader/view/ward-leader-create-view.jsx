import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import WardLeaderNewEditForm from '../ward-leader-new-edit-form';

// ----------------------------------------------------------------------

export default function WardLeaderCreateView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="CREATE A NEW WARDLEADER"
        links={[
          {
            name: 'WardLeader ',
            href: paths.dashboard.wardleader.root,
          },
          { name: 'New WardLeader' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
      <WardLeaderNewEditForm />
    </Container>
  );
}
