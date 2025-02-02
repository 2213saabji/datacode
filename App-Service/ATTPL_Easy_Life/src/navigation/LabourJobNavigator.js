import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LazyScreen from './LazyScreen';

const Stack = createStackNavigator();

const WrappedLabourJobList = props => (
  <LazyScreen name="LabourJobList" {...props} />
);
const WrappedJobDetailsView = props => (
  <LazyScreen name="JobDetails" {...props} />
);
const WrappedJobCreateView = props => (
  <LazyScreen name="JobCreate" {...props} />
);
const WrappedJobUpdateView = props => (
  <LazyScreen name="JobUpdate" {...props} />
);

const LabourJobNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="LabourJobList">
      <Stack.Screen name="LabourJobList" component={WrappedLabourJobList} />
      <Stack.Screen name="JobDetails" component={WrappedJobDetailsView} />
      <Stack.Screen name="JobCreate" component={WrappedJobCreateView} />
      <Stack.Screen name="JobUpdate" component={WrappedJobUpdateView} />
    </Stack.Navigator>
  );
};

export default LabourJobNavigator;
