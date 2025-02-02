import PropTypes from 'prop-types';
import { Box, Stack } from '@mui/system';
import Link from '@mui/material/Link';
import { Button, Divider, IconButton, Modal, Typography } from '@mui/material';
import ListItemText from '@mui/material/ListItemText';
import { RouterLink } from 'src/routes/components';
import { useCallback, useRef, useState } from 'react';
import { useAuthContext } from 'src/auth/hooks';
import CloseIcon from '@mui/icons-material/Close';
import { createNotifications } from 'src/api/notifications';
import PhoneIcon from '@mui/icons-material/Phone';
import Label from 'src/components/label';

// ----------------------------------------------------------------------

export function RenderCellDescription({ params }) {
  return (
    <ListItemText
      disableTypography
      primary={
        <Link noWrap color="inherit" variant="subtitle2" sx={{ cursor: 'pointer' }}>
          {params?.row?.description}
        </Link>
      }
      sx={{ display: 'flex', flexDirection: 'column' }}
    />
  );
}

RenderCellDescription.propTypes = {
  params: PropTypes.shape({
    row: PropTypes.object,
  }),
};

export function RenderCellCattleType({ params, handleViewRow }) {
  const { user } = useAuthContext();
  // console.log('-------->', params);

  return (
    <ListItemText
      disableTypography
      onClick={() => handleViewRow(params?.row?.cattleTypeId, params?.row?.cattleId)}
      primary={
        <Stack direction="row" justifyContent="space-between" spacing="10px">
          <Link noWrap color="inherit" variant="subtitle2" sx={{ cursor: 'pointer' }}>
            {params?.row?.type}
          </Link>
          <Button
            component={RouterLink}
            // to="/dashboard/StudentCareer/InstituteAppointment"
            // to={`dashboard/FarmerService/Cattle/${params.row.cattleTypeId}/detail`}
            sx={{
              p: '0px 5px 0px 5px',
              color: 'blue',
              textWrap: 'nowrap',
              // bgcolor: 'green',
              // border: '2px solid green',
              transition: 'background-color 0.3s ease-in-out, transform 0.3s ease-in-out',
              borderRadius: '50px',
              '&:hover': {
                backgroundColor: '#31983155',
              },
              '&:active': {
                transform: 'scale(1.1)',
              },
            }}
          >
            View
          </Button>
        </Stack>
      }
      sx={{ display: 'flex', flexDirection: 'column' }}
    />
  );
}

RenderCellCattleType.propTypes = {
  params: PropTypes.shape({
    row: PropTypes.object,
  }),
  handleViewRow: PropTypes.func,
};

export function RenderCellCattleBreed({ params }) {
  return (
    <ListItemText
      disableTypography
      primary={
        <Link noWrap color="inherit" variant="subtitle2" sx={{ cursor: 'pointer' }}>
          {params?.row?.breed}
        </Link>
      }
      sx={{ display: 'flex', flexDirection: 'column' }}
    />
  );
}

RenderCellCattleBreed.propTypes = {
  params: PropTypes.shape({
    row: PropTypes.object,
  }),
};

export function RenderCellCattlePrice({ params }) {
  return (
    <ListItemText
      disableTypography
      primary={
        <Link noWrap color="inherit" variant="subtitle2" sx={{ cursor: 'pointer' }}>
          {params?.row?.price}
        </Link>
      }
      sx={{ display: 'flex', flexDirection: 'column' }}
    />
  );
}

RenderCellCattlePrice.propTypes = {
  params: PropTypes.shape({
    row: PropTypes.object,
  }),
};
export function RenderCellCattleLocation({ params }) {
  // console.log("params---->", params);

  return (
    <ListItemText
      disableTypography
      primary={
        <Link noWrap color="inherit" variant="subtitle2" sx={{ cursor: 'pointer' }}>
          {params?.row?.city}
        </Link>
      }
      sx={{ display: 'flex', flexDirection: 'column' }}
    />
  );
}

RenderCellCattleLocation.propTypes = {
  params: PropTypes.shape({
    row: PropTypes.object,
  }),
};

