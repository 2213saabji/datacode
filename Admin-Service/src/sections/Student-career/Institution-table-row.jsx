import PropTypes from 'prop-types';
import { enqueueSnackbar } from 'notistack';
import { useRef, useState, useCallback } from 'react';

import { Box } from '@mui/system';
import Link from '@mui/material/Link';
import CloseIcon from '@mui/icons-material/Close';
import PhoneIcon from '@mui/icons-material/Phone';
import ListItemText from '@mui/material/ListItemText';
import { Stack, Modal, Button, Divider, IconButton, Typography } from '@mui/material';

import { RouterLink } from 'src/routes/components';

import { useAuthContext } from 'src/auth/hooks';
import { createConsumerRequest } from 'src/api/interestedConsumer'

import Label from 'src/components/label';
// ----------------------------------------------------------------------

export function RenderCellInstituteName({ params }) {
  return (
    <>
      {' '}
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
            {params.row.collegeDetailId}
          </Link>
        }
        sx={{ display: 'flex', flexDirection: 'column' }}
      />
    </>
  );
}

RenderCellInstituteName.propTypes = {
  params: PropTypes.shape({
    row: PropTypes.object,
  }),
};

export function RenderCellCoursesOffered({ params }) {
  const coursesOffered = params?.row?.coursesOffered?.join(', ');

  return (
    <>
      {' '}
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
            {coursesOffered}
          </Link>
        }
        sx={{ display: 'flex', flexDirection: 'column' }}
      />
    </>
  );
}

RenderCellCoursesOffered.propTypes = {
  params: PropTypes.shape({
    row: PropTypes.object,
  }),
};
export function RenderCellHostelFacility({ params }) {
  return (
    <>
      {' '}
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
            {params.row.hostelFacility === true ? 'Yes' : 'No'}
          </Link>
        }
        sx={{ display: 'flex', flexDirection: 'column' }}
      />
    </>
  );
}

RenderCellHostelFacility.propTypes = {
  params: PropTypes.shape({
    row: PropTypes.object,
  }),
};

export function RenderCellUniversityName({ params }) {
  return (
    <>
      {' '}
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
            {params.row.universityAffiliation}
          </Link>
        }
        sx={{ display: 'flex', flexDirection: 'column' }}
      />
    </>
  );
}

RenderCellUniversityName.propTypes = {
  params: PropTypes.shape({
    row: PropTypes.object,
  }),
};
export function RenderCellBoard({ params }) {
  return (
    <>
      {' '}
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
            {params.row.board}
          </Link>
        }
        sx={{ display: 'flex', flexDirection: 'column' }}
      />
    </>
  );
}

RenderCellBoard.propTypes = {
  params: PropTypes.shape({
    row: PropTypes.object,
  }),
};
export function RenderCellGradesOffered({ params }) {
  return (
    <>
      {' '}
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
            {params.row.gradesOffered}
          </Link>
        }
        sx={{ display: 'flex', flexDirection: 'column' }}
      />
    </>
  );
}

RenderCellGradesOffered.propTypes = {
  params: PropTypes.shape({
    row: PropTypes.object,
  }),
};
export function RenderCellSubjectsOffered({ params }) {
  const subjectsOffered = params?.row?.subjectsOffered?.join(', ');

  return (
    <>
      {' '}
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
            {subjectsOffered}
          </Link>
        }
        sx={{ display: 'flex', flexDirection: 'column' }}
      />
    </>
  );
}

RenderCellSubjectsOffered.propTypes = {
  params: PropTypes.shape({
    row: PropTypes.object,
  }),
};
export function RenderCellCompetitiveExams({ params }) {
  const competitiveExams = params?.row?.competitiveExams?.join(', ');

  return (
    <>
      {' '}
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
            {competitiveExams}
          </Link>
        }
        sx={{ display: 'flex', flexDirection: 'column' }}
      />
    </>
  );
}

RenderCellCompetitiveExams.propTypes = {
  params: PropTypes.shape({
    row: PropTypes.object,
  }),
};
export function RenderCellBatchTimings({ params }) {
  const batchTimings = params?.row?.batchTimings?.join(', ');

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
          {batchTimings}
        </Link>
      }
      sx={{ display: 'flex', flexDirection: 'column' }}
    />
  );
}
RenderCellBatchTimings.propTypes = {
  params: PropTypes.shape({
    row: PropTypes.object,
  }),
};

