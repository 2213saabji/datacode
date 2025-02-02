import PropTypes from 'prop-types';

import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { useGetAppoinmnetForAgri } from 'src/api/agriculture/appointmentforagri';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import FarmerAppointment from '../../farmerAppointmnet';

// ----------------------------------------------------------------------

export default function AppointmentEditView({ id }) {
  const settings = useSettingsContext();

  const { appointment: currentappointment } = useGetAppoinmnetForAgri(id);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="EDIT APPOINTMNET  DETAILS"
        links={[
          {
            name: 'Appointment  Management',
            href: paths.dashboard.Appointment.root,
          },
          { name: currentappointment?.data.Appointment },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <FarmerAppointment currentappointment={currentappointment} />
    </Container>
  );
}

AppointmentEditView.propTypes = {
  id: PropTypes.string,
};
