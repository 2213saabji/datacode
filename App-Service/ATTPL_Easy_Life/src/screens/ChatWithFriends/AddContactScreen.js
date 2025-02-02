import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  PermissionsAndroid,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  Appbar,
  TextInput,
  Button,
  Avatar,
  FAB,
  Portal,
  Dialog,
  Paragraph,
} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {selectTheme} from '../../redux/selectors';
import Contacts from 'react-native-contacts';
import {launchImageLibrary} from 'react-native-image-picker';
import {useCustomAlert} from '../../utilities/Alert/useCustomAlert';

const AddContactScreen = ({navigation}) => {
  const {colors, fonts} = useSelector(selectTheme);
  const {showAlert} = useCustomAlert();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [dialogVisible, setDialogVisible] = useState(false);

  useEffect(() => {
    requestPermissions();
  }, []);

  const requestPermissions = async () => {
    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_CONTACTS,
          {
            title: 'Contacts Permission',
            message: 'This app needs access to your contacts to add new ones.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          showAlert('You need to grant access to contacts.', 'error');
          navigation.goBack();
        }
      } else {
        const granted = await Contacts.requestPermission();
        if (granted !== 'authorized') {
          showAlert('You need to grant access to contacts.', 'error');
          navigation.goBack();
        }
      }
    } catch (error) {
      console.error('Permission request error:', error);
      showAlert('Failed to request contact permissions.', 'error');
    }
  };

  const handleAddContact = async () => {
    if (name.trim() && phone.trim()) {
      const newContact = {
        givenName: name,
        phoneNumbers: [{label: 'mobile', number: phone}],
        emailAddresses: email ? [{label: 'work', email: email}] : [],
        hasThumbnail: !!avatar,
        thumbnailPath: avatar,
      };

      try {
        await Contacts.addContact(newContact);
        showAlert('Contact added successfully!', 'success');
        navigation.goBack();
      } catch (error) {
        console.error('Add contact error:', error);
        showAlert('Failed to add contact. Please try again.', 'error');
      }
    } else {
      showAlert('Please enter both name and phone number.', 'error');
    }
  };

  const pickImage = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: false,
        maxHeight: 200,
        maxWidth: 200,
      },
      response => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.assets && response.assets.length > 0) {
          setAvatar(response.assets[0].uri);
        }
      },
    );
  };

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: colors.background}]}>
      <Appbar.Header style={{backgroundColor: colors.surface}}>
        <Appbar.BackAction
          onPress={() => navigation.goBack()}
          color={colors.text}
        />
        <Appbar.Content
          title="Add Contact"
          titleStyle={[fonts.headlineSmall, {color: colors.text}]}
        />
        <Appbar.Action
          icon="information"
          color={colors.text}
          onPress={() => setDialogVisible(true)}
        />
      </Appbar.Header>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.formContainer}>
          <Avatar.Image
            size={100}
            source={
              avatar
                ? {uri: avatar}
                : require('../../assets/default-avatar.png')
            }
            style={styles.avatar}
          />
          <FAB
            style={[styles.avatarButton, {backgroundColor: colors.primary}]}
            small
            icon="camera"
            onPress={pickImage}
            color={colors.onPrimary}
          />
          <TextInput
            label="Name"
            value={name}
            onChangeText={setName}
            style={[styles.input, {backgroundColor: colors.surface}]}
            mode="outlined"
            outlineColor={colors.border}
            activeOutlineColor={colors.primary}
            textColor={colors.text}
            theme={{colors: {placeholder: colors.placeholder}}}
          />
          <TextInput
            label="Phone Number"
            value={phone}
            onChangeText={setPhone}
            style={[styles.input, {backgroundColor: colors.surface}]}
            mode="outlined"
            outlineColor={colors.border}
            activeOutlineColor={colors.primary}
            textColor={colors.text}
            theme={{colors: {placeholder: colors.placeholder}}}
            keyboardType="phone-pad"
          />
          <TextInput
            label="Email (optional)"
            value={email}
            onChangeText={setEmail}
            style={[styles.input, {backgroundColor: colors.surface}]}
            mode="outlined"
            outlineColor={colors.border}
            activeOutlineColor={colors.primary}
            textColor={colors.text}
            theme={{colors: {placeholder: colors.placeholder}}}
            keyboardType="email-address"
          />
          <Button
            mode="contained"
            onPress={handleAddContact}
            style={[styles.button, {backgroundColor: colors.primary}]}
            labelStyle={[fonts.labelLarge, {color: colors.onPrimary}]}>
            Add Contact
          </Button>
        </KeyboardAvoidingView>
      </ScrollView>

      <Portal>
        <Dialog
          visible={dialogVisible}
          onDismiss={() => setDialogVisible(false)}
          style={{backgroundColor: colors.surface}}>
          <Dialog.Title style={[fonts.headlineSmall, {color: colors.text}]}>
            About Adding Contacts
          </Dialog.Title>
          <Dialog.Content>
            <Paragraph style={[fonts.bodyMedium, {color: colors.text}]}>
              This screen allows you to add new contacts to your phone. Make
              sure to provide at least a name and phone number. You can also add
              an email and profile picture to make your contacts more
              personalized!
            </Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              onPress={() => setDialogVisible(false)}
              textColor={colors.primary}>
              Got it
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  formContainer: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  avatar: {
    marginBottom: 20,
  },
  avatarButton: {
    position: 'absolute',
    right: 120,
    top: 70,
  },
  input: {
    width: '100%',
    marginBottom: 15,
  },
  button: {
    marginTop: 20,
    width: '100%',
  },
});

export default AddContactScreen;
