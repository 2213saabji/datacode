import React, {useState} from 'react';
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

import {loginUser} from '../../redux/slices/UMS/authSlice';


const PasswordScreen = ({navigation, route}) => {
  const dispatch = useDispatch();
  const {colors, fonts} = useSelector(selectTheme);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const {mobileNumber} = route.params || {};

  const togglePasswordVisibility = () => {
    setShowPassword(prevState => !prevState);
  };

  const handleSubmit = async () => {
    if (!mobileNumber) {
      Alert.alert('Error', 'Mobile number is missing.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const result = await dispatch(loginUser({phone: mobileNumber, password}));

      if (loginUser.fulfilled.match(result)) {
        navigation.navigate('Main');
      } else {
        setError(result.payload || 'Login failed. Please try again.');
      }
    } catch (err) {
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleNextForgotPassword = async () => {
    try {
      navigation.navigate('Auth', {
        screen: 'WelCome',
        params: {
          forgotPasswordScreen: true,
        },
      });
    } catch (error) {
      setDialogMessage('Some Error Occurs');
      setDialogVisible(true);
    }
  };

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
            Enter Your Password
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
          </View>
          <TouchableOpacity onPress={handleNextForgotPassword}>
            <Text
              style={[
                {color: colors.primary, textAlign: 'right'},
                fonts.bodyLarge,
              ]}>
              Forgot Password
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.submitButton, {backgroundColor: colors.primary}]}
            onPress={handleSubmit}
            disabled={loading}>
            <Text
              style={[
                styles.submitButtonText,
                {color: colors.onPrimary},
                fonts.button,
              ]}>
              {loading ? 'Logging in...' : 'Log In'}
            </Text>
          </TouchableOpacity>

          {error && (
            <Text style={[styles.errorText, {color: colors.error}]}>
              {error}
            </Text>
          )}

          <Text style={[styles.terms, {color: colors.text}, fonts.bodySmall]}>
            By signing in, I agree to{' '}
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
    alignItems: 'flex-start',
    margin: 20,
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
});

export default PasswordScreen;
