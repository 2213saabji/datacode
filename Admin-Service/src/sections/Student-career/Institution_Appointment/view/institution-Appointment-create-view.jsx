import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import InstituteAppointmentBooking from '../Institute-appointment-booking';

// ----------------------------------------------------------------------

export default function InstitutionAppointmentCreateView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Book Appointment"
        links={[
          {
            name: 'Institute Appointment',
            href: paths.dashboard.StudentCareer.root,
          },
          { name: 'New Appointment' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
      <InstituteAppointmentBooking />
    </Container>
  );
}
