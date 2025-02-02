// import PropTypes from 'prop-types';

import Container from '@mui/material/Container';

// import { paths } from 'src/routes/paths';

// import { _userList } from 'src/_mock';
import { useGetVoter } from 'src/api/voter';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import VoterReferalNewEditForm from '../voter-referal-edit-form';
// import { useGetVoter } from 'src/api/voter';

// import UserNewEditForm from '../user-new-edit-form';

// ----------------------------------------------------------------------

export default function VoterReferalEdit() {
  const settings = useSettingsContext();

  const { voter: currentVoter } = useGetVoter();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Voter Referral"
        links={[
          {
            name: 'Referral',
          },

          // { name: currentUser?.name },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <VoterReferalNewEditForm currentVoter={currentVoter} />
    </Container>
  );
}

VoterReferalEdit.propTypes = {
  // id: PropTypes.string,
};
