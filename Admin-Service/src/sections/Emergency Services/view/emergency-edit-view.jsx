import PropTypes from 'prop-types';

import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';
import Button from '@mui/material/Button';
import { RouterLink } from 'src/routes/components';

// import { useGetParty } from 'src/api/party';

import { useSettingsContext } from 'src/components/settings';
import { useGetEmergencyNumber } from 'src/api/emergency_service';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import EmergencyForm from '../emergency-new-edit-form';
// ----------------------------------------------------------------------

export default function EmergencyEditView({ id }) {
  const settings = useSettingsContext();
  const { emergencyNumber: currentEmergencyNumber } = useGetEmergencyNumber(id);

  // const { party: currentParty } = useGetParty(id);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <Button
        component={RouterLink}
        to="/dashboard/emergencyServices"
        variant="outlined"
        color="primary"
        style={{ textDecoration: 'none', width: '150px', padding: '3px 5px', mt: 2, mb: 2 }}
      >
        Back
      </Button>
      <CustomBreadcrumbs
        heading="EDIT EMERGENCY SERVICE"
        links={[
          {
            name: 'Emergency Service',
            href: paths.dashboard.party.root,
          },
          // { name: currentParty?.data.partyName },
        ]}
        sx={{
          mb: { xs: 3, md: 5 }, mt: '30px'
        }}
      />

      <EmergencyForm currentEmergencyNumber={currentEmergencyNumber} />
    </Container>
  );
}

EmergencyEditView.propTypes = {
  id: PropTypes.string,
};
