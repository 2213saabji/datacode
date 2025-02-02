import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {selectTheme} from '../../redux/selectors';

/**
 * ManageMyAccountScreen Component
 *
 * This component provides various account management options, including logging out of all devices,
 * deleting the account, and adjusting privacy and notification settings. It uses alert dialogs to
 * confirm sensitive actions like logout and account deletion. The component applies theme colors and
 * fonts from Redux to ensure a consistent appearance based on the current theme.
 *
 * - **Account Actions:** Options for logging out of all devices and deleting the account.
 * - **Privacy Settings:** Options for data sharing preferences and account visibility.
 * - **Notification Preferences:** Options for managing notifications and email preferences.
 *
 * @component
 * @example
 * <ManageMyAccountScreen />
 *
 * @returns {JSX.Element} The rendered component.
 *
 * @author PRATHAMESH GHORPADE
 */

const ManageMyAccountScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {colors, fonts} = useSelector(selectTheme);
  const handleLogoutAllDevices = () => {
    Alert.alert(
      'Confirm Logout',
      'Are you sure you want to log out of all devices?',
      [
        {text: 'Cancel', style: 'cancel'},
        // {text: 'Logout', onPress: () => dispatch(logoutFromAllDevices())},
      ],
    );
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete your account? This action cannot be undone.',
      [
        {text: 'Cancel', style: 'cancel'},
        // {text: 'Delete', onPress: () => dispatch(deleteAccount())},
      ],
    );
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
            Manage My Account
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
          Account Actions
        </Text>
        <TouchableOpacity
          style={styles.settingItem}
          onPress={handleLogoutAllDevices}>
          <Ionicons name="log-out-outline" size={24} color={colors.primary} />
          <Text
            style={[
              styles.settingText,
              {color: colors.text, ...fonts.bodyMedium},
            ]}>
            Log out of all devices
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.settingItem}
          onPress={handleDeleteAccount}>
          <Ionicons name="trash-outline" size={24} color={colors.primary} />
          <Text
            style={[
              styles.settingText,
              {color: colors.text, ...fonts.bodyMedium},
            ]}>
            Delete account
          </Text>
        </TouchableOpacity>

        <Text
          style={[
            styles.sectionTitle,
            {color: colors.text, ...fonts.titleMedium},
          ]}>
          Privacy Settings
        </Text>
        <TouchableOpacity style={styles.settingItem}>
          <Ionicons name="share-outline" size={24} color={colors.primary} />
          <Text
            style={[
              styles.settingText,
              {color: colors.text, ...fonts.bodyMedium},
            ]}>
            Data sharing preferences
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingItem}>
          <Ionicons name="eye-outline" size={24} color={colors.primary} />
          <Text
            style={[
              styles.settingText,
              {color: colors.text, ...fonts.bodyMedium},
            ]}>
            Account visibility options
          </Text>
        </TouchableOpacity>

        <Text
          style={[
            styles.sectionTitle,
            {color: colors.text, ...fonts.titleMedium},
          ]}>
          Notification Preferences
        </Text>
        <TouchableOpacity style={styles.settingItem}>
          <Ionicons
            name="notifications-outline"
            size={24}
            color={colors.primary}
          />
          <Text
            style={[
              styles.settingText,
              {color: colors.text, ...fonts.bodyMedium},
            ]}>
            Manage notifications
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingItem}>
          <Ionicons name="mail-outline" size={24} color={colors.primary} />
          <Text
            style={[
              styles.settingText,
              {color: colors.text, ...fonts.bodyMedium},
            ]}>
            Email preferences
          </Text>
        </TouchableOpacity>
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
  settingText: {
    fontSize: 16,
    marginLeft: 16,
  },
});

export default ManageMyAccountScreen;
