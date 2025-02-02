// ----------------------------------------------------------------------

export default function useGetMessage({ message, currentUserId }) {
  // const sender = participants?.find((participant) => participant.id === message.senderId);

  // const senderDetails =
  //   message.senderId === currentUserId
  //     ? {
  //         type: 'me',
  //       }
  //     : {
  //         avatarUrl: sender?.avatarUrl,
  //         firstName: sender?.name.split(' ')[0],
  //       };

  // const me = senderDetails.type === 'me';

  const hasImage = message.type === 'image';
  const hasAudio = message.type === 'audio';
  const hasText = message.type === 'text';
  const hasDock = message.type === 'dock';
  return {
    hasAudio,
    hasImage,
    // me,
    // senderDetails,
    hasText,
    hasDock,
  };
}