export function RenderCellInstituteType({ params }) {
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
          {params.row.placementRecord}
        </Link>
      }
      sx={{ display: 'flex', flexDirection: 'column' }}
    />
  );
}

RenderCellInstituteType.propTypes = {
  params: PropTypes.shape({
    row: PropTypes.object,
  }),
};

export function RenderCellInstituteAppName({ params }) {
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
          {params.row.appointmentType}
        </Link>
      }
      sx={{ display: 'flex', flexDirection: 'column' }}
    />
  );
}

RenderCellInstituteAppName.propTypes = {
  params: PropTypes.shape({
    row: PropTypes.object,
  }),
};
export function RenderCellAppointmentType({ params }) {
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
          {params.row.appointmentType}
        </Link>
      }
      sx={{ display: 'flex', flexDirection: 'column' }}
    />
  );
}

RenderCellAppointmentType.propTypes = {
  params: PropTypes.shape({
    row: PropTypes.object,
  }),
};
export function RenderCellAppointmentTime({ params }) {
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
          {params.row.appointmentTime}
        </Link>
      }
      sx={{ display: 'flex', flexDirection: 'column' }}
    />
  );
}

RenderCellAppointmentTime.propTypes = {
  params: PropTypes.shape({
    row: PropTypes.object,
  }),
};
export function RenderCellAppointmentDate({ params }) {
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
          {params.row.appointmentDate}
        </Link>
      }
      sx={{ display: 'flex', flexDirection: 'column' }}
    />
  );
}

RenderCellAppointmentDate.propTypes = {
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
        <Link
          noWrap
          color="inherit"
          variant="subtitle2"
          onClick={params.row.onViewRow}
          sx={{ cursor: 'pointer' }}
        >
          {renderStatusLabel(params.row.appointmentPassStatus)}
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
export function RenderCellBookingMeeting({ params }) {
  return (
    <ListItemText
      disableTypography
      primary={
        <Link
          component={RouterLink}
          noWrap
          color="inherit"
          variant="subtitle2"
          href={params.row.appointmentPassMeetingLink}
          target="_blank" // This opens the link in a new tab
          rel="noopener noreferrer"
          sx={{ cursor: 'pointer' }}
        >
          {params.row.appointmentPassMeetingLink}
        </Link>
      }
      sx={{ display: 'flex', flexDirection: 'column' }}
    />
  );
}

RenderCellBookingMeeting.propTypes = {
  params: PropTypes.shape({
    row: PropTypes.object,
  }),
};

export function RenderCellBookingInstitute({ params }) {
  // console.log('params--->', params.row.institutionOwnerId)

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
              to={`/dashboard/StudentCareer/${params.row.institutionOwnerId}/InstituteAppointment`}
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

RenderCellBookingInstitute.propTypes = {
  params: PropTypes.shape({
    row: PropTypes.object,
  }),
};

export function RenderCellContactSeller({ params, }) {
  const { user } = useAuthContext();
  const btnRef = useRef(null)
  const [open, setOpen] = useState(false);
  const handleOpen = useCallback(async () => {

    const data = {
      sellerId:params.row.institutionOwnerId,
      consumerId:user?.userId
    }
    try {
      const response = await createConsumerRequest(data);
      setOpen(true)
      if (response) {
        enqueueSnackbar('Your details have been sent to Institute', { variant: 'success' });
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
              onClick={()=>handleOpen()}
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
            <Typography variant="h6">Owner Details</Typography>
            <IconButton onClick={handleClose} sx={{ bgcolor: '#fda92daa', color: 'black' }}>
              <CloseIcon />
            </IconButton>
          </Stack>

          <Divider />
          <Typography sx={{ mt: 2 }}>
            {/* Display relevant seller details here */}
            Name: {params?.row?.InstitutionOwnerDetail?.User?.UserProfile?.firstName || 'NA'}
          </Typography>
          <Typography sx={{ mt: 2 }}>
            Email: {params?.row?.InstitutionOwnerDetail?.email || 'N/A'}
          </Typography>
          <Typography sx={{ mt: 2 }}>
            Contact: {params?.row?.InstitutionOwnerDetail?.User?.UserProfile?.whatsappNumber || 'N/A'}
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