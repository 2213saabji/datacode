import PropTypes from 'prop-types';

import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import ListItemText from '@mui/material/ListItemText';

import { useGetVoters } from 'src/api/voter';
// ----------------------------------------------------------------------

export function RenderCellUserName({ params }) {
  const { voters } = useGetVoters();

  // console.log('params:', params);

  const filteredUser = voters?.data?.filter((item) => {
    console.log('hello');
    return params?.row?.userId === item?.User?.userId;
  });

  // console.log('filteredUser:', filteredUser);

  return (
    <Stack direction="row" alignItems="center" sx={{ py: 2, width: 1 }}>
      <ListItemText
        disableTypography
        primary={
          <Link noWrap color="inherit" variant="subtitle2" sx={{ cursor: 'pointer' }}>
            {filteredUser && filteredUser[0]?.User
              ? filteredUser && filteredUser[0]?.User?.UserProfile?.firstName
              : filteredUser && filteredUser[0]?.User?.phone}
            {/* {user?.UserProfile?.firstName} {user?.UserProfile?.middleName} {user?.UserProfile?.lastName}  */}
          </Link>
        }
        sx={{ display: 'flex', flexDirection: 'column' }}
      />
    </Stack>
  );
}

RenderCellUserName.propTypes = {
  params: PropTypes.shape({
    row: PropTypes.object,
  }),
};

export function RenderCellSurveyResponseId({ params }) {
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
          {params.row.surveyResponseId}
        </Link>
      }
      sx={{ display: 'flex', flexDirection: 'column' }}
    />
  );
}

RenderCellSurveyResponseId.propTypes = {
  params: PropTypes.shape({
    row: PropTypes.object,
  }),
};

export function RenderCellSurveyId({ params }) {
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
          {params.row.surveyId}
        </Link>
      }
      sx={{ display: 'flex', flexDirection: 'column' }}
    />
  );
}

RenderCellSurveyId.propTypes = {
  params: PropTypes.shape({
    row: PropTypes.object,
  }),
};

export function RenderCellSurveyQuestionId({ params }) {
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
          {params.row.surveyQuestionId}
        </Link>
      }
      sx={{ display: 'flex', flexDirection: 'column' }}
    />
  );
}

RenderCellSurveyQuestionId.propTypes = {
  params: PropTypes.shape({
    row: PropTypes.object,
  }),
};

export function RenderCellResponse({ params }) {
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
          {params.row.response}
        </Link>
      }
      sx={{ display: 'flex', flexDirection: 'column' }}
    />
  );
}

RenderCellResponse.propTypes = {
  params: PropTypes.shape({
    row: PropTypes.object,
  }),
};
