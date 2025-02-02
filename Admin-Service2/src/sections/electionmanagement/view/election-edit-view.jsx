import PropTypes from 'prop-types';

import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { useGetElection } from 'src/api/election';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import ElectionNewEditForm from '../election-new-edit-form';

// ----------------------------------------------------------------------

export default function ElectionEditView({ id }) {
  const settings = useSettingsContext();

  const { election: currentElection } = useGetElection(id);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Edit"
        links={[
          // { name: 'Dashboard', href: paths.dashboard.root },
          {
            name: 'Election Management',
            href: paths.dashboard.electionmanagement.root,
          },
          { name: currentElection?.data.electionTitle },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <ElectionNewEditForm currentElection={currentElection} />
    </Container>
  );
}

ElectionEditView.propTypes = {
  id: PropTypes.string,
};
