import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import ElectionNewEditForm from '../election-new-edit-form';

// ----------------------------------------------------------------------

export default function ElectionCreateView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="CREATE A NEW ELECTION"
        links={[
          // {
          //   name: 'Dashboard',
          //   href: paths.dashboard.root,
          // },
          {
            name: 'Election Management',
            href: paths.dashboard.electionmanagement.root,
          },
          { name: 'New Election' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
      <ElectionNewEditForm />
    </Container>
  );
}
