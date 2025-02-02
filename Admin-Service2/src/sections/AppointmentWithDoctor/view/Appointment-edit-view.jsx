import PropTypes from 'prop-types';

import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { useGetDoctorAppointment } from 'src/api/appointmentwithdoctor';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import AppointmentwithNewEditForm from '../Appointment-new-edit-form';

// ----------------------------------------------------------------------

export default function AppointmentwithdoctorEditView({ id }) {
  const settings = useSettingsContext();

  const { appointment: currentappointment } = useGetDoctorAppointment(id);
  console.log(currentappointment);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="EDIT APPOINTMENT  DETAILS"
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

      <AppointmentwithNewEditForm currentappointment={currentappointment} />
    </Container>
  );
}

AppointmentwithdoctorEditView.propTypes = {
  id: PropTypes.string,
};
