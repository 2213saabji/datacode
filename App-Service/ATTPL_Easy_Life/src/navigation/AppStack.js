import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import appScreens from '../data/appScreens';
import LazyScreen from './LazyScreen';

const Stack = createStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator>
      {appScreens.map(({name, options}) => (
        <Stack.Screen
          key={name}
          name={name}
          options={{headerShown: false, ...options}}
          initialParams={{name}}>
          {props => <LazyScreen name={name} {...props} />}
        </Stack.Screen>
      ))}
    </Stack.Navigator>
  );
};

export default AppStack;
