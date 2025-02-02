import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LazyScreen from './LazyScreen';

const Stack = createStackNavigator();

const WrappedCablist = props => <LazyScreen name="CabList" {...props} />;
const WrappedCabDetails = props => <LazyScreen name="CabDetails" {...props} />;
const WrappedCabbooking = props => <LazyScreen name="CabForm" {...props} />;
const WrappedCabedit = props => <LazyScreen name="CabFormEdit" {...props} />;

const CabServiceNavigator = ({screenName}) => {
  const initialScreen = screenName || 'CabList';

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={initialScreen}>
      <Stack.Screen name="CabList" component={WrappedCablist} />
      <Stack.Screen name="CabDetails" component={WrappedCabDetails} />
      <Stack.Screen name="CabForm" component={WrappedCabbooking} />
      <Stack.Screen name="CabFormEdit" component={WrappedCabedit} />
    </Stack.Navigator>
  );
};

export default CabServiceNavigator;
