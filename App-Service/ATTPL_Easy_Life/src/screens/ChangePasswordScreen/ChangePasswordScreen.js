import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {TextInput} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import {selectTheme} from '../../redux/selectors';

import {useNavigation} from '@react-navigation/native';
import {ChangePassword} from '../../redux/slices/UMS/authSlice';
import {useCustomAlert} from '../../utilities/Alert/useCustomAlert';
/**
 * ChangePasswordScreen Component
 *
 * This component provides a user interface for changing the password. It allows users
 * to input their current password, new password, and confirm the new password. The
 * component includes validation to ensure that the new password and confirmation match
 * before proceeding with the password change. It utilizes Redux to access theme settings
 * for consistent styling.
 *
 * - **Navigation:** Allows users to navigate back to the previous screen.
 * - **Password Change Logic:** Validates that the new password and confirmation match
 *   before proceeding with the password change. Displays console messages based on
 *   the success or failure of the operation.
 * - **Theme Integration:** Uses Redux to select the current theme and applies it to styles.
 * - **Form Elements:** Includes TextInput fields for current, new, and confirmed passwords,
 *   and a button to initiate the password change. Also displays informational text about
 *   password requirements.
 *
 * @component
 * @example
 * <ChangePasswordScreen />
 *
 * @returns {JSX.Element} The rendered component.
 *
 * @author SHIVAM GAUTAM
 * @co-author PRATHAMESH GHORPADE
 */

const ChangePasswordScreen = () => {
  const navigation = useNavigation();
  const {colors, fonts} = useSelector(selectTheme);
  const dispatch = useDispatch();
  const {showAlert} = useCustomAlert();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleChangePassword = async () => {
    // Logic to handle changing password
    if (!currentPassword || !newPassword || !confirmPassword) {
      showAlert('Fill all the Fields', 'warning');
    } else if (newPassword != confirmPassword) {
      showAlert('Confirm password Should be Same as New Password', 'warning');
    } else if (newPassword.length < 6 || newPassword.length > 12) {
      showAlert('Password must be in between 6 to 12 characters', 'warning');
    } else {
      try {
        const data = {
          oldPassword: currentPassword,
          newPassword: newPassword,
        };
        const res = await dispatch(ChangePassword({data}));
        if (ChangePassword.fulfilled.match(res)) {
          showAlert('Password is Changed Successfully', 'success');
          setCurrentPassword('');
          setNewPassword('');
          setConfirmPassword('');
        } else if (ChangePassword.rejected.match(res)) {
          if (res.payload.message === 'Incorrect Password') {
            showAlert('Enter the Correct Current Password', 'error');
          }
        }
      } catch (error) {
        showAlert(error || 'An unexpected error occurred', 'error');
      }
    }
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
            Change Password
          </Text>
        </View>
      </View>
      <View style={[styles.container, {backgroundColor: colors.background}]}>
        <View style={styles.formContainer}>
          <TextInput
            label="Current Password"
            value={currentPassword}
            onChangeText={text => setCurrentPassword(text)}
            style={[styles.input, {backgroundColor: colors.surface}]}
            theme={{colors: {primary: colors.primary}}}
            secureTextEntry
          />
          <TextInput
            label="New Password"
            value={newPassword}
            onChangeText={text => setNewPassword(text)}
            style={[styles.input, {backgroundColor: colors.surface}]}
            theme={{colors: {primary: colors.primary}}}
            secureTextEntry
          />
          <TextInput
            label="Confirm New Password"
            value={confirmPassword}
            onChangeText={text => setConfirmPassword(text)}
            style={[styles.input, {backgroundColor: colors.surface}]}
            theme={{colors: {primary: colors.primary}}}
            secureTextEntry
          />
          <TouchableOpacity
            style={[styles.button, {backgroundColor: colors.primary}]}
            onPress={handleChangePassword}>
            <Text style={[styles.buttonText, {color: colors.surface}]}>
              Change Password
            </Text>
          </TouchableOpacity>
          <Text style={[styles.infoText, {color: colors.text}]}>
            Passwords must be at least 8 characters long and should include
            numbers, symbols, and both uppercase and lowercase letters.
          </Text>
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
  formContainer: {
    width: '100%',
  },
  input: {
    marginBottom: 16,
    fontSize: 16,
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
  infoText: {
    fontSize: 14,
    marginTop: 8,
    textAlign: 'center',
  },
});

export default ChangePasswordScreen;
