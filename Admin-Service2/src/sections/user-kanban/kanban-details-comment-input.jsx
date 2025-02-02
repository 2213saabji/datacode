import PropTypes from 'prop-types';
import { useState, useCallback } from 'react';

import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { Typography } from '@mui/material';
import InputBase from '@mui/material/InputBase';

// import IconButton from '@mui/material/IconButton';
import { useAuthContext } from 'src/auth/hooks';

// import Iconify from 'src/components/iconify';
// ----------------------------------------------------------------------

export default function KanbanDetailsCommentInput({ onAddComment, task }) {
  const [comment, setComment] = useState('');
  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleAddCommentInternal = useCallback(() => {
    try {
      if (comment.trim()) {
        onAddComment({ messageType: 'text', message: comment });
        setComment('');
      }
    } catch (error) {
      console.error(error);
    }
  }, [comment, onAddComment]);

  const { user } = useAuthContext();

  const userData = { UserProfile: user?.UserProfile, userId: user?.userId };

  return (
    <Stack
      direction="row"
      spacing={2}
      sx={{
        py: 3,
        px: 2.5,
      }}
    >
      {/* <Avatar src={user?.photoURL} alt={user?.displayName}>
        {user?.displayName?.charAt(0).toUpperCase()}
      </Avatar> */}

      <Stack direction="column" alignItems="center">
        <Avatar
          alt={userData?.UserProfile?.firstName}
          src={userData?.UserProfile?.userProfileImageDetails?.preview}
        />
        <Typography variant="caption" component="div" noWrap sx={{ color: 'text.secondary' }}>
          {userData?.UserProfile?.firstName || userData?.phone}
        </Typography>
      </Stack>

      <Paper variant="outlined" sx={{ p: 1, flexGrow: 1, bgcolor: 'transparent' }}>
        <InputBase
          fullWidth
          multiline
          rows={2}
          placeholder="Type a message"
          sx={{ px: 1 }}
          onChange={handleCommentChange}
          value={comment}
        />

        <Stack direction="row" alignItems="center">
          <Stack direction="row" flexGrow={1}>
            {/* <IconButton>
              <Iconify icon="solar:gallery-add-bold" />
            </IconButton>

            <IconButton>
              <Iconify icon="eva:attach-2-fill" />
            </IconButton> */}
          </Stack>

          <Button variant="contained" onClick={handleAddCommentInternal}>
            Comment
          </Button>
        </Stack>
      </Paper>
    </Stack>
  );
}

KanbanDetailsCommentInput.propTypes = {
  onAddComment: PropTypes.func.isRequired,
  task: PropTypes.object,
};
