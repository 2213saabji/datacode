import PropTypes from 'prop-types';

import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { useGetParty } from 'src/api/party';
import { useGetInstituteAppointmentDetail } from 'src/api/Institution/InstituteAppointments';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import InstituteAppointmentBooking from '../Institute-appointment-booking';

// ----------------------------------------------------------------------

export default function InstituteAppointmentEdit({ id }) {
  const settings = useSettingsContext();

  const { party: currentParty } = useGetParty(id);
  const { instituteAppointDetails: currAppointDetails } = useGetInstituteAppointmentDetail(id);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="UPDATE APPOINTMENT DETAILS"
        links={[
          {
            name: 'Appointment Management',
            href: paths.dashboard.StudentCareer.root,
          },
          { name: currentParty?.data.partyName },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <InstituteAppointmentBooking
        currentParty={currentParty}
        currAppointDetails={currAppointDetails}
      />
    </Container>
  );
}

InstituteAppointmentEdit.propTypes = {
  id: PropTypes.string,
};
