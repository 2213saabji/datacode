import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import PartyAllianceNewEditForm from '../party_alliance-new-edit-form';

// ----------------------------------------------------------------------

export default function PartyAllianceCreateView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="CREATE A NEW PARTY ALLIANCE"
        links={[
          {
            name: 'Party Alliance Management',
            href: paths.dashboard.party_alliance.root,
          },
          { name: 'New Party Alliance' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
      <PartyAllianceNewEditForm />
    </Container>
  );
}
