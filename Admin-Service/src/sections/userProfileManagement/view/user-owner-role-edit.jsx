import PropTypes from 'prop-types';

import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { useAuthContext } from 'src/auth/hooks';
import { useGetSingleUser } from 'src/api/userRole';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import UserOwnerEdit from '../user-owner-edit-form';
// import UserProfileEdit from '../user-profile-edit-form';

// ----------------------------------------------------------------------

export default function UserOwnerRoleEditView({ id }) {
  const { user } = useAuthContext();

  const settings = useSettingsContext();

  const { user: currentUserRole } = useGetSingleUser(id, user.accessToken);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Edit User Owner"
        links={[
          {
            name: 'User Management',
            href: paths.dashboard.userProfileManagement.root,
          },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <UserOwnerEdit currentUserRole={currentUserRole} />
    </Container>
  );
}

UserOwnerRoleEditView.propTypes = {
  id: PropTypes.string,
};
