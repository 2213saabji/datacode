import io from 'socket.io-client';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import { useRef, useState, useEffect } from 'react';

import Box from '@mui/material/Box';

import { ATTPL_CHAT_SOCKET_URL } from 'src/config-global';
import { newMsgSound, useGetParticipants } from 'src/api/chatt';

import Scrollbar from 'src/components/scrollbar';
import Lightbox, { useLightBox } from 'src/components/lightbox';

import { useMessagesScroll } from './hooks';
// import useSocket from 'src/hooks/use-socket';
import ChatMessageItem from './chat-message-item';

const SOCKET_URL = `${ATTPL_CHAT_SOCKET_URL}`;

export default function ChatMessageList({ handleSetConnectedUser, messages, userId }) {
  const location = useLocation();
  const [lastMessageRead, setLastMessageRead] = useState(false);
  const conversationId = new URLSearchParams(location.search).get('id');

  const { participants } = useGetParticipants(conversationId);

  const [chatData, setChatData] = useState([]); // Initialize with prop messages
  const socketRef = useRef(null); // Ref for socket connection

  // Using useMessagesScroll hook for scrolling functionality
  const { messagesEndRef } = useMessagesScroll(chatData);

  // Extracting image messages for lightbox slides
  const slides = chatData
    ?.filter((message) => message.type === 'image')
    ?.map((message) => ({ src: message.content }));

  const lightbox = useLightBox(slides);

  const onMessageReceived = (newMessage) => {
    setChatData((prevMessages) => {
      // Check if the new message's conversationId matches the conversationId of the current messages
      if (conversationId !== newMessage.conversationId) {
        return prevMessages;
      }

      // Create a set of existing messageIds
      const messageIdSet = new Set(prevMessages.map((message) => message.messageId));

      // Check if the new messageId is already in the set
      if (!messageIdSet.has(newMessage.messageId)) {
        // If not, add the new message to the chatData

        return [...prevMessages, newMessage];
      }
      // If the messageId already exists, return the previous messages without changes
      return prevMessages;
    });
  };
  if (!socketRef.current) {
    socketRef.current = io(SOCKET_URL);
  }

  const socket = socketRef.current;
  useEffect(() => {
    if (conversationId) {
      socket.emit('userJoined', userId);
      socket.emit('joinGroup', conversationId);
      socket.emit('getConversation', conversationId);

      socket.on('getConversationSuccess', (data) => {
        setChatData(data);
        if (data[data.length - 1]?.isUnread === false) {
          setLastMessageRead(false);
        } else {
          setLastMessageRead(true);
        }

        // console.log(chatData[chatData.length-1])
      });

      socket.on('getConversationError', (error) => {
        console.error('Error fetching conversation:', error);
      });

      socket.on('deleteMessageSuccess', (data) => {
        setChatData((prevChat) => prevChat.filter((chat) => chat.messageId !== data.messageId));
      });
      socket.on('connectedUsers', async ({ users }) => {
        if (users) {
          handleSetConnectedUser(users);
        }
      });
      socket.on('sendMessageSuccess', (data) => {
        onMessageReceived(data);
        socket.emit('messageReceivedSuccess', data);
        socket.emit('markMessageAsRead', {
          messageId: data.messageId,
          isUnread: true,
          lastReadMessageId: data.messageId,
          conversationId: data.conversationId,
          userId: data.senderId,
        });

        if (data.senderId !== userId) {
          newMsgSound();
        }
      });
      socket.on('markMessageAsReadSuccess', (data) => {
        setLastMessageRead(data);
      });
    }

    return () => {
      if (conversationId) {
        socket.emit('leaveConversation', { id: conversationId });
      }
      socket.off('getConversationSuccess');
      socket.off('getConversationError');
      socket.off('sendMessageSuccess');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conversationId, userId, socket]);

  return (
    <>
      <Scrollbar ref={messagesEndRef} sx={{ px: 3, py: 5, height: 1 }}>
        <Box>
          {chatData?.map((message, i) => (
            <ChatMessageItem
              key={i}
              message={message}
              participants={participants}
              onOpenLightbox={() => lightbox.onOpen(message.content)}
              userId={userId}
              lastMessageRead={lastMessageRead}
            />
          ))}
        </Box>
      </Scrollbar>

      <Lightbox
        index={lightbox.selected}
        slides={slides}
        open={lightbox.open}
        close={lightbox.onClose}
      />
    </>
  );
}

ChatMessageList.propTypes = {
  userId: PropTypes.number.isRequired,
  messages: PropTypes.array,
  handleSetConnectedUser: PropTypes.func,
};
