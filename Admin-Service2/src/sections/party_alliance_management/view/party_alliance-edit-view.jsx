import PropTypes from 'prop-types';

import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { useGetPartyAlliance } from 'src/api/party_alliance';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import PartyAllianceNewEditForm from '../party_alliance-new-edit-form';

// ----------------------------------------------------------------------

export default function PartyAllianceEditView({ id }) {
  const settings = useSettingsContext();

  const { PartyAlliance: currentPartyAlliance } = useGetPartyAlliance(id);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="EDIT PARTY ALLIANCE DETAILS"
        links={[
          {
            name: 'Party Alliance Management',
            href: paths.dashboard.party_alliance.root,
          },
          { name: currentPartyAlliance?.data.partyAllianceName },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <PartyAllianceNewEditForm currentPartyAlliance={currentPartyAlliance} />
    </Container>
  );
}

PartyAllianceEditView.propTypes = {
  id: PropTypes.string,
};
