import PropTypes from 'prop-types';
// import { enqueueSnackbar } from 'notistack';
import { useState, useCallback } from 'react';

import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
import { IconButton } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import InputBase, { inputBaseClasses } from '@mui/material/InputBase';

import { fToNow } from 'src/utils/format-time';

import { editComment } from 'src/api/kanban';

// import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
import Lightbox from 'src/components/lightbox';
import { useSnackbar } from 'src/components/snackbar'; //  useLightBox
import { useAuthContext } from 'src/auth/hooks';

import CustomPopover, { usePopover } from 'src/components/custom-popover';

// ----------------------------------------------------------------------

export default function KanbanDetailsCommentListMessage({
  comment,
  onDeleteComment,
  lightbox,
  slides,
}) {
  const { user } = useAuthContext();
  const popover = usePopover();
  const { enqueueSnackbar } = useSnackbar();

  const [selectedComment, setSelectedComment] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null); // To keep track of the anchor element for the popover
  const [editstatus, setEditStatus] = useState(false);
  const [message, setMessage] = useState(comment.message);
  const [editmessage, setEditMessage] = useState(message);

  const handleChangeName = useCallback((event) => {
    setEditMessage(event.target.value);
  }, []);

  //   const handleKeyUpAddTask = useCallback(
  //     (event) => {
  //       if (event.key === 'Enter') {
  //         if (message) {
  //           // function for edit
  //         }
  //       }
  //     },
  //     [message]
  //   );

  const onUpdateMessage = useCallback(async () => {
    try {
      const response = await editComment(editmessage, comment.commentId);
      if (response.status === 200) {
        setMessage(editmessage);
        setEditStatus(false);
      }
    } catch (error) {
      console.error('API Error:', error);
      enqueueSnackbar('Error while Update Comment', { variant: 'error' });
    }
  }, [editmessage, comment, enqueueSnackbar]);
  return (
    <>
      <Stack key={comment.commentId} direction="row" spacing={2}>
        <Stack direction="column" alignItems="center">
          <Avatar
            alt={comment?.user?.UserProfile?.firstName}
            src={comment?.user?.UserProfile?.userProfileImageDetails?.preview}
          />
          {/* <Avatar alt={task.reporter.userName} src={task.reporter.avatarUrl} /> */}
        </Stack>
        <Stack
          spacing={comment.messageType === 'image' ? 1 : 0.5}
          flexGrow={1}
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ mb: 2, flexShrink: 1, minWidth: 0 }}
        >
          <Stack spacing={comment.messageType === 'image' ? 1 : 0.5} flexGrow={1}>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Typography variant="subtitle2"> {comment.name}</Typography>
              <Typography variant="caption" sx={{ color: 'text.disabled' }}>
                {fToNow(comment.createdAt)}
              </Typography>
            </Stack>

            {editstatus ? (
              <Paper
                sx={{
                  display: 'flex',
                  direction: 'row',
                  borderRadius: 1.5,
                  border: '1px solid black',
                  bgcolor: 'background.default',
                  boxShadow: (theme) => theme.customShadows.z1,
                }}
              >
                <InputBase
                  autoFocus
                  multiline
                  fullWidth
                  placeholder="Edit message"
                  value={editmessage}
                  onChange={handleChangeName}
                  //   onKeyUp={handleKeyUpAddTask}
                  sx={{
                    px: 2,
                    minHeight: 45,
                    [`& .${inputBaseClasses.input}`]: {
                      typography: 'subtitle2',
                    },
                  }}
                />

                <Paper
                  sx={{
                    my: 'auto',
                    mr: 1,
                    p: 0.5,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    background: '#feab98',
                    borderRadius: '50px',
                  }}
                  onClick={() => setEditStatus(false)}
                >
                  <ClearIcon
                    sx={{
                      color: 'white',
                      '&:hover': {
                        color: 'lightgrey', // Change color on hover
                        cursor: 'pointer', // Change cursor to pointer on hover
                      },
                      '&:active': {
                        color: 'grey', // Change color on click
                        transform: 'scale(0.95)', // Slightly scale down on click for a "click" effect
                      },
                    }}
                  />
                </Paper>
                <Paper
                  sx={{
                    my: 'auto',
                    mr: 1,
                    p: 0.5,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    background: '#74ccbc',
                    borderRadius: '50px',
                  }}
                  onClick={onUpdateMessage}
                >
                  <CheckIcon
                    sx={{
                      color: 'white',
                      '&:hover': {
                        color: 'lightgrey', // Change color on hover
                        cursor: 'pointer', // Change cursor to pointer on hover
                      },
                      '&:active': {
                        color: 'grey', // Change color on click
                        transform: 'scale(0.95)', // Slightly scale down on click for a "click" effect
                      },
                    }}
                  />
                </Paper>
              </Paper>
            ) : (
              <Stack sx={{ marginTop: '-4px' }}>
                <Typography
                  variant="caption"
                  component="div"
                  noWrap
                  sx={{ color: 'text.secondary' }}
                >
                  {comment.user?.UserProfile?.firstName}
                </Typography>
                <Typography variant="body2" sx={{ wordBreak: 'break-word' }}>
                  {message}
                </Typography>
              </Stack>
            )}
          </Stack>
          {comment?.userId === user?.userId && (
            <IconButton
              color={popover.open ? 'inherit' : 'default'}
              onClick={(event) => {
                setSelectedComment(comment);
                setAnchorEl(event.currentTarget); // Set the anchor element
                popover.onOpen(event);
              }}
            >
              <Iconify icon="eva:more-horizontal-fill" />
            </IconButton>
          )}
        </Stack>
      </Stack>
      <CustomPopover
        open={popover.open}
        onClose={() => {
          popover.onClose();
          setAnchorEl(null); // Clear the anchor element when closing
        }}
        anchorEl={anchorEl}
        arrow="bottom-center"
        sx={{ width: 140 }}
      >
        <MenuItem
          onClick={() => {
            if (selectedComment) {
              onDeleteComment(comment.commentId);
              popover.onClose();
            }
          }}
          sx={{ color: 'error.main' }}
        >
          <Iconify icon="solar:trash-bin-trash-bold" />
          Delete
        </MenuItem>
        <MenuItem
          onClick={() => {
            // updateValues("Update",index,project)
            setEditStatus(true);
            popover.onClose();
          }}
        >
          <Iconify icon="solar:pen-bold" />
          Edit
        </MenuItem>
      </CustomPopover>
      <Lightbox
        index={lightbox.selected}
        slides={slides}
        open={lightbox.open}
        close={lightbox.onClose}
      />
    </>
  );
}

KanbanDetailsCommentListMessage.propTypes = {
  comment: PropTypes.object,
  onDeleteComment: PropTypes.func,
  lightbox: PropTypes.func,
  slides: PropTypes.array,
};
