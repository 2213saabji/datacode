import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import VoterNewEditForm from '../voter-new-edit-form';

// ----------------------------------------------------------------------

export default function VoterCreateView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Create a new voter"
        links={[
          // {
          //   name: 'Dashboard',
          //   href: paths.dashboard.root,
          // },
          {
            name: 'voter',
            href: paths.dashboard.voter.root,
          },
          { name: 'New voter' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
      <VoterNewEditForm />
    </Container>
  );
}
