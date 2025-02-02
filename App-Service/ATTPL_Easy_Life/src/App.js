import React, {useCallback, useEffect, useState} from 'react';
import {NavigationContainer, useFocusEffect} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Linking} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import AuthStack from './navigation/AuthStack';
import DrawerNavigator from './navigation/DrawerNavigator';
import {enableDebugging} from './debug';
import useAuth from './hooks/useAuth';
import SplashScreen from 'react-native-splash-screen';
import {
  checkPayment,
  initializeAuth,
  PaymentStatusGetter,
  setOpen,
} from './redux/slices/UMS/authSlice';
import {setTheme} from './redux/slices/themeSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {AlertProvider, useCustomAlert} from './utilities/Alert/useCustomAlert';
import {NavigationProvider} from './navigation/NavigationContext';
import LotteiSplashScreen from './screens/SplashScreen/SplashScreen';
import RazorPayPaymentScreen from './screens/PaymentScreen/PaymentScreen';
import {selectUser} from './redux/selectors/UMS/authSelectors';
import {MenuProvider} from 'react-native-popup-menu';

const Stack = createStackNavigator();

function AppNavigator() {
  const user = useSelector(selectUser);
  const {showAlert} = useCustomAlert();
  const {isAuthenticated, openModal, open} = useAuth();
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useFocusEffect(
    useCallback(() => {
      const initialize = async () => {
        try {
          await dispatch(initializeAuth());
        } catch (error) {
          console.error('Error during initialization:', error);
        } finally {
          setLoading(false);
        }
      };

      const loadTheme = async () => {
        try {
          const storedTheme = await AsyncStorage.getItem('theme');
          if (storedTheme) {
            dispatch(setTheme(storedTheme));
          }
        } catch (error) {
          console.error('Error loading theme:', error);
        }
      };

      loadTheme();
      initialize();
    }, [dispatch]),
  );
  const onSubmitUserDetails = async () => {
    try {
      const response = await dispatch(PaymentStatusGetter({}));
      if (PaymentStatusGetter.fulfilled.match(response)) {
        const phone = user?.phone;
        const paymentCheckData = await dispatch(checkPayment({phone}));
        if (checkPayment.fulfilled.match(paymentCheckData)) {
          if (paymentCheckData?.payload?.data?.data?.paymentStatus) {
            dispatch(setOpen(false));
          } else if (response?.payload?.data?.data?.showPaymentPage) {
            AsyncStorage.setItem(
              'togglePayment',
              response?.data?.data?.showPaymentPage,
            );
            dispatch(setOpen(true));
          } else {
            dispatch(setOpen(false));
          }
        } else if (checkPayment.rejected.match(paymentCheckData)) {
          dispatch(setOpen(true));
          showAlert('An unexpected error occurred', 'error');
        }
      } else if (PaymentStatusGetter.rejected.match(response)) {
        dispatch(setOpen(true));
        showAlert('An unexpected error occurred', 'error');
      }
    } catch (error) {
      console.error(error);
      showAlert('An unexpected error occurred', 'error');
    }
  };

  useEffect(() => {
    onSubmitUserDetails();
    setTimeout(() => {
      if (open) {
        onSubmitUserDetails();
      }
    }, 5000);
  }, [isAuthenticated]);

  if (loading) {
    return <LotteiSplashScreen />;
  }

  return (
    <>
      {/* {isLoading && <LoadingScreen />} */}
      <Stack.Navigator
        initialRouteName={isAuthenticated ? 'Main' : 'Auth'}
        screenOptions={{headerShown: false}}>
        {!isAuthenticated ? (
          <Stack.Screen
            name="Auth"
            component={AuthStack}
            options={{headerShown: false}}
          />
        ) : openModal ? (
          <>
            <Stack.Screen
              name="Payment"
              component={RazorPayPaymentScreen}
              options={{headerShown: false}}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Main"
              component={DrawerNavigator}
              options={{headerShown: false}}
            />
          </>
        )}
      </Stack.Navigator>
    </>
  );
}

export default function App() {
  useEffect(() => {
    SplashScreen.hide();

    const handleDeepLink = event => {
      const url = event.url;
    };

    enableDebugging();
    Linking.addEventListener('url', handleDeepLink);

    Linking.getInitialURL().then(url => {
      if (url) {
        handleDeepLink({url});
      }
    });

    return () => {
      // Linking.removeEventListener('url', handleDeepLink);
    };
  }, []);

  return (
    <AlertProvider>
      <MenuProvider>
        <NavigationContainer>
          <NavigationProvider>
            <AppNavigator />
          </NavigationProvider>
        </NavigationContainer>
      </MenuProvider>
    </AlertProvider>
  );
}
