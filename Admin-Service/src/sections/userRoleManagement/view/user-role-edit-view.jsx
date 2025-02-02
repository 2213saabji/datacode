import PropTypes from 'prop-types';

import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { useGetRole } from 'src/api/userRole';
import { useAuthContext } from 'src/auth/hooks';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import UserRoleNewEditForm from '../user-role-new-edit-form';

// ----------------------------------------------------------------------

export default function UserRoleEditView({ id }) {
  const settings = useSettingsContext();

  const { user } = useAuthContext();

  const { user: currentUserRole } = useGetRole(id, user.accessToken);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="EDIT ROLE"
        links={[
          {
            name: 'Role',
            href: paths.dashboard.userRoleManagement.root,
          },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <UserRoleNewEditForm currentRole={currentUserRole} />
    </Container>
  );
}

UserRoleEditView.propTypes = {
  id: PropTypes.string,
};
