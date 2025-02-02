import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import Button from '@mui/material/Button';
import { RouterLink } from 'src/routes/components';

import EmergencyNewEditForm from '../emergency-new-edit-form';

// ----------------------------------------------------------------------

export default function EmergencyCreateView() {
  const settings = useSettingsContext();

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
        heading="CREATE A NEW EMERGENCY SERVICE"
        links={[
          {
            name: 'Emergency Service',
            href: paths.dashboard.emergencyServices.root,
          },
          { name: 'New Emergency Service' },
        ]}
        sx={{
          mb: { xs: 3, md: 2 }, mt: '30px'
        }}
      />
      <EmergencyNewEditForm />
    </Container>
  );
}
