import PropTypes from 'prop-types';

import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { useGetUserByUserId } from 'src/api/user';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import UserProfileNewEditForm from '../user-profile-new-edit-form';

// ----------------------------------------------------------------------

export default function UserProfileEditView({ id }) {
  const settings = useSettingsContext();

  const { user } = useGetUserByUserId(id);
  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Edit"
        links={[
          {
            name: 'User Management',
            href: paths.dashboard.userProfileManagement.root,
          },
          // { name: currentUser?.userName },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <UserProfileNewEditForm userdata={user?.data} />
    </Container>
  );
}

UserProfileEditView.propTypes = {
  id: PropTypes.string,
};
