import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LazyScreen from '../LazyScreen';

const Stack = createStackNavigator();

const WrappedGovernmentScheme = props => (
  <LazyScreen name="GovernmentScheme" {...props} />
);

const WrappedGovernmentSchemeInner = props => (
  <LazyScreen name="GovernmentSchemeInner" {...props} />
);

const GovernmentSchemeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="GovernmentScheme">
      <Stack.Screen
        name="GovernmentScheme"
        component={WrappedGovernmentScheme}
      />
      <Stack.Screen
        name="GovernmentSchemeInner"
        component={WrappedGovernmentSchemeInner}
      />
    </Stack.Navigator>
  );
};

export default GovernmentSchemeStack;
