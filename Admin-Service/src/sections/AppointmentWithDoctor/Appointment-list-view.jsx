import React from 'react';
import { Link } from 'react-router-dom';

import { Box } from '@mui/system';
import { Card } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';

import { RouterLink } from 'src/routes/components';

import Label from 'src/components/label';

function AppointmentListView() {
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
    <Box sx={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
      <Link
        component={RouterLink}
        to="/dashboard/Appointmenttodoctor/list/?status=open"
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
            <Label variant="soft">Pending Appointments </Label>
          </Box>
        </Card>
      </Link>

      <Link
        component={RouterLink}
        to="/dashboard/Appointmenttodoctor/list/?status=in-progress"
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
            <Label variant="soft">Active Appointments</Label>
          </Box>
        </Card>
      </Link>

      <Link
        component={RouterLink}
        to="/dashboard/Appointmenttodoctor/list/?status=close"
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

            <Label variant="soft">Closed Appointments</Label>
          </Box>
        </Card>
      </Link>
    </Box>
  );
}

export default AppointmentListView;
