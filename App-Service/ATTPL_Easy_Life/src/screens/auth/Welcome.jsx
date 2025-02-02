import React, {useState, useEffect} from 'react';
import {SafeAreaView, StyleSheet, View, Image, Alert} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Text, TextInput,  Dialog, Button} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {selectTheme} from '../../redux/selectors';
import {useCustomAlert} from '../../utilities/Alert/useCustomAlert';
import {
  fetchUserData,
  fetchUserFromPhone,
} from '../../redux/slices/UMS/authSlice';
import {generateMobileOtp} from '../../redux/slices/OMS/MobileSlice';

const WelcomeScreen = ({navigation, route}) => {
  const dispatch = useDispatch();
  const {showAlert} = useCustomAlert();
  const theme = useSelector(selectTheme);
  const {forgotPasswordScreen} = route.params || {};

  const {colors, fonts} = theme;
  const [mobileNumber, setMobileNumber] = useState('');
  const [dialogVisible, setDialogVisible] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const result = await dispatch(fetchUserData());
        if (fetchUserData.fulfilled.match(result)) {
          navigation.replace('Main');
        } else {
          console.log('User not authenticated or fetch failed:', result);
        }
      } catch (error) {
        console.log('Error fetching user data:', error);
      }
    };

    checkAuthentication();
  }, [dispatch, navigation]);

  const handleNext = async () => {
    const mobileNumberTrimmed = mobileNumber.trim();
    if (mobileNumberTrimmed.length < 10 || !/^\d+$/.test(mobileNumberTrimmed)) {
      showAlert('Please enter a valid mobile number.', 'error');
      return;
    }
    
    try {
      const response = await dispatch(fetchUserFromPhone(mobileNumberTrimmed));
      if (fetchUserFromPhone.fulfilled.match(response)) {
        if (
          typeof response.payload.data.data === 'object' &&
          response.payload.data.data.isMobileVerified
        ) {
          navigation.navigate('Auth', {
            screen: 'Password',
            params: {mobileNumber: mobileNumberTrimmed},
          });
        }
        if (
          (typeof response.payload.data.data === 'object' &&
            !response.payload.data.data.isMobileVerified) ||
            typeof response.payload.data.data === 'boolean'
          ) {
            const response = await dispatch(
            generateMobileOtp(mobileNumberTrimmed),
          ).unwrap();
          if (
            response.message === 'Successfully sent OTP to your Mobile Number'
          ) {
            navigation.navigate('Auth', {
              screen: 'OTPVerification',
              params: {
                mobileNumber: mobileNumberTrimmed,
                otpRefs: response?.data?.data?.otpRefs,
                otpCodeId: response?.data?.data?.otpCodeId,
                otpExpiry: response?.data?.data?.otpExpiry,
                ShowTimer: true,
              },
            });
          } else {
            setDialogMessage('Error Occur While sending OTP');
          }
        }
      }
    } catch (error) {
      setDialogMessage('User not registered. Please sign up.');
      setDialogVisible(true);
    }
  };
  const handleNextForgotPasswordToVerification = async () => {
    const mobileNumberTrimmed = mobileNumber.trim();
    if (mobileNumberTrimmed.length < 10 || !/^\d+$/.test(mobileNumberTrimmed)) {
      Alert.alert('Invalid Input', 'Please enter a valid mobile number.');
      return;
    }

    try {
      const response = await dispatch(
        generateMobileOtp(mobileNumberTrimmed),
      ).unwrap();
      if (response.message === 'Successfully sent OTP to your Mobile Number') {
        navigation.navigate('Auth', {
          screen: 'OTPVerification',
          params: {
            mobileNumber: mobileNumberTrimmed,
            otpRefs: response?.data?.data?.otpRefs,
            otpCodeId: response?.data?.data?.otpCodeId,
            otpExpiry: response?.data?.data?.otpExpiry,
            ShowTimer: true,
            forgotPasswordScreen: true,
          },
        });
      } else {
        setDialogMessage('Error Occur While sending OTP');
      }
    } catch (error) {
      setDialogMessage('User not registered. Please sign up.');
      setDialogVisible(true);
    }
  };

  const handleDialogClose = () => {
    setDialogVisible(false);
    navigation.navigate('Auth', {
      screen: 'SignUp',
      params: {mobileNumber: mobileNumber.trim()},
    });
  };

  return (
    <SafeAreaView
      style={[loginStyles.container, {backgroundColor: colors.background}]}>
      <View style={loginStyles.header}>
        <Image
          source={require('../../assets/AppBarAssets/ATTPL_Logo.gif')}
          style={loginStyles.logo}
        />
      </View>
      <View style={loginStyles.loginForm}>
        <Text
          style={[
            loginStyles.welcomeText,
            fonts.titleLarge,
            {color: colors.primary},
          ]}>
          Welcome to ATTPL Group
        </Text>
        <Text
          style={[
            loginStyles.instructionText,
            fonts.bodyLarge,
            {color: colors.text},
          ]}>
          Please provide your mobile number, excluding the country code (+91).
        </Text>
        <View style={loginStyles.inputContainer}>
          <TextInput
            mode="outlined"
            label="Mobile Number"
            placeholder="Type something"
            keyboardType="phone-pad"
            value={mobileNumber}
            textColor={colors.text}
            onChangeText={text => setMobileNumber(text)}
            right={
              <TextInput.Affix
                text="/100"
                style={[loginStyles.affix, {color: colors.primary}]}
              />
            }
            style={[
              loginStyles.input,
              {
                backgroundColor: colors.surface,
                color: colors.text,
              },
            ]}
            outlineStyle={{borderRadius: 5}}
            outlineColor={colors.backdrop}
            activeOutlineColor={colors.primary}
            placeholderTextColor={colors.placeholder}
          />
        </View>
        <TouchableOpacity
          onPress={
            forgotPasswordScreen
              ? handleNextForgotPasswordToVerification
              : handleNext
          }>
          <View
            style={[loginStyles.nextButton, {backgroundColor: colors.primary}]}>
            <Text style={[loginStyles.buttonText, {color: colors.onPrimary}]}>
              Next
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Dialog Component */}
      <Dialog visible={dialogVisible} onDismiss={() => setDialogVisible(false)}>
        <Dialog.Title>Error</Dialog.Title>
        <Dialog.Content>
          <Text>{dialogMessage}</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={handleDialogClose}>OK</Button>
        </Dialog.Actions>
      </Dialog>
    </SafeAreaView>
  );
};

const loginStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 100,
    margin: 10,
    position: 'absolute',
  },
  loginForm: {
    paddingVertical: 120,
    paddingHorizontal: 24,
  },
  welcomeText: {
    textAlign: 'left',
    marginVertical: 10,
  },
  instructionText: {
    textAlign: 'left',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 35,
    borderRadius: 8,
  },
  input: {
    fontSize: 14,
    borderRadius: 8,
    fontFamily: 'PublicSans-Regular',
  },
  nextButton: {
    width: '100%',
    height: 48,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 15,
    fontWeight: '700',
    fontFamily: 'PublicSans-Regular',
    lineHeight: 26,
  },
  affix: {
    fontFamily: 'PublicSans-Regular',
  },
});

export default WelcomeScreen;
