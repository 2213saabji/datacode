import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  ScrollView,
} from 'react-native';
import {TextInput} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {selectTheme} from '../../redux/selectors';

import floatImage from '../../assets/AddNewVoterScreen/images/floatImage.png';
import newVoterBanner from '../../assets/AddNewVoterScreen/images/AddNewVoterScreenBanner.png';

/**
 * AddVoterScreen Component
 *
 * This component provides a form for adding new voters, including fields for mobile number, first name, last name,
 * and father/spouse name. It also features an invite section with an invite link and button. The screen includes
 * themed styles for consistency and responsiveness.
 *
 * - **Form Section**: Contains input fields for mobile number, first name, last name, and father/spouse name.
 * - **Next Button**: Navigates to the next step in the process.
 * - **Invite Section**: Includes an invite link and button to encourage users to invite friends.
 * - **Images**: Displays images at the top and bottom of the screen for visual enhancement.
 *
 * @component
 * @example
 * <AddVoterScreen />
 *
 * @returns {JSX.Element} The rendered add voter screen component with dynamic styling based on the current theme.
 *
 * @author SHIVAM GAUTAM
 * @co-author PRATHAMESH GHORPADE
 */

const AddVoterScreen = () => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [fatherSpouseName, setFatherSpouseName] = useState('');

  const {colors, fonts} = useSelector(selectTheme);
  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: colors.background}]}>
      <ScrollView>
        <Image source={newVoterBanner} style={styles.charactersImage} />

        <View style={[styles.formContainer, {backgroundColor: colors.surface}]}>
          <TextInput
            label="Mobile Number"
            value={mobileNumber}
            mode="outlined"
            onChangeText={setMobileNumber}
            style={[
              styles.input,
              {
                backgroundColor: colors.surface,
                borderColor: colors.border,
                ...fonts.bodyLarge,
              },
            ]}
            placeholderTextColor={colors.placeholder}
            outlineColor={colors.placeholder}
            activeOutlineColor={colors.primary}
            textColor={colors.text}
          />
          <TextInput
            label="First Name"
            mode="outlined"
            value={firstName}
            onChangeText={setFirstName}
            style={[
              styles.input,
              {
                backgroundColor: colors.surface,
                borderColor: colors.border,
                ...fonts.bodyLarge,
              },
            ]}
            placeholderTextColor={colors.placeholder}
            outlineColor={colors.placeholder}
            activeOutlineColor={colors.primary}
            textColor={colors.text}
          />
          <TextInput
            label="Last Name"
            value={lastName}
            mode="outlined"
            onChangeText={setLastName}
            style={[
              styles.input,
              {
                backgroundColor: colors.surface,
                borderColor: colors.border,
                ...fonts.bodyLarge,
              },
            ]}
            placeholderTextColor={colors.placeholder}
            outlineColor={colors.placeholder}
            activeOutlineColor={colors.primary}
            textColor={colors.text}
          />
          <TextInput
            label="Father/Spouse Name"
            mode="outlined"
            value={fatherSpouseName}
            onChangeText={setFatherSpouseName}
            style={[
              styles.input,
              {
                backgroundColor: colors.surface,
                borderColor: colors.border,
                ...fonts.bodyLarge,
              },
            ]}
            outlineColor={colors.placeholder}
            placeholderTextColor={colors.placeholder}
            activeOutlineColor={colors.primary}
            textColor={colors.text}
          />
          <TouchableOpacity
            style={[styles.nextButton, {backgroundColor: colors.primary}]}>
            <Text
              style={[
                styles.nextButtonText,
                {color: colors.onPrimary, ...fonts.titleMedium},
              ]}>
              Next
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={[styles.inviteContainer, {backgroundColor: colors.surface}]}>
          <View style={styles.inviteTextContainer}>
            <Text
              style={[
                styles.inviteTitle,
                {color: colors.text, ...fonts.titleLarge},
              ]}>
              Invite
            </Text>
            <Text
              style={[
                styles.inviteTitle,
                {color: colors.text, ...fonts.titleLarge},
              ]}>
              friends and
            </Text>
            <Text
              style={[
                styles.inviteTitle,
                {color: colors.text, ...fonts.titleLarge},
              ]}>
              earn
            </Text>
            <View
              style={[
                styles.inviteLinkContainer,
                {
                  backgroundColor: colors.background,
                  borderColor: colors.border,
                },
              ]}>
              <Text
                style={[
                  styles.inviteLink,
                  {color: colors.placeholder, ...fonts.bodyMedium},
                ]}>
                Invite Link
              </Text>
              <TouchableOpacity
                style={[styles.inviteButton, {backgroundColor: colors.accent}]}>
                <Text
                  style={[
                    styles.inviteButtonText,
                    {color: colors.onAccent, ...fonts.bodySmall},
                  ]}>
                  Invite
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <Image source={floatImage} style={styles.images} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  formContainer: {
    borderRadius: 15,
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 20,
    marginTop: 15,
    // marginBottom: 20,
    shadowOffset: {width: 2, height: 4},
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 5,
  },

  nextButton: {
    height: 45,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  input: {
    marginTop: 10,
  },
  inviteContainer: {
    borderRadius: 15,
    padding: 20,
    marginTop: 100,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
    justifyContent: 'space-between',
  },
  charactersImage: {
    width: '100%',
    height: 150,
    borderRadius: 6,
    marginBottom: 20,
  },
  images: {
    width: 140,
    height: 200,
    alignSelf: 'flex-start',
    left: 20,
    top: -70,
    position: 'absolute',
    marginLeft: 10,
  },
  inviteTextContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginTop: 100,
  },
  inviteTitle: {
    marginTop: 15,
    textAlign: 'left',
  },
  inviteLinkContainer: {
    height: 45,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingHorizontal: 10,
    borderRadius: 6,
    borderWidth: 1,
  },
  inviteLink: {
    flex: 1,
    textAlign: 'center',
  },
  inviteButton: {
    borderRadius: 5,
    width: 65,
    height: 33,
    justifyContent: 'center',
  },
  inviteButtonText: {
    textAlign: 'center',
  },
  nextButtonText: {
    textAlign: 'center',
  },
});

export default AddVoterScreen;
