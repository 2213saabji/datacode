import PropTypes from 'prop-types';

import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { useGetParty } from 'src/api/party';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import PartyNewEditForm from '../party-new-edit-form';

// ----------------------------------------------------------------------

export default function PartyEditView({ id }) {
  const settings = useSettingsContext();

  const { party: currentParty } = useGetParty(id);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="EDIT PARTY DETAILS"
        links={[
          {
            name: 'Party Management',
            href: paths.dashboard.party.root,
          },
          { name: currentParty?.data.partyName },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <PartyNewEditForm currentParty={currentParty} />
    </Container>
  );
}

PartyEditView.propTypes = {
  id: PropTypes.string,
};
