import { useGetParticipants } from 'src/api/chatt';

// ----------------------------------------------------------------------

export default function useGetNavItem({ currentUserId, conversation }) {
  const { conversationId } = conversation;

  const { participants } = useGetParticipants(conversationId);

  const participantList =
    participants && participants.data && participants.data.ConversationUserConversations
      ? participants.data.ConversationUserConversations
      : [];

  const participantsInConversation = participantList.filter(
    (participant) => participant.userId !== parseInt(currentUserId, 10)
  );

  // const lastMessage = messages[messages.length - 1];

  const group = participantsInConversation.length > 1;

  const displayName = participantsInConversation
    .map(
      (participant) =>
        `${participant?.User?.UserProfile?.first_name || participant?.User?.phone} ${participant?.User?.UserProfile?.last_name || ''}`
    )
    .join(', ');

  // const hasOnlineInGroup = group
  //   ? participantsInConversation.map((item) => item.status).includes('online')
  //   : false;

  // let displayText = '';

  // if (lastMessage) {
  //   const sender = lastMessage.senderId === currentUserId ? 'You: ' : '';

  //   const message = lastMessage.contentType === 'image' ? 'Sent a photo' : lastMessage.body;

  //   displayText = `${sender}${message}`;
  // }

  return {
    group,
    displayName,
    // displayText,
    participants: participantsInConversation,
    // lastActivity: lastMessage.createdAt,
    // hasOnlineInGroup,
  };
}
