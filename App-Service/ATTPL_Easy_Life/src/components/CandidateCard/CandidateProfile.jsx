import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {Icon} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {selectTheme} from '../../redux/selectors';

/**
 * CandidateProfileCard Component
 *
 * This component displays a profile card for a candidate, including a background image, profile image,
 * name, position, social media icons, and a button for more details. The component uses theme colors and
 * fonts from the Redux store for consistent styling across the application.
 *
 * - **Background Image**: Displays an image that serves as the background for the profile card.
 * - **Overlay**: Adds a semi-transparent overlay on top of the background image for better contrast.
 * - **Profile Image**: Shows the candidate's profile picture with a border.
 * - **Name and Position**: Displays the candidate's name and position with customized fonts and colors.
 * - **Social Icons**: Includes icons for various social media platforms styled according to the theme.
 * - **Detail Information Button**: A button to view more details about the candidate, styled based on the theme.
 *
 * @component
 * @example
 * <CandidateProfileCard />
 *
 * @returns {JSX.Element} The rendered profile card component with dynamic styling based on the current theme.
 *
 * @author SHIVAM GAUTAM
 * @co-author PRATHAMESH GHORPADE
 */

const CandidateProfileCard = () => {
  const {colors, fonts} = useSelector(selectTheme);

  return (
    <View style={[styles.card, {backgroundColor: colors.surface}]}>
      {/* Background image */}
      <Image
        source={require('../../assets/images/back.png')}
        style={styles.backgroundImage}
      />
      {/* Overlay for background image */}
      <View style={styles.overlay} />

      {/* Profile image */}
      <Image
        source={require('../../assets/images/Avatar.png')}
        style={styles.profileImage}
      />

      {/* Name and position */}
      <Text
        style={[
          styles.name,
          {color: colors.text, fontFamily: fonts.labelMedium},
        ]}>
        Narendra Modi
      </Text>
      <Text
        style={[
          styles.position,
          {color: colors.text, fontFamily: fonts.labelMedium},
        ]}>
        P.M.
      </Text>

      {/* Social icons */}
      <View style={styles.socialIcons}>
        <Icon
          icon="facebook"
          type="font-awesome"
          color={colors.facebook}
          style={styles.icon}
        />
        <Icon
          icon="instagram"
          type="font-awesome"
          color={colors.instagram}
          style={styles.icon}
        />
        <Icon
          icon="linkedin"
          type="font-awesome"
          color={colors.linkedin}
          style={styles.icon}
        />
        <Icon
          icon="twitter"
          type="font-awesome"
          color={colors.twitter}
          style={styles.icon}
        />
      </View>

      {/* Detail information button */}
      <TouchableOpacity
        style={[styles.button, {backgroundColor: colors.primary}]}
        onPress={() => {
          // Handle button press
        }}>
        <Text style={[styles.buttonText, {color: colors.surface}]}>
          Detail Information
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '100%', // Adjust width as needed
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    paddingVertical: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  backgroundImage: {
    width: '100%',
    height: 250,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  overlay: {
    width: '100%',
    height: 250,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: 100, // Adjust position as needed
    borderWidth: 3,
    borderColor: '#fff',
    zIndex: 1, // Ensure profile image stays above overlay
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    color: '#fff', // Adjust color if necessary
  },
  position: {
    fontSize: 18,
    color: '#ddd', // Adjust color if necessary
    marginBottom: 20,
  },
  socialIcons: {
    flexDirection: 'row',
    marginTop: 10,
  },
  icon: {
    marginHorizontal: 10,
  },
  button: {
    marginTop: 20,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 20,
    backgroundColor: '#007bff',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default CandidateProfileCard;
