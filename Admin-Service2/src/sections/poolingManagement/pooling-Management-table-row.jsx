import PropTypes from 'prop-types';

import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import ListItemText from '@mui/material/ListItemText';

// import Label from 'src/components/label';

// ----------------------------------------------------------------------

export function RenderCellName({ params }) {
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
          {params.row.boothId}
        </Link>
      }
      sx={{ display: 'flex', flexDirection: 'column' }}
    />
  );
}

RenderCellName.propTypes = {
  params: PropTypes.shape({
    row: PropTypes.object,
  }),
};

export function RenderCellJob({ params }) {
  return (
    <ListItemText
      disableTypography
      primary={[params.row.pollingStationName]}
      sx={{ display: 'flex', flexDirection: 'column' }}
    />
  );
}

RenderCellJob.propTypes = {
  params: PropTypes.shape({
    row: PropTypes.object,
  }),
};

export function RenderCellCountry({ params }) {
  return (
    <Stack direction="row" alignItems="center" sx={{ py: 2, width: 1 }}>
      <ListItemText
        disableTypography
        primary={params.row.pollingCapacity}
        sx={{ display: 'flex', flexDirection: 'column' }}
      />
    </Stack>
  );
}

RenderCellCountry.propTypes = {
  params: PropTypes.shape({
    row: PropTypes.object,
  }),
};

export function RenderCellState({ params }) {
  return (
    <Stack direction="row" alignItems="center" sx={{ py: 2, width: 1 }}>
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
            {params.row.numberOfBooth}
          </Link>
        }
        sx={{ display: 'flex', flexDirection: 'column' }}
      />
    </Stack>
  );
}

RenderCellState.propTypes = {
  params: PropTypes.shape({
    row: PropTypes.object,
  }),
};
