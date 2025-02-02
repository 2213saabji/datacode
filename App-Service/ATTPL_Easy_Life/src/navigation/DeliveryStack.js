import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LazyScreen from './LazyScreen';

const Stack = createStackNavigator();

const DeliveryRequestFormScreen = props => (<LazyScreen name="DeliveryRequestForm" {...props} />);
const DeliveryListRenderFormScreen = props => (<LazyScreen name="DeliveryListRenderForm" {...props} />);
const DeliveryRenderDetailsFormScreen = props => (<LazyScreen name="DeliveryRenderDetailsForm" {...props} />);


const DeliveryStackNavigator = ({screenName}) => {
  const initialScreen = screenName || 'DeliveryListRenderForm';

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={initialScreen}>
      <Stack.Screen
        name="DeliveryRequestForm"
        component={DeliveryRequestFormScreen}
      />
      <Stack.Screen
        name="DeliveryListRenderForm"
        component={DeliveryListRenderFormScreen}
      />
      <Stack.Screen
        name="DeliveryRenderDetailsForm"
        component={DeliveryRenderDetailsFormScreen}
      />
    </Stack.Navigator>
  );
};

export default DeliveryStackNavigator;
