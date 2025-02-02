import React, {useRef, useState} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/Ionicons';

const {width, height} = Dimensions.get('window');

const VideoPlayer = ({item}) => {
  const videoRef = useRef(null);
  const [isBuffering, setIsBuffering] = useState(false);
  const [isPaused, setIsPaused] = useState(true); // Start in paused state
  const [isFullscreen, setIsFullscreen] = useState(false); // Track fullscreen state

  const onBuffer = () => setIsBuffering(true);
  const onReadyForDisplay = () => setIsBuffering(false);
  const togglePlayPause = () => {
    setIsPaused(!isPaused);
    setIsBuffering(true);

    // Toggle fullscreen mode when playing
    if (isPaused) {
      setIsFullscreen(true);
    }
  };

  const exitFullscreen = () => {
    setIsPaused(true);
    setIsFullscreen(false);
  };

  return (
    <View style={styles.container}>
      {isBuffering && (
        <View style={styles.bufferingIndicator}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      )}
      <TouchableOpacity onPress={togglePlayPause} style={styles.videoWrapper}>
        <Video
          source={{uri: item.content}}
          style={
            isFullscreen ? styles.fullscreenVideoPlayer : styles.videoPlayer
          }
          controls={false}
          fullscreen={isFullscreen}
          resizeMode={isFullscreen ? 'contain' : 'cover'}
          paused={isPaused}
          ref={videoRef}
          onBuffer={onBuffer}
          onReadyForDisplay={onReadyForDisplay}
          onLoad={() => setIsBuffering(false)}
        />
        {isPaused && (
          <View style={styles.playIconContainer}>
            <Icon
              name="play-circle"
              size={70}
              color="rgba(255, 255, 255, 0.8)"
            />
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  videoWrapper: {
    width: '100%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoPlayer: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  fullscreenVideoPlayer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  bufferingIndicator: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  playIconContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  exitFullscreenButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 3,
  },
});

export default VideoPlayer;
