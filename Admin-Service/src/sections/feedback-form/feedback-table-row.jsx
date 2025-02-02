import React from 'react';
import PropTypes from 'prop-types';

import Link from '@mui/material/Link';
import ListItemText from '@mui/material/ListItemText';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

export function RenderFullName({ params }) {
  return (
    <ListItemText
      disableTypography
      primary={
        <Link noWrap color="inherit" variant="subtitle2" sx={{ cursor: 'pointer' }}>
          {params.row?.User?.UserProfile?.firstName} {params.row?.User?.UserProfile?.middleName}{' '}
          {params.row?.User?.UserProfile?.lastName}
        </Link>
      }
      sx={{ display: 'flex', flexDirection: 'column' }}
    />
  );
}
RenderFullName.propTypes = {
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
          {params.row.User?.phone}
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

export function RenderUserRoleType({ params }) {
  return (
    <ListItemText
      disableTypography
      primary={
        <Link noWrap color="inherit" variant="subtitle2" sx={{ cursor: 'pointer' }}>
          {params.row.User?.userRoleType}
        </Link>
      }
      sx={{ display: 'flex', flexDirection: 'column' }}
    />
  );
}
RenderUserRoleType.propTypes = {
  params: PropTypes.shape({
    row: PropTypes.object,
  }),
};

export function RenderFeedbackMessage({ params }) {
  return (
    <ListItemText
      disableTypography
      primary={
        <Link noWrap color="inherit" variant="subtitle2" sx={{ cursor: 'pointer' }}>
          {params.row.feedbackMessage}
        </Link>
      }
      sx={{ display: 'flex', flexDirection: 'column' }}
    />
  );
}
RenderFeedbackMessage.propTypes = {
  params: PropTypes.shape({
    row: PropTypes.object,
  }),
};

export function RenderFeedbackStatus({ params }) {
  return (
    <ListItemText
      disableTypography
      primary={
        <Link noWrap color="inherit" variant="subtitle2" sx={{ cursor: 'pointer' }}>
          {params?.row?.feedbackStatus ? <VisibilityIcon /> : <VisibilityOffIcon />}
        </Link>
      }
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    />
  );
}
RenderFeedbackStatus.propTypes = {
  params: PropTypes.shape({
    row: PropTypes.object,
  }),
};

// export function RenderUserId({ params }) {
//     return (
//       <ListItemText
//         disableTypography
//         primary={
//           <Link noWrap color="inherit" variant="subtitle2" sx={{ cursor: 'pointer' }}>
//             {params.row.userId}
//           </Link>
//         }
//         sx={{ display: 'flex', flexDirection: 'column' }}
//       />
//     );
//   }
//   RenderUserId.propTypes = {
//     params: PropTypes.shape({
//       row: PropTypes.object,
//     }),
//   };

// export function RenderUserRoleId({ params }) {
//   return (
//     <ListItemText
//       disableTypography
//       primary={
//         <Link noWrap color="inherit" variant="subtitle2" sx={{ cursor: 'pointer' }}>
//           {params.row.User.userRoleId}
//         </Link>
//       }
//       sx={{ display: 'flex', flexDirection: 'column' }}
//     />
//   );
// }
// RenderUserRoleId.propTypes = {
//   params: PropTypes.shape({
//     row: PropTypes.object,
//   }),
// };