export function RenderCellContactSeller({ params, }) {
  const { user } = useAuthContext();
  const btnRef = useRef(null)
  const [open, setOpen] = useState(false);
  // console.log('--->',params)
  const handleOpen = useCallback(() => {
    createNotifications(
      params?.row?.userId,
      `Viewer contact detail ${user?.phone ? user?.phone : user?.UserProfile?.firstName}`,
      `${params?.row?.type} Viewed by ${user?.UserProfile ? user?.UserProfile?.firstName : user?.email}`,
      '/dashboard/FarmerService'
    );
    setOpen(true)
  }, [params, user]);
  const handleClose = () => setOpen(false);

  return (
    <>
      <ListItemText
        disableTypography
        primary={
          <Stack direction="row" spacing="10px">
            <Button
              ref={btnRef}
              onClick={handleOpen}
              onMouseEnter={() => btnRef.current.transform('scale(1.5)')}
              startIcon={<PhoneIcon sx={{ color: 'black', ml: 0.5 }} />}
              sx={{
                p: '0px 5px 0px 5px',
                backgroundColor: '#fda92daa',
                color: 'black',
                // border: params?.row?.status ? '2px solid #acb5c0' : '2px solid green',
                transition: 'background-color 0.3s ease-in-out, transform 0.3s ease-in-out',
                borderRadius: '50px',
                '&:hover': {
                  backgroundColor: '#31983155',
                },
                '&:active': {
                  transform: 'scale(1.1)',
                },
              }}
            >
              Contact
            </Button>
          </Stack>
        }
        sx={{ display: 'flex', flexDirection: 'column' }}
      />

      {/* Modal to show seller details */}
      <Modal open={open}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            // border: '2px solid #000',
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
          }}
        >
          <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
            <Typography variant="h6">Seller Details</Typography>
            <IconButton onClick={handleClose} sx={{ bgcolor: '#fda92daa', color: 'black' }}>
              <CloseIcon />
            </IconButton>
          </Stack>

          <Divider />
          <Typography sx={{ mt: 2 }}>
            {/* Display relevant seller details here */}
            Name: {params?.row?.User?.UserProfile?.firstName || 'NA'}
          </Typography>
          <Typography sx={{ mt: 2 }}>
            Email: {params?.row?.User?.email || 'N/A'}
          </Typography>
          <Typography sx={{ mt: 2 }}>
            Contact: {params?.row?.User?.phone || 'N/A'}
          </Typography>
        </Box>
      </Modal>
    </>
  );
}

RenderCellContactSeller.propTypes = {
  params: PropTypes.shape({
    row: PropTypes.object,
  }),
};

export function RenderCellAppointmentPassStatus({ params }) {
  const renderStatusLabel = (status) => {
    let color;
    switch (status) {
      case 'Accepted':
        color = 'success';
        break;
      case 'Pending':
        color = 'warning';
        break;
      case 'Rejected':
        color = 'error';
        break;
      default:
        color = 'default';
    }
    return (
      <Label color={color} variant="filled">
        {status}
      </Label>
    );
  };
  return (
    <ListItemText
      disableTypography
      primary={
        <Link noWrap color="inherit" variant="subtitle2" sx={{ cursor: 'pointer' }}>
          {renderStatusLabel(params?.row?.appointmentPassStatus)}
        </Link>
      }
      sx={{ display: 'flex', flexDirection: 'column' }}
    />
  );
}

RenderCellAppointmentPassStatus.propTypes = {
  params: PropTypes.shape({
    row: PropTypes.object,
  }),
};

export function RenderCellAppointmentMeetingLink({ params }) {
  return (
    <ListItemText
      disableTypography
      primary={
        <Link
          noWrap
          color="inherit"
          variant="subtitle2"
          href={params.row.appointmentPassMeetingLink}
          target="_blank"
          sx={{ cursor: 'pointer' }}
        >
          {params?.row?.appointmentPassMeetingLink}
        </Link>
      }
      sx={{ display: 'flex', flexDirection: 'column' }}
    />
  );
}

RenderCellAppointmentMeetingLink.propTypes = {
  params: PropTypes.shape({
    row: PropTypes.object,
  }),
};
