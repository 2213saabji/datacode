import PushNotification from 'react-native-push-notification';

// Theme colors
const COLORS = {
  primary: '#F1CB41',
  accent: '#FFD166',
  text: '#543310',
  secondary: '#FF6B6B',
  info: '#17A2B8',
};

// Create the notification channel
PushNotification.createChannel(
  {
    channelId: 'golden-chat-channel',
    channelName: 'Golden Chat Whispers',
    channelDescription: 'Notifications for your enchanting conversations',
    soundName: 'send.mp3',
    importance: 4,
    vibrate: true,
  },
  created =>
    console.log(
      `Golden Chat channel creation ${created ? 'succeeded' : 'failed'}`,
    ),
);

// Function to show a chat notification
export const showChatNotification = (
  sender,
  message,
  chatType = 'personal',
  options = {},
) => {
  let title, bigText, color;

  switch (chatType) {
    case 'personal':
      title = `💌 Message from ${sender}`;
      bigText = `${sender} says: "${message}"\n\nTap to respond and keep the golden conversation flowing!`;
      color = COLORS.primary;
      break;
    case 'group':
      title = `👥 New in ${sender}`;
      bigText = `${
        options.senderName || 'Someone'
      } in ${sender}: "${message}"\n\nJoin the lively discussion in your group!`;
      color = COLORS.accent;
      break;
    case 'channel':
      title = `📢 Update in ${sender}`;
      bigText = `${sender} Channel: "${message}"\n\nStay informed with the latest golden updates!`;
      color = COLORS.info;
      break;
    default:
      title = `✨ New Message`;
      bigText = `You have a new message: "${message}"\n\nDiscover what awaits in your inbox!`;
      color = COLORS.secondary;
  }

  PushNotification.localNotification({
    channelId: 'golden-chat-channel',
    title: title,
    message: truncateMessage(message, 50), // Truncate long messages for the short view
    bigText: bigText,
    color: color,
    playSound: true,
    vibrate: true,
    soundName: 'send.mp3',
    largeIcon: 'ic_launcher', // use your app icon name here
    smallIcon: 'ic_notification', // use your small icon name here
    ...options,
  });
};

// Helper function to truncate long messages
const truncateMessage = (message, maxLength) => {
  return message.length > maxLength
    ? message.substring(0, maxLength - 3) + '...'
    : message;
};

// Function to show a custom chat notification
export const showCustomChatNotification = (title, message, options = {}) => {
  PushNotification.localNotification({
    channelId: 'golden-chat-channel',
    title: `✨ ${title}`,
    message: truncateMessage(message, 50),
    bigText:
      options.bigText ||
      `${message}\n\nLet the golden whispers of conversation guide you!`,
    color: options.color || COLORS.primary,
    playSound: true,
    vibrate: true,
    soundName: 'send.mp3',
    largeIcon: 'ic_launcher', // use your app icon name here
    smallIcon: 'ic_notification', // use your small icon name here
    ...options,
  });
};
