import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LazyScreen from './LazyScreen';

const Stack = createStackNavigator();

const WrappedChatListScreen = props => (
  <LazyScreen name="ChatList" {...props} />
);
const WrappedContactsScreen = props => (
  <LazyScreen name="Contacts" {...props} />
);
const WrappedChatRoomScreen = props => (
  <LazyScreen name="ChatRoom" {...props} />
);
const WrappedJobDetailsView = props => (
  <LazyScreen name="JobDetails" {...props} />
);
const WrappedAddContactScreen = props => (
  <LazyScreen name="AddContact" {...props} />
);
const WrappedSurveyResponseScreen = props => (
  <LazyScreen name="SurveyResponse" {...props} />
);

const ChatStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="ChatList" component={WrappedChatListScreen} />
      <Stack.Screen name="Contacts" component={WrappedContactsScreen} />
      <Stack.Screen name="ChatRoom" component={WrappedChatRoomScreen} />
      <Stack.Screen name="JobDetails" component={WrappedJobDetailsView} />
      <Stack.Screen name="AddContact" component={WrappedAddContactScreen} />
      <Stack.Screen
        name="SurveyResponse"
        component={WrappedSurveyResponseScreen}
      />
    </Stack.Navigator>
  );
};

export default ChatStackNavigator;
