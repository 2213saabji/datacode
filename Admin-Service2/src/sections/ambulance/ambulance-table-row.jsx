import PropTypes from 'prop-types';

import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import ListItemText from '@mui/material/ListItemText';

import Label from 'src/components/label';

// ----------------------------------------------------------------------

export function RenderCellPrice({ params }) {
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

RenderCellPrice.propTypes = {
  params: PropTypes.shape({
    row: PropTypes.object,
  }),
};

export function RenderCellPublish({ params }) {
  return (
    <Label variant="soft" color={(params.row.publish === 'published' && 'info') || 'default'}>
      {params.row.tripId}
    </Label>
  );
}

RenderCellPublish.propTypes = {
  params: PropTypes.shape({
    row: PropTypes.object,
  }),
};

export function RenderCellCreatedAt({ params }) {
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

RenderCellCreatedAt.propTypes = {
  params: PropTypes.shape({
    row: PropTypes.object,
  }),
};

export function RenderCellStock({ params }) {
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
RenderCellStock.propTypes = {
  params: PropTypes.shape({
    row: PropTypes.object,
  }),
};

export function RenderCell({ params }) {
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
RenderCell.propTypes = {
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
