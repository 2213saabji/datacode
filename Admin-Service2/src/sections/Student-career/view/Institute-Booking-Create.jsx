import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import InstituteAppointmentBooking from '../Institute-appointment-booking';

// ----------------------------------------------------------------------

export default function InstituteBookingCreateView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Book Your Institution"
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: 'Institution',
            href: paths.dashboard.StudentCareer.instituteList,
          },
          { name: 'New Institution' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <InstituteAppointmentBooking />
    </Container>
  );
}
