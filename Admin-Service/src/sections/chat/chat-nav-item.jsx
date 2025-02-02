import io from 'socket.io-client';
import PropTypes from 'prop-types';
// import { formatDistanceToNowStrict } from 'date-fns';
import { useRef, useEffect, useCallback } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import AvatarGroup from '@mui/material/AvatarGroup';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useResponsive } from 'src/hooks/use-responsive';

import { useGetChat } from 'src/api/chatt';
// import { clickConversation } from 'src/api/chat';
import { useGetUserByUserId } from 'src/api/user';
import { ATTPL_CHAT_SOCKET_URL } from 'src/config-global';

import { useGetNavItem } from './hooks';
// ----------------------------------------------------------------------

const SOCKET_URL = `${ATTPL_CHAT_SOCKET_URL}`;
export default function ChatNavItem({
  selected,
  collapse,
  conversation,
  onCloseMobile,
  userId,
  connectedUsers,
}) {
  const socketRef = useRef(null);
  const { schat } = useGetChat(conversation.conversationId);

  const sortedUserIdsArray = conversation.conversationDetail.sortedUserIds.split(',');

  const id = sortedUserIdsArray?.find((e) => e !== userId);
  const { user } = useGetUserByUserId(id);

  const isOnline =
    connectedUsers &&
    connectedUsers.length > 0 &&
    connectedUsers.filter((connUser) => connUser?.userId === user?.data?.userId).length > 0;
  useEffect(() => {
    if (!socketRef.current) {
      socketRef.current = io(SOCKET_URL);
    }

    const socket = socketRef.current;
    socket.on('getConversationSuccess', (data) => {
      // setChatData(data);
      // console.log(chatData[chatData.length-1])
    });
    socket.emit('getLastMessage', conversation.conversationId);
  }, [conversation.conversationId]);

  const senderNamesExceptCurrentU = schat?.data
    ?.filter((item) => item?.sender?.userId !== userId)
    .map((item) => item);

  const secondaryContent =
    senderNamesExceptCurrentU?.length > 1
      ? senderNamesExceptCurrentU[senderNamesExceptCurrentU.length - 1]?.content
      : 'text';

  const mdUp = useResponsive('up', 'md');

  const router = useRouter();

  const { group, displayName, participants } = useGetNavItem({
    conversation,
    currentUserId: `${userId}`,
  });

  const singleParticipant = participants[0];

  const avatarUrl = singleParticipant?.User?.UserProfile?.user_profile_image_details?.preview;
  const namee = `${singleParticipant?.User?.UserProfile?.first_name || singleParticipant?.User?.phone} ${(singleParticipant?.User?.UserProfile?.first_name && singleParticipant?.User?.UserProfile?.last_name) || ''} `;

  // ?.
  // UserProfile
  // ?.userProfileImageDetails?.preview;
  //  console.log(user)

  // const status = 'offline';
  // const { name, avatarUrl, status } = singleParticipant;

  const handleClickConversation = useCallback(async () => {
    try {
      if (!mdUp) {
        onCloseMobile();
      }

      router.push(`${paths.dashboard.chat}?id=${conversation.conversationId}`);

      // router.push(`${paths.dashboard.chat}/${}`);
    } catch (error) {
      console.error(error);
    }
  }, [conversation.conversationId, mdUp, onCloseMobile, router]);

  const renderGroup = (
    <Badge
      // variant={hasOnlineInGroup ? 'online' : 'invisible'}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    >
      <AvatarGroup variant="compact" sx={{ width: 48, height: 48 }}>
        {participants.slice(0, 2).map((participant) => (
          <Avatar
            key={participant.userId}
            alt={participant?.User?.phone}
            src={participant?.User?.UserProfile?.user_profile_image_details?.preview}
          />
        ))}
      </AvatarGroup>
    </Badge>
  );

  const renderSingle = (
    <Badge
      key={isOnline ? 'online' : 'offline'}
      variant={isOnline ? 'online' : 'offline'}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    >
      <Avatar alt={namee} src={avatarUrl} sx={{ width: 48, height: 48 }} />
    </Badge>
  );

  return (
    <ListItemButton
      disableGutters
      onClick={handleClickConversation}
      sx={{
        py: 1.5,
        px: 2.5,
        ...(selected && {
          bgcolor: 'action.selected',
        }),
      }}
    >
      <Badge
        color="error"
        overlap="circular"
        badgeContent={collapse ? conversation.unreadCount : 0}
      >
        {group ? renderGroup : renderSingle}
      </Badge>

      {!collapse && (
        <>
          <ListItemText
            sx={{ ml: 2 }}
            primary={displayName}
            primaryTypographyProps={{
              noWrap: true,
              variant: 'subtitle2',
            }}
            secondary={secondaryContent}
            secondaryTypographyProps={{
              noWrap: true,
              component: 'span',
              // variant: conversation.unreadCount ? 'subtitle2' : 'body2',
              // color: conversation.unreadCount ? 'text.primary' : 'text.secondary',
            }}
          />

          <Stack alignItems="flex-end" sx={{ ml: 2, height: 44 }}>
            <Typography
              noWrap
              variant="body2"
              component="span"
              sx={{
                mb: 1.5,
                fontSize: 12,
                color: 'text.disabled',
              }}
            >
              {/* {formatDistanceToNowStrict(new Date(lastActivity), {
                addSuffix: false,
              })} */}
            </Typography>

            {!!conversation.unreadCount && (
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  bgcolor: 'info.main',
                  borderRadius: '50%',
                }}
              />
            )}
          </Stack>
        </>
      )}
    </ListItemButton>
  );
}

ChatNavItem.propTypes = {
  userId: PropTypes.number.isRequired,
  collapse: PropTypes.bool,
  conversation: PropTypes.object,
  onCloseMobile: PropTypes.func,
  selected: PropTypes.bool,
  connectedUsers: PropTypes.array,
};
