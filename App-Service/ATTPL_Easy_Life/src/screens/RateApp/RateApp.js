import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Linking} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';
import {selectTheme} from '../../redux/selectors';

import {useNavigation} from '@react-navigation/native';
/**
 * RateAppScreen Component
 *
 * This component provides users with an option to rate the app and follow the app on various
 * social media platforms. It includes a button for rating the app on the Google Play Store and
 * buttons for following the app's social media profiles on platforms like Twitter, Facebook,
 * YouTube, Instagram, and LinkedIn. The component applies theme colors and fonts from Redux to
 * ensure a consistent appearance based on the current theme.
 *
 * - **Rate Our App Button:** Opens the app's page on the Google Play Store for users to rate the app.
 * - **Follow Us Section:** Provides buttons for following the app on various social media platforms.
 *
 * @component
 * @example
 * <RateAppScreen />
 *
 * @returns {JSX.Element} The rendered component.
 *
 * @author PRATHAMESH GHORPADE
 */

const RateAppScreen = () => {
  const navigation = useNavigation();
  const {colors, fonts} = useSelector(selectTheme);
  const handleRateApp = () => {
    // Implement logic to open the app's store page for rating
    // Replace 'your-app-id' with your actual app ID on respective platforms
    // Example URLs:
    // iOS: `https://apps.apple.com/app/your-app-id`
    // Android: `https://play.google.com/store/apps/details?id=your-app-id`
    // Windows: `ms-windows-store://pdp/?ProductId=your-app-id`

    // Example: For Android, replace 'your-app-id' with your actual Android app package name
    const androidAppId = 'com.yourcompany.yourapp'; // Replace with your Android package name
    const androidStoreUrl = `https://play.google.com/store/apps/details?id=${androidAppId}`;

    // Open the Google Play Store URL for rating the app
    Linking.openURL(androidStoreUrl).catch(err =>
      console.error('Error opening rating URL:', err),
    );
  };

  const handleFollowSocial = socialPlatform => {
    // Implement logic to open respective social media platform link
    let socialUrl = '';
    switch (socialPlatform) {
      case 'twitter':
        socialUrl = 'https://twitter.com/YourTwitterHandle';
        break;
      case 'facebook':
        socialUrl = 'https://facebook.com/YourFacebookPage';
        break;
      case 'youtube':
        socialUrl = 'https://youtube.com/YourYouTubeChannel';
        break;
      case 'instagram':
        socialUrl = 'https://instagram.com/YourInstagramProfile';
        break;
      case 'linkedin':
        socialUrl = 'https://linkedin.com/company/YourLinkedInPage';
        break;
      default:
        break;
    }
    Linking.openURL(socialUrl).catch(err =>
      console.error('Error opening social URL:', err),
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
            Rate Our App
          </Text>
        </View>
      </View>
      <View style={[styles.container, {backgroundColor: colors.background}]}>
        <View style={styles.content}>
          <Text style={[styles.description, {color: colors.text}]}>
            Enjoying our app? Please take a moment to rate us on your favorite
            platform!
          </Text>
          <TouchableOpacity
            style={[styles.button, {backgroundColor: colors.primary}]}
            onPress={handleRateApp}>
            <Text style={[styles.buttonText, {color: colors.surface}]}>
              Rate Our App
            </Text>
          </TouchableOpacity>
          <Text
            style={[
              styles.socialTitle,
              {color: colors.text, ...fonts.titleMedium},
            ]}>
            Follow Us
          </Text>
          <View style={styles.socialContainer}>
            <TouchableOpacity
              style={[styles.socialButton, {backgroundColor: '#1DA1F2'}]}
              onPress={() => handleFollowSocial('twitter')}>
              <Ionicons name="logo-twitter" size={24} color="#fff" />
              {/* <Text style={styles.socialButtonText}>Twitter</Text> */}
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.socialButton, {backgroundColor: '#3b5998'}]}
              onPress={() => handleFollowSocial('facebook')}>
              <Ionicons name="logo-facebook" size={24} color="#fff" />
              {/* <Text style={styles.socialButtonText}>Facebook</Text> */}
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.socialButton, {backgroundColor: '#c4302b'}]}
              onPress={() => handleFollowSocial('youtube')}>
              <Ionicons name="logo-youtube" size={24} color="#fff" />
              {/* <Text style={styles.socialButtonText}>YouTube</Text> */}
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.socialButton, {backgroundColor: '#C13584'}]}
              onPress={() => handleFollowSocial('instagram')}>
              <Ionicons name="logo-instagram" size={24} color="#fff" />
              {/* <Text style={styles.socialButtonText}>Instagram</Text> */}
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.socialButton, {backgroundColor: '#0077B5'}]}
              onPress={() => handleFollowSocial('linkedin')}>
              <Ionicons name="logo-linkedin" size={24} color="#fff" />
              {/* <Text style={styles.socialButtonText}>LinkedIn</Text> */}
            </TouchableOpacity>
          </View>
        </View>
      </View>
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    width: '100%',
    paddingHorizontal: 20,
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
  },
  button: {
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  socialTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '30%',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  socialButtonText: {
    color: '#fff',
    marginLeft: 8,
  },
});

export default RateAppScreen;
