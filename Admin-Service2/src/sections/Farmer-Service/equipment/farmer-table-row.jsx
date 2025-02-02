import PropTypes from 'prop-types';

import Link from '@mui/material/Link';
import ListItemText from '@mui/material/ListItemText';
import Label from 'src/components/label';
import { Stack } from '@mui/system';
import { Modal, Button, Box, Typography, IconButton } from '@mui/material';
import { RouterLink } from 'src/routes/components';
import { useRef, useState, useCallback } from 'react';
import { useAuthContext } from 'src/auth/hooks';
import Divider from '@mui/material/Divider';
import CloseIcon from '@mui/icons-material/Close';
import PhoneIcon from '@mui/icons-material/Phone';
import { createNotifications } from 'src/api/notifications';


// ----------------------------------------------------------------------




export function RenderCellDescription({ params }) {
  return (
    <ListItemText
      disableTypography
      primary={
        <Link
          noWrap
          color="inherit"
          variant="subtitle2"
          sx={{ cursor: 'pointer' }}
        >
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

export function RenderCellContactSeller({ params }) {
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

  const handleMouseEnter = () => {
    if (btnRef.current) {
      btnRef.current.style.transform = 'scale(1.5)';
    }
  };

  const handleMouseLeave = () => {
    if (btnRef.current) {
      btnRef.current.style.transform = 'scale(1)';
    }
  };

  return (
    <>
      <ListItemText
        disableTypography
        primary={
          <Stack direction="row" spacing="10px">
            <Button
              ref={btnRef}
              onClick={handleOpen}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
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


export function RenderCellEquipmentType({ params, handleViewRow }) {
  return (
    <ListItemText
      disableTypography
      onClick={() => handleViewRow(params.row.equipmentTypeId)}
      primary={
        <Stack direction="row" justifyContent='space-between' spacing="10px">
          <Link
            noWrap
            color="inherit"
            variant="subtitle2"
            sx={{ cursor: 'pointer' }}
          >
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

RenderCellEquipmentType.propTypes = {
  params: PropTypes.shape({
    row: PropTypes.object,
  }),
  handleViewRow: PropTypes.func,
};

export function RenderCellEquipmentPrice({ params }) {
  return (
    <ListItemText
      disableTypography
      primary={
        <Link
          noWrap
          color="inherit"
          variant="subtitle2"
          sx={{ cursor: 'pointer' }}
        >
          {params?.row?.price}
        </Link>
      }
      sx={{ display: 'flex', flexDirection: 'column' }}
    />
  );
}

RenderCellEquipmentPrice.propTypes = {
  params: PropTypes.shape({
    row: PropTypes.object,
  }),
};

export function RenderCellEquipmentBrand({ params }) {

  return (
    <ListItemText
      disableTypography
      primary={
        <Link
          noWrap
          color="inherit"
          variant="subtitle2"
          sx={{ cursor: 'pointer' }}
        >
          {params?.row?.brand}
        </Link>
      }
      sx={{ display: 'flex', flexDirection: 'column' }}
    />
  );
}

RenderCellEquipmentBrand.propTypes = {
  params: PropTypes.shape({
    row: PropTypes.object,
  }),
};

export function RenderCellEquipmentLocation({ params }) {

  return (
    <ListItemText
      disableTypography
      primary={
        <Link
          noWrap
          color="inherit"
          variant="subtitle2"
          sx={{ cursor: 'pointer' }}
        >
          {params?.row?.city}
        </Link>
      }
      sx={{ display: 'flex', flexDirection: 'column' }}
    />
  );
}

RenderCellEquipmentLocation.propTypes = {
  params: PropTypes.shape({
    row: PropTypes.object,
  }),
};




