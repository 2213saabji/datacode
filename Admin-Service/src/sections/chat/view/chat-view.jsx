// import { useLocation } from 'react-router-dom';
import io from 'socket.io-client';
import { useRef, useState, useEffect, useCallback } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { useSearchParams } from 'src/routes/hooks';

import { useGetUsers } from 'src/api/user';
import { useAuthContext } from 'src/auth/hooks';
import { useGetParticipants } from 'src/api/chatt';
import { ATTPL_CHAT_SOCKET_URL } from 'src/config-global';

import { useSettingsContext } from 'src/components/settings';

import ChatNav from '../chat-nav';
import ChatRoom from '../chat-room';
import ChatMessageList from '../chat-message-list';
import ChatMessageInput from '../chat-message-input';
import ChatHeaderDetail from '../chat-header-detail';
import ChatHeaderCompose from '../chat-header-compose';

const SOCKET_URL = `${ATTPL_CHAT_SOCKET_URL}`;

// ----------------------------------------------------------------------

export default function ChatView() {
  const { user } = useAuthContext();

  const { users: roleList } = useGetUsers(user.accessToken);

  const roleListArr = roleList?.data || [];
  const data = roleListArr?.filter((role) => role.userId !== user.userId);

  const settings = useSettingsContext();

  const searchParams = useSearchParams();

  const [connectedUsers, setConnectedUsers] = useState([]);

  const selectedConversationId = searchParams.get('id') || '';

  const [recipients, setRecipients] = useState([]);

  const { participants: participantList } = useGetParticipants(selectedConversationId);

  const conversationCreatedBy =
    participantList && participantList.data && participantList.data.createdBy
      ? participantList.data.createdBy
      : null;

  const participantListArr =
    participantList && participantList.data && participantList.data.ConversationUserConversations
      ? participantList.data.ConversationUserConversations
      : [];
  const currChatType =
    participantList && participantList.data && participantList.data.type
      ? participantList.data.type
      : '';

  const socketRef = useRef(null);
  if (!socketRef.current) {
    socketRef.current = io(SOCKET_URL);
  }

  const [conversation, setConversation] = useState([]);
  useEffect(() => {
    const socket = socketRef.current;
    socket.emit('getRecentConversation', user.userId);
    socket.on('getRecentConversationSuccess', (conversationInfo) => {
      setConversation(conversationInfo);
    });
  }, [user.userId, selectedConversationId]);

  const conversationData = conversation;

  const participants = participantListArr
    ? participantListArr.filter((participant) => participant.userId !== user.userId)
    : [];

  const handleSetConnectedUser = (connUsers) => {
    setConnectedUsers((prevUser) => [...prevUser, ...connUsers]);
  };

  const handleAddRecipients = useCallback((selected) => {
    setRecipients(selected);
  }, []);

  const details = !!selectedConversationId;

  const renderHead = (
    <Stack
      direction="row"
      alignItems="center"
      flexShrink={0}
      sx={{ pr: 1, pl: 2.5, py: 1, minHeight: 72 }}
    >
      {selectedConversationId ? (
        <>
          {details && (
            <ChatHeaderDetail
              participants={participants}
              userId={user.userId}
              conversation={conversationData}
            />
          )}
        </>
      ) : (
        <ChatHeaderCompose onAddRecipients={handleAddRecipients} />
      )}
    </Stack>
  );

  const renderNav = (
    <ChatNav
      contacts={conversationData}
      data={data}
      connectedUsers={connectedUsers}
      // loading={conversationLoading}
      selectedConversationId={selectedConversationId}
      userId={user.userId}
    />
  );

  const renderMessages = (
    <Stack
      sx={{
        width: 1,
        height: 1,
        overflow: 'hidden',
      }}
    >
      {(selectedConversationId && (
        <ChatMessageList
          handleSetConnectedUser={handleSetConnectedUser}
          messages={conversationData?.messages}
          // participants={participants}
          userId={user.userId}
        />
      )) || <div style={{ height: '100%' }} />}

      <ChatMessageInput
        recipients={recipients}
        onAddRecipients={handleAddRecipients}
        userId={user.userId}
        currChatType={currChatType}
        //
        selectedConversationId={selectedConversationId}
        disabled={!recipients?.length && !selectedConversationId}
      />
    </Stack>
  );

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Typography
        variant="h4"
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      >
        CHAT
      </Typography>

      <Stack component={Card} direction="row" sx={{ height: '72vh' }}>
        {renderNav}

        <Stack
          sx={{
            width: 1,
            height: 1,
            overflow: 'hidden',
          }}
        >
          {renderHead}

          <Stack
            direction="row"
            sx={{
              width: 1,
              height: 1,
              overflow: 'hidden',
              borderTop: (theme) => `solid 1px ${theme.palette.divider}`,
            }}
          >
            {renderMessages}

            {details && (
              <ChatRoom
                conversation={conversationData}
                conversationCreatedBy={conversationCreatedBy}
                participants={participantListArr}
                userId={user.userId}
              />
            )}
          </Stack>
        </Stack>
      </Stack>
    </Container>
  );
}
