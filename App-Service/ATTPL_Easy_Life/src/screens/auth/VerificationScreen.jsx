import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {selectTheme} from '../../redux/selectors';
import {Snackbar} from 'react-native-paper';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Alert,
  Text,
} from 'react-native';

import {
  verifyMobileOtp,
  generateMobileOtp,
} from '../../redux/slices/OMS/MobileSlice';
import {
  selectOtpCodeId,
  selectRefId,
} from '../../redux/selectors/OMS/MobileSelectors';
const OTPInputField = ({value, index, onChange, refs}) => {
  const {colors, fonts} = useSelector(selectTheme);

  return (
    <TextInput
      ref={input => {
        refs[index] = input;
      }}
      style={[
        styles.otpInput,
        {
          borderColor: colors.primary,
          color: colors.text,
        },
        fonts.bodyLarge,
      ]}
      keyboardType="number-pad"
      maxLength={1}
      value={value}
      onChangeText={text => onChange(index, text)}
      onKeyPress={({nativeEvent}) => {
        if (nativeEvent.key === 'Backspace' && value === '') {
          const prevField = refs[index - 1];
          if (prevField) prevField.focus();
        }
      }}
    />
  );
};

const OTPVerificationScreen = ({navigation, route}) => {
  const otpCodeId = useSelector(selectOtpCodeId);
  const refId = useSelector(selectRefId);
  const {colors, fonts} = useSelector(selectTheme);
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(60);
  const [isTimerActive, setIsTimerActive] = useState(true);
  const dispatch = useDispatch();
  const {mobileNumber, forgotPasswordScreen} = route.params || {};
  const [visible, setVisible] = React.useState(false);
  const [successotp, setsuccessotp] = React.useState(true);
  const onTrueSnackBar = () => setVisible(true);

  const onFalseSnackBar = () => setVisible(false);
  const [otp, setOtp] = useState(new Array(6).fill(''));
  const [error, setError] = useState(null);
  const inputRefs = [];

  // ----
  const handleRegenerateOtp = async () => {
    if (isTimerActive) {
      Alert.alert(
        'Error',
        'You can only regenerate OTP after the timer expires.',
      );
      return;
    }
    setLoading(true);
    try {
      const response = await dispatch(generateMobileOtp(mobileNumber));
      if (generateMobileOtp.fulfilled.match(response)) {
        setIsTimerActive(true);
        setTimer(60); // Reset the timer
      } else {
        Alert.alert('Error', response.payload || 'Failed to generate OTP');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred while generating OTP');
    } finally {
      setLoading(false);
    }
  };
  // ----

  const handleChange = (index, value) => {
    if (/^\d?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 5) {
        const nextField = inputRefs[index + 1];
        if (nextField) nextField.focus();
      }
    }
  };

  const handleSubmit = async () => {
    if (otp.some(digit => digit === '')) {
      Alert.alert('Error', 'Please enter the complete OTP.');
      return;
    }
    console.log('forgotPasswordScreen=================================>false');
    try {
      const enteredOtp = otp.join('');
      const resultAction = await dispatch(
        verifyMobileOtp({
          otpCode: enteredOtp,
          otpCodeId: otpCodeId,
        }),
      );

      if (verifyMobileOtp.fulfilled.match(resultAction)) {
        setsuccessotp(true);
        onTrueSnackBar();
        setTimeout(() => {
          onFalseSnackBar();
          navigation.navigate('Auth', {
            screen: 'RegisterDetails',
            params: {
              mobileNumber,
            },
          });
        }, 2000);
      } else if (verifyMobileOtp.rejected.match(resultAction)) {
        setsuccessotp(false);
        onTrueSnackBar();
        setTimeout(() => {
          onFalseSnackBar();
        }, 2000);
      }
    } catch (err) {
      setError(err.message || 'An unexpected error occurred');
    }
  };

  const handleNextForgotPasswordToVerification = async () => {
    if (otp.some(digit => digit === '')) {
      Alert.alert('Error', 'Please enter the complete OTP.');
      return;
    }
    try {
      const enteredOtp = otp.join('');
      const resultAction = await dispatch(
        verifyMobileOtp({
          otpCode: enteredOtp,
          otpCodeId: otpCodeId,
        }),
      );
      if (verifyMobileOtp.fulfilled.match(resultAction)) {
        setsuccessotp(true);
        onTrueSnackBar();
        setTimeout(() => {
          onFalseSnackBar();
          navigation.navigate('Auth', {
            screen: 'ForgotPassword',
            params: {
              mobileNumber,
            },
          });
        }, 2000);
      } else if (verifyMobileOtp.rejected.match(resultAction)) {
        setsuccessotp(false);
        onTrueSnackBar();
        setTimeout(() => {
          onFalseSnackBar();
        }, 2000);
      }
    } catch (err) {
      setError(err.message || 'An unexpected error occurred');
    }
  };

  useEffect(() => {
    if (isTimerActive) {
      const interval = setInterval(() => {
        setTimer(prevTimer => {
          if (prevTimer <= 1) {
            clearInterval(interval);
            setIsTimerActive(false);
            return 0;
          }
          return prevTimer - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isTimerActive]);

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: colors.background}]}>
      <View style={styles.logoContainer}>
        <Image
          source={require('../../assets/AppBarAssets/ATTPL_Logo.gif')}
          style={styles.logo}
        />
      </View>
      <View style={styles.content}>
        <Text style={[styles.title, {color: colors.primary}, fonts.titleLarge]}>
          Enter Your Verification OTP Code
        </Text>
        <Text style={[styles.subtitle, {color: colors.text}, fonts.bodyMedium]}>
          Enter your 6 digit Mobile OTP Code
        </Text>
        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <OTPInputField
              key={index}
              value={digit}
              index={index}
              onChange={handleChange}
              refs={inputRefs}
            />
          ))}
        </View>
        <Text
          style={[styles.reference, {color: colors.text}, fonts.bodyMedium]}>
          Reference No. for Mobile OTP Code :{refId}
        </Text>

        <TouchableOpacity
          style={[styles.submitButton, {backgroundColor: colors.primary}]}
          onPress={
            forgotPasswordScreen
              ? handleNextForgotPasswordToVerification
              : handleSubmit
          }>
          <Text style={[styles.submitButtonText, {color: colors.onPrimary}]}>
            {loading ? 'Processing...' : 'Verify OTP'}
          </Text>
        </TouchableOpacity>
        {error && (
          <Text style={[styles.errorText, {color: colors.error}]}>{error}</Text>
        )}
        <Text style={[styles.terms, {color: colors.text}, fonts.bodySmall]}>
          By signing up, I agree to{' '}
          <Text style={[styles.link, {color: colors.primary}, fonts.bodySmall]}>
            Terms of Service
          </Text>{' '}
          and{' '}
          <Text style={[styles.link, {color: colors.primary}, fonts.bodySmall]}>
            Privacy Policy
          </Text>
          .
        </Text>
        {!isTimerActive && (
          <TouchableOpacity onPress={handleRegenerateOtp} disabled={loading}>
            <Text style={[styles.regenerateText, {color: colors.primary}]}>
              Regenerate OTP
            </Text>
          </TouchableOpacity>
        )}
        {isTimerActive && (
          <Text style={[styles.timerText, {color: colors.text}]}>
            Time remaining: {timer}s
          </Text>
        )}
      </View>
      <View style={styles.snackbarContainer}>
        <Snackbar
          visible={visible}
          // onDismiss={onDismissSnackBar}
          action={{
            // label: 'Undo',
            onPress: () => {
              // Do something
            },
          }}>
          {successotp ? 'Otp is Verified Successfully' : 'Otp is Wrong'}
        </Snackbar>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logoContainer: {
    position: 'absolute',
    top: 30,
    left: 20,
  },
  logo: {
    width: 100,
    height: 100,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    lineHeight: 28,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    lineHeight: 22,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  otpInput: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    textAlign: 'center',
    fontSize: 18,
  },
  reference: {
    marginBottom: 20,
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 22,
  },
  submitButton: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginBottom: 20,
  },
  submitButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  terms: {
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 22,
  },
  link: {
    textDecorationLine: 'underline',
  },
  regenerateText: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: 10,
    textDecorationLine: 'underline',
  },
  timerText: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: 10,
  },
  snackbarContainer: {
    position: 'absolute',
    top: 100,
    width: '100%',
    alignItems: 'center',
  },
});

export default OTPVerificationScreen;
