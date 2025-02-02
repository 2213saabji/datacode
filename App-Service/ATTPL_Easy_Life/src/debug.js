import {DevSettings, NativeModules} from 'react-native';

/**
 * Adds custom debug menu items to the React Native developer menu.
 */
const addDebugMenuItems = () => {
  const messages = {
    stop: 'Stop Debugging',
    debug: 'Debug JS Remotely',
  };

  DevSettings.addMenuItem(messages.debug, () => {
    NativeModules.DevSettings.setIsDebuggingRemotely(true);
    console.log('Remote Debugging Enabled');
  });

  DevSettings.addMenuItem(messages.stop, () => {
    NativeModules.DevSettings.setIsDebuggingRemotely(false);
    console.log('Remote Debugging Disabled');
  });
};

/**
 * Initializes custom debugging options with a delay to ensure DevSettings is available.
 */
export const enableDebugging = () => {
  setTimeout(addDebugMenuItems, 100);
};
