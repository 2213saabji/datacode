import PropTypes from 'prop-types';

import Link from '@mui/material/Link';
import ListItemText from '@mui/material/ListItemText';

export function RenderCellDepartment({ params }) {
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
          {params?.row?.departmentName}
        </Link>
      }
      sx={{ display: 'flex', flexDirection: 'column' }}
    />
  );
}

RenderCellDepartment.propTypes = {
  params: PropTypes.shape({
    row: PropTypes.object,
  }),
};

export function RenderCellName({ params }) {
  return (
    <Link noWrap color="inherit" variant="subtitle2" sx={{ cursor: 'pointer' }}>
      {params?.row?.contactName}
    </Link>
  );
}

RenderCellName.propTypes = {
  params: PropTypes.shape({
    row: PropTypes.object,
  }),
};

export function RenderCellNumber({ params }) {
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
          {params?.row?.phoneNumber}
        </Link>
      }
      sx={{ display: 'flex', flexDirection: 'column' }}
    />
  );
}

RenderCellNumber.propTypes = {
  params: PropTypes.shape({
    row: PropTypes.object,
  }),
};
