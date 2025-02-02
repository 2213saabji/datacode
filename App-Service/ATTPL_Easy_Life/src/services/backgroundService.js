import store from '../redux/store';

const backgroundTask = async () => {
  // Get the socket from the store
  const state = store.getState();
  const socket = state.chat.socket;

  // Set up event listener
  socket.on('sendMessageSuccess', message => {
    showChatNotification(
      `${message.sender.UserProfile.first_name} ${message.sender.UserProfile.last_name}`,
      message.content,
      message.isGroupChat ? 'group' : 'personal',
    );
  });

  // Keep the task running for a while to receive potential messages
  await new Promise(resolve => setTimeout(resolve, 30000)); // 30 seconds

  // Clean up
  socket.off('sendMessageSuccess');
  BackgroundFetch.finish(BackgroundFetch.FETCH_RESULT_NEW_DATA);
};

BackgroundFetch.configure(
  {
    minimumFetchInterval: 15, // Fetch interval in minutes (minimum is 15)
    stopOnTerminate: false,
    startOnBoot: true,
    enableHeadless: true,
  },
  backgroundTask,
  error => {
    console.log('[BackgroundFetch] Failed to configure:', error);
  },
);

AppRegistry.registerHeadlessTask('RNBackgroundFetch', () => backgroundTask);
