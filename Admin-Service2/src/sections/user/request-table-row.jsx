/* eslint-disable no-nested-ternary */
import React from 'react';
import PropTypes from 'prop-types';

import Link from '@mui/material/Link';
import ListItemText from '@mui/material/ListItemText';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export function RenderCellServiceHistoryId({ params }) {
  return (
    <ListItemText
      disableTypography
      primary={
        <Link
          noWrap
          color="inherit"
          variant="subtitle2"
          display="flex"
          ml="10px"
          alignItems="center"
          minHeight="40px"
          onClick={params?.row?.onViewRow}
          sx={{ cursor: 'pointer' }}
        >
          {params?.row?.id}
        </Link>
      }
      sx={{ display: 'flex', flexDirection: 'column' }}
    />
  );
}

RenderCellServiceHistoryId.propTypes = {
  params: PropTypes.shape({
    row: PropTypes.object,
  }),
};

export function RenderCellServiceHistoryFirstName({ params }) {
  return (
    <ListItemText
      disableTypography
      primary={
        <Link
          noWrap
          color="inherit"
          variant="subtitle2"
          onClick={params?.row?.onViewRow}
          sx={{ cursor: 'pointer' }}
        >
          {params?.row?.doctorName ||
            params?.row?.businessmanName ||
            params?.row?.instituteOwnerFirstName ||
            params?.row?.sellerOwnerfirstName ||
            params?.row?.employerName}
        </Link>
      }
      sx={{ display: 'flex', flexDirection: 'column' }}
    />
  );
}

RenderCellServiceHistoryFirstName.propTypes = {
  params: PropTypes.shape({
    row: PropTypes.object,
  }),
};
export function RenderCellServiceHistoryApprovalStatus({ params }) {
  return (
    <ListItemText
      disableTypography
      primary={
        <Link
          noWrap
          color="inherit"
          variant="subtitle2"
          onClick={params?.row?.onViewRow}
          sx={{ cursor: 'pointer' }}
        >
          {params?.row?.approvalStatus === 0
            ? 'Pending'
            : params?.row?.approvalStatus === 1
              ? 'Success'
              : params?.row?.approvalStatus === -1
                ? 'Rejected'
                : ''}
        </Link>
      }
      sx={{ display: 'flex', flexDirection: 'column' }}
    />
  );
}

RenderCellServiceHistoryApprovalStatus.propTypes = {
  params: PropTypes.shape({
    row: PropTypes.object,
  }),
};
export function RenderCellServiceHistoryCreatedAt({ params }) {
  return (
    <ListItemText
      disableTypography
      primary={
        <Link
          noWrap
          color="inherit"
          variant="subtitle2"
          onClick={params?.row?.onViewRow}
          sx={{ cursor: 'pointer' }}
        >
          {params?.row?.created_at
            ? `${params?.row?.created_at.slice(0, 10)}  ${params?.row?.created_at.slice(11, 19)}`
            : ''}
        </Link>
      }
      sx={{ display: 'flex', flexDirection: 'column' }}
    />
  );
}

RenderCellServiceHistoryCreatedAt.propTypes = {
  params: PropTypes.shape({
    row: PropTypes.object,
  }),
};
