import PropTypes from 'prop-types';

import Link from '@mui/material/Link';
import ListItemText from '@mui/material/ListItemText';

export function RenderCellVehicleType({ params }) {
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
          {/* {params.row.User?.DriverDetail ? params.row.User?.DriverDetail?.fullName : "Not Assigned"} */}
          {params?.row?.vehicleType}
        </Link>
      }
      sx={{ display: 'flex', flexDirection: 'column' }}
    />
  );
}

RenderCellVehicleType.propTypes = {
  params: PropTypes.shape({
    row: PropTypes.object,
  }),
};

export function RenderCellVehicleOption({ params }) {
  return (
    <Link noWrap color="inherit" variant="subtitle2" sx={{ cursor: 'pointer' }}>
      {params?.row?.vehicleOptionFor}
    </Link>
  );
}

RenderCellVehicleOption.propTypes = {
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
          // onClick={params.row.onViewRow}
          sx={{ cursor: 'pointer' }}
        >
          {params?.row?.status}
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
