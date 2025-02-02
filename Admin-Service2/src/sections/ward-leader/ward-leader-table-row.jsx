import PropTypes from 'prop-types';

import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import ListItemText from '@mui/material/ListItemText';

// ----------------------------------------------------------------------

export function RenderCellDriver({ params }) {
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
            {params.row.User?.DriverDetail
              ? params.row.User?.DriverDetail?.fullName
              : 'Not Assigned'}
          </Link>
        }
        sx={{ display: 'flex', flexDirection: 'column' }}
      />
    </>
  );
}

RenderCellDriver.propTypes = {
  params: PropTypes.shape({
    row: PropTypes.object,
  }),
};
export function RenderCellTripId({ params }) {
  return (
    <Stack direction="row" alignItems="center" sx={{ py: 2, width: 1 }}>
      <div>{params.row.tripId}</div>
    </Stack>
  );
}

RenderCellTripId.propTypes = {
  params: PropTypes.shape({
    row: PropTypes.object,
  }),
};

export function RenderCellTripSource({ params }) {
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
          {params.row.tripSource}
        </Link>
      }
      sx={{ display: 'flex', flexDirection: 'column' }}
    />
  );
}
RenderCellTripSource.propTypes = {
  params: PropTypes.shape({
    row: PropTypes.object,
  }),
};

export function RenderCellTripDestination({ params }) {
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
          {params.row.tripDestination}
        </Link>
      }
      sx={{ display: 'flex', flexDirection: 'column' }}
    />
  );
}
RenderCellTripDestination.propTypes = {
  params: PropTypes.shape({
    row: PropTypes.object,
  }),
};

export function RenderCellTripDetails({ params }) {
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
          {params.row.tripDetails}
        </Link>
      }
      sx={{ display: 'flex', flexDirection: 'column' }}
    />
  );
}
RenderCellTripDetails.propTypes = {
  params: PropTypes.shape({
    row: PropTypes.object,
  }),
};

export function RenderCellVehicleNumber({ params }) {
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
          {params.row.VehicleDetail ? params.row.VehicleDetail?.licensePlate : 'Not Assigned'}
        </Link>
      }
      sx={{ display: 'flex', flexDirection: 'column' }}
    />
  );
}

RenderCellVehicleNumber.propTypes = {
  params: PropTypes.shape({
    row: PropTypes.object,
  }),
};

export function RenderCellStatus({ params }) {
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
          {params.row.tripStatus === null ? 'Pending' : params.row.tripStatus}
        </Link>
      }
      sx={{ display: 'flex', flexDirection: 'column' }}
    />
  );
}

RenderCellStatus.propTypes = {
  params: PropTypes.shape({
    row: PropTypes.object,
  }),
};
