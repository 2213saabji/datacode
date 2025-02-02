import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import AmbulanceBookingScreen from '../screens/BookAmbulance/BookAmbulance';
import AmbulanceDetails from '../screens/AmbulanceList/Ambulance-Details-page';
import AmbulanceList from '../screens/AmbulanceList/AmbulanceList';

const Stack = createStackNavigator();

const AmbulanceServiceNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="AmbulanceForm">
      <Stack.Screen name="AmbulanceList" component={AmbulanceList} />
      <Stack.Screen name="AmbulanceDetails" component={AmbulanceDetails} />
      <Stack.Screen name="AmbulanceForm" component={AmbulanceBookingScreen} />
      {/* <Stack.Screen name="AmbulanceFormEdit" component={Cabedit} /> */}
    </Stack.Navigator>
  );
};

export default AmbulanceServiceNavigator;
