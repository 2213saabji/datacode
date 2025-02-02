import Container from '@mui/material/Container';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import AppointmentwithdoctorNewEditForm from '../Appointment-new-edit-form';

// ----------------------------------------------------------------------

export default function AppointmentwithdoctorCreateView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      {/* <AppointmentwithdoctorHero /> */}
      <CustomBreadcrumbs
        heading="CREATE A NEW APPOINTMENT WITH DOCTOR"
        links={[
          // {
          //   name: 'Appoinmtment Management',
          //   href: paths.dashboard.appointment.new,
          // },
          { name: 'Doctor Appointment' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
      <AppointmentwithdoctorNewEditForm />
    </Container>
  );
}
