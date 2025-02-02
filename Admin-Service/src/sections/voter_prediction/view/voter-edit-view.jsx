import PropTypes from 'prop-types';

import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { useGetVoter } from 'src/api/voter';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import VotePredictList from './vote_predict-list-view';

// ----------------------------------------------------------------------

export default function VoterEditView({ id }) {
  const settings = useSettingsContext();

  const { voter: currentVoter } = useGetVoter(id);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="VOTE PREDICTION"
        links={[
          {
            name: 'voter list',
            href: paths.dashboard.vote_prediction.root,
          },
          {
            name: 'Candidate list',
          },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <VotePredictList currentVoter={currentVoter} />
    </Container>
  );
}

VoterEditView.propTypes = {
  id: PropTypes.string,
};
