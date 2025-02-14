import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
// import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';
// import LinearProgress from '@mui/material/LinearProgress';

// import { fCurrency } from 'src/utils/format-number';
// import { fTime, fDate } from 'src/utils/format-time';

// import Label from 'src/components/label';

// ----------------------------------------------------------------------

export function RenderCellPrice({ params }) {
  return (
    <>
      {' '}
      <ListItemText
        disableTypography
        primary={
          <Box
            noWrap
            color="inherit"
            variant="subtitle2"
            onClick={params.row.onViewRow}
            sx={{ cursor: 'pointer' }}
          >
            <img
              src={params.row.issue_image_url}
              alt="img"
              style={{
                width: '80px',
                height: '80px',
                objectFit: 'cover',
                borderRadius: '50%',
                border: '2px solid gray',
              }}
            />
          </Box>
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
          {params.row.issue_status}
        </Link>
      }
      sx={{ display: 'flex', flexDirection: 'column' }}
    />
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
          {params.row.assignee_id}
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
        <Box
          noWrap
          color="inherit"
          variant="subtitle2"
          onClick={params.row.onViewRow}
          sx={{ cursor: 'pointer' }}
        >
          {params.row.priority}
        </Box>
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

export function RenderCellProduct({ params }) {
  return (
    <Stack direction="row" alignItems="center" sx={{ py: 2, width: 1 }}>
      {/* <Avatar
        alt={params.row.name}
        src={params.row.coverUrl}
        variant="rounded"
        sx={{ width: 64, height: 64, mr: 2 }}
      /> */}
      <div>{params.row.support_ticket_by_Id}</div>
    </Stack>
  );
}

RenderCellProduct.propTypes = {
  params: PropTypes.shape({
    row: PropTypes.object,
  }),
};
