import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';

export function RenderCellClaimId({ params }) {
  return (
    <Stack direction="row" alignItems="center" sx={{ py: 2, width: 1 }}>
      <div style={{ overflow: 'hidden' }}>{params.row.expenseClaimId}</div>
    </Stack>
  );
}

RenderCellClaimId.propTypes = {
  params: PropTypes.shape({
    row: PropTypes.object,
  }),
};

export function RenderCellClaimAmount({ params }) {
  return (
    <Stack direction="row" alignItems="center" sx={{ py: 2, width: 1 }}>
      <div>{params.row.description}</div>
    </Stack>
  );
}

RenderCellClaimAmount.propTypes = {
  params: PropTypes.shape({
    row: PropTypes.object,
  }),
};

export function RenderCellClaimDate({ params }) {
  return (
    <Stack direction="row" alignItems="center" sx={{ py: 2, width: 1 }}>
      <img
        src={params.row.imageDetails.preview}
        alt="img"
        style={{
          width: '80px',
          height: '80px',
          objectFit: 'cover',
          borderRadius: '50%',
          border: '2px solid gray',
        }}
      />
    </Stack>
  );
}

RenderCellClaimDate.propTypes = {
  params: PropTypes.shape({
    row: PropTypes.object,
  }),
};
