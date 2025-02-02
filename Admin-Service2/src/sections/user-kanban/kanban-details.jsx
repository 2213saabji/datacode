import PropTypes from 'prop-types';
import { useRef, useState, useEffect, useCallback } from 'react';

// import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { Typography } from '@mui/material';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
// import MenuItem from '@mui/material/MenuItem';
// import TextField from '@mui/material/TextField';
// import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';

import { useBoolean } from 'src/hooks/use-boolean';
// ----------------------------------------------------------------------

import { deleter, endpoints } from 'src/utils/axios-kanban';

import { createComment } from 'src/api/kanban';
import { useAuthContext } from 'src/auth/hooks';

// import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import { useSnackbar } from 'src/components/snackbar';
// import CustomPopover, { usePopover } from 'src/components/custom-popover';
import { useDateRangePicker } from 'src/components/custom-date-range-picker';

// import KanbanInputName from './kanban-input-name';
import KanbanDetailsToolbar from './kanban-details-toolbar';
import KanbanContactsDialog from './kanban-contacts-dialog';
import KanbanDetailsPriority from './kanban-details-priority';
import KanbanDetailsAttachments from './kanban-details-attachments';
import KanbanDetailsCommentList from './kanban-details-comment-list';
import KanbanDetailsCommentInput from './kanban-details-comment-input';
// ----------------------------------------------------------------------

