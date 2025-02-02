import React, {useEffect, useState} from 'react';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import App from './src/App';
import {
  SafeAreaView,
  StyleSheet,
  View,
  TouchableOpacity,
  Animated,
  Dimensions,
} from 'react-native';
import {Provider as PaperProvider, Text, Avatar} from 'react-native-paper';
import messaging, {firebase} from '@react-native-firebase/messaging';
import notifee, {EventType, AndroidStyle} from '@notifee/react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {NativeModules} from 'react-native';

const NOTIFICATION_DURATION = 5000;
const RNfirebaseConfig = {
  apiKey: 'AIzaSyCiPCo4y3NN5M3VNieLGox_iacvP38zjZc',
  authDomain: 'app-service-b3581.firebaseapp.com', // Use the value you found here
  projectId: 'app-service-b3581',
  storageBucket: 'app-service-b3581.appspot.com',
  messagingSenderId: '520164815408',
  appId: '1:520164815408:android:1cdf4300ff01923714f3f5',
};

if (!firebase.apps.length) {
  firebase.initializeApp(RNfirebaseConfig);
}

const InAppNotification = ({title, body, onDismiss, onView}) => {
  const [animation] = useState(new Animated.Value(-100));

  useEffect(() => {
    Animated.spring(animation, {
      toValue: 0,
      useNativeDriver: true,
    }).start();

    const timer = setTimeout(() => {
      onDismiss();
    }, NOTIFICATION_DURATION);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Animated.View
        style={[
          styles.inAppNotification,
          {
            transform: [{translateY: animation}],
          },
        ]}>
        <View style={styles.notificationContent}>
          <Avatar.Icon
            size={40}
            icon="message-text"
            backgroundColor="#4CAF50"
          />
          <View style={styles.textContainer}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.body} numberOfLines={1}>
              {body}
            </Text>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={onView} style={styles.viewButton}>
            <Text style={styles.buttonText}>View</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onDismiss} style={styles.dismissButton}>
            <Icon name="close" size={20} color="#757575" />
          </TouchableOpacity>
        </View>
      </Animated.View>
    </>
  );
};

const Root = () => {
  const bundleId = NativeModules.RNDeviceInfo?.bundleId;
  console.log(bundleId);
  const [inAppNotification, setInAppNotification] = useState(null);

  useEffect(() => {
    const requestUserPermission = async () => {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        console.log('Authorization status:', authStatus);
        getFCMToken();
      }
    };

    const getFCMToken = async () => {
      try {
        console.log(firebase.apps);

        await messaging().registerDeviceForRemoteMessages();
        const token = await messaging().getToken();
        console.log('FCM Token:', token);
      } catch (error) {
        console.error('Failed to get FCM token:', error);
      }
    };

    const displayNotification = async remoteMessage => {
      const channelId = await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
      });

      await notifee.displayNotification({
        title: remoteMessage.notification.title,
        body: remoteMessage.notification.body,
        android: {
          channelId,
          smallIcon: 'ic_launcher',
          style: {
            type: AndroidStyle.BIGTEXT,
            text: remoteMessage.notification.body,
          },
          pressAction: {
            id: 'default',
          },
        },
      });

      setInAppNotification({
        title: remoteMessage.notification.title,
        body: remoteMessage.notification.body,
      });
    };

    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
      displayNotification(remoteMessage);
    });

    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
      displayNotification(remoteMessage);
    });

    notifee.onBackgroundEvent(async ({type, detail}) => {
      if (type === EventType.PRESS) {
        console.log(
          'User pressed background notification',
          detail.notification,
        );
      }
    });

    notifee.onForegroundEvent(({type, detail}) => {
      if (type === EventType.PRESS) {
        console.log(
          'User pressed foreground notification',
          detail.notification,
        );
      }
    });

    requestUserPermission();

    return () => unsubscribe();
  }, []);

  const dismissInAppNotification = () => {
    setInAppNotification(null);
  };

  const viewInAppNotification = () => {
    console.log('Viewing notification:', inAppNotification);
    dismissInAppNotification();
  };

  return (
    <Provider store={store}>
      <PaperProvider>
        <SafeAreaView style={styles.container}>
          <App />
          {inAppNotification && (
            <InAppNotification
              title={inAppNotification.title}
              body={inAppNotification.body}
              onDismiss={dismissInAppNotification}
              onView={viewInAppNotification}
            />
          )}
        </SafeAreaView>
      </PaperProvider>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inAppNotification: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'column',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    zIndex: 1000,
  },
  notificationContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    marginLeft: 16,
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#000000',
  },
  body: {
    fontSize: 14,
    color: '#757575',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 12,
  },
  viewButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  dismissButton: {
    padding: 8,
  },
});

export default Root;
