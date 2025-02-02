import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LazyScreen from './LazyScreen';

const Stack = createStackNavigator();

const WrappedAppointmentListViews = props => (
  <LazyScreen name="CandidateAppointmentList" {...props} />
);
const WrappedAppointmentDetailsViews = props => (
  <LazyScreen name="CandidateAppointmentDetails" {...props} />
);
const WrappedAppointmentCreateViews = props => (
  <LazyScreen name="CandidateAppointmentForm" {...props} />
);
const WrappedAppointmentEdit = props => (
  <LazyScreen name="CandidateAppointmentFormEdit" {...props} />
);

const CannidateAppointmentNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="CandidateAppointmentList">
      <Stack.Screen
        name="CandidateAppointmentList"
        component={WrappedAppointmentListViews}
      />
      <Stack.Screen
        name="CandidateAppointmentDetails"
        component={WrappedAppointmentDetailsViews}
      />
      <Stack.Screen
        name="CandidateAppointmentForm"
        component={WrappedAppointmentCreateViews}
      />
      <Stack.Screen
        name="CandidateAppointmentFormEdit"
        component={WrappedAppointmentEdit}
      />
    </Stack.Navigator>
  );
};

export default CannidateAppointmentNavigator;
