import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import {TextInput, } from 'react-native-paper';
import {useSelector, useDispatch} from 'react-redux';
import {selectTheme} from '../../redux/selectors';

import {
  loginUser,
  registerUser,
  userAvailability,
  registerForgotPasword,
  updateScriptData,
} from '../../redux/slices/UMS/authSlice';
import { Snackbar} from 'react-native-paper';


const RegisterPasswordScreen = ({navigation, route}) => {
  const dispatch = useDispatch();
  const {colors, fonts} = useSelector(selectTheme);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [bothPassFill, setbothPassFill] = useState(true);
  const {mobileNumber, firstName, lastName, fatherName, state} =
    route.params || {};
  const [snackmessage, setsnackmessage] = useState('');
  const [visible, setVisible] = React.useState(false);
  const [scriptUser, setScriptUser] = useState(false);
  const onTrueSnackBar = message => {
    setsnackmessage(message);
    setVisible(true);
    setTimeout(() => {
      onFalseSnackBar();
    }, 2000);
  };
  const onFalseSnackBar = () => setVisible(false);

  const togglePasswordVisibility = () => {
    setShowPassword(prevState => !prevState);
  };
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(prevState => !prevState);
  };

  const handleSubmit = async () => {
    if (password === '' || confirmPassword === '') {
      onTrueSnackBar('pls fill both fields');
    } else if (password != confirmPassword) {
      onTrueSnackBar('Password and Confirm Password should be Matched');
    } else if (password.length < 6) {
      onTrueSnackBar('Password must be at least 6 characters long.');
    } else {
      try {
        setLoading(true);
        setError(null);
        const dataToSend = {
          userRoleId: 9,
          phone: mobileNumber,
          password,
          firstName,
          lastName,
          fatherName,
          userState: state,
          isMobileVerified: true,
          isEmailVerified: false,
        };
        const result = await dispatch(registerUser(dataToSend));
        if (registerUser.fulfilled.match(result)) {
          navigation.navigate('Main');
        } else {
          // Handle failed login
          setError(result.payload || 'Registeration failed. Please try again.');
        }
      } catch (err) {
        setError(err.message || 'An unexpected error occurred');
      } finally {
        setLoading(false);
      }
    }
  };
  const onSubmitUpdateDetails = async () => {
    try {
      if (password === '' || confirmPassword === '') {
        onTrueSnackBar('pls fill both fields');
      } else if (password != confirmPassword) {
        onTrueSnackBar('Password and Confirm Password should be Matched');
      } else if (password.length < 6) {
        onTrueSnackBar('Password must be at least 6 characters long.');
      } else {
        const result = await dispatch(
          registerForgotPasword({phone: mobileNumber, password}),
        );
        if (registerForgotPasword.fulfilled.match(result)) {
          const dataa = {
            firstName,
            lastName,
            fatherName,
            userState: state,
            isMobileVerified: true,
          };
          const res = await dispatch(
            updateScriptData({num: mobileNumber, dataa}),
          );
          if (updateScriptData.fulfilled.match(res)) {
            const result = await dispatch(
              loginUser({phone: mobileNumber, password}),
            );
            if (loginUser.fulfilled.match(result)) {
              navigation.navigate('Main');
            } else {
              setError(
                result.payload ||
                  'An unexpected error occurred While Registeration',
              );
              onTrueSnackBar(
                'An unexpected error occurred While Registeration',
              );
            }
          } else if (updateScriptData.rejected.match(res)) {
            onTrueSnackBar('An unexpected error occurred');
          }
        } else if (registerForgotPasword.rejected.match(result)) {
          onTrueSnackBar('Pls use different Password');
        }
      }
    } catch (error) {
      setError(err.message || 'An unexpected error occurred');
      onTrueSnackBar('An unexpected error occurred');
    }
  };
  const checkUserAvailability = async () => {
    try {
      const phoneNumber = {phone: mobileNumber};
      const result = await dispatch(userAvailability(phoneNumber));
      if (userAvailability.fulfilled.match(result)) {
        if (
          typeof result.payload === 'object' &&
          !result.payload.isMobileVerified
        ) {
          setScriptUser(true);
        }
      }
    } catch (error) {
      setError(err.message || 'An unexpected error occurred');
    }
  };

  useEffect(() => {
    checkUserAvailability();
  }, []);

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: colors.background}]}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Image
            source={require('../../assets/AppBarAssets/ATTPL_Logo.gif')}
            style={styles.logo}
          />
        </View>
        <View style={styles.body}>
          <Text
            style={[styles.title, {color: colors.primary}, fonts.titleLarge]}>
            Register Your Password
          </Text>

          <View style={styles.inputContainer}>
            <TextInput
              mode="outlined"
              label="Password"
              placeholder="Enter your password"
              secureTextEntry={!showPassword}
              value={password}
              keyboardType="visible-password"
              onChangeText={setPassword}
              style={[
                styles.input,
                {
                  backgroundColor: colors.surface,
                  color: colors.onSurface,
                  borderColor: colors.placeholder,
                },
              ]}
              right={
                <TextInput.Icon
                  icon={showPassword ? 'eye' : 'eye-off'}
                  onPress={togglePasswordVisibility}
                  color={colors.placeholder}
                />
              }
              textColor={colors.text}
              outlineColor={colors.backdrop}
              activeOutlineColor={colors.primary}
              placeholderTextColor={colors.placeholder}
            />
            <TextInput
              mode="outlined"
              label="Confirm Password"
              placeholder="Confirm your password"
              secureTextEntry={!showConfirmPassword}
              value={confirmPassword}
              keyboardType="visible-password"
              onChangeText={setConfirmPassword}
              style={[
                styles.input,
                {
                  backgroundColor: colors.surface,
                  color: colors.onSurface,
                  borderColor: colors.placeholder,
                },
              ]}
              right={
                <TextInput.Icon
                  icon={showConfirmPassword ? 'eye' : 'eye-off'}
                  onPress={toggleConfirmPasswordVisibility}
                  color={colors.placeholder}
                />
              }
              textColor={colors.text}
              outlineColor={colors.backdrop}
              activeOutlineColor={colors.primary}
              placeholderTextColor={colors.placeholder}
            />
          </View>

          <TouchableOpacity
            style={[styles.submitButton, {backgroundColor: colors.primary}]}
            onPress={scriptUser ? onSubmitUpdateDetails : handleSubmit}
            disabled={loading}>
            <Text
              style={[
                styles.submitButtonText,
                {color: colors.onPrimary},
                fonts.button,
              ]}>
              {loading ? 'Register...' : 'Register'}
            </Text>
          </TouchableOpacity>

          {error && (
            <Text style={[styles.errorText, {color: colors.error}]}>
              {error}
            </Text>
          )}

          <Text style={[styles.terms, {color: colors.text}, fonts.bodySmall]}>
            By Sign Up, I agree to{' '}
            <Text
              style={[styles.link, {color: colors.primary}]}
              onPress={() => Alert.alert('Terms of Service')}>
              Terms of Service
            </Text>{' '}
            and{' '}
            <Text
              style={[styles.link, {color: colors.primary}]}
              onPress={() => Alert.alert('Privacy Policy')}>
              Privacy Policy
            </Text>
            .
          </Text>
        </View>
      </ScrollView>
      <View style={styles.snackbarContainer}>
        <Snackbar visible={visible}>{snackmessage}</Snackbar>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  header: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginVertical: 20,
  },
  logo: {
    width: 100,
    height: 100,
  },
  body: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 30,
    textAlign: 'center',
    lineHeight: 28,
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    height: 50,
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 22,
  },
  submitButton: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 30,
  },
  submitButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  terms: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 22,
    marginTop: 20,
  },
  link: {
    textDecorationLine: 'underline',
  },
  errorText: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: 14,
    fontWeight: 'bold',
  },
  snackbarContainer: {
    position: 'absolute',
    top: 100,
    width: '100%',
    alignItems: 'center',
  },
});

export default RegisterPasswordScreen;
