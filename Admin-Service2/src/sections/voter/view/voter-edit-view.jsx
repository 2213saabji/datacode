import PropTypes from 'prop-types';

import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { useGetVoter } from 'src/api/voter';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import VoterNewEditForm from '../voter-new-edit-form';

// ----------------------------------------------------------------------

export default function VoterEditView({ id }) {
  const settings = useSettingsContext();

  const { voter: currentVoter } = useGetVoter(id);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="EDIT VOTER DETAILS"
        links={[
          {
            name: 'voter',
            href: paths.dashboard.voter.root,
          },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <VoterNewEditForm currentVoter={currentVoter} />
    </Container>
  );
}

VoterEditView.propTypes = {
  id: PropTypes.string,
};
