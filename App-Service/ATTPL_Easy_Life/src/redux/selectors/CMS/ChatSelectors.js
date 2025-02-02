import {createSelector} from '@reduxjs/toolkit';

export const selectChatState = state => state.chat;
export const selectConversations = state => state.chat.conversations;
export const selectMessages = state => state.chat.messages;
export const selectConnectedUsers = state => state.chat.connectedUsers;
export const selectSelectedConversationId = state =>
  state.chat.selectedConversationId;
export const selectChatLoading = state => state.chat.loading;
export const selectChatError = state => state.chat.error;
export const selectSocket = state => state.chat.socket;

export const selectSelectedConversation = createSelector(
  [selectConversations, selectSelectedConversationId],
  (conversations, selectedId) =>
    conversations.find(
      conv => conv.conversationDetail.conversationId === selectedId,
    ),
);

export const selectSelectedConversationMessages = createSelector(
  [selectConversations, selectSelectedConversationId],
  (conversations, selectedId) => {
    const conversation = conversations.find(
      conv => conv.conversationDetail.conversationId === selectedId,
    );
    return conversation ? conversation.conversationDetail.messageDetails : [];
  },
);

export const selectConversationById = createSelector(
  [selectConversations, (state, conversationId) => conversationId],
  (conversations, conversationId) =>
    conversations.find(
      conv => conv.conversationDetail.conversationId === conversationId,
    ),
);

export const selectUnreadMessageCountByConversation = createSelector(
  [selectConversations],
  conversations =>
    conversations.reduce((acc, conv) => {
      const conversationMessages =
        conv.conversationDetail?.messageDetails || [];

      const unreadCount = conversationMessages.filter(
        msg => !msg.isUnread,
      ).length;
      return {...acc, [conv.conversationDetail?.conversationId]: unreadCount};
    }, {}),
);

export const selectTotalUnreadMessageCount = createSelector(
  [selectUnreadMessageCountByConversation],
  unreadCounts =>
    Object.values(unreadCounts).reduce((sum, count) => sum + count, 0),
);

export const selectLastMessageByConversation = createSelector(
  [selectConversations],
  conversations =>
    conversations.reduce((acc, conv) => {
      const conversationMessages =
        conv?.conversationDetail?.messageDetails || [];
      const lastMessage = conversationMessages[conversationMessages.length - 1];

      let messageContent = '';
      if (lastMessage) {
        switch (lastMessage.type) {
          case 'text':
            messageContent = lastMessage.content;
            break;
          case 'image':
            messageContent = '📷 Image';
            break;
          case 'audio':
            messageContent = '🎵 Audio';
            break;
          case 'video':
            messageContent = '🎥 Video';
            break;
          case 'file':
            messageContent = '📎 File';
            break;
          case 'location':
            messageContent = '📍 Location';
            break;
          default:
            messageContent = 'Unknown message type';
        }
      }

      const formattedLastMessage = lastMessage
        ? {...lastMessage, content: messageContent}
        : null;

      return {
        ...acc,
        [conv?.conversationDetail?.conversationId]: formattedLastMessage,
      };
    }, {}),
);

export const selectMessagesByConversationId = createSelector(
  [
    state => state.chat.conversations,
    (state, conversationId) => conversationId,
  ],
  (conversations, conversationId) => {
    const conversation = conversations.find(
      conv => conv.conversationDetail.conversationId === conversationId,
    );
    return conversation ? conversation.conversationDetail.messageDetails : [];
  },
);

export const selectConversationParticipants = state =>
  state.chat.conversationParticipants;

export const selectIsUserOnline = createSelector(
  [selectConnectedUsers, (state, userId) => userId],
  connectedUsers => {
    return connectedUsers;
  },
);
