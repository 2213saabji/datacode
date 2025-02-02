import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';

// import { useBoolean } from 'src/hooks/use-boolean';

import { fDate } from 'src/utils/format-time';

// ----------------------------------------------------------------------

export default function SmsCommentItem({ remark_description, remark_updated_by, created_at }) {
  // const reply = useBoolean();

  return (
    <ListItem
      sx={{
        p: 0,
        pt: 3,
        alignItems: 'flex-start',
        // ...(hasReply && {
        //   pl: 8,
        // }),
      }}
    >
      <Stack
        flexGrow={1}
        sx={{
          pb: 3,
          borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
        }}
      >
        <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
          {remark_updated_by}
        </Typography>

        <Typography variant="caption" sx={{ color: 'text.disabled' }}>
          {fDate(created_at)}
        </Typography>

        <Typography variant="body2" sx={{ mt: 1 }}>
          {remark_description}
        </Typography>
      </Stack>
    </ListItem>
  );
}

SmsCommentItem.propTypes = {
  remark_description: PropTypes.string,
  created_at: PropTypes.instanceOf(Date),
  remark_updated_by: PropTypes.string,
};
