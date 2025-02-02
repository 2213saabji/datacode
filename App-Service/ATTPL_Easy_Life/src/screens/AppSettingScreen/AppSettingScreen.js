import React, {useState} from 'react';
import {
  View,
  Text,
  Switch,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {setDarkTheme, setLightTheme} from '../../redux/slices/themeSlice';
import {selectTheme} from '../../redux/selectors';

import {useNavigation} from '@react-navigation/native';

/**
 * AppSettingScreen component.
 *
 * This screen allows users to configure application settings including theme mode,
 * language, and push notifications. Users can toggle dark mode, manage notification settings,
 * and navigate to the Language and About screens.
 *
 * @returns {React.Element} - The AppSettingScreen element.
 *
 * @author PRATHAMESH GHORPADE
 */
const AppSettingScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {isDarkTheme} = useSelector(state => state.theme);
  const {colors, fonts} = useSelector(selectTheme);
  const [isDarkMode, setIsDarkMode] = useState(isDarkTheme);
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(true);

  const handleThemeChange = () => {
    if (isDarkMode) {
      dispatch(setLightTheme());
      setIsDarkMode(false);
    } else {
      dispatch(setDarkTheme());
      setIsDarkMode(true);
    }
  };

  const handleNotificationsToggle = () => {
    setIsNotificationsEnabled(prev => !prev);
  };

  const navigateToLanguageScreen = () => {
    navigation.navigate('Language');
  };

  const navigateToAboutScreen = () => {
    navigation.navigate('About');
  };

  return (
    <>
      <View style={[styles.header, {backgroundColor: colors.primary}]}>
        <View style={styles.headerLeadings}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color={colors.surface} />
          </TouchableOpacity>
          <Text
            style={[
              styles.headerTitle,
              {color: colors.surface, ...fonts.titleMedium},
            ]}>
            App Settings
          </Text>
        </View>
      </View>
      <ScrollView
        style={[styles.container, {backgroundColor: colors.background}]}>
        <Text
          style={[
            styles.sectionTitle,
            {color: colors.text, ...fonts.titleMedium},
          ]}>
          Application Theme
        </Text>
        <View style={styles.settingItem}>
          <Ionicons name="moon-outline" size={24} color={colors.primary} />
          <View style={styles.settingTextContainer}>
            <Text
              style={[
                styles.settingText,
                {color: colors.text, ...fonts.bodyMedium},
              ]}>
              Enable Dark Mode
            </Text>
            <Text
              style={[
                styles.settingSubText,
                {color: colors.placeholder, ...fonts.bodySmall},
              ]}>
              Enable this setting if you’d like to continue using the app in
              dark mode.
            </Text>
          </View>
          <Switch
            value={isDarkMode}
            onValueChange={handleThemeChange}
            trackColor={{false: colors.placeholder, true: colors.primary}}
            thumbColor={isDarkMode ? colors.accent : colors.surface}
          />
        </View>

        <Text
          style={[
            styles.sectionTitle,
            {color: colors.text, ...fonts.titleMedium},
          ]}>
          Other Settings
        </Text>
        <TouchableOpacity
          style={styles.settingItem}
          onPress={navigateToLanguageScreen}>
          <Ionicons name="language-outline" size={24} color={colors.primary} />
          <View style={styles.settingTextContainer}>
            <Text
              style={[
                styles.settingText,
                {color: colors.text, ...fonts.bodyMedium},
              ]}>
              Language
            </Text>
            <Text
              style={[
                styles.settingSubText,
                {color: colors.placeholder, ...fonts.bodySmall},
              ]}>
              Change the app's language.
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.settingItem}
          onPress={navigateToAboutScreen}>
          <Ionicons
            name="information-circle-outline"
            size={24}
            color={colors.primary}
          />
          <View style={styles.settingTextContainer}>
            <Text
              style={[
                styles.settingText,
                {color: colors.text, ...fonts.bodyMedium},
              ]}>
              About
            </Text>
            <Text
              style={[
                styles.settingSubText,
                {color: colors.placeholder, ...fonts.bodySmall},
              ]}>
              Learn more about this app.
            </Text>
          </View>
        </TouchableOpacity>

        {/* Push Notifications Section */}
        <Text
          style={[
            styles.sectionTitle,
            {color: colors.text, ...fonts.titleMedium},
          ]}>
          Push Notifications
        </Text>
        <View style={styles.settingItem}>
          <Ionicons
            name="notifications-outline"
            size={24}
            color={colors.primary}
          />
          <View style={styles.settingTextContainer}>
            <Text
              style={[
                styles.settingText,
                {color: colors.text, ...fonts.bodyMedium},
              ]}>
              Push Notifications
            </Text>
            <Text
              style={[
                styles.settingSubText,
                {color: colors.placeholder, ...fonts.bodySmall},
              ]}>
              Enable or disable push notifications.
            </Text>
          </View>
          <Switch
            value={isNotificationsEnabled}
            onValueChange={handleNotificationsToggle}
            trackColor={{false: colors.placeholder, true: colors.primary}}
            thumbColor={isNotificationsEnabled ? colors.accent : colors.surface}
          />
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerLeadings: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 16,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 10,
  },
  settingTextContainer: {
    flex: 1,
    marginLeft: 16,
  },
  settingText: {
    fontSize: 16,
  },
  settingSubText: {
    fontSize: 14,
    marginTop: 4,
  },
});

export default AppSettingScreen;
