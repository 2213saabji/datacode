import PropTypes from 'prop-types';

import { Box, Stack } from '@mui/system';
import Link from '@mui/material/Link';
import { Button, Divider, IconButton, Modal, Typography } from '@mui/material';
import ListItemText from '@mui/material/ListItemText';
import CloseIcon from '@mui/icons-material/Close';
import PhoneIcon from '@mui/icons-material/Phone';
import { RouterLink } from 'src/routes/components';
import { useAuthContext } from 'src/auth/hooks';
import { useCallback, useRef, useState } from 'react';
import { enqueueSnackbar } from 'notistack';
import { createConsumerRequest } from 'src/api/interestedConsumer';

// ----------------------------------------------------------------------

export function RenderCellType({ params, handleViewRow }) {
  return (
    <ListItemText
      disableTypography
      onClick={() => handleViewRow(params.row.id)}
      primary={
        <Stack direction="row" justifyContent="space-between" spacing="0px">
          <Link noWrap color="inherit" variant="subtitle2" sx={{ cursor: 'pointer' }}>
            {params.row.applicationType || params.row.type}
          </Link>
          <Button
            component={RouterLink}
            // to="/dashboard/StudentCareer/InstituteAppointment"
            // to={`dashboard/FarmerService/Registration/${params.row.id}/cultivation_tool`}
            // onClick={()=>handleViewRow(params.row.id)}
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

RenderCellType.propTypes = {
  params: PropTypes.shape({
    row: PropTypes.object,
  }),
  handleViewRow: PropTypes.func,
};

export function RenderCellModel({ params, handleViewRow }) {
  return (
    <ListItemText
      disableTypography
      onClick={() => handleViewRow(params.row.id)}
      primary={
        <Stack direction="row" justifyContent="space-between" spacing="10px">
          <Link noWrap color="inherit" variant="subtitle2" sx={{ cursor: 'pointer' }}>
            {params.row.model}
          </Link>
          <Button
            component={RouterLink}
            // to="/dashboard/StudentCareer/InstituteAppointment"
            // to={`dashboard/FarmerService/Registration/${params.row.id}/cultivation_tool`}
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

RenderCellModel.propTypes = {
  params: PropTypes.shape({
    row: PropTypes.object,
  }),
  handleViewRow: PropTypes.func,
};
export function RenderCellBrandName({ params }) {
  return (
    <>
      {' '}
      <ListItemText
        disableTypography
        primary={
          <Link noWrap color="inherit" variant="subtitle2" sx={{ cursor: 'pointer' }}>
            {params.row.brand}
          </Link>
        }
        sx={{ display: 'flex', flexDirection: 'column' }}
      />
    </>
  );
}

RenderCellBrandName.propTypes = {
  params: PropTypes.shape({
    row: PropTypes.object,
  }),
};

export function RenderCellYear({ params }) {
  return (
    <ListItemText
      disableTypography
      primary={
        <Link noWrap color="inherit" variant="subtitle2" sx={{ cursor: 'pointer' }}>
          {params.row.yearManufactured || params.row.yearInstalled}
        </Link>
      }
      sx={{ display: 'flex', flexDirection: 'column' }}
    />
  );
}

RenderCellYear.propTypes = {
  params: PropTypes.shape({
    row: PropTypes.object,
  }),
};

export function RenderCellCondition({ params }) {
  return (
    <ListItemText
      disableTypography
      primary={
        <Link noWrap color="inherit" variant="subtitle2" sx={{ cursor: 'pointer' }}>
          {params.row.condition}
        </Link>
      }
      sx={{ display: 'flex', flexDirection: 'column' }}
    />
  );
}

RenderCellCondition.propTypes = {
  params: PropTypes.shape({
    row: PropTypes.object,
  }),
};

// export function RenderCellPartySymbol({ params }) {
//   return (

//     <Avatar src={params.row.partySymbolImageDetails?.preview} alt={params.row.partyName} variant="rounded"
//       sx={{ width: 64, height: 64, mr: 2 }} />

//   );
// }

// RenderCellPartySymbol.propTypes = {
//   params: PropTypes.shape({
//     row: PropTypes.object,
//   }),
// };

export function RenderCellPrice({ params }) {
  return (
    <ListItemText
      disableTypography
      primary={
        <Link noWrap color="inherit" variant="subtitle2" sx={{ cursor: 'pointer' }}>
          ₹ {params.row.price}
        </Link>
      }
      sx={{ display: 'flex', flexDirection: 'column' }}
    />
  );
}

RenderCellPrice.propTypes = {
  params: PropTypes.shape({
    row: PropTypes.object,
  }),
};

export function RenderCellBookingAgriculture({ params }) {
  // console.log('params--->', params)

  return (
    <ListItemText
      disableTypography
      primary={
        <Link
          noWrap
          color="inherit"
          variant="subtitle2"
          onClick={params.row.onViewRow}
          sx={{ cursor: 'pointer' }}
        >
          <Stack direction="row" spacing="10px">
            <Button
              component={RouterLink}
              // to="/dashboard/StudentCareer/InstituteAppointment"
              to={`/dashboard/FarmerService/Registration/${params.row.sellerOwnerId}/appointment`}
              sx={{
                p: '0px 5px 0px 5px',
                color: 'green',
                border: params?.row?.status ? '2px solid #acb5c0' : '2px solid green',
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
              Book Appointment
            </Button>
          </Stack>
          {/* {params.row.partyFoundationYear} */}
        </Link>
      }
      sx={{ display: 'flex', flexDirection: 'column' }}
    />
  );
}

RenderCellBookingAgriculture.propTypes = {
  params: PropTypes.shape({
    row: PropTypes.object,
  }),
};
export function RenderCellViewAgriculture({ params, handleViewRow }) {
  // console.log('params--->', params.row.institutionOwnerId)

  return (
    <ListItemText
      disableTypography
      primary={
        <Link
          noWrap
          color="inherit"
          variant="subtitle2"
          // onClick={params.row.onViewRow}
          onClick={() => handleViewRow(params.row.id)}
          sx={{ cursor: 'pointer' }}
        >
          <Stack direction="row" spacing="10px">
            <Button
              component={RouterLink}
              // to="/dashboard/StudentCareer/InstituteAppointment"
              // to={`dashboard/FarmerService/Registration/${params.row.id}/cultivation_tool`}
              onClick={() => handleViewRow(params.row.id)}
              sx={{
                p: '0px 5px 0px 5px',
                color: 'white',
                bgcolor: 'green',
                border: params?.row?.status ? '2px solid #acb5c0' : '2px solid green',
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
          {/* {params.row.partyFoundationYear} */}
        </Link>
      }
      sx={{ display: 'flex', flexDirection: 'column' }}
    />
  );
}

RenderCellViewAgriculture.propTypes = {
  params: PropTypes.shape({
    row: PropTypes.object,
  }),
  handleViewRow: PropTypes.func,
};


export function RenderCellContactSeller({ params, }) {
  const { user } = useAuthContext();
  const btnRef = useRef(null)
  const [open, setOpen] = useState(false);
  // console.log('--->',params)
  const handleOpen = useCallback(async () => {

    const data = {
      sellerId: params.row.sellerOwnerId,
      consumerId: user?.userId
    }

    try {
      const response = await createConsumerRequest(data);
      setOpen(true)
      if (response) {
        enqueueSnackbar('Your details have been sent to Seller', { variant: 'success' });
        // createNotifications(
        //   params?.row?.userId,
        //   `Viewer contact detail ${user?.phone ? user?.phone : user?.UserProfile?.firstName}`,
        //   `${params?.row?.type} Viewed by ${user?.UserProfile ? user?.UserProfile?.firstName : user?.email}`,
        //   '/dashboard/FarmerService'
        // );
      } else {
        enqueueSnackbar('Failed to send details', { variant: 'error' });
      }
    } catch (error) {
      console.error('Error sending details :', error);
      enqueueSnackbar('An error occurred while sending details ', { variant: 'error' });
    }
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
            Name: {params?.row?.SellerOwnerDetail?.User?.UserProfile?.firstName || 'NA'}
          </Typography>
          <Typography sx={{ mt: 2 }}>
            Email: {params?.row?.SellerOwnerDetail?.User?.email || 'N/A'}
          </Typography>
          <Typography sx={{ mt: 2 }}>
            Contact: {params?.row?.SellerOwnerDetail?.contactNumber || 'N/A'}
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