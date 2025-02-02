import PropTypes from 'prop-types';
import Link from '@mui/material/Link';
import ListItemText from '@mui/material/ListItemText';
// ----------------------------------------------------------------------

export function RenderCellInstituteName({ params }) {
  // console.log('------>', params)
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
            {params.row.Consumer.UserProfile.firstName}
          </Link>
        }
        sx={{ display: 'flex', flexDirection: 'column' }}
      />
    </>
  );
}

RenderCellInstituteName.propTypes = {
  params: PropTypes.shape({
    row: PropTypes.object,
  }),
};

export function RenderCellStudentNumber({ params }) {
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
            {params.row.Consumer.UserProfile.whatsappNumber}
          </Link>
        }
        sx={{ display: 'flex', flexDirection: 'column' }}
      />
    </>
  );
}

RenderCellStudentNumber.propTypes = {
  params: PropTypes.shape({
    row: PropTypes.object,
  }),
};

export function RenderCellStudentQualifiation({ params }) {
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
            {params.row.Consumer.UserProfile.highestQualification}
          </Link>
        }
        sx={{ display: 'flex', flexDirection: 'column' }}
      />
    </>
  );
}

RenderCellStudentQualifiation.propTypes = {
  params: PropTypes.shape({
    row: PropTypes.object,
  }),
};

