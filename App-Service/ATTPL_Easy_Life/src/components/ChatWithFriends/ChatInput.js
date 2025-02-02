import React, {useState, useRef, useEffect, useMemo} from 'react';
import {
  View,
  TouchableOpacity,
  Animated,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  PanResponder,
  Vibration,
  Alert,
} from 'react-native';
import {
  TextInput,
  ProgressBar,
  useTheme,
  ActivityIndicator,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import DocumentPicker from 'react-native-document-picker';
import Geolocation from '@react-native-community/geolocation';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import {useDispatch, useSelector} from 'react-redux';
import {uploadUserFileInAWSS3} from '../../redux/slices/simpleFunctions/aws-s3-file-handler';
import Modal from 'react-native-modal';
import * as Animatable from 'react-native-animatable';
import {selectTheme} from '../../redux/selectors';
import {PermissionsAndroid} from 'react-native';
import {useCustomAlert} from '../../utilities/Alert/useCustomAlert';

const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100MB

const CreativeChatInput = ({onSendMessage}) => {
  const dispatch = useDispatch();
  const {colors, fonts} = useSelector(selectTheme);
  const {showAlert} = useCustomAlert();
  const [inputText, setInputText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isMediaPickerVisible, setIsMediaPickerVisible] = useState(false);
  const [recentEmojis, setRecentEmojis] = useState([]);
  const [isRecordingInProgress, setIsRecordingInProgress] = useState(false);
  const inputHeight = useRef(new Animated.Value(50)).current;
  const micAnimatedValue = useRef(new Animated.Value(1)).current;
  const audioRecorderPlayer = useRef(new AudioRecorderPlayer()).current;
  const recordingTimer = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('');
  useEffect(() => {
    return () => {
      if (recordingTimer.current) {
        clearInterval(recordingTimer.current);
      }
    };
  }, []);

  const startRecording = async () => {
    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          {
            title: 'Microphone Permission',
            message: 'App needs access to your microphone to record audio.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          showAlert(
            'error',
            'You need to grant microphone permission to record audio.',
          );
          return;
        }
      }

      const result = await audioRecorderPlayer.startRecorder();
      audioRecorderPlayer.addRecordBackListener(e => {
        setRecordingDuration(e.currentPosition);
      });
      setIsRecording(true);
      setIsRecordingInProgress(true);
    } catch (err) {
      console.error('Failed to start recording', err);
      showAlert('error', 'Failed to start recording. Please try again.');
    }
  };

  const stopRecording = async () => {
    try {
      if (!isRecording) return;
      const result = await audioRecorderPlayer.stopRecorder();
      audioRecorderPlayer.removeRecordBackListener();
      setIsRecording(false);
      setRecordingDuration(0);
      onSendMessage(result, 'audio');
      setIsRecordingInProgress(false);
    } catch (err) {
      console.error('Failed to stop recording', err);
      showAlert('error', 'Failed to save the recording. Please try again.');
    }
  };

  const cancelRecording = async () => {
    try {
      if (!isRecording) return;
      await audioRecorderPlayer.stopRecorder();
      audioRecorderPlayer.removeRecordBackListener();
      setIsRecording(false);
      setRecordingDuration(0);
      // Here you might want to delete the recorded file
    } catch (err) {
      console.error('Failed to cancel recording', err);
    }
  };

  const handleFilePicker = async pickerType => {
    setIsMediaPickerVisible(false);
    setIsLoading(true);
    setLoadingText(`Picking ${pickerType}...`);
    try {
      let result;
      let contentType;

      if (pickerType === 'image' || pickerType === 'video') {
        result = await launchImageLibrary({
          mediaType: pickerType,
          quality: 1,
        });
        contentType = pickerType;
      } else if (pickerType === 'camera') {
        result = await launchCamera({
          mediaType: 'photo',
          quality: 1,
        });
        contentType = 'image';
      } else if (pickerType === 'document') {
        result = await DocumentPicker.pick({
          type: [DocumentPicker.types.allFiles],
        });
        contentType = 'doc';
      } else if (pickerType === 'audio') {
        startRecording();
        setIsLoading(false);
        return;
      } else if (pickerType === 'location') {
        handleLocationShare();
        return;
      }

      if (!result.didCancel) {
        const file = pickerType === 'document' ? result[0] : result.assets[0];

        if (file.fileSize > MAX_FILE_SIZE) {
          showAlert('warning', 'Please select a file smaller than 100MB.');
          setIsLoading(false);
          return;
        }

        setIsUploading(true);
        setLoadingText(`Uploading ${pickerType}...`);

        const formData = new FormData();
        const fieldName = pickerType === 'document' ? 'file' : 'image';
        formData.append(fieldName, {
          uri: file.uri,
          type: file.type,
          name: file.name || `temp_${pickerType}_${Date.now()}`,
        });

        const response = await dispatch(uploadUserFileInAWSS3(formData));

        if (!uploadUserFileInAWSS3.fulfilled.match(response)) {
          throw new Error(response.error.message);
        }

        onSendMessage(response.payload.data.data.preview, contentType);
      }
    } catch (error) {
      console.error('Error picking or uploading file:', error);
      showAlert('error', 'Failed to upload file. Please try again.');
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
      setIsLoading(false);
      setLoadingText('');
    }
  };

  let retryWithLowAccuracy = false;

  const handleLocationShare = async () => {
    setIsMediaPickerVisible(false);
    setIsLoading(true);
    setLoadingText('Fetching location...');
    try {
      const hasPermission = await requestLocationPermission();
      if (!hasPermission) {
        showAlert(
          'error',
          'Location permission denied. Please enable it in your device settings.',
        );
        setIsLoading(false);
        return;
      }

      const options = {
        enableHighAccuracy: !retryWithLowAccuracy,
        timeout: 10000,
        maximumAge: 10000,
      };

      Geolocation.getCurrentPosition(
        position => {
          console.log(position);

          const locationData = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          onSendMessage(JSON.stringify(locationData), 'location');
          setIsLoading(false);
        },
        error => {
          console.error('Error getting location:', error);
          if (error.code === 3 && !retryWithLowAccuracy) {
            retryWithLowAccuracy = true;
            handleLocationShare();
          } else {
            handleLocationError(error);
            setIsLoading(false);
          }
        },
        options,
      );
    } catch (error) {
      console.error('Error in handleLocationShare:', error);
      showAlert('error', 'An unexpected error occurred. Please try again.');
      setIsLoading(false);
    }
  };

  const handleLocationError = error => {
    let message = 'Failed to get your location. ';

    switch (error.code) {
      case 1:
        message += 'Location permission denied.';
        break;
      case 2:
        message += 'Position unavailable. Please check your device settings.';
        break;
      case 3:
        message +=
          'Request timed out. Please move to an area with better GPS reception and try again.';

        break;
      case 4:
        message +=
          'Google Play services is not installed or has an older version.';
        break;
      default:
        message += 'Please try again.';
    }

    Alert.alert(
      'Location Error',
      message,
      error.code === 3
        ? [
            {
              text: 'Try Again',
              onPress: () => handleLocationShare(),
            },
            {
              text: 'Cancel',
              style: 'cancel',
            },
          ]
        : [{text: 'OK'}],
    );
  };

  const requestLocationPermission = async () => {
    if (Platform.OS === 'ios') {
      try {
        const auth = await Geolocation.requestAuthorization('whenInUse');
        return auth === 'granted';
      } catch (err) {
        console.error('Error requesting iOS location permission:', err);
        return false;
      }
    }

    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'This app needs access to your location.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        console.log(granted);

        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.error('Error requesting Android location permission:', err);
        return false;
      }
    }
  };

  const renderButton = (icon, onPress, color = colors.primary) => (
    <TouchableOpacity onPress={onPress} style={styles.iconButton}>
      <Icon name={icon} size={24} color={color} />
    </TouchableOpacity>
  );

  const renderMediaPicker = () => (
    <Modal
      isVisible={isMediaPickerVisible}
      onBackdropPress={() => setIsMediaPickerVisible(false)}
      style={styles.modal}>
      <Animatable.View
        animation="slideInUp"
        duration={300}
        style={styles.mediaPickerContainer}>
        <TouchableOpacity onPress={() => handleFilePicker('camera')}>
          <View style={styles.mediaOption}>
            <Icon name="camera" size={28} color={colors.primary} />
            <Text style={styles.mediaOptionText}>Camera</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleFilePicker('image')}>
          <View style={styles.mediaOption}>
            <Icon name="image" size={28} color={colors.primary} />
            <Text style={styles.mediaOptionText}>Image</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleFilePicker('video')}>
          <View style={styles.mediaOption}>
            <Icon name="video" size={28} color={colors.primary} />
            <Text style={styles.mediaOptionText}>Video</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleFilePicker('audio')}>
          <View style={styles.mediaOption}>
            <Icon name="microphone" size={28} color={colors.primary} />
            <Text style={styles.mediaOptionText}>Audio</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLocationShare}>
          <View style={styles.mediaOption}>
            <Icon name="map-marker" size={28} color={colors.primary} />
            <Text style={styles.mediaOptionText}>Location</Text>
          </View>
        </TouchableOpacity>
      </Animatable.View>
    </Modal>
  );

  const renderEmojiPicker = () => (
    <View style={styles.emojiPickerContainer}>
      {recentEmojis.map((emoji, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => setInputText(inputText + emoji)}
          style={styles.emojiButton}>
          <Text style={styles.emojiText}>{emoji}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={100}
      style={styles.container}>
      <View style={[styles.inputContainer, {backgroundColor: colors.surface}]}>
        {renderButton('emoticon-outline', () => {
          // Toggle emoji picker
        })}
        {renderButton('plus-circle-outline', () =>
          setIsMediaPickerVisible(true),
        )}
        <Animated.View style={[styles.textInputWrapper, {height: inputHeight}]}>
          <TextInput
            style={[
              styles.textInput,
              {
                ...fonts.bodyMedium,
                backgroundColor: colors.background,
              },
            ]}
            textColor={colors.text}
            activeOutlineColor="transparent"
            activeUnderlineColor="transparent"
            value={inputText}
            onChangeText={setInputText}
            placeholder="Type a message..."
            multiline
            onContentSizeChange={event => {
              Animated.timing(inputHeight, {
                toValue: Math.min(
                  100,
                  Math.max(50, event.nativeEvent.contentSize.height),
                ),
                duration: 100,
                useNativeDriver: false,
              }).start();
            }}
          />
        </Animated.View>
        <TouchableOpacity
          onPress={() => {
            if (inputText.trim()) {
              onSendMessage(inputText.trim(), 'text');
              setInputText('');
            } else {
              startRecording();
            }
          }}>
          <Animated.View
            style={[
              styles.sendButton,
              {backgroundColor: colors.primary},
              {transform: [{scale: micAnimatedValue}]},
            ]}>
            <Icon
              name={inputText.trim() ? 'send' : 'microphone'}
              size={24}
              color={colors.onPrimary}
            />
          </Animated.View>
        </TouchableOpacity>
      </View>

      {renderEmojiPicker()}
      {renderMediaPicker()}

      {(isUploading || isLoading) && (
        <View style={styles.loadingContainer}>
          {isUploading ? (
            <ProgressBar
              progress={uploadProgress}
              color={colors.primary}
              style={styles.progressBar}
            />
          ) : (
            <ActivityIndicator color={colors.primary} />
          )}
          <Text style={[styles.loadingText, {color: colors.primary}]}>
            {loadingText}
          </Text>
          {renderButton(
            'close',
            () => {
              setIsUploading(false);
              setIsLoading(false);
              setUploadProgress(0);
              setLoadingText('');
              // Call API to cancel upload on server side if necessary
            },
            colors.error,
          )}
        </View>
      )}

      {isRecording && (
        <TouchableOpacity onPress={cancelRecording} onLongPress={stopRecording}>
          <Animatable.View
            animation="pulse"
            easing="ease-out"
            iterationCount="infinite"
            style={styles.recordingContainer}>
            <Text style={[styles.recordingTimer, {color: colors.error}]}>
              {Math.floor(recordingDuration / 1000 / 60)}:
              {((recordingDuration / 1000) % 60).toString().padStart(2, '0')}
            </Text>
            <Animated.View style={{transform: [{scale: micAnimatedValue}]}}>
              <Icon name="microphone" size={24} color={colors.error} />
            </Animated.View>
            <Text style={[styles.recordingHint, {color: colors.placeholder}]}>
              Tap to cancel / Long Press To Send
            </Text>
          </Animatable.View>
        </TouchableOpacity>
      )}
    </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    borderRadius: 24,
    paddingVertical: 8,
    paddingHorizontal: 12,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  iconButton: {
    paddingVertical: 8,
    paddingHorizontal: 5,
  },
  textInputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    borderRadius: 20,
    marginHorizontal: 8,
  },
  textInput: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
    maxHeight: 50,
    borderRadius: 20,
  },
  sendButton: {
    borderRadius: 50,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  mediaPickerContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  mediaOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  mediaOptionText: {
    fontSize: 16,
    marginLeft: 10,
  },
  uploadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
  },
  progressBar: {
    width: 100,
    height: 4,
    marginRight: 8,
  },
  recordingContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  recordingTimer: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  recordingHint: {
    fontSize: 12,
    marginTop: 4,
  },
  emojiPickerContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: 5,
  },
  emojiButton: {
    padding: 5,
  },
  emojiText: {
    fontSize: 24,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  loadingText: {
    marginLeft: 10,
    fontSize: 14,
  },
});

export default CreativeChatInput;
