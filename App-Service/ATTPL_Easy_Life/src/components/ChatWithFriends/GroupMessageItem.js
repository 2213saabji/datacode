import React, {useState, useEffect, useCallback, useMemo} from 'react';
import {
  View,
  Animated,
  PanResponder,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {Text, IconButton, Avatar} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import Video from 'react-native-video';
import Sound from 'react-native-sound';
import ApiCaller from '../../services/ApiCaller';
import VideoPlayer from './VideoPlayer';

const {width: SCREEN_WIDTH} = Dimensions.get('window');

const fetchUserData = async userId => {
  try {
    const response = await ApiCaller.get(
      `/user/profile/fetch/${userId}`,
      'ums',
    );

    if (response.status !== 200) throw new Error('Failed to fetch user data');
    const userData = await response.data;
    return userData.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const GroupMessageItem = React.memo(
  ({
    item,
    userId,
    colors,
    fonts,
    handleReply,
    showAvatar,
    participants,
    onDeleteMessage,
  }) => {
    const [scaleValue] = useState(new Animated.Value(0));
    const [senderData, setSenderData] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [sound, setSound] = useState(null);
    const [duration, setDuration] = useState(0);
    const [progress, setProgress] = useState(0);

    const isSentByUser = useMemo(
      () => item.senderId === userId,
      [item.senderId, userId],
    );
    const [showDeleteOption, setShowDeleteOption] = useState(false);
    const messageTime = useMemo(
      () =>
        new Date(item.created_at).toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
      [item.created_at],
    );

    useEffect(() => {
      Animated.spring(scaleValue, {
        toValue: 1,
        friction: 5,
        tension: 40,
        useNativeDriver: true,
      }).start();

      const loadSenderData = async () => {
        const data = await fetchUserData(item.senderId);
        setSenderData(data);
      };
      loadSenderData();

      // Initialize audio if the message type is audio
      if (item.type === 'audio') {
        const audio = new Sound(item.content, '', error => {
          if (error) {
            console.log('failed to load the sound', error);
            return;
          }
          setSound(audio);
          setDuration(audio.getDuration());
        });
      }

      // Cleanup
      return () => {
        if (sound) {
          sound.release();
        }
      };
    }, [item.senderId, scaleValue, item.type, item.content]);

    const handleLongPress = useCallback(() => {
      if (isSentByUser) {
        setShowDeleteOption(true);
      }
    }, [isSentByUser]);

    const handleDelete = useCallback(() => {
      onDeleteMessage(item);
      setShowDeleteOption(false);
    }, [item, onDeleteMessage]);

    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderRelease: (evt, gestureState) => {
        if (Math.abs(gestureState.dx) > 50) {
          handleReply(item);
        }
      },
    });

    const toggleAudioPlayback = useCallback(() => {
      if (sound) {
        if (isPlaying) {
          sound.pause(() => setIsPlaying(false));
        } else {
          setIsPlaying(true);
          sound.play(success => {
            if (success) {
              setIsPlaying(false);
              setProgress(0);
            } else {
              console.log('playback failed due to audio decoding errors');
            }
          });
        }
      }
    }, [sound, isPlaying]);

    useEffect(() => {
      let interval;
      if (isPlaying) {
        interval = setInterval(() => {
          if (sound) {
            sound.getCurrentTime(seconds => {
              setProgress(seconds / duration);
            });
          }
        }, 100);
      } else {
        if (interval) {
          clearInterval(interval);
        }
      }
      return () => {
        if (interval) {
          clearInterval(interval);
        }
      };
    }, [isPlaying, sound, duration]);
    const handleLocationPress = useCallback(() => {
      if (item.type === 'location' && item.content) {
        try {
          const locationData = JSON.parse(item.content);
          const {latitude, longitude} = locationData;

          const scheme = Platform.select({ios: 'maps:', android: 'geo:'});
          const url = Platform.select({
            ios: `${scheme}${latitude},${longitude}`,
            android: `${scheme}${latitude},${longitude}?q=${latitude},${longitude}`,
          });

          Linking.openURL(url).catch(err =>
            console.error('An error occurred', err),
          );
        } catch (error) {
          console.error('Failed to parse location data:', error);
        }
      }
    }, [item]);
    const renderContent = () => {
      switch (item.type) {
        case 'image':
          return (
            <Avatar.Image
              source={{uri: item.content}}
              size={200}
              style={styles.messageImage}
            />
          );
        case 'audio':
          return (
            <View style={styles.audioContainer}>
              <IconButton
                icon={isPlaying ? 'pause' : 'play'}
                size={24}
                onPress={toggleAudioPlayback}
              />
              <View style={styles.audioProgressBarContainer}>
                <View
                  style={[
                    styles.audioProgressBar,
                    {width: `${progress * 100}%`},
                  ]}
                />
              </View>
              <Text
                style={[
                  styles.audioText,
                  {color: isSentByUser ? colors.onPrimary : colors.onSurface},
                ]}>
                {Math.floor(duration * progress)}s
              </Text>
            </View>
          );
        case 'video':
          return <VideoPlayer item={item} />;
        case 'location':
          let locationPreview = 'Location data unavailable';
          let mapPreviewUrl = '';
          try {
            const locationData = JSON.parse(item.content);
            locationPreview = `${locationData.latitude.toFixed(
              4,
            )}, ${locationData.longitude.toFixed(4)}`;

            // Construct Google Static Map URL
            const apiKey = 'AIzaSyDMvHTvx8oVrT5NDIXLck6aqLacu3tIHU8';
            const latitude = locationData.latitude;
            const longitude = locationData.longitude;
            mapPreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=15&size=600x300&maptype=roadmap
                  &markers=color:red%7C${latitude},${longitude}
                  &key=${apiKey}`;
          } catch (error) {
            console.error('Failed to parse location data:', error);
          }

          return (
            <TouchableOpacity
              onPress={handleLocationPress}
              style={styles.locationContainer}>
              <IconButton
                icon="map-marker"
                size={24}
                color={isSentByUser ? colors.onPrimary : colors.primary}
              />
              <View>
                <Text
                  style={[
                    styles.locationText,
                    {color: isSentByUser ? colors.onPrimary : colors.onSurface},
                  ]}>
                  View Location
                </Text>

                {/* Show the static map image */}
                {mapPreviewUrl ? (
                  <Image
                    source={{uri: mapPreviewUrl}}
                    style={{width: 150, height: 100, borderRadius: 8}}
                  />
                ) : (
                  <Text
                    style={[
                      styles.locationPreview,
                      {
                        color: isSentByUser
                          ? colors.onPrimary
                          : colors.onSurface,
                      },
                    ]}>
                    {locationPreview}
                  </Text>
                )}
              </View>
            </TouchableOpacity>
          );

        default:
          return (
            <Text
              style={[
                styles.messageText,
                {color: isSentByUser ? colors.onPrimary : colors.onSurface},
              ]}>
              {item.content}
            </Text>
          );
      }
    };

    return (
      <Animated.View
        style={[
          styles.messageWrapper,
          isSentByUser
            ? styles.sentMessageWrapper
            : styles.receivedMessageWrapper,
          {transform: [{scale: scaleValue}]},
        ]}
        {...panResponder.panHandlers}>
        {showDeleteOption && isSentByUser && (
          <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
            <IconButton icon="delete" size={20} color={colors.primary} />
          </TouchableOpacity>
        )}
        {!isSentByUser && (
          <Avatar.Image
            source={{
              uri:
                senderData?.UserProfile?.userProfileImageDetails?.preview ||
                'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png',
            }}
            size={20}
            style={styles.avatar}
          />
        )}
        <TouchableOpacity
          onLongPress={handleLongPress}
          onPress={() => setShowDeleteOption(false)}>
          <LinearGradient
            colors={
              isSentByUser
                ? [colors.primary, colors.primary]
                : [colors.surface, colors.surface]
            }
            style={[
              styles.messageItem,
              isSentByUser ? styles.sentMessage : styles.receivedMessage,
            ]}>
            <Text
              style={[
                styles.senderName,
                {color: isSentByUser ? colors.onPrimary : colors.primary},
              ]}>
              {senderData
                ? `${senderData.UserProfile.firstName} ${senderData.UserProfile.lastName}`
                : 'Unknown User'}
            </Text>
            {renderContent()}
            <View style={styles.messageFooter}>
              <Text
                style={[
                  styles.messageTime,
                  {color: isSentByUser ? colors.onPrimary : colors.onSurface},
                ]}>
                {messageTime}
              </Text>
              {isSentByUser && (
                <IconButton
                  icon="check-all"
                  size={16}
                  color={colors.onPrimary}
                />
              )}
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </Animated.View>
    );
  },
);
const styles = StyleSheet.create({
  // The rest of your styles remain the same
  messageWrapper: {
    flexDirection: 'row',
    marginVertical: 2,
    maxWidth: SCREEN_WIDTH * 0.8,
  },
  sentMessageWrapper: {
    alignSelf: 'flex-end',
  },
  receivedMessageWrapper: {
    alignSelf: 'flex-start',
  },
  avatar: {
    marginRight: 8,
    alignSelf: 'flex-start',
  },
  messageItem: {
    borderRadius: 20,
    padding: 10,
    maxWidth: '100%',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
  },
  locationText: {
    fontSize: 16,
    marginLeft: 5,
  },
  locationPreview: {
    fontSize: 12,
    marginLeft: 5,
    opacity: 0.7,
  },
  sentMessage: {
    borderBottomRightRadius: 5,
  },
  receivedMessage: {
    borderBottomLeftRadius: 5,
  },
  senderName: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  messageText: {
    fontSize: 16,
  },
  messageImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
  audioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 150,
  },
  audioProgressBar: {
    flex: 1,
    height: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    marginHorizontal: 5,
  },
  audioText: {
    fontSize: 12,
    marginLeft: 5,
  },
  messageFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 2,
  },
  messageTime: {
    fontSize: 10,
    marginRight: 2,
  },
  audioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 200,
  },
  audioProgressBarContainer: {
    flex: 1,
    height: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginHorizontal: 5,
  },
  audioProgressBar: {
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  audioText: {
    fontSize: 12,
    marginLeft: 5,
  },
  videoPlayer: {
    width: 250,
    height: 150,
    borderRadius: 10,
  },
});

export default GroupMessageItem;
