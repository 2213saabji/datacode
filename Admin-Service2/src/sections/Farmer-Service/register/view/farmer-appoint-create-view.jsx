import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import FarmerAppointment from '../../farmerAppointmnet';

// ----------------------------------------------------------------------

export default function FarmerAppointmentCreateView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="ADD NEW APPOINTMENT"
        links={[
          {
            name: 'Booking Appointment',
            href: paths.dashboard.FarmerCompanyRegister.appointment,
          },
          { name: 'Dashboard' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
      <FarmerAppointment />
    </Container>
  );
}
