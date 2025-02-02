import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import Button from '@mui/material/Button';
import { RouterLink } from 'src/routes/components';
import VehicleOptionsForm from '../vehicle-option-new-edit-form';

// ----------------------------------------------------------------------

export default function VehicleOptionCreateView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <Button
        component={RouterLink}
        to="/dashboard/vehicle-booking-option"
        variant="outlined"
        color="primary"
        style={{ textDecoration: 'none', width: '150px', padding: '3px 5px', mt: 2, mb: 2 }}
      >
        Back
      </Button>
      <CustomBreadcrumbs
        heading="CREATE A NEW VEHICLE BOOKING OPTION"
        links={[
          {
            name: 'Vehicle Booking Option',
            href: paths.dashboard.vehicleOption.root,
          },
          { name: 'New Vehicle Booking Option' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
          mt: '50px'
        }}
      />
      <VehicleOptionsForm />
    </Container>
  );
}