const StyledLabel = styled('span')(({ theme }) => ({
  ...theme.typography.caption,
  width: 100,
  flexShrink: 0,
  color: theme.palette.text.secondary,
  fontWeight: theme.typography.fontWeightSemiBold,
}));
export default function KanbanDetails({ task, openDetails, onCloseDetails, onDeleteTask, config }) {
  const { user } = useAuthContext();

  const scrollbarRef = useRef(null);

  const userData = { userName: user?.UserProfile?.firstName, userId: user?.userId };

  const { enqueueSnackbar } = useSnackbar();
  const [assignees, setAssignees] = useState(task.assignee || []);
  // eslint-disable-next-line no-unused-vars
  const [priority, setPriority] = useState(task.priority);

  // eslint-disable-next-line no-unused-vars
  const [taskName, setTaskName] = useState(task.name);

  const [taskStatus, setTaskStatus] = useState(task.status);

  const like = useBoolean();

  const contacts = useBoolean();
  const [allComment, setallComment] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [taskDescription, setTaskDescription] = useState(task.description);

  const rangePicker = useDateRangePicker(task.due[0], task.due[1]);

  useEffect(() => {
    setallComment(task.comments);
  }, [task.comments]);

  // const handleChangeTaskName = useCallback((event) => {
  //   setTaskName(event.target.value);
  // }, []);

  // handle comment
  const handleAddComment = useCallback(
    async (data) => {
      try {
        await createComment(task.id, userData?.userId, data, task.projectId);
        // onCloseDetails();
        enqueueSnackbar('Comment Added!', {
          anchorOrigin: { vertical: 'top', horizontal: 'center' },
        });
      } catch (error) {
        console.error(error);
      }
    },
    [enqueueSnackbar, task, userData?.userId]
  );
  // handle delete comment
  const deleteComment = useCallback(
    async (Id) => {
      const url = `${endpoints.comment.delete}/${Id}`;
      // console.log('check 1');

      try {
        const httpMethod = 'DELETE';
        const headers = {
          method: httpMethod,
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        };

        const response = await deleter(url, headers);
        if (response.success === true) {
          enqueueSnackbar('comment Delete success!', { variant: 'success' });
          setallComment((prevcomments) =>
            prevcomments.filter((comment) => comment.commentId !== Id)
          );
        } else {
          enqueueSnackbar(response.message, { variant: 'error' });
        }
        console.info('API Response:', response);
      } catch (error) {
        console.error('API Error:', error);
        enqueueSnackbar('Failed to delete comment', { variant: 'error' });
      }
    },
    [enqueueSnackbar]
  );
  // Scroll to the bottom when task comments change
  useEffect(() => {
    if (scrollbarRef.current) {
      scrollbarRef.current.scrollTo({ top: scrollbarRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [allComment]);

  const handleChangeStatus = useCallback((newValue) => {
    setTaskStatus(newValue);
  }, []);

  const handleAddAssignees = useCallback((newValue) => {
    setAssignees((prev) => {
      // Check if the new value already exists in the previous state array
      if (!prev.some((item) => item.userId === newValue.userId)) {
        // If it doesn't exist, add the new value to the assignees list
        return [...prev, newValue];
      }
      // If it exists, return the previous state array without adding the new value
      return prev.filter((item) => item.userId !== newValue.userId);
    });
  }, []);

  const renderHead = (
    <KanbanDetailsToolbar
      liked={like.value}
      taskName={task.name}
      onLike={like.onToggle}
      onDelete={onDeleteTask}
      taskStatus={taskStatus}
      onCloseDetails={onCloseDetails}
      onChangeTaskStatus={handleChangeStatus}
      config={config}
    />
  );

  const renderName = <Typography sx={{ fontWeight: 'bold' }}>{taskName}</Typography>;

  const renderReporter = (
    <Stack direction="row" alignItems="center">
      <StyledLabel>Reporter</StyledLabel>
      <Stack direction="column" alignItems="center">
        <Avatar
          alt={task?.reporter?.UserProfile?.firstName}
          src={task?.reporter?.UserProfile?.userProfileImageDetails?.preview}
        />
        <Typography variant="caption" component="div" noWrap sx={{ color: 'text.secondary' }}>
          {task?.reporter?.UserProfile?.firstName || task?.reporter?.phone}
        </Typography>
      </Stack>
    </Stack>
  );

  const renderAssignee = (
    <Stack direction="row">
      <StyledLabel sx={{ height: 40, lineHeight: '40px' }}>Assignee</StyledLabel>

      <Stack direction="row" flexWrap="wrap" alignItems="center" spacing={1}>
        {assignees.map((userr) => (
          <Stack key={userr?.userId} direction="column" alignItems="center">
            <Avatar
              alt={userr?.UserProfile?.firstName}
              src={userr?.UserProfile?.userProfileImageDetails?.preview}
            />
            <Typography variant="caption" component="div" noWrap sx={{ color: 'text.secondary' }}>
              {userr?.UserProfile?.firstName || userr?.phone}
            </Typography>
          </Stack>
        ))}
        {/* 
        <Tooltip title="Add assignee">
          <IconButton
            onClick={contacts.onTrue}
            sx={{
              bgcolor: (theme) => alpha(theme.palette.grey[500], 0.08),
              border: (theme) => `dashed 1px ${theme.palette.divider}`,
            }}
          >
            <Iconify icon="mingcute:add-line" />
          </IconButton>
        </Tooltip> */}

        <KanbanContactsDialog
          assignee={assignees}
          open={contacts.value}
          onClose={contacts.onFalse}
          onAddAssignees={handleAddAssignees}
        />
      </Stack>
    </Stack>
  );

  // const renderLabel = (
  //   <Stack direction="row">
  //     <StyledLabel sx={{ height: 24, lineHeight: '24px' }}>Labels</StyledLabel>

  //     {!!task.labels.length && (
  //       <Stack direction="row" flexWrap="wrap" alignItems="center" spacing={1}>
  //         {task.labels.map((label) => (
  //           <Chip key={label} color="info" label={label} size="small" variant="soft" />
  //         ))}
  //       </Stack>
  //     )}
  //   </Stack>
  // );

  const renderDueDate = (
    <Stack direction="row" alignItems="center">
      <StyledLabel> Due date </StyledLabel>

      {rangePicker.selected ? (
        <Button size="small" onClick={rangePicker.onOpen}>
          {rangePicker.shortLabel}
        </Button>
      ) : (
        <Tooltip title="Add due date">
          {/* <IconButton
            onClick={rangePicker.onOpen}
            sx={{
              bgcolor: (theme) => alpha(theme.palette.grey[500], 0.08),
              border: (theme) => `dashed 1px ${theme.palette.divider}`,
            }}
          >
            <Iconify icon="mingcute:add-line" />
          </IconButton> */}
        </Tooltip>
      )}

      {/* <CustomDateRangePicker
        variant="calendar"
        title="Choose due date"
        startDate={rangePicker.startDate}
        endDate={rangePicker.endDate}
        onChangeStartDate={rangePicker.onChangeStartDate}
        onChangeEndDate={rangePicker.onChangeEndDate}
        open={rangePicker.open}
        onClose={rangePicker.onClose}
        selected={rangePicker.selected}
        error={rangePicker.error}
      /> */}
    </Stack>
  );

  const renderPriority = (
    <Stack direction="row" alignItems="center">
      <StyledLabel>Priority</StyledLabel>

      <KanbanDetailsPriority
        priority={priority}
        // onChangePriority={handleChangePriority}
      />
    </Stack>
  );

  const renderDescription = (
    <Stack direction="row">
      <StyledLabel> Description </StyledLabel>

      <Typography fullWidth multiline size="small" sx={{ typography: 'body2' }}>
        {taskDescription}{' '}
      </Typography>
    </Stack>
  );

  // const renderDependent = (
  //   <Stack direction="row" alignItems="center">
  //     <StyledLabel> Dependent Task </StyledLabel>

  //     {/* <TextField
  //       fullWidth
  //       multiline
  //       size="small"
  //       value={taskDescription}
  //       onChange={handleChangeTaskDescription}
  //       InputProps={{
  //         sx: { typography: 'body2' },
  //       }}
  //     /> */}

  //     <Button
  //       sx={{
  //         width: '26em', // Set the minimum width
  //       }}
  //       size="small"
  //       variant="soft"
  //       endIcon={<Iconify icon="eva:arrow-ios-downward-fill" width={16} sx={{ ml: -0.5 }} />}
  //       onClick={popover.onOpen}
  //       value={dependentTask}
  //     >
  //       {dependentTask}
  //     </Button>
  //   </Stack>
  // );

  const renderAttachments = (
    <Stack direction="row">
      <StyledLabel>Attachments</StyledLabel>
      <KanbanDetailsAttachments attachments={task.attachments} />
    </Stack>
  );

  const renderComments = (
    <KanbanDetailsCommentList comments={allComment} onDeleteComment={deleteComment} />
  );

  return (
    <Drawer
      open={openDetails}
      onClose={onCloseDetails}
      anchor="right"
      slotProps={{
        backdrop: { invisible: true },
      }}
      PaperProps={{
        sx: {
          width: {
            xs: 1,
            sm: 480,
          },
        },
      }}
    >
      {renderHead}

      <Divider />

      <Scrollbar
        ref={scrollbarRef}
        sx={{
          height: 1,
          '& .simplebar-content': {
            height: 1,
            display: 'flex',
            flexDirection: 'column',
          },
        }}
      >
        <Stack
          spacing={3}
          sx={{
            pt: 3,
            pb: 5,
            px: 2.5,
          }}
        >
          {renderName}

          {renderReporter}

          {renderAssignee}

          {/* {renderLabel} */}

          {renderDueDate}

          {renderPriority}

          {renderDescription}

          {/* {renderDependent} */}

          {renderAttachments}
        </Stack>

        {!!task.comments.length && renderComments}
      </Scrollbar>
      {/* 
      <Button
        variant="contained"
        sx={{ width: '70%', mx: 'auto', mt: '2em' }}
        onClick={handleUpdateTask}
      >
        Update
      </Button> */}

      <KanbanDetailsCommentInput onAddComment={handleAddComment} task={task} />
    </Drawer>
  );
}

KanbanDetails.propTypes = {
  onCloseDetails: PropTypes.func,
  onDeleteTask: PropTypes.func,
  openDetails: PropTypes.bool,
  task: PropTypes.object,
  config: PropTypes.object,
};
