import PropTypes from 'prop-types';

import Link from '@mui/material/Link';
import { Stack, Button } from '@mui/material';
import ListItemText from '@mui/material/ListItemText';

import { RouterLink } from 'src/routes/components';

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
          <Button
            component={RouterLink}
            // to="/dashboard/StudentCareer/InstituteAppointment"
            // to={`/dashboard/StudentCareer/${params.row.institutionId}/InstituteAppointment`}
            sx={{
              p: '0px 5px 0px 5px',
              color:
                params?.row?.appointmentPassStatus === 'Pending'
                  ? '2px solid #acb5c0'
                  : '2px solid green',
              border:
                params?.row?.appointmentPassStatus === 'Pending'
                  ? '2px solid #acb5c0'
                  : '2px solid green',
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
            {params.row.appointmentPassStatus}
          </Button>
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
          noWrap
          color="inherit"
          variant="subtitle2"
          onClick={params.row.onViewRow}
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
              to={`/dashboard/StudentCareer/${params.row.institutionId}/InstituteAppointment`}
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
