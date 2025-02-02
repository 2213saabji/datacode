import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import MemberNewEditForm from '../user-member-new-edit-form';

// ----------------------------------------------------------------------

export default function RoleCreateView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="CREATE A NEW MEMBER"
        links={[
          {
            name: 'Member',
            href: paths.dashboard.userProfileManagement.root,
          },
          { name: 'New Member' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
      {/* <UserProfileRegisterView /> */}
      <MemberNewEditForm />
    </Container>
  );
}
