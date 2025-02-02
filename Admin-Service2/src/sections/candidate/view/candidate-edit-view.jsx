import PropTypes from 'prop-types';

import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { useGetCandidate } from 'src/api/candidate';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import CandidateNewEditForm from '../candidate-new-edit-form';

// ----------------------------------------------------------------------

export default function CandidateEditView({ id }) {
  const settings = useSettingsContext();

  const { candidate: currentCandidate } = useGetCandidate(id);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="EDIT CANDIDATE DETAILS"
        links={[
          // { name: 'Dashboard', href: paths.dashboard.root },
          {
            name: ' Candidate',
            href: paths.dashboard.candidate.root,
          },
          { name: currentCandidate?.data.User.userName },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <CandidateNewEditForm currentCandidate={currentCandidate} />
    </Container>
  );
}

CandidateEditView.propTypes = {
  id: PropTypes.string,
};
