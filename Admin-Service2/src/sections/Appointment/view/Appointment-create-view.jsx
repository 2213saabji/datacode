import Container from '@mui/material/Container';

// import { paths } from 'src/routes/paths';

import { useSettingsContext } from 'src/components/settings';
// import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import AppointmentHero from '../Appointment-hero';
import AppointmentNewEditForm from '../Appointment-new-edit-form';

// ----------------------------------------------------------------------

export default function AppointmentCreateView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <AppointmentHero />
      {/* <CustomBreadcrumbs
        heading="Create a new Party"
        links={[
          {
            name: 'Party Management',
            href: paths.dashboard.party.root,
          },
          { name: 'New Party' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      /> */}
      <AppointmentNewEditForm />
    </Container>
  );
}
