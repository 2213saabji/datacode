import PropTypes from 'prop-types';

// import Box from '@mui/material/Box';
// import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
// import ListItemText from '@mui/material/ListItemText';
// import LinearProgress from '@mui/material/LinearProgress';

// import { fCurrency } from 'src/utils/format-number';
// import { fTime, fDate } from 'src/utils/format-time';

// import Label from 'src/components/label';

// ----------------------------------------------------------------------

// export function RenderCellClaimName({ params }) {
//   return (
//     <ListItemText
//       disableTypography
//       primary={
//         <Link
//           noWrap
//           color="inherit"
//           variant="subtitle2"
//           onClick={params.row.onViewRow}
//           sx={{ cursor: 'pointer' }}
//         >
//           {params.row.user}
//         </Link>
//       }
//       sx={{ display: 'flex', flexDirection: 'column' }}
//     />
//   );
// }

// RenderCellClaimName.propTypes = {
//   params: PropTypes.shape({
//     row: PropTypes.object,
//   }),
// };

export function RenderCellClaimId({ params }) {
  return (
    <Stack direction="row" alignItems="center" sx={{ py: 2, width: 1 }}>
      <div>{params.row.expenseClaimId}</div>
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
      <div>{params.row.amount}</div>
    </Stack>
  );
}

RenderCellClaimStatus.propTypes = {
  params: PropTypes.shape({
    row: PropTypes.object,
  }),
};

export function RenderCellClaimStatus({ params }) {
  return (
    <Stack direction="row" alignItems="center" sx={{ py: 2, width: 1 }}>
      <div>{params.row.claimStatus}</div>
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
      <div>{params.row.purchaseDate}</div>
    </Stack>
  );
}

RenderCellClaimDate.propTypes = {
  params: PropTypes.shape({
    row: PropTypes.object,
  }),
};
