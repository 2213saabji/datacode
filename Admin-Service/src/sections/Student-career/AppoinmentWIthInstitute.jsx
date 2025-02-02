import Card from '@mui/material/Card';
import { Box, Link } from '@mui/material';
import Container from '@mui/material/Container';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';

import { RouterLink } from 'src/routes/components';

import Label from 'src/components/label';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

// import AppointmentHero from '../Appointment-hero';

export default function AppointmentWithInstitute() {
  const settings = useSettingsContext();

  const cardStyles = {
    padding: 2,
    borderRadius: 2,
    boxShadow: 3,
    transition: 'transform 0.3s, box-shadow 0.3s',
    '&:hover': {
      transform: 'scale(1.05)',
      boxShadow: 6,
    },
  };
  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      {/* <AppointmentHero /> */}

      <CustomBreadcrumbs
        heading="YOUR CREATED APPOINMENTS "
        links={[
          {
            name: 'Appointments',
          },
          { name: 'Booking' },
        ]}
        sx={{
          mb: {
            xs: 3,
            md: 5,
          },
          mt: 2,
        }}
      />

      <Box sx={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
        <Link
          component={RouterLink}
          to="/dashboard/Appointment/list/?status=open"
          variant="body2"
          style={{ textDecoration: 'none' }}
        >
          <Card sx={cardStyles}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: 6,
                textAlign: 'center',
              }}
            >
              <AccessTimeIcon sx={{ fontSize: 80, color: 'inherit', mb: 1 }} />
              <Label variant="soft">Pending Appoinment</Label>
            </Box>
          </Card>
        </Link>

        <Link
          component={RouterLink}
          to="/dashboard/Appointment/list/?status=in-progres"
          variant="body2"
          style={{ textDecoration: 'none' }}
        >
          <Card sx={cardStyles}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: 6,
                textAlign: 'center',
              }}
            >
              <EventAvailableIcon sx={{ fontSize: 80, color: 'inherit', mb: 1 }} />
              <Label variant="soft">Active Appoinment</Label>
            </Box>
          </Card>
        </Link>

        <Link
          component={RouterLink}
          to="/dashboard/Appointment/list/?status=close"
          variant="body2"
          style={{ textDecoration: 'none' }}
        >
          <Card sx={cardStyles}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: 6,
                textAlign: 'center',
              }}
            >
              <CheckCircleIcon sx={{ fontSize: 80, color: 'inherit', mb: 1 }} />

              <Label variant="soft">Closed Appoinment</Label>
            </Box>
          </Card>
        </Link>
      </Box>
    </Container>
  );
}

AppointmentWithInstitute.propTypes = {};
