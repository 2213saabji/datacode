import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {useSelector} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {selectTheme} from '../../redux/selectors';

import {useNavigation} from '@react-navigation/native';
/**
 * PrivacyScreen Component
 *
 * This component provides a user interface for managing privacy settings within the app.
 * It includes sections for Account and Preferences, with each section containing
 * options for managing account settings, privacy and safety, notification preferences,
 * and more. The component uses Redux to access theme settings and applies these
 * settings to style the UI elements.
 *
 * - **Navigation:** Allows navigation to different settings related screens.
 * - **Theme Integration:** Uses Redux to select the current theme and applies it to styles.
 * - **Sections:**
 *   - **Account:** Includes options for managing account, privacy, sharing profile, and security settings.
 *   - **Preferences:** Includes options for notification, ad, language, and content preferences.
 *
 * @component
 * @example
 * <PrivacyScreen />
 *
 * @returns {JSX.Element} The rendered component.
 *
 * @author SHIVAM GAUTAM
 * @co-author PRATHAMESH GHORPADE
 */

const PrivacyScreen = () => {
  const navigation = useNavigation();
  const {colors, fonts} = useSelector(selectTheme);
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
            Privacy
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
          Account
        </Text>
        <TouchableOpacity style={styles.settingItem}>
          <Ionicons
            name="person-circle-outline"
            size={24}
            color={colors.primary}
          />
          <Text
            style={[
              styles.settingText,
              {color: colors.text, ...fonts.bodyMedium},
            ]}>
            Manage My Account
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingItem}>
          <Ionicons name="shield-outline" size={24} color={colors.primary} />
          <Text
            style={[
              styles.settingText,
              {color: colors.text, ...fonts.bodyMedium},
            ]}>
            Privacy and Safety
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingItem}>
          <Ionicons
            name="share-social-outline"
            size={24}
            color={colors.primary}
          />
          <Text
            style={[
              styles.settingText,
              {color: colors.text, ...fonts.bodyMedium},
            ]}>
            Share My Profile
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingItem}>
          <Ionicons
            name="lock-closed-outline"
            size={24}
            color={colors.primary}
          />
          <Text
            style={[
              styles.settingText,
              {color: colors.text, ...fonts.bodyMedium},
            ]}>
            Account Security
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingItem}>
          <Ionicons name="key-outline" size={24} color={colors.primary} />
          <Text
            style={[
              styles.settingText,
              {color: colors.text, ...fonts.bodyMedium},
            ]}>
            Two-Factor Authentication
          </Text>
        </TouchableOpacity>

        <Text
          style={[
            styles.sectionTitle,
            {color: colors.text, ...fonts.titleMedium},
          ]}>
          Preferences
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
            Notification Preferences
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingItem}>
          <Ionicons name="eye-outline" size={24} color={colors.primary} />
          <Text
            style={[
              styles.settingText,
              {color: colors.text, ...fonts.bodyMedium},
            ]}>
            Ad Preferences
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingItem}>
          <Ionicons name="globe-outline" size={24} color={colors.primary} />
          <Text
            style={[
              styles.settingText,
              {color: colors.text, ...fonts.bodyMedium},
            ]}>
            Language Preferences
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingItem}>
          <Ionicons
            name="document-text-outline"
            size={24}
            color={colors.primary}
          />
          <Text
            style={[
              styles.settingText,
              {color: colors.text, ...fonts.bodyMedium},
            ]}>
            Content Preferences
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

export default PrivacyScreen;
