import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LazyScreen from '../LazyScreen';

const Stack = createStackNavigator();

const WrappedComplaintSection = props => (
  <LazyScreen name="ComplaintSection" {...props} />
);

const WrappedComplaintSectionInner = props => (
  <LazyScreen name="ComplaintSectionInner" {...props} />
);

const WrappedEmailForm = props => <LazyScreen name="mailForm" {...props} />;

const ComplaintSectionStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="ComplaintSection">
      <Stack.Screen
        name="ComplaintSection"
        component={WrappedComplaintSection}
      />
      <Stack.Screen
        name="ComplaintSectionInner"
        component={WrappedComplaintSectionInner}
      />
      <Stack.Screen name="mailForm" component={WrappedEmailForm} />
    </Stack.Navigator>
  );
};

export default ComplaintSectionStack;
