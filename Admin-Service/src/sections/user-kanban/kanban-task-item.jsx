import PropTypes from 'prop-types';
// import { Draggable } from '@hello-pangea/dnd';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { styled, useTheme } from '@mui/material/styles';
import AvatarGroup, { avatarGroupClasses } from '@mui/material/AvatarGroup';

import { useBoolean } from 'src/hooks/use-boolean';

// import { bgBlur } from 'src/theme/css';

import Iconify from 'src/components/iconify';

import KanbanDetails from './kanban-details';

// ----------------------------------------------------------------------
const StyledLabel = styled('span')(({ theme }) => ({
  ...theme.typography.caption,
  width: '20%',
  flexShrink: 0,
  color: theme.palette.text.main,
  fontWeight: theme.typography.fontWeightSemiBold,
}));

const StyledContent = styled('span')(({ theme }) => ({
  ...theme.typography.caption,
  width: '80%',
  flexShrink: 0,
  color: theme.palette.text.secondary,
}));

export default function KanbanTaskItem({
  task,
  index,
  onDeleteTask,
  onUpdateTask,
  config,
  sx,
  ...other
}) {
  const theme = useTheme();

  const openDetails = useBoolean();

  const renderPriority = (
    <Iconify
      icon={
        (task.priority === 'low' && 'solar:double-alt-arrow-down-bold-duotone') ||
        (task.priority === 'medium' && 'solar:double-alt-arrow-right-bold-duotone') ||
        'solar:double-alt-arrow-up-bold-duotone'
      }
      sx={{
        position: 'absolute',
        top: 4,
        right: 4,
        ...(task.priority === 'low' && {
          color: 'info.main',
        }),
        ...(task.priority === 'medium' && {
          color: 'warning.main',
        }),
        ...(task.priority === 'high' && {
          color: 'error.main',
        }),
      }}
    />
  );

  const renderImg = (
    <Box
      sx={{
        p: theme.spacing(1, 1, 0, 1),
      }}
    >
      <Box
        component="img"
        alt={task.attachments[0]}
        src={task.attachments[0]}
        sx={{
          borderRadius: 1.5,
          ...(openDetails.value && {
            opacity: 0.8,
          }),
        }}
      />
    </Box>
  );

  const renderInfo = (
    <Stack>
      <Stack direction="row" alignItems="center">
        <Stack
          flexGrow={1}
          direction="row"
          alignItems="center"
          sx={{
            typography: 'caption',
            color: 'text.disabled',
          }}
        >
          <Iconify width={16} icon="solar:chat-round-dots-bold" sx={{ mr: 0.25 }} />
          <Box component="span" sx={{ mr: 1 }}>
            {task.comments.length}
          </Box>

          <Iconify width={16} icon="eva:attach-2-fill" sx={{ mr: 0.25 }} />
          <Box component="span">{task.attachments.length}</Box>
        </Stack>

        <AvatarGroup
          sx={{
            [`& .${avatarGroupClasses.avatar}`]: {
              width: 24,
              height: 24,
            },
          }}
        >
          {task.assignee.map((user) => (
            // <Avatar key={user.userId} alt={user.userName} src={user.profile?.userProfileImageUrl} />
            <Avatar
              key={user.userId}
              alt={user.userName}
              src={user.UserProfile?.userProfileImageDetails?.preview}
            />
          ))}
        </AvatarGroup>
      </Stack>

      <Stack sx={{ display: 'flex', flexDirection: 'row', mt: 1 }}>
        <StyledLabel>Status:</StyledLabel>
        <StyledContent>{task.status}</StyledContent>
      </Stack>
      {/* <AvatarGroup
        sx={{
          [`& .${avatarGroupClasses.avatar}`]: {
            width: 24,
            height: 24,
          },
        }}
      >
        {task.assignee.map((user) => (
          <Avatar key={user.userId} alt={user.userName} src={user.UserProfile?.userProfileImageDetails?.preview} />
        ))}
      </AvatarGroup> */}
    </Stack>
  );

  return (
    <>
      <Paper
        onClick={openDetails.onTrue}
        sx={{
          width: 1,
          borderRadius: 1.5,
          overflow: 'hidden',
          position: 'relative',
          bgcolor: 'background.default',
          boxShadow: theme.customShadows.z1,
          '&:hover': {
            boxShadow: theme.customShadows.z20,
          },
          ...(openDetails.value && {
            boxShadow: theme.customShadows.z20,
          }),

          ...sx,
        }}
        {...other}
      >
        {!!task.attachments.length && renderImg}

        <Stack spacing={2} sx={{ px: 2, py: 2.5, position: 'relative' }}>
          {renderPriority}

          <Typography variant="subtitle2">{task.name}</Typography>

          {renderInfo}
        </Stack>
      </Paper>
      {/* )}
      </Draggable> */}

      <KanbanDetails
        task={task}
        openDetails={openDetails.value}
        onCloseDetails={openDetails.onFalse}
        onUpdateTask={onUpdateTask}
        onDeleteTask={onDeleteTask}
        config={config}
      />
    </>
  );
}

KanbanTaskItem.propTypes = {
  index: PropTypes.number,
  onDeleteTask: PropTypes.func,
  onUpdateTask: PropTypes.func,
  sx: PropTypes.object,
  task: PropTypes.object,
  config: PropTypes.object,
};
