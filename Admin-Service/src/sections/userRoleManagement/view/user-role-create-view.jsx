import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import RoleNewEditForm from '../user-role-new-edit-form';

// ----------------------------------------------------------------------

export default function RoleCreateView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="CREATE NEW ROLE"
        links={[
          {
            name: 'Role',
            href: paths.dashboard.userRoleManagement.root,
          },
          { name: 'New Role' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
      <RoleNewEditForm />
    </Container>
  );
}
