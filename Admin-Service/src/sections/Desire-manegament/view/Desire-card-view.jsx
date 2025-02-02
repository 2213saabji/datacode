import PropTypes from 'prop-types';

import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import { Box, Link, Button } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

export default function DesireCard({ currentappointment }) {
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
      <Button
        component={RouterLink}
        to="/dashboard"
        variant="outlined"
        color="primary"
        style={{ textDecoration: 'none', width: '150px', padding: '3px 5px', mt: 2, mb: 4 }}
      >
        Back
      </Button>
      <CustomBreadcrumbs
        heading="YOUR CREATED DESIRE "
        links={[
          {
            name: 'Desire',
          },
          { name: 'Booking' },
        ]}
        action={
          <Button
            component={RouterLink}
            href={paths.dashboard.Desire.new}
            variant="contained"
            startIcon={<Iconify icon="mingcute:add-line" />}
          >
            Create Desire
          </Button>
        }
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
          to="/dashboard/Desire/list/?status=open"
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
              <Label variant="soft">Pending Desire</Label>
            </Box>
          </Card>
        </Link>

        <Link
          component={RouterLink}
          to="/dashboard/Desire/list/?status=in-progres"
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
              <Label variant="soft">Active Desire</Label>
            </Box>
          </Card>
        </Link>

        <Link
          component={RouterLink}
          to="/dashboard/Desire/list/?status=close"
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

              <Label variant="soft">Closed Desire</Label>
            </Box>
          </Card>
        </Link>
      </Box>
    </Container>
  );
}

DesireCard.propTypes = {
  currentappointment: PropTypes.object,
};
