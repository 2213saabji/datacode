import React from 'react';
import PropTypes from 'prop-types';

import Link from '@mui/material/Link';
// import Stack from '@mui/material/Stack';
// import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';
// import { UpdateStatusCount } from 'src/api/suggestion';
// import { FormControlLabel, Switch } from '@mui/material';

// import Iconify from 'src/components/iconify';

// import VisibilityIcon from '@mui/icons-material/Visibility';
// import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

export function RenderName({ params }) {
  return (
    <ListItemText
      disableTypography
      primary={
        <Link noWrap color="inherit" variant="subtitle2" sx={{ cursor: 'pointer' }}>
          {params.row.name}
        </Link>
      }
      sx={{ display: 'flex', flexDirection: 'column' }}
    />
  );
}
RenderName.propTypes = {
  params: PropTypes.shape({
    row: PropTypes.object,
  }),
};

export function RenderProblemTitle({ params }) {
  return (
    <ListItemText
      disableTypography
      primary={
        <Link noWrap color="inherit" variant="subtitle2" sx={{ cursor: 'pointer' }}>
          {params.row.problemTitle}
        </Link>
      }
      sx={{ display: 'flex', flexDirection: 'column' }}
    />
  );
}
RenderProblemTitle.propTypes = {
  params: PropTypes.shape({
    row: PropTypes.object,
  }),
};

export function RenderProblemDescription({ params }) {
  return (
    <ListItemText
      disableTypography
      primary={
        <Link noWrap color="inherit" variant="subtitle2" sx={{ cursor: 'pointer' }}>
          {params.row.problemDescription}
        </Link>
      }
      sx={{ display: 'flex', flexDirection: 'column' }}
    />
  );
}
RenderProblemDescription.propTypes = {
  params: PropTypes.shape({
    row: PropTypes.object,
  }),
};

export function RenderDepartment({ params }) {
  return (
    <ListItemText
      disableTypography
      primary={
        <Link noWrap color="inherit" variant="subtitle2" sx={{ cursor: 'pointer' }}>
          {/* {params.row.problemDescription} */}
        </Link>
      }
      sx={{ display: 'flex', flexDirection: 'column' }}
    />
  );
}
RenderDepartment.propTypes = {
  params: PropTypes.shape({
    row: PropTypes.object,
  }),
};

export function RenderMobileNumber({ params }) {
  return (
    <ListItemText
      disableTypography
      primary={
        <Link noWrap color="inherit" variant="subtitle2" sx={{ cursor: 'pointer' }}>
          {params.row.mobileNumber}
        </Link>
      }
      sx={{ display: 'flex', flexDirection: 'column' }}
    />
  );
}
RenderMobileNumber.propTypes = {
  params: PropTypes.shape({
    row: PropTypes.object,
  }),
};

export function RenderEmail({ params }) {
  return (
    <ListItemText
      disableTypography
      primary={
        <Link noWrap color="inherit" variant="subtitle2" sx={{ cursor: 'pointer' }}>
          {params.row.email}
        </Link>
      }
      sx={{ display: 'flex', flexDirection: 'column' }}
    />
  );
}
RenderEmail.propTypes = {
  params: PropTypes.shape({
    row: PropTypes.object,
  }),
};

export function RenderAddress({ params }) {
  return (
    <ListItemText
      disableTypography
      primary={
        <Link noWrap color="inherit" variant="subtitle2" sx={{ cursor: 'pointer' }}>
          {params.row.address}
        </Link>
      }
      sx={{ display: 'flex', flexDirection: 'column' }}
    />
  );
}
RenderAddress.propTypes = {
  params: PropTypes.shape({
    row: PropTypes.object,
  }),
};
