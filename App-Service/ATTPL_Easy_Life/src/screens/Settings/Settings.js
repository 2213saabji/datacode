import React, {useState} from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {setDarkTheme, setLightTheme} from '../../redux/slices/themeSlice';
import {selectTheme} from '../../redux/selectors';

import {useNavigation} from '@react-navigation/native';
import Header from '../../components/Settings/Header';
import Section from '../../components/Settings/Section';
import SettingItem from '../../components/Settings/SettingItem';
import SupportSection from '../../components/Settings/SupportSection';
import {logout} from '../../redux/slices/UMS/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {selectSocket} from '../../redux/selectors/CMS/ChatSelectors';
/**
 * SettingsScreen component.
 *
 * This screen provides various settings options for the application, including account settings, general settings,
 * and support sections. It allows users to navigate to different settings pages and toggle theme options.
 *
 * @returns {React.Element} - The SettingsScreen element.
 *
 * @author PRATHAMESH GHORPADE
 */
const SettingsScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const {isDarkTheme} = useSelector(state => state.theme);
  const {colors, fonts} = useSelector(selectTheme);
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(true);
  const handleThemeChange = value => {
    if (value === 'dark') {
      dispatch(setDarkTheme());
    } else {
      dispatch(setLightTheme());
    }
  };
  const socket = useSelector(selectSocket);
  async function loggingOut() {
    await AsyncStorage.removeItem('accessToken');
    await dispatch(logout({socket: socket}));
    navigation.navigate('WelCome');
  }

  return (
    <>
      <Header navigation={navigation} colors={colors} fonts={fonts} />
      <ScrollView
        style={[styles.container, {backgroundColor: colors.background}]}>
        <Section title="Account Settings" colors={colors} fonts={fonts} />
        <SettingItem
          iconName="person-outline"
          text="Profile Information"
          // onPress={() => navigation.navigate("UpgradeAccountForm",{roleId:34})}
          onPress={() => navigation.navigate('ProfileInformation')}
          colors={colors}
          fonts={fonts}
        />
        <SettingItem
          iconName="settings-outline"
          text="App Setting"
          onPress={() => navigation.navigate('AppSetting')}
          colors={colors}
          fonts={fonts}
        />
        {/* <SettingItem
          iconName="lock-closed-outline"
          text="Privacy"
          onPress={() => navigation.navigate('Privacy')}
          colors={colors}
          fonts={fonts}
        /> */}
        <SettingItem
          iconName="key-outline"
          text="Change Password"
          onPress={() => navigation.navigate('ChangePassword')}
          colors={colors}
          fonts={fonts}
        />

        <Section title="General" colors={colors} fonts={fonts} />
        {/* <SettingItem
          iconName="star-outline"
          text="Rate our App"
          onPress={() => navigation.navigate('RateApp')}
          colors={colors}
          fonts={fonts}
        /> */}
        {/* <SettingItem
          iconName="chatbubble-ellipses-outline"
          text="Send Feedback"
          onPress={() => navigation.navigate('SendFeedback')}
          colors={colors}
          fonts={fonts}
        /> */}
        <SettingItem
          iconName="document-text-outline"
          text="Privacy Policy"
          onPress={() => navigation.navigate('PrivacyPolicy')}
          colors={colors}
          fonts={fonts}
        />

        <SupportSection navigation={navigation} colors={colors} fonts={fonts} />

        <Section title="Logout" colors={colors} fonts={fonts} />
        <SettingItem
          iconName="backspace-outline"
          text="Logout"
          onPress={() => {
            loggingOut();
          }}
          colors={colors}
          fonts={fonts}
        />
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 10,
  },
});

export default SettingsScreen;
