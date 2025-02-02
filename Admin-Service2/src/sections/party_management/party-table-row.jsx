import PropTypes from 'prop-types';

import Link from '@mui/material/Link';
import { Avatar } from '@mui/material';
import ListItemText from '@mui/material/ListItemText';

// ----------------------------------------------------------------------

export function RenderCellPartyName({ params }) {
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
            {params.row.partyName}
          </Link>
        }
        sx={{ display: 'flex', flexDirection: 'column' }}
      />
    </>
  );
}

RenderCellPartyName.propTypes = {
  params: PropTypes.shape({
    row: PropTypes.object,
  }),
};

export function RenderCellPartyLeader({ params }) {
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
          {params.row.partyLeader}
        </Link>
      }
      sx={{ display: 'flex', flexDirection: 'column' }}
    />
  );
}

RenderCellPartyLeader.propTypes = {
  params: PropTypes.shape({
    row: PropTypes.object,
  }),
};

export function RenderCellPartySymbol({ params }) {
  return (
    <Avatar
      src={params.row.partySymbolImageDetails?.preview}
      alt={params.row.partyName}
      variant="rounded"
      sx={{ width: 64, height: 64, mr: 2 }}
    />
  );
}

RenderCellPartySymbol.propTypes = {
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
          {params.row.partyFoundationYear}
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
