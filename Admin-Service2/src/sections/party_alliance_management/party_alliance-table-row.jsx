import PropTypes from 'prop-types';

import Link from '@mui/material/Link';
import ListItemText from '@mui/material/ListItemText';

// ----------------------------------------------------------------------

export function RenderCellPartyAllianceName({ params }) {
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
            {params.row.partyAllianceName}
          </Link>
        }
        sx={{ display: 'flex', flexDirection: 'column' }}
      />
    </>
  );
}

RenderCellPartyAllianceName.propTypes = {
  params: PropTypes.shape({
    row: PropTypes.object,
  }),
};
