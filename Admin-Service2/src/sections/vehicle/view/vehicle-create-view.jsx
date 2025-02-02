import { Button } from '@mui/material';
import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import VehicleNewEditForm from '../vehicle-new-edit-form';

// ----------------------------------------------------------------------

export default function VehicleCreateView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <Button
        component={RouterLink}
        to="/dashboard"
        variant="outlined"
        color="primary"
        style={{ textDecoration: 'none', width: '150px', padding: '3px 5px', mt: 2, mb: 2 }}
      >
        Back
      </Button>
      <CustomBreadcrumbs
        heading="CREATE A NEW VEHICLE"
        links={[
          {
            name: 'Vehicle ',
            href: paths.dashboard.vehicle.root,
          },
          { name: 'New Vehicle' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
          mt: '20px'
        }}
      />
      <VehicleNewEditForm />
    </Container>
  );
}
