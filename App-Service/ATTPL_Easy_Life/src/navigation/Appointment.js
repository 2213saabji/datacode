import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LazyScreen from './LazyScreen';

const WrappedDoctorBookAppointment = props => (
  <LazyScreen name="DoctorBookAppointment" {...props} />
);
const WrappedDoctorAppointmentList = props => (
  <LazyScreen name="AppointmentList" {...props} />
);
const WrappedDoctorAppointmentDetailsView = props => (
  <LazyScreen name="AppointmentDetails" {...props} />
);
const WrappedAppointmentForm = props => (
  <LazyScreen name="AppointmentForm" {...props} />
);
const WrappedAppointmentEdit = props => (
  <LazyScreen name="AppointmentFormEdit" {...props} />
);

const Stack = createStackNavigator();

const DoctorAppointmentNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="DoctorBookAppointment">
      <Stack.Screen
        name="DoctorBookAppointment"
        component={WrappedDoctorBookAppointment}
      />
      <Stack.Screen
        name="AppointmentList"
        component={WrappedDoctorAppointmentList}
      />
      <Stack.Screen
        name="AppointmentDetails"
        component={WrappedDoctorAppointmentDetailsView}
      />
      <Stack.Screen name="AppointmentForm" component={WrappedAppointmentForm} />
      <Stack.Screen
        name="AppointmentFormEdit"
        component={WrappedAppointmentEdit}
      />
    </Stack.Navigator>
  );
};

export default DoctorAppointmentNavigator;
