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
import UserProfilePercentage from '../../components/userProfileCompletion';
import {selectUser} from '../../redux/selectors/UMS/authSelectors';
// import { selectUser } from '../redux/selectors/UMS/authSelectors';
// import { useDispatch, useSelector } from 'react-redux';
/**
 * ProfileInformationScreen Component
 *
 * This component displays the user's profile information settings. It includes options
 * to invite friends, edit profile, change password, view updates, and access the profile
 * screen. The component uses Redux for theme integration to ensure consistent styling
 * based on the current theme. It includes a back button to navigate to the previous screen.
 *
 * - **Navigation:** Provides navigation to various screens related to user profile settings.
 * - **Theme Integration:** Applies theme colors and fonts from Redux to style the
 *   component according to the current theme.
 * - **ScrollView:** Allows users to scroll through the available profile settings options.
 *
 * @component
 * @example
 * <ProfileInformationScreen />
 *
 * @returns {JSX.Element} The rendered component.
 *
 * @author PRATHAMESH GHORPADE
 */

const ProfileInformationScreen = () => {
  const navigation = useNavigation();
  const {colors, fonts} = useSelector(selectTheme);
  const user = useSelector(selectUser);

  const navigateToScreen = screenName => {
    navigation.navigate(screenName);
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
            Profile Information
          </Text>
        </View>
      </View>

      <ScrollView
        style={[styles.container, {backgroundColor: colors.background}]}>
        {/* <view onPress={()=>{ navigation.navigate('ProfileInformation', {
                ShowTimer: true,
            })}}> */}

        <UserProfilePercentage user={user} colors={colors} fonts={fonts} />
        {/* </view> */}
        {/* <Text
          style={[
            styles.sectionTitle,
            {color: colors.text, ...fonts.titleMedium},
          ]}>
          Invite Friends
        </Text>
        <TouchableOpacity
          style={styles.settingItem}
          onPress={() => navigateToScreen('InviteFriend')}>
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
            Invite your friends via social media
          </Text>
        </TouchableOpacity> */}

        <Text
          style={[
            styles.sectionTitle,
            {color: colors.text, ...fonts.titleMedium},
          ]}>
          Account
        </Text>
        <TouchableOpacity
          style={styles.settingItem}
          onPress={() => navigateToScreen('Profile')}>
          <Ionicons name="person-outline" size={24} color={colors.primary} />
          <Text
            style={[
              styles.settingText,
              {color: colors.text, ...fonts.bodyMedium},
            ]}>
            Profile
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.settingItem}
          onPress={() => navigateToScreen('EditProfile')}>
          <Ionicons name="create-outline" size={24} color={colors.primary} />
          <Text
            style={[
              styles.settingText,
              {color: colors.text, ...fonts.bodyMedium},
            ]}>
            Edit Profile
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.settingItem}
          onPress={() => navigateToScreen('UpgradeAccount')}>
          <Ionicons
            name="accessibility-outline"
            size={24}
            color={colors.primary}
          />
          <Text
            style={[
              styles.settingText,
              {color: colors.text, ...fonts.bodyMedium},
            ]}>
            Update Account
          </Text>
        </TouchableOpacity>
        {/* <TouchableOpacity
          style={styles.settingItem}
          onPress={() => navigateToScreen('ChangePassword')}>
          <Ionicons name="key-outline" size={24} color={colors.primary} />
          <Text
            style={[
              styles.settingText,
              {color: colors.text, ...fonts.bodyMedium},
            ]}>
            Change Password
          </Text>
        </TouchableOpacity> */}
        {/* <TouchableOpacity
          style={styles.settingItem}
          onPress={() => navigateToScreen('Updates')}>
          <Ionicons
            name="cloud-download-outline"
            size={24}
            color={colors.primary}
          />
          <Text
            style={[
              styles.settingText,
              {color: colors.text, ...fonts.bodyMedium},
            ]}>
            Updates
          </Text>
        </TouchableOpacity> */}
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

export default ProfileInformationScreen;
