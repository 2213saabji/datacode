import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const TabBar = () => {
  return (
    <View style={tabBarStyles.tabBar}>
      <Text style={tabBarStyles.tabItem}>Your Election</Text>
      <Text style={tabBarStyles.tabItem}>Your Ward</Text>
      <Text style={tabBarStyles.tabItem}>Your Booth</Text>
      <Text style={tabBarStyles.tabItem}>Nominated Candidates</Text>
    </View>
  );
};

export default TabBar;

const tabBarStyles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  tabItem: {
    fontSize: 8,
    fontWeight: '600',
    color: 'rgba(33, 43, 54, 1)',
    fontFamily: 'PublicSans-Regular',
  },
});
