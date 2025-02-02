import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LazyScreen from './LazyScreen';

const Stack = createStackNavigator();

const WrappedWelComeScreen = props => <LazyScreen name="WelCome" {...props} />;
const WrappedPasswordScreen = props => (
  <LazyScreen name="Password" {...props} />
);
const WrappedOTPVerificationScreen = props => (
  <LazyScreen name="OTPVerification" {...props} />
);
const WrappedRegisterDetailsScreen = props => (
  <LazyScreen name="RegisterDetails" {...props} />
);
const WrappedRegisterPasswordScreen = props => (
  <LazyScreen name="RegisterPassword" {...props} />
);
const WrappedForgotPassword = props => (
  <LazyScreen name="ForgotPassword" {...props} />
);

const AuthStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="WelCome"
      screenOptions={{headerShown: false}}>
      <Stack.Screen 
      name="WelCome" 
      component={WrappedWelComeScreen} 
      />
      <Stack.Screen 
      name="Password" 
      component={WrappedPasswordScreen} 
      />
      <Stack.Screen
        name="OTPVerification"
        component={WrappedOTPVerificationScreen}
      />
      <Stack.Screen
        name="RegisterDetails"
        component={WrappedRegisterDetailsScreen}
      />
      <Stack.Screen
        name="RegisterPassword"
        component={WrappedRegisterPasswordScreen}
      />
      <Stack.Screen name="ForgotPassword" component={WrappedForgotPassword} />
    </Stack.Navigator>
  );
};

export default React.memo(AuthStack);
