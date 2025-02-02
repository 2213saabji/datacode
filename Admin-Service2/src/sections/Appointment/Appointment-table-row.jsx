/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types';

import Link from '@mui/material/Link';
import { Avatar } from '@mui/material';
import ListItemText from '@mui/material/ListItemText';

import { useAuthContext } from 'src/auth/hooks';

// ----------------------------------------------------------------------

export function RenderCellAppointmentName({ params }) {
  const { user } = useAuthContext();
  const candidate = user.userRoleType === 'Candidate';
  const Voter = user.userRoleType === 'Voter';

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
          {params.row.Voter?.email}
        </Link>
      }
      sx={{ display: 'flex', flexDirection: 'column' }}
    />
  );
}

RenderCellAppointmentName.propTypes = {
  params: PropTypes.shape({
    row: PropTypes.object,
  }),
};

export function RenderCellAppointmentLeader({ params }) {
  // console.log(params.row)
  const { user } = useAuthContext();
  const candidate = user.userRoleType === 'Candidate';
  const Voter = user.userRoleType === 'Voter';
  // console.log(p);

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
          {/* {p ? params?.row?.Candidate?.phone : params?.row?.Voter?.phone} */}
          {params?.row?.Voter?.phone}
        </Link>
      }
      sx={{ display: 'flex', flexDirection: 'column' }}
    />
  );
}

RenderCellAppointmentLeader.propTypes = {
  params: PropTypes.shape({
    row: PropTypes.object,
  }),
};

export function RenderCellAppointmentSymbol({ params }) {
  return (
    <Avatar
      src={params.row.partySymbolImageDetails?.preview}
      alt={params.row.candidateId}
      variant="rounded"
      sx={{ width: 64, height: 64, mr: 2 }}
    />
  );
}

RenderCellAppointmentSymbol.propTypes = {
  params: PropTypes.shape({
    row: PropTypes.object,
  }),
};

export function RenderCellFoundationYear({ params }) {
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
          {/* {params.row.appointmentDate} */}
          {params.row.appointmentStatus}
        </Link>
      }
      sx={{ display: 'flex', flexDirection: 'column' }}
    />
  );
}

RenderCellFoundationYear.propTypes = {
  params: PropTypes.shape({
    row: PropTypes.object,
  }),
};
export function RenderCellFoundationDate({ params }) {
  const originalDateStr = params.row.created_at.substring(0, 10);
  const parts = originalDateStr.split('-');
  const formattedDateStr = `${parts[2]}/${parts[1]}/${parts[0]}`;

  // console.log(formattedDateStr);
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
          {formattedDateStr}
        </Link>
      }
      sx={{ display: 'flex', flexDirection: 'column' }}
    />
  );
}

RenderCellFoundationDate.propTypes = {
  params: PropTypes.shape({
    row: PropTypes.object,
  }),
};
