import SoundPlayer from 'react-native-sound-player'; // Import react-native-sound-player

export const playSendSound = () => {
  try {
    // Play the sound file from the assets folder
    SoundPlayer.playAsset(require('./send.mp3'));
  } catch (e) {
    console.log('Cannot play the send sound file', e);
  }
};

export const playReceiveSound = () => {
  try {
    // Play the sound file from the assets folder
    SoundPlayer.playAsset(require('./receive.mp3'));
  } catch (e) {
    console.log('Cannot play the receive sound file', e);
  }
};
